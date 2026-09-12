/**
 * Persian Utility Functions: Numerals, Currency (Iranian Rial), and Solar Hijri Calendar
 */

// Convert any string or number containing Latin digits (0-9) to Persian digits (۰-۹)
export function toPersianDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  const str = String(input);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

// Format number to Iranian Rial with full transparency and Persian digits
export function formatRial(amount: number | null | undefined, includeUnit: boolean = true): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '۰ ریال';
  const rounded = Math.round(amount);
  const formatted = toPersianDigits(rounded.toLocaleString('en-US'));
  return includeUnit ? `${formatted} ریال` : formatted;
}

// Format Solar Hijri Date for Android Material UI
export function getPersianCurrentDate() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    
    return {
      fullDate: formatter.format(now),
      time: timeFormatter.format(now),
      year: new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(now),
      month: new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long' }).format(now),
      day: new Intl.DateTimeFormat('fa-IR-u-ca-persian', { day: 'numeric' }).format(now),
      weekday: new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long' }).format(now),
    };
  } catch {
    return {
      fullDate: 'شنبه ۲۲ شهریور ۱۴۰۴',
      time: '۱۵:۳۰',
      year: '۱۴۰۴',
      month: 'شهریور',
      day: '۲۲',
      weekday: 'شنبه',
    };
  }
}
