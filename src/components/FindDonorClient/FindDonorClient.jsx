"use client";
import React, { useState } from 'react';
import { Search, Droplets, MapPin, Navigation, Phone, Calendar, X, Facebook, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import useAxios from '@/hooks/axios/useAxios';
// Import your custom Loading component
import Loading from '@/components/Loading/Loading'; 

export default function FindDonorClient() {
    const t = useTranslations('FindDonorClient');
    const axios = useAxios();
    
    // --- State Management ---
    const [formData, setFormData] = useState({ bloodGroup: '', division: '', district: '' });
    const [results, setResults] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);

    // --- Location Data ---
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

    // --- API Interactions ---
    const fetchDonors = async (page = 1) => {
        setIsLoading(true);
        
        // Immediate UI feedback: scroll to results area
        if(page === 1) {
            setHasSearched(true);
            setTimeout(() => {
                const resultsSection = document.getElementById('results-section');
                if(resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }

        try {
            const payload = { ...formData, page, limit: 9 };
            if (!payload.division) delete payload.division;
            if (!payload.district) delete payload.district;

            const response = await axios.post('user/search', payload);

            const { data, meta } = response.data;
            
            setResults(data);
            setPagination(meta); 

        } catch (err) {
            console.error("Error fetching donors:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handlers ---
    const handleSearch = () => {
        if(formData.bloodGroup) {
            fetchDonors(1);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchDonors(newPage);
        }
    };

    const handleDivisionChange = (e) => {
        setFormData({
            ...formData,
            division: e.target.value,
            district: '' 
        });
    };

    const openContactModal = (donor) => {
        const options = [donor.phoneNumber, donor.whatsappNumber, donor.facebookLink].filter(Boolean);

        if (options.length === 1) {
            if (donor.phoneNumber) window.location.href = `tel:${donor.phoneNumber}`;
            else if (donor.whatsappNumber) window.open(`https://wa.me/${donor.whatsappNumber}`, '_blank');
            else if (donor.facebookLink) window.open(donor.facebookLink, '_blank');
        } else {
            setSelectedDonor(donor);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <>
            {/* --- Search Form Section --- */}
            <section className="container mx-auto px-4 md:px-8 -mt-12 relative z-10">
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

                        {/* District */}
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
                        <button 
                            onClick={handleSearch} 
                            disabled={isLoading || !formData.bloodGroup}
                            className="btn btn-primary btn-lg rounded-xl text-white shadow-lg shadow-primary/20 gap-3 hover:scale-[1.02] transition-transform disabled:bg-primary/50"
                        >
                            <Search size={20} />
                            {t('form.searchBtn')}
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Results Section --- */}
            <AnimatePresence>
                {hasSearched && (
                    <motion.section 
                        id="results-section"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="container mx-auto px-4 md:px-8 mt-16 pb-20"
                    >
                        {/* CONDITIONAL RENDERING: Loading vs Content */}
                        {isLoading ? (
                            // Use your custom Loading component here
                            <Loading />
                        ) : (
                            <>
                                {/* Header & Count */}
                                <div className="flex items-center justify-between mb-8 border-b pb-4">
                                    <h3 className="text-2xl font-bold text-neutral">{t('results.title')}</h3>
                                    <span className="text-gray-500 font-medium">
                                        <span className="text-primary font-bold text-xl">{pagination.total}</span> {t('results.countText')}
                                    </span>
                                </div>

                                {/* No Results Found State */}
                                {results.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                                        <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-500">No donors found</h3>
                                        <p className="text-gray-400">Try adjusting your location filters</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Donors Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {results.map((donor) => (
                                                <div key={donor.id} className="bg-white rounded-2xl p-6 border border-base-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                                    
                                                    {/* Top Row: Blood Group & Status */}
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="w-14 h-14 text-white bg-primary border border-red-100 rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
                                                            {donor.bloodGroup}
                                                        </div>
                                                        
                                                        <div className="flex flex-col items-end gap-2">
                                                            {/* Status Badge */}
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                                donor.donationStatus === 'onn' 
                                                                ? 'bg-green-50 text-green-600 border-green-200' 
                                                                : 'bg-red-50 text-red-600 border-red-200'
                                                            }`}>
                                                                {donor.donationStatus === 'onn' ? 'Available' : 'Unavailable'}
                                                            </span>

                                                            {/* Total Donation Count Badge */}
                                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-2xl border border-gray-200">
                                                                Total Donations {donor.totalDonation}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Donor Details */}
                                                    <h4 className="text-xl font-bold text-neutral mb-1">{donor.fullName}</h4>
                                                    
                                                    <div className="space-y-2 mb-6 text-gray-500 text-sm bg-gray-50 p-3 rounded-xl border border-dashed border-gray-50">
                                                        <p className="flex items-center gap-2">
                                                            <MapPin size={14} className="text-primary" /> 
                                                            <span className="font-medium text-gray-700">{donor.district}, {donor.division}</span>
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-primary" /> 
                                                            <span>Last: <span className="font-medium text-gray-700">{formatDate(donor.lastDonation)}</span></span>
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Contact Button */}
                                                    <button 
                                                        onClick={() => openContactModal(donor)} 
                                                        className="btn btn-primary w-full rounded-xl gap-2 font-bold shadow-lg shadow-red-100 hover:shadow-red-200 text-white"
                                                    >
                                                        {t('results.contactBtn')}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination Controls */}
                                        {pagination.totalPages > 1 && (
                                            <div className="flex justify-center mt-12 gap-2">
                                                <button 
                                                    className="btn btn-circle btn-outline"
                                                    disabled={pagination.page === 1 || isLoading}
                                                    onClick={() => handlePageChange(pagination.page - 1)}
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                                
                                                <div className="flex items-center gap-2 px-4 font-bold text-gray-600">
                                                    Page {pagination.page} of {pagination.totalPages}
                                                </div>

                                                <button 
                                                    className="btn btn-circle btn-outline"
                                                    disabled={pagination.page === pagination.totalPages || isLoading}
                                                    onClick={() => handlePageChange(pagination.page + 1)}
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </motion.section>
                )}
            </AnimatePresence>

            {/* --- Contact Modal --- */}
            <AnimatePresence>
                {selectedDonor && (
                    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm bg-black/30 z-50">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-box bg-white p-8 rounded-3xl border-t-4 border-primary shadow-2xl">
                            <button onClick={() => setSelectedDonor(null)} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20} /></button>

                            <h3 className="text-2xl font-black text-center mb-2 text-neutral">{t('modal.title')}</h3>
                            <p className="text-center text-gray-500 mb-8 font-medium">
                                {t('modal.subtitle', { name: selectedDonor.fullName })}
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {selectedDonor.phoneNumber && (
                                    <a href={`tel:${selectedDonor.phoneNumber}`} className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-green-50 text-green-700 border border-green-100 font-bold hover:bg-green-100 transition-colors">
                                        <Phone size={24} /> {t('modal.call')} <span className="text-sm opacity-75">({selectedDonor.phoneNumber})</span>
                                    </a>
                                )}
                                {selectedDonor.whatsappNumber && (
                                    <a href={`https://wa.me/${selectedDonor.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold hover:bg-emerald-100 transition-colors">
                                        <MessageCircle size={24} /> {t('modal.whatsapp')}
                                    </a>
                                )}
                                {selectedDonor.facebookLink && (
                                    <a href={selectedDonor.facebookLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 font-bold hover:bg-blue-100 transition-colors">
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