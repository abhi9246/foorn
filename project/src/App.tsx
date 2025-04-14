import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Upload, Activity, UtensilsCrossed, Search, TrendingUp, History, Settings, Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import Macros from './pages/Macros';
import Tracking from './pages/Tracking';
import Goals from './pages/Goals';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Navigation */}
      <nav className={`flex items-center justify-between px-8 py-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center gap-12">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <UtensilsCrossed className="text-coral-500" />
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Foorn</h1>
          </div>
          <div className="flex gap-8 text-gray-600">
            <button 
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === '/macros' 
                  ? (isDarkMode ? 'text-white' : 'text-black') 
                  : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
              }`}
              onClick={() => navigate('/macros')}
            >
              <Activity size={18} />
              Macros
            </button>
            <button 
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === '/tracking' 
                  ? (isDarkMode ? 'text-white' : 'text-black') 
                  : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
              }`}
              onClick={() => navigate('/tracking')}
            >
              <TrendingUp size={18} />
              Tracking
            </button>
            <button 
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === '/goals' 
                  ? (isDarkMode ? 'text-white' : 'text-black') 
                  : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
              }`}
              onClick={() => navigate('/goals')}
            >
              <History size={18} />
              Goals
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={handleSearch}
              className={`pl-10 pr-4 py-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-coral-500/20 w-64`}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-yellow-500' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors relative ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Settings size={20} />
            {showSettings && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <button className={`w-full text-left px-4 py-2 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}>Profile</button>
                <button className={`w-full text-left px-4 py-2 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}>Preferences</button>
                <button className={`w-full text-left px-4 py-2 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}>Sign Out</button>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/macros" element={<Macros />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </div>
  );
}

export default App;