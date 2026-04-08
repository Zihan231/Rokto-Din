"use client";
import useAxios from '@/hooks/axios/useAxios';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const TotalDonorAboutPage = () => {
    const api = useAxios();
    const [totalDonors, setTotalDonors] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // 1️⃣ Set up Framer Motion values for the counter
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round); // Keeps the number as a whole integer

    // 2️⃣ Fetch Data
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true); 
                const response = await api.get('/user/counts');
                if (response.data?.data?.totalDonors !== undefined) {
                    setTotalDonors(response.data.data.totalDonors);
                }
            } catch (error) {
                console.error("Failed to fetch donor stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [api]);

    useEffect(() => {
        if (!isLoading && totalDonors > 0) {
            const animation = animate(count, totalDonors, {
                duration: 2, // How long the counting takes (2 seconds)
                ease: "easeOut", // Starts fast, slows down at the end
            });

            return animation.stop; 
        }
    }, [isLoading, totalDonors, count]);

    return (
        <div className="flex items-center justify-center min-h-10">
            {isLoading ? (
                // 4️⃣ Elegant CSS loading spinner (using Tailwind)
                <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            ) : (
                // 5️⃣ The Animated Number
                <motion.span className="text-4xl font-bold">
                    {rounded}
                </motion.span>
            )}
        </div>
    );
};

export default TotalDonorAboutPage;