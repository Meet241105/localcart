import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("userToken") || null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const register = async (name, email, password) => {
        const { data } = await axios.post(`${API_URL}/users/register`, {
            name,
            email,
            password,
        });
        setUser(data);
        setToken(data.token);
        localStorage.setItem("userToken", data.token);
        return data;
    };

    const login = async (email, password) => {
        const { data } = await axios.post(`${API_URL}/users/login`, {
            email,
            password,
        });
        setUser(data);
        setToken(data.token);
        localStorage.setItem("userToken", data.token);
        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
    };

    const getProfile = async () => {
        const authToken = token || localStorage.getItem("userToken");
        const { data } = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        setUser(data);
        return data;
    };

    useEffect(() => {
        const init = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                await getProfile();
            } catch (error) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                getProfile,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
