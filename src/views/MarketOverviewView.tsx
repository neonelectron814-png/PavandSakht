import React, { useState } from 'react';
import { NARKH_SHEKAN_PROPERTIES } from '../data/mockData';
import { PropertyListing, TabType } from '../types';
import { 
  ShieldCheck, 
  MapPin, 
  Repeat, 
  ArrowLeft, 
  TrendingUp,
  Building2,
  HardHat,
  CreditCard,
  Zap,
  Key,
  LineChart,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  Phone
} from 'lucide-react';

interface MarketOverviewViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectPropertyForInquiry?: (cadastralCode: string) => void;
}

export const MarketOverviewView: React.FC<MarketOverviewViewProps> = ({
  onNavigate,
  onSelectPropertyForInquiry,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  const hubCategories = [
    {
      id: 'omran' as TabType,
      titleFa: 'پیوند عمران و راهسازی',
      descFa: 'ماشین‌آلات سنگین، لودر، بیل مکانیکی و معادن',
      icon: <HardHat className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50/70 border-amber-200/80 hover:border-amber-400',
      badge: 'ناوگان عمرانی'
    },
    {
      id: 'installments' as TabType,
      titleFa: 'تالار اقساطی',
      descFa: 'خرید اعتباری مسکن و مصالح با چک صیادی بنفش',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50/70 border-emerald-200/80 hover:border-emerald-400',
      badge: 'اقساط ۳۶ ماهه'
    },
    {
      id: 'requests' as TabType,
      titleFa: 'درخواست‌های مشتری',
      descFa: 'تطبیق هوشمند تقاضای فوری مصالح و اتصال به تامین‌کننده',
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50/70 border-indigo-200/80 hover:border-indigo-400',
      badge: 'تطبیق فوری'
    },
    {
      id: 'rentals' as TabType,
      titleFa: 'املاک اجاره‌ای',
      descFa: 'رهن و اجاره با فیلتر دسترسی به مترو، مدارس و بودجه',
      icon: <Key className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50/70 border-blue-200/80 hover:border-blue-400',
      badge: 'پورتال دوسویه'
    },
    {
      id: 'tehator' as TabType,
      titleFa: 'تالار تهاتر و نرخ‌شکن',
      descFa: 'تهاتر ملک با مصالح و فرصت‌های ۲۰٪ تا ۴۰٪ زیر قیمت کارشناسی',
      icon: <Repeat className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50/70 border-teal-200/80 hover:border-teal-400',
      badge: 'فرصت طلایی'
    },
    {
      id: 'sabt_asnad' as TabType,
      titleFa: 'استعلام کاداستر ثبت اسناد',
      descFa: 'بررسی اصالت سند تک‌برگ و پلاک ثبتی ملک در اتاق معامله',
      icon: <ShieldCheck className="w-5 h-5 text-slate-800" />,
      bg: 'bg-slate-50 border-slate-200 hover:border-slate-400',
      badge: 'استعلام رسمی'
    },
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-200">
      {/* 1. Clean, Airy Hero Section with Whitespace & Official Slogan */}
      <section className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>پیوندساخت (آکانا)</span>
          </div>

          {/* Official Slogan (No exaggerated slogans) */}
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            پیوندساخت؛ <span className="text-emerald-600">اتصال هوشمندانه</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            اکوسیستم هوشمند مبادلات ملکی، تهاتر تخصصی مصالح، خرید اقساطی، پیوند عمران و راهسازی و استعلام رسمی کاداستر اسناد.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('omran')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <HardHat className="w-4 h-4" />
              <span>پیوند عمران و راهسازی</span>
            </button>

            <button
              onClick={() => onNavigate('installments')}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>طرح‌های خرید اقساطی</span>
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LineChart className="w-4 h-4 text-slate-500" />
              <span>تحلیل قیمت بازار</span>
            </button>
          </div>

          {/* Clean KPI metrics without bloated widgets */}
          <div className="flex items-center gap-6 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">ارزش مبادلات فعال</span>
              <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">۵۲۰+ میلیارد تومان</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block">تاییدیه کاداستر اسناد</span>
              <span className="text-base font-black text-emerald-600 font-mono mt-0.5 block">۱۰۰٪ برخط</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block">تامین‌کنندگان متصل</span>
              <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">۲,۸۰۰+ مرکز</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Consolidated Categories Grid (Modern Android Material Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              بخش‌های اصلی اکوسیستم پیوندساخت
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              دسترسی سریع به سامانه‌های تخصصی مبادلات، عمران، اقساطی و استعلام
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className={`rounded-3xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${cat.bg} shadow-xs hover:shadow-md active:scale-[0.98]`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-700 shadow-xs border border-slate-200/50">
                  {cat.badge}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {cat.titleFa}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.descFa}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-slate-800 pt-1">
                <span>ورود به بخش</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Narkh-Shekan (Price Breaker) Dynamic Deals Section (20%-40% below market value) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black">
                نرخ‌شکن فوری
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                املاک ۲۰٪ تا ۴۰٪ زیر قیمت کارشناسی
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              فروش‌های فوری نقدینگی و تسویه تعهدات ساختمانی با تاییدیه سند کاداستری رسمی
            </p>
          </div>

          <button
            onClick={() => onNavigate('tehator')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه در تالار تهاتر</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NARKH_SHEKAN_PROPERTIES.slice(0, 3).map((prop) => (
            <div
              key={prop.id}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              {/* Image & Discount Badge */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={prop.imageUrl}
                  alt={prop.titleFa}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black shadow-xs animate-pulse">
                    {prop.discountPercent}٪ زیر قیمت
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">{prop.locationFa}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {prop.titleFa}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{prop.areaSqM} متر مربع</span>
                    <span>{prop.bedrooms} خوابه</span>
                    <span className="text-emerald-700 font-semibold">سند تک‌برگ</span>
                  </div>
                  <p className="text-[11px] text-rose-700 bg-rose-50/80 px-2 py-1 rounded-lg">
                    علت: {prop.urgentReasonFa}
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-slate-400 line-through font-mono">
                      {(prop.originalPriceToman / 1_000_000_000).toFixed(1)} میلیارد
                    </div>
                    <div className="text-sm font-black text-slate-900 font-mono">
                      {(prop.discountedPriceToman / 1_000_000_000).toFixed(1)} <span className="text-[11px] font-normal text-slate-500">میلیارد تومان</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    جزئیات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
                  {selectedProperty.discountPercent}٪ نرخ‌شکن
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-xs">
                  {selectedProperty.titleFa}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <img
                src={selectedProperty.imageUrl}
                alt={selectedProperty.titleFa}
                className="w-full h-48 object-cover rounded-2xl"
              />

              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block">قیمت کارشناسی:</span>
                  <span className="font-bold text-slate-500 line-through">{(selectedProperty.originalPriceToman / 1_000_000_000).toFixed(1)} میلیارد تومان</span>
                </div>
                <div>
                  <span className="text-slate-400 block">قیمت با تخفیف نقدینگی:</span>
                  <span className="font-bold text-emerald-700 text-sm">{(selectedProperty.discountedPriceToman / 1_000_000_000).toFixed(1)} میلیارد تومان</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">شناسه کاداستر رسمی:</span>
                <div className="p-2.5 rounded-xl bg-slate-100 font-mono text-slate-800 text-xs flex items-center justify-between">
                  <span>{selectedProperty.cadastralCode}</span>
                  <button
                    onClick={() => {
                      if (onSelectPropertyForInquiry) {
                        onSelectPropertyForInquiry(selectedProperty.cadastralCode);
                      }
                      setSelectedProperty(null);
                    }}
                    className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
                  >
                    استعلام در سامانه کاداستر
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => alert(`هماهنگی بازدید و تماس با وکیل مالک: ۰۹۱۲۳۴۵۶۷۸۹`)}
                  className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس جهت خرید نقدی فوری</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
