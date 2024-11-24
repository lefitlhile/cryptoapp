import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // To redirect after successful registration

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password,
      });
      if (response.status === 201) {
        // Redirect to login page after successful registration
        history.push('/login');
      }
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
