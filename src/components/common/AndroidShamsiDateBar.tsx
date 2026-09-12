import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sun, Sparkles } from 'lucide-react';
import { getPersianCurrentDate, toPersianDigits } from '../../utils/persianUtils';

export const AndroidShamsiDateBar: React.FC = () => {
  const [shamsiData, setShamsiData] = useState(getPersianCurrentDate());
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = toPersianDigits(String(now.getHours()).padStart(2, '0'));
      const minutes = toPersianDigits(String(now.getMinutes()).padStart(2, '0'));
      const seconds = toPersianDigits(String(now.getSeconds()).padStart(2, '0'));
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      setShamsiData(getPersianCurrentDate());
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs">
      {/* Shamsi Calendar Badge - Android Material Pill */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
          <Calendar className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="text-emerald-700 font-black">{shamsiData.weekday}</span>
          <span>{shamsiData.day}</span>
          <span>{shamsiData.month}</span>
          <span className="text-slate-500 font-medium">{shamsiData.year}</span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500 font-medium border border-slate-200/60">
          <Sun className="w-3 h-3 text-amber-500" />
          گاه‌شمار هجری خورشیدی
        </span>
      </div>

      {/* Live Persian Clock */}
      <div className="flex items-center gap-1.5 text-slate-700 font-mono font-bold bg-slate-100/90 px-2.5 py-1 rounded-xl border border-slate-200/70">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span className="tracking-wider">{currentTime || shamsiData.time}</span>
      </div>
    </div>
  );
};
