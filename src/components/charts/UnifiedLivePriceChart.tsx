import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Play, 
  Pause, 
  RefreshCw, 
  Radio, 
  Layers, 
  Maximize2, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export type ChartDisplayMode = 'candlestick' | 'trend' | 'both';

export interface PriceAsset {
  id: string;
  nameFa: string;
  category: 'real_estate' | 'materials';
  unitFa: string;
  basePrice: number;
  decimals: number;
  change24h: number;
  initialCandles: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
  initialTrend: {
    time: string;
    price: number;
    volume: number;
  }[];
}

const ASSET_UNITS: PriceAsset[] = [
  {
    id: 'rebar_a3',
    nameFa: 'میلگرد ذوب‌آهن اصفهان (A3 سایز ۱۶)',
    category: 'materials',
    unitFa: 'هزار تومان / کیلوگرم',
    basePrice: 32.8,
    decimals: 2,
    change24h: +2.1,
    initialCandles: [
      { time: '۱۰:۰۰', open: 32.1, high: 32.4, low: 31.9, close: 32.3, volume: 450 },
      { time: '۱۱:۰۰', open: 32.3, high: 32.6, low: 32.2, close: 32.5, volume: 520 },
      { time: '۱۲:۰۰', open: 32.5, high: 32.8, low: 32.4, close: 32.6, volume: 680 },
      { time: '۱۳:۰۰', open: 32.6, high: 32.9, low: 32.5, close: 32.7, volume: 610 },
      { time: '۱۴:۰۰', open: 32.7, high: 33.1, low: 32.6, close: 32.9, volume: 890 },
      { time: '۱۵:۰۰', open: 32.9, high: 33.0, low: 32.7, close: 32.8, volume: 740 },
    ],
    initialTrend: [
      { time: '۱۰:۰۰', price: 32.3, volume: 450 },
      { time: '۱۱:۰۰', price: 32.5, volume: 520 },
      { time: '۱۲:۰۰', price: 32.6, volume: 680 },
      { time: '۱۳:۰۰', price: 32.7, volume: 610 },
      { time: '۱۴:۰۰', price: 32.9, volume: 890 },
      { time: '۱۵:۰۰', price: 32.8, volume: 740 },
    ]
  },
  {
    id: 'tehran_d1',
    nameFa: 'مسکن منطقه ۱ تهران (الهیه، نیاوران، زعفرانیه)',
    category: 'real_estate',
    unitFa: 'میلیون تومان / متر مربع',
    basePrice: 195.0,
    decimals: 1,
    change24h: +3.4,
    initialCandles: [
      { time: 'هفته ۱', open: 188.0, high: 192.5, low: 187.0, close: 191.0, volume: 210 },
      { time: 'هفته ۲', open: 191.0, high: 193.8, low: 189.5, close: 192.4, volume: 245 },
      { time: 'هفته ۳', open: 192.4, high: 194.2, low: 190.8, close: 193.0, volume: 190 },
      { time: 'هفته ۴', open: 193.0, high: 196.5, low: 192.0, close: 195.0, volume: 320 },
      { time: 'هفته ۵', open: 195.0, high: 198.0, low: 194.0, close: 196.8, volume: 280 },
      { time: 'هفته ۶', open: 196.8, high: 197.5, low: 194.5, close: 195.0, volume: 310 },
    ],
    initialTrend: [
      { time: 'هفته ۱', price: 191.0, volume: 210 },
      { time: 'هفته ۲', price: 192.4, volume: 245 },
      { time: 'هفته ۳', price: 193.0, volume: 190 },
      { time: 'هفته ۴', price: 195.0, volume: 320 },
      { time: 'هفته ۵', price: 196.8, volume: 280 },
      { time: 'هفته ۶', price: 195.0, volume: 310 },
    ]
  },
  {
    id: 'cement_type2',
    nameFa: 'سیمان تیپ ۲ تهران (کیسه ۵۰ کیلویی)',
    category: 'materials',
    unitFa: 'هزار تومان / کیسه',
    basePrice: 82.0,
    decimals: 1,
    change24h: +1.2,
    initialCandles: [
      { time: '۱۰:۰۰', open: 80.5, high: 81.2, low: 80.0, close: 81.0, volume: 1200 },
      { time: '۱۱:۰۰', open: 81.0, high: 81.8, low: 80.8, close: 81.5, volume: 1500 },
      { time: '۱۲:۰۰', open: 81.5, high: 82.3, low: 81.2, close: 82.0, volume: 1800 },
      { time: '۱۳:۰۰', open: 82.0, high: 82.5, low: 81.8, close: 82.1, volume: 1400 },
      { time: '۱۴:۰۰', open: 82.1, high: 82.8, low: 81.9, close: 82.4, volume: 2100 },
      { time: '۱۵:۰۰', open: 82.4, high: 82.6, low: 81.8, close: 82.0, volume: 1600 },
    ],
    initialTrend: [
      { time: '۱۰:۰۰', price: 81.0, volume: 1200 },
      { time: '۱۱:۰۰', price: 81.5, volume: 1500 },
      { time: '۱۲:۰۰', price: 82.0, volume: 1800 },
      { time: '۱۳:۰۰', price: 82.1, volume: 1400 },
      { time: '۱۴:۰۰', price: 82.4, volume: 2100 },
      { time: '۱۵:۰۰', price: 82.0, volume: 1600 },
    ]
  },
  {
    id: 'tehran_d5',
    nameFa: 'مسکن منطقه ۵ تهران (پونک، جنت‌آباد، صادقیه)',
    category: 'real_estate',
    unitFa: 'میلیون تومان / متر مربع',
    basePrice: 105.0,
    decimals: 1,
    change24h: +1.8,
    initialCandles: [
      { time: 'هفته ۱', open: 101.0, high: 103.0, low: 100.5, close: 102.5, volume: 410 },
      { time: 'هفته ۲', open: 102.5, high: 104.2, low: 102.0, close: 103.8, volume: 480 },
      { time: 'هفته ۳', open: 103.8, high: 104.5, low: 103.0, close: 104.0, volume: 390 },
      { time: 'هفته ۴', open: 104.0, high: 106.0, low: 103.5, close: 105.2, volume: 550 },
      { time: 'هفته ۵', open: 105.2, high: 106.8, low: 104.8, close: 105.8, volume: 620 },
      { time: 'هفته ۶', open: 105.8, high: 106.2, low: 104.6, close: 105.0, volume: 510 },
    ],
    initialTrend: [
      { time: 'هفته ۱', price: 102.5, volume: 410 },
      { time: 'هفته ۲', price: 103.8, volume: 480 },
      { time: 'هفته ۳', price: 104.0, volume: 390 },
      { time: 'هفته ۴', price: 105.2, volume: 550 },
      { time: 'هفته ۵', price: 105.8, volume: 620 },
      { time: 'هفته ۶', price: 105.0, volume: 510 },
    ]
  },
  {
    id: 'travertine_stone',
    nameFa: 'سنگ تراورتن عباس‌آباد (اسلب ممتاز)',
    category: 'materials',
    unitFa: 'هزار تومان / متر مربع',
    basePrice: 1850,
    decimals: 0,
    change24h: +4.5,
    initialCandles: [
      { time: '۱۰:۰۰', open: 1780, high: 1810, low: 1770, close: 1800, volume: 340 },
      { time: '۱۱:۰۰', open: 1800, high: 1830, low: 1795, close: 1825, volume: 410 },
      { time: '۱۲:۰۰', open: 1825, high: 1845, low: 1815, close: 1840, volume: 520 },
      { time: '۱۳:۰۰', open: 1840, high: 1860, low: 1830, close: 1845, volume: 470 },
      { time: '۱۴:۰۰', open: 1845, high: 1870, low: 1840, close: 1860, volume: 580 },
      { time: '۱۵:۰۰', open: 1860, high: 1865, low: 1845, close: 1850, volume: 630 },
    ],
    initialTrend: [
      { time: '۱۰:۰۰', price: 1800, volume: 340 },
      { time: '۱۱:۰۰', price: 1825, volume: 410 },
      { time: '۱۲:۰۰', price: 1840, volume: 520 },
      { time: '۱۳:۰۰', price: 1845, volume: 470 },
      { time: '۱۴:۰۰', price: 1860, volume: 580 },
      { time: '۱۵:۰۰', price: 1850, volume: 630 },
    ]
  }
];

