import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';
import { AuthContext } from './context/AuthProvider';
import jwtDecode from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const backendUrl = import.meta.env.DEV
        ? 'http://localhost:5000'
        : 'https://postpup-backend.onrender.com';

      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.token);
        if (decoded.exp * 1000 < Date.now()) {
          setError('Token expired immediately. Something went wrong.');
          return;
        }
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Login error:', err);
    }
  };

  return (
    <Box maxWidth="md" borderWidth="1px" borderRadius="md" p={4} mx="auto" mt={8}>
      <Heading mb={4} textAlign="center">Login</Heading>
      {error && <Text color="red.500" mb={2}>{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          mb={2}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          mb={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button colorScheme="blue" width="full" type="submit">Log In</Button>
      </form>
      <Text mt={2} textAlign="center">
        Don't have an account? <Link to="/register" style={{ color: '#3182ce' }}>Sign up here</Link>
      </Text>
    </Box>
  );
}
