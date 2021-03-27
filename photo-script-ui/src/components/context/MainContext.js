import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    
    return (
        <MainContext.Provider value={
            {
                loggedIn, setLoggedIn
            }
        }>
            {children}
        </MainContext.Provider>
    );
};