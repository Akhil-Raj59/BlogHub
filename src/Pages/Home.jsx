import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets';
import { useSelector } from 'react-redux';

function Home(props) {
    const [posts,setPosts] = useState([])
    const isLoggedIn = useSelector((state) => state.auth.status)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        // Only fetch posts if the user is logged in
        if (isLoggedIn) {
            fetchPosts();
        }
    },[])

    if (posts.length ===0 && !isLoggedIn) {
        return  (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login To Read Poasts
                                
                            </h1>

                        </div>

                    </div>
                </Container>

            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) =>  (
                        <div key={post.$id}
                        className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}

                </div>
            </Container>
            
        </div>
    );
}

export default Home;