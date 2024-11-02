import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    const handleNavigation = (slug) => {
        navigate(slug);
        setIsMenuOpen(false);
    };

    const NavItem = ({ item }) => (
        <NavLink
            to={item.slug}
            className={({ isActive }) =>
                `px-4 py-2 text-gray-700 rounded-lg transition-all duration-200 font-medium 
                ${isActive ? 'text-blue-500' : 'hover:bg-gray-100 hover:text-gray-900'}`
            }
            onClick={() => handleNavigation(item.slug)}
        >
            {item.name}
        </NavLink>
    );

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <Container>
                <nav className="py-4" aria-label="Main Navigation">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <Logo />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navItems.filter(item => item.active).map((item) => (
                                <NavItem key={item.name} item={item} />
                            ))}
                            {authStatus && <LogoutBtn aria-label="Logout" />}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 transition-all duration-300 ease-in-out">
                            <div className="flex flex-col space-y-2">
                                {navItems.filter(item => item.active).map((item) => (
                                    <NavItem key={item.name} item={item} />
                                ))}
                                {authStatus && <LogoutBtn aria-label="Logout" />}
                            </div>
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    );
}

export default Header;
