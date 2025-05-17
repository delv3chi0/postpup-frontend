console.log('📄 Dashboard component rendering');
import { Box, Heading, Text, VStack, Divider, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleGenerateCaption = () => {
    toast({
      title: "Feature coming soon!",
      description: "AI-generated captions are on the roadmap.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="3xl" mx="auto" mt={8} px={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Dashboard</Heading>
        <LogoutButton />
      </Box>

      <Divider my={6} />

      <VStack align="start" spacing={6}>
        <Box>
          <Heading size="md">Scheduled Posts</Heading>
          <Text color="gray.600">You don’t have any posts scheduled yet.</Text>
        </Box>

        <Box>
          <Heading size="md">Analytics Summary</Heading>
          <Text color="gray.600">Analytics will appear here once you’ve posted content.</Text>
        </Box>

        <Box>
          <Heading size="md">AI Tools</Heading>
          <Button mt={2} colorScheme="blue" onClick={handleGenerateCaption}>
            Try Caption Generator
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
