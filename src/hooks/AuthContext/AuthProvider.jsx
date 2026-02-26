/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import useAxiosSecure from '../axiosSecure/useAxiosSecure';

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // user Profile
    const fetchUserProfile = async () => {
        try {
            const res = await axiosSecure.get("donor/profile");
            return res.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const initializeUser = async () => {
            setLoading(true);
            const userData = await fetchUserProfile();
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        }
        initializeUser();
    }, []);

    const userInfo = {
        user,
        setUser,
        fetchUserProfile,
        loading
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;