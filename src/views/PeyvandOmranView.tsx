import React, { useState, useMemo } from 'react';
import { HEAVY_MACHINERY_DATA } from '../data/mockData';
import { HeavyMachineryItem } from '../types';
import { 
  Tractor, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  Phone, 
  Search, 
  Filter, 
  Clock, 
  Calendar, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  X,
  Send,
  HardHat
} from 'lucide-react';

interface PeyvandOmranViewProps {
  searchQuery?: string;
}

export const PeyvandOmranView: React.FC<PeyvandOmranViewProps> = ({ searchQuery = '' }) => {
  const [selectedDealType, setSelectedDealType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMachineForInquiry, setSelectedMachineForInquiry] = useState<HeavyMachineryItem | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    projectLocation: '',
    duration: 'یک ماه'
  });

  const categories = [
    { id: 'all', label: 'همه ماشین‌آلات' },
    { id: 'excavator', label: 'بیل مکانیکی' },
    { id: 'loader', label: 'لودر' },
    { id: 'mixer', label: 'تراک میکسر' },
    { id: 'crane', label: 'جرثقیل کارگاهی' },
    { id: 'bulldozer', label: 'بولدوزر و سنگین' },
    { id: 'roller', label: 'غلتک راهسازی' }
  ];

  const dealTypes = [
    { id: 'all', label: 'همه روش‌های واگذاری' },
    { id: 'sale', label: 'فروش قطعی / تهاتر' },
    { id: 'rental', label: 'اجاره پروژه‌ای' },
    { id: 'contracting', label: 'پیمانکاری اجرا' }
  ];

  const filteredMachines = useMemo(() => {
    return HEAVY_MACHINERY_DATA.filter((item) => {
      const matchesSearch = 
        !searchQuery ||
        item.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.locationFa.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDealType = selectedDealType === 'all' || item.dealType === selectedDealType;

      return matchesSearch && matchesCategory && matchesDealType;
    });
  }, [searchQuery, selectedCategory, selectedDealType]);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setSelectedMachineForInquiry(null);
      setInquiryForm({ name: '', phone: '', projectLocation: '', duration: 'یک ماه' });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <HardHat className="w-3.5 h-3.5 text-emerald-600" />
              <span>پیوند عمران و راهسازی</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              سامانه جامع ماشین‌آلات سنگین، پروژه‌های عمرانی و معادن
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              اجاره، خرید و واگذاری مستقیم انواع لودر، بیل مکانیکی، جرثقیل و تجهیزات راهسازی با تاییدیه کارشناسی فنی و سند معتبر.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shrink-0">
              <div className="text-lg font-black text-emerald-600">{HEAVY_MACHINERY_DATA.length}+</div>
              <div className="text-[10px] text-slate-500 font-semibold">دستگاه آماده به کار</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shrink-0">
              <div className="text-lg font-black text-slate-900">۱۰۰٪</div>
              <div className="text-[10px] text-slate-500 font-semibold">کارشناسی سلامت موتور</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Deal Types */}
          <div className="sm:mr-auto flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {dealTypes.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setSelectedDealType(dt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDealType === dt.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {dt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Machinery Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMachines.map((machine) => (
          <div 
            key={machine.id}
            className="group rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
          >
            {/* Image & Badges */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img 
                src={machine.imageUrl} 
                alt={machine.titleFa}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                  {machine.brand}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                  {machine.dealTypeFa}
                </span>
              </div>

              {machine.verifiedTechnicalSheet && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-800 text-[10px] font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تاییدیه سلامت هیدرولیک و موتور</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {machine.titleFa}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>مدل {machine.modelYear}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>کارکرد: {machine.operationalHours.toLocaleString('fa-IR')} ساعت</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{machine.locationFa}</span>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {machine.specsFa.map((spec, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {machine.dealType === 'rental' ? 'نرخ اجاره' : 'قیمت واگذاری'}
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900">
                    {machine.priceToman.toLocaleString('fa-IR')} <span className="text-[11px] font-normal text-slate-500">تومان</span>
                    {machine.rentalPeriodFa && <span className="text-[10px] text-emerald-700 block">{machine.rentalPeriodFa}</span>}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMachineForInquiry(machine)}
                  className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <span>استعلام و رزرو</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Modal */}
      {selectedMachineForInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">درخواست پیش‌فاکتور ماشین‌آلات</h3>
                  <span className="text-[11px] text-slate-500">{selectedMachineForInquiry.titleFa}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMachineForInquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">درخواست شما با موفقیت ثبت شد</h4>
                <p className="text-xs text-slate-500">
                  کارشناس اعزام ماشین‌آلات و صدور حواله، ظرف ۳۰ دقیقه آینده با شما تماس خواهد گرفت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">نام متقاضی یا شرکت پروژه</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مهندس فراهانی (شرکت راه‌سازان)"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">شماره تماس مستقیم</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">محل و شهر اجرای پروژه</label>
                  <input
                    type="text"
                    placeholder="مثال: پروژه اتوبان تهران - شمال، قطعه ۳"
                    value={inquiryForm.projectLocation}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, projectLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال درخواست و هماهنگی اعزام</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
