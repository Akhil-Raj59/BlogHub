import React from 'react';
import { Container, PostForm } from '../Componets'; // Ensure the import path is correct

function AddPost() {
    return (
        <div className="relative py-12 bg-gradient-to-br from-white via-black to-dark-600">
            <Container>
                <div
                    className="
                        max-w-5xl mx-auto 
                        bg-dark-900 
                        border border-dark-700 
                        rounded-lg 
                        shadow-dark-glow 
                        overflow-hidden 
                        px-6 py-8 
                        relative
                        hover:shadow-dark-intense 
                        transition-all 
                        duration-300 
                        transform 
                        hover:scale-[1.02]
                    "
                >
                    <h1 
                        className="
                            text-3xl 
                            sm:text-4xl 
                            font-extrabold 
                            text-center 
                            text-pink-500 
                            mb-8 
                            animate-text-gradient
                        "
                    >
                        Add a New Post
                    </h1>
                    
                    <PostForm />
                </div>
            </Container>
        </div>
    );
}

export default AddPost;
