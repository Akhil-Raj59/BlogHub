import React from 'react';
import { Container, PostForm } from '../Componets'; // Ensure the import path is correct

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <h1 className="text-2xl font-bold text-center mb-6">Add a New Post</h1>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
