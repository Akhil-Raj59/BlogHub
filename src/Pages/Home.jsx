import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets'; // Make sure the import path is correct
import { useSelector } from 'react-redux';

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading
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

        // Only fetch posts if the user is logged in
        if (isLoggedIn) {
            fetchPosts();
        } else {
            setLoading(false); // End loading if not logged in
        }
    }, [isLoggedIn]); // Added isLoggedIn as a dependency

    if (loading) {
        return (
            <div className='w-full py-8 text-center'>
                <Container>
                    <h1 className='text-xl font-bold'>Loading posts...</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <h1 className='text-2xl font-bold hover:text-gray-500'>
                        Login To Read Posts
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
