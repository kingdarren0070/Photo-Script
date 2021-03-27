import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [image, setImage] = useState(null);
    
    return (
        <MainContext.Provider value={
            {
                loggedIn, setLoggedIn,
                image, setImage
            }
        }>
            {children}
        </MainContext.Provider>
    );
};