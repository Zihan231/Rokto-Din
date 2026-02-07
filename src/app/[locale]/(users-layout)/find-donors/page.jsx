import { getTranslations } from 'next-intl/server';
import FindDonorClient from '@/components/FindDonorClient/FindDonorClient';
import FindDonorPageSEO from '@/components/FindDonorPageSEO/FindDonorPageSEO';

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FindDonorPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function FindDonorPage({ params }) {
  // Await params to get the current language
  const { locale } = await params;
  
  // Fetch translations for the Header section
  const t = await getTranslations({ locale, namespace: 'FindDonorPage.header' });

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* 1. Header (SSR) - Now Translated */}
      <section className="bg-base-200 py-16 md:py-24 border-b border-base-300">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-neutral mb-6 leading-tight">
            {/* Rich text formatting for the colored highlight */}
            {t.rich('title', {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('description')}
          </p>
        </div>
      </section>

      {/* 2. Interactive Search & Results (Client Component) */}
      <FindDonorClient />

      <FindDonorPageSEO />
    </div>
  );
}