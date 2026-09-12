import React from 'react';
import { TrendingUp, Clock, Activity, ShieldCheck } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { TimeframeKey, TIMEFRAME_OPTIONS } from '../../data/timeframeChartData';
import { toPersianDigits, formatRial } from '../../utils/persianUtils';

interface MaterialTrendChartProps {
  assetName?: string;
  unitFa?: string;
  trendData?: { time: string; price: number; volume: number }[];
  currentPrice?: number;
  lastTickDir?: 'up' | 'down' | 'neutral';
  isLive?: boolean;
  timeframe?: TimeframeKey;
  onTimeframeChange?: (tf: TimeframeKey) => void;
}

export const MaterialTrendChart: React.FC<MaterialTrendChartProps> = ({
  assetName = 'میلگرد ذوب‌آهن اصفهان (A3)',
  unitFa = 'ریال/کیلوگرم',
  trendData = [],
  currentPrice = 328000,
  lastTickDir = 'neutral',
  isLive = true,
  timeframe = 'day',
  onTimeframeChange,
}) => {
  const data = trendData;

  const firstPrice = data.length > 0 ? data[0].price : currentPrice;
  const priceChangePercent = firstPrice > 0 ? (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(1) : '0.0';
  const isPositive = Number(priceChangePercent) >= 0;

  // Min, Max, Average for the Period
  const allPrices = data.map((d) => d.price);
  const periodHigh = allPrices.length ? Math.max(...allPrices) : currentPrice;
  const periodLow = allPrices.length ? Math.min(...allPrices) : currentPrice;
  const periodAvg = allPrices.length ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : currentPrice;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm text-white px-3.5 py-2.5 rounded-2xl text-xs shadow-xl border border-slate-700 font-sans">
          <div className="font-bold text-slate-300">مقطع: {label}</div>
          <div className="text-emerald-400 font-black mt-1 text-sm">
            {formatRial(payload[0].value)} ({unitFa})
          </div>
          {payload[0].payload?.volume && (
            <div className="text-[11px] text-slate-400 mt-1">
              حجم معاملات: {toPersianDigits(payload[0].payload.volume.toLocaleString('en-US'))} واحد
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="material-trend-card" className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">
                نمودار خطی پیوسته (Line Chart) — {assetName}
              </h3>
              {isLive && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  زنده (ریال ایران)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              واحد مبنا: <strong className="text-slate-800 font-bold">{unitFa}</strong> | نمایش روند پیوسته قیمت در طول زمان
            </p>
          </div>
        </div>

        {/* Timeframe Quick Pills & Live Stat Box */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe Selector Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold px-1.5 hidden sm:flex">
              <Clock className="w-3.5 h-3.5" />
              <span>بازه:</span>
            </div>
            {TIMEFRAME_OPTIONS.map((tf) => {
              const isActive = timeframe === tf.key;
              return (
                <button
                  key={tf.key}
                  type="button"
                  onClick={() => onTimeframeChange?.(tf.key)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={`${tf.badgeFa} (${tf.subLabelFa})`}
                >
                  {tf.labelFa}
                </button>
              );
            })}
          </div>

          {/* Current Price in Rial and Percentage */}
          <div className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all duration-300 ${
            lastTickDir === 'up'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : lastTickDir === 'down'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div>
              <span className="text-[10px] text-slate-400 block">آخرین نرخ بازار:</span>
              <span className="text-sm font-black tracking-tight">
                {formatRial(currentPrice)} <span className="text-[10px] text-slate-500 font-normal">({unitFa})</span>
              </span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
              isPositive ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'
            }`}>
              {isPositive ? '+' : ''}{toPersianDigits(priceChangePercent)}٪
            </span>
          </div>
        </div>
      </div>

      {/* Transparent Price Range & Statistics Banner (رنج قیمتی کاملاً شفاف) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">کف نرخ دوره:</span>
          <span className="font-bold text-rose-600 text-xs sm:text-sm">
            {formatRial(periodLow)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">سقف نرخ دوره:</span>
          <span className="font-bold text-emerald-600 text-xs sm:text-sm">
            {formatRial(periodHigh)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">میانگین موزون:</span>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">
            {formatRial(periodAvg)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">دامنه نوسان:</span>
          <span className="font-bold text-emerald-700 text-xs sm:text-sm">
            {formatRial(periodHigh - periodLow)}
          </span>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-slate-700">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>بازه زمانی: <strong className="text-slate-900">{TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa} ({TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.subLabelFa})</strong></span>
        </div>
        <div className="text-[11px] text-slate-600">
          نرخ مبنای دوره: <strong className="text-slate-900">{formatRial(firstPrice)}</strong> | آخرین نرخ: <strong className="text-emerald-700">{formatRial(currentPrice)} ({unitFa})</strong>
        </div>
      </div>

      {/* Recharts Area / Line Chart Container */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="materialLiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'Vazirmatn', sans-serif" }} 
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: "'Vazirmatn', sans-serif" }} 
              domain={['auto', 'auto']} 
              orientation="right"
              tickFormatter={(val) => formatRial(val, false)}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentPrice}
              stroke="#10B981"
              strokeDasharray="4 2"
              label={{
                value: `لحظه‌ای: ${formatRial(currentPrice)}`,
                fill: '#059669',
                fontSize: 11,
                fontFamily: "'Vazirmatn', sans-serif",
                position: 'left'
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 1.5, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, fill: '#059669', strokeWidth: 2, stroke: '#FFFFFF' }}
              fillOpacity={1}
              fill="url(#materialLiveGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>تمام داده‌های قیمت و نمودار به صورت شفاف با واحد ریال ایران درج شده است.</span>
        </div>
        <span className="text-emerald-700 font-bold">بازه: {TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa}</span>
      </div>
    </div>
  );
};
