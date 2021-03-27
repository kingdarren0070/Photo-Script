import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({});
    
    return (
        <MainContext.Provider value={
            {
                image,
                setImage,
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