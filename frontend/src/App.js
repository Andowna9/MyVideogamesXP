import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import MyList from './pages/MyList';
import GameSearch from './pages/GameSearch';
import GameDetail from './pages/GameDetail';

const App = () => {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<GameSearch />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/my-list' element={<MyList />} />
                <Route path='/games/:id' element={<GameDetail />} />
            </Routes>
        </Router>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;