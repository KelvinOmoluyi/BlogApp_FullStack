import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config"
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser"
import { useSelector } from "react-redux";

const Post = () => {
    const [post, setPost] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.user_id === userData.$id : false

useEffect(() => {
  if (slug) {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        setPost(post);

        if (post.featured_img) {
          const imageUrl = appwriteService.getFileView(post.featured_img);
          setImageUrl(imageUrl);
        }
      } else {
        navigate("/");
      }
    });
  }
}, [slug, navigate]);



  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featured_img);
        navigate("/")
      }
    })
  }

//   const imageUrl = appwriteService.getFileView(post.featured_img)

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-[100%] flex min-h-120 relative rounded-xl p-2 gap-x-10'>
          <img src={imageUrl} alt={post.title} className='rounded-xl max-h-100 max-w-150' />
            <div className="h-100 w-[100%] flex flex-col justify-between p-2">
              <div className="w-full text-left">
                <h1 className="text-2xl font-bold  mb-12">{post.title}</h1>
                <div className="">
                  {parse(post.content)}
                </div>
              </div>
               
              { isAuthor && (
                <div className="absolute-right-1 w-[100%] top-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" 
                  onClick={deletePost}
                  >Delete</Button>
                </div>
              )}
            </div>
           
        </div>
      </Container>
    </div>
  ) : null
}
 
export default Post;