
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';  
import Dashboard from './component/Dashboard'; 
import Login from './component/Login';         
import ProtectedRoute from './component/ProtectedRoute'; 

function App() {
  return (
    
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
