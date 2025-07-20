import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { User, Calendar, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { PostResponse } from "@/lib/types";
import RichContent from "@/components/blog/RichContent";

async function getPost(id: string) {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data as PostResponse;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const postData = await getPost(params.id);

  if (!postData) {
    return {
      title: "Post Not Found - BlogHub",
    };
  }

  return {
    title: `${postData.data.title} - BlogHub`,
    description: postData.data.content.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const postData = await getPost(params.id);

  if (!postData) {
    notFound();
  }

  const { data: post } = postData;

  return (
    <div className="container mx-auto py-8 max-w-4xl px-4 sm:px-6 lg:px-8 ">
      <div className="space-y-4">
        {/* Header Navigation */}
        <div className="flex items-center justify-between ">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-6 p-4">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-blue-600">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.createdAt), "MMMM dd, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span> {/* You may need to calculate this */}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className=" p-4 ">
          <div className="prose prose-lg max-w-none prose-headings:text-blue-600 prose-p:text-gray-800 prose-strong:text-gray-800 prose-blockquote:border-l-blue-600 prose-blockquote:text-gray-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:border prose-a:text-blue-600 hover:prose-a:text-blue-500">
            <RichContent content={post.content} />
          </div>
        </div>

        {/* Post Footer */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600 mb-1">Written by</p>
              <p className="font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-base hover:bg-blue-700 transition-colors"
              >
                More Posts
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated Info */}
        {post.updatedAt &&
          new Date(post.updatedAt).getTime() !==
            new Date(post.createdAt).getTime() && (
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Last updated on{" "}
                {format(new Date(post.updatedAt), "MMMM dd, yyyy")}
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
