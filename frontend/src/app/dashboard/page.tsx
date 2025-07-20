"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useAuthStore } from "@/store/auth";
import { useUserPosts } from "@/hooks/usePosts";
import { useDeletePost } from "@/hooks/usePosts";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { useUIStore } from "@/store/ui";
import Pagination from "@/components/ui/Pagination";

const POSTS_PER_PAGE = 6;

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const deletePost = useDeletePost();
  const { currentDashboardPage, setCurrentDashboardPage } = useUIStore();

  const {
    posts: userPosts,
    isLoading,
    error,
  } = useUserPosts(currentDashboardPage);

  const handlePageChange = (newPage: number) => {
    setCurrentDashboardPage(newPage);
  };

  const totalPages = userPosts
    ? Math.ceil(userPosts.metadata?.total_elements / POSTS_PER_PAGE)
    : 1;

  console.log("totalPages", totalPages);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      deletePost.mutate(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="mt-4 sm:mt-0">
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Posts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {userPosts?.metadata?.total_elements}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Published</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {userPosts?.metadata?.total_elements}
          </p>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Posts</h2>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-600">
              Failed to load posts. Please try again later.
            </p>
          </div>
        ) : userPosts?.data?.length === 0 ? (
          <div className="p-6 text-center">
            <Edit3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start writing your first blog post to share your thoughts with the
              world.
            </p>
            <Link href="/dashboard/create">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {userPosts?.data?.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Created {format(new Date(post.createdAt), "MMM d, yyyy")}
                      {post.updatedAt !== post.createdAt && (
                        <span>
                          {" "}
                          • Updated{" "}
                          {format(new Date(post.updatedAt), "MMM d, yyyy")}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {post.content.replace(/<[^>]*>/g, "").slice(0, 120)}...
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" title="View post">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/edit/${post.id}`}>
                      <Button variant="ghost" size="sm" title="Edit post">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      title="Delete post"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center w-full items-center mt-10">
          <Pagination
            currentPage={currentDashboardPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
