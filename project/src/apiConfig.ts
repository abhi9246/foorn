const API_BASE_URL = 'http://localhost:8000';

const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    verifyToken: `${API_BASE_URL}/auth/verify-token`,
  },
  dish: {
    analyze: `${API_BASE_URL}/dish/analyze`,
  },
};

export default endpoints;