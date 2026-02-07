"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, HeartHandshake, MapPin, Headset } from 'lucide-react';

const SiteStats = () => {
    const t = useTranslations('SiteStats');

    // Configuration for icons and keys (text comes from JSON)
    const statConfig = [
        {
            key: "donors",
            icon: <Users className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            key: "donations",
            icon: <HeartHandshake className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            key: "cities",
            icon: <MapPin className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            key: "support",
            icon: <Headset className="w-6 h-6" />,
            bg: "bg-red-50"
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
                        
                        {/* Value */}
                        <h4 className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter">
                            {t(`${stat.key}.value`)}
                        </h4>
                        
                        {/* Label */}
                        <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                            {t(`${stat.key}.label`)}
                        </p>

                        {/* Divider Line (Desktop only) - Hides on the last item */}
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