import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  console.log('✅ App component rendering');

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
