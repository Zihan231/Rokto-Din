"use client";
import React, { useState } from 'react';
import { Search, Droplets, MapPin, Navigation, Phone, Calendar, X, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function FindDonorClient() {
    const t = useTranslations('FindDonorClient');

    const [formData, setFormData] = useState({ bloodGroup: '', division: '', district: '' });
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);

    // Full District List for Cascading Dropdown
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

    // Get available districts based on selected division
    const availableDistricts = formData.division ? locationData[formData.division] : [];

    // Static Demo Data (Ideally, fetch this from an API)
    const demoDonors = [
        {
            id: 1, name: "Arif Rahman", group: "A+", location: "Mirpur, Dhaka", lastDonation: "2 months ago", availability: "Available",
            phone: "+8801700000000", whatsapp: "8801700000000", facebook: "https://facebook.com/user1"
        },
        {
            id: 2, name: "Sumaiya Akter", group: "O-", location: "Banani, Dhaka", lastDonation: "5 months ago", availability: "Available",
            phone: "+8801800000000", facebook: "https://facebook.com/user2"
        },
        {
            id: 3, name: "Rakib Hasan", group: "B+", location: "Uttara, Dhaka", lastDonation: "1 month ago", availability: "Available",
            whatsapp: "8801900000000"
        },
    ];

    const handleSearch = () => {
        // In a real app, you would filter based on formData here
        setResults(demoDonors);
        setHasSearched(true);
    };

    const handleDivisionChange = (e) => {
        setFormData({
            ...formData,
            division: e.target.value,
            district: '' // Reset district when division changes
        });
    };

    const openContactModal = (donor) => {
        const options = [donor.phone, donor.whatsapp, donor.facebook].filter(Boolean);

        if (options.length === 1) {
            if (donor.phone) window.location.href = `tel:${donor.phone}`;
            else if (donor.whatsapp) window.open(`https://wa.me/${donor.whatsapp}`, '_blank');
            else if (donor.facebook) window.open(donor.facebook, '_blank');
        } else {
            setSelectedDonor(donor);
        }
    };

    return (
        <>
            {/* Search Form Section */}
            <section className="container mx-auto px-4 md:px-8 -mt-12">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-base-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">

                        {/* Blood Group */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><Droplets size={18} className="text-primary" /> {t('form.bloodGroup')}</span></label>
                            <select className="select select-bordered rounded-xl font-bold" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>
                                <option value="" disabled>{t('form.selectGroup')}</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        {/* Division */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><Navigation size={18} className="text-primary" /> {t('form.division')}</span></label>
                            <select className="select select-bordered rounded-xl font-bold" value={formData.division} onChange={handleDivisionChange}>
                                <option value="" disabled>{t('form.selectDivision')}</option>
                                {Object.keys(locationData).map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                        </div>

                        {/* District (Cascading) */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><MapPin size={18} className="text-primary" /> {t('form.district')}</span></label>
                            <select
                                className="select select-bordered rounded-xl font-bold disabled:bg-gray-100 disabled:cursor-not-allowed"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                disabled={!formData.division}
                            >
                                <option value="" disabled>{t('form.selectDistrict')}</option>
                                {availableDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                            </select>
                        </div>

                        {/* Search Button */}
                        <button onClick={handleSearch} className="btn btn-primary btn-lg rounded-xl text-white shadow-lg shadow-primary/20 gap-3 hover:scale-[1.02] transition-transform">
                            <Search size={20} /> {t('form.searchBtn')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {hasSearched && (
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 md:px-8 mt-16">
                        <div className="flex items-center justify-between mb-8 border-b pb-4">
                            <h3 className="text-2xl font-bold text-neutral">{t('results.title')}</h3>
                            <span className="text-gray-500 font-medium">
                                <span className="text-primary font-bold text-xl">{results.length}</span> {t('results.countText')}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.map((donor) => (
                                <div key={donor.id} className="bg-white rounded-2xl p-6 border border-base-200 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl">{donor.group}</div>
                                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">{donor.availability}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-neutral mb-3">{donor.name}</h4>
                                    <div className="space-y-2 mb-6 text-gray-500 text-sm">
                                        <p className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {donor.location}</p>
                                        <p className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {t('results.lastDonation')} {donor.lastDonation}</p>
                                    </div>
                                    <button onClick={() => openContactModal(donor)} className="btn btn-primary btn-outline w-full rounded-xl gap-2">
                                        {t('results.contactBtn')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Contact Modal */}
            <AnimatePresence>
                {selectedDonor && (
                    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm bg-black/30">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-box bg-white p-8 rounded-3xl border-t-4 border-primary shadow-2xl">
                            <button onClick={() => setSelectedDonor(null)} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20} /></button>

                            <h3 className="text-2xl font-black text-center mb-2 text-neutral">{t('modal.title')}</h3>
                            <p className="text-center text-gray-500 mb-8 font-medium">
                                {t('modal.subtitle', { name: selectedDonor.name })}
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {selectedDonor.phone && (
                                    <a href={`tel:${selectedDonor.phone}`} className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-green-50 text-green-700 border border-green-100 font-bold hover:bg-green-100 transition-colors">
                                        <Phone size={24} /> {t('modal.call')}
                                    </a>
                                )}
                                {selectedDonor.whatsapp && (
                                    <a href={`https://wa.me/${selectedDonor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold hover:bg-emerald-100 transition-colors">
                                        <MessageCircle size={24} /> {t('modal.whatsapp')}
                                    </a>
                                )}
                                {selectedDonor.facebook && (
                                    <a href={selectedDonor.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 font-bold hover:bg-blue-100 transition-colors">
                                        <Facebook size={24} /> {t('modal.facebook')}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setSelectedDonor(null)}>close</button>
                        </form>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}