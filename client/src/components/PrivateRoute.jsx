import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  const isAuthenticated = token && tokenExpiry && Date.now() < parseInt(tokenExpiry);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;