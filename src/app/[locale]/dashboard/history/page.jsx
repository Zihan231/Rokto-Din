"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
    Calendar, History, Search, Filter, 
    Droplets, MapPin, Download 
} from 'lucide-react';

const HistoryPage = () => {
    const t = useTranslations('HistoryPage');

    // Mock Data (Ideally fetched from backend with localized dates if needed)
    const donations = [
        { 
            id: 1, 
            date: "12 Jan 2026", 
            hospital: "Dhaka Medical College Hospital", 
            bag: 1
        },
        { 
            id: 2, 
            date: "15 Aug 2025", 
            hospital: "Square Hospital", 
            bag: 2
        },
        { 
            id: 3, 
            date: "02 Apr 2025", 
            hospital: "Kurmitola General Hospital", 
            bag: 1
        },
        { 
            id: 4, 
            date: "10 Dec 2024", 
            hospital: "Blood Donation Camp - DU", 
            bag: 1
        },
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            
            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-neutral text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full -mr-20 -mt-20 blur-3xl" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                            <History size={24} className="text-primary" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">{t('title')}</h1>
                    </div>
                    <p className="text-gray-400 font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="relative z-10">
                    <button className="btn btn-primary text-white rounded-xl px-6 font-bold shadow-lg shadow-primary/20">
                        <Download size={18} /> {t('downloadBtn')}
                    </button>
                </div>
            </div>

            {/* 2. Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={t('searchPlaceholder')} 
                        className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary bg-white shadow-sm"
                    />
                </div>
            </div>

            {/* 3. The Simplified Table */}
            <div className="bg-white rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-base-50 text-gray-400 uppercase text-xs tracking-widest border-b border-base-200 text-left">
                                <th className="py-6 pl-8">{t('table.date')}</th>
                                <th className="py-6">{t('table.hospital')}</th>
                                <th className="py-6 pr-8 text-right">{t('table.quantity')}</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {donations.map((item, index) => (
                                <motion.tr 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group hover:bg-base-50 transition-colors border-b border-base-100 last:border-none"
                                >
                                    {/* Date */}
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                                <Calendar size={18} />
                                            </div>
                                            <span className="font-bold text-neutral">{item.date}</span>
                                        </div>
                                    </td>

                                    {/* Hospital */}
                                    <td className="py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                                <MapPin size={16} />
                                            </div>
                                            <span className="font-bold text-neutral text-sm md:text-base">{item.hospital}</span>
                                        </div>
                                    </td>

                                    {/* Bag Quantity */}
                                    <td className="py-5 pr-8 text-right">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full font-black text-sm border border-primary/10">
                                            <Droplets size={14} className="fill-primary" />
                                            {t('table.bagUnit', { count: item.bag })}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;