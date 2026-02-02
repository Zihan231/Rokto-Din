"use client";
import React, { useState } from 'react';
import { Search, Droplets, MapPin, Navigation, Phone, Calendar, X, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FindDonorClient() {
    const [formData, setFormData] = useState({ bloodGroup: '', division: '', district: '' });
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);

    const demoDonors = [
        {
            id: 1, name: "আরিফ রহমান", group: "A+", location: "মিরপুর, ঢাকা", lastDonation: "২ মাস আগে", availability: "Available",
            phone: "+8801700000000", whatsapp: "8801700000000", facebook: "https://facebook.com/user1"
        },
        {
            id: 2, name: "সুমাইয়া আক্তার", group: "O-", location: "বনানী, ঢাকা", lastDonation: "৫ মাস আগে", availability: "Available",
            phone: "+8801800000000", facebook: "https://facebook.com/user2" // No WhatsApp
        },
        {
            id: 3, name: "রাকিব হাসান", group: "B+", location: "উত্তরা, ঢাকা", lastDonation: "১ মাস আগে", availability: "Available",
            whatsapp: "8801900000000" // Only WhatsApp
        },
    ];

    const handleSearch = () => {
        setResults(demoDonors);
        setHasSearched(true);
    };

    const openContactModal = (donor) => {
        // Filter available options
        const options = [donor.phone, donor.whatsapp, donor.facebook].filter(Boolean);

        // If only one option exists, trigger it immediately
        if (options.length === 1) {
            if (donor.phone) {
                // Systems handle tel: links without leaving the page
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = `tel:${donor.phone}`;
            }
            else if (donor.whatsapp) {
                // Open WhatsApp in a NEW tab
                window.open(`https://wa.me/${donor.whatsapp}`, '_blank');
            }
            else if (donor.facebook) {
                // Open Facebook in a NEW tab
                window.open(donor.facebook, '_blank');
            }
        } else {
            // If multiple options exist, show the choice modal
            setSelectedDonor(donor);
        }
    };

    return (
        <>
            {/* Search Form */}
            <section className="container mx-auto px-4 md:px-8 -mt-12">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-base-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><Droplets size={18} className="text-primary" /> রক্তের গ্রুপ</span></label>
                            <select className="select select-bordered rounded-xl font-bold" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>
                                <option value="" disabled>নির্বাচন করুন</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><Navigation size={18} className="text-primary" /> বিভাগ</span></label>
                            <select className="select select-bordered rounded-xl font-bold" value={formData.division} onChange={(e) => setFormData({ ...formData, division: e.target.value })}>
                                <option value="" disabled>বিভাগ</option>
                                {['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'].map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700 flex items-center gap-2"><MapPin size={18} className="text-primary" /> জেলা</span></label>
                            <select className="select select-bordered rounded-xl font-bold" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}>
                                <option value="" disabled>জেলা</option>
                                {['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'সাভার'].map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                        <button onClick={handleSearch} className="btn btn-primary btn-lg rounded-xl text-white shadow-lg shadow-primary/20 gap-3 hover:scale-[1.02] transition-transform"><Search size={20} /> সন্ধান করুন</button>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {hasSearched && (
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 md:px-8 mt-16">
                        <div className="flex items-center justify-between mb-8 border-b pb-4">
                            <h3 className="text-2xl font-bold text-neutral">অনুসন্ধানের ফলাফল</h3>
                            <span className="text-gray-500 font-medium">
                                <span className="text-primary font-bold text-xl">{results.length}</span> জন রক্তদাতা পাওয়া গেছে
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
                                        <p className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> শেষ রক্তদান: {donor.lastDonation}</p>
                                    </div>
                                    <button onClick={() => openContactModal(donor)} className="btn btn-primary btn-outline w-full rounded-xl gap-2">যোগাযোগ করুন</button>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Contact Modal */}
            <AnimatePresence>
                {selectedDonor && (
                    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-box bg-white p-8 rounded-3xl border-t-4 border-primary">
                            <button onClick={() => setSelectedDonor(null)} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"><X size={20} /></button>
                            <h3 className="text-2xl font-black text-center mb-2">যোগাযোগের মাধ্যম</h3>
                            <p className="text-center text-gray-500 mb-8 font-medium">{selectedDonor.name}-এর সাথে যোগাযোগ করুন</p>
                            <div className="grid grid-cols-1 gap-4">
                                {selectedDonor.phone && <a href={`tel:${selectedDonor.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 text-green-700 border border-green-100 font-bold"><Phone size={24} /> কল করুন</a>}
                                {selectedDonor.whatsapp && <a href={`https://wa.me/${selectedDonor.whatsapp}`} target="_blank" className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold"><MessageCircle size={24} /> হোয়াটসঅ্যাপ</a>}
                                {selectedDonor.facebook && <a href={selectedDonor.facebook} target="_blank" className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 font-bold"><Facebook size={24} /> ফেসবুক</a>}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}