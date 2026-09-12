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
  basePrice: number;
  decimals: number;
  change24h: number;
  timeframes: Record<TimeframeKey, AssetTimeframeData>;
}

export const ASSET_MARKET_DATA: AssetConfig[] = [
  {
    id: 'rebar_a3',
    nameFa: 'میلگرد ذوب‌آهن اصفهان (A3 سایز ۱۶)',
    category: 'materials',
    unitFa: 'هزار ت/کیلو',
    basePrice: 32.8,
    decimals: 2,
    change24h: +2.1,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 32.2, high: 32.5, low: 32.0, close: 32.4, volume: 380 },
          { time: '۱۰:۰۰', open: 32.4, high: 32.6, low: 32.2, close: 32.3, volume: 450 },
          { time: '۱۱:۰۰', open: 32.3, high: 32.7, low: 32.2, close: 32.5, volume: 520 },
          { time: '۱۲:۰۰', open: 32.5, high: 32.8, low: 32.4, close: 32.6, volume: 680 },
          { time: '۱۳:۰۰', open: 32.6, high: 32.9, low: 32.5, close: 32.7, volume: 610 },
          { time: '۱۴:۰۰', open: 32.7, high: 33.1, low: 32.6, close: 32.9, volume: 890 },
          { time: '۱۵:۰۰', open: 32.9, high: 33.0, low: 32.7, close: 32.8, volume: 740 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 32.4, volume: 380 },
          { time: '۱۰:۰۰', price: 32.3, volume: 450 },
          { time: '۱۱:۰۰', price: 32.5, volume: 520 },
          { time: '۱۲:۰۰', price: 32.6, volume: 680 },
          { time: '۱۳:۰۰', price: 32.7, volume: 610 },
          { time: '۱۴:۰۰', price: 32.9, volume: 890 },
          { time: '۱۵:۰۰', price: 32.8, volume: 740 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 31.8, high: 32.3, low: 31.6, close: 32.1, volume: 2100 },
          { time: 'یکشنبه', open: 32.1, high: 32.5, low: 32.0, close: 32.4, volume: 2450 },
          { time: 'دوشنبه', open: 32.4, high: 32.6, low: 32.2, close: 32.3, volume: 1980 },
          { time: 'سه‌شنبه', open: 32.3, high: 32.8, low: 32.3, close: 32.6, volume: 2700 },
          { time: 'چهارشنبه', open: 32.6, high: 33.0, low: 32.5, close: 32.9, volume: 3100 },
          { time: 'پنجشنبه', open: 32.9, high: 33.1, low: 32.7, close: 32.8, volume: 1850 },
        ],
        trend: [
          { time: 'شنبه', price: 32.1, volume: 2100 },
          { time: 'یکشنبه', price: 32.4, volume: 2450 },
          { time: 'دوشنبه', price: 32.3, volume: 1980 },
          { time: 'سه‌شنبه', price: 32.6, volume: 2700 },
          { time: 'چهارشنبه', price: 32.9, volume: 3100 },
          { time: 'پنجشنبه', price: 32.8, volume: 1850 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 30.5, high: 31.4, low: 30.2, close: 31.2, volume: 11500 },
          { time: 'هفته ۲', open: 31.2, high: 31.9, low: 31.0, close: 31.8, volume: 13200 },
          { time: 'هفته ۳', open: 31.8, high: 32.5, low: 31.5, close: 32.2, volume: 14800 },
          { time: 'هفته ۴', open: 32.2, high: 33.1, low: 32.0, close: 32.8, volume: 16500 },
        ],
        trend: [
          { time: 'هفته ۱', price: 31.2, volume: 11500 },
          { time: 'هفته ۲', price: 31.8, volume: 13200 },
          { time: 'هفته ۳', price: 32.2, volume: 14800 },
          { time: 'هفته ۴', price: 32.8, volume: 16500 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 29.0, high: 30.5, low: 28.8, close: 30.2, volume: 43000 },
          { time: 'ماه دوم (مرداد)', open: 30.2, high: 31.8, low: 29.9, close: 31.5, volume: 49500 },
          { time: 'ماه سوم (شهریور)', open: 31.5, high: 33.1, low: 31.2, close: 32.8, volume: 56000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 30.2, volume: 43000 },
          { time: 'ماه دوم (مرداد)', price: 31.5, volume: 49500 },
          { time: 'ماه سوم (شهریور)', price: 32.8, volume: 56000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 27.5, high: 28.6, low: 27.2, close: 28.3, volume: 38000 },
          { time: 'اردیبهشت', open: 28.3, high: 29.4, low: 28.1, close: 29.1, volume: 42000 },
          { time: 'خرداد', open: 29.1, high: 30.2, low: 28.9, close: 29.8, volume: 46000 },
          { time: 'تیر', open: 29.8, high: 30.9, low: 29.5, close: 30.6, volume: 45000 },
          { time: 'مرداد', open: 30.6, high: 31.9, low: 30.3, close: 31.6, volume: 51000 },
          { time: 'شهریور', open: 31.6, high: 33.1, low: 31.2, close: 32.8, volume: 58000 },
        ],
        trend: [
          { time: 'فروردین', price: 28.3, volume: 38000 },
          { time: 'اردیبهشت', price: 29.1, volume: 42000 },
          { time: 'خرداد', price: 29.8, volume: 46000 },
          { time: 'تیر', price: 30.6, volume: 45000 },
          { time: 'مرداد', price: 31.6, volume: 51000 },
          { time: 'شهریور', price: 32.8, volume: 58000 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 26.2, high: 29.0, low: 25.8, close: 28.6, volume: 128000 },
          { time: 'تابستان ۱۴۰۴', open: 28.6, high: 31.2, low: 28.2, close: 30.8, volume: 145000 },
          { time: 'پاییز ۱۴۰۴', open: 30.8, high: 32.0, low: 30.1, close: 31.5, volume: 139000 },
          { time: 'زمستان ۱۴۰۴', open: 31.5, high: 33.1, low: 31.0, close: 32.8, volume: 168000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 28.6, volume: 128000 },
          { time: 'تابستان ۱۴۰۴', price: 30.8, volume: 145000 },
          { time: 'پاییز ۱۴۰۴', price: 31.5, volume: 139000 },
          { time: 'زمستان ۱۴۰۴', price: 32.8, volume: 168000 },
        ]
      }
    }
  },
  {
    id: 'tehran_d1',
    nameFa: 'مسکن منطقه ۱ تهران (الهیه، نیاوران، زعفرانیه)',
    category: 'real_estate',
    unitFa: 'میلیون ت/متر',
    basePrice: 195.0,
    decimals: 1,
    change24h: +3.4,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 193.5, high: 194.5, low: 193.0, close: 194.0, volume: 42 },
          { time: '۱۱:۰۰', open: 194.0, high: 195.0, low: 193.8, close: 194.5, volume: 55 },
          { time: '۱۳:۰۰', open: 194.5, high: 195.8, low: 194.2, close: 195.2, volume: 68 },
          { time: '۱۵:۰۰', open: 195.2, high: 196.2, low: 194.8, close: 195.0, volume: 80 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 194.0, volume: 42 },
          { time: '۱۱:۰۰', price: 194.5, volume: 55 },
          { time: '۱۳:۰۰', price: 195.2, volume: 68 },
          { time: '۱۵:۰۰', price: 195.0, volume: 80 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 190.5, high: 192.0, low: 189.5, close: 191.5, volume: 180 },
          { time: 'یکشنبه', open: 191.5, high: 193.0, low: 191.0, close: 192.5, volume: 210 },
          { time: 'دوشنبه', open: 192.5, high: 193.8, low: 192.0, close: 193.0, volume: 195 },
          { time: 'سه‌شنبه', open: 193.0, high: 194.5, low: 192.5, close: 194.0, volume: 230 },
          { time: 'چهارشنبه', open: 194.0, high: 195.8, low: 193.5, close: 195.5, volume: 280 },
          { time: 'پنجشنبه', open: 195.5, high: 196.5, low: 194.5, close: 195.0, volume: 220 },
        ],
        trend: [
          { time: 'شنبه', price: 191.5, volume: 180 },
          { time: 'یکشنبه', price: 192.5, volume: 210 },
          { time: 'دوشنبه', price: 193.0, volume: 195 },
          { time: 'سه‌شنبه', price: 194.0, volume: 230 },
          { time: 'چهارشنبه', price: 195.5, volume: 280 },
          { time: 'پنجشنبه', price: 195.0, volume: 220 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 188.0, high: 191.5, low: 187.0, close: 190.5, volume: 680 },
          { time: 'هفته ۲', open: 190.5, high: 193.0, low: 189.8, close: 192.0, volume: 740 },
          { time: 'هفته ۳', open: 192.0, high: 194.5, low: 191.2, close: 193.8, volume: 810 },
          { time: 'هفته ۴', open: 193.8, high: 196.8, low: 193.0, close: 195.0, volume: 920 },
        ],
        trend: [
          { time: 'هفته ۱', price: 190.5, volume: 680 },
          { time: 'هفته ۲', price: 192.0, volume: 740 },
          { time: 'هفته ۳', price: 193.8, volume: 810 },
          { time: 'هفته ۴', price: 195.0, volume: 920 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 182.0, high: 188.0, low: 180.5, close: 186.5, volume: 2400 },
          { time: 'ماه دوم (مرداد)', open: 186.5, high: 192.5, low: 185.0, close: 190.8, volume: 2750 },
          { time: 'ماه سوم (شهریور)', open: 190.8, high: 197.0, low: 189.5, close: 195.0, volume: 3100 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 186.5, volume: 2400 },
          { time: 'ماه دوم (مرداد)', price: 190.8, volume: 2750 },
          { time: 'ماه سوم (شهریور)', price: 195.0, volume: 3100 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 172.0, high: 178.0, low: 170.0, close: 176.5, volume: 2100 },
          { time: 'اردیبهشت', open: 176.5, high: 181.5, low: 175.0, close: 180.0, volume: 2350 },
          { time: 'خرداد', open: 180.0, high: 185.0, low: 178.5, close: 183.5, volume: 2500 },
          { time: 'تیر', open: 183.5, high: 189.0, low: 182.0, close: 187.0, volume: 2600 },
          { time: 'مرداد', open: 187.0, high: 193.0, low: 185.5, close: 191.0, volume: 2900 },
          { time: 'شهریور', open: 191.0, high: 197.5, low: 189.8, close: 195.0, volume: 3250 },
        ],
        trend: [
          { time: 'فروردین', price: 176.5, volume: 2100 },
          { time: 'اردیبهشت', price: 180.0, volume: 2350 },
          { time: 'خرداد', price: 183.5, volume: 2500 },
          { time: 'تیر', price: 187.0, volume: 2600 },
          { time: 'مرداد', price: 191.0, volume: 2900 },
          { time: 'شهریور', price: 195.0, volume: 3250 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 165.0, high: 178.0, low: 162.0, close: 175.0, volume: 7200 },
          { time: 'تابستان ۱۴۰۴', open: 175.0, high: 188.0, low: 173.0, close: 185.0, volume: 8400 },
          { time: 'پاییز ۱۴۰۴', open: 185.0, high: 192.5, low: 183.0, close: 190.5, volume: 7900 },
          { time: 'زمستان ۱۴۰۴', open: 190.5, high: 198.0, low: 188.0, close: 195.0, volume: 9500 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 175.0, volume: 7200 },
          { time: 'تابستان ۱۴۰۴', price: 185.0, volume: 8400 },
          { time: 'پاییز ۱۴۰۴', price: 190.5, volume: 7900 },
          { time: 'زمستان ۱۴۰۴', price: 195.0, volume: 9500 },
        ]
      }
    }
  },
  {
    id: 'cement_type2',
    nameFa: 'سیمان تیپ ۲ تهران (کیسه ۵۰ کیلویی)',
    category: 'materials',
    unitFa: 'هزار ت/کیسه',
    basePrice: 82.0,
    decimals: 1,
    change24h: +1.2,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 80.5, high: 81.2, low: 80.0, close: 81.0, volume: 980 },
          { time: '۱۱:۰۰', open: 81.0, high: 81.8, low: 80.8, close: 81.5, volume: 1400 },
          { time: '۱۳:۰۰', open: 81.5, high: 82.4, low: 81.2, close: 82.1, volume: 1650 },
          { time: '۱۵:۰۰', open: 82.1, high: 82.6, low: 81.8, close: 82.0, volume: 1300 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 81.0, volume: 980 },
          { time: '۱۱:۰۰', price: 81.5, volume: 1400 },
          { time: '۱۳:۰۰', price: 82.1, volume: 1650 },
          { time: '۱۵:۰۰', price: 82.0, volume: 1300 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 79.5, high: 80.8, low: 79.0, close: 80.2, volume: 5400 },
          { time: 'یکشنبه', open: 80.2, high: 81.2, low: 80.0, close: 80.9, volume: 6100 },
          { time: 'دوشنبه', open: 80.9, high: 81.6, low: 80.5, close: 81.2, volume: 5800 },
          { time: 'سه‌شنبه', open: 81.2, high: 82.0, low: 81.0, close: 81.7, volume: 6600 },
          { time: 'چهارشنبه', open: 81.7, high: 82.5, low: 81.4, close: 82.3, volume: 7200 },
          { time: 'پنجشنبه', open: 82.3, high: 82.7, low: 81.8, close: 82.0, volume: 4900 },
        ],
        trend: [
          { time: 'شنبه', price: 80.2, volume: 5400 },
          { time: 'یکشنبه', price: 80.9, volume: 6100 },
          { time: 'دوشنبه', price: 81.2, volume: 5800 },
          { time: 'سه‌شنبه', price: 81.7, volume: 6600 },
          { time: 'چهارشنبه', price: 82.3, volume: 7200 },
          { time: 'پنجشنبه', price: 82.0, volume: 4900 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 77.0, high: 79.2, low: 76.5, close: 78.8, volume: 25000 },
          { time: 'هفته ۲', open: 78.8, high: 80.4, low: 78.2, close: 80.0, volume: 27500 },
          { time: 'هفته ۳', open: 80.0, high: 81.5, low: 79.5, close: 81.0, volume: 29000 },
          { time: 'هفته ۴', open: 81.0, high: 82.8, low: 80.5, close: 82.0, volume: 32000 },
        ],
        trend: [
          { time: 'هفته ۱', price: 78.8, volume: 25000 },
          { time: 'هفته ۲', price: 80.0, volume: 27500 },
          { time: 'هفته ۳', price: 81.0, volume: 29000 },
          { time: 'هفته ۴', price: 82.0, volume: 32000 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 73.0, high: 76.5, low: 72.0, close: 75.8, volume: 85000 },
          { time: 'ماه دوم (مرداد)', open: 75.8, high: 79.8, low: 75.0, close: 79.0, volume: 92000 },
          { time: 'ماه سوم (شهریور)', open: 79.0, high: 83.0, low: 78.5, close: 82.0, volume: 104000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 75.8, volume: 85000 },
          { time: 'ماه دوم (مرداد)', price: 79.0, volume: 92000 },
          { time: 'ماه سوم (شهریور)', price: 82.0, volume: 104000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 68.0, high: 71.0, low: 67.5, close: 70.2, volume: 76000 },
          { time: 'اردیبهشت', open: 70.2, high: 73.5, low: 69.8, close: 72.5, volume: 81000 },
          { time: 'خرداد', open: 72.5, high: 75.0, low: 71.8, close: 74.2, volume: 84000 },
          { time: 'تیر', open: 74.2, high: 77.2, low: 73.5, close: 76.8, volume: 88000 },
          { time: 'مرداد', open: 76.8, high: 80.0, low: 76.0, close: 79.5, volume: 94000 },
          { time: 'شهریور', open: 79.5, high: 83.0, low: 78.8, close: 82.0, volume: 105000 },
        ],
        trend: [
          { time: 'فروردین', price: 70.2, volume: 76000 },
          { time: 'اردیبهشت', price: 72.5, volume: 81000 },
          { time: 'خرداد', price: 74.2, volume: 84000 },
          { time: 'تیر', price: 76.8, volume: 88000 },
          { time: 'مرداد', price: 79.5, volume: 94000 },
          { time: 'شهریور', price: 82.0, volume: 105000 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 65.0, high: 72.0, low: 64.0, close: 70.5, volume: 240000 },
          { time: 'تابستان ۱۴۰۴', open: 70.5, high: 77.5, low: 69.5, close: 76.0, volume: 265000 },
          { time: 'پاییز ۱۴۰۴', open: 76.0, high: 80.5, low: 75.0, close: 79.2, volume: 255000 },
          { time: 'زمستان ۱۴۰۴', open: 79.2, high: 83.5, low: 78.0, close: 82.0, volume: 290000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 70.5, volume: 240000 },
          { time: 'تابستان ۱۴۰۴', price: 76.0, volume: 265000 },
          { time: 'پاییز ۱۴۰۴', price: 79.2, volume: 255000 },
          { time: 'زمستان ۱۴۰۴', price: 82.0, volume: 290000 },
        ]
      }
    }
  },
  {
    id: 'travertine_stone',
    nameFa: 'سنگ تراورتن عباس‌آباد (اسلب ممتاز نما)',
    category: 'materials',
    unitFa: 'هزار ت/متر',
    basePrice: 1850,
    decimals: 0,
    change24h: +4.5,
    timeframes: {
      day: {
        candles: [
          { time: '۰۹:۰۰', open: 1780, high: 1810, low: 1770, close: 1800, volume: 280 },
          { time: '۱۱:۰۰', open: 1800, high: 1835, low: 1795, close: 1825, volume: 390 },
          { time: '۱۳:۰۰', open: 1825, high: 1860, low: 1820, close: 1845, volume: 460 },
          { time: '۱۵:۰۰', open: 1845, high: 1870, low: 1835, close: 1850, volume: 540 },
        ],
        trend: [
          { time: '۰۹:۰۰', price: 1800, volume: 280 },
          { time: '۱۱:۰۰', price: 1825, volume: 390 },
          { time: '۱۳:۰۰', price: 1845, volume: 460 },
          { time: '۱۵:۰۰', price: 1850, volume: 540 },
        ]
      },
      week: {
        candles: [
          { time: 'شنبه', open: 1750, high: 1785, low: 1740, close: 1775, volume: 1850 },
          { time: 'یکشنبه', open: 1775, high: 1805, low: 1765, close: 1795, volume: 2100 },
          { time: 'دوشنبه', open: 1795, high: 1820, low: 1785, close: 1810, volume: 1950 },
          { time: 'سه‌شنبه', open: 1810, high: 1835, low: 1800, close: 1825, volume: 2300 },
          { time: 'چهارشنبه', open: 1825, high: 1860, low: 1815, close: 1855, volume: 2650 },
          { time: 'پنجشنبه', open: 1855, high: 1870, low: 1840, close: 1850, volume: 1700 },
        ],
        trend: [
          { time: 'شنبه', price: 1775, volume: 1850 },
          { time: 'یکشنبه', price: 1795, volume: 2100 },
          { time: 'دوشنبه', price: 1810, volume: 1950 },
          { time: 'سه‌شنبه', price: 1825, volume: 2300 },
          { time: 'چهارشنبه', price: 1855, volume: 2650 },
          { time: 'پنجشنبه', price: 1850, volume: 1700 },
        ]
      },
      month: {
        candles: [
          { time: 'هفته ۱', open: 1680, high: 1730, low: 1660, close: 1720, volume: 8200 },
          { time: 'هفته ۲', open: 1720, high: 1775, low: 1710, close: 1760, volume: 9100 },
          { time: 'هفته ۳', open: 1760, high: 1815, low: 1745, close: 1805, volume: 9800 },
          { time: 'هفته ۴', open: 1805, high: 1875, low: 1795, close: 1850, volume: 11200 },
        ],
        trend: [
          { time: 'هفته ۱', price: 1720, volume: 8200 },
          { time: 'هفته ۲', price: 1760, volume: 9100 },
          { time: 'هفته ۳', price: 1805, volume: 9800 },
          { time: 'هفته ۴', price: 1850, volume: 11200 },
        ]
      },
      '3month': {
        candles: [
          { time: 'ماه اول (تیر)', open: 1580, high: 1670, low: 1560, close: 1650, volume: 27000 },
          { time: 'ماه دوم (مرداد)', open: 1650, high: 1760, low: 1635, close: 1740, volume: 31000 },
          { time: 'ماه سوم (شهریور)', open: 1740, high: 1880, low: 1725, close: 1850, volume: 36000 },
        ],
        trend: [
          { time: 'ماه اول (تیر)', price: 1650, volume: 27000 },
          { time: 'ماه دوم (مرداد)', price: 1740, volume: 31000 },
          { time: 'ماه سوم (شهریور)', price: 1850, volume: 36000 },
        ]
      },
      '6month': {
        candles: [
          { time: 'فروردین', open: 1450, high: 1520, low: 1430, close: 1500, volume: 23000 },
          { time: 'اردیبهشت', open: 1500, high: 1580, low: 1485, close: 1560, volume: 26500 },
          { time: 'خرداد', open: 1560, high: 1630, low: 1540, close: 1610, volume: 28000 },
          { time: 'تیر', open: 1610, high: 1690, low: 1595, close: 1675, volume: 29500 },
          { time: 'مرداد', open: 1675, high: 1770, low: 1660, close: 1750, volume: 32000 },
          { time: 'شهریور', open: 1750, high: 1880, low: 1735, close: 1850, volume: 37500 },
        ],
        trend: [
          { time: 'فروردین', price: 1500, volume: 23000 },
          { time: 'اردیبهشت', price: 1560, volume: 26500 },
          { time: 'خرداد', price: 1610, volume: 28000 },
          { time: 'تیر', price: 1675, volume: 29500 },
          { time: 'مرداد', price: 1750, volume: 32000 },
          { time: 'شهریور', price: 1850, volume: 37500 },
        ]
      },
      year: {
        candles: [
          { time: 'بهار ۱۴۰۴', open: 1380, high: 1540, low: 1350, close: 1510, volume: 76000 },
          { time: 'تابستان ۱۴۰۴', open: 1510, high: 1680, low: 1490, close: 1660, volume: 88000 },
          { time: 'پاییز ۱۴۰۴', open: 1660, high: 1780, low: 1640, close: 1750, volume: 84000 },
          { time: 'زمستان ۱۴۰۴', open: 1750, high: 1890, low: 1720, close: 1850, volume: 97000 },
        ],
        trend: [
          { time: 'بهار ۱۴۰۴', price: 1510, volume: 76000 },
          { time: 'تابستان ۱۴۰۴', price: 1660, volume: 88000 },
          { time: 'پاییز ۱۴۰۴', price: 1750, volume: 84000 },
          { time: 'زمستان ۱۴۰۴', price: 1850, volume: 97000 },
        ]
      }
    }
  }
];
