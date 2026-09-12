import React, { useState, useEffect, useMemo } from 'react';
import { MaterialTrendChart } from '../components/charts/MaterialTrendChart';
import { RealEstateCandlestickChart } from '../components/charts/RealEstateCandlestickChart';
import { 
  LineChart, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  Scale, 
  Clock, 
  ChevronDown, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { 
  ASSET_MARKET_DATA, 
  TIMEFRAME_OPTIONS, 
  TimeframeKey 
} from '../data/timeframeChartData';
import { toPersianDigits, formatRial } from '../utils/persianUtils';
import { AndroidShamsiDateBar } from '../components/common/AndroidShamsiDateBar';

export const AnalyticsView: React.FC = () => {
  // 1. Unified Asset Unit Selection
  const [selectedAssetId, setSelectedAssetId] = useState<string>('rebar_a3');

  // 2. Chart Display Selector: strictly binary - either 'candlestick' (شمعی) OR 'line' (لاینی)
  const [displayChartType, setDisplayChartType] = useState<'candlestick' | 'line'>('candlestick');

  // 3. Timeframe Selection: 'day' (روز), 'week' (هفته), 'month' (ماهانه), '3month' (۳ ماهه), '6month' (۶ ماهه), 'year' (سالانه)
  const [timeframe, setTimeframe] = useState<TimeframeKey>('day');

  // 4. Real-Time Live Engine States
  const [lastTickDir, setLastTickDir] = useState<'up' | 'down' | 'neutral'>('neutral');

  const activeAsset = useMemo(() => {
    return ASSET_MARKET_DATA.find((a) => a.id === selectedAssetId) || ASSET_MARKET_DATA[0];
  }, [selectedAssetId]);

  const activeTimeframeData = useMemo(() => {
    return activeAsset.timeframes[timeframe] || activeAsset.timeframes.day;
  }, [activeAsset, timeframe]);

  const [candles, setCandles] = useState(activeTimeframeData.candles);
  const [trendData, setTrendData] = useState(activeTimeframeData.trend);
  const [currentLivePrice, setCurrentLivePrice] = useState<number>(activeAsset.basePrice);

  // Synchronize state whenever active asset or timeframe changes
  useEffect(() => {
    setCandles(activeTimeframeData.candles);
    setTrendData(activeTimeframeData.trend);
    const lastPrice = activeTimeframeData.trend.length > 0 
      ? activeTimeframeData.trend[activeTimeframeData.trend.length - 1].price 
      : activeAsset.basePrice;
    setCurrentLivePrice(lastPrice);
    setLastTickDir('neutral');
  }, [activeAsset, timeframe, activeTimeframeData]);

  // Real-Time Price Simulation Engine (Persian Rial Updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const deltaPercent = (Math.random() - 0.48) * 0.0035;
      setCurrentLivePrice((prev) => {
        const step = Math.round(prev * deltaPercent);
        const nextPrice = Math.max(100, prev + step);
        const dir = nextPrice >= prev ? 'up' : 'down';
        setLastTickDir(dir);

        // Synchronize Candle Chart
        setCandles((prevCandles) => {
          if (prevCandles.length === 0) return prevCandles;
          const copy = [...prevCandles];
          const lastIdx = copy.length - 1;
          const last = { ...copy[lastIdx] };

          last.close = nextPrice;
          if (nextPrice > last.high) last.high = nextPrice;
          if (nextPrice < last.low) last.low = nextPrice;
          last.volume += Math.floor(Math.random() * 15) + 2;
          copy[lastIdx] = last;
          return copy;
        });

        // Synchronize Line / Trend Chart
        setTrendData((prevTrend) => {
          if (prevTrend.length === 0) return prevTrend;
          const copy = [...prevTrend];
          const lastIdx = copy.length - 1;
          copy[lastIdx] = {
            ...copy[lastIdx],
            price: nextPrice,
            volume: copy[lastIdx].volume + Math.floor(Math.random() * 15) + 2
          };
          return copy;
        });

        return nextPrice;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [activeAsset]);

  const activeTfMeta = TIMEFRAME_OPTIONS.find((t) => t.key === timeframe) || TIMEFRAME_OPTIONS[0];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Android Solar Hijri Date Bar */}
      <AndroidShamsiDateBar />

      {/* 1. Header Banner & Unified Asset/Timeframe/Chart Selector Bar */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <LineChart className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                مرکز پایش زنده و تحلیل تکنیکال قیمت‌ها (ریال ایران)
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                انتخاب اختصاصی نمودار شمعی یا نمودار لاینی بر اساس بازه‌های زمانی روزانه، هفتگی، ماهانه و سالانه
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>مبنای ریال ایران</span>
            </span>
          </div>
        </div>

        {/* Unified Control Ribbon: Asset Selector + Strictly Binary Chart Type Selector + Timeframe Selector */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* Asset & Unit Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500">انتخاب کالا و واحد:</span>
            <div className="relative">
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                aria-label="انتخاب واحد قیمت مشترک"
                className="appearance-none pr-3 pl-8 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500 cursor-pointer transition-colors"
              >
                {ASSET_MARKET_DATA.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nameFa} ({a.unitFa})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              واحد: {activeAsset.unitFa}
            </span>
          </div>

          {/* Chart Representation Mode */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">نوع نمودار:</span>
            <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200/80 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDisplayChartType('candlestick')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  displayChartType === 'candlestick'
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>نمودار شمعی</span>
              </button>

              <button
                type="button"
                onClick={() => setDisplayChartType('line')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  displayChartType === 'line'
                    ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>نمودار لاینی</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Chart Display (Exclusively renders the chosen chart - Candlestick OR Line) */}
      <div className="space-y-4">
        {displayChartType === 'candlestick' ? (
          <RealEstateCandlestickChart
            assetName={activeAsset.nameFa}
            unitFa={activeAsset.unitFa}
            candles={candles}
            currentPrice={currentLivePrice}
            lastTickDir={lastTickDir}
            isLive={true}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        ) : (
          <MaterialTrendChart
            assetName={activeAsset.nameFa}
            unitFa={activeAsset.unitFa}
            trendData={trendData}
            currentPrice={currentLivePrice}
            lastTickDir={lastTickDir}
            isLive={true}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        )}
      </div>

      {/* 3. Analytical Market Transparency Summary */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs text-slate-600 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>شفافیت قیمت‌گذاری و مرجع رسمی معاملات:</span>
        </div>
        <p>
          تحلیل جاری مربوط به <strong>{activeAsset.nameFa}</strong> در بازه زمانی <strong>{activeTfMeta.badgeFa}</strong> با قالب <strong>{displayChartType === 'candlestick' ? 'شمعی ژاپنی' : 'لاینی پیوسته'}</strong> است. تمامی محاسبات بر حسب <strong>ریال ایران ({activeAsset.unitFa})</strong> و منطبق با سامانه‌های کشف نرخ رسمی کشور بروزرسانی می‌گردد.
        </p>
      </div>
    </div>
  );
};
