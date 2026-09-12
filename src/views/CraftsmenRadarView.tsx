import React, { useState } from 'react';
import { LOCAL_CRAFTSMEN } from '../data/mockData';
import { LocalCraftsman } from '../types';
import { 
  MapPin, 
  Phone, 
  Star, 
  Navigation, 
  CheckCircle2, 
  SlidersHorizontal,
  Send
} from 'lucide-react';

export const CraftsmenRadarView: React.FC = () => {
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(3.5);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const filteredCraftsmen = LOCAL_CRAFTSMEN.filter((c) => {
    const matchRadius = c.distanceKm <= maxRadiusKm;
    const matchRole = selectedRole === 'all' || c.roleFa.includes(selectedRole);
    return matchRadius && matchRole;
  });

  const handleDispatch = (c: LocalCraftsman) => {
    setDispatchedId(c.id);
    setTimeout(() => {
      alert(`درخواست اعزام برای «${c.nameFa}» ثبت شد.`);
      setDispatchedId(null);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Clean Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            استادکاران و اکیپ‌های اجرایی
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            جستجوی نزدیک‌ترین اکیپ‌های ساختمانی تایید شده بر اساس فاصله
          </p>
        </div>

        {/* Distance Filter Slider in Header */}
        <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            شعاع: <span className="text-emerald-700 font-bold font-mono">{maxRadiusKm}</span> کیلومتر
          </span>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.5"
            value={maxRadiusKm}
            onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
            className="w-28 sm:w-36 accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'همه رسته‌ها' },
          { id: 'سنگ', label: 'سنگ‌کار و اسلب' },
          { id: 'بتن', label: 'بتن‌ریزی' },
          { id: 'گچ', label: 'گچ‌کاری و کناف' },
          { id: 'شیشه', label: 'شیشه و نما' },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedRole(chip.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
              selectedRole === chip.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Clean Craftsmen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCraftsmen.map((craftsman) => {
          const isDispatched = dispatchedId === craftsman.id;

          return (
            <div
              key={craftsman.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={craftsman.avatarUrl}
                      alt={craftsman.nameFa}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{craftsman.nameFa}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                          تایید صنف
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{craftsman.roleFa}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{craftsman.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>فاصله: <strong className="font-mono text-slate-700">{craftsman.distanceKm}</strong> کیلومتر</span>
                  </div>

                  <div>
                    نرخ: <strong className="font-mono text-slate-800">{craftsman.hourlyRateToman.toLocaleString('fa-IR')}</strong> ت/ساعت
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                <a
                  href={`tel:${craftsman.phone}`}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>تماس مستقیم</span>
                </a>

                <button
                  onClick={() => handleDispatch(craftsman)}
                  disabled={isDispatched}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isDispatched ? 'ثبت شد' : 'درخواست اعزام'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
