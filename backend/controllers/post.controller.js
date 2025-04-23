import Post from "../models/post.models.js";

export const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const newPost = new Post({
      userId: req.user.id,
      title,
      images: req.file.path,
    });
    const savedPost = await newPost.save();
    res
      .status(200)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ userId: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Succsefully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post Delete Error" });
  }
};

export const likesPost = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        [alreadyLiked ? "$pull" : "$push"]: { likes: userId },
      },
      { new: true } // to return the updated document
    );

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: updatedPost.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error liking post", error });
  }
};
