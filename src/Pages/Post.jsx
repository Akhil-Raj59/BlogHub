import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Container, Button } from "../Componets"; // Ensure the import path is correct
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const fetchedPost = await service.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        navigate("/"); // Redirect if post is not found
                    }
                } catch (error) {
                    setError("Failed to fetch post.");
                    console.error("Error fetching post:", error);
                } finally {
                    setLoading(false); // End loading
                }
            } else {
                navigate("/"); // Redirect if no slug is provided
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        if (post) {
            try {
                const status = await service.deletePost(post.$id);
                if (status) {
                    await service.deleteFile(post.featuredImage);
                    navigate("/");
                }
            } catch (error) {
                setError("Failed to delete post.");
                console.error("Error deleting post:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="py-8 text-center">
                <Container>
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 mx-auto"></div>
                        <div className="h-96 bg-gray-200 rounded-xl w-full mb-6"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/4 mx-auto mt-2"></div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <Container>
                    <h1 className="text-xl font-bold text-red-600">{error}</h1>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative border rounded-xl shadow-lg p-2 bg-dark-700">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-auto object-cover"
                    />
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-4 py-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="px-4 py-2" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-brand-200 mb-4">{post.title}</h1>
                    <div className="prose prose-lg max-w-full text-gray-300">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="py-8 text-center">
            <Container>
                <h1 className="text-xl font-bold">Post not found.</h1>
            </Container>
        </div>
    );
}
