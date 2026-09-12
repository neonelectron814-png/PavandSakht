import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../../types';
import { 
  Phone, 
  User, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Layers,
  Lock
} from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

// Persian months list
const JALALI_MONTHS = [
  { value: 1, name: 'فروردین' },
  { value: 2, name: 'اردیبهشت' },
  { value: 3, name: 'خرداد' },
  { value: 4, name: 'تیر' },
  { value: 5, name: 'مرداد' },
  { value: 6, name: 'شهریور' },
  { value: 7, name: 'مهر' },
  { value: 8, name: 'آبان' },
  { value: 9, name: 'آذر' },
  { value: 10, name: 'دی' },
  { value: 11, name: 'بهمن' },
  { value: 12, name: 'اسفند' },
];

// Generate years from 1320 to 1390
const JALALI_YEARS = Array.from({ length: 71 }, (_, i) => 1390 - i);

// Helper to convert Persian/Arabic numerals to standard ASCII
const normalizeDigits = (str: string): string => {
  return str
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
};

// Iranian national code validation algorithm
const isValidIranianNationalCode = (code: string): boolean => {
  const cleanCode = normalizeDigits(code).trim();
  if (!/^\d{10}$/.test(cleanCode)) return false;
  if (/^(\d)\1{9}$/.test(cleanCode)) return false; // Reject all identical digits like 1111111111

  const check = parseInt(cleanCode[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCode[i], 10) * (10 - i);
  }
  const remainder = sum % 11;
  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
};

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form states
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  
  // Solar Hijri birth date states
  const [birthYear, setBirthYear] = useState<number>(1370);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(15);

  // OTP states (4 digits)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [countdown, setCountdown] = useState<number>(60);
  const [mockOtp, setMockOtp] = useState<string>('4829');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  // Generate random 4-digit OTP for testing
  const sendNewOtp = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setMockOtp(randomCode);
    setCountdown(60);
    setOtpDigits(['', '', '', '']);
    setErrorMsg('');
  };

  // Submit initial form (Login or Register)
  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanMobile = normalizeDigits(mobile).trim();
    if (!/^09\d{9}$/.test(cleanMobile)) {
      setErrorMsg('لطفاً شماره موبایل ۱۱ رقمی معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }

    if (mode === 'register') {
      if (!fullName.trim() || fullName.trim().length < 3) {
        setErrorMsg('لطفاً نام و نام خانوادگی خود را کامل وارد کنید');
        return;
      }

      const cleanNatCode = normalizeDigits(nationalCode).trim();
      if (!isValidIranianNationalCode(cleanNatCode)) {
        setErrorMsg('کد ملی ۱۰ رقمی وارد شده صحیح نمی‌باشد');
        return;
      }
    }

    // Move to OTP step
    sendNewOtp();
    setStep('otp');
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const normalized = normalizeDigits(val).replace(/\D/g, '');
    const newOtp = [...otpDigits];

    if (normalized.length > 0) {
      newOtp[index] = normalized.slice(-1);
      setOtpDigits(newOtp);
      // Auto advance to next input
      if (index < 3 && otpInputsRef.current[index + 1]) {
        otpInputsRef.current[index + 1]?.focus();
      }
    } else {
      newOtp[index] = '';
      setOtpDigits(newOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Auto fill mock OTP for testing convenience
  const handleAutoFillMockOtp = () => {
    const chars = mockOtp.split('');
    setOtpDigits(chars);
    setErrorMsg('');
  };

  // Verify OTP and complete login/register
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length < 4) {
      setErrorMsg('لطفاً کد تایید ۴ رقمی را به‌طور کامل وارد کنید');
      return;
    }

    if (enteredCode !== mockOtp) {
      setErrorMsg('کد تایید وارد شده نادرست است');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedMonthName = JALALI_MONTHS.find((m) => m.value === birthMonth)?.name || '';
      const birthDateStr = `${birthDay} ${selectedMonthName} ${birthYear}`;

      const userProfile: UserProfile = {
        mobile: normalizeDigits(mobile).trim(),
        fullName: mode === 'register' ? fullName.trim() : (fullName.trim() || 'کاربر پیوندساخت'),
        nationalCode: mode === 'register' ? normalizeDigits(nationalCode).trim() : undefined,
        birthDateJalali: mode === 'register' ? birthDateStr : undefined,
        registeredAt: new Date().toISOString(),
      };

      onLoginSuccess(userProfile);
    }, 400);
  };

  // Days in selected Jalali month (1-6 have 31 days, 7-11 have 30 days, 12 has 29 or 30)
  const maxDays = birthMonth <= 6 ? 31 : birthMonth <= 11 ? 30 : 29;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased text-slate-900" dir="rtl">
      {/* Background aesthetic decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Branding */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
            <Layers className="w-7 h-7" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            سامانه جامع <span className="text-emerald-400">پیوندساخت</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            ورود امن و احراز هویت متمرکز معامله‌گران، مهندسان و تامین‌کنندگان
          </p>

          {/* Mode Switch Tabs (Login / Register) */}
          {step === 'form' && (
            <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-2xl border border-slate-700/60 mt-5 w-full max-w-xs">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ورود با موبایل
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ثبت‌نام جدید
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'form' ? (
            /* Form Step: Mobile or Full Registration */
            <form onSubmit={handleProceedToOtp} className="space-y-4">
              {mode === 'register' && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>نام و نام خانوادگی</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: مهندس احسان صادقی"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs text-slate-900 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* National ID (کد ملی) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>کد ملی (۱۰ رقمی)</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                      placeholder="مثال: ۰۰۱۸۴۵۲۳۱۰"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs text-slate-900 transition-all font-mono tracking-wider placeholder:text-slate-400"
                    />
                  </div>

                  {/* Jalali Birth Date (تاریخ تولد شمسی) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>تاریخ تولد (شمسی)</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        {birthDay} {JALALI_MONTHS.find((m) => m.value === birthMonth)?.name} {birthYear}
                      </span>
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {/* Day */}
                      <div>
                        <select
                          value={birthDay}
                          onChange={(e) => setBirthDay(Number(e.target.value))}
                          className="w-full px-2 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-hidden cursor-pointer"
                        >
                          {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <span className="block text-[10px] text-slate-400 text-center mt-1">روز</span>
                      </div>

                      {/* Month */}
                      <div>
                        <select
                          value={birthMonth}
                          onChange={(e) => {
                            const newMonth = Number(e.target.value);
                            setBirthMonth(newMonth);
                            if (newMonth > 6 && birthDay > 30) {
                              setBirthDay(30);
                            }
                          }}
                          className="w-full px-2 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-hidden cursor-pointer"
                        >
                          {JALALI_MONTHS.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                        <span className="block text-[10px] text-slate-400 text-center mt-1">ماه</span>
                      </div>

                      {/* Year */}
                      <div>
                        <select
                          value={birthYear}
                          onChange={(e) => setBirthYear(Number(e.target.value))}
                          className="w-full px-2 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-hidden cursor-pointer font-mono"
                        >
                          {JALALI_YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                        <span className="block text-[10px] text-slate-400 text-center mt-1">سال</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Mobile Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>شماره تلفن همراه</span>
                  </span>
                  <span className="text-[10px] text-slate-400">مثال: ۰۹۱۲۳۴۵۶۷۸۹</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="۰۹xxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-sm text-slate-900 transition-all font-mono tracking-wider placeholder:text-slate-400 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer mt-3"
              >
                <span>دریافت کد تایید ۴ رقمی</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>

              <div className="pt-2 text-center">
                {mode === 'login' ? (
                  <p className="text-xs text-slate-500">
                    حساب کاربری ندارید؟{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setErrorMsg('');
                      }}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      ثبت‌نام با کدملی و تاریخ تولد
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    قبلاً ثبت‌نام کرده‌اید؟{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setErrorMsg('');
                      }}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      ورود با شماره موبایل
                    </button>
                  </p>
                )}
              </div>
            </form>
          ) : (
            /* OTP Verification Step */
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">تایید شماره موبایل</h3>
                <p className="text-xs text-slate-500">
                  کد تایید ۴ رقمی پیامک شده به شماره{' '}
                  <strong className="font-mono text-slate-800" dir="ltr">{mobile}</strong> را وارد نمایید.
                </p>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer inline-block mt-1"
                >
                  ویرایش شماره موبایل
                </button>
              </div>

              {/* Mock OTP Helper Badge for Quick Testing */}
              <div 
                onClick={handleAutoFillMockOtp}
                className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
                title="برای درج خودکار کلیک کنید"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-900 font-bold block">کد تایید آزمایشی پیامک:</span>
                    <span className="text-[10px] text-emerald-700">کلیک کنید تا خودکار درج شود</span>
                  </div>
                </div>
                <span className="font-mono font-black text-emerald-800 text-base tracking-widest px-2.5 py-1 rounded-xl bg-white border border-emerald-300">
                  {mockOtp}
                </span>
              </div>

              {/* 4-digit OTP Inputs */}
              <div className="flex items-center justify-center gap-3" dir="ltr">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold font-mono rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:outline-hidden shadow-2xs transition-all text-slate-900"
                  />
                ))}
              </div>

              {/* Countdown & Resend */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                {countdown > 0 ? (
                  <span>
                    ارسال مجدد تا <strong className="font-mono text-slate-700">{countdown}</strong> ثانیه دیگر
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={sendNewOtp}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>ارسال مجدد کد تایید</span>
                  </button>
                )}
                <span className="text-slate-400 text-[11px]">رمز ۴ رقمی</span>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تایید کد و ورود به پنل سامانه</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Security Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>اتصال ایمن و احراز هویت هوشمند سامانه پیوندساخت</span>
          </div>
        </div>
      </div>
    </div>
  );
};
