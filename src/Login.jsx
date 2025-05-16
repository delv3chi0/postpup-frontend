import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        />
        <Input
          type="password"
          placeholder="Password"
          mb={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" width="full" type="submit">Log In</Button>
      </form>
      <Text mt={2} textAlign="center">
        Don't have an account? <Link color="blue.500" to="/register">Sign up here</Link>
      </Text>
    </Box>
  );
}

export default Login;
