import {
CircularProgress,
Flex
} from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

import Navbar from '../components/Navbar';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import MyList from '../pages/MyList';
import GameSearch from '../pages/GameSearch';
import GameDetail from '../pages/GameDetail';

const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to='/login' />;
    }
    return children;
}

const AppRoutes = () => {
    const [isLoading, setLoading] = useState(true);
    const { user, setUser } = useUserContext();
    useEffect(() => {
        if (!user) {
            axios.get('/accounts/users/me')
            .then((result) => {
                setUser(result.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log('Unauthorized access to app');
                }
                else {
                    console.log(error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [user, setUser]);

    if (isLoading) {
        return (
            <Flex 
            align='center' 
            justify='center'
            minH='80vh'>
                <CircularProgress 
                size='60px'
                isIndeterminate 
                color='blue.500' />
            </Flex>
        );
    }

    return (
        <>
            <Navbar />
            <Routes>
                    <Route path='/' element={<Navigate to='/search/games'/>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/search/games' element={<GameSearch />} />
                    <Route path='/games/:id' element={<GameDetail />} />
                    <Route 
                    path='/my-list' 
                    element={
                        <ProtectedRoute user={user}>
                            <MyList />
                        </ProtectedRoute>
                    } 
                    />
            </Routes>
        </>
    );
};

export default AppRoutes;