"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, User, History, Settings,
    LogOut, Menu, X, Droplets, Bell
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "ড্যাশবোর্ড", href: "/dashboard" },
        { icon: <User size={20} />, label: "প্রোফাইল", href: "/dashboard/profile" },
        { icon: <History size={20} />, label: "রক্তদানের ইতিহাস", href: "/dashboard/history" },
        { icon: <Settings size={20} />, label: "সেটিংস", href: "/dashboard/settings" },
    ];
    return (
        <div className="flex flex-col md:flex-row min-h-screen">

            {/* --- Mobile Header --- */}
            <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm border-b border-base-300 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    
                    <Droplets className="text-primary fill-primary" /> 
                    <span className="font-black text-xl tracking-tighter">Rokto Din</span>
                </div>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-sm p-0">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* --- Sidebar (Left Column) --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-neutral text-white transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col p-6">
                    {/* Brand */}
                    <div className="hidden md:flex items-center gap-3 mb-12 px-2">
                        <div className="p-2 bg-primary rounded-xl">
                            <Droplets className="text-white fill-white" size={24} />
                        </div>
                        <span className="font-black text-2xl tracking-tighter italic">Rokto Din</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item, i) => (
                            <Link key={i} href={item.href} className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-white/10 transition-colors font-medium text-gray-300 hover:text-white">
                                {item.icon} {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <button className="flex items-center gap-4 px-4 py-4 mt-auto rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold">
                        <LogOut size={20} /> লগ-আউট
                    </button>
                </div>
            </aside>

            {/* --- Main Content Wrapper (Right Column) --- */}
            <div className="flex-1 flex flex-col w-full">
                {/* Desktop Top Bar */}
                <header className="hidden md:flex h-20 bg-white border-b border-base-300 items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
                    <h2 className="font-bold text-neutral">আমার ড্যাশবোর্ড</h2>
                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-base-200 rounded-full text-gray-400 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6 border-base-300">
                            <div className="text-right">
                                <p className="text-sm font-black leading-none">জিহান ইসলাম</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">রক্তদাতা</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">MZ</div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />
            )}
        </div>
    );
}