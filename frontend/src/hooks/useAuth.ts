import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { AuthResponse, LoginData, RegisterData, ApiError } from "@/lib/types";
import { extractApiErrorMessage } from "@/utils/helpers";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthResponse, ApiError, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await api.post("/auth/signin", data);
      return response.data;
    },
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error));
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<{ success: boolean; data: any }, ApiError, RegisterData>({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      router.push("/auth/signin");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error));
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    toast.success("Logged out successfully");
    router.push("/");
  };
};
