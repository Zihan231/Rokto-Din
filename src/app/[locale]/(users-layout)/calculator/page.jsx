import { getTranslations } from 'next-intl/server';
import BloodDonationCalculatorClient from './BloodDonationCalculatorClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CalculatorPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

const CalculatorPage = () => {
  return <BloodDonationCalculatorClient />;
};

export default CalculatorPage;
