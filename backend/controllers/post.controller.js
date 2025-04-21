import Post from "../models/post.models.js"

export const createPost = async (req, res) => {
  try {
    const { title } = req.body
    const newPost = new Post({
      userId: req.user.id,
      title,
      img: req.file.path,
    })
    const savedPost = await newPost.save()
    res.status(200).json({ message: "Post created successfully", post: savedPost })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.find({ userId: id })
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.status(200).json({ message: "Delete Succsefully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Post Delete Error" })
  }
}
