import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function Home() {
  const { allUserPost, likesPost } = useContext(PostContext);

  return (
    <main className="w-full min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Home Feed</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allUserPost &&
            allUserPost.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.images}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => likesPost(post._id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Like {post.likes.length}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
