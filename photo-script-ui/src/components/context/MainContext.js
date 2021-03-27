import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    
    return (
        <MainContext.Provider value={
            {
                loggedIn,
                user,
                setLoggedIn,
                setUser
            }
        }>
            {children}
        </MainContext.Provider>
    );
};