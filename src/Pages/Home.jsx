import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, PostCard, Button } from "../Componets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "../assets/hero.jpg";
import hero2Image from "../assets/hero2.jpg";
import service from "../appwrite/conf";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [postsPerView, setPostsPerView] = useState(3);
    const isLoggedIn = useSelector((state) => state.auth.status);

    const text = "No Posts Available";
    const staticChar = text[0];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setPostsPerView(1);
            } else if (window.innerWidth < 1024) {
                setPostsPerView(2);
            } else {
                setPostsPerView(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await service.getPosts();
                if (response) {
                    setPosts(response.documents.reverse());
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchPosts();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (posts.length === 0) {
            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    setDisplayedText((prev) => prev + text[charIndex]);
                    setCharIndex((prev) => prev + 1);
                } else {
                    setDisplayedText(staticChar);
                    setCharIndex(1);
                }
            }, 200);

            return () => clearInterval(interval);
        }
    }, [charIndex, posts.length, text]);

    useEffect(() => {
        if (posts.length > postsPerView) {
            const interval = setInterval(() => {
                handleNext();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, posts.length, postsPerView]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - postsPerView;
            return newIndex < 0 ? Math.floor((posts.length - 1) / postsPerView) * postsPerView : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + postsPerView;
            return newIndex >= posts.length ? 0 : newIndex;
        });
    };

    const PostSlider = () => {
        const sliderRef = React.useRef(null);
    
        // Sync scroll position to `currentIndex`
        useEffect(() => {
            if (sliderRef.current) {
                const scrollAmount = (currentIndex / postsPerView) * sliderRef.current.offsetWidth;
                sliderRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }, [currentIndex, postsPerView]);
    
        return (
            <div className="relative w-full px-4 sm:px-8 lg:px-12 py-8">
                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-white transition-all duration-300 transform hover:scale-110"
                    disabled={posts.length <= postsPerView}
                >
                    <ChevronLeft size={24} />
                </button>
    
                <button
                    onClick={handleNext}
                    className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-white transition-all duration-300 transform hover:scale-110"
                    disabled={posts.length <= postsPerView}
                >
                    <ChevronRight size={24} />
                </button>
    
                {/* Slider Container */}
                <div
                    ref={sliderRef}
                    className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
                >
                    <div
                        className="flex gap-3 sm:gap-4 lg:gap-6 transition-transform duration-500 ease-out"
                        style={{
                            width: `${(posts.length * 100) / postsPerView}%`,
                        }}
                    >
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                style={{ width: `${100 / postsPerView}%` }}
                                className="px-1 sm:px-2 transform transition-all duration-300 hover:scale-105 snap-start"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
    
                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 sm:mt-6 gap-2">
                    {Array.from({ length: Math.ceil(posts.length / postsPerView) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * postsPerView)}
                            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                Math.floor(currentIndex / postsPerView) === index
                                    ? "bg-pink-500 w-8 sm:w-6"
                                    : "bg-gray-600 hover:bg-pink-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        );
    };
    

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center space-y-4">
                    <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-t-pink-500 rounded-full animate-spin" />
                    </div>
                    <h1 className="text-xl font-semibold text-pink-500/80 animate-pulse">
                        Loading amazing content...
                    </h1>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-900 text-white">
                <div className="w-full md:w-1/2 p-8 text-left flex flex-col justify-center space-y-4">
                    <h1 className="text-5xl font-bold text-pink-500">
                        {staticChar}
                        <span className="animate-pulse">{displayedText.slice(1)}</span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Explore exciting content and share your own stories! Log in now to get started.
                    </p>
                    <Link to="/login">
                        <Button size="md" variant="primary">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 sm:py-12">
            <Container>
                <div className="text-center space-y-4 mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent animate-bounce">
                        Latest Posts
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg">
                        Discover and explore the newest content from our community
                    </p>
                </div>

                <PostSlider />
            </Container>
        </div>
    );
}
