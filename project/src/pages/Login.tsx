import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import endpoints from '../apiConfig';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
  isDarkMode: boolean;
}

function Login({ setIsAuthenticated, isDarkMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(endpoints.auth.login, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setSuccess('Login successful!');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect on successful login
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000); // Show success for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div
        className={`relative w-full max-w-md p-8 rounded-2xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-coral-500 hover:text-coral-600 transition-colors"
          aria-label="Go back to home"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex items-center justify-center gap-2 mb-8">
          <UtensilsCrossed className="text-coral-500" size={24} />
          <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Foorn
          </h1>
        </div>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Login
        </h2>
        {error && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-semibold text-white bg-red-600 ${
              isDarkMode ? 'bg-red-700' : 'bg-red-600'
            }`}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-semibold text-white bg-green-500 ${
              isDarkMode ? 'bg-green-600' : 'bg-green-500'
            }`}
          >
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-4 py-2 rounded-full border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-coral-500/20`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 w-full px-4 py-2 rounded-full border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-coral-500/20`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-coral-500'} text-white px-4 py-2 rounded-full hover:bg-coral-600 transition-colors`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p
          className={`mt-4 text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-coral-500 hover:text-coral-600"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;