// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        // Decode và lưu thông tin user từ token vào user state (nếu cần)
        // const decodedToken = decode(token);
        // setUser(decodedToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
