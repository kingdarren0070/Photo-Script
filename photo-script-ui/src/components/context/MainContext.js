import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [image, setImage] = useState('');
    
    return (
        <MainContext.Provider value={
            {
                image,
                setImage,
                loggedIn,
                setLoggedIn
            }
        }>
            {children}
        </MainContext.Provider>
    );
};