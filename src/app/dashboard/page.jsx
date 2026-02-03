// File: app/dashboard/page.jsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplets, MapPin, Heart } from 'lucide-react';

const DashboardPage = () => {
    const stats = [
        { label: "মোট রক্তদান", value: "০৪ বার", color: "bg-blue-500", icon: <Heart size={20}/> },
        { label: "শেষ রক্তদান", value: "৪ মাস আগে", color: "bg-primary", icon: <Calendar size={20}/> },
        { label: "বর্তমান অবস্থা", value: "প্রস্তুত", color: "bg-emerald-500", icon: <Droplets size={20}/> },
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
                        <p className="text-gray-400 font-medium text-sm md:text-base">আপনার শেষ রক্তদানের পর ১২০ দিন পার হয়েছে। আপনি এখন পুনরায় রক্ত দিতে সক্ষম।</p>
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
                        className="p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-base-300 shadow-sm flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-xl md:text-2xl font-black text-neutral italic">{stat.value}</h4>
                        </div>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-gray-200`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- Recent Activity Table --- */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-base-300 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-black text-neutral">সাম্প্রতিক অ্যাক্টিভিটি</h3>
                    <button className="btn btn-ghost btn-sm text-primary font-bold">সব দেখুন</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-3 min-w-[600px]">
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[10px] tracking-widest text-left">
                                <th className="bg-transparent pl-6">তারিখ</th>
                                <th className="bg-transparent">স্থান / হাসপাতাল</th>
                                <th className="bg-transparent">পরিমাণ</th>
                                <th className="bg-transparent text-right pr-6">অবস্থা</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: "১২ জানুয়ারি ২০২৬", loc: "ঢাকা মেডিকেল কলেজ", amount: "১ ব্যাগ", status: "সফল" },
                                { date: "০৫ সেপ্টেম্বর ২০২৫", loc: "বারডেম হাসপাতাল", amount: "১ ব্যাগ", status: "সফল" }
                            ].map((row, i) => (
                                <tr key={i} className="bg-base-50 group hover:bg-base-200 transition-colors">
                                    <td className="rounded-l-2xl pl-6 py-4 font-bold text-neutral">{row.date}</td>
                                    <td className="flex items-center gap-2 font-medium text-gray-500 py-4"><MapPin size={16} className="text-primary"/> {row.loc}</td>
                                    <td className="font-bold text-neutral py-4">{row.amount}</td>
                                    <td className="rounded-r-2xl pr-6 text-right py-4">
                                        <span className="px-3 py-1.5 md:px-4 md:py-2 bg-emerald-100 text-emerald-600 rounded-full text-[10px] md:text-xs font-black inline-block">
                                            {row.status}
                                        </span>
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