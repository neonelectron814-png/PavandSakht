import React, { useState, useMemo } from 'react';
import { INSTALLMENT_DEALS_DATA } from '../data/mockData';
import { InstallmentDealItem } from '../types';
import { 
  CreditCard, 
  Calculator, 
  CheckCircle, 
  ShieldCheck, 
  Building2, 
  Package, 
  Percent, 
  FileCheck2, 
  ChevronRight, 
  Calendar,
  X,
  Send,
  AlertCircle
} from 'lucide-react';

interface InstallmentsHubViewProps {
  searchQuery?: string;
}

export const InstallmentsHubView: React.FC<InstallmentsHubViewProps> = ({ searchQuery = '' }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'property' | 'material'>('all');
  
  // Calculator state
  const [calcTotalAmount, setCalcTotalAmount] = useState<number>(2_000_000_000); // 2 Billion Toman
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState<number>(30); // 30%
  const [calcMonths, setCalcMonths] = useState<number>(24); // 24 months
  const [calcAnnualRate, setCalcAnnualRate] = useState<number>(0); // 0% builder direct
  
  const [selectedDealForApply, setSelectedDealForApply] = useState<InstallmentDealItem | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyForm, setApplyForm] = useState({
    fullName: '',
    phone: '',
    nationalCode: '',
    hasSayadCheck: true
  });

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return (calcTotalAmount * calcDownPaymentPercent) / 100;
  }, [calcTotalAmount, calcDownPaymentPercent]);

  const loanPrincipal = useMemo(() => {
    return calcTotalAmount - downPaymentAmount;
  }, [calcTotalAmount, downPaymentAmount]);

  const monthlyPayment = useMemo(() => {
    if (calcMonths <= 0) return 0;
    if (calcAnnualRate === 0) {
      return Math.round(loanPrincipal / calcMonths);
    }
    // Standard amortization formula
    const monthlyRate = (calcAnnualRate / 100) / 12;
    const numerator = loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, calcMonths);
    const denominator = Math.pow(1 + monthlyRate, calcMonths) - 1;
    return Math.round(numerator / denominator);
  }, [loanPrincipal, calcMonths, calcAnnualRate]);

  const totalRepayment = useMemo(() => {
    return downPaymentAmount + (monthlyPayment * calcMonths);
  }, [downPaymentAmount, monthlyPayment, calcMonths]);

  const filteredDeals = useMemo(() => {
    return INSTALLMENT_DEALS_DATA.filter((deal) => {
      const matchesSearch = 
        !searchQuery ||
        deal.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.locationFa.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || deal.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.phone) return;
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedDealForApply(null);
      setApplyForm({ fullName: '', phone: '', nationalCode: '', hasSayadCheck: true });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>تالار معاملات اقساطی پیوندساخت</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              خرید اعتباری و اقساطی مسکن، میلگرد و مصالح ساختمانی
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              تامین مستقیم نقدینگی پروژه‌های عمرانی بدون معطلی در بانک‌ها، با ارائه چک صیادی بنفش و تضامین ساختمانی معتبر.
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">چک صیادی بنفش</div>
                <div className="text-[10px] text-emerald-700 font-semibold">استعلام آنلاین وضعیت سفید</div>
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <Percent className="w-5 h-5 text-slate-700 shrink-0" />
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">اقساط کارمزد صفر</div>
                <div className="text-[10px] text-slate-500 font-semibold">ویژه خرید مستقیم از کارخانجات</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Installment Calculator Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">محاسبه‌گر پیشرفته اقساط و پیش‌پرداخت</h2>
              <span className="text-[11px] text-slate-500">طرح پرداخت مورد نظر خود را شبیه‌سازی کنید</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            شبیه‌ساز آنلاین
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Section (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Total Price */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>ارزش کل معامله (تومان)</span>
                <span className="text-emerald-700 font-black">{calcTotalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <input
                type="range"
                min="100000000"
                max="10000000000"
                step="50000000"
                value={calcTotalAmount}
                onChange={(e) => setCalcTotalAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>۱۰۰ میلیون تومان</span>
                <span>۵ میلیارد</span>
                <span>۱۰ میلیارد تومان</span>
              </div>
            </div>

            {/* Down payment percent */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>درصد پیش‌پرداخت نقدی</span>
                <span className="text-emerald-700 font-black">{calcDownPaymentPercent}٪ ({downPaymentAmount.toLocaleString('fa-IR')} تومان)</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setCalcDownPaymentPercent(pct)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      calcDownPaymentPercent === pct
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {pct} درصد
                  </button>
                ))}
              </div>
            </div>

            {/* Months */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>مدت بازپرداخت اقساط</span>
                <span className="text-emerald-700 font-black">{calcMonths} ماهه</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[6, 12, 24, 36].map((m) => (
                  <button
                    key={m}
                    onClick={() => setCalcMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      calcMonths === m
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {m} ماه
                  </button>
                ))}
              </div>
            </div>

            {/* Annual interest rate */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>نرخ کارمزد سالیانه</span>
                <span className="text-emerald-700 font-black">{calcAnnualRate === 0 ? 'بدون کارمزد (۰٪)' : `${calcAnnualRate} درصد`}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 0, label: '۰٪ (طرح کارخانجات)' },
                  { rate: 12, label: '۱۲٪ (طرح بانکی)' },
                  { rate: 18, label: '۱۸٪ (طرح اعتباری)' }
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => setCalcAnnualRate(item.rate)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer truncate ${
                      calcAnnualRate === item.rate
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900 text-white p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs text-emerald-400 font-bold mb-1">نتیجه محاسبه اقساط</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {monthlyPayment.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-400">تومان / ماه</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">مبلغ هر قسط ماهیانه با سررسید چک‌های صیادی</p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>پیش‌پرداخت نقد:</span>
                <span className="font-bold text-white">{downPaymentAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>مبلغ تسهیلات اعتباری:</span>
                <span className="font-bold text-white">{loanPrincipal.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>تعداد چک‌های صادره:</span>
                <span className="font-bold text-white">{calcMonths} فقره صیادی</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                <span>مجموع بازپرداخت:</span>
                <span>{totalRepayment.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDealForApply(INSTALLMENT_DEALS_DATA[0]);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>درخواست بررسی مدارک و گشایش پرونده</span>
            </button>
          </div>
        </div>
      </div>

      {/* Catalog of Installment Deals */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">طرح‌های اقساطی فعال بازار</h2>
            <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
              {filteredDeals.length} مورد
            </span>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === 'all' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              همه طرح‌ها
            </button>
            <button
              onClick={() => setSelectedType('property')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === 'property' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              املاک اقساطی
            </button>
            <button
              onClick={() => setSelectedType('material')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === 'material' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مصالح و میلگرد اقساطی
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDeals.map((deal) => (
            <div 
              key={deal.id}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img 
                  src={deal.imageUrl} 
                  alt={deal.titleFa} 
                  className="w-full sm:w-36 h-28 object-cover rounded-2xl bg-slate-100 shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {deal.typeFa}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {deal.locationFa}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {deal.titleFa}
                  </h3>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {deal.featuresFa.map((f, i) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Installment details grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">پیش‌پرداخت</div>
                  <div className="font-bold text-slate-900 mt-0.5">{deal.minDownPaymentPercent}٪ نقد</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">دوره اقساط</div>
                  <div className="font-bold text-slate-900 mt-0.5">{deal.maxInstallmentMonths} ماهه</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">قسط ماهیانه</div>
                  <div className="font-bold text-emerald-600 mt-0.5">{(deal.monthlyPaymentToman / 1_000_000).toFixed(1)} م تومان</div>
                </div>
              </div>

              {/* Bottom Guarantee requirement & CTA */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-xs">{deal.guaranteeRequirementFa}</span>
                </div>

                <button
                  onClick={() => setSelectedDealForApply(deal)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  ثبت نام اقساط
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedDealForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">فرم درخواست خرید اقساطی</h3>
                  <span className="text-[11px] text-slate-500">{selectedDealForApply.titleFa}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDealForApply(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">درخواست خرید اقساطی ثبت شد</h4>
                <p className="text-xs text-slate-500">
                  کارشناس اعتبارسنجی صیادی ظرف ۱ ساعت کاری جهت دریافت تصاویر برگه چک با شما تماس می‌گیرد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">نام و نام خانوادگی خریدار / متعهد</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علیرضا محمدی"
                    value={applyForm.fullName}
                    onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">شماره همراه فعال (به نام صاحب چک)</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">کد ملی ده‌رقمی صاحب دسته‌چک</label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸"
                    value={applyForm.nationalCode}
                    onChange={(e) => setApplyForm({ ...applyForm, nationalCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <input
                    type="checkbox"
                    id="hasCheck"
                    checked={applyForm.hasSayadCheck}
                    onChange={(e) => setApplyForm({ ...applyForm, hasSayadCheck: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                  />
                  <label htmlFor="hasCheck" className="text-[11px] text-emerald-900 font-semibold cursor-pointer">
                    دارای دسته‌چک صیادی بنفش با رتبه اعتباری بدون برگشتی در بانک مرکزی می‌باشم.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>تایید و ارسال برای استعلام صیادی</span>
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
