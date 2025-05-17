console.log('📄 RegistrationPage component rendering');
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const backendUrl = import.meta.env.DEV
        ? 'http://localhost:5000'
        : 'https://postpup-backend.onrender.com';

      const response = await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Registration successful!');
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error('Registration error:', err);
    }
  };

  return (
    <Box maxWidth="md" borderWidth="1px" borderRadius="md" p={4} mx="auto" mt={8}>
      <Heading mb={4} textAlign="center">Register</Heading>
      {error && <Text color="red.500" mb={2}>{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="First Name"
          mb={2}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          mb={2}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder="Email"
          mb={2}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          mb={2}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          mb={4}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="blue" width="full" type="submit">Register</Button>
      </form>
      <Text mt={2} textAlign="center">
        Already have an account? <Link to="/login" style={{ color: '#3182ce' }}>Log in</Link>
      </Text>
    </Box>
  );
}
