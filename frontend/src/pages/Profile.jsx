import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  MapPin,
  Briefcase,
  Heart,
  Calendar,
  Edit,
  Image,
  User,
  X,
  Camera,
} from "lucide-react";

export default function Profile() {
  const { profileData, updateUser } = useContext(UserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstname: profileData?.firstname || "",
    lastname: profileData?.lastname || "",
    about: profileData?.about || "",
    lives: profileData?.lives || "",
    worksAt: profileData?.worksAt || "",
    relationship: profileData?.relationship || "",
  });

  // State for image previews
  const [coverImagePreview, setCoverImagePreview] = useState(
    profileData?.coverPicture || ""
  );
  const [profileImagePreview, setProfileImagePreview] = useState(
    profileData?.profilePicture || ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
        setEditFormData((prevData) => ({ ...prevData, coverPicture: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setEditFormData((prevData) => ({ ...prevData, profilePicture: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editFormData);
    setIsEditModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={profileData?.coverPicture}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </div>

      {/* Profile Info Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Profile Picture */}
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <img
                  src={profileData?.profilePicture}
                  alt={`${profileData?.firstname} ${profileData?.lastname}`}
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 shadow-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData?.firstname} {profileData?.lastname}
                </h1>
                <p className="mt-2 text-xl text-gray-600">
                  {profileData?.about}
                </p>

                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-6">
                  {profileData?.lives && (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{profileData.lives}</span>
                    </div>
                  )}

                  {profileData?.worksAt && (
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>Works at {profileData.worksAt}</span>
                    </div>
                  )}

                  {profileData?.relationship && (
                    <div className="flex items-center text-gray-700">
                      <Heart className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{profileData.relationship}</span>
                    </div>
                  )}

                  {profileData?.createdAt && (
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>Joined {formatDate(profileData.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData?.posts?.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 mr-1 text-red-500" />
                      <span>{post.likes.length} likes</span>
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Cover Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Photo
                  </label>
                  <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                    {coverImagePreview && (
                      <img
                        src={coverImagePreview}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <label className="cursor-pointer bg-white bg-opacity-75 rounded-full p-3 hover:bg-opacity-100 transition-all duration-300 shadow-md">
                        <Image className="h-6 w-6 text-gray-700" />
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
                    <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 mr-4">
                      {profileImagePreview && (
                        <img
                          src={profileImagePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <label className="cursor-pointer bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all duration-300 shadow-md">
                          <User className="h-5 w-5 text-gray-700" />
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    rows="4"
                    value={editFormData.about}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
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
