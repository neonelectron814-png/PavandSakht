import React from 'react';
import { TrendingUp, Clock, Activity } from 'lucide-react';
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
  unitFa = 'هزار ت/کیلو',
  trendData = [],
  currentPrice = 32.8,
  lastTickDir = 'neutral',
  isLive = true,
  timeframe = 'day',
  onTimeframeChange,
}) => {
  const data = trendData;

  const firstPrice = data.length > 0 ? data[0].price : currentPrice;
  const priceChangePercent = firstPrice > 0 ? (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(1) : '0.0';
  const isPositive = Number(priceChangePercent) >= 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-700">
          <div className="font-bold text-slate-300">مقطع: {label}</div>
          <div className="text-emerald-400 font-mono font-black mt-1 text-sm">
            {payload[0].value?.toLocaleString('fa-IR')} {unitFa}
          </div>
          {payload[0].payload?.volume && (
            <div className="text-[10px] text-slate-400 mt-0.5">
              حجم معاملات: {payload[0].payload.volume.toLocaleString('fa-IR')} واحد
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
              <h3 className="text-base font-bold text-slate-900">
                نمودار لاینی (Line Chart) — {assetName}
              </h3>
              {isLive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  زنده
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              واحد مبنا: <strong className="text-slate-800">{unitFa}</strong> | نمایش پیوسته روند قیمت با خط میانگین وزنی
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

          {/* Current Price and Stat */}
          <div className={`flex items-center gap-3 px-3 py-1.5 rounded-2xl border transition-all duration-300 ${
            lastTickDir === 'up'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : lastTickDir === 'down'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div>
              <span className="text-[10px] text-slate-400 block">آخرین نرخ بازار:</span>
              <span className="text-sm font-black font-mono">
                {currentPrice.toLocaleString('fa-IR')} <span className="text-[10px] font-normal">{unitFa}</span>
              </span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
              isPositive ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'
            }`}>
              {isPositive ? '+' : ''}{priceChangePercent}٪
            </span>
          </div>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>بازه زمانی فعال: <strong className="text-slate-800">{TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa} ({TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.subLabelFa})</strong></span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          نرخ مبنای دوره: <strong className="text-slate-800">{firstPrice.toLocaleString('fa-IR')}</strong> | آخرین نرخ: <strong className="text-emerald-700">{currentPrice.toLocaleString('fa-IR')} {unitFa}</strong>
        </div>
      </div>

      {/* Recharts Area / Line Chart Container */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="materialLiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 11 }} 
              domain={['auto', 'auto']} 
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentPrice}
              stroke="#10B981"
              strokeDasharray="4 2"
              label={{
                value: `لحظه‌ای: ${currentPrice.toLocaleString('fa-IR')}`,
                fill: '#059669',
                fontSize: 10,
                position: 'left'
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2.8}
              dot={{ r: 3.5, fill: '#10B981', strokeWidth: 1, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#059669', strokeWidth: 2, stroke: '#FFFFFF' }}
              fillOpacity={1}
              fill="url(#materialLiveGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
        <span>شاخص محاسبه: کشف قیمت لحظه‌ای در سامانه پیوندساخت</span>
        <span className="text-emerald-700 font-semibold">بازه زمانی: {TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa}</span>
      </div>
    </div>
  );
};
