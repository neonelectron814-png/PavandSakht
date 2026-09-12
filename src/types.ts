export type Language = 'fa' | 'en';
export type CurrencyMode = 'toman' | 'rial';

export type TabType = 
  | 'overview' 
  | 'omran'
  | 'installments'
  | 'requests'
  | 'rentals'
  | 'tehator' 
  | 'sabt_asnad' 
  | 'craftsmen'
  | 'industrial'
  | 'analytics';

export type BarterMode = 
  | 'property_for_material' 
  | 'property_for_property' 
  | 'construction_partnership';

export interface PropertyListing {
  id: string;
  title: string;
  titleFa: string;
  location: string;
  locationFa: string;
  city: string;
  cityFa: string;
  areaSqM: number;
  originalPriceToman: number;
  discountedPriceToman: number;
  discountPercent: number; // For Narkh-Shekan deals (20-40%)
  urgentReasonFa: string;
  urgentReasonEn: string;
  expiresInHours: number;
  bedrooms: number;
  imageUrl: string;
  isUrgentDeal: boolean;
  sabtVerified: boolean;
  cadastralCode: string;
  category: 'residential' | 'commercial' | 'land' | 'penthouse' | 'villa';
  tags: string[];
}

export interface BarterItem {
  id: string;
  mode: BarterMode;
  titleFa: string;
  titleEn: string;
  offeredItemFa: string;
  offeredItemEn: string;
  offeredValueToman: number;
  requestedItemFa: string;
  requestedItemEn: string;
  locationFa: string;
  locationEn: string;
  partnershipRatio?: string; // e.g. "60% Builder / 40% Owner"
  builderPermitReady?: boolean;
  status: 'active' | 'negotiating' | 'completed';
  tagsFa: string[];
  imageUrl: string;
  verifiedCadastre: boolean;
  dateListed: string;
}

export interface LocalCraftsman {
  id: string;
  nameFa: string;
  nameEn: string;
  roleFa: string;
  roleEn: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  hourlyRateToman: number;
  status: 'available' | 'on_site' | 'booked';
  phone: string;
  latitude: number;
  longitude: number;
  avatarUrl: string;
  badge: 'Gold Craftsman' | 'Verified Guild' | 'Master Builder';
  specialtiesFa: string[];
}

export interface MegaSupplier {
  id: string;
  companyFa: string;
  companyEn: string;
  type: 'mining' | 'mega_factory' | 'refinery';
  productCategoryFa: string;
  productCategoryEn: string;
  capacityMetricTons: string;
  minOrderTons: number;
  unitPriceToman: number;
  unit: string;
  unitFa: string;
  cityFa: string;
  cityEn: string;
  logo: string;
  directDealAvailable: boolean;
  dailyPriceChangePercent: number;
}

export interface MaterialPricePoint {
  date: string;
  rebarPrice: number; // میلگرد (هزار تومان بر کیلو)
  cementPrice: number; // سیمان (هزار تومان هر کیسه ۵۰ کیلویی)
  copperPrice: number; // مس (هزار تومان بر کیلو)
  stonePrice: number; // سنگ تراورتن (هزار تومان هر متر)
  glassPrice: number; // شیشه دوجداره (هزار تومان هر متر)
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface DeedVerificationResult {
  verified: boolean;
  trackingCode: string;
  cadastralCode: string;
  nationalId: string;
  ownerNameMasked: string;
  district: string;
  registeredAreaSqM: number;
  encumbranceStatus: 'Clear' | 'Pledged/Mortgage' | 'Judicial Restraint';
  encumbranceStatusFa: 'فاقد هرگونه بازداشت یا رهن' | 'در رهن بانک' | 'دارای دستور قضایی';
  documentTypeFa: 'سند تک‌برگ کاداستری رسمی' | 'سند دفترچه‌ای منگوله‌دار';
  issuanceOfficeFa: 'اداره ثبت اسناد و املاک منطقه شمیرانات و لواسانات';
  inquiryTimestamp: string;
  digitalSealHash: string;
}

export interface UserProfile {
  mobile: string;
  fullName?: string;
  nationalCode?: string;
  birthDateJalali?: string;
  registeredAt: string;
}

// 1. Peyvand Omran - Heavy Machinery & Road Construction
export interface HeavyMachineryItem {
  id: string;
  titleFa: string;
  category: 'excavator' | 'loader' | 'crane' | 'mixer' | 'bulldozer' | 'mining' | 'roller';
  categoryFa: string;
  brand: string;
  modelYear: number;
  operationalHours: number;
  dealType: 'sale' | 'rental' | 'contracting';
  dealTypeFa: string;
  priceToman: number; // or daily rental
  rentalPeriodFa?: string;
  locationFa: string;
  specsFa: string[];
  imageUrl: string;
  verifiedTechnicalSheet: boolean;
  ownerContact: string;
}

// 2. Installments Hub
export interface InstallmentDealItem {
  id: string;
  titleFa: string;
  type: 'property' | 'material' | 'machinery';
  typeFa: string;
  totalPriceToman: number;
  minDownPaymentPercent: number; // e.g. 25%
  maxInstallmentMonths: number; // e.g. 24
  annualInterestPercent: number; // e.g. 0% or 18%
  monthlyPaymentToman: number;
  requiresSayadCheck: boolean;
  guaranteeRequirementFa: string;
  locationFa: string;
  imageUrl: string;
  featuresFa: string[];
}

// 3. Customer Demands & Smart Order Matcher
export interface CustomerDemandItem {
  id: string;
  customerNameMasked: string;
  materialType: 'cement' | 'rebar' | 'stone' | 'pipe' | 'brick' | 'equipment';
  materialTypeFa: string;
  titleFa: string;
  requiredVolume: string; // e.g. "۲۰۰ تن سیمان تیپ ۲"
  targetBudgetToman: number;
  destinationCityFa: string;
  urgentLevel: 'immediate' | 'within_3_days' | 'standard';
  urgentLevelFa: string;
  datePosted: string;
  matchedSuppliersCount: number;
  status: 'searching' | 'matched' | 'deal_in_progress';
  supplierQuotes: {
    supplierName: string;
    unitPriceToman: number;
    deliveryEstimateDays: number;
    phone: string;
  }[];
}

// 4. Rentals & Tenant Requests
export interface RentalListingItem {
  id: string;
  titleFa: string;
  propertyType: 'apartment' | 'villa' | 'office' | 'store';
  propertyTypeFa: string;
  areaSqM: number;
  depositToman: number; // ودیعه / رهن
  monthlyRentToman: number; // اجاره ماهیانه
  isConvertible: boolean; // قابل تبدیل
  bedrooms: number;
  floor: number;
  neighborhoodFa: string;
  proximityMetro: boolean;
  proximitySchool: boolean;
  hasParking: boolean;
  hasElevator: boolean;
  imageUrl: string;
  agencyNameFa: string;
  phone: string;
}

export interface TenantRequestItem {
  id: string;
  applicantName: string;
  preferredNeighborhoodFa: string;
  maxDepositToman: number;
  maxRentToman: number;
  familyMembers: number;
  propertyTypeFa: string;
  needsMetro: boolean;
  needsSchool: boolean;
  urgencyFa: string;
  postedDate: string;
  contactNumberMasked: string;
}


