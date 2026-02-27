"use client";
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Mail, Phone, MapPin, Calendar,
    Edit, ShieldCheck,
    HeartHandshake, User, X, Save,
    MessageCircle, Facebook
} from 'lucide-react';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure';
import AuthContext from '@/hooks/AuthContext/AuthContext';

// Bangladeshi Location Data mapping Divisions to Districts
const locations = {
    "Dhaka": ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Rajbari", "Madaripur", "Gopalganj", "Faridpur", "Shariatpur", "Narsingdi"],
    "Chattogram": ["Chattogram", "Cox's Bazar", "Cumilla", "Noakhali", "Feni", "Brahmanbaria", "Rangamati", "Bandarban", "Khagrachari", "Lakshmipur", "Chandpur"],
    "Rajshahi": ["Rajshahi", "Sirajganj", "Pabna", "Bogra", "Natore", "Joypurhat", "Chapainawabganj", "Naogaon"],
    "Khulna": ["Khulna", "Jashore", "Satkhira", "Meherpur", "Narail", "Chuadanga", "Kushtia", "Magura", "Bagerhat", "Jhenaidah"],
    "Barishal": ["Barishal", "Jhalokati", "Patuakhali", "Pirojpur", "Bhola", "Barguna"],
    "Sylhet": ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    "Rangpur": ["Rangpur", "Panchagarh", "Dinajpur", "Lalmonirhat", "Nilphamari", "Gaibandha", "Thakurgaon", "Kurigram"],
    "Mymensingh": ["Mymensingh", "Sherpur", "Jamalpur", "Netrokona"]
};

