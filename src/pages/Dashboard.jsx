import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box p={8}>
      <Heading>Welcome to PostPup!</Heading>
      <Text mt={4}>You're successfully logged in 🎉</Text>
    </Box>
  );
}
