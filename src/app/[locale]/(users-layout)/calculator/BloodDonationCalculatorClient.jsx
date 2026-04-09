"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const REQUIRED_MONTHS = 2;
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const startOfDay = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const addMonthsClamped = (date, months) => {
  const next = new Date(date);
  const targetDay = next.getDate();
  next.setDate(1);
  next.setMonth(next.getMonth() + months);

  const lastDayInMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(targetDay, lastDayInMonth));
  return startOfDay(next);
};

const parseInputDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;

  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) return null;

  return startOfDay(parsed);
};

const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BloodDonationCalculatorClient = () => {
  const t = useTranslations('CalculatorPage');
  const locale = useLocale();

  const [lastDonationDate, setLastDonationDate] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const progressValue = useMotionValue(0);
  const progressWidth = useTransform(progressValue, (value) => `${value}%`);

  const todayInputMax = useMemo(() => toDateInputValue(new Date()), []);

  const daysSinceLastDonation = result?.daysSinceLastDonation ?? 0;
  const timelineProgress = result?.timelineProgress ?? 0;

  useEffect(() => {
    const progressAnimation = animate(progressValue, timelineProgress, {
      duration: 1,
      ease: 'easeOut',
    });

    return () => {
      progressAnimation.stop();
    };
  }, [progressValue, timelineProgress]);

  const formatDate = (date) => {
    const outputLocale = locale === 'bn' ? 'bn-BD' : 'en-GB';
    return new Intl.DateTimeFormat(outputLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const handleCalculate = (event) => {
    event.preventDefault();
    setError('');

    if (!lastDonationDate) {
      setResult(null);
      setError(t('validation.empty'));
      return;
    }

    const donationDate = parseInputDate(lastDonationDate);
    if (!donationDate) {
      setResult(null);
      setError(t('validation.invalid'));
      return;
    }

    const today = startOfDay(new Date());
    if (donationDate > today) {
      setResult(null);
      setError(t('validation.future'));
      return;
    }

    const nextAvailableDate = addMonthsClamped(donationDate, REQUIRED_MONTHS);
    const totalWindowDays = Math.max(1, Math.ceil((nextAvailableDate - donationDate) / ONE_DAY_MS));
    const elapsedDays = Math.max(0, Math.floor((today - donationDate) / ONE_DAY_MS));
    const remainingDays = Math.max(0, Math.ceil((nextAvailableDate - today) / ONE_DAY_MS));

    setResult({
      isAvailable: today >= nextAvailableDate,
      nextAvailableDate,
      daysSinceLastDonation: elapsedDays,
      remainingDays,
      timelineProgress: Math.min(100, Math.round((elapsedDays / totalWindowDays) * 100)),
    });
  };

  const seoPoints = [
    { key: 'rule', icon: <Clock3 className="w-6 h-6" />, color: 'text-primary bg-primary/10' },
    { key: 'safety', icon: <HeartPulse className="w-6 h-6" />, color: 'text-emerald-600 bg-emerald-50' },
    { key: 'planning', icon: <CalendarDays className="w-6 h-6" />, color: 'text-blue-600 bg-blue-50' },
  ];

  const seoExpandedKeys = ['consistency', 'preparedness', 'safetyFirst', 'communityImpact'];
  const faqKeys = ['calculation', 'available', 'future', 'newDonor', 'waitReason', 'afterEligible'];

  const faqItems = faqKeys.map((key) => ({
    question: t(`seo.faq.items.${key}.question`),
    answer: t(`seo.faq.items.${key}.answer`),
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <section className="relative bg-neutral overflow-hidden py-20 md:py-24">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-[90px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary">
            <Droplets size={14} />
            {t('hero.badge')}
          </p>

          <h1 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {t.rich('hero.title', {
              highlight: (chunks) => <span className="text-primary italic">{chunks}</span>,
            })}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base md:text-xl font-medium text-gray-300 leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-7 space-y-6">
            <article className="relative overflow-hidden rounded-[2.7rem] border border-primary/20 bg-gradient-to-br from-white via-base-100 to-primary/5 p-6 md:p-10 shadow-[0_35px_90px_-50px_rgba(230,57,70,0.75)]">
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/15 blur-[95px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-neutral/10 blur-[90px]" />

              <div className="relative z-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary shadow-sm">
                    <Sparkles size={14} />
                    {t('form.premiumBadge')}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
                    <ShieldCheck size={14} />
                    {t('form.ruleTag')}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-neutral tracking-tight">
                  {t('form.cardTitle')}
                </h2>
                <p className="mt-3 text-gray-500 font-medium leading-relaxed">
                  {t('form.cardDescription')}
                </p>

                <form onSubmit={handleCalculate} className="mt-8 space-y-5">
                  <div className="rounded-3xl border border-base-300 bg-white/90 p-5 md:p-6">
                    <div className="form-control">
                      <label className="label font-bold text-neutral">{t('form.lastDateLabel')}</label>
                      <div className="relative group">
                        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary" size={18} />
                        <input
                          type="date"
                          value={lastDonationDate}
                          onChange={(event) => setLastDonationDate(event.target.value)}
                          max={todayInputMax}
                          className="input input-bordered w-full rounded-2xl border-base-300 bg-white pl-12 h-14 focus:outline-primary font-bold"
                          onClick={(event) => event.target.showPicker?.()}
                        />
                      </div>
                    </div>

                    <p className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-xs md:text-sm font-semibold text-primary">
                      {t('form.hint')}
                    </p>
                  </div>

                  {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="btn btn-primary h-14 w-full rounded-2xl border-none text-base font-black text-white shadow-2xl shadow-primary/30"
                  >
                    {t('form.submitBtn')}
                  </button>
                </form>

                {result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-8 overflow-hidden rounded-[2.1rem] border border-primary/20 bg-neutral p-6 md:p-8 shadow-2xl"
                  >
                    <div className="pointer-events-none absolute -top-14 -right-10 h-40 w-40 rounded-full bg-primary/30 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-primary/15 blur-[90px]" />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-black text-white">{t('form.statusTitle')}</h3>
                        <span
                          className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider ${result.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}
                        >
                          {result.isAvailable ? t('form.available') : t('form.notAvailable')}
                        </span>
                      </div>

                      <p className="mt-4 font-medium text-gray-300">
                        {result.isAvailable
                          ? t('form.availableMessage')
                          : t.rich('form.notAvailableMessage', {
                            days: result.remainingDays,
                            highlight: (chunks) => <span className="font-black text-primary">{chunks}</span>,
                          })}
                      </p>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-300">
                          <span>{t('form.progressLabel')}</span>
                          <span>{timelineProgress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                          <motion.div
                            style={{ width: progressWidth }}
                            className={`h-full ${result.isAvailable ? 'bg-emerald-500' : 'bg-primary'}`}
                          />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                            {t('form.daysSinceLabel')}
                          </p>
                          <div className="mt-2 flex items-end gap-2">
                            <span className="text-4xl font-black italic leading-none text-white">
                              {daysSinceLastDonation}
                            </span>
                            <span className="mb-1 text-md font-black font-extrabold uppercase tracking-[0.18em] text-white">
                              {t('form.daysUnit')}
                            </span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                            {t('form.nextDateLabel')}
                          </p>
                          <p className="mt-2 text-base md:text-lg font-black leading-tight text-white">
                            {formatDate(result.nextAvailableDate)}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                            {t('form.availabilityLabel')}
                          </p>
                          <p className="mt-2 text-sm md:text-base font-bold text-white">
                            {result.isAvailable
                              ? t('form.available')
                              : t('form.remainingValue', { days: result.remainingDays })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </article>

            <section className="relative overflow-hidden rounded-[2.7rem] border border-primary/20 bg-gradient-to-br from-white via-base-100 to-primary/5 p-6 md:p-10 shadow-[0_25px_80px_-55px_rgba(230,57,70,0.8)]">
              <div className="pointer-events-none absolute -top-16 -left-10 h-52 w-52 rounded-full bg-primary/15 blur-[85px]" />
              <div className="pointer-events-none absolute -bottom-18 -right-12 h-56 w-56 rounded-full bg-neutral/10 blur-[90px]" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                    <Sparkles size={14} />
                    {t('seo.faq.badge')}
                  </p>
                </div>

                <h2 className="mt-4 text-3xl md:text-4xl font-black text-neutral leading-tight">
                  {t('seo.faq.title')}
                </h2>
                <p className="mt-4 max-w-4xl text-gray-500 font-medium leading-relaxed">
                  {t('seo.faq.description')}
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {faqItems.map((item, index) => (
                    <article
                      key={item.question}
                      className="group relative overflow-hidden rounded-[1.7rem] border border-base-300 bg-white/95 p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
                    >
                      <div className="pointer-events-none absolute right-4 top-3 text-6xl font-black text-primary/10 leading-none select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-300 group-hover:w-24" />
                      <h3 className="pr-12 text-lg font-black text-neutral leading-tight">
                        {item.question}
                      </h3>
                      <p className="mt-3 text-sm md:text-base font-medium text-gray-500 leading-relaxed">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="xl:col-span-5 space-y-6">
            <div className="rounded-[2.5rem] border border-base-300 bg-white p-6 md:p-8 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                {t('seo.tag')}
              </p>
              <h2 className="mt-4 text-3xl font-black text-neutral leading-tight">
                {t.rich('seo.title', {
                  highlight: (chunks) => <span className="text-primary italic">{chunks}</span>,
                })}
              </h2>
              <p className="mt-4 text-gray-500 font-medium leading-relaxed">
                {t('seo.description')}
              </p>

              <div className="mt-8 space-y-4">
                {seoPoints.map((point) => (
                  <div
                    key={point.key}
                    className="rounded-2xl border border-base-300 bg-base-50 p-4"
                  >
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${point.color}`}>
                      {point.icon}
                    </div>
                    <h3 className="text-lg font-black text-neutral">
                      {t(`seo.points.${point.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                      {t(`seo.points.${point.key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-base-300 bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-black text-neutral leading-tight">
                {t('seo.expanded.title')}
              </h3>
              <p className="mt-4 text-gray-500 font-medium leading-relaxed">
                {t('seo.expanded.intro')}
              </p>

              <div className="mt-6 space-y-4">
                {seoExpandedKeys.map((key) => (
                  <div key={key} className="rounded-2xl border border-base-300 bg-base-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 text-primary shrink-0" size={18} />
                      <div>
                        <h4 className="font-black text-neutral text-base">
                          {t(`seo.expanded.points.${key}.title`)}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-gray-500 leading-relaxed">
                          {t(`seo.expanded.points.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="pb-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="rounded-[3rem] bg-neutral px-6 py-10 md:px-12 md:py-14 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)', backgroundSize: '28px 28px' }} />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-gray-300 font-medium">
                {t('cta.description')}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/find-donors" className="w-full sm:w-auto">
                  <button className="btn btn-primary h-14 w-full sm:w-auto rounded-full border-none px-8 text-white font-black">
                    <Search size={18} />
                    {t('cta.findBtn')}
                  </button>
                </Link>

                <Link href="/register" className="w-full sm:w-auto">
                  <button className="btn btn-outline h-14 w-full sm:w-auto rounded-full border-white/30 px-8 text-white hover:bg-white hover:text-neutral font-black">
                    <UserPlus size={18} />
                    {t('cta.registerBtn')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodDonationCalculatorClient;
