import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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
            <Home
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleSignOut={handleSignOut}
            />
          }
        />
        <Route
          path="/login"
          element={<Login isDarkMode={isDarkMode} />}
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
