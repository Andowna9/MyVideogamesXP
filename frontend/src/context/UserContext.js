import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = { user, setUser }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext was used outside of its Provider');
    }
    return context;
};

export { UserContextProvider, useUserContext };