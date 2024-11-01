import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm } from '../Componets';

const EditPost = () => {
    const [post,SetPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
            .then((post) => {
                if (post) {
                    SetPost(post)
                }
            })
        }else {
            navigate(`/`)
        }
    },[slug,navigate])

    return post? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null;
};

export default EditPost;