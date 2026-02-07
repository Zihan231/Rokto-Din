"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, Droplets, Save, X, Activity } from 'lucide-react';

const DonationEntryForm = ({ onClose, onSave }) => {
    const t = useTranslations('DonationEntryForm');
    const [formData, setFormData] = useState({
        date: '',
        hospital: '',
        bags: '1'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Saving Donation:", formData);
            if (onSave) onSave(formData);
            if (onClose) onClose(); 
        }, 1500);
    };

    // Animation variants for form elements
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { staggerChildren: 0.1, duration: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden ring-1 ring-base-200"
        >
            {/* Artistic Background Blobs */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Section */}
            <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-neutral tracking-tight">
                            {t('title')}
                        </h2>
                    </div>
                    <p className="text-sm md:text-base text-gray-500 font-medium pl-1">
                        {t('subtitle')}
                    </p>
                </div>
                {/* Close Button */}
                {onClose && (
                    <button 
                        onClick={onClose} 
                        className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                
                {/* Date Input */}
                <motion.div variants={itemVariants} className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1.5 ml-1">
                        {t('form.dateLabel')}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <Calendar size={20} />
                        </div>
                        <input 
                            type="date" 
                            required
                            className="input w-full pl-12 h-14 bg-base-100/50 border-2 border-base-200 focus:border-primary focus:bg-white rounded-2xl transition-all duration-300 font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-primary/5"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                </motion.div>

                {/* Hospital Input */}
                <motion.div variants={itemVariants} className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1.5 ml-1">
                        {t('form.hospitalLabel')}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <MapPin size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder={t('form.hospitalPlaceholder')}
                            required
                            className="input w-full pl-12 h-14 bg-base-100/50 border-2 border-base-200 focus:border-primary focus:bg-white rounded-2xl transition-all duration-300 font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-lg focus:shadow-primary/5"
                            value={formData.hospital}
                            onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                        />
                    </div>
                </motion.div>

                {/* Quantity Dropdown */}
                <motion.div variants={itemVariants} className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1.5 ml-1">
                        {t('form.quantityLabel')}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <Droplets size={20} />
                        </div>
                        <select 
                            className="select w-full pl-12 h-14 bg-base-100/50 border-2 border-base-200 focus:border-primary focus:bg-white rounded-2xl transition-all duration-300 font-bold text-gray-700 text-base appearance-none focus:outline-none focus:shadow-lg focus:shadow-primary/5"
                            value={formData.bags}
                            onChange={(e) => setFormData({...formData, bags: e.target.value})}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{t('form.bagUnit', { count: num })}</option>
                            ))}
                        </select>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.div variants={itemVariants} className="pt-6">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn btn-primary w-full h-16 rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98] transition-all duration-300 flex items-center gap-3 border-none bg-gradient-to-r from-primary to-red-600 relative overflow-hidden group"
                    >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                        
                        {isLoading ? (
                            <span className="loading loading-spinner loading-md bg-white"></span>
                        ) : (
                            <>
                                <Save size={22} /> {t('form.saveBtn')}
                            </>
                        )}
                    </button>
                </motion.div>

            </form>
        </motion.div>
    );
};

export default DonationEntryForm;