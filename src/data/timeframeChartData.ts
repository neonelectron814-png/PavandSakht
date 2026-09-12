import { CandlestickData } from '../types';

export type TimeframeKey = 'day' | 'week' | 'month' | '3month' | '6month' | 'year';

export interface TimeframeOption {
  key: TimeframeKey;
  labelFa: string;
  badgeFa: string;
  subLabelFa: string;
}

export const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { key: 'day', labelFa: 'روز', badgeFa: 'روزانه', subLabelFa: 'ساعتی امروز' },
  { key: 'week', labelFa: 'هفته', badgeFa: 'هفتگی', subLabelFa: '۷ روز اخیر' },
  { key: 'month', labelFa: 'ماهانه', badgeFa: '۱ ماهه', subLabelFa: '۳۰ روز گذشته' },
  { key: '3month', labelFa: '۳ ماهه', badgeFa: 'فصلی', subLabelFa: '۹۰ روز گذشته' },
  { key: '6month', labelFa: '۶ ماهه', badgeFa: 'نیم‌سال', subLabelFa: '۶ ماه گذشته' },
  { key: 'year', labelFa: 'سالانه', badgeFa: '۱ ساله', subLabelFa: '۱۲ ماه گذشته' },
];

export interface AssetTimeframeData {
  candles: CandlestickData[];
  trend: { time: string; price: number; volume: number }[];
}

export interface AssetConfig {
  id: string;
  nameFa: string;
  category: 'materials' | 'real_estate';
  unitFa: string;
  currencyLabel: string;
  basePrice: number;
  decimals: number;
  change24h: number;
  timeframes: Record<TimeframeKey, AssetTimeframeData>;
}

