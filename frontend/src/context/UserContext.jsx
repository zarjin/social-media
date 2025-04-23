import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState();
  const USER_API = import.meta.env.VITE_USER_API;

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${USER_API}/get-user`, {
        withCredentials: true,
      });
      getUser();
      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (updateData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add text fields to FormData
      formData.append("firstname", updateData.firstname);
      formData.append("lastname", updateData.lastname);
      formData.append("about", updateData.about || "");
      formData.append("lives", updateData.lives || "");
      formData.append("worksAt", updateData.worksAt || "");
      formData.append("relationship", updateData.relationship || "");

      // Add image files if they exist
      if (
        updateData.profilePicture &&
        updateData.profilePicture instanceof File
      ) {
        formData.append("profilePicture", updateData.profilePicture);
      }

      if (updateData.coverPicture && updateData.coverPicture instanceof File) {
        formData.append("coverPicture", updateData.coverPicture);
      }

      const { data } = await axios.put(`${USER_API}/update-user`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getUser();
      setProfileData(data.updatedUser);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ profileData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
