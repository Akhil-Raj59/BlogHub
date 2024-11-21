import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/conf";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link 
            to={`/post/${$id}`} 
            className="
                block 
                w-full 
                group 
                transition-all 
                duration-300 
                transform 
                hover:scale-105 
                focus:scale-105
                hover:z-10
                focus:z-10
            "
        >
            <div 
                className="
                    bg-gray-900 
                    border 
                    border-gray-800 
                    rounded-xl 
                    overflow-hidden 
                    shadow-dark-glow 
                    p-4 
                    transition-all 
                    duration-300 
                    group-hover:shadow-dark-intense
                    group-focus:shadow-dark-intense
                    hover:border-pink-700
                    focus:border-pink-700
                "
            >
                <div className="w-full flex justify-center mb-4 overflow-hidden rounded-lg">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="
                            rounded-lg 
                            w-full 
                            h-auto 
                            max-h-48 
                            object-cover 
                            transition-transform 
                            duration-300 
                            group-hover:scale-110 
                            group-focus:scale-110
                        "
                    />
                </div>
                <h2 
                    className="
                        text-lg 
                        sm:text-xl 
                        font-semibold 
                        text-gray-300 
                        line-clamp-2 
                        group-hover:text-pink-500 
                        group-focus:text-pink-500 
                        transition-colors 
                        duration-300
                    "
                >
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default React.memo(PostCard);