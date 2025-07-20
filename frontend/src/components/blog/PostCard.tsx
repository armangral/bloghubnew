import Link from "next/link";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Extract plain text from HTML content for preview
  const getPlainText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const preview = getPlainText(post.content);

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300 flex flex-col h-full group">
      {/* Main Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          <Link href={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
          {preview}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
            </div>

            {/* Read More */}
            <Link
              href={`/blog/${post.id}`}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 uppercase tracking-wide"
            >
              Read Article →
            </Link>
          </div>

          {/* Author at bottom */}
          <div className="mt-2 text-xs text-gray-400">
            By {post.author.name}
          </div>
        </div>
      </div>
    </article>
  );
}