// All prices strictly in authentic Iranian Rial (ریال ایران)
export const ASSET_MARKET_DATA: AssetConfig[] = [
  {
    id: 'rebar_a3',
    nameFa: 'میلگرد ذوب‌آهن اصفهان (A3 سایز ۱۶)',
    category: 'materials',
    unitFa: 'ریال/کیلوگرم',
    currencyLabel: 'ریال ایران',
    basePrice: 328000,
    decimals: 0,
    change24h: +2.1,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 322000, high: 325000, low: 320000, close: 324000, volume: 380 },
          { time: '۱۰:۰۰', open: 324000, high: 326000, low: 322000, close: 323000, volume: 450 },
          { time: '۱۱:۰۰', open: 323000, high: 327000, low: 322000, close: 325000, volume: 520 },
          { time: '۱۲:۰۰', open: 325000, high: 328000, low: 324000, close: 326000, volume: 680 },
          { time: '۱۳:۰۰', open: 326000, high: 329000, low: 325000, close: 327000, volume: 610 },
          { time: '۱۴:۰۰', open: 327000, high: 331000, low: 326000, close: 329000, volume: 890 },
          { time: '۱۵:۰۰', open: 329000, high: 330000, low: 327000, close: 328000, volume: 740 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 324000, volume: 380 },
          { time: '۱۰:۰۰', price: 323000, volume: 450 },
          { time: '۱۱:۰۰', price: 325000, volume: 520 },
          { time: '۱۲:۰۰', price: 326000, volume: 680 },
          { time: '۱۳:۰۰', price: 327000, volume: 610 },
          { time: '۱۴:۰۰', price: 329000, volume: 890 },
          { time: '۱۵:۰۰', price: 328000, volume: 740 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 318000, high: 323000, low: 316000, close: 321000, volume: 2100 },
          { time: 'یکشنبه', open: 321000, high: 325000, low: 320000, close: 324000, volume: 2450 },
          { time: 'دوشنبه', open: 324000, high: 326000, low: 322000, close: 323000, volume: 1980 },
          { time: 'سه‌شنبه', open: 323000, high: 328000, low: 323000, close: 326000, volume: 2700 },
          { time: 'چهارشنبه', open: 326000, high: 330000, low: 325000, close: 329000, volume: 3100 },
          { time: 'پنجشنبه', open: 329000, high: 331000, low: 327000, close: 328000, volume: 1850 },
        ],
        trend: [
          { time: 'شنبه', price: 321000, volume: 2100 },
          { time: 'یکشنبه', price: 324000, volume: 2450 },
          { time: 'دوشنبه', price: 323000, volume: 1980 },
          { time: 'سه‌شنبه', price: 326000, volume: 2700 },
          { time: 'چهارشنبه', price: 329000, volume: 3100 },
          { time: 'پنجشنبه', price: 328000, volume: 1850 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 305000, high: 314000, low: 302000, close: 312000, volume: 11500 },
          { time: 'هفته ۲', open: 312000, high: 319000, low: 310000, close: 318000, volume: 13200 },
          { time: 'هفته ۳', open: 318000, high: 325000, low: 315000, close: 322000, volume: 14800 },
          { time: 'هفته ۴', open: 322000, high: 331000, low: 320000, close: 328000, volume: 16500 },
        ],
        trend: [
          { time: 'هفته ۱', price: 312000, volume: 11500 },
          { time: 'هفته ۲', price: 318000, volume: 13200 },
          { time: 'هفته ۳', price: 322000, volume: 14800 },
          { time: 'هفته ۴', price: 328000, volume: 16500 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 290000, high: 305000, low: 288000, close: 302000, volume: 43000 },
          { time: 'ماه دوم (مرداد)', open: 302000, high: 318000, low: 299000, close: 315000, volume: 49500 },
          { time: 'ماه سوم (شهریور)', open: 315000, high: 331000, low: 312000, close: 328000, volume: 56000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 302000, volume: 43000 },
          { time: 'ماه دوم (مرداد)', price: 315000, volume: 49500 },
          { time: 'ماه سوم (شهریور)', price: 328000, volume: 56000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 275000, high: 286000, low: 272000, close: 283000, volume: 38000 },
          { time: 'اردیبهشت', open: 283000, high: 294000, low: 281000, close: 291000, volume: 42000 },
          { time: 'خرداد', open: 291000, high: 302000, low: 289000, close: 298000, volume: 46000 },
          { time: 'تیر', open: 298000, high: 309000, low: 295000, close: 306000, volume: 45000 },
          { time: 'مرداد', open: 306000, high: 319000, low: 303000, close: 316000, volume: 51000 },
          { time: 'شهریور', open: 316000, high: 331000, low: 312000, close: 328000, volume: 58000 },
        ],
        trend: [
          { time: 'فروردین', price: 283000, volume: 38000 },
          { time: 'اردیبهشت', price: 291000, volume: 42000 },
          { time: 'خرداد', price: 298000, volume: 46000 },
          { time: 'تیر', price: 306000, volume: 45000 },
          { time: 'مرداد', price: 316000, volume: 51000 },
          { time: 'شهریور', price: 328000, volume: 58000 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 262000, high: 290000, low: 258000, close: 286000, volume: 128000 },
          { time: 'تابستان ۱۴۰۴', open: 286000, high: 312000, low: 282000, close: 308000, volume: 145000 },
          { time: 'پاییز ۱۴۰۴', open: 308000, high: 320000, low: 301000, close: 315000, volume: 139000 },
          { time: 'زمستان ۱۴۰۴', open: 315000, high: 331000, low: 310000, close: 328000, volume: 168000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 286000, volume: 128000 },
          { time: 'تابستان ۱۴۰۴', price: 308000, volume: 145000 },
          { time: 'پاییز ۱۴۰۴', price: 315000, volume: 139000 },
          { time: 'زمستان ۱۴۰۴', price: 328000, volume: 168000 },
        ]
      }
    }
  },
  {
    id: 'tehran_d1',
    nameFa: 'مسکن منطقه ۱ تهران (الهیه، نیاوران، زعفرانیه)',
    category: 'real_estate',
    unitFa: 'ریال/متر مربع',
    currencyLabel: 'ریال ایران',
    basePrice: 1950000000,
    decimals: 0,
    change24h: +3.4,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 1935000000, high: 1945000000, low: 1930000000, close: 1940000000, volume: 42 },
          { time: '۱۱:۰۰', open: 1940000000, high: 1950000000, low: 1938000000, close: 1945000000, volume: 55 },
          { time: '۱۳:۰۰', open: 1945000000, high: 1958000000, low: 1942000000, close: 1952000000, volume: 68 },
          { time: '۱۵:۰۰', open: 1952000000, high: 1962000000, low: 1948000000, close: 1950000000, volume: 80 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 1940000000, volume: 42 },
          { time: '۱۱:۰۰', price: 1945000000, volume: 55 },
          { time: '۱۳:۰۰', price: 1952000000, volume: 68 },
          { time: '۱۵:۰۰', price: 1950000000, volume: 80 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 1905000000, high: 1920000000, low: 1895000000, close: 1915000000, volume: 180 },
          { time: 'یکشنبه', open: 1915000000, high: 1930000000, low: 1910000000, close: 1925000000, volume: 210 },
          { time: 'دوشنبه', open: 1925000000, high: 1938000000, low: 1920000000, close: 1930000000, volume: 195 },
          { time: 'سه‌شنبه', open: 1930000000, high: 1945000000, low: 1925000000, close: 1940000000, volume: 230 },
          { time: 'چهارشنبه', open: 1940000000, high: 1958000000, low: 1935000000, close: 1955000000, volume: 280 },
          { time: 'پنجشنبه', open: 1955000000, high: 1965000000, low: 1945000000, close: 1950000000, volume: 220 },
        ],
        trend: [
          { time: 'شنبه', price: 1915000000, volume: 180 },
          { time: 'یکشنبه', price: 1925000000, volume: 210 },
          { time: 'دوشنبه', price: 1930000000, volume: 195 },
          { time: 'سه‌شنبه', price: 1940000000, volume: 230 },
          { time: 'چهارشنبه', price: 1955000000, volume: 280 },
          { time: 'پنجشنبه', price: 1950000000, volume: 220 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 1880000000, high: 1915000000, low: 1870000000, close: 1905000000, volume: 680 },
          { time: 'هفته ۲', open: 1905000000, high: 1930000000, low: 1898000000, close: 1920000000, volume: 740 },
          { time: 'هفته ۳', open: 1920000000, high: 1945000000, low: 1912000000, close: 1938000000, volume: 810 },
          { time: 'هفته ۴', open: 1938000000, high: 1968000000, low: 1930000000, close: 1950000000, volume: 920 },
        ],
        trend: [
          { time: 'هفته ۱', price: 1905000000, volume: 680 },
          { time: 'هفته ۲', price: 1920000000, volume: 740 },
          { time: 'هفته ۳', price: 1938000000, volume: 810 },
          { time: 'هفته ۴', price: 1950000000, volume: 920 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 1820000000, high: 1880000000, low: 1805000000, close: 1865000000, volume: 2400 },
          { time: 'ماه دوم (مرداد)', open: 1865000000, high: 1925000000, low: 1850000000, close: 1908000000, volume: 2750 },
          { time: 'ماه سوم (شهریور)', open: 1908000000, high: 1970000000, low: 1895000000, close: 1950000000, volume: 3100 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 1865000000, volume: 2400 },
          { time: 'ماه دوم (مرداد)', price: 1908000000, volume: 2750 },
          { time: 'ماه سوم (شهریور)', price: 1950000000, volume: 3100 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 1720000000, high: 1780000000, low: 1700000000, close: 1765000000, volume: 2100 },
          { time: 'اردیبهشت', open: 1765000000, high: 1815000000, low: 1750000000, close: 1800000000, volume: 2350 },
          { time: 'خرداد', open: 1800000000, high: 1850000000, low: 1785000000, close: 1835000000, volume: 2500 },
          { time: 'تیر', open: 1835000000, high: 1890000000, low: 1820000000, close: 1870000000, volume: 2600 },
          { time: 'مرداد', open: 1870000000, high: 1930000000, low: 1855000000, close: 1910000000, volume: 2900 },
          { time: 'شهریور', open: 1910000000, high: 1975000000, low: 1898000000, close: 1950000000, volume: 3250 },
        ],
        trend: [
          { time: 'فروردین', price: 1765000000, volume: 2100 },
          { time: 'اردیبهشت', price: 1800000000, volume: 2350 },
          { time: 'خرداد', price: 1835000000, volume: 2500 },
          { time: 'تیر', price: 1870000000, volume: 2600 },
          { time: 'مرداد', price: 1910000000, volume: 2900 },
          { time: 'شهریور', price: 1950000000, volume: 3250 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 1650000000, high: 1780000000, low: 1620000000, close: 1750000000, volume: 7200 },
          { time: 'تابستان ۱۴۰۴', open: 1750000000, high: 1880000000, low: 1730000000, close: 1850000000, volume: 8400 },
          { time: 'پاییز ۱۴۰۴', open: 1850000000, high: 1925000000, low: 1830000000, close: 1905000000, volume: 7900 },
          { time: 'زمستان ۱۴۰۴', open: 1905000000, high: 1980000000, low: 1880000000, close: 1950000000, volume: 9500 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 1750000000, volume: 7200 },
          { time: 'تابستان ۱۴۰۴', price: 1850000000, volume: 8400 },
          { time: 'پاییز ۱۴۰۴', price: 1905000000, volume: 7900 },
          { time: 'زمستان ۱۴۰۴', price: 1950000000, volume: 9500 },
        ]
      }
    }
  },
  {
    id: 'cement_type2',
    nameFa: 'سیمان تیپ ۲ تهران (کیسه ۵۰ کیلویی)',
    category: 'materials',
    unitFa: 'ریال/کیسه',
    currencyLabel: 'ریال ایران',
    basePrice: 820000,
    decimals: 0,
    change24h: +1.2,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 805000, high: 812000, low: 800000, close: 810000, volume: 980 },
          { time: '۱۱:۰۰', open: 810000, high: 818000, low: 808000, close: 815000, volume: 1400 },
          { time: '۱۳:۰۰', open: 815000, high: 824000, low: 812000, close: 821000, volume: 1650 },
          { time: '۱۵:۰۰', open: 821000, high: 826000, low: 818000, close: 820000, volume: 1300 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 810000, volume: 980 },
          { time: '۱۱:۰۰', price: 815000, volume: 1400 },
          { time: '۱۳:۰۰', price: 821000, volume: 1650 },
          { time: '۱۵:۰۰', price: 820000, volume: 1300 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 795000, high: 808000, low: 790000, close: 802000, volume: 5400 },
          { time: 'یکشنبه', open: 802000, high: 812000, low: 800000, close: 809000, volume: 6100 },
          { time: 'دوشنبه', open: 809000, high: 816000, low: 805000, close: 812000, volume: 5800 },
          { time: 'سه‌شنبه', open: 812000, high: 820000, low: 810000, close: 817000, volume: 6600 },
          { time: 'چهارشنبه', open: 817000, high: 825000, low: 814000, close: 823000, volume: 7200 },
          { time: 'پنجشنبه', open: 823000, high: 827000, low: 818000, close: 820000, volume: 4900 },
        ],
        trend: [
          { time: 'شنبه', price: 802000, volume: 5400 },
          { time: 'یکشنبه', price: 809000, volume: 6100 },
          { time: 'دوشنبه', price: 812000, volume: 5800 },
          { time: 'سه‌شنبه', price: 817000, volume: 6600 },
          { time: 'چهارشنبه', price: 823000, volume: 7200 },
          { time: 'پنجشنبه', price: 820000, volume: 4900 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 770000, high: 792000, low: 765000, close: 788000, volume: 25000 },
          { time: 'هفته ۲', open: 788000, high: 804000, low: 782000, close: 800000, volume: 27500 },
          { time: 'هفته ۳', open: 800000, high: 815000, low: 795000, close: 810000, volume: 29000 },
          { time: 'هفته ۴', open: 810000, high: 828000, low: 805000, close: 820000, volume: 32000 },
        ],
        trend: [
          { time: 'هفته ۱', price: 788000, volume: 25000 },
          { time: 'هفته ۲', price: 800000, volume: 27500 },
          { time: 'هفته ۳', price: 810000, volume: 29000 },
          { time: 'هفته ۴', price: 820000, volume: 32000 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 730000, high: 765000, low: 720000, close: 758000, volume: 85000 },
          { time: 'ماه دوم (مرداد)', open: 758000, high: 798000, low: 750000, close: 790000, volume: 92000 },
          { time: 'ماه سوم (شهریور)', open: 790000, high: 830000, low: 785000, close: 820000, volume: 104000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 758000, volume: 85000 },
          { time: 'ماه دوم (مرداد)', price: 790000, volume: 92000 },
          { time: 'ماه سوم (شهریور)', price: 820000, volume: 104000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 680000, high: 710000, low: 675000, close: 702000, volume: 76000 },
          { time: 'اردیبهشت', open: 702000, high: 735000, low: 698000, close: 725000, volume: 81000 },
          { time: 'خرداد', open: 725000, high: 750000, low: 718000, close: 742000, volume: 84000 },
          { time: 'تیر', open: 742000, high: 772000, low: 735000, close: 768000, volume: 88000 },
          { time: 'مرداد', open: 768000, high: 800000, low: 760000, close: 795000, volume: 94000 },
          { time: 'شهریور', open: 795000, high: 830000, low: 788000, close: 820000, volume: 105000 },
        ],
        trend: [
          { time: 'فروردین', price: 702000, volume: 76000 },
          { time: 'اردیبهشت', price: 725000, volume: 81000 },
          { time: 'خرداد', price: 742000, volume: 84000 },
          { time: 'تیر', price: 768000, volume: 88000 },
          { time: 'مرداد', price: 795000, volume: 94000 },
          { time: 'شهریور', price: 820000, volume: 105000 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 650000, high: 720000, low: 640000, close: 705000, volume: 240000 },
          { time: 'تابستان ۱۴۰۴', open: 705000, high: 775000, low: 695000, close: 760000, volume: 265000 },
          { time: 'پاییز ۱۴۰۴', open: 760000, high: 805000, low: 750000, close: 792000, volume: 255000 },
          { time: 'زمستان ۱۴۰۴', open: 792000, high: 835000, low: 780000, close: 820000, volume: 290000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 705000, volume: 240000 },
          { time: 'تابستان ۱۴۰۴', price: 760000, volume: 265000 },
          { time: 'پاییز ۱۴۰۴', price: 792000, volume: 255000 },
          { time: 'زمستان ۱۴۰۴', price: 820000, volume: 290000 },
        ]
      }
    }
  },
  {
    id: 'travertine_stone',
    nameFa: 'سنگ تراورتن عباس‌آباد (اسلب ممتاز نما)',
    category: 'materials',
    unitFa: 'ریال/متر مربع',
    currencyLabel: 'ریال ایران',
    basePrice: 18500000,
    decimals: 0,
    change24h: +4.5,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 17800000, high: 18100000, low: 17700000, close: 18000000, volume: 280 },
          { time: '۱۱:۰۰', open: 18000000, high: 18350000, low: 17950000, close: 18250000, volume: 390 },
          { time: '۱۳:۰۰', open: 18250000, high: 18600000, low: 18200000, close: 18450000, volume: 460 },
          { time: '۱۵:۰۰', open: 18450000, high: 18700000, low: 18350000, close: 18500000, volume: 540 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 18000000, volume: 280 },
          { time: '۱۱:۰۰', price: 18250000, volume: 390 },
          { time: '۱۳:۰۰', price: 18450000, volume: 460 },
          { time: '۱۵:۰۰', price: 18500000, volume: 540 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 17500000, high: 17850000, low: 17400000, close: 17750000, volume: 1850 },
          { time: 'یکشنبه', open: 17750000, high: 18050000, low: 17650000, close: 17950000, volume: 2100 },
          { time: 'دوشنبه', open: 17950000, high: 18200000, low: 17850000, close: 18100000, volume: 1950 },
          { time: 'سه‌شنبه', open: 18100000, high: 18350000, low: 18000000, close: 18250000, volume: 2300 },
          { time: 'چهارشنبه', open: 18250000, high: 18600000, low: 18150000, close: 18550000, volume: 2650 },
          { time: 'پنجشنبه', open: 18550000, high: 18700000, low: 18400000, close: 18500000, volume: 1700 },
        ],
        trend: [
          { time: 'شنبه', price: 17750000, volume: 1850 },
          { time: 'یکشنبه', price: 17950000, volume: 2100 },
          { time: 'دوشنبه', price: 18100000, volume: 1950 },
          { time: 'سه‌شنبه', price: 18250000, volume: 2300 },
          { time: 'چهارشنبه', price: 18550000, volume: 2650 },
          { time: 'پنجشنبه', price: 18500000, volume: 1700 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 16800000, high: 17300000, low: 16600000, close: 17200000, volume: 8200 },
          { time: 'هفته ۲', open: 17200000, high: 17750000, low: 17100000, close: 17600000, volume: 9100 },
          { time: 'هفته ۳', open: 17600000, high: 18150000, low: 17450000, close: 18050000, volume: 9800 },
          { time: 'هفته ۴', open: 18050000, high: 18750000, low: 17950000, close: 18500000, volume: 11200 },
        ],
        trend: [
          { time: 'هفته ۱', price: 17200000, volume: 8200 },
          { time: 'هفته ۲', price: 17600000, volume: 9100 },
          { time: 'هفته ۳', price: 18050000, volume: 9800 },
          { time: 'هفته ۴', price: 18500000, volume: 11200 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 15800000, high: 16700000, low: 15600000, close: 16500000, volume: 27000 },
          { time: 'ماه دوم (مرداد)', open: 16500000, high: 17600000, low: 16350000, close: 17400000, volume: 31000 },
          { time: 'ماه سوم (شهریور)', open: 17400000, high: 18800000, low: 17250000, close: 18500000, volume: 36000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 16500000, volume: 27000 },
          { time: 'ماه دوم (مرداد)', price: 17400000, volume: 31000 },
          { time: 'ماه سوم (شهریور)', price: 18500000, volume: 36000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 14500000, high: 15200000, low: 14300000, close: 15000000, volume: 23000 },
          { time: 'اردیبهشت', open: 15000000, high: 15800000, low: 14850000, close: 15600000, volume: 26500 },
          { time: 'خرداد', open: 15600000, high: 16300000, low: 15400000, close: 16100000, volume: 28000 },
          { time: 'تیر', open: 16100000, high: 16900000, low: 15950000, close: 16750000, volume: 29500 },
          { time: 'مرداد', open: 16750000, high: 17700000, low: 16600000, close: 17500000, volume: 32000 },
          { time: 'شهریور', open: 17500000, high: 18800000, low: 17350000, close: 18500000, volume: 37500 },
        ],
        trend: [
          { time: 'فروردین', price: 15000000, volume: 23000 },
          { time: 'اردیبهشت', price: 15600000, volume: 26500 },
          { time: 'خرداد', price: 16100000, volume: 28000 },
          { time: 'تیر', price: 16750000, volume: 29500 },
          { time: 'مرداد', price: 17500000, volume: 32000 },
          { time: 'شهریور', price: 18500000, volume: 37500 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 13800000, high: 15400000, low: 13500000, close: 15100000, volume: 76000 },
          { time: 'تابستان ۱۴۰۴', open: 15100000, high: 16800000, low: 14900000, close: 16600000, volume: 88000 },
          { time: 'پاییز ۱۴۰۴', open: 16600000, high: 17800000, low: 16400000, close: 17500000, volume: 84000 },
          { time: 'زمستان ۱۴۰۴', open: 17500000, high: 18900000, low: 17200000, close: 18500000, volume: 97000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 15100000, volume: 76000 },
          { time: 'تابستان ۱۴۰۴', price: 16600000, volume: 88000 },
          { time: 'پاییز ۱۴۰۴', price: 17500000, volume: 84000 },
          { time: 'زمستان ۱۴۰۴', price: 18500000, volume: 97000 },
        ]
      }
    }
  }
];
