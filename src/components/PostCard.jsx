import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js"

const postCard = ({$id, title, featured_img}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div
            className='w-75 bg-gray-100 rounded-xl p-4'
            >
                <div
                className='w-full justify-center mb-4'
                >
                    <img src={appwriteService.getFileView(featured_img)} alt={title}
                    className='rounded-xl h-50'
                    />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}
 
export default postCard;