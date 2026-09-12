import React, { useState, useEffect, useMemo } from 'react';
import { MaterialTrendChart } from '../components/charts/MaterialTrendChart';
import { RealEstateCandlestickChart } from '../components/charts/RealEstateCandlestickChart';
import { 
  LineChart, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  Scale, 
  Play, 
  Pause, 
  Clock, 
  ChevronDown, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { 
  ASSET_MARKET_DATA, 
  TIMEFRAME_OPTIONS, 
  TimeframeKey 
} from '../data/timeframeChartData';

export const AnalyticsView: React.FC = () => {
  // 1. Unified Asset Unit Selection
  const [selectedAssetId, setSelectedAssetId] = useState<string>('rebar_a3');

  // 2. Chart Display Selector: strictly binary - either 'candlestick' (شمعی) OR 'line' (لاینی)
  const [displayChartType, setDisplayChartType] = useState<'candlestick' | 'line'>('candlestick');

  // 3. Timeframe Selection: 'day' (روز), 'week' (هفته), 'month' (ماهانه), '3month' (۳ ماهه), '6month' (۶ ماهه), 'year' (سالانه)
  const [timeframe, setTimeframe] = useState<TimeframeKey>('day');

  // 4. Real-Time Live Engine States
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [lastTickDir, setLastTickDir] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [pingMs, setPingMs] = useState<number>(24);

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

  // Real-Time Simulator Engine (Updates active dataset synchronously)
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      const deltaPercent = (Math.random() - 0.48) * 0.0035;
      setCurrentLivePrice((prev) => {
        const nextPrice = Number((prev * (1 + deltaPercent)).toFixed(activeAsset.decimals));
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

      setPingMs(Math.floor(Math.random() * 14) + 16);
    }, 2200);

    return () => clearInterval(interval);
  }, [isLiveActive, activeAsset]);

  const activeTfMeta = TIMEFRAME_OPTIONS.find((t) => t.key === timeframe) || TIMEFRAME_OPTIONS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner & Live Unit Selector Bar */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
              <LineChart className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                مرکز پایش زنده و تحلیل تکنیکال قیمت‌ها
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                انتخاب اختصاصی نمودار شمعی یا نمودار لاینی برای یک واحد قیمت با زمان‌بندی چندگانه
              </p>
            </div>
          </div>

          {/* Live Status Badge and Play/Pause button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-2xl text-xs font-mono shadow-xs">
              <span className="relative flex h-2 w-2">
                {isLiveActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span>{isLiveActive ? 'استریم زنده فعال' : 'استریم متوقف'}</span>
              <span className="text-[10px] text-slate-400 border-r border-slate-700 pr-1.5 mr-1.5">{pingMs}ms</span>
            </div>

            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
              title={isLiveActive ? 'توقف استریم' : 'شروع استریم'}
            >
              {isLiveActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
          </div>
        </div>

        {/* Unified Control Ribbon: Asset Selector + Strictly Binary Chart Type Selector + Timeframe Selector */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {/* Asset & Unit Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500">دارایی و واحد:</span>
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

          {/* Timeframe & Chart Representation Mode */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 6 Timeframes: روز | هفته | ماهانه | ۳ ماهه | ۶ ماهه | سالانه */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">زمان‌بندی:</span>
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200/80 flex items-center gap-1">
                {TIMEFRAME_OPTIONS.map((tf) => {
                  const isActive = timeframe === tf.key;
                  return (
                    <button
                      key={tf.key}
                      onClick={() => setTimeframe(tf.key)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title={`${tf.badgeFa} (${tf.subLabelFa})`}
                    >
                      {tf.labelFa}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Strictly Binary Chart Choice: Only Candlestick OR Line */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">نوع نمودار:</span>
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
      </div>

      {/* 2. KPI Index Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400">آخرین نرخ لحظه‌ای:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-black text-slate-900 font-mono">
              {currentLivePrice.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{activeAsset.change24h}٪
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block">{activeAsset.unitFa}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400">نمودار انتخابی:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-black text-slate-900">
              {displayChartType === 'candlestick' ? 'نمودار شمعی (Candlestick)' : 'نمودار لاینی (Line Chart)'}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              فعال
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block">نمایش انحصاری تک‌نمودار</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400">زمان‌بندی انتخابی:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-black text-indigo-700">
              {activeTfMeta.badgeFa} ({activeTfMeta.labelFa})
            </span>
            <span className="text-[11px] text-slate-500 font-mono">{activeTfMeta.subLabelFa}</span>
          </div>
          <span className="text-[10px] text-slate-400 block">انطباق مقیاس زمانی نمودار</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-400">وضعیت سوکت زنده:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-black text-slate-900 font-mono">
              {isLiveActive ? 'متصل (Streaming)' : 'متوقف'}
            </span>
            <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          </div>
          <span className="text-[10px] text-slate-400 block">شبیه‌ساز معاملات بلادرنگ بورس کالا</span>
        </div>
      </div>

      {/* 3. Main Chart Display (Exclusively renders the chosen chart - No "both" mode) */}
      <div className="space-y-4">
        {displayChartType === 'candlestick' ? (
          <RealEstateCandlestickChart
            assetName={activeAsset.nameFa}
            unitFa={activeAsset.unitFa}
            candles={candles}
            currentPrice={currentLivePrice}
            lastTickDir={lastTickDir}
            isLive={isLiveActive}
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
            isLive={isLiveActive}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        )}
      </div>

      {/* 4. Analytical Correlation Note */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs text-slate-600 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>پایش تحلیلی قیمت و رفتار بازار:</span>
        </div>
        <p>
          شما در حال بررسی <strong>{activeAsset.nameFa}</strong> در بازه زمانی <strong>{activeTfMeta.badgeFa}</strong> با ساختار <strong>{displayChartType === 'candlestick' ? 'شمعی ژاپنی' : 'خطی (لاینی)'}</strong> هستید. داده‌ها بر اساس جریان کشف قیمت سامانه پیوندساخت به صورت بلادرنگ به روز می‌شوند.
        </p>
      </div>
    </div>
  );
};
