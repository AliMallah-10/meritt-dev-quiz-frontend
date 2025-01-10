import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  message?: string; // Optional message prop
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {message || "Oops! The page you're looking for doesn't exist."}
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
