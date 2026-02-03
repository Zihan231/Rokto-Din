"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplets, MapPin, Heart, Clock } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
    // Mock Data
    const lastDonationDate = "১২ জানুয়ারি ২০২৬";
    const daysRemaining = 100; // 0 means ready, >0 means waiting

    // Logic for Status Text, Color & Icon
    let statusValue = "রক্ত দানের জন্য প্রস্তুত";
    let statusColor = "bg-emerald-500";
    let statusIcon = <Droplets size={20}/>;

    if (daysRemaining > 0) {
        // সংখ্যাটিকে প্রাইমারি কালার করার জন্য JSX ব্যবহার করা হয়েছে
        statusValue = (
            <span>
                <span className="text-primary text-3xl">{daysRemaining}</span> দিন পর আবার রক্ত দিতে পারবেন
            </span>
        );
        statusColor = "bg-amber-500";
        statusIcon = <Clock size={20}/>;
    }

    const stats = [
        { 
            label: "মোট রক্তদান", 
            value: "০৪ বার", 
            color: "bg-blue-500", 
            icon: <Heart size={20}/> 
        },
        { 
            label: "শেষ রক্তদান", 
            value: lastDonationDate, 
            color: "bg-primary", 
            icon: <Calendar size={20}/> 
        },
        { 
            label: "বর্তমান অবস্থা", 
            value: statusValue, // Dynamic JSX or String
            color: statusColor, 
            icon: statusIcon 
        },
    ];

    // Recent Activity Data
    const recentActivity = [
        { id: 1, date: "১২ জানুয়ারি ২০২৬", hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল", bag: "১ ব্যাগ" },
        { id: 2, date: "১৫ আগস্ট ২০২৫", hospital: "স্কয়ার হাসপাতাল", bag: "১ ব্যাগ" }
    ];

    return (
        <div className="space-y-8">
            {/* --- Welcome Card --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3">আসসালামু আলাইকুম, জিহান! 👋</h1>
                        <p className="text-gray-400 font-medium text-sm md:text-base">
                            ধন্যবাদ মানবতার পাশে থাকার জন্য। আপনার প্রতিটি রক্তদান একটি জীবন বাঁচায়।
                        </p>
                    </div>
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center backdrop-blur-md shrink-0">
                        <span className="text-primary font-black text-4xl md:text-5xl">O+</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest mt-2">আপনার গ্রুপ</span>
                    </div>
                </div>
            </motion.div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-base-300 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all"
                    >
                        <div className="flex-1 pr-4">
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            {/* Value Rendering */}
                            <h4 className="text-xl md:text-2xl font-black text-neutral italic leading-tight">
                                {stat.value}
                            </h4>
                        </div>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-gray-200 shrink-0`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- Recent Activity Table --- */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-base-300 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-black text-neutral">সাম্প্রতিক অ্যাক্টিভিটি</h3>
                    <Link href="/dashboard/history" className="btn btn-ghost btn-sm text-primary font-bold">সব দেখুন</Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-3 min-w-[600px]">
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[10px] tracking-widest text-left">
                                <th className="bg-transparent pl-6">তারিখ</th>
                                <th className="bg-transparent">হাসপাতাল</th>
                                <th className="bg-transparent text-right pr-6">পরিমাণ (ব্যাগ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((row, i) => (
                                <tr key={i} className="bg-base-50 group hover:bg-base-200 transition-colors">
                                    {/* Date */}
                                    <td className="rounded-l-2xl pl-6 py-4 font-bold text-neutral">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                                <Calendar size={14} />
                                            </div>
                                            {row.date}
                                        </div>
                                    </td>
                                    
                                    {/* Hospital */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-2 font-medium text-gray-500">
                                            <MapPin size={16} className="text-primary shrink-0"/> 
                                            {row.hospital}
                                        </div>
                                    </td>

                                    {/* Bag */}
                                    <td className="rounded-r-2xl pr-6 text-right py-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary rounded-full font-black text-xs border border-primary/10">
                                            <Droplets size={12} className="fill-primary" />
                                            {row.bag}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;