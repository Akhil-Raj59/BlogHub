import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/conf";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block w-full transition-transform transform hover:scale-105">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md p-4 transition duration-200 hover:shadow-lg">
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-lg w-full h-auto max-h-48 object-cover"
                    />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
