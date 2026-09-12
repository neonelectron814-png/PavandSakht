import React, { useState } from 'react';
import { MEGA_SUPPLIERS } from '../data/mockData';
import { MegaSupplier } from '../types';
import { 
  Factory, 
  Mountain, 
  Truck, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  FileSpreadsheet, 
  CheckCircle2, 
  Phone, 
  Send,
  Boxes,
  Layers
} from 'lucide-react';

export const IndustrialSuppliersView: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'mega_factory' | 'mining'>('all');
  const [selectedSupplierForRfq, setSelectedSupplierForRfq] = useState<MegaSupplier | null>(null);
  const [orderTons, setOrderTons] = useState<number>(50);

  const filtered = MEGA_SUPPLIERS.filter((s) => {
    if (filterType === 'all') return true;
    return s.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Factory className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                کارخانجات مادر، مجتمع‌های فولادی و معادن سنگ
              </h1>
              <p className="text-xs text-slate-500">
                خرید مستقیم بدون واسطه با قیمت درب کارخانه، صدور فاکتور رسمی سامانه مودیان و بارگیری تریلی کفی
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            همه تامین‌کنندگان
          </button>
          <button
            onClick={() => setFilterType('mega_factory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              filterType === 'mega_factory'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            کارخانجات فولاد و سیمان
          </button>
          <button
            onClick={() => setFilterType('mining')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              filterType === 'mining'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            معادن سنگ و استخراج
          </button>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((supplier) => {
          const isUp = supplier.dailyPriceChangePercent >= 0;

          return (
            <div
              key={supplier.id}
              className="card-3d-hover glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={supplier.logo}
                      alt={supplier.companyFa}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{supplier.companyFa}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                          {supplier.type === 'mining' ? 'معدن مستقیم' : 'مجتمع کارخانه‌ای'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{supplier.cityFa}</span>
                    </div>
                  </div>

                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 block">نوسان روزانه:</span>
                    <span
                      className={`text-xs font-bold flex items-center justify-end gap-0.5 ${
                        isUp ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{Math.abs(supplier.dailyPriceChangePercent)}٪</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">سبد محصولات اصلی:</span>
                    <strong className="text-slate-800">{supplier.productCategoryFa}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">ظرفیت تولید سالیانه:</span>
                    <strong className="text-slate-800 font-mono">{supplier.capacityMetricTons}</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">حداقل توناژ جهت سفارش مستقیم:</span>
                    <strong className="text-indigo-700 font-mono">{supplier.minOrderTons} تن</strong>
                  </div>
                </div>
              </div>

              {/* Pricing & RFQ footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">نرخ پایه درب کارخانه:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {supplier.unitPriceToman.toLocaleString('fa-IR')}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      تومان / {supplier.unit === 'kg' ? 'کیلوگرم' : supplier.unit === 'sqm' ? 'مترمربع' : 'کیسه ۵۰ کیلویی'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSupplierForRfq(supplier)}
                    className="btn-3d-navy px-3.5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>استعلام قیمت رسمی و پیش‌فاکتور</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RFQ Quotation Modal */}
      {selectedSupplierForRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                درخواست پیش‌فاکتور مستقیم از {selectedSupplierForRfq.companyFa}
              </h3>
              <button
                onClick={() => setSelectedSupplierForRfq(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  میزان توناژ مورد نیاز (حداقل {selectedSupplierForRfq.minOrderTons} تن):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={selectedSupplierForRfq.minOrderTons}
                    value={orderTons}
                    onChange={(e) => setOrderTons(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-left focus:outline-hidden"
                  />
                  <span className="text-slate-600 font-bold">تن</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">محل تحویل و تخلیه بار:</label>
                <input
                  type="text"
                  defaultValue="تهران، پروژه ساختمانی منطقه ۱ (نیاوران)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              {/* Estimate calculation */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 block">برآورد اولیه هزینه تامین بدون کرایه حمل:</span>
                <span className="text-sm font-black text-emerald-700 font-mono">
                  {((orderTons * 1000 * selectedSupplierForRfq.unitPriceToman) / 1_000_000_000).toFixed(2)} میلیارد تومان
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  شامل مالیات بر ارزش افزوده و ثبت در کارتابل سامانه جامع تجارت
                </span>
              </div>

              <button
                onClick={() => {
                  alert('درخواست پیش‌فاکتور رسمی شما ثبت شد و حداکثر تا ۲ ساعت دیگر در پنل کاربری صادر خواهد شد.');
                  setSelectedSupplierForRfq(null);
                }}
                className="w-full btn-3d-emerald py-2.5 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md"
              >
                ارسال استعلام رسمی و بررسی ظرفیت بارگیری
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
