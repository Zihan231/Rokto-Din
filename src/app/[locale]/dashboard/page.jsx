"use client";
import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplets, MapPin, Clock, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AuthContext from '@/hooks/AuthContext/AuthContext';
// Ensure this path matches your project structure
import Loading from '@/components/Loading/Loading';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure'; // Added import

const DashboardPage = () => {
    const t = useTranslations('DashboardPage');
    const { user, loading } = useContext(AuthContext);
    //console.log(user);
    const axiosSecure = useAxiosSecure(); // Initialized hook
    const [recentActivity, setRecentActivity] = useState([]); // State for table data

    // --- FETCH RECENT ACTIVITY ---
    useEffect(() => {
        const fetchRecentActivity = async () => {
            try {
                const res = await axiosSecure.get(`/donor/donation-records`, {
                    params: { limit: 2 } // Limit to 2, no pagination
                });

                const records = res.data?.data || [];

                // Format the API data to match your existing UI structure
                const formattedRecords = records.map(record => {
                    const dateObj = new Date(record.donationDate);
                    const formattedDate = dateObj.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });

                    return {
                        id: record.recordId || record.id,
                        date: formattedDate,
                        hospital: record.hospitalName,
                        bag: record.unitsDonated
                    };
                });

                setRecentActivity(formattedRecords);
            } catch (error) {
                console.error("Failed to fetch recent activity:", error);
            }
        };

        // Only fetch if user is fully loaded and logged in
        if (user) {
            fetchRecentActivity();
        }
    }, [axiosSecure, user]);

    // --- 1. LOADING STATE ---
    // Pass custom text so it doesn't say "Finding donors..."
    if (loading) {
        return <Loading text="Loading Dashboard..." />;
    }

    // --- 2. LOGGED OUT STATE ---
    if (!user) {
        return <div className="p-10 text-center">Please log in to view your dashboard.</div>;
    }

    // --- 3. DATE LOGIC ---
    const { fullName: userName, lastDonation, totalDonation } = user;
    const today = new Date();
    let daysRemaining = 0;
    let lastDonationDateFormatted = "N/A";

    if (lastDonation) {
        const lastDate = new Date(lastDonation);
        lastDonationDateFormatted = lastDate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        // Add 90 days for recovery
        const nextEligibleDate = new Date(lastDate);
        nextEligibleDate.setDate(lastDate.getDate() + 60);

        // Calculate days remaining
        const timeDiff = nextEligibleDate - today;
        daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    // --- STATUS LOGIC ---
    let statusValue;
    let statusColor = "bg-emerald-500";
    let statusIcon = <Droplets size={20} />;

    if (daysRemaining > 0) {
        statusColor = "bg-amber-500";
        statusIcon = <Clock size={20} />;
        statusValue = t.rich('status.waiting', {
            days: daysRemaining,
            highlight: (chunks) => <span className="text-primary text-3xl font-black mx-1">{chunks}</span>
        });
    } else {
        statusValue = <span className="text-emerald-600 font-bold">{t('status.ready')}</span>;
    }

    const stats = [
        {
            label: t('stats.totalDonation'),
            value: t('stats.times', { count: totalDonation || '0' }),
            color: "bg-blue-500",
            icon: <HeartHandshake size={28} />
        },
        {
            label: t('stats.lastDonation'),
            value: lastDonationDateFormatted,
            color: "bg-primary",
            icon: <Calendar size={20} />
        },
        {
            label: t('stats.currentStatus'),
            value: statusValue,
            color: statusColor,
            icon: statusIcon
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full -mr-32 -mt-32 blur-[100px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3">
                            {t('welcome.greeting', { name: userName })}
                        </h1>
                        <p className="text-gray-400 font-medium text-sm md:text-base">
                            {t('welcome.message')}
                        </p>
                    </div>
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-4xl md:rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center backdrop-blur-md shrink-0">
                        <span className="text-primary font-black text-4xl md:text-5xl">{user.bloodGroup || "O+"}</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest mt-2">{t('welcome.yourGroup')}</span>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid - FIXED GAP HERE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 md:p-8 bg-white rounded-4xl md:rounded-[2.5rem] border border-base-300 shadow-sm flex items-center justify-between gap-4 group hover:border-primary/20 transition-all"
                    >
                        <div className="flex-1 min-w-0"> {/* min-w-0 helps text wrap correctly */}
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-xl md:text-2xl font-black text-neutral italic leading-tight wrap-break-word">
                                {stat.value}
                            </h4>
                        </div>
                        <div className={`hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${stat.color} text-white items-center justify-center shadow-lg shadow-gray-200 shrink-0`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-5 md:p-10 border border-base-300 shadow-sm overflow-hidden w-full">
                <div className="flex justify-between items-center mb-5 md:mb-8">
                    <h3 className="text-lg md:text-xl font-black text-neutral">{t('activity.title')}</h3>
                    <Link href="/dashboard/history" className="btn btn-ghost btn-xs md:btn-sm text-primary font-bold">{t('activity.viewAll')}</Link>
                </div>

                <div className="overflow-x-auto w-full">
                    {/* Removed min-w-150 so it can shrink on mobile */}
                    <table className="table w-full border-separate border-spacing-y-2 md:border-spacing-y-3">
                        <thead>
                            <tr className="text-gray-400 border-none uppercase text-[9px] md:text-[10px] tracking-widest text-left">
                                <th className="bg-transparent pl-4 md:pl-6 py-2 md:py-3">{t('activity.headers.date')}</th>
                                <th className="bg-transparent px-2 md:px-4 py-2 md:py-3">{t('activity.headers.hospital')}</th>
                                <th className="bg-transparent text-right pr-4 md:pr-6 py-2 md:py-3">{t('activity.headers.quantity')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.length > 0 ? (
                                recentActivity.map((row, i) => (
                                    <tr key={i} className="bg-base-50 group hover:bg-base-200 transition-colors">
                                        {/* Date */}
                                        <td className="rounded-l-xl md:rounded-l-2xl pl-4 md:pl-6 py-3 md:py-4 font-bold text-neutral align-middle w-[30%] md:w-auto">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                {/* Hide icon on mobile */}
                                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-50 text-blue-500 hidden sm:flex items-center justify-center shrink-0">
                                                    <Calendar size={14} className="md:w-3.5 md:h-3.5" />
                                                </div>
                                                <span className="text-[11px] sm:text-xs md:text-base leading-tight">{row.date}</span>
                                            </div>
                                        </td>

                                        {/* Hospital */}
                                        <td className="py-3 md:py-4 px-2 md:px-4 align-middle">
                                            <div className="flex items-center gap-1 md:gap-2 font-medium text-gray-500">
                                                {/* Hide icon on mobile */}
                                                <MapPin size={14} className="text-primary shrink-0 hidden sm:block md:w-4 md:h-4" />
                                                {/* Allow text to wrap */}
                                                <span className="text-[11px] font-bold sm:text-xs md:text-base wrap-break-word leading-tight">{row.hospital}</span>
                                            </div>
                                        </td>

                                        {/* Quantity */}
                                        <td className="rounded-r-xl md:rounded-r-2xl pr-4 md:pr-6 text-right py-3 md:py-4 align-middle w-[25%] md:w-auto">
                                            <div className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-primary/5 text-primary rounded-full font-black text-[10px] md:text-xs border border-primary/10">
                                                <Droplets size={10} className="fill-primary shrink-0 md:w-3 md:h-3" />
                                                {t('activity.bagCount', { count: row.bag })}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-6 text-gray-400 font-medium bg-base-50 rounded-xl md:rounded-2xl text-xs md:text-sm">
                                        No recent donations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;