const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock users for demo (replace with real database in production)
const users = [
  { email: 'user@example.com', password: 'password123', username: 'user' }
];

// Register route for adding new users
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).send('Email already exists');
  }

  // Encrypt password before storing (in production use bcrypt)
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashedPassword, username });

  res.status(201).send('User registered successfully');
});

// Login route for authenticating user with email and password
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // Compare password with the hashed password
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(401).send('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email, username: user.username }, 'your_jwt_secret_key', {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Protected route to get dashboard data
app.get('/api/dashboard', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Access denied');
  }

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    res.json({ message: `Welcome, ${user.username}!` });
  });
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
