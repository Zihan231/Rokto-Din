"use client";
import React, { useState } from 'react';
import { Search, Droplets, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const FindDonor = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    division: '',
    district: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", formData);
  };

  // Sample District Data
  const districts = [
    'Dhaka', 'Gazipur', 'Narayanganj', 'Chittagong', 'Sylhet', 
    'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 
    'Cumilla', 'Bogura', 'Noakhali'
  ];

  return (
    <section className="relative z-20 container mx-auto px-4 md:px-8 py-12 lg:py-24 bg-base-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral mb-3 leading-tight">
            আপনার এলাকাতে <br className="md:hidden" /> 
            <span className="text-primary">রক্তদাতা খুঁজুন</span>
          </h2>
          
          <div className="w-16 md:w-24 h-1.5 bg-primary mx-auto rounded-full mb-4"></div>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 font-medium px-2 max-w-2xl mx-auto">
            নিচের তথ্যগুলো দিয়ে দ্রুত ডোনারের সন্ধান পান
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-transparent"
        >
          <form 
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 items-end border-y border-gray-300/60 py-10"
          >
            {/* 1. Blood Group */}
            <div className="form-control w-full group">
              <label className="label pt-0">
                <span className="label-text font-bold text-sm md:text-base flex items-center gap-2 text-neutral group-hover:text-primary transition-colors">
                  <Droplets className="w-5 h-5 text-primary" /> রক্তের গ্রুপ
                </span>
              </label>
              <select 
                className="select select-bordered md:select-ghost w-full border-gray-300 md:border-t-0 md:border-x-0 md:border-b-2 md:rounded-none focus:border-primary focus:bg-white md:focus:bg-transparent px-3 md:px-0 text-lg font-bold transition-all h-12 md:h-14"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                required
              >
                <option value="" disabled>গ্রুপ নির্বাচন</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group} className="text-black">{group}</option>
                ))}
              </select>
            </div>

            {/* 2. Division */}
            <div className="form-control w-full group">
              <label className="label pt-0">
                <span className="label-text font-bold text-sm md:text-base flex items-center gap-2 text-neutral group-hover:text-primary transition-colors">
                  <Navigation className="w-5 h-5 text-primary" /> বিভাগ
                </span>
              </label>
              <select 
                className="select select-bordered md:select-ghost w-full border-gray-300 md:border-t-0 md:border-x-0 md:border-b-2 md:rounded-none focus:border-primary focus:bg-white md:focus:bg-transparent px-3 md:px-0 text-lg font-bold transition-all h-12 md:h-14"
                value={formData.division}
                onChange={(e) => setFormData({...formData, division: e.target.value})}
              >
                <option value="">বিভাগ নির্বাচন</option>
                {['Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'].map(div => (
                  <option key={div} value={div} className="text-black">{div}</option>
                ))}
              </select>
            </div>

            {/* 3. District (Now a Dropdown) */}
            <div className="form-control w-full group">
              <label className="label pt-0">
                <span className="label-text font-bold text-sm md:text-base flex items-center gap-2 text-neutral group-hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5 text-primary" /> জেলা
                </span>
              </label>
              <select 
                className="select select-bordered md:select-ghost w-full border-gray-300 md:border-t-0 md:border-x-0 md:border-b-2 md:rounded-none focus:border-primary focus:bg-white md:focus:bg-transparent px-3 md:px-0 text-lg font-bold transition-all h-12 md:h-14"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              >
                <option value="">জেলা নির্বাচন</option>
                {districts.map(dist => (
                  <option key={dist} value={dist} className="text-black">{dist}</option>
                ))}
              </select>
            </div>

            {/* 4. Search Button */}
            <div className="form-control w-full mt-4 lg:mt-0">
              <button 
                type="submit" 
                className="btn btn-primary btn-md md:btn-lg rounded-xl md:rounded-full w-full text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-3 h-12 md:h-16 text-lg md:text-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
                সন্ধান করুন
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FindDonor;