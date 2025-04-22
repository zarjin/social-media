import User from "../models/user.models.js";

export const getUser = async (req, res) => {
  const id = req.user?.id;

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

export const updateUser = async (req, res) => {
  const { about, lives, worksAt, country, relationship } = req.body;
  const id = req.user?.id;

  if (!id) {
    return res.status(400).json({ message: "User ID not provided" });
  }

  try {
    const updateData = {
      profilePicture: req.file.path,
      coverPicture: req.file.path,
      about,
      lives,
      worksAt,
      country,
      relationship,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