const ProfilePage = () => {
    const t = useTranslations('ProfilePage');
    const axiosSecure = useAxiosSecure();
    const { user, setUser } = useContext(AuthContext);

    // Form & Modal States
    const [isAvailable, setIsAvailable] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    
    // Validation & Submit States
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleEditClick = () => {
        setFormData(user);
        setErrors({});
        setServerError("");
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleDivisionChange = (e) => {
        const newDivision = e.target.value;
        setFormData({
            ...formData,
            division: newDivision,
            district: "" // Reset district when division changes
        });
    };

    // Frontend Validation matching NestJS DTO
    const validate = () => {
        const newErrors = {};

        if (formData.fullName && (formData.fullName.length < 3 || formData.fullName.length > 255)) {
            newErrors.fullName = "Full name must be between 3 and 255 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        const bdPhoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
        if (formData.phoneNumber && !bdPhoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Must be a valid Bangladeshi number";
        }

        if (formData.whatsappNumber && !bdPhoneRegex.test(formData.whatsappNumber)) {
            newErrors.whatsappNumber = "Must be a valid Bangladeshi number";
        }

        const fbRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(.?)?]/;
        if (formData.facebookLink && !fbRegex.test(formData.facebookLink)) {
            newErrors.facebookLink = "Must be a valid Facebook profile or page URL";
        }

        return newErrors;
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Remove un-editable fields like id, totalDonation, etc. before sending
            const { id, lastDonation, totalDonation, donationStatus, ...updateData } = formData; 
            
            const res = await axiosSecure.post(`donor/edit-profile`, updateData); 

            if (res.status === 200 || res.status === 201) {
                // Update React Context with new user data
                setUser((prev) => ({ ...prev, ...updateData }));
                setIsEditing(false); // Close Modal

                // Trigger Success Toast
                setSuccessMessage(res.data?.message || "Profile updated successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            setServerError(
                error.response?.data?.message || "An error occurred while updating your profile."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderContactValue = (value) => {
        if (!value || value.trim() === "") {
            return <span className="text-red-400 text-sm italic font-medium">{t('missingInfo')}</span>;
        }
        return <span className="font-bold text-neutral text-lg">{value}</span>;
    };

    if (!user) return null; // Safety check

    return (
        <div className="space-y-6 max-w-5xl mx-auto relative">

            {/* --- 1. Profile Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-base-200 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl md:text-4xl font-black text-neutral">
                            {user.fullName}
                        </h1>
                        <ShieldCheck className="text-blue-500 fill-blue-50" size={24} />
                    </div>
                    <p className="text-gray-500 font-medium flex items-center gap-2">
                        <User size={16} /> {t('role')}
                    </p>
                </div>
                <button
                    onClick={handleEditClick}
                    className="btn btn-neutral rounded-2xl text-white px-6 shadow-lg shadow-gray-200 hover:scale-105 transition-transform"
                >
                    <Edit size={18} /> {t('editBtn')}
                </button>
            </div>

            {/* --- 2. Key Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div layout className="bg-primary text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-primary/20 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <p className="font-bold opacity-80 uppercase tracking-widest text-xs mb-4">{t('stats.bloodGroup')}</p>
                        <h2 className="text-6xl font-black mb-2">{user.bloodGroup || "O+"}</h2>
                        <div className="mt-4 bg-white/10 p-1 pl-4 rounded-full flex items-center gap-3 backdrop-blur-sm border border-white/20">
                            <span className="text-xs font-bold">{isAvailable ? t('stats.available') : t('stats.unavailable')}</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm border-white bg-white hover:bg-gray-100 checked:bg-emerald-400 checked:border-emerald-400"
                                checked={isAvailable}
                                onChange={() => setIsAvailable(!isAvailable)}
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-base-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-primary/20 transition-all group">
                    <div className="w-14 h-14 bg-red-50 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <HeartHandshake size={28} />
                    </div>
                    <h3 className="text-4xl font-black text-neutral mb-1">{user.totalDonation || 0} <span className="text-lg text-gray-400">{t('stats.totalUnit')}</span></h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t('stats.totalDonation')}</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-base-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-primary/20 transition-all group">
                    <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Calendar size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-neutral mb-1">{user.lastDonation || "N/A"}</h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t('stats.lastDonation')}</p>
                </div>
            </div>

            {/* --- 3. Contact Info --- */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-base-200 shadow-sm">
                <h3 className="text-xl font-black text-neutral mb-8 border-b border-base-100 pb-4">{t('contact.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Phone size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.phone')}</p>
                            {renderContactValue(user.phoneNumber)}
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.whatsapp')}</p>
                            {renderContactValue(user.whatsappNumber)}
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <Facebook size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.facebook')}</p>
                            {renderContactValue(user.facebookLink)}
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                            <Mail size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.email')}</p>
                            {renderContactValue(user.email)}
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.division')}</p>
                            {renderContactValue(user.division)}
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-50 transition-colors border border-transparent hover:border-base-200">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('contact.district')}</p>
                            {renderContactValue(user.district)}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- EDIT MODAL (Overlay) --- */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-50 shrink-0">
                                <div>
                                    <h3 className="text-2xl font-black text-neutral">{t('modal.title')}</h3>
                                    <p className="text-sm text-gray-500">{t('modal.subtitle')}</p>
                                </div>
                                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-red-50 hover:text-red-500" disabled={isSubmitting}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleEditSubmit} className="p-6 md:p-8 overflow-y-auto space-y-5">
                                
                                {/* SERVER ERROR ALERT */}
                                {serverError && (
                                    <div className="bg-red-50 text-red-500 p-4 rounded-xl font-bold flex items-center gap-2 border border-red-200">
                                        <X size={20} className="shrink-0" />
                                        <p className="text-sm">{serverError}</p>
                                    </div>
                                )}

                                {/* Name */}
                                <div className="form-control">
                                    <label className="label font-bold text-neutral">{t('modal.labels.name')}</label>
                                    <input
                                        type="text" name="fullName"
                                        value={formData.fullName || ''} onChange={handleInputChange}
                                        className={`input input-bordered w-full rounded-xl focus:outline-primary ${errors.fullName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.fullName && <span className="text-red-500 text-xs mt-1 font-bold">{errors.fullName}</span>}
                                </div>

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label font-bold text-neutral">{t('modal.labels.email')}</label>
                                    <input
                                        type="email" name="email"
                                        value={formData.email || ''} onChange={handleInputChange}
                                        className={`input input-bordered w-full rounded-xl focus:outline-primary ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1 font-bold">{errors.email}</span>}
                                </div>

                                {/* Blood Group */}
                                <div className="form-control">
                                    <label className="label font-bold text-neutral">{t('modal.labels.bloodGroup')}</label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup || ''} onChange={handleInputChange}
                                        className="select select-bordered w-full rounded-xl focus:outline-primary font-bold"
                                    >
                                        <option value="" disabled>Select Blood Group</option>
                                        {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </div>

                                {/* Division & District Dropdowns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label font-bold text-neutral">{t('modal.labels.division')}</label>
                                        <select
                                            name="division"
                                            value={formData.division || ''}
                                            onChange={handleDivisionChange}
                                            className="select select-bordered w-full rounded-xl focus:outline-primary font-bold"
                                        >
                                            <option value="" disabled>{t('modal.labels.selectDivision')}</option>
                                            {Object.keys(locations).map(div => (
                                                <option key={div} value={div}>{div}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-bold text-neutral">{t('modal.labels.district')}</label>
                                        <select
                                            name="district"
                                            value={formData.district || ''}
                                            onChange={handleInputChange}
                                            className="select select-bordered w-full rounded-xl focus:outline-primary font-bold"
                                            disabled={!formData.division}
                                        >
                                            <option value="" disabled>{t('modal.labels.selectDistrict')}</option>
                                            {(locations[formData.division] || []).map(dist => (
                                                <option key={dist} value={dist}>{dist}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Contacts Group */}
                                <div className="bg-base-50 p-5 rounded-2xl space-y-4 border border-base-200 mt-2">
                                    <h4 className="font-bold text-gray-500 uppercase text-xs tracking-widest border-b border-base-200 pb-2 mb-2">{t('modal.labels.contactMethod')}</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label font-bold text-neutral flex gap-2"><Phone size={14} /> {t('modal.labels.phone')}</label>
                                            <input
                                                type="tel" name="phoneNumber"
                                                value={formData.phoneNumber || ''} onChange={handleInputChange}
                                                placeholder={t('modal.labels.phonePlaceholder')}
                                                className={`input input-bordered w-full rounded-xl focus:outline-primary font-bold ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                            />
                                            {errors.phoneNumber && <span className="text-red-500 text-xs mt-1 font-bold">{errors.phoneNumber}</span>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label font-bold text-neutral flex gap-2"><MessageCircle size={14} /> {t('modal.labels.whatsapp')}</label>
                                            <input
                                                type="tel" name="whatsappNumber"
                                                value={formData.whatsappNumber || ''} onChange={handleInputChange}
                                                placeholder={t('modal.labels.whatsappPlaceholder')}
                                                className={`input input-bordered w-full rounded-xl focus:outline-primary font-bold ${errors.whatsappNumber ? 'border-red-500' : ''}`}
                                            />
                                            {errors.whatsappNumber && <span className="text-red-500 text-xs mt-1 font-bold">{errors.whatsappNumber}</span>}
                                        </div>
                                        <div className="form-control md:col-span-2">
                                            <label className="label font-bold text-neutral flex gap-2"><Facebook size={14} /> {t('modal.labels.facebook')}</label>
                                            <input
                                                type="url" name="facebookLink"
                                                value={formData.facebookLink || ''} onChange={handleInputChange}
                                                placeholder={t('modal.labels.facebookPlaceholder')}
                                                className={`input input-bordered w-full rounded-xl focus:outline-primary ${errors.facebookLink ? 'border-red-500' : ''}`}
                                            />
                                            {errors.facebookLink && <span className="text-red-500 text-xs mt-1 font-bold">{errors.facebookLink}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="pt-4 flex gap-3 justify-end shrink-0">
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost rounded-xl font-bold" disabled={isSubmitting}>
                                        {t('modal.cancel')}
                                    </button>
                                    <button type="submit" className="btn btn-primary text-white rounded-xl px-8 font-bold shadow-lg shadow-primary/30" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <><Save size={18} /> {t('modal.save')}</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- SUCCESS TOAST (Overlay) --- */}
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="toast toast-bottom toast-center sm:toast-end z-[100]"
                    >
                        <div className="alert alert-success text-white shadow-xl rounded-2xl flex gap-2 items-center px-6 py-4">
                            <ShieldCheck size={20} className="shrink-0" />
                            <span className="font-bold">{successMessage}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ProfilePage;