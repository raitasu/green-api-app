import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedMessage, setSelectedMessage] = useState('');

    return (
        <ChatContext.Provider value={{ selectedMessage, setSelectedMessage }}>
            {children}
        </ChatContext.Provider>
    );
};
