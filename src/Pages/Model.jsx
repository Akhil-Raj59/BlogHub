import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Model = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL doesn't contain "/add-post"
    if (!location.pathname.includes("/add-post")) {
      // Show the modal after 3 seconds
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 15000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [location.pathname]);

  const handleAddPostClick = () => {
    navigate("/add-post");
  };

  if (!showModal) return null; // Don't render anything if the modal shouldn't show

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Share Your Valuable Post
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Contribute to our community by sharing your knowledge and insights.
        </p>
        <button
          onClick={handleAddPostClick}
          className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Add Post
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default Model;
