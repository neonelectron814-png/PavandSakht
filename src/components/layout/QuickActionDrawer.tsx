import React from 'react';
import { TabType } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Repeat, 
  MapPin, 
  Flame, 
  ArrowLeft, 
  PlusCircle, 
  FileText,
  Truck,
  HardHat,
  CreditCard,
  Zap,
  Key,
  Factory,
  LineChart
} from 'lucide-react';

interface QuickActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  onOpenNewBarterModal?: () => void;
}

export const QuickActionDrawer: React.FC<QuickActionDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const handleAction = (tab: TabType) => {
    onSelectTab(tab);
    onClose();
  };

  const actions: {
    tab: TabType;
    titleFa: string;
    descFa: string;
    icon: React.ReactNode;
    colorBg: string;
    colorText: string;
  }[] = [
    {
      tab: 'omran',
      titleFa: 'پیوند عمران و راهسازی',
      descFa: 'تامین و اجاره ماشین‌آلات سنگین، لودر، بیل مکانیکی و معادن',
      icon: <HardHat className="w-5 h-5" />,
      colorBg: 'bg-amber-100 text-amber-800',
      colorText: 'group-hover:text-amber-700'
    },
    {
      tab: 'installments',
      titleFa: 'تالار اقساطی مصالح و مسکن',
      descFa: 'خرید اعتباری با استعلام آنلاین چک صیادی بنفش',
      icon: <CreditCard className="w-5 h-5" />,
      colorBg: 'bg-emerald-100 text-emerald-800',
      colorText: 'group-hover:text-emerald-700'
    },
    {
      tab: 'requests',
      titleFa: 'درخواست‌های فوری خریداران',
      descFa: 'تطبیق هوشمند تقاضای حجم مصالح با تولیدکنندگان و انبارها',
      icon: <Zap className="w-5 h-5" />,
      colorBg: 'bg-indigo-100 text-indigo-800',
      colorText: 'group-hover:text-indigo-700'
    },
    {
      tab: 'rentals',
      titleFa: 'پورتال رهن و اجاره املاک',
      descFa: 'تبادل فایل دفاتر املاک با متقاضیان بر اساس مترو و مدارس',
      icon: <Key className="w-5 h-5" />,
      colorBg: 'bg-blue-100 text-blue-800',
      colorText: 'group-hover:text-blue-700'
    },
    {
      tab: 'tehator',
      titleFa: 'تالار تهاتر و معاوضه مصالح',
      descFa: 'معاوضه ملک با میلگرد و سیمان و تخفیف‌های نرخ‌شکن فوری',
      icon: <Repeat className="w-5 h-5" />,
      colorBg: 'bg-teal-100 text-teal-800',
      colorText: 'group-hover:text-teal-700'
    },
    {
      tab: 'sabt_asnad',
      titleFa: 'استعلام کاداستر ثبت اسناد',
      descFa: 'تطبیق کد کاداستر ۱۸ رقمی، بررسی رهن بانک و بازداشت قضایی',
      icon: <ShieldCheck className="w-5 h-5" />,
      colorBg: 'bg-slate-100 text-slate-800',
      colorText: 'group-hover:text-slate-900'
    },
    {
      tab: 'craftsmen',
      titleFa: 'رادار اعزام فوری استادکاران',
      descFa: 'اعزام آنلاین بنا، جوشکار، گچ‌کار، لوله‌کش و اکیپ بتن‌ریزی',
      icon: <MapPin className="w-5 h-5" />,
      colorBg: 'bg-rose-100 text-rose-800',
      colorText: 'group-hover:text-rose-700'
    },
    {
      tab: 'analytics',
      titleFa: 'مرکز تحلیل قیمت و کندل‌استیک',
      descFa: 'رصد نمودارهای تعاملی بورس کالا و شمع‌های ژاپنی مسکن',
      icon: <LineChart className="w-5 h-5" />,
      colorBg: 'bg-purple-100 text-purple-800',
      colorText: 'group-hover:text-purple-700'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl p-6 z-10 animate-in slide-in-from-bottom-6 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Android drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">میز کار و دسترسی سریع پیوندساخت</h3>
            <p className="text-xs text-slate-500">انجام مستقیم عملیات در تالارهای تخصصی سامانه</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act) => (
            <button
              key={act.tab}
              onClick={() => handleAction(act.tab)}
              className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:bg-emerald-50/30 text-right transition-all group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-2xl ${act.colorBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                {act.icon}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-bold text-slate-900 flex items-center justify-between gap-1 ${act.colorText}`}>
                  <span>{act.titleFa}</span>
                  <ArrowLeft className="w-3 h-3 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {act.descFa}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
