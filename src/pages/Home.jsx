import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"

const Home = () => {

  const [posts, setPosts] = useState([])

    // setting the post state 
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
        })
    }, [])

  const auth = useSelector((state) => state.auth)

    useEffect(() => {
    if (auth.status === false) {
        setPosts([]); // Clearing posts when logged out
    }
    }, [auth.status]);

  if (auth.loading) {
    return <div>Loading...</div>
  } else {

    if (posts.length === 0) {
      return (
        <div className='w-full py-8'>
        <Container>
          <div className="flex min-h-120 flex-wrap">
            <h1 className="text-5xl font-bold mb-5">Login to read posts</h1>
          </div>
        </Container>
      </div>
      )
    } else {
      return (
        <div className='w-full py-8'>
          <Container>
            <h1 className="text-5xl font-bold mb-5">Welcome</h1>
            <div className="grid grid-cols-[repeat(auto-fit,_18.5rem)] justify-center gap-4 min-h-100">
              {posts.map((post) => (
                <div className="p-2 w-1/4 bg" key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )
    }
  }

  
}

export default Home