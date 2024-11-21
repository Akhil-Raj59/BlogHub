import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets'; // Ensure import path is correct

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (err) {
                setError("Failed to fetch posts. Please try again.");
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h1 className="mt-4 text-lg font-semibold text-brand-300 animate-pulse">
                        Loading posts...
                    </h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <Container>
                    <div className="text-center p-8 rounded-lg shadow-dark-glow bg-dark-700">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
                        <p className="text-gray-400">
                            Please check your connection or try again later.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Container>
                    <div className="text-center p-8 rounded-lg shadow-dark-glow">
                        <h1 className="text-2xl font-bold text-brand-200 mb-4">
                            No posts available.
                        </h1>
                        <p className="text-gray-400">
                            Be the first to create a post and share your thoughts!
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-gray-900">
            <Container>
                <h1 className="text-3xl font-bold text-center text-brand-200 mb-10">
                    All Posts
                </h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Reverse the posts array to show the latest post first */}
                    {[...posts].reverse().map((post) => (
                        <div
                            className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform hover:scale-105 transition-transform duration-300"
                            key={post.$id}
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
