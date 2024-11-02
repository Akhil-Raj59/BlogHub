import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './Store/authSlice'; 
import { Footer, Header } from './Componets'; // Ensure proper import casing
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, [dispatch]); // Include dispatch in the dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl">Loading...</h2> {/* Simple loading message */}
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
