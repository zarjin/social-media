import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  Heart,
  Calendar,
  Edit,
  Image,
  User,
  X,
} from "lucide-react";

export default function Profile() {
  // Mock user data - in a real app, this would come from an API call
  const [user, setUser] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverPicture:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=350&q=80",
    about:
      "Hi, I'm John! I love photography, travel, and connecting with new people.",
    lives: "New York, USA",
    worksAt: "Tech Company",
    relationship: "Single",
    joinedDate: "January 2023",
  });

  // Mock posts data
  const [posts] = useState([
    {
      id: 1,
      title: "Beautiful sunset at the beach",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      likes: 42,
      createdAt: "2023-09-15T14:30:00Z",
    },
    {
      id: 2,
      title: "My new camera setup",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      likes: 28,
      createdAt: "2023-09-10T09:15:00Z",
    },
    {
      id: 3,
      title: "Downtown architecture",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      likes: 35,
      createdAt: "2023-09-05T16:45:00Z",
    },
  ]);

  // State for edit profile modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...user });
  const [profileImagePreview, setProfileImagePreview] = useState(
    user.profilePicture
  );
  const [coverImagePreview, setCoverImagePreview] = useState(user.coverPicture);

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setEditFormData({ ...editFormData, profilePicture: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
        setEditFormData({ ...editFormData, coverPicture: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log("Form submitted:", editFormData);

    // Update the user state with the new data (except for files which would be handled differently in a real app)
    setUser({
      ...user,
      firstname: editFormData.firstname,
      lastname: editFormData.lastname,
      about: editFormData.about,
      lives: editFormData.lives,
      worksAt: editFormData.worksAt,
      relationship: editFormData.relationship,
      // In a real app, the profile and cover pictures would be updated after the API call succeeds
      profilePicture: profileImagePreview,
      coverPicture: coverImagePreview,
    });

    // Close the modal
    setIsEditModalOpen(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={user.coverPicture}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Profile Info Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Profile Picture */}
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img
                  src={user.profilePicture}
                  alt={`${user.firstname} ${user.lastname}`}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="mt-2 text-gray-600">{user.about}</p>

                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  {user.lives && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{user.lives}</span>
                    </div>
                  )}

                  {user.worksAt && (
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>Works at {user.worksAt}</span>
                    </div>
                  )}

                  {user.relationship && (
                    <div className="flex items-center text-gray-600">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{user.relationship}</span>
                    </div>
                  )}

                  {user.joinedDate && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{post.title}</h3>
                  <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-500" />
                      <span>{post.likes} likes</span>
                    </div>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                {/* Cover Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Photo
                  </label>
                  <div className="relative h-32 bg-gray-100 rounded-md overflow-hidden">
                    {coverImagePreview && (
                      <img
                        src={coverImagePreview}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <label className="cursor-pointer bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all duration-300">
                        <Image className="h-5 w-5 text-gray-700" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 mr-4">
                      {profileImagePreview && (
                        <img
                          src={profileImagePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <label className="cursor-pointer bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-all duration-300">
                          <User className="h-4 w-4 text-gray-700" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImageChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Click on the icon to upload a new profile picture
                    </div>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={editFormData.firstname}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={editFormData.lastname}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* About */}
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    value={editFormData.about}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="lives"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="lives"
                    name="lives"
                    value={editFormData.lives}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Work */}
                <div>
                  <label
                    htmlFor="worksAt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Works At
                  </label>
                  <input
                    type="text"
                    id="worksAt"
                    name="worksAt"
                    value={editFormData.worksAt}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Relationship Status */}
                <div>
                  <label
                    htmlFor="relationship"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Relationship Status
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={editFormData.relationship}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Married">Married</option>
                    <option value="It's complicated">It's complicated</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
