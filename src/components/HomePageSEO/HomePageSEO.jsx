import React from 'react';
import { Heart } from 'lucide-react';

const HomePageSEO = () => {
    return (
        <div>
            <section className="container mx-auto px-4 md:px-8 my-2">
                <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/10">
                    <div className="max-w-5xl mx-auto space-y-16">

                        {/* 1. Intro Heading */}
                        <div className="text-center">
                            <div className="bg-white w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
                                <Heart className="text-primary" size={40} fill="currentColor" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-neutral mb-6 leading-tight">
                                কেন রক্তদান করবেন এবং <span className="text-primary">এর গুরুত্ব</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
                                রক্তদান কেবল একটি মানবিক কাজই নয়, এটি একটি জীবনদায়ী পদক্ষেপ। আপনার দেওয়া এক ব্যাগ রক্ত
                                সড়ক দুর্ঘটনায় আহত, থ্যালাসেমিয়া রোগী বা প্রসবকালীন জটিলতায় আক্রান্ত মায়ের প্রাণ বাঁচাতে পারে।
                            </p>
                        </div>

                        {/* 2. Three Pillars of Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">স্বাস্থ্যের উন্নতি</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    নিয়মিত রক্তদান করলে শরীরে আয়রনের ভারসাম্য বজায় থাকে। এটি হৃদরোগ এবং ক্যানসারের ঝুঁকি কমাতে সাহায্য করে।
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">নতুন রক্তকণিকা</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    রক্ত দেওয়ার পর শরীর নতুন রক্তকণিকা তৈরি করে, যার ফলে শরীরের রোগ প্রতিরোধ ক্ষমতা এবং সজীবতা বৃদ্ধি পায়।
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">মানসিক তৃপ্তি</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    একজন মুমূর্ষু মানুষের প্রাণ বাঁচানোর যে আত্মিক প্রশান্তি, তা অন্য কোনো কাজের মাধ্যমে পাওয়া সম্ভব নয়।
                                </p>
                            </div>
                        </div>

                        {/* 3. Detailed SEO Articles */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <article className="space-y-6">
                                <h3 className="text-2xl font-bold text-neutral border-l-4 border-primary pl-4">রক্তদাতার সাধারণ যোগ্যতা</h3>
                                <ul className="space-y-3 text-gray-600 font-medium">
                                    <li className="flex items-center gap-2">✓ বয়স ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে।</li>
                                    <li className="flex items-center gap-2">✓ ওজন অন্তত ৫০ কেজি বা তার বেশি হতে হবে।</li>
                                    <li className="flex items-center gap-2">✓ হিমোগ্লোবিনের মাত্রা সঠিক থাকতে হবে।</li>
                                    <li className="flex items-center gap-2">✓ শেষ রক্তদানের পর অন্তত ৪ মাস অতিবাহিত হতে হবে।</li>
                                </ul>
                            </article>

                            <article className="space-y-6">
                                <h3 className="text-2xl font-bold text-neutral border-l-4 border-primary pl-4">রক্তদানের আগে ও পরে করণীয়</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    রক্তদানের আগে পুষ্টিকর খাবার এবং পর্যাপ্ত পানি পান করা জরুরি। রক্তদানের পর অন্তত ১০-১৫ মিনিট বিশ্রাম নিন এবং
                                    পরবর্তী কয়েক ঘণ্টা ভারি কাজ থেকে বিরত থাকুন। আপনার সামান্য সচেতনতা রক্তদান প্রক্রিয়াকে সহজ ও নিরাপদ করবে।
                                </p>
                            </article>
                        </div>

                        {/* 4. Closing Quote */}
                        <div className="text-center pt-8 border-t border-primary/10">
                            <blockquote className="text-2xl font-bold text-neutral italic opacity-80">
                                &quot;আপনার রক্ত, অন্য কারো বাঁচার শক্তি&quot;
                            </blockquote>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageSEO;