"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, HeartHandshake, MapPin, Headset } from 'lucide-react';
import useAxios from '@/hooks/axios/useAxios';

// 1️⃣ NEW HELPER: Splits a string into numbers and text.
// "24/7" becomes -> [{isNum: true, val: 24}, {isNum: false, val: "/"}, {isNum: true, val: 7}]
const parseStatString = (str) => {
    if (!str) return [];
    const stringVal = String(str);
    // Split by digits, keeping the digits in the resulting array
    const chunks = stringVal.split(/(\d+)/).filter(Boolean);
    
    return chunks.map(chunk => {
        if (/^\d+$/.test(chunk)) {
            return { isNumber: true, value: parseInt(chunk, 10) };
        }
        return { isNumber: false, value: chunk };
    });
};

// 2️⃣ NEW COUNTER: Animates a "progress" from 0 to 1, multiplying all numbers by it!
const AnimatedCounter = ({ parts, startAnimation }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (startAnimation) {
            const animation = animate(0, 1, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => {
                    setProgress(latest);
                },
            });
            return animation.stop;
        }
    }, [startAnimation]);

    return (
        <span>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {/* If it's a number, multiply target by progress. If text, render exactly as is. */}
                    {part.isNumber ? Math.round(part.value * progress) : part.value}
                </React.Fragment>
            ))}
        </span>
    );
};

const SiteStats = () => {
    const t = useTranslations('SiteStats');
    const api = useAxios();
    
    const [dbStats, setDbStats] = useState({ donors: 0, donations: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" }); 

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/user/counts');
                setDbStats({
                    donors: response.data?.data?.totalDonors || 0,
                    donations: response.data?.data?.totalDonations || 0,
                });
            } catch (error) {
                console.error("Failed to fetch site stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [api]);

    // 3️⃣ Configuration using the new "parts" structure
    const statConfig = [
        {
            key: "donors",
            icon: <Users className="w-6 h-6" />,
            bg: "bg-red-50",
            parts: [
                { isNumber: true, value: dbStats.donors },
                { isNumber: false, value: "+" }
            ]
        },
        {
            key: "donations",
            icon: <HeartHandshake className="w-6 h-6" />,
            bg: "bg-red-50",
            parts: [
                { isNumber: true, value: dbStats.donations },
                { isNumber: false, value: "+" }
            ]
        },
        {
            key: "cities",
            icon: <MapPin className="w-6 h-6" />,
            bg: "bg-red-50",
            parts: parseStatString(t('cities.value'))
        },
        {
            key: "support",
            icon: <Headset className="w-6 h-6" />,
            bg: "bg-red-50",
            // Automatically parses "24/7" into the animatable chunks!
            parts: parseStatString(t('support.value')) 
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="mx-auto px-4 md:px-8 my-20">
            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border border-base-200 shadow-xl shadow-gray-200/40 rounded-[2.5rem] py-16 px-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-10 gap-x-4"
            >
                {statConfig.map((stat, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center group relative"
                    >
                        {/* Icon Container */}
                        <div className={`w-14 h-14 ${stat.bg} text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                            {stat.icon}
                        </div>
                        
                        {/* Value rendering */}
                        <h4 className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter min-h-[48px] flex items-center justify-center">
                            {isLoading && (stat.key === "donors" || stat.key === "donations") ? (
                                <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                            ) : (
                                <AnimatedCounter 
                                    parts={stat.parts} 
                                    startAnimation={isInView && (!isLoading || (stat.key !== "donors" && stat.key !== "donations"))} 
                                />
                            )}
                        </h4>
                        
                        {/* Label */}
                        <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                            {t(`${stat.key}.label`)}
                        </p>

                        {/* Divider Line */}
                        {index !== statConfig.length - 1 && (
                            <div className="hidden lg:block absolute -right-2 top-1/4 h-1/2 w-px bg-gray-100" />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default SiteStats;