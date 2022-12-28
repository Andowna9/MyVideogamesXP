import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Router>
            <AppRoutes />
        </Router>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;