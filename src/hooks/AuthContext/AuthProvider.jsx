/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import useAxiosSecure from '../axiosSecure/useAxiosSecure';

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const res = await axiosSecure.get("/donor/profile");
            return res.data.data;
        } catch (err) {
            console.log("profile fetch failed:", err.response?.status, err.response?.data);
            throw err;
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            setLoading(true);
            try {
                const userData = await fetchUserProfile();
                if (userData) {
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, []);

    const userInfo = {
        user,
        setUser,
        fetchUserProfile,
        loading
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;