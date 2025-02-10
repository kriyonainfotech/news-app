import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const backend_API = import.meta.env.VITE_API_URL;
console.log(backend_API);

// Create UserContext
export const AuthContext = createContext();

// UserProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User data state
    const [token, setToken] = useState(null); // User data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for better debugging
    
    // const token = JSON.parse(localStorage.getItem('token'));
// console.log(token);

    useEffect(() => {
        const getAuth = async () => {
            try {
                setLoading(true); // Ensure loading is set to true before fetching
                const response = await axios.get(`${backend_API}/auth/checkAuth`, {
                    withCredentials: true, // Include cookies in the request
                });

                if (response.status === 200) {
                    setToken(response.data.token); // Set user data
                    console.log("Fetched user data:", response.data.token);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err);

                if (err.response?.status === 403) {
                    console.error("Invalid or expired token. Redirecting to login...");
                    window.location.href = "/signin"; // Redirect to login page
                }
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        getAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, loading, error }}>
            {!loading ? children : <></>} {/* Loading fallback */}
        </AuthContext.Provider>
    );
};
