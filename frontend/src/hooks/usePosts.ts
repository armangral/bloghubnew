import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";
import {
  PostResponse,
  CreatePostData,
  UpdatePostData,
  ApiError,
} from "@/lib/types";

import { PaginatedResponse, Post } from "@/lib/types";
import { extractApiErrorMessage } from "@/utils/helpers";

export const usePosts = (
  page: number = 1,
  search: string = "",
  sort: string = "newest"
) => {
  const queryClient = useQueryClient();
  const limit = 6;
  const skip = (page - 1) * limit;

  // Build query params
  const queryParams = {
    skip,
    limit,
    ...(search && { search }),
    ...(sort && { sort }),
  };

  const {
    isLoading,
    data: posts,
    error,
  } = useQuery<PaginatedResponse<Post>, ApiError>({
    queryKey: ["posts", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      params.append("skip", skip.toString());
      params.append("limit", limit.toString());

      const response = await api.get(`/posts?${params.toString()}`);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const count = posts?.metadata?.total_elements || 0;
  const pageCount = Math.ceil(count / limit);

  // Prefetch next page
  const nextSkip = skip + limit;
  if (nextSkip < count) {
    const nextPageParams = {
      ...queryParams,
      skip: nextSkip,
    };
    queryClient.prefetchQuery({
      queryKey: ["posts", nextPageParams],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        params.append("skip", nextSkip.toString());
        params.append("limit", limit.toString());

        const response = await api.get(`/posts?${params.toString()}`);
        return response.data.data;
      },
    });
  }

  // Prefetch previous page
  const prevSkip = skip - limit;
  if (prevSkip >= 0) {
    const prevPageParams = {
      ...queryParams,
      skip: prevSkip,
    };
    queryClient.prefetchQuery({
      queryKey: ["posts", prevPageParams],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        params.append("skip", prevSkip.toString());
        params.append("limit", limit.toString());

        const response = await api.get(`/posts?${params.toString()}`);
        return response.data.data;
      },
    });
  }

  return { isLoading, error, posts, count, pageCount };
};

export const useUserPosts = (page: number = 1) => {
  const queryClient = useQueryClient();
  const limit = 6;
  const skip = (page - 1) * limit;

  // Build query params
  const queryParams = {
    skip,
    limit,
  };

  const {
    isLoading,
    data: posts,
    error,
  } = useQuery<PaginatedResponse<Post>, ApiError>({
    queryKey: ["posts", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("skip", skip.toString());
      params.append("limit", limit.toString());

      const response = await api.get(`/posts/me?${params.toString()}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const count = posts?.metadata?.total_elements || 0;
  const pageCount = Math.ceil(count / limit);

  // Prefetch next page
  const nextSkip = skip + limit;
  if (nextSkip < count) {
    const nextPageParams = {
      ...queryParams,
      skip: nextSkip,
    };
    queryClient.prefetchQuery({
      queryKey: ["posts", nextPageParams],
      queryFn: async () => {
        const params = new URLSearchParams();

        params.append("skip", nextSkip.toString());
        params.append("limit", limit.toString());

        const response = await api.get(`/posts/me?${params.toString()}`);
        return response.data;
      },
    });
  }

  // Prefetch previous page
  const prevSkip = skip - limit;
  if (prevSkip >= 0) {
    const prevPageParams = {
      ...queryParams,
      skip: prevSkip,
    };
    queryClient.prefetchQuery({
      queryKey: ["posts", prevPageParams],
      queryFn: async () => {
        const params = new URLSearchParams();

        params.append("skip", prevSkip.toString());
        params.append("limit", limit.toString());

        const response = await api.get(`/posts/me?${params.toString()}`);
        return response.data;
      },
    });
  }

  return { isLoading, error, posts, count, pageCount };
};

export const usePost = (id: string) => {
  return useQuery<PostResponse, ApiError>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<PostResponse, ApiError, CreatePostData>({
    mutationFn: async (data: CreatePostData) => {
      const response = await api.post("/posts", data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
      router.push(`/blog/${response.data.id}`);
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error));
    },
  });
};

export const useUpdatePost = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<PostResponse, ApiError, UpdatePostData>({
    mutationFn: async (data: UpdatePostData) => {
      const response = await api.put(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      toast.success("Post updated successfully!");
      router.push(`/blog/${response.data.id}`);
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error));
    },
  });
};

export const useDeletePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, ApiError, string>({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error));
    },
  });
};
