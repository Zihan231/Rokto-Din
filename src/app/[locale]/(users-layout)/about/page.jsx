"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Users, Code,
    Megaphone, Database, ShieldCheck,
    MapPin, HeartHandshake, Sparkles,
    Droplets, Plus, Zap, ArrowRightCircle, HeartPulse,
} from 'lucide-react';
import { FiLinkedin } from "react-icons/fi";
import Link from 'next/link';
import { FaFacebook, FaGithub } from 'react-icons/fa';

const AboutPage = () => {
    const t = useTranslations('AboutPage');

    const featuresList = [
        {
            key: "database",
            icon: <Database className="w-8 h-8" />,
            color: "blue"
        },
        {
            key: "privacy",
            icon: <ShieldCheck className="w-8 h-8" />,
            color: "emerald"
        },
        {
            key: "location",
            icon: <MapPin className="w-8 h-8" />,
            color: "primary"
        },
        {
            key: "support",
            icon: <HeartHandshake className="w-8 h-8" />,
            color: "orange"
        }
    ];

    const impactStats = [
        { key: "free", icon: <HeartHandshake className="w-6 h-6" /> },
        { key: "active", icon: <Zap className="w-6 h-6" /> },
        { key: "verified", icon: <ShieldCheck className="w-6 h-6" /> }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* 1. HERO SECTION */}
            <section className="relative py-28 bg-neutral overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight"
                    >
                        {t.rich('hero.title', {
                            highlight: (chunks) => <span className="text-primary italic">{chunks}</span>
                        })}
                    </motion.h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium">
                        {t.rich('hero.description', {
                            bold: (chunks) => <strong>{chunks}</strong>
                        })}
                    </p>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
            </section>

            {/* 2. WHY ROKTO DIN? */}
            <section className="py-32 bg-white overflow-hidden relative">
                <h2 className="sr-only">{t('why.tag')}</h2>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Left: Content Area */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 border border-primary/10">
                                    <Sparkles size={14} /> {t('why.tag')}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-neutral leading-[1.1] mb-8">
                                    {t.rich('why.title', {
                                        highlight: (chunks) => <span className="text-primary italic">{chunks}</span>
                                    })}
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                    {t.rich('why.description', {
                                        bold: (chunks) => <strong>{chunks}</strong>
                                    })}
                                </p>
                            </motion.div>

                            {/* Interactive Metric */}
                            <div className="flex items-center gap-6 p-2 md:p-3 bg-white rounded-[2.5rem] border border-base-200 shadow-xl shadow-gray-100/50 max-w-fit pr-10 hover:border-primary/20 transition-all duration-500 group">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                                        <Users className="text-primary w-7 h-7 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-0.5">
                                        <motion.h4
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            className="text-3xl font-black text-neutral italic leading-none"
                                        >
                                            {t('why.metricVal')}
                                        </motion.h4>
                                        <Plus className="text-primary w-6 h-6 stroke-[4px] -translate-y-1" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <div className="flex h-1.5 w-8 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '70%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                            {t('why.metricLabel')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Feature Bento Grid */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full -z-10" />

                            {featuresList.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="group p-8 bg-white rounded-[2.5rem] border border-base-200 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 bg-base-50 group-hover:bg-primary group-hover:text-white shadow-sm`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-neutral mb-3 group-hover:text-primary transition-colors">
                                        {t(`why.features.${feature.key}.title`)}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                        {t(`why.features.${feature.key}.desc`)}
                                    </p>
                                </motion.div>
                            ))}

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="hidden lg:flex absolute -right-10 top-1/2 w-20 h-20 bg-white rounded-3xl shadow-2xl items-center justify-center text-primary border border-base-100"
                            >
                                <Droplets size={32} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MEET THE CORE TEAM */}
            <section className="py-2 bg-base-50 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black text-neutral/5 select-none pointer-events-none uppercase">
                    {t('team.backgroundText')}
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-neutral tracking-tighter"
                        >
                            {t.rich('team.title', {
                                highlight: (chunks) => <span className="text-primary underline decoration-primary/20 underline-offset-8">{chunks}</span>
                            })}
                        </motion.h2>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mt-4 text-xs">
                            {t('team.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 max-w-6xl mx-auto">

                        {/* 1. Founder: Zihan */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center border border-white transition-all duration-500"
                        >
                            <div className="relative mb-8">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden bg-neutral border-[6px] border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    <div className="w-full h-full bg-linear-to-tr from-neutral to-gray-700 flex items-center justify-center text-white text-4xl font-black">
                                        MZ
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/40 -rotate-12 group-hover:rotate-0 transition-all duration-500">
                                    <Code size={24} strokeWidth={3} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-neutral">{t('team.members.zihan.name')}</h3>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs">{t('team.members.zihan.role')}</p>
                            </div>
                            <div className="mt-6 h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 transition-all duration-500" />
                            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
                                {t('team.members.zihan.desc')}
                            </p>
                            <div className="flex gap-4 mt-8">
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300">
                                    <FaGithub size={20} />
                                </Link>
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300">
                                    <FiLinkedin size={20} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* 2. Marketing Head: Emtiaz */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center border border-white transition-all duration-500"
                        >
                            <div className="relative mb-8">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden bg-neutral border-[6px] border-white shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    <div className="w-full h-full bg-linear-to-tr from-neutral to-gray-700 flex items-center justify-center text-white text-4xl font-black">
                                        PN
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl shadow-emerald-500/40 rotate-12 group-hover:rotate-0 transition-all duration-500">
                                    <Megaphone size={24} strokeWidth={3} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-neutral">{t('team.members.emtiaz.name')}</h3>
                                <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">{t('team.members.emtiaz.role')}</p>
                            </div>
                            <div className="mt-6 h-1 w-12 bg-emerald-500/20 rounded-full group-hover:w-24 transition-all duration-500" />
                            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
                                {t('team.members.emtiaz.desc')}
                            </p>
                            <div className="flex gap-4 mt-8">
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <FiLinkedin size={20} />
                                </Link>
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <FaFacebook size={20} />
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 4. OUR IMPACT */}
            <section className="pt-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E63946' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black text-neutral tracking-tight"
                            >
                                {t.rich('impact.title', {
                                    highlight: (chunks) => <span className="text-primary italic">{chunks}</span>
                                })}
                            </motion.h2>
                            <div className="h-1.5 w-24 bg-primary/10 mx-auto mt-4 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: -100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-primary w-1/2 mx-auto"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {impactStats.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="relative group p-10 rounded-[3rem] bg-base-50 border border-base-200 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-base-100">
                                        {item.icon}
                                    </div>
                                    <div className="text-center mt-4">
                                        <motion.h4
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-5xl font-black text-neutral mb-4 italic tracking-tighter"
                                        >
                                            {t(`impact.stats.${item.key}.val`)}
                                        </motion.h4>
                                        <p className="font-black text-primary uppercase tracking-[0.2em] text-xs mb-4">
                                            {t(`impact.stats.${item.key}.label`)}
                                        </p>
                                        <div className="w-10 h-1 bg-primary/10 mx-auto mb-4 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                            {t(`impact.stats.${item.key}.desc`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-20 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-neutral rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
                    >
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                        />

                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                        />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="flex justify-center mb-8"
                            >
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <HeartPulse className="text-primary w-12 h-12 animate-pulse" />
                                </div>
                            </motion.div>

                            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                                {t.rich('cta.title', {
                                    highlight: (chunks) => <span className="text-primary italic underline underline-offset-12 decoration-white/10">{chunks}</span>
                                })}
                            </h2>

                            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                {t('cta.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/register" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-primary btn-lg w-full sm:w-auto px-12 h-20 rounded-full text-white font-black text-xl shadow-[0_20px_50px_rgba(230,57,70,0.3)] border-none flex items-center gap-3"
                                    >
                                        {t('cta.joinBtn')}
                                        <ArrowRightCircle size={24} />
                                    </motion.button>
                                </Link>

                                <Link href="/find-donors" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-outline border-white/20 text-white hover:bg-white hover:text-neutral btn-lg w-full sm:w-auto px-12 h-20 rounded-full font-black text-xl backdrop-blur-sm"
                                    >
                                        {t('cta.findBtn')}
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <ShieldCheck size={16} /> {t('cta.badges.secure')}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <Users size={16} /> {t('cta.badges.donors')}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <Zap size={16} /> {t('cta.badges.support')}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;