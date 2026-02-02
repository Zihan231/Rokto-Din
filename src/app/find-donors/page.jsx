// app/find-donor/page.js
import FindDonorClient from '@/components/FindDonorClient/FindDonorClient';
import FindDonorPageSEO from '@/components/FindDonorPageSEO/FindDonorPageSEO';

export const metadata = {
  title: 'রক্তদাতা খুঁজুন | Rokto Din',
  description: 'আপনার এলাকায় দ্রুত রক্তদাতা খুঁজে পেতে Rokto Din ব্যবহার করুন। জীবন বাঁচাতে রক্ত দান করুন।',
};

export default function FindDonorPage() {
  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* 1. Header (SSR) */}
      <section className="bg-base-200 py-16 md:py-24 border-b border-base-300">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-neutral mb-6 leading-tight">
            আপনার এলাকায় <span className="text-primary">রক্তদাতা</span> খুঁজুন
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            জরুরি প্রয়োজনে রক্তদাতার সন্ধান পাওয়া এখন আরও সহজ। আমাদের ডাটাবেজে আপনার নিকটস্থ বিশ্বস্ত রক্তদাতাদের খুঁজুন।
          </p>
        </div>
      </section>

      {/* 2. Interactive Search & Results (Client Component) */}
      <FindDonorClient />

      <FindDonorPageSEO />
    </div>
  );
}