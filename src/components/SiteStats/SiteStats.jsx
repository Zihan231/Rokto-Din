"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, MapPin, Headset } from 'lucide-react';

const SiteStats = () => {
    const stats = [
        {
            id: 1,
            label: "নিবন্ধিত ডোনার",
            value: "১০কে+",
            icon: <Users className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            id: 2,
            label: "সফল রক্তদান",
            value: "৫কে+",
            icon: <HeartHandshake className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            id: 3,
            label: "শহর কাভারেজ",
            value: "৫০+",
            icon: <MapPin className="w-6 h-6" />,
            bg: "bg-red-50"
        },
        {
            id: 4,
            label: "সাপোর্ট",
            value: "২৪/৭",
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
                {stats.map((stat) => (
                    <motion.div 
                        key={stat.id}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center group relative"
                    >
                        {/* Icon Container */}
                        <div className={`w-14 h-14 ${stat.bg} text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                            {stat.icon}
                        </div>
                        
                        {/* Value */}
                        <h4 className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter">
                            {stat.value}
                        </h4>
                        
                        {/* Label */}
                        <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                            {stat.label}
                        </p>

                        {/* Divider Line (Desktop only) */}
                        <div className="hidden lg:block absolute -right-2 top-1/4 h-1/2 w-[1px] bg-gray-100 last:hidden" />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default SiteStats;