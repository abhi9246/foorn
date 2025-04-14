import React, { useState, useRef, useEffect } from 'react';
import { Upload, UtensilsCrossed, Sun, Moon, LogOut, Apple, Droplet, Wheat, Flame, Leaf, Candy, Scale, Eye, Citrus, Bone, Magnet, Battery, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import endpoints from '../apiConfig';

interface HomeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleSignOut: () => void;
}

function Home({ isDarkMode, toggleDarkMode, handleSignOut }: HomeProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dishName, setDishName] = useState<string>('');
  const [nutritionalData, setNutritionalData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzedOnce, setHasAnalyzedOnce] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Function to format the dish name
  const formatDishName = (dishName: string): string => {
    return dishName
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

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
          if (!data.valid) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      verifyToken(token);
    }
  }, [navigate]);

  const handleUploadClick = () => {
    if (isLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPG and PNG files are supported');
        return;
      }

      setSelectedImage(URL.createObjectURL(file));
      setIsLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append('image', file);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated. Please login again.');
        setIsLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(endpoints.dish.analyze, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        
        // Add a small delay to ensure proper UI feedback
        setTimeout(() => {
          async function fetchData() {
            if (response.ok) {
              const data = await response.json();
              setDishName(formatDishName(data.dish_name || 'Unknown Dish'));
              console.log(data)
              setNutritionalData(data || null);
              setHasAnalyzedOnce(true);
            } else {
              const errorData = await response.json();
              setError(errorData.detail || 'Failed to analyze dish');
            }
            setIsLoading(false);
          }
          fetchData();
        }, 500);
      } catch (err) {
        setError('Network error. Please try again.');
        setIsLoading(false);
      }
    }
  };

  // Map nutrients to icons and colors, with corresponding background colors
  const nutrientIcons = [
    { key: 'calories', label: 'Calories', value: nutritionalData ? `${nutritionalData.calories} kcal` : '-', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
    { key: 'protein', label: 'Protein', value: nutritionalData ? `${nutritionalData.protein}g` : '-', icon: Apple, color: 'text-red-500', bg: 'bg-red-100' },
    { key: 'carbohydrates', label: 'Carbs', value: nutritionalData ? `${nutritionalData.carbohydrates}g` : '-', icon: Wheat, color: 'text-amber-500', bg: 'bg-amber-100' },
    { key: 'fats', label: 'Fats', value: nutritionalData ? `${nutritionalData.fats}g` : '-', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-100' },
    { key: 'fiber', label: 'Fiber', value: nutritionalData ? `${nutritionalData.fiber}g` : '-', icon: Leaf, color: 'text-green-500', bg: 'bg-green-100' },
    { key: 'sugar', label: 'Sugar', value: nutritionalData ? `${nutritionalData.sugar}g` : '-', icon: Candy, color: 'text-pink-500', bg: 'bg-pink-100' },
    { key: 'vitamin_a', label: 'Vitamin A', value: nutritionalData ? `${nutritionalData.vitamins?.vitamin_a}μg` : '-', icon: Eye, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { key: 'vitamin_c', label: 'Vitamin C', value: nutritionalData ? `${nutritionalData.vitamins?.vitamin_c}mg` : '-', icon: Citrus, color: 'text-orange-400', bg: 'bg-orange-100' },
    { key: 'vitamin_d', label: 'Vitamin D', value: nutritionalData ? `${nutritionalData.vitamins?.vitamin_d}μg` : '-', icon: Sun, color: 'text-amber-400', bg: 'bg-amber-100' },
    { key: 'calcium', label: 'Calcium', value: nutritionalData ? `${nutritionalData.minerals?.calcium}mg` : '-', icon: Bone, color: 'text-teal-500', bg: 'bg-teal-100' },
    { key: 'iron', label: 'Iron', value: nutritionalData ? `${nutritionalData.minerals?.iron}mg` : '-', icon: Magnet, color: 'text-slate-500', bg: 'bg-slate-200' },
    { key: 'potassium', label: 'Potassium', value: nutritionalData ? `${nutritionalData.minerals?.potassium}mg` : '-', icon: Battery, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav
        className={`flex items-center justify-between px-8 py-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <UtensilsCrossed className="text-orange-500" size={24} />
          <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Foorn
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700 text-yellow-500' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-orange-500 hover:text-orange-600"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section with single line heading */}
        <div className="text-center mb-6">
          <h2 className={`text-4xl font-serif mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Discover what's in your meal
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Upload your meal photo and get instant nutritional analysis with our AI-powered food recognition.
          </p>
        </div>
        
        {/* Upload Button Centered Below Intro Text */}
        <div className="flex flex-col items-center mb-12">
          <button 
            onClick={handleUploadClick}
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white px-8 py-4 rounded-full transition-colors text-lg shadow-md mb-3`}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload size={20} />
                {hasAnalyzedOnce ? 'Upload Another Dish' : 'Upload a Dish'}
              </>
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png"
            className="hidden"
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-600 font-semibold mt-2">{error}</p>
          )}
          {/* Format info */}
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supported formats: JPG, PNG (max 10MB)
          </p>
        </div>

        {/* Extra Wide Horizontal Card Layout */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-lg overflow-hidden w-full`}>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-2/5">
              <div className="relative h-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-96 bg-gray-200 dark:bg-gray-700">
                    <div className="relative">
                      {selectedImage && (
                        <img 
                          src={selectedImage}
                          alt="Analyzing..." 
                          className="w-full h-96 object-cover opacity-40"
                        />
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 size={60} className={`animate-spin ${isDarkMode ? 'text-orange-400' : 'text-orange-500'} mb-4`} />
                        <p className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                          Analyzing your meal...
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                          Our AI is identifying ingredients and nutrition facts
                        </p>
                      </div>
                    </div>
                  </div>
                ) : selectedImage ? (
                  <img 
                    src={selectedImage}
                    alt="Meal dish" 
                    className="w-full h-full object-cover" 
                    style={{ minHeight: "400px" }}
                  />
                ) : (
                  <div className={`flex flex-col items-center justify-center h-full min-h-96 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Upload size={48} className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`} />
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Upload a photo to analyze
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Get nutrition facts in seconds
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side - Nutritional Data */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                {/* Enhanced Dish Name Styling */}
                <h3 className={`font-serif text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} border-b border-orange-300 pb-2 inline-block`}>
                  {isLoading 
                    ? 'Analyzing your dish...' 
                    : (dishName || 'Upload a photo to see nutrition facts')}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                  {nutritionalData 
                    ? `Nutritional information per ${nutritionalData.serving_size} serving` 
                    : 'Detailed nutritional breakdown will appear here'}
                </p>
              </div>
              
              {/* Nutrients Grid - 4 columns for wider layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isLoading ? (
                  // Skeleton loading for nutrients
                  Array(12).fill(0).map((_, i) => (
                    <div 
                      key={i}
                      className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl`}
                    >
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} animate-pulse`}></div>
                      <div className={`h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded w-16 mx-auto mb-2 animate-pulse`}></div>
                      <div className={`h-5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded w-12 mx-auto animate-pulse`}></div>
                    </div>
                  ))
                ) : (
                  nutrientIcons.map((nutrient) => {
                    const Icon = nutrient.icon;
                    return (
                      <div
                        key={nutrient.key}
                        className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl transition-all duration-300 hover:shadow-md`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-gray-600' : nutrient.bg} rounded-full mx-auto mb-2`}>
                          <Icon size={20} className={nutrient.color} />
                        </div>
                        <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{nutrient.label}</p>
                        <p className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{nutrient.value}</p>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Empty State Call-to-Action */}
              {!selectedImage && !isLoading && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={handleUploadClick}
                    className={`px-6 py-2 border-2 border-orange-500 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'} rounded-full hover:bg-orange-500 hover:text-white transition-colors`}
                  >
                    Upload your first meal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;