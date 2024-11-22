// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import Google OAuth provider
import Dashboard from './component/Dashboard'; // Your existing Dashboard component
import Login from './component/Login';         // The Login component
import ProtectedRoute from './component/ProtectedRoute'; // ProtectedRoute component

function App() {
  return (
    // Wrap your Router in GoogleOAuthProvider and provide your clientId
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected route for Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />  {/* Only render Dashboard if authenticated */}
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect from the root path to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
