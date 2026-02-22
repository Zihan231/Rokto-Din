"use client";
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLocale } from 'next-intl';

const CustomReCaptcha = ({ onChange, hasError }) => {
    const recaptchaRef = useRef(null);
    
    const locale = useLocale(); 

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        return (
            <div className="p-4 bg-red-50 text-red-500 rounded-xl text-sm font-bold border border-red-100">
                ⚠️ reCAPTCHA Site Key is missing in .env file!
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center sm:items-start my-2">
            <div className={`rounded-lg overflow-hidden border-[3px] transition-colors ${hasError ? 'border-red-500' : 'border-transparent'}`}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={onChange}
                    hl={locale}
                    theme="light" 
                />
            </div>
            {hasError && (
                <span className="text-red-500 text-sm font-bold mt-1">
                    {locale === 'bn' ? 'দয়া করে ক্যাপচা পূরণ করুন' : 'Please complete the captcha'}
                </span>
            )}
        </div>
    );
};

export default CustomReCaptcha;