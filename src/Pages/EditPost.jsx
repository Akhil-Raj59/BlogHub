import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm } from '../Componets'; // Ensure the import path is correct

const EditPost = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const postData = await service.getPost(slug);
                    if (postData) {
                        setPost(postData);
                    } else {
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } catch (err) {
                setError("Failed to fetch post. Please try again.");
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-brand-200 to-brand-400 animate-gradient">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p className="text-lg text-white animate-pulse">Loading your post...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-dark-700">
                <div className="text-center p-6 rounded-lg shadow-dark-glow bg-dark-500">
                    <p className="text-xl text-red-500 font-semibold mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 text-sm text-white bg-brand-500 rounded-md shadow-md hover:bg-brand-600 transition-all"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-12 min-h-screen bg-dark-800">
            <Container>
                <div className="max-w-4xl mx-auto bg-dark-700 rounded-lg shadow-dark-glow p-8">
                    <h1 className="text-3xl font-bold text-center text-brand-200 mb-6 animate-floating">
                        Edit Your Post
                    </h1>
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null;
};

export default EditPost;