interface LiveTradeTick {
  id: string;
  time: string;
  price: number;
  volume: number;
  type: 'buy' | 'sell';
}

export const UnifiedLivePriceChart: React.FC = () => {
  // Selected Asset Unit
  const [selectedAssetId, setSelectedAssetId] = useState<string>('rebar_a3');
  // Chart Display Mode: 'candlestick' (شمعی), 'trend' (خطی/روندی), 'both' (ترکیبی)
  const [displayMode, setDisplayMode] = useState<ChartDisplayMode>('candlestick');
  // Timeframe: 1m, 5m, 15m, 1h, 1D
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('5m');
  
  // Real-time live engine states
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [lastTickDirection, setLastTickDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
  const [pingMs, setPingMs] = useState<number>(24);
  const [liveTrades, setLiveTrades] = useState<LiveTradeTick[]>([]);

  // Candle and Trend Data managed live
  const activeAsset = useMemo(() => {
    return ASSET_UNITS.find((a) => a.id === selectedAssetId) || ASSET_UNITS[0];
  }, [selectedAssetId]);

  const [candles, setCandles] = useState(activeAsset.initialCandles);
  const [trendData, setTrendData] = useState(activeAsset.initialTrend);
  const [currentLivePrice, setCurrentLivePrice] = useState<number>(activeAsset.basePrice);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sync state when asset changes
  useEffect(() => {
    setCandles(activeAsset.initialCandles);
    setTrendData(activeAsset.initialTrend);
    setCurrentLivePrice(activeAsset.basePrice);
    setLastTickDirection('neutral');
    
    // Seed initial live trades
    const seedTrades: LiveTradeTick[] = [
      { 
        id: 't-1', 
        time: '۱۵:۴۵:۱۲', 
        price: activeAsset.basePrice, 
        volume: Math.floor(Math.random() * 20) + 5, 
        type: 'buy' 
      },
      { 
        id: 't-2', 
        time: '۱۵:۴۴:۳۵', 
        price: Number((activeAsset.basePrice * 0.999).toFixed(activeAsset.decimals)), 
        volume: Math.floor(Math.random() * 15) + 3, 
        type: 'sell' 
      },
      { 
        id: 't-3', 
        time: '۱۵:۴۳:۴۰', 
        price: Number((activeAsset.basePrice * 1.001).toFixed(activeAsset.decimals)), 
        volume: Math.floor(Math.random() * 25) + 8, 
        type: 'buy' 
      },
    ];
    setLiveTrades(seedTrades);
  }, [activeAsset]);

  // Real-Time Simulator Interval (WebSocket readiness simulation)
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      // Fluctuate price slightly
      const deltaPercent = (Math.random() - 0.48) * 0.004; // small realistic tick
      setCurrentLivePrice((prev) => {
        const nextPrice = Number((prev * (1 + deltaPercent)).toFixed(activeAsset.decimals));
        const dir = nextPrice >= prev ? 'up' : 'down';
        setLastTickDirection(dir);

        // Update current active candle (the latest one)
        setCandles((prevCandles) => {
          if (prevCandles.length === 0) return prevCandles;
          const copy = [...prevCandles];
          const lastIdx = copy.length - 1;
          const last = { ...copy[lastIdx] };

          last.close = nextPrice;
          if (nextPrice > last.high) last.high = nextPrice;
          if (nextPrice < last.low) last.low = nextPrice;
          last.volume += Math.floor(Math.random() * 15) + 1;
          copy[lastIdx] = last;
          return copy;
        });

        // Update trend data
        setTrendData((prevTrend) => {
          if (prevTrend.length === 0) return prevTrend;
          const copy = [...prevTrend];
          const lastIdx = copy.length - 1;
          copy[lastIdx] = {
            ...copy[lastIdx],
            price: nextPrice,
            volume: copy[lastIdx].volume + Math.floor(Math.random() * 15) + 1
          };
          return copy;
        });

        // Add to live trades tape
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fa-IR', { hour12: false });
        const newTrade: LiveTradeTick = {
          id: `t-${Date.now()}`,
          time: timeStr,
          price: nextPrice,
          volume: Math.floor(Math.random() * 30) + 2,
          type: dir === 'up' ? 'buy' : 'sell'
        };

        setLiveTrades((prev) => [newTrade, ...prev.slice(0, 5)]);

        return nextPrice;
      });

      // Fluctuate ping realistic jitter (18ms to 32ms)
      setPingMs(Math.floor(Math.random() * 14) + 18);
    }, 2200);

    return () => clearInterval(interval);
  }, [isLiveActive, activeAsset]);

  // Flash direction reset after 1 second
  useEffect(() => {
    if (lastTickDirection !== 'neutral') {
      const timer = setTimeout(() => {
        setLastTickDirection('neutral');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [lastTickDirection]);

  // Calculate Candlestick SVG geometry
  const width = 760;
  const height = 300;
  const priceHeight = 190;
  const volumeHeight = 55;
  const paddingX = 45;
  const paddingY = 20;

  const allPrices = candles.flatMap((c) => [c.open, c.high, c.low, c.close]);
  const minPrice = allPrices.length ? Math.min(...allPrices) * 0.99 : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) * 1.01 : 100;
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = candles.length ? Math.max(...candles.map((c) => c.volume)) : 100;

  const candleStep = candles.length > 0 ? (width - paddingX * 2) / candles.length : 1;
  const candleWidth = Math.max(14, candleStep * 0.46);

  const getY = (val: number) => {
    return paddingY + priceHeight - ((val - minPrice) / priceRange) * priceHeight;
  };

  const getVolY = (vol: number) => {
    const volTop = paddingY + priceHeight + 25;
    return volTop + volumeHeight - (vol / (maxVolume || 1)) * volumeHeight;
  };

  const hoveredData = hoveredIndex !== null && candles[hoveredIndex] ? candles[hoveredIndex] : null;

  return (
    <div className="space-y-4">
      {/* 1. Main Unified Control Center Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-200 shadow-xs bg-white space-y-4">
        {/* Top: Asset Selector and Chart Type Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Asset Selection & Unit Display */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">انتخاب دارایی و واحد قیمت:</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  واحد مبنا: {activeAsset.unitFa}
                </span>
              </div>
              <div className="relative mt-1">
                <select
                  value={selectedAssetId}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  aria-label="انتخاب دارایی و واحد قیمت"
                  className="appearance-none pr-3 pl-8 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500 cursor-pointer transition-colors"
                >
                  {ASSET_UNITS.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.nameFa}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: Chart Representation Selector (شمعی یا روندی خطی یا ترکیبی) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium ml-1">نوع نمایش نمودار:</span>
            <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200/80 flex items-center gap-1">
              <button
                onClick={() => setDisplayMode('candlestick')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  displayMode === 'candlestick'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>شمع‌های ژاپنی (Candlestick)</span>
              </button>

              <button
                onClick={() => setDisplayMode('trend')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  displayMode === 'trend'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>روند خطی و مساحتی (Area)</span>
              </button>

              <button
                onClick={() => setDisplayMode('both')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  displayMode === 'both'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>نمایش دوتایی (هر دو)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Ticker Header & Live Stream Connection Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Real-time Price Ticker with Green/Red Flash */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border transition-all duration-300 ${
              lastTickDirection === 'up'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 scale-102'
                : lastTickDirection === 'down'
                ? 'bg-rose-500/10 border-rose-500 text-rose-700 scale-102'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="text-[10px] text-slate-400 font-medium">نرخ بلادرنگ (Live Price):</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-black font-mono tracking-tight">
                  {currentLivePrice.toLocaleString('fa-IR')}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {activeAsset.unitFa}
                </span>
                <span className={`text-xs font-bold flex items-center px-1.5 py-0.2 rounded-md ${
                  activeAsset.change24h >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {activeAsset.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {activeAsset.change24h > 0 ? `+${activeAsset.change24h}` : activeAsset.change24h}٪
                </span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-[11px] font-mono">
              {['1m', '5m', '15m', '1h', '1D'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Live Engine Stream Controller & Latency Badge */}
          <div className="flex items-center gap-2.5">
            {/* Live streaming status badge with glowing pulse */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-2xl border border-slate-800 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                {isLiveActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLiveActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span className="text-[11px] font-bold">
                {isLiveActive ? 'جریان زنده (Live)' : 'جریان متوقف شده'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono pr-1 border-r border-slate-700">
                {pingMs}ms
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`p-2 rounded-xl border font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
                isLiveActive
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
              }`}
              title={isLiveActive ? 'توقف موقت استریم زنده' : 'شروع مجدد استریم زنده'}
            >
              {isLiveActive ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">توقف</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">ادامه</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Unified Charts Container - Rendering Candlestick, Trend, or Both */}
      <div className="grid grid-cols-1 gap-4">
        {/* Candlestick Representation Card */}
        {(displayMode === 'candlestick' || displayMode === 'both') && (
          <div
            id="real-estate-candlestick-card"
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  نمودار شمعی ژاپنی (OHLC Candlestick) — {activeAsset.nameFa}
                </h3>
              </div>

              {/* Hover or Current Candle Stats */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200/80">
                {hoveredData ? (
                  <>
                    <span className="text-slate-400">زمان: <strong className="text-slate-900">{hoveredData.time}</strong></span>
                    <span>آغاز: <strong>{hoveredData.open}</strong></span>
                    <span className="text-emerald-600">بیشترین: <strong>{hoveredData.high}</strong></span>
                    <span className="text-rose-600">کمترین: <strong>{hoveredData.low}</strong></span>
                    <span className="text-emerald-700 font-bold">پایانی: <strong>{hoveredData.close}</strong></span>
                    <span className="text-slate-400">حجم: <strong>{hoveredData.volume}</strong></span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">کندل لحظه‌ای:</span>
                    <span className="text-emerald-700 font-bold">آخرین قیمت: {currentLivePrice} {activeAsset.unitFa.split(' / ')[0]}</span>
                    <span className="text-slate-400 hidden sm:inline">| نشانگر را روی کندل‌ها حرکت دهید</span>
                  </>
                )}
              </div>
            </div>

            {/* SVG Candlestick Viewport with Price Scale and Volume Histogram */}
            <div className="relative w-full h-72 rounded-2xl bg-white border border-slate-200/90 p-2 overflow-hidden shadow-inner">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Horizontal price grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((r) => {
                  const y = paddingY + r * priceHeight;
                  const price = (maxPrice - r * priceRange).toFixed(activeAsset.decimals);
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

                {/* Horizontal Live Price Line with Blinking Tag */}
                {(() => {
                  const liveY = getY(currentLivePrice);
                  return (
                    <g>
                      <line
                        x1={paddingX}
                        y1={liveY}
                        x2={width - paddingX}
                        y2={liveY}
                        stroke={lastTickDirection === 'down' ? '#F43F5E' : '#10B981'}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <circle
                        cx={width - paddingX - 4}
                        cy={liveY}
                        r="3.5"
                        fill={lastTickDirection === 'down' ? '#F43F5E' : '#10B981'}
                        className={isLiveActive ? 'animate-pulse' : ''}
                      />
                    </g>
                  );
                })()}

                {/* Candlestick Wicks and Bodies */}
                {candles.map((candle, idx) => {
                  const xCenter = paddingX + idx * candleStep + candleStep / 2;
                  const isGreen = candle.close >= candle.open;
                  const candleColor = isGreen ? '#10B981' : '#F43F5E';
                  const candleBg = isGreen ? '#D1FAE5' : '#FFE4E6';

                  const yHigh = getY(candle.high);
                  const yLow = getY(candle.low);
                  const yOpen = getY(candle.open);
                  const yClose = getY(candle.close);

                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(3, Math.abs(yClose - yOpen));
                  const isHovered = hoveredIndex === idx;

                  // Volume bar
                  const volY = getVolY(candle.volume);
                  const volH = paddingY + priceHeight + 25 + volumeHeight - volY;

                  return (
                    <g
                      key={idx}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Highlight hover column */}
                      {isHovered && (
                        <rect
                          x={xCenter - candleStep / 2}
                          y={paddingY}
                          width={candleStep}
                          height={priceHeight + volumeHeight + 25}
                          fill="#F8FAFC"
                          opacity={0.8}
                        />
                      )}

                      {/* Upper/Lower Wick */}
                      <line
                        x1={xCenter}
                        y1={yHigh}
                        x2={xCenter}
                        y2={yLow}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />

                      {/* Candle Body */}
                      <rect
                        x={xCenter - candleWidth / 2}
                        y={bodyTop}
                        width={candleWidth}
                        height={bodyHeight}
                        rx="2"
                        fill={isGreen ? candleBg : candleColor}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />

                      {/* Volume Histogram Bar at Bottom */}
                      <rect
                        x={xCenter - candleWidth / 2}
                        y={volY}
                        width={candleWidth}
                        height={volH}
                        rx="1.5"
                        fill={isGreen ? '#34D399' : '#FB7185'}
                        opacity={0.65}
                      />

                      {/* Time Label on X Axis */}
                      <text
                        x={xCenter}
                        y={paddingY + priceHeight + 15}
                        fill="#94A3B8"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {candle.time}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Candlestick Legend & Volume note */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                  <span>شمع صعودی (Bullish)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
                  <span>شمع نزولی (Bearish)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-300" />
                  <span>میله حجم معاملات (Volume)</span>
                </span>
              </div>
              <span className="font-mono text-emerald-700 font-semibold">
                آماده اتصال به سوکت زنده تالار (Live Socket Ready)
              </span>
            </div>
          </div>
        )}

        {/* Trend Representation Card (Recharts Area / Line) */}
        {(displayMode === 'trend' || displayMode === 'both') && (
          <div
            id="material-trend-card"
            className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  نمودار روندی و مساحتی پیوسته (Area Trend) — {activeAsset.nameFa}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">آخرین نرخ روندی:</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentLivePrice.toLocaleString('fa-IR')} {activeAsset.unitFa}
                </span>
              </div>
            </div>

            {/* Recharts Area Chart Viewport */}
            <div className="w-full h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="liveTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    orientation="right"
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg border border-slate-700">
                            <div className="font-bold text-slate-300">{label}</div>
                            <div className="text-emerald-400 font-mono font-black mt-0.5">
                              {payload[0].value?.toLocaleString('fa-IR')} {activeAsset.unitFa}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              حجم معامله: {payload[0].payload?.volume} واحد
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={currentLivePrice}
                    stroke="#10B981"
                    strokeDasharray="3 3"
                    label={{
                      value: `لحظه‌ای: ${currentLivePrice}`,
                      fill: '#059669',
                      fontSize: 10,
                      position: 'left'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#liveTrendGradient)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>شاخص محاسبه: تجمیع معاملات و نوسانات ثانیه‌ای</span>
              <span className="text-emerald-700 font-semibold">پشتیبانی کامل از شتاب‌سنج تغییرات بازار</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Live Order Book & Real-Time Trade Stream Tape */}
      <div className="p-4 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">
              جریان معاملات ثانیه‌ای زنده (Live Order Stream)
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            تیک‌های معاملاتی متصل به بورس کالا و سامانه املاک سابتا
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {liveTrades.slice(0, 3).map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono"
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${trade.type === 'buy' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span className={trade.type === 'buy' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {trade.type === 'buy' ? 'خرید' : 'فروش'}
                </span>
                <span className="text-slate-300 font-bold">{trade.price.toLocaleString('fa-IR')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                <span>{trade.volume} واحد</span>
                <span>{trade.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
