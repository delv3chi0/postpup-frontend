import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Center,
} from '@chakra-ui/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const API_BASE = import.meta.env.DEV ? "http://localhost:5000" : "https://postpup-backend.onrender.com";
  const handleSubmit = async () => {
    try {
	const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Login successful', status: 'success', isClosable: true });
      } else {
        toast({ title: data.message || 'Login failed', status: 'error', isClosable: true });
      }
    } catch (err) {
      toast({ title: 'Server error', status: 'error', isClosable: true });
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
      <Box bg="white" p={8} rounded="md" boxShadow="lg" w="sm">
        <Heading mb={4} size="lg" textAlign="center">
          Login
        </Heading>
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
// trigger redeploy Wed May 14 10:36:54 AM PDT 2025
