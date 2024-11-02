import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Container, Button } from "../Componets"; // Ensure the import path is correct
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null); // New error state
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
                    <h1 className="text-xl font-bold">Loading post...</h1>
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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-auto" // Responsive image
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
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
