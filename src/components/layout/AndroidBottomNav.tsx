import React from 'react';
import { TabType } from '../../types';
import { motion } from 'motion/react';
import { 
  Building2, 
  Repeat, 
  ShieldCheck, 
  MapPin, 
  LineChart, 
  Plus, 
  Factory 
} from 'lucide-react';

interface AndroidBottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenQuickAction: () => void;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenQuickAction,
}) => {
  // Mobile tabs
  const tabs: { id: TabType; labelFa: string; icon: React.ReactNode }[] = [
    { id: 'overview', labelFa: 'بازار', icon: <Building2 className="w-5 h-5" /> },
    { id: 'tehator', labelFa: 'تهاتر', icon: <Repeat className="w-5 h-5" /> },
    { id: 'craftsmen', labelFa: 'رادار', icon: <MapPin className="w-5 h-5" /> },
    { id: 'sabt_asnad', labelFa: 'سند', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'analytics', labelFa: 'تحلیل', icon: <LineChart className="w-5 h-5" /> },
  ];

  const handleTabClick = (tabId: TabType) => {
    // Simulate Android light haptic feedback vibration if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Safe ignore
      }
    }
    onTabChange(tabId);
  };

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
      <nav 
        id="android-bottom-nav-bar"
        className="pointer-events-auto mx-auto max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-1.5 shadow-2xl flex items-center justify-between text-white transition-all"
      >
        {tabs.slice(0, 2).map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              whileTap={{ scale: 0.88 }}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.18 : 1,
                    y: isActive ? -3 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 17,
                  }}
                  className="flex items-center justify-center"
                >
                  {tab.icon}
                </motion.div>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] mt-1.5 tracking-tight transition-colors ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                {tab.labelFa}
              </span>
            </motion.button>
          );
        })}

        {/* Center Quick Action (Plus) Button in regular in-line alignment */}
        <motion.button
          id="android-fab-center-btn"
          onClick={onOpenQuickAction}
          whileTap={{ scale: 0.88, rotate: 90 }}
          className="flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer text-emerald-400 hover:text-emerald-300 active:bg-white/5"
          aria-label="ثبت و اقدام سریع"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xs">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[10px] mt-1.5 tracking-tight font-semibold text-emerald-400">
            ثبت
          </span>
        </motion.button>

        {tabs.slice(2).map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              whileTap={{ scale: 0.88 }}
              className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.18 : 1,
                    y: isActive ? -3 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 17,
                  }}
                  className="flex items-center justify-center"
                >
                  {tab.icon}
                </motion.div>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] mt-1.5 tracking-tight transition-colors ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                {tab.labelFa}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};
