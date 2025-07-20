"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { usePost, useUpdatePost } from "@/hooks/usePosts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import RichTextEditor from "@/components/editor/RichTextEditor";
import Loading from "@/components/ui/Loading";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Unwrap the params Promise
  const { id } = use(params);

  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { data, isLoading, error } = usePost(id);
  const updatePost = useUpdatePost(id);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    if (data?.data) {
      // Use ID comparison instead of name for better security
      if (data.data.authorId !== user?.id) {
        router.push("/dashboard");
        return;
      }

      setTitle(data.data.title);
      setContent(data.data.content);
    }
  }, [data, isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-red-600">
          Failed to load post. Please try again later.
        </p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim() || content === "<p></p>")
      newErrors.content = "Content is required";
    if (title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters long";
    if (content.replace(/<[^>]*>/g, "").trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if no changes were made
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (
      trimmedTitle === data.data.title &&
      trimmedContent === data.data.content
    ) {
      // No changes made, redirect to post
      router.push(`/blog/${id}`);
      return;
    }

    // For PUT requests, always send complete data (both title and content)
    const updateData = {
      title: trimmedTitle,
      content: trimmedContent,
    };

    updatePost.mutate(updateData, {
      onSuccess: () => {
        // Redirect to the post page on successful update
        router.push(`/blog/${id}`);
      },
      onError: (error) => {
        // Handle update errors
        console.error("Failed to update post:", error);
        setErrors({
          submit: "Failed to update post. Please try again.",
        });
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="md:px-6 px-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <p className="text-gray-600 mt-2">
          Make changes to your published post.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general form errors */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <Input
            label="Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            placeholder="Enter a compelling title for your post..."
            maxWidth=""
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your amazing story..."
          />
          {errors.content && (
            <p className="text-sm text-red-600 mt-2">{errors.content}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Link href={`/blog/${id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            type="submit"
            loading={updatePost.isPending}
            disabled={updatePost.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            Update Post
          </Button>
        </div>
      </form>
    </div>
  );
}
