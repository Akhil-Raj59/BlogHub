import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets'; // Ensure the import path is correct
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const isLoggedIn = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); // Start loading
            try {
                const response = await service.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        // Fetch posts only if logged in
        if (isLoggedIn) {
            fetchPosts();
        } else {
            setLoading(false); // End loading if not logged in
        }
    }, [isLoggedIn]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-dark-700 via-dark-800 to-dark-900">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-brand-200 border-t-transparent animate-spin mx-auto"></div>
                    <h1 className="mt-4 text-xl font-semibold text-brand-100 animate-pulse">
                        Fetching the latest posts...
                    </h1>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <Container>
                    <div className="text-center p-8 rounded-lg shadow-dark-glow bg-dark-700">
                        <h1 className="text-2xl font-bold text-brand-200 mb-4">
                            Login To Read Posts
                        </h1>
                        <p className="text-gray-400">
                            Join us to explore exciting posts and share your thoughts.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 min-h-screen bg-black">
            <Container>
                <h1 className="text-3xl font-bold text-center text-brand-200 mb-10">
                    Latest Posts
                </h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform hover:scale-105 transition-transform duration-300"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
