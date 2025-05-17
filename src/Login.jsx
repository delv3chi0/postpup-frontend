console.log('📄 Login component rendering');
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useAuth } from './context/AuthProvider';
import jwtDecode from 'jwt-decode';

export default function Login() {
console.log("🔐 Login page is rendering");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const backendUrl = import.meta.env.DEV
        ? 'http://localhost:5000'
        : 'https://postpup-backend.onrender.com';

      const res = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <Heading mb={4}>Log In</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleLogin}>
        <Input
          placeholder="Email"
          mb={2}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          mb={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" width="full" type="submit">
          Log In
        </Button>
      </form>
      <Text mt={4}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#3182ce' }}>
          Register
        </Link>
      </Text>
    </Box>
  );
}
