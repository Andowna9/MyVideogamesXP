import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import Navbar from './components/Navbar';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home'
import MyList from './pages/MyList';
import GameSearch from './pages/GameSearch';
import GameDetail from './pages/GameDetail';
import LoadApp from './LoadApp';

const App = () => {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Router>
          <LoadApp>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/my-list' element={<MyList />} />
                <Route path='/search/games' element={<GameSearch />} />
                <Route path='/games/:id' element={<GameDetail />} />
            </Routes>
          </LoadApp>
        </Router>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;