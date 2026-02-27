"use client";
import React, { useContext, useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import {
    LayoutDashboard, User, History,
    LogOut, Menu, X, Droplets, Bell,
    PlusCircle,
    KeyRound
} from 'lucide-react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import AuthContext from '@/hooks/AuthContext/AuthContext';
import { FaUserNinja } from 'react-icons/fa';
import AuthGuard from '@/hooks/AuthGuard/AuthGuard';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure';

export default function DashboardLayout({ children }) {
    const t = useTranslations('DashboardLayout');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user,setUser } = useContext(AuthContext);
    // Mock User Name
    const userName = user?.fullName || "loading...";

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: t('menu.dashboard'), href: "/dashboard" },
        { icon: <User size={20} />, label: t('menu.profile'), href: "/dashboard/profile" },
        { icon: <History size={20} />, label: t('menu.history'), href: "/dashboard/history" },
        { icon: <PlusCircle size={20} />, label: t('menu.newDonation'), href: "/dashboard/donation" },
        { icon: <KeyRound size={20} />, label: t('menu.changePassword'), href: "/dashboard/change-password" }
    ];

    // Language Switch Logic
    const handleLanguageSwitch = () => {
        const nextLocale = locale === 'en' ? 'bn' : 'en';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const checkActive = (href) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    // Logout Handler
    const handleLogout = async () => {
        try {
            const res = await axiosSecure.post("auth/logout");
            if (res.status === 200) {
                setUser(null);
                router.replace("/login");
            }
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <AuthGuard>
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

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                        {menuItems.map((item, i) => {
                            const isActive = checkActive(item.href);
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                    flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-medium
                                    ${isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold'
                                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }
                                `}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/10 bg-neutral">
                        <button onClick={handleLogout} className="flex items-center justify-center gap-4 px-4 py-4 w-full rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold">
                            <LogOut size={20} /> {t('menu.logout')}
                        </button>
                    </div>
                </aside>

                {/* --- Main Content Wrapper --- */}
                <div className="flex-1 flex flex-col h-full w-full relative">

                    {/* Mobile Header (UPDATED) */}
                    <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm border-b border-base-300 z-40">
                        <div className="flex items-center gap-2">
                            <Droplets className="text-primary fill-primary" />
                            <span className="font-black text-xl tracking-tighter">Rokto Din</span>
                        </div>

                        {/* Added Language Switcher here */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleLanguageSwitch}
                                disabled={isPending}
                                className="btn btn-ghost btn-circle btn-sm text-base-content hover:text-primary transition-colors"
                                title="Switch Language"
                            >
                                <div className="flex flex-col items-center">
                                    <HiOutlineGlobeAlt className="text-xl" />
                                    <span className="text-[10px] font-bold uppercase">
                                        {locale === 'en' ? 'BN' : 'EN'}
                                    </span>
                                </div>
                            </button>

                            <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost btn-sm p-0">
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Header */}
                    <header className="hidden md:flex h-20 bg-white border-b border-base-300 items-center justify-between px-10 shadow-sm shrink-0">
                        <h2 className="font-bold text-neutral">{t('header.dashboardTitle')}</h2>
                        <div className="flex items-center gap-6">

                            {/* Language Switcher Button */}
                            <button
                                onClick={handleLanguageSwitch}
                                disabled={isPending}
                                className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors"
                                title="Switch Language"
                            >
                                <div className="flex flex-col items-center">
                                    <HiOutlineGlobeAlt className="text-2xl" />
                                    <span className="text-[10px] font-bold uppercase">
                                        {locale === 'en' ? 'BN' : 'EN'}
                                    </span>
                                </div>
                            </button>

                            <div className="flex items-center gap-3 border-l pl-6 border-base-300">
                                <div className="text-right">
                                    <p className="text-sm font-black leading-none">{t('header.donorName', { name: userName })}</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{t('header.donorRole')}</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black"><FaUserNinja size={20} />
                                </div>
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
        </AuthGuard>
    );
}