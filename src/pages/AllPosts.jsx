import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"


const AllPosts = () => {
  const [posts, setPosts] = useState([])

  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if(!auth.loading) {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
    }
  }, [auth.loading])

  //TODO: add case for array length 0
  if (auth.loading) {
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    <h1 className="text-black text-6xl font-bold">Loading...</h1>
                </div>
            </Container>
        </div>
    )
  } else { 
    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className="text-5xl font-bold mb-5">All Posts</h1>
                <div className="grid grid-cols-[repeat(auto-fit,_18.5rem)] justify-center gap-4 min-h-100">
                {posts.map((post) => (
                    <div className="p-2 w-1/4" key={post.$id}>
                    <PostCard {...post} />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )
    }

  
}

export default AllPosts