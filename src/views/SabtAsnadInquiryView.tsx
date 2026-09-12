import React, { useState } from 'react';
import { DeedVerificationResult } from '../types';
import { 
  ShieldCheck, 
  Search, 
  FileCheck2, 
  AlertTriangle, 
  Printer, 
  Lock, 
  Building, 
  Stamp, 
  CheckCircle2, 
  QrCode,
  Download,
  Share2,
  HelpCircle
} from 'lucide-react';

interface SabtAsnadInquiryViewProps {
  initialCadastralCode?: string;
}

export const SabtAsnadInquiryView: React.FC<SabtAsnadInquiryViewProps> = ({
  initialCadastralCode = '1403-9821-4471-889102'
}) => {
  const [cadastralCode, setCadastralCode] = useState<string>(initialCadastralCode);
  const [nationalId, setNationalId] = useState<string>('0018945231');
  const [subPlot, setSubPlot] = useState<string>('4471/12');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inquiryResult, setInquiryResult] = useState<DeedVerificationResult | null>({
    verified: true,
    trackingCode: 'SABT-1403-889102',
    cadastralCode: '1403-9821-4471-889102',
    nationalId: '0018945231',
    ownerNameMasked: 'رضا ص*** م***',
    district: 'منطقه ثبتی شمیران - پلاک ثبتی ۴۴۷۱ فرعی از ۱۲ اصلی',
    registeredAreaSqM: 320.5,
    encumbranceStatus: 'Clear',
    encumbranceStatusFa: 'فاقد هرگونه بازداشت یا رهن',
    documentTypeFa: 'سند تک‌برگ کاداستری رسمی',
    issuanceOfficeFa: 'اداره ثبت اسناد و املاک منطقه شمیرانات و لواسانات',
    inquiryTimestamp: '۱۴۰۳/۰۶/۲۲ - ساعت ۱۲:۴۴:۱۰',
    digitalSealHash: 'SHA256: 8f9b12a49219b18dc8e34891b29a65cf2e09489d6e8103b44b82104e12c19e34'
  });

  const handleRunInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cadastralCode) return;

    setIsLoading(true);
    setTimeout(() => {
      setInquiryResult({
        verified: true,
        trackingCode: `SABT-${Math.floor(100000 + Math.random() * 900000)}`,
        cadastralCode: cadastralCode,
        nationalId: nationalId,
        ownerNameMasked: 'محمد ح*** ک***',
        district: 'منطقه ثبتی تهران - بخش ۱۱ پلاک ثبتی ' + (subPlot || '۸۸۱/۵'),
        registeredAreaSqM: 185.0,
        encumbranceStatus: 'Clear',
        encumbranceStatusFa: 'فاقد هرگونه بازداشت یا رهن',
        documentTypeFa: 'سند تک‌برگ کاداستری رسمی',
        issuanceOfficeFa: 'اداره ثبت اسناد و املاک منطقه ۲ تهران (سعادت‌آباد)',
        inquiryTimestamp: new Date().toLocaleTimeString('fa-IR'),
        digitalSealHash: 'SHA256: 7e2a901f4c39bb81039da52109841bf77c22019488a014bc912384a516089b21'
      });
      setIsLoading(false);
    }, 800);
  };

  const handleLoadSample = (sampleCode: string, sampleNational: string, samplePlot: string) => {
    setCadastralCode(sampleCode);
    setNationalId(sampleNational);
    setSubPlot(samplePlot);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Terminal Title & Legal Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                ترمینال استعلام اصالت سند مالکیت کاداستر (سازمان ثبت اسناد و املاک کشور)
              </h1>
              <p className="text-xs text-slate-500">
                درگاه مستقیم احراز مالکیت، تایید پلاک ثبتی، استعلام بازداشت قضایی و عدم توقیف پلاک در اتاق معامله
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200 text-xs">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-600 font-medium">پروتکل امن تبادل داده قوه قضائیه</span>
        </div>
      </div>

      {/* Main Form & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inquiry Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 shadow-xs bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900">ورود اطلاعات سند و مالک</h2>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                وب‌سرویس فعال
              </span>
            </div>

            <form onSubmit={handleRunInquiry} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  شناسه یکتای سند کاداستری (کد ۱۸ رقمی بالای سند تک‌برگ):
                </label>
                <input
                  type="text"
                  required
                  value={cadastralCode}
                  onChange={(e) => setCadastralCode(e.target.value)}
                  placeholder="مثال: 1403-9821-4471-889102"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-left focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">کد ملی / شناسه ملی مالک:</label>
                  <input
                    type="text"
                    required
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="۱۰ رقمی"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-left focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">پلاک ثبتی (فرعی/اصلی):</label>
                  <input
                    type="text"
                    value={subPlot}
                    onChange={(e) => setSubPlot(e.target.value)}
                    placeholder="مثال: ۴۴۷۱/۱۲"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-3d-emerald py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>در حال استعلام برخط از ثبت اسناد...</span>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>اجرای استعلام رسمی و صدور گواهی اصالت</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Sample Presets */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] text-slate-400 block">نمونه‌های آزمایشی آماده تست سریع:</span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadSample('1403-9821-4471-889102', '0018945231', '۴۴۷۱/۱۲ زعفرانیه')}
                  className="text-right p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 flex items-center justify-between border border-slate-200/80 cursor-pointer"
                >
                  <span>سند پنت‌هاوس زعفرانیه (پاک و آماده معامله)</span>
                  <span className="text-emerald-600 font-bold">انتخاب</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadSample('1403-1120-7763-991204', '0078923411', '۷۷۶۳/۸ سیسنگان')}
                  className="text-right p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-700 flex items-center justify-between border border-slate-200/80 cursor-pointer"
                >
                  <span>سند ویلای تریپلکس سیسنگان (شش‌دانگ کاداستر)</span>
                  <span className="text-emerald-600 font-bold">انتخاب</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Official Certificate Card */}
        <div className="lg:col-span-7">
          {inquiryResult ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 shadow-md bg-white space-y-5 relative overflow-hidden">
              {/* Official Seal Watermark Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Stamp className="w-96 h-96" />
              </div>

              {/* Certificate Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Stamp className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">جمهوری اسلامی ایران - قوه قضائیه</span>
                    <h3 className="text-base font-black text-slate-900">
                      گواهی الکترونیک استعلام اصالت سند و عدم بازداشت
                    </h3>
                    <span className="text-[11px] text-slate-500">{inquiryResult.issuanceOfficeFa}</span>
                  </div>
                </div>

                <div className="text-left font-mono">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>سند معتبر و قطعی</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    شماره پیگیری: {inquiryResult.trackingCode}
                  </span>
                </div>
              </div>

              {/* Verified Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">مالک رسمی ثبت شده:</span>
                  <strong className="text-slate-800 text-sm">{inquiryResult.ownerNameMasked}</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">کد ملی: {inquiryResult.nationalId}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">مساحت سندی عرصه و اعیان:</span>
                  <strong className="text-emerald-700 text-sm font-mono">{inquiryResult.registeredAreaSqM} مترمربع</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">نوع سند: {inquiryResult.documentTypeFa}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 sm:col-span-2">
                  <span className="text-[10px] text-slate-400 block">مشخصات پلاک ثبتی و محدوده:</span>
                  <strong className="text-slate-800">{inquiryResult.district}</strong>
                </div>

                {/* Encumbrance / Lien status */}
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 sm:col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold block">وضعیت موانع قانونی و رهن:</span>
                    <strong className="text-emerald-900 text-sm">{inquiryResult.encumbranceStatusFa}</strong>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              {/* Digital Hash & Stamp Footprint */}
              <div className="p-3 rounded-2xl bg-slate-900 text-white text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span>امضای رمزنگاری شده سرور کاداستر:</span>
                  <span>{inquiryResult.inquiryTimestamp}</span>
                </div>
                <p className="text-[10px] text-slate-300 break-all select-all opacity-80">
                  {inquiryResult.digitalSealHash}
                </p>
              </div>

              {/* Certificate Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  اعتبار این گواهی تا پایان جلسه معامله در سامانه پیوندساخت محفوظ است.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>چاپ رسمی گواهی</span>
                  </button>

                  <button
                    onClick={() => alert('لینک امن گواهی کاداستر با موفقیت کپی شد.')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>اشتراک‌گذاری در اتاق معامله</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border border-slate-200 text-center space-y-3 bg-white">
              <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">منتظر اجرای استعلام</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                کد ۱۸ رقمی سند یا نمونه‌های آماده را انتخاب کنید تا گواهی اصالت کاداستر و استعلام عدم بازداشت به صورت لحظه‌ای صادر شود.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
