import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button"
import Input from "../Input.jsx"
import RTE from "../header/RTE";
import Select from "../Select"
import appwriteService from "../../appwrite/config.js"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({post}) => {
    // useForm hook
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    // selecting user data from the auth state
    const userData = useSelector((state) => state.auth.userData)

    // submit function
    const submit = async(data) => {

        // submitting the image to appwrite
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            // updating the post
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId

                // storing await func in vars, when it happens the var is created an you can use that instead of manually
                // checking if the func was successful
                const dbPost = await appwriteService.createPost({...data, userId: userData.$id})
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // transforming white spaces to underscore
    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
        }
    }, [])

    // initial the slug transform function as the user types
    React.useEffect(() => {
        watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })
    }, [watch, slugTransform, setValue])

    return (
        <form 
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTartget.value), {shouldValidate: true})
                }}
                />
                <RTE 
                label={"content"}
                name={"content"}
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
                type="file"
                label="Featured image"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredImage)} 
                        alt={post.title} 
                        className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                options={["active", "inactive"]}
                label={Status}
                className="mb-4"
                {...register("status", {required: true})}
                />

                <Button
                type="submit"
                bgColor={post ? "bg-green-500" : "bg-blue-500"}
                className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
 
export default PostForm;