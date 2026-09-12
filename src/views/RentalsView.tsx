import React, { useState, useMemo } from 'react';
import { RENTAL_LISTINGS_DATA, TENANT_REQUESTS_DATA } from '../data/mockData';
import { RentalListingItem, TenantRequestItem } from '../types';
import { 
  Key, 
  Home, 
  Building2, 
  Search, 
  Filter, 
  Train, 
  GraduationCap, 
  Car, 
  ArrowUpDown, 
  PlusCircle, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  X, 
  Send,
  UserCheck,
  Tag
} from 'lucide-react';

interface RentalsViewProps {
  searchQuery?: string;
}

export const RentalsView: React.FC<RentalsViewProps> = ({ searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'tenant_requests'>('listings');
  const [rentalListings, setRentalListings] = useState<RentalListingItem[]>(RENTAL_LISTINGS_DATA);
  const [tenantRequests, setTenantRequests] = useState<TenantRequestItem[]>(TENANT_REQUESTS_DATA);

  // Filters for listings
  const [onlyNearMetro, setOnlyNearMetro] = useState(false);
  const [onlyNearSchool, setOnlyNearSchool] = useState(false);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('all');

  // Modals
  const [isAddRentalOpen, setIsAddRentalOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [contactRental, setContactRental] = useState<RentalListingItem | null>(null);

  // Filtered listings
  const filteredListings = useMemo(() => {
    return rentalListings.filter((item) => {
      const matchesSearch = 
        !searchQuery ||
        item.titleFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.neighborhoodFa.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = propertyTypeFilter === 'all' || item.propertyType === propertyTypeFilter;
      const matchesMetro = !onlyNearMetro || item.proximityMetro;
      const matchesSchool = !onlyNearSchool || item.proximitySchool;

      return matchesSearch && matchesType && matchesMetro && matchesSchool;
    });
  }, [rentalListings, searchQuery, propertyTypeFilter, onlyNearMetro, onlyNearSchool]);

  // Filtered tenant requests
  const filteredRequests = useMemo(() => {
    return tenantRequests.filter((req) => {
      return (
        !searchQuery ||
        req.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.preferredNeighborhoodFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.propertyTypeFa.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [tenantRequests, searchQuery]);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>پورتال دوسویه رهن و اجاره پیوندساخت</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              سامانه تبادل فایل‌های اجاره مسکونی و تقاضای مستاجرین
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              ارتباط مستقیم دفاتر املاک و مالکان با متقاضیان رهن و اجاره، تفکیک‌شده بر اساس دسترسی به ایستگاه‌های مترو، مدارس و سقف بودجه.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAddRentalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>سپردن فایل اجاره</span>
            </button>
            <button
              onClick={() => setIsAddRequestOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>ثبت درخواست مستاجر</span>
            </button>
          </div>
        </div>

        {/* Tab switcher: Listings vs Tenant Requests */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'listings'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-600" />
              <span>املاک استیجاری موجود ({rentalListings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('tenant_requests')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tenant_requests'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>تقاضای متقاضیان و مستاجرین ({tenantRequests.length})</span>
            </button>
          </div>

          {/* Quick filters for listings */}
          {activeTab === 'listings' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setOnlyNearMetro(!onlyNearMetro)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyNearMetro
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>نزدیک مترو</span>
              </button>

              <button
                onClick={() => setOnlyNearSchool(!onlyNearSchool)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyNearSchool
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>نزدیک مدارس</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'listings' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredListings.map((rental) => (
            <div
              key={rental.id}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={rental.imageUrl}
                  alt={rental.titleFa}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {rental.propertyTypeFa}
                  </span>
                  {rental.isConvertible && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold">
                      قابل تبدیل
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{rental.neighborhoodFa}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                    {rental.titleFa}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span>{rental.areaSqM} مترمربع</span>
                    <span>{rental.bedrooms} خواب</span>
                    <span>طبقه {rental.floor}</span>
                  </div>

                  {/* Feature chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {rental.proximityMetro && (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Train className="w-3 h-3" />
                        نزدیک مترو
                      </span>
                    )}
                    {rental.proximitySchool && (
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        دسترسی عالی به مدرسه
                      </span>
                    )}
                    {rental.hasParking && (
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        پارکینگ سندی
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and agency contact */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-slate-500">
                      ودیعه: <span className="font-bold text-slate-900 font-mono">{(rental.depositToman / 1_000_000).toLocaleString('fa-IR')} م تومان</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      اجاره ماهیانه: <span className="font-bold text-emerald-700 font-mono">{(rental.monthlyRentToman / 1_000_000).toLocaleString('fa-IR')} م تومان</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${rental.phone}`}
                    className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>تماس با دفتر املاک</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Tenant Requests Tab */
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {req.propertyTypeFa}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                    {req.urgencyFa}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ثبت: {req.postedDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {req.applicantName} - محله مدنظر: {req.preferredNeighborhoodFa}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span>تعداد اعضای خانواده: {req.familyMembers} نفر</span>
                  {req.needsMetro && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Train className="w-3.5 h-3.5" /> نزدیک ایستگاه مترو
                    </span>
                  )}
                  {req.needsSchool && (
                    <span className="text-blue-700 font-semibold flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" /> نزدیک مراکز آموزشی
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left sm:shrink-0 flex flex-col sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-xs">
                  <div className="text-slate-500">حداکثر ودیعه: <span className="font-bold text-slate-900 font-mono">{(req.maxDepositToman / 1_000_000).toLocaleString('fa-IR')} م تومان</span></div>
                  <div className="text-slate-500 mt-0.5">حداکثر اجاره: <span className="font-bold text-emerald-700 font-mono">{(req.maxRentToman / 1_000_000).toLocaleString('fa-IR')} م تومان</span></div>
                </div>

                <button
                  onClick={() => alert(`شماره تماس متقاضی: ${req.contactNumberMasked} (ارسال فایل ملکی هماهنگ شد)`)}
                  className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  ارسال فایل به متقاضی
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Rental Modal */}
      {isAddRentalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">سپردن فایل اجاره مسکونی یا اداری</h3>
              <button
                onClick={() => setIsAddRentalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('فایل رهن و اجاره شما با موفقیت ثبت و پس از تایید هویت منتشر می‌شود.');
                setIsAddRentalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-bold mb-1">عنوان ملک</label>
                <input required type="text" placeholder="مثال: آپارتمان ۱۱۰ متری نوساز نیاوران" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ودیعه (تومان)</label>
                  <input required type="number" placeholder="مثال: ۸۰۰۰۰۰۰۰۰" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden font-mono" dir="ltr" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">اجاره ماهیانه (تومان)</label>
                  <input required type="number" placeholder="مثال: ۲۰۰۰۰۰۰۰" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden font-mono" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">شماره تماس دفتر یا مالک</label>
                <input required type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden font-mono" dir="ltr" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-all active:scale-95 shadow-xs">
                ثبت فایل در شبکه رهن و اجاره
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Tenant Request Modal */}
      {isAddRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">ثبت تقاضای متقاضی رهن و اجاره</h3>
              <button
                onClick={() => setIsAddRequestOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('تقاضای شما در سامانه ثبت شد و فایل‌های مطابق به اطلاع شما خواهد رسید.');
                setIsAddRequestOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-bold mb-1">نام متقاضی یا شرکت</label>
                <input required type="text" placeholder="مثال: خانواده مرادی" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">محله‌های مورد نظر</label>
                <input required type="text" placeholder="مثال: سعادت‌آباد، شهرک غرب یا پونک" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">سقف ودیعه (تومان)</label>
                  <input required type="number" placeholder="مثال: ۶۰۰۰۰۰۰۰۰" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden font-mono" dir="ltr" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">سقف اجاره (تومان)</label>
                  <input required type="number" placeholder="مثال: ۱۵۰۰۰۰۰۰" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden font-mono" dir="ltr" />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold cursor-pointer transition-all active:scale-95 shadow-xs">
                ثبت نیازمندی مسکن
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
