import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null);
    
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            setIsLoading(true);
            
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Post submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content Section */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        <Input
                            label="Title :"
                            placeholder="Enter post title"
                            className={`mb-3 ${errors.title ? 'border-red-500' : ''}`}
                            {...register("title", { 
                                required: "Title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" }
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}

                        <Input
                            label="Slug :"
                            placeholder="post-slug"
                            className={`mb-3 ${errors.slug ? 'border-red-500' : ''}`}
                            {...register("slug", { required: "Slug is required" })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        {errors.slug && (
                            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                        )}

                        <div className="prose max-w-full">
                            <RTE 
                                label="Content :" 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")} 
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Input
                                    label="Featured Image :"
                                    type="file"
                                    className={`mb-3 ${errors.image ? 'border-red-500' : ''}`}
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: !post })}
                                    onChange={handleImageChange}
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                                )}
                            </div>

                            {(previewImage || post) && (
                                <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                                    <img
                                        src={previewImage || appwriteService.getFilePreview(post.featuredImage)}
                                        alt="Post preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className="mb-4"
                                {...register("status", { required: true })}
                            />

                            <Button 
                                type="submit" 
                                bgColor={post ? "bg-green-500" : undefined}
                                className="w-full flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg 
                                            className="animate-spin h-5 w-5 text-white" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                        >
                                            <circle 
                                                className="opacity-25" 
                                                cx="12" 
                                                cy="12" 
                                                r="10" 
                                                stroke="currentColor" 
                                                strokeWidth="4"
                                            />
                                            <path 
                                                className="opacity-75" 
                                                fill="currentColor" 
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        {post ? "Updating..." : "Creating..."}
                                    </>
                                ) : (
                                    post ? "Update Post" : "Create Post"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostForm;