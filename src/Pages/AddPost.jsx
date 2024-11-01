import React from 'react';
import { Container,PostForm } from '../Componets';


function AddPost(props) {
    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
            
        </div>
    );
}

export default AddPost;