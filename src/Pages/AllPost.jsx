import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../Componets';

function AllPost(props) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([])
        .then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    },[])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w=1/4' key={post.$id}>
                            console.log(post);
                            
                            <PostCard {...post} />
                        </div>
                    ))}

                </div>
            </Container>
            
        </div>
    );
}

export default AllPost;