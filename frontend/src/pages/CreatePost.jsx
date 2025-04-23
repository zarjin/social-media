import React, { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function CreatePost() {
  const { createPost } = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [images, setImages] = useState(null);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("images", images);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost(formData);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your post title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={(e) => setImages(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your post images"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </form>
      </div>
    </main>
  );
}
