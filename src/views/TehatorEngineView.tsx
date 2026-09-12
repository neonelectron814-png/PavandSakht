import React, { useState } from 'react';
import { BARTER_ITEMS } from '../data/mockData';
import { BarterItem, BarterMode } from '../types';
import { 
  Repeat, 
  Plus, 
  Building2, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  ArrowLeft, 
  Filter, 
  CheckCircle2, 
  Handshake, 
  Sparkles,
  Scale
} from 'lucide-react';

export const TehatorEngineView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<BarterMode | 'all'>('all');
  const [items, setItems] = useState<BarterItem[]>(BARTER_ITEMS);
  const [showNewProposalModal, setShowNewProposalModal] = useState<boolean>(false);
  const [selectedBarterForOffer, setSelectedBarterForOffer] = useState<BarterItem | null>(null);

  // Quick Barter Value Calculator state
  const [calcApartmentValueBillion, setCalcApartmentValueBillion] = useState<number>(20);
  const rebarPricePerTon = 32_800_000; // 32.8M Toman per ton
  const cementPricePerTon = 1_640_000; // ~1.64M Toman per ton (20 bags of 50kg)
  const travertineSlabPerSqm = 1_850_000; // 1.85M Toman per sqm

  const calculatedRebarTons = Math.floor((calcApartmentValueBillion * 1_000_000_000) / rebarPricePerTon);
  const calculatedCementTons = Math.floor((calcApartmentValueBillion * 1_000_000_000) / cementPricePerTon);
  const calculatedTravertineSqm = Math.floor((calcApartmentValueBillion * 1_000_000_000) / travertineSlabPerSqm);

  // New proposal form
  const [newTitle, setNewTitle] = useState('');
  const [newOffered, setNewOffered] = useState('');
  const [newRequested, setNewRequested] = useState('');
  const [newValueBillion, setNewValueBillion] = useState('15');
  const [newMode, setNewMode] = useState<BarterMode>('property_for_material');
  const [newLocation, setNewLocation] = useState('تهران، سعادت‌آباد');

  const filteredItems = items.filter((item) => {
    if (selectedMode === 'all') return true;
    return item.mode === selectedMode;
  });

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: BarterItem = {
      id: `barter-${Date.now()}`,
      mode: newMode,
      titleFa: newTitle,
      titleEn: newTitle,
      offeredItemFa: newOffered || newTitle,
      offeredItemEn: newOffered || newTitle,
      offeredValueToman: Number(newValueBillion) * 1_000_000_000,
      requestedItemFa: newRequested || 'میلگرد ذوب‌آهن یا بتن آماده',
      requestedItemEn: newRequested || 'Isfahan Rebar or Ready-mix Concrete',
      locationFa: newLocation,
      locationEn: newLocation,
      status: 'active',
      tagsFa: ['فایل جدید', 'کاداستر تایید شده', 'سند تک‌برگ'],
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      verifiedCadastre: true,
      dateListed: 'دقایقی پیش'
    };

    setItems([newItem, ...items]);
    setShowNewProposalModal(false);
    setNewTitle('');
    setNewOffered('');
    setNewRequested('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Repeat className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-slate-900">
              تالار تخصصی تهاتر مصالح، املاک و مشارکت ساخت
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            مبادله مستقیم واحدهای مسکونی و تجاری با آهن‌آلات، سیمان، سنگ و انعقاد قراردادهای مشارکت در ساخت
          </p>
        </div>

        <button
          onClick={() => setShowNewProposalModal(true)}
          className="btn-3d-emerald px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت فایل تهاتر جدید</span>
        </button>
      </div>

      {/* Barter Mode Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'همه فایل‌ها' },
          { id: 'property_for_material', label: 'تهاتر ملک با مصالح ساختمانی' },
          { id: 'property_for_property', label: 'معاوضه ملک با ملک (ویلا/آپارتمان)' },
          { id: 'construction_partnership', label: 'مشارکت در ساخت (زمین و سازنده)' },
        ].map((tab) => {
          const isSelected = selectedMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedMode(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2-Column Grid: Left is Barter Listings, Right is Quick Commodity Equivalency Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Filtered Barter Cards */}
        <div className="lg:col-span-8 space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card-3d-hover glass-panel p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between gap-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.titleFa}
                  className="w-full sm:w-44 h-36 object-cover rounded-xl shrink-0"
                />

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {item.mode === 'property_for_material'
                        ? 'تهاتر ملک با مصالح'
                        : item.mode === 'property_for_property'
                        ? 'معاوضه ملک با ملک'
                        : 'مشارکت در ساخت'}
                    </span>

                    <span className="text-[11px] text-slate-400">{item.dateListed}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.titleFa}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span>موقعیت:</span>
                    <strong className="text-slate-700">{item.locationFa}</strong>
                  </p>

                  {/* Offered vs Requested Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">مورد پیشنهادی مالک:</span>
                      <span className="font-semibold text-slate-800 line-clamp-2">{item.offeredItemFa}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">مورد درخواستی در تهاتر:</span>
                      <span className="font-semibold text-emerald-700 line-clamp-2">{item.requestedItemFa}</span>
                    </div>
                  </div>

                  {item.partnershipRatio && (
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                      درصد مشارکت: {item.partnershipRatio}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">ارزش برآوردی:</span>
                    <span className="font-mono text-sm font-black text-slate-900">
                      {(item.offeredValueToman / 1_000_000_000).toLocaleString('fa-IR')} میلیارد تومان
                    </span>
                  </div>

                  {item.verifiedCadastre && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>سند تک‌برگ کاداستری تایید شده</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBarterForOffer(item)}
                    className="btn-3d-emerald px-3.5 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Handshake className="w-3.5 h-3.5" />
                    <span>مذاکره و ارسال پیشنهاد</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 Cols: Barter Equivalency & Material Conversion Calculator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 shadow-sm bg-white space-y-4 sticky top-24">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">ماشین‌حساب هوشمند تبدیل ملک به مصالح</h3>
            </div>

            <p className="text-xs text-slate-500">
              محاسبه معادل تنی آهن‌آلات و سیمان بر اساس نرخ لحظه‌ای بورس کالا برای معاوضه دقیق و بدون زیان طرفین
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                ارزش تقریبی ملک شما (میلیارد تومان):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="2"
                  max="150"
                  step="1"
                  value={calcApartmentValueBillion}
                  onChange={(e) => setCalcApartmentValueBillion(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <span className="font-mono text-sm font-black text-emerald-700 min-w-[3.5rem] text-left">
                  {calcApartmentValueBillion} م.ت
                </span>
              </div>
            </div>

            {/* Results breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">معادل میلگرد ذوب‌آهن</span>
                  <span className="text-[10px] text-slate-400">نرخ پایه: ۳۲,۸۰۰ تومان/کیلو</span>
                </div>
                <span className="font-mono text-sm font-black text-emerald-600">
                  {calculatedRebarTons.toLocaleString('fa-IR')} تن
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">معادل سیمان تیپ ۲</span>
                  <span className="text-[10px] text-slate-400">نرخ پایه: ۸۲,۰۰۰ تومان/کیسه</span>
                </div>
                <span className="font-mono text-sm font-black text-blue-600">
                  {calculatedCementTons.toLocaleString('fa-IR')} تن
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">معادل سنگ اسلب تراورتن</span>
                  <span className="text-[10px] text-slate-400">عباس‌آباد سوپر صادراتی</span>
                </div>
                <span className="font-mono text-sm font-black text-amber-600">
                  {calculatedTravertineSqm.toLocaleString('fa-IR')} مترمربع
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
              <strong className="block text-emerald-800 font-bold mb-0.5">ضمانت اتاق داوری پیوندساخت:</strong>
              قراردادهای تهاتر ثبت شده در پلتفرم مشمول صدور کد رهگیری هولوگرام‌دار، استعلام همزمان کاداستر و بیمه کیفیت مصالح تحویلی می‌باشند.
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Submit New Barter File */}
      {showNewProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">ثبت فایل جدید در تالار تهاتر</h3>
              <button
                onClick={() => setShowNewProposalModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نوع تهاتر:</label>
                <select
                  value={newMode}
                  onChange={(e) => setNewMode(e.target.value as BarterMode)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
                >
                  <option value="property_for_material">تهاتر ملک با مصالح ساختمانی</option>
                  <option value="property_for_property">معاوضه ملک با ملک (ویلا با آپارتمان)</option>
                  <option value="construction_partnership">مشارکت در ساخت (زمین و سازنده)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">عنوان آگهی تهاتر:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: تهاتر پنت‌هاوس ۲۵۰ متری با ۱۰۰۰ تن میلگرد اصفهان"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">مورد پیشنهادی شما:</label>
                  <input
                    type="text"
                    required
                    value={newOffered}
                    onChange={(e) => setNewOffered(e.target.value)}
                    placeholder="مشخصات ملک یا مصالح شما"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">مورد درخواستی در ازای آن:</label>
                  <input
                    type="text"
                    required
                    value={newRequested}
                    onChange={(e) => setNewRequested(e.target.value)}
                    placeholder="مصالح یا ملک مورد نیاز"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ارزش کل تخمینی (میلیارد ت):</label>
                  <input
                    type="number"
                    required
                    value={newValueBillion}
                    onChange={(e) => setNewValueBillion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">موقعیت مکانی:</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-3d-emerald py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  تایید و درج در تالار معاملات تهاتر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit Counter Offer to Existing Barter */}
      {selectedBarterForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">ارسال پیشنهاد تهاتر مستقیم</h3>
              <button
                onClick={() => setSelectedBarterForOffer(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-slate-400 block text-[10px]">فایل انتخابی:</span>
              <strong className="text-slate-800">{selectedBarterForOffer.titleFa}</strong>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">شرح پیشنهاد شما (کالا، ملک یا توناژ مصالح):</label>
                <textarea
                  rows={3}
                  placeholder="مثال: اینجانب حاضر به واگذاری ۴۰۰ تن میلگرد نمره ۱۸ ذوب آهن تحویل انبار تهران در ازای یک واحد آپارتمان هستم..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">شماره تماس جهت هماهنگی کارشناس دادگستری:</label>
                <input
                  type="tel"
                  defaultValue="0912"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden font-mono text-left"
                />
              </div>

              <button
                onClick={() => {
                  alert('پیشنهاد شما در سامانه ثبت شد و پیامک تایید به مالک فایل ارسال گردید.');
                  setSelectedBarterForOffer(null);
                }}
                className="w-full btn-3d-emerald py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md"
              >
                ثبت پیشنهاد رسمی و ایجاد اتاق مذاکره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
