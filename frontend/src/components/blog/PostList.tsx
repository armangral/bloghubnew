"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { useUIStore } from "@/store/ui";
import PostCard from "./PostCard";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import Pagination from "../ui/Pagination";
import Dropdown from "@/components/ui/Dropdown";

const POSTS_PER_PAGE = 6;

// Sort options for the dropdown
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "By Title", value: "title" },
];

export default function PostList() {
  const {
    searchQuery,
    currentPage,
    sortBy,
    setSearchQuery,
    setCurrentPage,
    setSortBy,
  } = useUIStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const {
    posts: data,
    isLoading,
    error,
  } = usePosts(currentPage, searchQuery, sortBy);

  console.log("data", data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  // Handler for pagination component
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handler for sort dropdown
  const handleSortChange = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSortBy(value as any);
  };

  const totalPages = data
    ? Math.ceil(data.metadata?.total_elements / POSTS_PER_PAGE)
    : 1;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Failed to load posts. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Dropdown
                label="Sort by"
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
                maxWidth="max-w-48"
                className="min-w-40"
              />
            </div>
          </div>
        </div>

        {data && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {data.data.length} of {data.metadata?.total_elements} posts
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <Loading />
      ) : data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center w-full items-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
