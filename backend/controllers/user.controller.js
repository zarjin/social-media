import User from "../models/user.models.js";

// Get User Data
export const getUser = async (req, res) => {
  const id = req.user?.id; // Use optional chaining

  try {
    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Data
export const updateUser = async (req, res) => {
  const { about, lives, worksAt, country, relationship } = req.body;
  const id = req.user?.id;

  if (!id) {
    return res.status(400).json({ message: "User ID not provided" });
  }

  try {
    // Construct update data.  Handles cases where files might not be present.
    const updateData = {
      about,
      lives,
      worksAt,
      country,
      relationship,
    };

    // Only include profilePicture and coverPicture if they exist in the request.
    if (req.files?.profilePicture) {
      updateData.profilePicture = req.files.profilePicture[0].path; // Access the path correctly
    }
    if (req.files?.coverPicture) {
      updateData.coverPicture = req.files.coverPicture[0].path; // Access the path correctly
    }

    //Check if any data is actually being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Return the *updated* user data
      runValidators: true, // Ensure schema validation is run
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" }); // User not found during update
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
