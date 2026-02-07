"use client";
import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HomePageSEO = () => {
    const t = useTranslations('HomePageSEO');

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
                                {t.rich('intro.title', {
                                    highlight: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
                                {t('intro.description')}
                            </p>
                        </div>

                        {/* 2. Three Pillars of Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Pillar 1: Health */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">{t('pillars.health.title')}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {t('pillars.health.desc')}
                                </p>
                            </div>
                            {/* Pillar 2: Cells */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">{t('pillars.cells.title')}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {t('pillars.cells.desc')}
                                </p>
                            </div>
                            {/* Pillar 3: Mind */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                                <h3 className="text-xl font-bold text-primary mb-4">{t('pillars.mind.title')}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {t('pillars.mind.desc')}
                                </p>
                            </div>
                        </div>

                        {/* 3. Detailed SEO Articles */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <article className="space-y-6">
                                <h3 className="text-2xl font-bold text-neutral border-l-4 border-primary pl-4">
                                    {t('details.qualification.title')}
                                </h3>
                                <ul className="space-y-3 text-gray-600 font-medium">
                                    <li className="flex items-center gap-2">✓ {t('details.qualification.list.age')}</li>
                                    <li className="flex items-center gap-2">✓ {t('details.qualification.list.weight')}</li>
                                    <li className="flex items-center gap-2">✓ {t('details.qualification.list.hemoglobin')}</li>
                                    <li className="flex items-center gap-2">✓ {t('details.qualification.list.interval')}</li>
                                </ul>
                            </article>

                            <article className="space-y-6">
                                <h3 className="text-2xl font-bold text-neutral border-l-4 border-primary pl-4">
                                    {t('details.advice.title')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('details.advice.desc')}
                                </p>
                            </article>
                        </div>

                        {/* 4. Closing Quote */}
                        <div className="text-center pt-8 border-t border-primary/10">
                            <blockquote className="text-2xl font-bold text-neutral italic opacity-80">
                                {t('quote')}
                            </blockquote>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageSEO;