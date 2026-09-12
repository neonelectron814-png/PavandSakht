import React, { useState, useRef, useEffect } from 'react';
import { TabType, UserProfile } from '../../types';
import { 
  Building2, 
  Repeat, 
  ShieldCheck, 
  MapPin, 
  Factory, 
  LineChart, 
  Search, 
  Layers,
  Plus,
  X,
  User,
  LogOut,
  Calendar,
  CreditCard,
  Phone,
  HardHat,
  Zap,
  Key
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenQuickAction: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenQuickAction,
  searchQuery,
  onSearchChange,
  user,
  onLogout,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mouse Drag-to-Scroll & Horizontal Wheel Logic
  const navRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const isPointerDown = useRef(false);
  const draggedFarEnough = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.button !== 0 || !navRef.current) return;
    isPointerDown.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = navRef.current.scrollLeft;
    draggedFarEnough.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isPointerDown.current || !navRef.current) return;
      const deltaX = e.clientX - dragStartX.current;
      if (Math.abs(deltaX) > 4) {
        if (!draggedFarEnough.current) {
          draggedFarEnough.current = true;
          setIsDragging(true);
        }
      }
      if (draggedFarEnough.current) {
        navRef.current.scrollLeft = dragStartScrollLeft.current - deltaX;
      }
    };

    const handleGlobalMouseUp = () => {
      if (isPointerDown.current) {
        isPointerDown.current = false;
        setIsDragging(false);
        setTimeout(() => {
          draggedFarEnough.current = false;
        }, 80);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Smooth wheel support to scroll horizontally
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const navItems: { id: TabType; labelFa: string; icon: React.ReactNode }[] = [
    { id: 'overview', labelFa: 'نمای بازار', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'omran', labelFa: 'پیوند عمران', icon: <HardHat className="w-3.5 h-3.5" /> },
    { id: 'installments', labelFa: 'اقساطی', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'requests', labelFa: 'تقاضای مشتری', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'rentals', labelFa: 'رهن و اجاره', icon: <Key className="w-3.5 h-3.5" /> },
    { id: 'tehator', labelFa: 'تالار تهاتر', icon: <Repeat className="w-3.5 h-3.5" /> },
    { id: 'sabt_asnad', labelFa: 'استعلام کاداستر', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'analytics', labelFa: 'تحلیل قیمت', icon: <LineChart className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-transparent pt-2.5 sm:pt-3 px-3 sm:px-6 pointer-events-none transition-all">
        <div className="pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2.5 sm:gap-4 transition-all">
          {/* Mobile Search Overlay when expanded */}
          {isMobileSearchOpen ? (
            <div className="flex-1 flex items-center gap-2 animate-in fade-in duration-150">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="جستجوی ملک، ماشین‌آلات، اقساطی، کاداستر..."
                  className="w-full pr-9 pl-4 py-2 text-xs rounded-full bg-slate-100 border border-slate-200 focus:outline-hidden focus:border-emerald-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  onSearchChange('');
                }}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                aria-label="بستن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Brand Logo & Title with Android rounded styling */}
              <div 
                className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 select-none active:scale-95 transition-transform" 
                onClick={() => onTabChange('overview')}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 shadow-xs">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                    پیوند<span className="text-emerald-600">ساخت</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium hidden sm:inline-block mt-0.5">
                    آکانا (اتصال هوشمندانه)
                  </span>
                </div>
              </div>

              {/* Desktop Navigation Tabs - Grab and Drag to Scroll Horizontally with Mouse */}
              <nav
                ref={navRef}
                onMouseDown={handleMouseDown}
                className={`hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 overflow-x-auto max-w-xl xl:max-w-2xl scrollbar-none select-none touch-pan-x transition-[cursor] ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                title="برای پیمایش سریع، با کلیک و کشیدن ماوس به چپ یا راست حرکت کنید"
              >
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-tab-${item.id}`}
                      draggable={false}
                      onClick={(e) => {
                        if (draggedFarEnough.current) {
                          e.preventDefault();
                          e.stopPropagation();
                          return;
                        }
                        onTabChange(item.id);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap flex items-center gap-1.5 select-none active:scale-95 ${
                        isDragging ? 'pointer-events-auto' : 'cursor-pointer'
                      } ${
                        isActive
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span className="select-none pointer-events-none">{item.labelFa}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Right Controls: Search Pill & Android Action Button & User Profile */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Desktop Search Pill */}
                <div className="relative hidden md:block w-36 lg:w-44">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="جستجو در سامانه..."
                    className="w-full pr-8 pl-3 py-1.5 text-xs rounded-full bg-slate-100 border border-slate-200/80 focus:border-emerald-500 focus:bg-white focus:outline-hidden text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Mobile Search Trigger Icon */}
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-90 transition-transform cursor-pointer"
                  aria-label="باز کردن جستجو"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Quick Action Button - Hidden on mobile/Android since floating bottom bar has it */}
                <button
                  id="header-quick-action-btn"
                  onClick={onOpenQuickAction}
                  className="hidden md:flex px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>میز کار</span>
                </button>

                {/* Logged in User Profile Pill */}
                {user && (
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 transition-colors cursor-pointer shrink-0"
                    title="مشاهده اطلاعات حساب کاربری"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.fullName ? user.fullName.charAt(0) : <User className="w-3 h-3" />}
                    </div>
                    <span className="text-[11px] font-bold text-slate-800 max-w-[80px] sm:max-w-[110px] truncate hidden xs:inline-block">
                      {user.fullName || user.mobile}
                    </span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* User Profile Modal */}
      {isProfileModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">مشخصات کاربر احراز هویت شده</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {user.fullName ? user.fullName.charAt(0) : <User className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{user.fullName || 'کاربر پیوندساخت'}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">حساب کاربری رسمی تایید شده</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">شماره موبایل:</span>
                  <span className="font-mono font-bold text-slate-900" dir="ltr">{user.mobile}</span>
                </div>
                {user.nationalCode && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">کد ملی:</span>
                    <span className="font-mono font-bold text-slate-900" dir="ltr">{user.nationalCode}</span>
                  </div>
                )}
                {user.birthDate && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">تاریخ تولد:</span>
                    <span className="font-bold text-slate-900">{user.birthDate}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">وضعیت استعلام کاداستر:</span>
                  <span className="text-emerald-600 font-bold">مجاز به ثبت معامله</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  onLogout();
                }}
                className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج از حساب کاربری</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
