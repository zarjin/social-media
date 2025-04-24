import React, { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { Heart } from 'lucide-react'

export default function Home() {
  const { allUserPost, likesPost } = useContext(PostContext)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <main className='w-full min-h-screen bg-gray-100'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Home Feed</h1>

        {allUserPost?.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No posts to display yet</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allUserPost?.map((post) => (
              <article
                key={post._id}
                className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                {post.images?.length > 0 && (
                  <img
                    src={post.images} // Handle array of images
                    alt={post.title}
                    className='w-full h-48 object-cover'
                    loading='lazy'
                  />
                )}
                <div className='p-4'>
                  <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                    {post.title}
                  </h2>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {post.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <time
                      className='text-sm text-gray-500'
                      dateTime={post.createdAt}
                    >
                      {formatDate(post.createdAt)}
                    </time>
                    <button
                      onClick={() => likesPost(post._id)}
                      className='flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors'
                      aria-label='Like post'
                    >
                      <Heart className='w-5 h-5 fill-current' />
                      <span>{post.likes?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
