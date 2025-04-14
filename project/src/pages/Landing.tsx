import React from 'react';
import { UtensilsCrossed, Sun, Moon, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Landing({ isDarkMode, toggleDarkMode }: LandingProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify token validity here by calling backend
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`flex items-center justify-between px-8 py-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <UtensilsCrossed className="text-coral-500" size={24} />
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
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 text-coral-500 hover:text-coral-600"
              >
                <LogIn size={18} />
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-4 py-2 bg-coral-500 text-white rounded-full hover:bg-coral-600"
              >
                <UserPlus size={18} />
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-coral-500 hover:text-coral-600"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1
            className={`text-5xl md:text-7xl font-serif leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Unlock<br />Your Meal's<br />Secrets
          </h1>
          <p className={`text-lg max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Foorn uses cutting-edge AI to analyze your meal photos, delivering instant nutritional insights to empower your health journey.
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? '/home' : '/signup')}
            className="flex items-center justify-center gap-2 bg-coral-500 text-white px-8 py-4 rounded-full hover:bg-coral-600 transition-colors text-lg"
          >
            {isAuthenticated ? 'Analyze Now' : 'Get Started'}
          </button>
        </div>
        <div className="flex-1 relative">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947"
            alt="Delicious meal"
            className="w-full h-96 object-cover rounded-3xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
            alt="Meal decoration"
            className="absolute -bottom-6 -left-6 w-32 h-32 object-cover rounded-full shadow-md ring-4 ring-white dark:ring-gray-800"
          />
        </div>
      </section>
            
      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-8 py-16 mt-16">
        <h2
          className={`text-3xl font-bold mb-12 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Why Foorn?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`p-6 rounded-2xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } hover:shadow-md transition-shadow`}
          >
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="AI Analysis"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Smart AI Recognition
            </h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Our AI instantly identifies foods in your photos, providing accurate nutritional data.
            </p>
          </div>
          <div
            className={`p-6 rounded-2xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } hover:shadow-md transition-shadow`}
          >
            <img
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
              alt="Health Insights"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Nutritional Insights
            </h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Understand calories, macros, and more to make informed dietary choices.
            </p>
          </div>
          <div
            className={`p-6 rounded-2xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } hover:shadow-md transition-shadow`}
          >
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
              alt="Easy to Use"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Effortless Experience
            </h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Upload a photo and get results in seconds—no complicated steps required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;