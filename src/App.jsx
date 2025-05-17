import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';

function App() {
  console.log("✅ App is rendering");
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
