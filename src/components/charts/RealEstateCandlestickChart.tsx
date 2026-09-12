import React, { useState } from 'react';
import { CandlestickData } from '../../types';
import { BarChart3, Clock } from 'lucide-react';
import { TimeframeKey, TIMEFRAME_OPTIONS } from '../../data/timeframeChartData';

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
  unitFa = 'هزار ت/کیلو',
  candles = [],
  currentPrice = 32.8,
  lastTickDir = 'neutral',
  isLive = true,
  timeframe = 'day',
  onTimeframeChange,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const rawData = candles;

  // SVG dimensions
  const width = 720;
  const height = 290;
  const priceHeight = 180;
  const volumeHeight = 55;
  const paddingX = 42;
  const paddingY = 20;

  // Min and max calculation
  const allPrices = rawData.flatMap((d) => [d.open, d.high, d.low, d.close]);
  const minPrice = allPrices.length ? Math.min(...allPrices) * 0.985 : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) * 1.015 : 100;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = rawData.length ? Math.max(...rawData.map((d) => d.volume)) : 100;

  // Compute positions
  const candleStep = rawData.length ? (width - paddingX * 2) / rawData.length : 1;
  const candleWidth = Math.max(10, Math.min(28, candleStep * 0.44));

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
              <h3 className="text-base font-bold text-slate-900">
                نمودار شمعی (Candlestick) — {assetName}
              </h3>
              {isLive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  زنده
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              واحد مبنا: <strong className="text-slate-800">{unitFa}</strong> | نمایش رفتار قیمت بر اساس تحلیل بازه زمانی
            </p>
          </div>
        </div>

        {/* Live Ticker Box & Timeframe Quick Pill */}
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

          {/* Current Live Price Ticker */}
          <div className={`flex items-center gap-3 px-3 py-1.5 rounded-2xl border transition-all duration-300 ${
            lastTickDir === 'up'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : lastTickDir === 'down'
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div>
              <span className="text-[10px] text-slate-400 block">آخرین نرخ زنده:</span>
              <span className="text-sm font-black font-mono">
                {currentPrice.toLocaleString('fa-IR')} <span className="text-[10px] font-normal">{unitFa}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick OHLC Ticker Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
        {hoveredData ? (
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="text-slate-500">مقطع: <strong className="text-slate-800">{hoveredData.time}</strong></span>
            <span className="text-slate-600">آغاز: <strong>{hoveredData.open}</strong></span>
            <span className="text-emerald-600">بیشترین: <strong>{hoveredData.high}</strong></span>
            <span className="text-rose-600">کمترین: <strong>{hoveredData.low}</strong></span>
            <span className={hoveredData.close >= hoveredData.open ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
              پایانی: <strong>{hoveredData.close}</strong>
            </span>
            <span className="text-slate-500">حجم: <strong>{hoveredData.volume.toLocaleString('fa-IR')} واحد</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400">بازه انتخابی: <strong className="text-slate-700">{TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa}</strong></span>
            <span className="text-emerald-700 font-bold font-mono">نرخ بلادرنگ: {currentPrice.toLocaleString('fa-IR')} {unitFa}</span>
            <span className="text-slate-400 hidden sm:inline">• نشانگر ماوس را برای جزئیات OHLC روی شمع‌ها حرکت دهید</span>
          </div>
        )}
      </div>

      {/* Candlestick SVG Container */}
      <div className="relative w-full h-72 rounded-2xl bg-white border border-slate-200/80 p-2 overflow-hidden shadow-inner">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Price grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const y = paddingY + r * priceHeight;
            const price = (maxPrice - r * priceRange).toFixed(1);
            return (
              <g key={r}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={r === 0 || r === 1 ? '0' : '3 3'}
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {price}
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
                  x1={paddingX}
                  y1={liveY}
                  x2={width - paddingX}
                  y2={liveY}
                  stroke={lastTickDir === 'down' ? '#F43F5E' : '#10B981'}
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle
                  cx={width - paddingX - 4}
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
            x1={paddingX}
            y1={paddingY + priceHeight + 12}
            x2={width - paddingX}
            y2={paddingY + priceHeight + 12}
            stroke="#E2E8F0"
            strokeDasharray="2 2"
          />
          <text
            x={paddingX}
            y={paddingY + priceHeight + 20}
            fill="#94A3B8"
            fontSize="9"
            fontFamily="sans-serif"
          >
            حجم معاملات ({unitFa})
          </text>

          {/* Render Candlesticks and Volume Bars */}
          {rawData.map((d, i) => {
            const centerX = paddingX + i * candleStep + candleStep / 2;
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
                {/* Crosshair column highlight */}
                {isHovered && (
                  <rect
                    x={centerX - candleStep / 2}
                    y={paddingY}
                    width={candleStep}
                    height={priceHeight + volumeHeight + 25}
                    fill="rgba(241, 245, 249, 0.7)"
                  />
                )}

                {/* High-Low Wick */}
                <line
                  x1={centerX}
                  y1={highY}
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
                  rx="1"
                  stroke={candleColor}
                  strokeWidth="1"
                />

                {/* Volume Bar */}
                <rect
                  x={centerX - candleWidth / 2}
                  y={volY}
                  width={candleWidth}
                  height={volHeight}
                  fill={isBullish ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}
                  rx="1"
                />

                {/* X axis label */}
                <text
                  x={centerX}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isHovered ? '#0F172A' : '#94A3B8'}
                  fontWeight={isHovered ? '700' : '500'}
                >
                  {d.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
        <span>شاخص محاسبه: کشف قیمت لحظه‌ای سامانه پیوندساخت</span>
        <span className="text-indigo-700 font-semibold">بازه زمانی: {TIMEFRAME_OPTIONS.find(t => t.key === timeframe)?.badgeFa}</span>
      </div>
    </div>
  );
};
