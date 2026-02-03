"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Import usePathname
import { 
    LayoutDashboard, User, History, 
    LogOut, Menu, X, Droplets, Bell 
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname(); // 2. Get current URL path

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "ড্যাশবোর্ড", href: "/dashboard" },
        { icon: <User size={20} />, label: "প্রোফাইল", href: "/dashboard/profile" },
        { icon: <History size={20} />, label: "রক্তদানের ইতিহাস", href: "/dashboard/history" },
    ];

    return (
        <div className="flex h-screen bg-base-200 overflow-hidden">
            
            {/* --- Sidebar (Fixed Left Column) --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-neutral text-white 
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 flex flex-col h-full
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                
                {/* Sidebar Header */}
                <div className="p-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-xl">
                            <Droplets className="text-white fill-white" size={24} />
                        </div>
                        <span className="font-black text-2xl tracking-tighter italic">Rokto Din</span>
                    </Link>
                    
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="md:hidden btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation (With Active State Logic) */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                    {menuItems.map((item, i) => {
                        // 3. Check if this item is active
                        const isActive = pathname === item.href;

                        return (
                            <Link 
                                key={i} 
                                href={item.href} 
                                onClick={() => setSidebarOpen(false)} 
                                className={`
                                    flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-medium
                                    ${isActive 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' // Active Style
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white' // Inactive Style
                                    }
                                `}
                            >
                                {item.icon} {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout (Sticky Bottom) */}
                <div className="p-4 border-t border-white/10 bg-neutral">
                    <button className="flex items-center justify-center gap-4 px-4 py-4 w-full rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold">
                        <LogOut size={20} /> লগ-আউট
                    </button>
                </div>
            </aside>

            {/* --- Main Content Wrapper --- */}
            <div className="flex-1 flex flex-col h-full w-full relative">
                
                {/* Mobile Header */}
                <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm border-b border-base-300 z-40">
                    <div className="flex items-center gap-2">
                        <Droplets className="text-primary fill-primary" />
                        <span className="font-black text-xl tracking-tighter">Rokto Din</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost btn-sm p-0">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Desktop Header */}
                <header className="hidden md:flex h-20 bg-white border-b border-base-300 items-center justify-between px-10 shadow-sm shrink-0">
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

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div 
                        onClick={() => setSidebarOpen(false)} 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden glass" 
                    />
                )}
            </div>
        </div>
    );
}