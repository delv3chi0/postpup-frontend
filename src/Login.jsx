import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

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
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
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
        Don’t have an account? <Link to="/register" style={{ color: '#3182ce' }}>Sign up here</Link>
      </Text>
    </Box>
  );
}
