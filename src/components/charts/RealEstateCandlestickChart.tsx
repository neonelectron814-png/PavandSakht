import React, { useState } from 'react';
import { CandlestickData } from '../../types';
import { BarChart3, Clock, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { TimeframeKey, TIMEFRAME_OPTIONS } from '../../data/timeframeChartData';
import { toPersianDigits, formatRial } from '../../utils/persianUtils';

interface RealEstateCandlestickChartProps {
  assetName?: string;
  unitFa?: string;
  candles?: CandlestickData[];
  currentPrice?: number;
  lastTickDir?: 'up' | 'down' | 'neutral';
  isLive?: boolean;
  timeframe?: TimeframeKey;
  onTimeframeChange?: (tf: TimeframeKey) => void;
}

export const RealEstateCandlestickChart: React.FC<RealEstateCandlestickChartProps> = ({
  assetName = 'میلگرد ذوب‌آهن اصفهان (A3)',
  unitFa = 'ریال/کیلوگرم',
  candles = [],
  currentPrice = 328000,
  lastTickDir = 'neutral',
  isLive = true,
  timeframe = 'day',
  onTimeframeChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rawData = candles;

  // SVG dimensions with wide padding for transparent Rial numbers
  const width = 800;
  const height = 300;
  const priceHeight = 180;
  const volumeHeight = 50;
  const paddingLeft = 100; // Wide enough for 1,950,000,000 ریال
  const paddingRight = 35;
  const paddingY = 22;

  // Min and max calculation
  const allPrices = rawData.flatMap((d) => [d.open, d.high, d.low, d.close]);
  const minPrice = allPrices.length ? Math.min(...allPrices) * 0.99 : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) * 1.01 : 100;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = rawData.length ? Math.max(...rawData.map((d) => d.volume)) : 100;

  // Calculate high, low, average of the period
  const periodHigh = allPrices.length ? Math.max(...allPrices) : currentPrice;
  const periodLow = allPrices.length ? Math.min(...allPrices) : currentPrice;
  const periodAvg = allPrices.length ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : currentPrice;

  // Compute positions
  const plotWidth = width - paddingLeft - paddingRight;
  const candleStep = rawData.length ? plotWidth / rawData.length : 1;
  const candleWidth = Math.max(12, Math.min(32, candleStep * 0.46));

  const getY = (val: number) => {
    return paddingY + priceHeight - ((val - minPrice) / priceRange) * priceHeight;
  };

  const getVolY = (vol: number) => {
    const volTop = paddingY + priceHeight + 20;
    return volTop + volumeHeight - (vol / (maxVolume || 1)) * volumeHeight;
  };

  const hoveredData: CandlestickData | null = hoveredIndex !== null && rawData[hoveredIndex] ? rawData[hoveredIndex] : null;

  return (
    <div id="real-estate-candlestick-card" className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-4">
      {/* Header & Asset Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">
                نمودار شمعی ژاپنی (Candlestick) — {assetName}
              </h3>
              {isLive && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  زنده (ریال ایران)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              واحد مبنا: <strong className="text-slate-800 font-bold">{unitFa}</strong> | مبنای معاملات رسمی کشوری
            </p>
          </div>
        </div>

        {/* Timeframe Quick Pill & Live Ticker Box */}
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
                      ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  title={`${tf.badgeFa} (${tf.subLabelFa})`}
                >
                  {tf.labelFa}
                </button>
              );
            })}
          </div>

          {/* Current Live Price Ticker in Rial */}
          <div className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all duration-300 ${
            lastTickDir === 'up'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : lastTickDir === 'down'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div>
              <span className="text-[10px] text-slate-400 block">آخرین نرخ لحظه‌ای:</span>
              <span className="text-sm font-black tracking-tight">
                {formatRial(currentPrice)} <span className="text-[10px] text-slate-500 font-normal">({unitFa})</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Price Range & Statistics Banner (رنج قیمتی کاملاً شفاف) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">کف قیمت بازه:</span>
          <span className="font-bold text-rose-600 text-xs sm:text-sm">
            {formatRial(periodLow)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">سقف قیمت بازه:</span>
          <span className="font-bold text-emerald-600 text-xs sm:text-sm">
            {formatRial(periodHigh)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">میانگین موزون دوره:</span>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">
            {formatRial(periodAvg)}
          </span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
          <span className="text-[10px] text-slate-400 block">دامنه نوسان بازه:</span>
          <span className="font-bold text-indigo-700 text-xs sm:text-sm">
            {formatRial(periodHigh - periodLow)}
          </span>
        </div>
      </div>

      {/* Quick OHLC Ticker Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200 text-xs">
        {hoveredData ? (
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-slate-500">مقطع: <strong className="text-slate-900">{hoveredData.time}</strong></span>
            <span className="text-slate-600">آغاز: <strong className="text-slate-800">{formatRial(hoveredData.open)}</strong></span>
            <span className="text-emerald-600">بیشترین: <strong>{formatRial(hoveredData.high)}</strong></span>
            <span className="text-rose-600">کمترین: <strong>{formatRial(hoveredData.low)}</strong></span>
            <span className={hoveredData.close >= hoveredData.open ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
              پایانی: <strong>{formatRial(hoveredData.close)}</strong>
            </span>
            <span className="text-slate-500">حجم: <strong>{toPersianDigits(hoveredData.volume.toLocaleString('en-US'))} واحد</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-500">بازه انتخابی: <strong className="text-slate-800">{TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa}</strong></span>
            <span className="text-emerald-700 font-bold">نرخ بلادرنگ: {formatRial(currentPrice)} ({unitFa})</span>
            <span className="text-slate-400 hidden sm:inline">• نشانگر ماوس را برای مشاهده دقیق OHLC روی شمع‌ها قرار دهید</span>
          </div>
        )}
      </div>

      {/* Candlestick SVG Container */}
      <div className="relative w-full h-80 rounded-2xl bg-white border border-slate-200/80 p-2 overflow-hidden shadow-inner">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Price grid lines and Rial labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const y = paddingY + r * priceHeight;
            const priceVal = Math.round(maxPrice - r * priceRange);
            return (
              <g key={r}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={r === 0 || r === 1 ? '0' : '3 3'}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="#64748B"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="'Vazirmatn', sans-serif"
                  fontWeight="600"
                >
                  {formatRial(priceVal)}
                </text>
              </g>
            );
          })}

          {/* Real-time horizontal dotted line */}
          {(() => {
            const liveY = getY(currentPrice);
            return (
              <g>
                <line
                  x1={paddingLeft}
                  y1={liveY}
                  x2={width - paddingRight}
                  y2={liveY}
                  stroke={lastTickDir === 'down' ? '#F43F5E' : '#10B981'}
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle
                  cx={width - paddingRight - 4}
                  cy={liveY}
                  r="3.5"
                  fill={lastTickDir === 'down' ? '#F43F5E' : '#10B981'}
                  className={isLive ? 'animate-pulse' : ''}
                />
              </g>
            );
          })()}

          {/* Volume separator line */}
          <line
            x1={paddingLeft}
            y1={paddingY + priceHeight + 12}
            x2={width - paddingRight}
            y2={paddingY + priceHeight + 12}
            stroke="#E2E8F0"
            strokeDasharray="2 2"
          />
          <text
            x={paddingLeft}
            y={paddingY + priceHeight + 20}
            fill="#94A3B8"
            fontSize="10"
            fontFamily="'Vazirmatn', sans-serif"
          >
            حجم معاملات ({unitFa})
          </text>

          {/* Render Candlesticks and Volume Bars */}
          {rawData.map((d, i) => {
            const centerX = paddingLeft + i * candleStep + candleStep / 2;
            const isBullish = d.close >= d.open;
            const candleColor = isBullish ? '#10B981' : '#F43F5E';
            const bodyTop = getY(Math.max(d.open, d.close));
            const bodyBottom = getY(Math.min(d.open, d.close));
            const bodyHeight = Math.max(2, bodyBottom - bodyTop);

            const highY = getY(d.high);
            const lowY = getY(d.low);

            // Volume bar calculations
            const volY = getVolY(d.volume);
            const volHeight = paddingY + priceHeight + 20 + volumeHeight - volY;

            const isHovered = hoveredIndex === i;

            return (
              <g
                key={`${d.time}-${i}`}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Upper Wick */}
                <line
                  x1={centerX}
                  y1={highY}
                  x2={centerX}
                  y2={bodyTop}
                  stroke={candleColor}
                  strokeWidth="1.5"
                />

                {/* Lower Wick */}
                <line
                  x1={centerX}
                  y1={bodyBottom}
                  x2={centerX}
                  y2={lowY}
                  stroke={candleColor}
                  strokeWidth="1.5"
                />

                {/* Candle Body */}
                <rect
                  x={centerX - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={isBullish ? '#10B981' : '#F43F5E'}
                  rx="2"
                  className={isHovered ? 'filter brightness-110 stroke-1 stroke-slate-900' : ''}
                />

                {/* Volume Bar */}
                <rect
                  x={centerX - candleWidth / 2}
                  y={volY}
                  width={candleWidth}
                  height={Math.max(2, volHeight)}
                  fill={isBullish ? '#A7F3D0' : '#FECDD3'}
                  opacity={isHovered ? 0.95 : 0.65}
                  rx="1"
                />

                {/* X-Axis Time Label */}
                <text
                  x={centerX}
                  y={height - 4}
                  fill={isHovered ? '#0F172A' : '#64748B'}
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '500'}
                  textAnchor="middle"
                  fontFamily="'Vazirmatn', sans-serif"
                >
                  {d.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>تمام مبالغ و دامنه نوسان به ریال رسمی جمهوری اسلامی ایران محاسبه شده است.</span>
        </div>
        <span className="text-emerald-700 font-bold">بازه زمانی: {TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa} ({TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.subLabelFa})</span>
      </div>
    </div>
  );
};
