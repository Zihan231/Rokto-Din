"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useAxios from '@/hooks/axios/useAxios';
import {
    User, Mail, Phone, MapPin,
    Droplets, ArrowRight, Calendar,
    Facebook, MessageCircle, CheckCircle2, HeartPulse, ShieldCheck, Lock,
    AlertCircle, CheckCircle
} from 'lucide-react';

const RegisterPage = () => {
    const t = useTranslations('RegisterPage');
    const axios = useAxios();
    const router = useRouter();
    
    // --- State Management ---
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Combined Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        division: '',
        district: '',
        bloodGroup: '',
        lastDonation: '',
        phoneNumber: '',
        whatsappNumber: '',
        facebookLink: ''
    });

    const [contacts, setContacts] = useState([]); // Tracks visible contact inputs

    // --- Static Data ---
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const locationData = {
        'Dhaka': ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
        'Chattogram': ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
        'Rajshahi': ["Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
        'Khulna': ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
        'Barishal': ["Barguna", "Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
        'Sylhet': ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
        'Rangpur': ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
        'Mymensingh': ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
    };

    const availableDistricts = formData.division ? locationData[formData.division] : [];
    const brandFeatures = [{ key: "database" }, { key: "contact" }, { key: "search" }];

    // --- Handlers ---

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear errors when user starts typing
        if (error) setError('');
    };

    const handleDivisionChange = (e) => {
        setFormData({
            ...formData,
            division: e.target.value,
            district: '' 
        });
    };

    const handleGroupSelect = (group) => {
        setFormData({ ...formData, bloodGroup: group });
        if (error) setError('');
    };

    const toggleContact = (method) => {
        setContacts(prev => prev.includes(method) ? prev.filter(i => i !== method) : [...prev, method]);
    };

    // --- Submission Logic ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // 1. Basic Field Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.bloodGroup || !formData.division || !formData.district) {
            setError("Please fill in all basic information (Name, Email, Password, Location, Blood Group).");
            setIsLoading(false);
            return;
        }

        // 2. Contact Method Validation (At least one required)
        // We check if the field has a value, regardless of whether the input is currently visible or not.
        const hasContact = formData.phoneNumber?.trim() || formData.whatsappNumber?.trim() || formData.facebookLink?.trim();
        
        if (!hasContact) {
            setError("Please provide at least one contact method (Phone, WhatsApp, or Facebook).");
            setIsLoading(false);
            return;
        }

        try {
            // 3. Prepare Payload
            const payload = {
                ...formData,
                lastDonation: formData.lastDonation || null, 
                whatsappNumber: formData.whatsappNumber || null,
                facebookLink: formData.facebookLink || null,
                donationStatus: 'onn',
                totalDonation: 0
            };

            // 4. API Call
            const response = await axios.post('donor/create', payload);

            if (response.status === 201) {
                setSuccess("Registration Successful! Redirecting to login...");
                // Clear form
                setFormData({ fullName: '', email: '', password: '', division: '', district: '', bloodGroup: '', lastDonation: '', phoneNumber: '', whatsappNumber: '', facebookLink: '' });
                
                setTimeout(() => {
                    router.push('/login'); 
                }, 2000);
            }
        } catch (error) {
            console.error("Registration error:", error);
            const msg = error.response?.data?.message || "Registration failed. Please check your inputs and try again.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-0 md:p-6 lg:p-10">
            <div className="max-w-7xl w-full bg-white md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">

                {/* Left Side: Brand Panel */}
                <div className="md:w-[35%] lg:w-[32%] bg-neutral p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden order-2 md:order-1">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary opacity-20 rounded-full blur-[100px] -mr-40 -mt-40" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-[80px] -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-12 shadow-2xl shadow-primary/40 rotate-12">
                            <HeartPulse className="text-white w-12 h-12" />
                        </motion.div>

                        <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tighter">
                            {t.rich('brand.title', {
                                highlight: (chunks) => <span className="text-primary italic">{chunks}</span>,
                                br: () => <br />
                            })}
                        </h2>

                        <div className="space-y-8">
                            {brandFeatures.map((item, idx) => (
                                <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="flex gap-4">
                                    <div className="mt-1"><CheckCircle2 size={20} className="text-primary" /></div>
                                    <div>
                                        <h4 className="font-bold text-lg leading-none mb-1">{t(`brand.features.${item.key}.title`)}</h4>
                                        <p className="text-gray-400 text-sm">{t(`brand.features.${item.key}.desc`)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-16">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl text-center">
                            <p className="text-sm font-bold text-gray-400 mb-5 uppercase tracking-[0.2em]">{t('brand.alreadyMember')}</p>
                            <Link href="/login" className="w-full">
                                <button className="btn btn-primary w-full rounded-2xl text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all h-14 border-none">{t('brand.loginBtn')}</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 p-8 lg:p-16 bg-white order-1 md:order-2">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h3 className="text-4xl font-black text-neutral mb-2 tracking-tight">{t('form.title')}</h3>
                            <p className="text-gray-500 font-medium">{t('form.subtitle')}</p>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-primary bg-primary/5 px-4 py-2 rounded-full font-bold text-sm border border-primary/10">
                            <ShieldCheck size={16} /> {t('form.secureBadge')}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control group">
                                <label className="label font-bold text-neutral">{t('form.nameLabel')}</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200" 
                                        placeholder={t('form.namePlaceholder')} 
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-control group">
                                <label className="label font-bold text-neutral">{t('form.emailLabel')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200" 
                                        placeholder={t('form.emailPlaceholder')} 
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Password Field */}
                        <div className="form-control group">
                            <label className="label font-bold text-neutral">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200" 
                                    placeholder="Create a secure password" 
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {/* Dropdown Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-bold text-neutral text-sm">{t('form.divisionLabel')}</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10" size={18} />
                                    <select 
                                        className="select select-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200 font-medium appearance-none"
                                        value={formData.division}
                                        onChange={handleDivisionChange}
                                        required
                                    >
                                        <option value="" disabled>{t('form.selectDivision')}</option>
                                        {Object.keys(locationData).map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-neutral text-sm">{t('form.districtLabel')}</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10" size={18} />
                                    <select 
                                        className="select select-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200 font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        value={formData.district}
                                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                                        disabled={!formData.division}
                                        required
                                    >
                                        <option value="" disabled>{t('form.selectDistrict')}</option>
                                        {availableDistricts.map(z => <option key={z} value={z}>{z}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Date Picker Section */}
                        <div className="p-6 bg-base-50 rounded-4xl border-2 border-dashed border-base-200 hover:border-primary/30 transition-colors">
                            <label className="label font-bold text-neutral flex items-center gap-2 mb-2 italic">
                                <Calendar size={18} className="text-primary" /> {t('form.lastDonationLabel')}
                            </label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    name="lastDonation"
                                    value={formData.lastDonation}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full h-14 pl-12 rounded-xl focus:outline-primary border-base-200 font-bold text-neutral cursor-pointer bg-white"
                                    onClick={(e) => e.target.showPicker?.()}
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary pointer-events-none" size={20} />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest leading-relaxed">
                                {t('form.newDonorNote')}
                            </p>
                        </div>

                        {/* Blood Group Selector */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral flex items-center gap-2">
                                <Droplets size={18} className="text-primary" /> {t('form.bloodGroupLabel')}
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                {bloodGroups.map((group) => (
                                    <button
                                        key={group}
                                        type="button"
                                        onClick={() => handleGroupSelect(group)}
                                        className={`h-12 rounded-xl font-black transition-all border-2 ${formData.bloodGroup === group ? 'bg-primary border-primary text-white shadow-lg' : 'bg-base-100 border-base-200 text-neutral hover:border-primary/50'}`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Contact Buttons & Dynamic Inputs */}
                        <div className="form-control pt-4">
                            <label className="label font-bold text-neutral mb-2">{t('form.contactMethodsLabel')}</label>
                            
                            {/* Toggle Buttons */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { id: 'phn', label: t('form.methods.phone'), icon: <Phone size={18} /> },
                                    { id: 'wp', label: t('form.methods.whatsapp'), icon: <MessageCircle size={18} /> },
                                    { id: 'fb', label: t('form.methods.facebook'), icon: <Facebook size={18} /> }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => toggleContact(method.id)}
                                        className={`flex flex-col md:flex-row items-center justify-center gap-2 h-16 rounded-2xl border-2 transition-all font-bold ${contacts.includes(method.id) ? 'border-primary bg-primary/5 text-primary scale-105' : 'border-base-200 text-gray-400'}`}
                                    >
                                        {method.icon} <span className="text-xs md:text-sm">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Inputs */}
                            <AnimatePresence mode="wait">
                                <motion.div layout className="space-y-4">
                                    {contacts.includes('phn') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <input 
                                                type="tel" 
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder={t('form.placeholders.phone')} 
                                                className="input input-bordered w-full pl-12 rounded-2xl border-primary/30 bg-primary/5 font-medium" 
                                                // No HTML 'required' here to allow flexibility
                                            />
                                        </motion.div>
                                    )}
                                    {contacts.includes('wp') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                                            <input 
                                                type="tel" 
                                                name="whatsappNumber"
                                                value={formData.whatsappNumber}
                                                onChange={handleInputChange}
                                                placeholder={t('form.placeholders.whatsapp')} 
                                                className="input input-bordered w-full pl-12 rounded-2xl border-emerald-300 bg-emerald-50 font-medium" 
                                            />
                                        </motion.div>
                                    )}
                                    {contacts.includes('fb') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                            <input 
                                                type="url" 
                                                name="facebookLink"
                                                value={formData.facebookLink}
                                                onChange={handleInputChange}
                                                placeholder={t('form.placeholders.facebook')} 
                                                className="input input-bordered w-full pl-12 rounded-2xl border-blue-300 bg-blue-50 font-medium" 
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Error / Success UI Messages */}
                        <div className="space-y-4">
                            <AnimatePresence>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3"
                                    >
                                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                                        <span className="text-sm font-semibold">{error}</span>
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-start gap-3"
                                    >
                                        <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                                        <span className="text-sm font-semibold">{success}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="btn btn-primary btn-lg w-full rounded-4xl text-white shadow-2xl shadow-primary/30 border-none group h-16 font-black text-lg disabled:bg-gray-300"
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        {t('form.submitBtn')} <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;