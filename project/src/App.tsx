import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import endpoints from './apiConfig';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  // On app mount, verify token if exists
  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const formData = new FormData();
        formData.append('token', token);

        const response = await fetch(endpoints.auth.verifyToken, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid) {
            setIsAuthenticated(true);
            if (window.location.pathname === '/login' || window.location.pathname === '/') {
              navigate('/home');
            }
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setIsAuthenticated(false);
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                handleSignOut={handleSignOut}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<Login isDarkMode={isDarkMode} setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup isDarkMode={isDarkMode} />}
        />
      </Routes>
    </div>
  );
}

export default App;