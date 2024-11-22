import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null
    );
    
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
        <div className="min-h-screen bg-gray-950 py-8">
            <form onSubmit={handleSubmit(submit)} className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Section - Takes up 2/3 of the space */}
                    <div className="lg:col-span-2">
                        <div className="h-full bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-pink-700">
                            <div className="space-y-6">
                                <Input
                                    label="Title"
                                    placeholder="Enter post title"
                                    className="mb-4"
                                    error={errors.title?.message}
                                    {...register("title", { 
                                        required: "Title is required",
                                        minLength: { value: 5, message: "Title must be at least 5 characters" }
                                    })}
                                />

                                <Input
                                    label="Slug"
                                    placeholder="post-slug"
                                    className="mb-4"
                                    error={errors.slug?.message}
                                    {...register("slug", { required: "Slug is required" })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />

                                <div className="prose prose-invert max-w-none">
                                    <RTE 
                                        label="Content" 
                                        name="content" 
                                        control={control} 
                                        defaultValue={getValues("content")}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Section - Takes up 1/3 of the space */}
                    <div className="lg:col-span-1">
                        <div className="h-full bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-pink-700">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Input
                                        label="Featured Image"
                                        type="file"
                                        error={errors.image?.message}
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("image", { required: !post })}
                                        onChange={handleImageChange}
                                    />

                                    {(previewImage || post) && (
                                        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                                            <img
                                                src={previewImage || appwriteService.getFilePreview(post.featuredImage)}
                                                alt="Post preview"
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <Select
                                        options={["active", "inactive"]}
                                        label="Status"
                                        className="w-full"
                                        {...register("status", { required: true })}
                                    />

                                    <Button 
                                        type="submit" 
                                        variant="primary"
                                        className="w-full h-12 mt-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {post ? "Updating..." : "Creating..."}
                                            </div>
                                        ) : (
                                            <span className="font-medium">
                                                {post ? "Update Post" : "Create Post"}
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostForm;