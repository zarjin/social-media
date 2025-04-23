import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Submitting:", { title, image });
  };

  return (
    <div className="container mx-auto max-w-sm">
      <div className="mt-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            className="w-full p-2 text-center border border-indigo-500 text-indigo-500 rounded cursor-pointer hover:bg-indigo-50"
          >
            {image ? "Change Image" : "Upload Image"}
          </label>
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-full rounded" />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
