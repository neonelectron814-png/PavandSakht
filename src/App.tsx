/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { TabType, UserProfile } from './types';
import { Header } from './components/layout/Header';
import { AndroidBottomNav } from './components/layout/AndroidBottomNav';
import { QuickActionDrawer } from './components/layout/QuickActionDrawer';
import { SkeletonCard } from './components/common/SkeletonCard';
import { AuthView } from './components/auth/AuthView';
import { ShieldCheck } from 'lucide-react';

// Lazy loaded views for ultra-lightweight initial bundle and high performance
const MarketOverviewView = lazy(() =>
  import('./views/MarketOverviewView').then((m) => ({ default: m.MarketOverviewView }))
);
const PeyvandOmranView = lazy(() =>
  import('./views/PeyvandOmranView').then((m) => ({ default: m.PeyvandOmranView }))
);
const InstallmentsHubView = lazy(() =>
  import('./views/InstallmentsHubView').then((m) => ({ default: m.InstallmentsHubView }))
);
const CustomerRequestsView = lazy(() =>
  import('./views/CustomerRequestsView').then((m) => ({ default: m.CustomerRequestsView }))
);
const RentalsView = lazy(() =>
  import('./views/RentalsView').then((m) => ({ default: m.RentalsView }))
);
const TehatorEngineView = lazy(() =>
  import('./views/TehatorEngineView').then((m) => ({ default: m.TehatorEngineView }))
);
const SabtAsnadInquiryView = lazy(() =>
  import('./views/SabtAsnadInquiryView').then((m) => ({ default: m.SabtAsnadInquiryView }))
);
const CraftsmenRadarView = lazy(() =>
  import('./views/CraftsmenRadarView').then((m) => ({ default: m.CraftsmenRadarView }))
);
const IndustrialSuppliersView = lazy(() =>
  import('./views/IndustrialSuppliersView').then((m) => ({ default: m.IndustrialSuppliersView }))
);
const AnalyticsView = lazy(() =>
  import('./views/AnalyticsView').then((m) => ({ default: m.AnalyticsView }))
);

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('peyvand_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState<boolean>(false);
  const [inquiryCadastralCode, setInquiryCadastralCode] = useState<string>('1403-9821-4471-889102');

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
    try {
      localStorage.setItem('peyvand_user', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('peyvand_user');
    } catch {
      // ignore
    }
  };

  const handleSelectPropertyForInquiry = (code: string) => {
    setInquiryCadastralCode(code);
    setCurrentTab('sabt_asnad');
  };

  // Auth Gate: If user is not authenticated, display the Persian Login & Register view
  if (!user) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* Top Header & Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenQuickAction={() => setIsQuickActionOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 md:pb-12">
        <Suspense
          fallback={
            <div className="space-y-6">
              <SkeletonCard height="h-80" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SkeletonCard height="h-64" />
                <SkeletonCard height="h-64" />
                <SkeletonCard height="h-64" />
                <SkeletonCard height="h-64" />
              </div>
            </div>
          }
        >
          {currentTab === 'overview' && (
            <MarketOverviewView
              onNavigate={setCurrentTab}
              onSelectPropertyForInquiry={handleSelectPropertyForInquiry}
            />
          )}

          {currentTab === 'omran' && (
            <PeyvandOmranView searchQuery={searchQuery} />
          )}

          {currentTab === 'installments' && (
            <InstallmentsHubView searchQuery={searchQuery} />
          )}

          {currentTab === 'requests' && (
            <CustomerRequestsView searchQuery={searchQuery} />
          )}

          {currentTab === 'rentals' && (
            <RentalsView searchQuery={searchQuery} />
          )}

          {currentTab === 'tehator' && <TehatorEngineView />}

          {currentTab === 'sabt_asnad' && (
            <SabtAsnadInquiryView initialCadastralCode={inquiryCadastralCode} />
          )}

          {currentTab === 'craftsmen' && <CraftsmenRadarView />}

          {currentTab === 'industrial' && <IndustrialSuppliersView />}

          {currentTab === 'analytics' && <AnalyticsView />}
        </Suspense>
      </main>

      {/* Floating Android-Style Bottom Navigation for Mobile */}
      <AndroidBottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenQuickAction={() => setIsQuickActionOpen(true)}
      />

      {/* Android Quick Action Drawer / Bottom Sheet */}
      <QuickActionDrawer
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSelectTab={setCurrentTab}
      />

      {/* Clean Desktop Footer */}
      <footer className="hidden md:block border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900">
              پیوندساخت (آکانا)
            </span>
            <span className="text-slate-300">|</span>
            <span>پیوندساخت؛ اتصال هوشمندانه</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>پایگاه متصل به سامانه کاداستر سازمان ثبت اسناد و املاک کشور</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>تالار معاملات اقساطی، پیوند عمران و تهاتر</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
