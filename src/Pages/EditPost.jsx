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
        return <p className="text-center">Loading...</p>; // Loading message
    }

    if (error) {
        return <p className="text-red-600 text-center">{error}</p>; // Display error message
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;
