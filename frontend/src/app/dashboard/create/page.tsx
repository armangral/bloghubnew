"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useCreatePost } from "@/hooks/usePosts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const createPost = useCreatePost();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
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

    createPost.mutate({
      title: title.trim(),
      content: content.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Share your thoughts with the world.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" loading={createPost.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  );
}
