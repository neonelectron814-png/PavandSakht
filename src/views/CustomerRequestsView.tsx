import React, { useState, useMemo } from 'react';
import { CUSTOMER_DEMANDS_DATA } from '../data/mockData';
import { CustomerDemandItem } from '../types';
import { 
  ShoppingBag, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Users, 
  Building, 
  Truck, 
  ArrowRight, 
  X, 
  Send,
  Zap,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface CustomerRequestsViewProps {
  searchQuery?: string;
}

export const CustomerRequestsView: React.FC<CustomerRequestsViewProps> = ({ searchQuery = '' }) => {
  const [demands, setDemands] = useState<CustomerDemandItem[]>(CUSTOMER_DEMANDS_DATA);
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [selectedDemandForBid, setSelectedDemandForBid] = useState<CustomerDemandItem | null>(null);
  const [bidSuccess, setBidSuccess] = useState(false);

  // New Demand Form State
  const [newDemand, setNewDemand] = useState({
    titleFa: '',
    materialType: 'cement' as CustomerDemandItem['materialType'],
    requiredVolume: '',
    targetBudgetToman: '',
    destinationCityFa: '',
    urgentLevel: 'immediate' as CustomerDemandItem['urgentLevel']
  });

  // Bid form
  const [bidForm, setBidForm] = useState({
    supplierName: '',
    unitPriceToman: '',
    deliveryEstimateDays: 2,
    phone: ''
  });

  const materialFilters = [
    { id: 'all', label: 'همه تقاضاها' },
    { id: 'cement', label: 'سیمان' },
    { id: 'rebar', label: 'میلگرد و فولاد' },
    { id: 'stone', label: 'سنگ ساختمانی' },
    { id: 'pipe', label: 'لوله و اتصالات' }
  ];

  const filteredDemands = useMemo(() => {
    return demands.filter((d) => {
      const matchesSearch = 
        !searchQuery ||
        d.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.destinationCityFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.requiredVolume.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMat = selectedMaterialFilter === 'all' || d.materialType === selectedMaterialFilter;

      return matchesSearch && matchesMat;
    });
  }, [demands, searchQuery, selectedMaterialFilter]);

  const handleCreateDemand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDemand.titleFa || !newDemand.requiredVolume) return;

    const createdItem: CustomerDemandItem = {
      id: `dem-${Date.now()}`,
      customerNameMasked: 'خریدار احراز هویت شده',
      materialType: newDemand.materialType,
      materialTypeFa: newDemand.materialType === 'cement' ? 'سیمان' : newDemand.materialType === 'rebar' ? 'میلگرد' : 'مصالح',
      titleFa: newDemand.titleFa,
      requiredVolume: newDemand.requiredVolume,
      targetBudgetToman: Number(newDemand.targetBudgetToman) || 50_000_000,
      destinationCityFa: newDemand.destinationCityFa || 'تهران',
      urgentLevel: newDemand.urgentLevel,
      urgentLevelFa: newDemand.urgentLevel === 'immediate' ? 'فوری (حداکثر ۲۴ ساعت)' : 'ظرف ۳ روز آینده',
      datePosted: 'هم‌اکنون',
      matchedSuppliersCount: 3, // auto-matched by Akana Smart Matcher!
      status: 'matched',
      supplierQuotes: [
        { supplierName: 'تامین‌کننده هوشمند آکانا (انبار مرکزی)', unitPriceToman: 790_000, deliveryEstimateDays: 1, phone: '۰۲۱۸۸۹۹۰۰۱۱' }
      ]
    };

    setDemands([createdItem, ...demands]);
    setIsPostModalOpen(false);
    setNewDemand({
      titleFa: '',
      materialType: 'cement',
      requiredVolume: '',
      targetBudgetToman: '',
      destinationCityFa: '',
      urgentLevel: 'immediate'
    });
  };

  const handleSendBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidForm.supplierName || !bidForm.phone || !selectedDemandForBid) return;

    const updated = demands.map((item) => {
      if (item.id === selectedDemandForBid.id) {
        return {
          ...item,
          matchedSuppliersCount: item.matchedSuppliersCount + 1,
          supplierQuotes: [
            ...item.supplierQuotes,
            {
              supplierName: bidForm.supplierName,
              unitPriceToman: Number(bidForm.unitPriceToman) || 800_000,
              deliveryEstimateDays: bidForm.deliveryEstimateDays,
              phone: bidForm.phone
            }
          ]
        };
      }
      return item;
    });

    setDemands(updated);
    setBidSuccess(true);
    setTimeout(() => {
      setBidSuccess(false);
      setSelectedDemandForBid(null);
      setBidForm({ supplierName: '', unitPriceToman: '', deliveryEstimateDays: 2, phone: '' });
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>سامانه تطبیق هوشمند تقاضا و تامین (Smart Order Matcher)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              تابلوی نیازمندی‌های فوری کارفرمایان و پیمانکاران ساختمانی
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              خریداران حجم و نوع مصالح مورد نیاز خود را ثبت کرده و بلافاصله به انبارداران، تولیدکنندگان و دفاتر فروش متصل می‌شوند.
            </p>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ثبت سفارش و تقاضای مصالح</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {materialFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedMaterialFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedMaterialFilter === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demands List */}
      <div className="space-y-4">
        {filteredDemands.map((demand) => (
          <div 
            key={demand.id}
            className="rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                    {demand.materialTypeFa}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{demand.urgentLevelFa}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ثبت شده: {demand.datePosted}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {demand.titleFa}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{demand.matchedSuppliersCount} تامین‌کننده متصل</span>
                </div>
                <button
                  onClick={() => setSelectedDemandForBid(demand)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  ارسال پیشنهاد قیمت
                </button>
              </div>
            </div>

            {/* Details row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">حجم درخواستی:</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{demand.requiredVolume}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">بودجه هدف / حداکثر:</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{demand.targetBudgetToman.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">محل تخلیه و پروژه:</span>
                <span className="font-bold text-slate-900 mt-0.5 block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{demand.destinationCityFa}</span>
                </span>
              </div>
            </div>

            {/* Matched Quotes Accordion/Listing */}
            {demand.supplierQuotes && demand.supplierQuotes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>پیشنهادات رسیده از سوی تولیدکنندگان و تامین‌کنندگان:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {demand.supplierQuotes.map((quote, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{quote.supplierName}</div>
                        <div className="text-[10px] text-slate-500">
                          زمان تحویل: <span className="text-emerald-700 font-semibold">{quote.deliveryEstimateDays} روزه</span>
                        </div>
                      </div>
                      <div className="text-left flex items-center gap-2">
                        <div className="font-mono font-bold text-slate-900">
                          {quote.unitPriceToman.toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-slate-400">تومان</span>
                        </div>
                        <a
                          href={`tel:${quote.phone}`}
                          className="p-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="تماس با تامین‌کننده"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post New Demand Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">ثبت نیازمندی فوری مصالح</h3>
                  <span className="text-[11px] text-slate-500">سفارش خود را ثبت کنید تا تامین‌کنندگان با شما تماس بگیرند</span>
                </div>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDemand} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">نوع متریال درخواستی</label>
                <select
                  value={newDemand.materialType}
                  onChange={(e) => setNewDemand({ ...newDemand, materialType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="cement">سیمان پرتلند (فله یا پاکتی)</option>
                  <option value="rebar">میلگرد آجدار یا کلاف</option>
                  <option value="stone">سنگ ساختمانی و نما</option>
                  <option value="pipe">لوله و تاسیسات</option>
                  <option value="brick">آجر، سفال و بلوک</option>
                  <option value="equipment">تجهیزات و ابزارآلات کارگاهی</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">عنوان کامل درخواست</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ۱۰۰۰ شاخه میلگرد ۱۶ آجدار A3 اصفهان"
                  value={newDemand.titleFa}
                  onChange={(e) => setNewDemand({ ...newDemand, titleFa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">میزان حجم یا تناژ دقیق</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ۳۰۰ تن فله"
                    value={newDemand.requiredVolume}
                    onChange={(e) => setNewDemand({ ...newDemand, requiredVolume: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">بودجه تقریبی خریدار (تومان)</label>
                  <input
                    type="number"
                    placeholder="مثال: ۲۵۰۰۰۰۰۰۰"
                    value={newDemand.targetBudgetToman}
                    onChange={(e) => setNewDemand({ ...newDemand, targetBudgetToman: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">شهر و نشانی پای پروژه</label>
                  <input
                    type="text"
                    placeholder="مثال: تهران، پاسداران"
                    value={newDemand.destinationCityFa}
                    onChange={(e) => setNewDemand({ ...newDemand, destinationCityFa: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">اولویت نیاز</label>
                  <select
                    value={newDemand.urgentLevel}
                    onChange={(e) => setNewDemand({ ...newDemand, urgentLevel: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="immediate">فوری (تحویل ۲۴ ساعت)</option>
                    <option value="within_3_days">ظرف ۳ روز آینده</option>
                    <option value="standard">عادی (هفته آینده)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>انتشار تقاضا و تطبیق هوشمند در شبکه آکانا</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Bid Modal */}
      {selectedDemandForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">پیشنهاد تامین مصالح به خریدار</h3>
                  <span className="text-[11px] text-slate-500">{selectedDemandForBid.titleFa}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDemandForBid(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bidSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">پیشنهاد شما با موفقیت به خریدار ارسال شد</h4>
                <p className="text-xs text-slate-500">
                  خریدار اعلان پیامکی دریافت کرد و می‌تواند فوراً از طریق شماره ثبت شده معامله را نهایی کند.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendBid} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">نام شرکت، کارخانه یا انبار فروش</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: صنایع فولاد گستر البرز"
                    value={bidForm.supplierName}
                    onChange={(e) => setBidForm({ ...bidForm, supplierName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">قیمت پیشنهادی هر واحد / تن (تومان)</label>
                  <input
                    type="number"
                    required
                    placeholder="مثال: ۳۲۸۰۰"
                    value={bidForm.unitPriceToman}
                    onChange={(e) => setBidForm({ ...bidForm, unitPriceToman: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">تخمین زمان تحویل (روز)</label>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={bidForm.deliveryEstimateDays}
                      onChange={(e) => setBidForm({ ...bidForm, deliveryEstimateDays: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">شماره تماس مستقیم</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={bidForm.phone}
                      onChange={(e) => setBidForm({ ...bidForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-hidden font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>ثبت پیشنهاد تامین</span>
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
