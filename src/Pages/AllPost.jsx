import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets'; // Ensure import path is correct

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getPosts([]);
                if (response) {
                    setPosts(response.documents);
                }
            } catch (err) {
                setError("Failed to fetch posts. Please try again.");
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w-1/4' key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
