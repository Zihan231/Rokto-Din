"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Droplets, Save, X } from 'lucide-react';

const DonationEntryForm = ({ onClose, onSave }) => {
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
            // Pass data to parent component or API
            console.log("Saving Donation:", formData);
            if (onSave) onSave(formData);
            // Reset or Close logic
            if (onClose) onClose(); 
        }, 1500);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />

            {/* Heading */}
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h2 className="text-2xl font-black text-neutral mb-1">নতুন রক্তদান যুক্ত করুন</h2>
                    <p className="text-sm text-gray-500 font-medium">আপনার মহৎ কাজের তথ্য সংরক্ষণ করুন</p>
                </div>
                {/* Optional Close Button if used in Modal */}
                {onClose && (
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:bg-red-50 hover:text-red-500">
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                
                {/* Date Input */}
                <div className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-primary"/> রক্তদানের তারিখ</span>
                    </label>
                    <input 
                        type="date" 
                        required
                        className="input input-bordered w-full rounded-2xl focus:outline-primary font-medium text-gray-600 h-12"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                </div>

                {/* Hospital Input */}
                <div className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1">
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-primary"/> হাসপাতালের নাম</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="উদাহরণ: ঢাকা মেডিকেল কলেজ"
                        required
                        className="input input-bordered w-full rounded-2xl focus:outline-primary font-medium h-12"
                        value={formData.hospital}
                        onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                    />
                </div>

                {/* Quantity Dropdown */}
                <div className="form-control">
                    <label className="label font-bold text-neutral text-sm mb-1">
                        <span className="flex items-center gap-2"><Droplets size={16} className="text-primary"/> রক্তের পরিমাণ (ব্যাগ)</span>
                    </label>
                    <div className="relative">
                        <select 
                            className="select select-bordered w-full rounded-2xl focus:outline-primary font-medium text-base h-12 appearance-none"
                            value={formData.bags}
                            onChange={(e) => setFormData({...formData, bags: e.target.value})}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num} ব্যাগ</option>
                            ))}
                        </select>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn btn-primary w-full rounded-2xl text-white font-bold text-lg h-14 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <>
                                <Save size={20} /> সংরক্ষণ করুন
                            </>
                        )}
                    </button>
                </div>

            </form>
        </motion.div>
    );
};

export default DonationEntryForm;