"use client";
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    Calendar, History, Search, Filter,
    Droplets, MapPin, Download, Plus,
    ChevronLeft, ChevronRight, ArrowDownUp
} from 'lucide-react';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AuthContext from '@/hooks/AuthContext/AuthContext';

const HistoryPage = () => {
    const t = useTranslations('HistoryPage');
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // State Management
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    // Pagination, Search & Sort State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("desc"); 
    const limit = 8;

    useEffect(() => {
        const fetchDonationRecords = async () => {
            setLoading(true);
            try {
                const res = await axiosSecure.get(`/donor/donation-records`, {
                    params: {
                        page,
                        limit,
                        hospitalName: searchQuery || undefined,
                        sort: sortOrder
                    }
                });
                const records = res.data?.data || [];
                const metaInfo = res.data?.meta;
                setDonations(records);
                setTotalPages(metaInfo?.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch donation records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDonationRecords();
    }, [page, limit, searchQuery, sortOrder, axiosSecure]);

    const handleSearch = () => {
        setPage(1);
        setSearchQuery(searchInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const toggleSort = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
        setPage(1);
    };

    // --- UPDATED DOWNLOAD LOGIC WITH NUMBERING ---
    const handleDownloadPdf = async () => {
        setDownloading(true);
        try {
            const res = await axiosSecure.get(`/donor/donation-records`, {
                params: {
                    limit: 1000, 
                    sort: sortOrder,
                    hospitalName: searchQuery || undefined
                }
            });

            const allDonations = res.data?.data || [];
            if (allDonations.length === 0) return;

            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const colors = {
                primary: [138, 17, 25],    // Deep Maroon (#8A1119)
                base100: [254, 254, 253],  // White Card BG (#FEFEFD)
                base200: [234, 239, 239],  // Overall BG (#EAEFEF)
                neutral: [42, 44, 43],     
                muted: [107, 114, 128]     
            };

            // 1. HEADER
            doc.setFillColor(...colors.base100);
            doc.rect(0, 0, pageWidth, 55, 'F');
            doc.setFillColor(...colors.primary);
            doc.rect(0, 0, pageWidth, 4, 'F');

            doc.setFont("helvetica", "bold");
            doc.setFontSize(28);
            doc.setTextColor(...colors.primary);
            doc.text("Rokto Din", 14, 22);

            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.setTextColor(...colors.muted);
            doc.text("The noble journey of saving lives.", 14, 28);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(...colors.primary);
            doc.text("DONATION REPORT", pageWidth - 14, 22, { align: 'right' });

            // 2. METADATA
            doc.setDrawColor(...colors.base200);
            doc.line(14, 35, pageWidth - 14, 35);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...colors.neutral);
            doc.text(`DONOR: ${user?.fullName?.toUpperCase() || 'N/A'}`, 14, 43);
            doc.text(`BLOOD GROUP: ${user?.bloodGroup || 'N/A'}`, 14, 48);
            doc.setFont("helvetica", "normal");
            doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - 14, 43, { align: 'right' });
            doc.text(`Total Records: ${allDonations.length}`, pageWidth - 14, 48, { align: 'right' });

            // 3. TABLE GENERATION WITH NUMBERING
            // Added "SL" to columns
            const tableColumn = ["SL", "Donation Date", "Hospital / Location", "Quantity"];
            
            // Map records and add (index + 1) for the SL column
            const tableRows = allDonations.map((record, index) => [
                index + 1,
                record.date || new Date(record.donationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                record.hospital || record.hospitalName,
                `${record.unitsDonated || 1} Bag(s)`
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 58,
                theme: 'grid',
                styles: { font: 'helvetica', fontSize: 10, cellPadding: 5, lineColor: [220, 220, 220], lineWidth: 0.1 },
                headStyles: { fillColor: colors.primary, textColor: [255, 255, 255], fontStyle: 'bold', halign: 'center' },
                columnStyles: {
                    0: { cellWidth: 18, halign: 'center' },
                    1: { cellWidth: 40, halign: 'center' },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 35, halign: 'center', fontStyle: 'bold' }
                },
                alternateRowStyles: { fillColor: colors.base200 },
                margin: { left: 14, right: 14 },
                didDrawPage: (data) => {
                    doc.setFontSize(8);
                    doc.setFont("helvetica", "italic");
                    doc.setTextColor(...colors.muted);
                    doc.text("Official donation record generated by Rokto Din Platform.", 14, pageHeight - 10);
                    doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - 14, pageHeight - 10, { align: 'right' });
                }
            });

            doc.save(`Rokto_Din_Report_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF history:", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {/* 1. Header Card */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-neutral text-white p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] shadow-xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10 w-full md:w-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                            <History size={24} className="text-primary" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight">{t('title')}</h1>
                    </div>
                    <p className="text-gray-400 font-medium text-sm md:text-base">{t('subtitle')}</p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 md:gap-3 w-full md:w-auto justify-end">
                    <button
                        onClick={handleDownloadPdf}
                        disabled={donations.length === 0 || loading || downloading}
                        className="btn btn-sm md:btn-md bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl px-4 md:px-6 font-bold backdrop-blur-md flex-1 md:flex-none disabled:opacity-50"
                    >
                        {downloading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <Download size={16} className="md:w-4.5 md:h-4.5" />
                        )}
                        <span className="hidden sm:inline ml-1">{t('downloadBtn')}</span>
                    </button>
                    <Link href={"/dashboard/donation"} className="btn btn-sm md:btn-md btn-primary text-white rounded-xl px-4 md:px-6 font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform flex-1 md:flex-none">
                        <Plus size={16} className="md:w-4.5 md:h-4.5" /> {t('addRecordBtn') || "Add"}
                    </Link>
                </div>
            </div>

            {/* 2. Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('searchPlaceholder')}
                            className="input input-bordered w-full pl-10 md:pl-12 h-12 md:h-14 rounded-xl md:rounded-2xl focus:outline-primary bg-base-100 shadow-sm font-medium text-sm md:text-base"
                        />
                    </div>
                    <button onClick={handleSearch} className="btn btn-primary h-12 md:h-14 rounded-xl md:rounded-2xl text-white shadow-sm px-4 md:px-6 text-sm md:text-base">
                        {t('searchBtn') || "Search"}
                    </button>
                </div>

                <button
                    onClick={toggleSort}
                    className="btn btn-outline h-12 md:h-14 rounded-xl md:rounded-2xl bg-base-100 border-base-200 text-neutral hover:bg-neutral hover:text-white shadow-sm px-4 md:px-6 w-full md:w-auto flex items-center justify-between md:justify-center gap-2"
                >
                    <div className="flex items-center gap-2">
                        <ArrowDownUp size={18} />
                        <span className="font-bold text-sm md:text-base">
                            {sortOrder === 'desc' ? (t('sortNewest') || "Newest First") : (t('sortOldest') || "Oldest First")}
                        </span>
                    </div>
                </button>
            </div>

            {/* 3. Table */}
            <div className="bg-base-100 rounded-3xl md:rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden flex flex-col w-full">
                <div className="w-full overflow-x-hidden">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 text-gray-400 uppercase text-[10px] md:text-xs tracking-widest border-b border-base-200 text-left">
                                <th className="py-3 md:py-6 pl-4 md:pl-8">{t('table.date')}</th>
                                <th className="py-3 md:py-6 px-2 md:px-4">{t('table.hospital')}</th>
                                <th className="py-3 md:py-6 pr-4 md:pr-8 text-right">{t('table.quantity')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-10">
                                        <span className="loading loading-spinner loading-md text-primary"></span>
                                    </td>
                                </tr>
                            ) : donations.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-12 text-gray-400 font-medium text-sm md:text-base">
                                        No donation records found.
                                    </td>
                                </tr>
                            ) : (
                                donations.map((item, index) => (
                                    <motion.tr
                                        key={item.recordId || item.id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none"
                                    >
                                        <td className="pl-4 md:pl-8 py-3 md:py-5 align-middle w-[30%] md:w-auto">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 text-blue-500 hidden sm:flex items-center justify-center shrink-0">
                                                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                                <span className="font-bold text-neutral text-[11px] sm:text-xs md:text-base leading-tight">
                                                    {item.date || (item.donationDate && new Date(item.donationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 md:py-5 px-2 md:px-4 align-middle">
                                            <div className="flex items-center gap-1 md:gap-2">
                                                <MapPin className="text-gray-400 shrink-0 w-3 h-3 md:w-4 md:h-4 hidden sm:block" />
                                                <span className="font-bold text-neutral text-[11px] sm:text-xs md:text-base wrap-break-word line-clamp-2 md:line-clamp-none leading-tight">
                                                    {item.hospital || item.hospitalName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 md:py-5 pr-4 md:pr-8 text-right align-middle w-[25%] md:w-auto">
                                            <div className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-primary/5 text-primary rounded-full font-black text-[10px] md:text-sm border border-primary/10">
                                                <Droplets className="fill-primary w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0" />
                                                {t('table.bagUnit', { count: item.unitsDonated || item.bag || item.bagQuantity || 1 })}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && donations.length > 0 && (
                    <div className="p-3 md:p-6 border-t border-base-200 bg-base-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
                        <span className="text-xs md:text-sm font-bold text-gray-400">
                            Showing Page {page} of {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="btn btn-xs md:btn-sm btn-circle btn-outline border-gray-300 text-neutral hover:bg-neutral hover:text-white disabled:opacity-30"
                            >
                                <ChevronLeft size={14} className="md:w-4 md:h-4" />
                            </button>
                            <div className="px-3 md:px-4 py-1 rounded-md md:rounded-lg bg-base-100 border border-base-200 font-black text-neutral shadow-sm text-xs md:text-sm">
                                {page}
                            </div>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="btn btn-xs md:btn-sm btn-circle btn-outline border-gray-300 text-neutral hover:bg-neutral hover:text-white disabled:opacity-30"
                            >
                                <ChevronRight size={14} className="md:w-4 md:h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;