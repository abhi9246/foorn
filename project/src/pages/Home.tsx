import React, { useState, useRef } from 'react';
import { Upload, Activity, ChevronRight } from 'lucide-react';

function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are supported');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewAnalysis = () => {
    console.log('Viewing detailed analysis');
  };

  const handleViewAllMeals = () => {
    console.log('Viewing all meals');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-7xl font-serif leading-tight dark:text-white">
              Discover<br />what's in<br />your meal
            </h2>
            <p className="text-lg max-w-md dark:text-gray-300">
              Upload your meal photo and get instant nutritional analysis with our AI-powered food recognition.
            </p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={handleUploadClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-coral-500 text-white px-8 py-4 rounded-full hover:bg-coral-600 transition-colors text-lg"
            >
              <Upload size={20} />
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
            <p className="text-sm dark:text-gray-400">
              Supported formats: JPG, PNG (max 10MB)
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="dark:text-gray-300">Today's Meals</p>
                <Activity size={18} className="text-coral-500" />
              </div>
              <p className="text-2xl font-semibold dark:text-white">4 meals</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="dark:text-gray-300">Calories</p>
                <Activity size={18} className="text-green-500" />
              </div>
              <p className="text-2xl font-semibold dark:text-white">1,840 kcal</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="dark:text-gray-300">Goal Progress</p>
                <Activity size={18} className="text-blue-500" />
              </div>
              <p className="text-2xl font-semibold dark:text-white">76%</p>
            </div>
          </div>
        </div>

        {/* Food Analysis Cards */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -top-12 -left-12 z-10">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                alt="Food decoration" 
                className="w-24 h-24 object-cover rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg" 
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <img 
                src={selectedImage || "https://images.unsplash.com/photo-1544025162-d76694265947"}
                alt="Steak dish" 
                className="w-full h-72 object-cover rounded-2xl mb-6" 
              />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">
                      Grilled Ribeye Steak
                    </h3>
                    <p className="dark:text-gray-400">Added today at 2:30 PM</p>
                  </div>
                  <button 
                    onClick={handleViewAnalysis}
                    className="text-coral-500 hover:text-coral-600 flex items-center gap-1"
                  >
                    View Analysis
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-opacity-80 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-coral-500/10 rounded-full mx-auto mb-2">
                      <Activity size={16} className="text-coral-500" />
                    </div>
                    <p className="text-sm mb-1 dark:text-gray-300">Protein</p>
                    <p className="text-xl font-semibold dark:text-white">32g</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-opacity-80 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-full mx-auto mb-2">
                      <Activity size={16} className="text-blue-500" />
                    </div>
                    <p className="text-sm mb-1 dark:text-gray-300">Fats</p>
                    <p className="text-xl font-semibold dark:text-white">24g</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-opacity-80 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500/10 rounded-full mx-auto mb-2">
                      <Activity size={16} className="text-green-500" />
                    </div>
                    <p className="text-sm mb-1 dark:text-gray-300">Carbs</p>
                    <p className="text-xl font-semibold dark:text-white">45g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Meals Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Recent Meals</h3>
              <button 
                onClick={handleViewAllMeals}
                className="text-coral-500 hover:text-coral-600 text-sm"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1547496502-affa22d38842"
                alt="Recent meal 1"
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                alt="Recent meal 2"
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              />
              <img 
                src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
                alt="Recent meal 3"
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;