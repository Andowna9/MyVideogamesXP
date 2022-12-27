import {
CircularProgress,
Flex
} from '@chakra-ui/react';
import { useUserContext } from './context/UserContext';
import { useEffect, useState } from 'react';
import axios from './api/axiosInstance';

const LoadApp = ({ children }) => {
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
        <div>{children}</div>
    );
}

export default LoadApp;