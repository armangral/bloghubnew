import Link from "next/link";
import { FileX } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
      <p className="text-gray-600 mb-8">
        {
          " The blog post you're looking for doesn't exist or may have been removed."
        }
      </p>
      <div className="space-x-4">
        <Link href="/blog">
          <Button>Browse All Posts</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
