import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Import Google OAuth component
import './Login.css'; // Import the CSS file for styling
import logo from './img/Logo.png'; // Import your logo
import etherum from './img/Group 334.png';
import cardano from './img/Group 335.png';
import litecoin from './img/Group 336.png';
import bitcoin from './img/Group 333.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Handle login with username and password
  const handleLogin = () => {
    // Simple username/password validation (can be expanded to use a backend)
    if (username === 'user' && password === 'password') {
      localStorage.setItem('authToken', 'my-auth-token');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle Google login
  const handleGoogleLogin = (response) => {
    if (response.credential) {
      const token = response.credential;
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } else {
      alert('Google login failed');
    }
  };

  return (
    <div className="login-container">
      {/* Slideshow at the top */}
      <div className="crypto-slideshow">
        <div className="slide"><img src={bitcoin} alt="Bitcoin" />Bitcoin</div>
        <div className="slide"><img src={etherum} alt="Ethereum" />Etherum</div>
        <div className="slide"><img src={litecoin} alt="Litecoin" /> Litecoin</div>
        <div className="slide"><img src={cardano} alt="Cardano" /> Cardano</div>
      </div>

      {/* Logo centered with animation */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="email-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <div className="google-login-container">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert('Login Failed')}
          useOneTap
        />
      </div>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default Login;
