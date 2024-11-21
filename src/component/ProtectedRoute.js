// src/component/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if user is authenticated

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the children (Dashboard)
};

export default ProtectedRoute;
