import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const POST_API = import.meta.env.VITE_POST_API
  const [allUserPost, setAllUserPost] = useState([])

  const createPost = async (postData) => {
    try {
      const { data } = await axios.post(`${POST_API}/create-post`, postData, {
        withCredentials: true,
      })
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${POST_API}/get-posts`, {
        withCredentials: true,
      })
      setAllUserPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  const likesPost = async (id) => {
    try {
      const { data } = await axios.put(
        `${POST_API}/likes/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
      // Refresh posts after liking
      getPosts()
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{ createPost, getPosts, allUserPost, likesPost }}
    >
      {children}
    </PostContext.Provider>
  )
}
