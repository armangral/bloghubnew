import { Metadata } from "next";
import PostList from "@/components/blog/PostList";

export const metadata: Metadata = {
  title: "Blog Posts - BlogHub",
  description:
    "Discover amazing blogs and insights from writers around the world.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Discover Amazing Blogs
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-shadow">
            Latest Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing blogs, insights, and ideas from writers around the
            world.
          </p>
        </div>

        <div className="animate-fade-in-up stagger-2">
          <PostList />
        </div>
      </div>
    </div>
  );
}
