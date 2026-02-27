"use client";
import React, { useContext, useEffect } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import { Droplets } from 'lucide-react'; // Utilizing your existing icon library!

const AuthGuard = ({ children }) => {
    const router = useRouter();
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm gap-6">
                
                {/* Custom Rokto Din Heartbeat Loader */}
                <div className="relative flex justify-center items-center w-20 h-20">
                    {/* Outer heartbeat pulse */}
                    <div className="absolute inset-0 rounded-full bg-[#8A1119]/20 animate-ping"></div>
                    
                    {/* Inner spinning dual-ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#8A1119] border-b-[#8A1119] animate-spin opacity-80"></div>
                    
                    {/* Center pulsing blood drop */}
                    <Droplets className="text-[#8A1119] animate-pulse fill-[#8A1119]/20" size={32} />
                </div>
                
                <p className="text-sm font-black text-[#8A1119] animate-pulse tracking-widest uppercase mt-2">
                    Loading Authentication...
                </p>
            </div>
        )
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;