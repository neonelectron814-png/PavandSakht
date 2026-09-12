import { 
  PropertyListing, 
  BarterItem, 
  LocalCraftsman, 
  MegaSupplier, 
  MaterialPricePoint, 
  CandlestickData,
  HeavyMachineryItem,
  InstallmentDealItem,
  CustomerDemandItem,
  RentalListingItem,
  TenantRequestItem
} from '../types';

export const NARKH_SHEKAN_PROPERTIES: PropertyListing[] = [
  {
    id: 'prop-ns-01',
    title: 'Modern Duplex Penthouse with Mountain View',
    titleFa: 'پنت‌هاوس دوبلکس مدرن با ویوی ابدی توچال',
    location: 'Tehran, Zaferanieh',
    locationFa: 'تهران، زعفرانیه - خیابان آصف',
    city: 'Tehran',
    cityFa: 'تهران',
    areaSqM: 320,
    originalPriceToman: 98_000_000_000, // 98 Billion Toman
    discountedPriceToman: 68_600_000_000, // 30% discount
    discountPercent: 30,
    urgentReasonFa: 'مهاجرت فوری مالک و تسویه تعهدات ارزی پیش از پایان ماه',
    urgentReasonEn: 'Owner overseas relocation, urgent liquidation before end of quarter',
    expiresInHours: 14,
    bedrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    isUrgentDeal: true,
    sabtVerified: true,
    cadastralCode: '1403-9821-4471-889102',
    category: 'penthouse',
    tags: ['سند تک‌برگ کاداستری', 'استخر و روف‌گاردن', '۳ پارکینگ سندی', 'تحویل فوری']
  },
  {
    id: 'prop-ns-02',
    title: 'Luxury Architectural Villa with Private Citrus Garden',
    titleFa: 'ویلای تریپلکس مدرن با استخر چهارفصل و سند شش‌دانگ',
    location: 'Mazandaran, Sisangan',
    locationFa: 'مازندران، سیسنگان - شهرک اختصاصی جنگلی',
    city: 'Mazandaran',
    cityFa: 'مازندران',
    areaSqM: 550,
    originalPriceToman: 42_000_000_000,
    discountedPriceToman: 27_300_000_000, // 35% discount
    discountPercent: 35,
    urgentReasonFa: 'تسویه نقدینگی خرید میلگرد و سیمان برای پروژه ساختمانی در حال احداث',
    urgentReasonEn: 'Liquidity settlement for raw material procurement on commercial tower',
    expiresInHours: 21,
    bedrooms: 5,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    isUrgentDeal: true,
    sabtVerified: true,
    cadastralCode: '1403-1120-7763-991204',
    category: 'villa',
    tags: ['سند شش‌دانگ شاهنشاهی عرصه و اعیان', 'آب و گاز اختصاصی', 'طراحی مینیمال']
  },
  {
    id: 'prop-ns-03',
    title: 'Commercial Office Tower Unit with Metro Access',
    titleFa: 'واحد اداری سنددار موقعیت تجاری بر بلوار سعادت‌آباد',
    location: 'Tehran, Saadat Abad',
    locationFa: 'تهران، سعادت‌آباد - میدان کاج',
    city: 'Tehran',
    cityFa: 'تهران',
    areaSqM: 145,
    originalPriceToman: 26_000_000_000,
    discountedPriceToman: 19_500_000_000, // 25% discount
    discountPercent: 25,
    urgentReasonFa: 'فروش فوری به علت تقسیم ترکه و توافق ورثه',
    urgentReasonEn: 'Estate liquidation and heir consensus agreement',
    expiresInHours: 8,
    bedrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    isUrgentDeal: true,
    sabtVerified: true,
    cadastralCode: '1403-2201-9034-118832',
    category: 'commercial',
    tags: ['سند اداری رسمی', '۲ لاین آسانسور ویتور', 'ژنراتور اضطراری']
  },
  {
    id: 'prop-ns-04',
    title: 'Smart Smart-Home Apartment in Lake View District 22',
    titleFa: 'آپارتمان هوشمند ویو دریاچه چیتگر با مشاعات هتلینگ',
    location: 'Tehran, Chitgar Lake',
    locationFa: 'تهران، منطقه ۲۲ - روبروی دریاچه شهدای خلیج فارس',
    city: 'Tehran',
    cityFa: 'تهران',
    areaSqM: 180,
    originalPriceToman: 21_500_000_000,
    discountedPriceToman: 16_770_000_000, // 22% discount
    discountPercent: 22,
    urgentReasonFa: 'تعهد چک سازنده جهت اتمام فونداسیون فاز دو',
    urgentReasonEn: 'Builder capital call for stage-two foundation completion',
    expiresInHours: 32,
    bedrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    isUrgentDeal: true,
    sabtVerified: true,
    cadastralCode: '1403-5591-6602-441908',
    category: 'residential',
    tags: ['سیستم KNX هوشمند', 'پنجره‌های ترمال‌بریک', 'لابی‌من ۲۴ ساعته']
  }
];

export const BARTER_ITEMS: BarterItem[] = [
  {
    id: 'barter-01',
    mode: 'property_for_material',
    titleFa: 'تهاتر ۲ واحد مسکونی نوساز در منطقه ۵ با ۵۰۰ تن میلگرد آجدار اصفهان',
    titleEn: 'Barter 2 Newly Built Apartments in Dist 5 for 500 Tons Isfahan Rebar',
    offeredItemFa: 'دو دستگاه آپارتمان ۱۱۰ متری کلید نخورده در پونک (سند تک‌برگ)',
    offeredItemEn: 'Two 110 sqm Brand New Turnkey Apartments in Poonak (Ready Deeds)',
    offeredValueToman: 24_000_000_000,
    requestedItemFa: '۵۰۰ تن میلگرد نمره ۱۶ تا ۲۲ ذوب‌آهن اصفهان یا تیرآهن سنگین',
    requestedItemEn: '500 Tons Isfahan Rebar (Sizes 16-22) or Heavy I-Beams',
    locationFa: 'تهران، پونک / تحویل مصالح در انبار شورآباد',
    locationEn: 'Tehran / Material Delivery at Shoorabad Warehouse',
    status: 'active',
    tagsFa: ['سند آماده انتقال', 'تهاتر مستقیم سازنده', 'فوری'],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    verifiedCadastre: true,
    dateListed: 'امروز، ساعت ۱۰:۳۰'
  },
  {
    id: 'barter-02',
    mode: 'property_for_property',
    titleFa: 'تهاتر ویلای لوکس در کلاردشت با آپارتمان اداری در سعادت‌آباد یا الهیه',
    titleEn: 'Barter Luxury Villa in Kelardasht for Commercial Flat in Saadat Abad',
    offeredItemFa: 'ویلای ۴۰۰ متری نوساز با روف گاردن و سند شش‌دانگ شاهنشاهی در کلاردشت',
    offeredItemEn: '400 sqm Newly Built Villa with Roof Garden in Kelardasht',
    offeredValueToman: 35_000_000_000,
    requestedItemFa: 'واحد اداری یا مسکونی بین ۱۲۰ تا ۱۸۰ متر در مناطق ۱ یا ۲ تهران',
    requestedItemEn: 'Office or Residential Unit 120-180 sqm in Districts 1 or 2 Tehran',
    locationFa: 'مازندران به تهران',
    locationEn: 'Mazandaran to Tehran',
    status: 'active',
    tagsFa: ['معاوضه ملک با ملک', 'کارشناسی دادگستری', 'بدون سرک پرداختی'],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    verifiedCadastre: true,
    dateListed: 'دیروز'
  },
  {
    id: 'barter-03',
    mode: 'construction_partnership',
    titleFa: 'مشارکت در ساخت زمین ۶۵۰ متری با گذر ۱۸ متری در پاسداران (جواز آماده)',
    titleEn: 'Construction Partnership on 650 sqm Land in Pasdaran (Permits Ready)',
    offeredItemFa: 'زمین سنددار با دستور نقشه ۶ طبقه مسکونی روی پیلوت، بدون ریشه اوقاف',
    offeredItemEn: 'Freehold Land with 6-Storey Permit Blueprint, Clean Title',
    offeredValueToman: 110_000_000_000,
    requestedItemFa: 'سازنده برند با نمونه‌کار شاخص در منطقه ۱ و توان مالی تامین اسکلت فلزی',
    requestedItemEn: 'Reputable Builder with District 1 Track Record & Steel Skeleton Liquidity',
    locationFa: 'تهران، پاسداران - بوستان نهم',
    locationEn: 'Tehran, Pasdaran',
    partnershipRatio: '۶۰٪ مالک / ۴۰٪ سازنده (به همراه ۵ میلیارد بلاعوض)',
    builderPermitReady: true,
    status: 'active',
    tagsFa: ['مشارکت در ساخت', 'دستور نقشه تایید شده', 'ضمانت‌نامه بانکی'],
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    verifiedCadastre: true,
    dateListed: '۳ ساعت پیش'
  },
  {
    id: 'barter-04',
    mode: 'property_for_material',
    titleFa: 'تهاتر سنگ تراورتن عباس‌آباد و آتشکوه با ۳ واحد تجاری در پاساژ نوساز کرج',
    titleEn: 'Barter Travertine Stone for 3 Retail Commercial Units in Karaj',
    offeredItemFa: '۳ باب مغازه ۱۸ تا ۲۵ متری در مرکز خرید برند طالقانی کرج',
    offeredItemEn: '3 Retail units 18-25 sqm in Taleghani Commercial Center Karaj',
    offeredValueToman: 18_500_000_000,
    requestedItemFa: '۴۰۰۰ مترمربع سنگ سوپر تراورتن ممتاز عباس‌آباد فرآوری شده اسلب',
    requestedItemEn: '4,000 sqm Super Abbas-Abad Travertine Slab Stone',
    locationFa: 'البرز، کرج / تحویل در معدن محلات',
    locationEn: 'Karaj / Delivery Mahallat Quarry',
    status: 'negotiating',
    tagsFa: ['سنگ نما و اسلب', 'تهاتر صنعتی', 'نظارت ناظر پروژه'],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    verifiedCadastre: true,
    dateListed: '۲ روز پیش'
  }
];

export const LOCAL_CRAFTSMEN: LocalCraftsman[] = [
  {
    id: 'craft-01',
    nameFa: 'استاد احمد کبیری (تیم کاشی و سنگ‌کاری مدرن)',
    nameEn: 'Master Ahmad Kabiri (Slab & Ceramic Specialist)',
    roleFa: 'سنگ‌کار و اسلب‌کار تخصصی',
    roleEn: 'Master Mason & Large-Format Slab Installer',
    distanceKm: 0.8,
    rating: 4.9,
    reviewCount: 142,
    hourlyRateToman: 350_000,
    status: 'available',
    phone: '09123456789',
    latitude: 35.7892,
    longitude: 51.4285,
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&q=80',
    badge: 'Master Builder',
    specialtiesFa: ['اسلب بوک‌مچ و فورمچ', 'نصب خشک نمای رومی', 'برش لیزری واترجت']
  },
  {
    id: 'craft-02',
    nameFa: 'تیم تخصصی گچ‌بری و کناف پارس (مهندس باقری)',
    nameEn: 'Pars Drywall & Gypsum Team (Eng. Bagheri)',
    roleFa: 'اجرای کناف، نورمخفی و گچ‌بری کلاسیک',
    roleEn: 'Knauf Drywall & Classic Plaster Artisan',
    distanceKm: 1.4,
    rating: 4.8,
    reviewCount: 98,
    hourlyRateToman: 280_000,
    status: 'available',
    phone: '09129876543',
    latitude: 35.7930,
    longitude: 51.4320,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    badge: 'Verified Guild',
    specialtiesFa: ['عایق صوتی آکوستیک', 'سقف کشسان باریسول', 'پتینه‌کاری ایتالیایی']
  },
  {
    id: 'craft-03',
    nameFa: 'شرکت بتن آماده و پمپ دکل البرز بتن',
    nameEn: 'Alborz Ready-Mix Concrete & Boom Pump',
    roleFa: 'تامین بتن عیار ۴۰۰ و پمپ هوایی ۳۶ متری',
    roleEn: 'Ready-Mix Concrete & High-Reach Concrete Boom',
    distanceKm: 2.3,
    rating: 4.95,
    reviewCount: 310,
    hourlyRateToman: 1_200_000,
    status: 'available',
    phone: '09121112233',
    latitude: 35.7780,
    longitude: 51.4150,
    avatarUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=200&q=80',
    badge: 'Gold Craftsman',
    specialtiesFa: ['آزمایش اسلامپ در محل', 'ارسال تراک میکسر کمتر از ۲۰ دقیقه', 'بتن ضدسولفات']
  },
  {
    id: 'craft-04',
    nameFa: 'کارگاه شیشه دوجداره و آلومینیوم ترمال‌بریک آذر',
    nameEn: 'Azar Thermal-Break Windows & Double Glass',
    roleFa: 'ساخت پنجره آلومینیومی و نمای کرتین‌وال',
    roleEn: 'Curtain Wall & Thermal-Break Aluminum Fabricator',
    distanceKm: 3.1,
    rating: 4.7,
    reviewCount: 76,
    hourlyRateToman: 420_000,
    status: 'on_site',
    phone: '09124445566',
    latitude: 35.8010,
    longitude: 51.4410,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    badge: 'Verified Guild',
    specialtiesFa: ['پروفیل سارای ترکیه و لورنزو', 'گاز آرگون استاندارد', 'یراق‌آلات روتو آلمان']
  }
];

export const MEGA_SUPPLIERS: MegaSupplier[] = [
  {
    id: 'sup-01',
    companyFa: 'مجتمع فولاد مبارکه اصفهان',
    companyEn: 'Mobarakeh Steel Complex',
    type: 'mega_factory',
    productCategoryFa: 'ورق‌های سیاه، گالوانیزه و روغنی',
    productCategoryEn: 'Hot-rolled & Galvanized Steel Coils',
    capacityMetricTons: '۷.۲ میلیون تن در سال',
    minOrderTons: 25,
    unitPriceToman: 38_500, // هر کیلوگرم
    unit: 'kg',
    unitFa: 'کیلوگرم',
    cityFa: 'اصفهان',
    cityEn: 'Isfahan',
    logo: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=150&q=80',
    directDealAvailable: true,
    dailyPriceChangePercent: +1.4
  },
  {
    id: 'sup-02',
    companyFa: 'معادن سنگ تراورتن حاجی‌آباد و عباس‌آباد محلات',
    companyEn: 'Mahallat Travertine Quarries Group',
    type: 'mining',
    productCategoryFa: 'کوپ خام و اسلب صادراتی تراورتن',
    productCategoryEn: 'Raw Quarry Blocks & Export-Grade Slabs',
    capacityMetricTons: '۴۵۰,۰۰۰ تن در سال',
    minOrderTons: 50,
    unitPriceToman: 1_850_000, // هر متر مربع
    unit: 'sqm',
    unitFa: 'مترمربع',
    cityFa: 'محلات، مرکزی',
    cityEn: 'Mahallat',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80',
    directDealAvailable: true,
    dailyPriceChangePercent: -0.5
  },
  {
    id: 'sup-03',
    companyFa: 'شرکت سیمان تهران (هلدینگ سیمان فارس و خوزستان)',
    companyEn: 'Tehran Cement Joint Stock Company',
    type: 'mega_factory',
    productCategoryFa: 'سیمان تیپ ۲ و پرتلند پوزولانی (فله و پاکت)',
    productCategoryEn: 'Portland Cement Type 2 & Pozzolanic Bulk',
    capacityMetricTons: '۳.۳ میلیون تن در سال',
    minOrderTons: 100,
    unitPriceToman: 82_000, // هر کیسه ۵۰ کیلویی
    unit: 'bag 50kg',
    unitFa: 'کیسه ۵۰ کیلویی',
    cityFa: 'تهران - شهرری',
    cityEn: 'Tehran',
    logo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=150&q=80',
    directDealAvailable: true,
    dailyPriceChangePercent: +0.2
  },
  {
    id: 'sup-04',
    companyFa: 'ذوب آهن اصفهان (نماد ذوب)',
    companyEn: 'Isfahan Steel Company (ESCO)',
    type: 'mega_factory',
    productCategoryFa: 'میلگرد آجدار A3، تیرآهن IPE و هاش سنگین',
    productCategoryEn: 'Rebar A3, Standard IPE Beams, Heavy HEB',
    capacityMetricTons: '۳.۶ میلیون تن در سال',
    minOrderTons: 20,
    unitPriceToman: 32_800,
    unit: 'kg',
    unitFa: 'کیلوگرم',
    cityFa: 'اصفهان',
    cityEn: 'Isfahan',
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=150&q=80',
    directDealAvailable: true,
    dailyPriceChangePercent: +2.1
  }
];

export const MATERIAL_PRICE_HISTORY: MaterialPricePoint[] = [
  { date: 'فروردین', rebarPrice: 27.5, cementPrice: 65, copperPrice: 420, stonePrice: 1450, glassPrice: 380 },
  { date: 'اردیبهشت', rebarPrice: 28.2, cementPrice: 68, copperPrice: 435, stonePrice: 1520, glassPrice: 395 },
  { date: 'خرداد', rebarPrice: 29.0, cementPrice: 71, copperPrice: 460, stonePrice: 1580, glassPrice: 410 },
  { date: 'تیر', rebarPrice: 31.4, cementPrice: 74, copperPrice: 490, stonePrice: 1650, glassPrice: 425 },
  { date: 'مرداد', rebarPrice: 30.8, cementPrice: 78, copperPrice: 480, stonePrice: 1720, glassPrice: 440 },
  { date: 'شهریور', rebarPrice: 32.8, cementPrice: 82, copperPrice: 510, stonePrice: 1850, glassPrice: 460 }
];

export const TEHRAN_CANDLESTICK_DATA: CandlestickData[] = [
  { time: 'هفته ۱', open: 82.0, high: 84.5, low: 81.2, close: 83.8, volume: 1420 },
  { time: 'هفته ۲', open: 83.8, high: 86.0, low: 83.0, close: 85.2, volume: 1650 },
  { time: 'هفته ۳', open: 85.2, high: 85.8, low: 82.9, close: 83.4, volume: 1200 },
  { time: 'هفته ۴', open: 83.4, high: 87.2, low: 83.1, close: 86.9, volume: 1890 },
  { time: 'هفته ۵', open: 86.9, high: 89.5, low: 86.0, close: 88.7, volume: 2150 },
  { time: 'هفته ۶', open: 88.7, high: 91.0, low: 87.5, close: 90.4, volume: 2400 },
  { time: 'هفته ۷', open: 90.4, high: 90.9, low: 88.2, close: 89.1, volume: 1780 },
  { time: 'هفته ۸', open: 89.1, high: 93.5, low: 89.0, close: 92.8, volume: 2890 }
];

// ==========================================
// 1. پیوند عمران - ماشین‌آلات سنگین، معادن و راهسازی
// ==========================================
export const HEAVY_MACHINERY_DATA: HeavyMachineryItem[] = [
  {
    id: 'mach-01',
    titleFa: 'بیل مکانیکی زنجیری کوماتسو PC220 خط ۷',
    category: 'excavator',
    categoryFa: 'بیل مکانیکی',
    brand: 'Komatsu',
    modelYear: 2021,
    operationalHours: 3400,
    dealType: 'sale',
    dealTypeFa: 'فروش مستقیم نقدی/تهاتر',
    priceToman: 7_800_000_000,
    locationFa: 'تهران - شهرک نمایشگاه ماشین‌آلات اسلامشهر',
    specsFa: ['موتور فابریک ۶ سیلندر توربو', 'سیستم هیدرولیک پلمپ', 'دارای چکش هیدرولیکی سوسان'],
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۱'
  },
  {
    id: 'mach-02',
    titleFa: 'لودر کاترپیلار ۹۵۰F سری ۲ اورجینال',
    category: 'loader',
    categoryFa: 'لودر سنگین',
    brand: 'CAT',
    modelYear: 2019,
    operationalHours: 5200,
    dealType: 'rental',
    dealTypeFa: 'اجاره پروژه‌ای با راننده ماهر',
    priceToman: 18_000_000,
    rentalPeriodFa: 'روزانه (حداقل یک ماه)',
    locationFa: 'کرج - انبار ماشین‌آلات کمال‌شهر',
    specsFa: ['باکت سنگین ۳.۵ متر مکعبی', 'لاستیک‌ها ۸۵ درصد', 'آماده اعزام به سایت‌های معدنی'],
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۲'
  },
  {
    id: 'mach-03',
    titleFa: 'میکسر بتن ایویکو ترافیکر ۹ متر مکعبی',
    category: 'mixer',
    categoryFa: 'تراک میکسر بتن',
    brand: 'Iveco',
    modelYear: 2022,
    operationalHours: 2100,
    dealType: 'contracting',
    dealTypeFa: 'پیمانکاری حمل و بتن‌ریزی',
    priceToman: 4_200_000_000,
    locationFa: 'اصفهان - پایانه بتن آماده جی',
    specsFa: ['دیگ ضدسایش هاردوکس ایتالیا', 'موتور دویتس آب‌خنک', 'پمپ تخلیه هیدرولیک رکسروت'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۳'
  },
  {
    id: 'mach-04',
    titleFa: 'بولدوزر کوماتسو D155A خط ۲ معدنی',
    category: 'bulldozer',
    categoryFa: 'بولدوزر و خاکبرداری سنگین',
    brand: 'Komatsu',
    modelYear: 2018,
    operationalHours: 6800,
    dealType: 'sale',
    dealTypeFa: 'فروش قطعی با سند گمرکی',
    priceToman: 11_500_000_000,
    locationFa: 'یزد - شرکت تجهیزات راه و معدن',
    specsFa: ['تیغه زاویه‌دار صخره‌ای سنگین', 'ریپر سه‌شاخه هیدرولیک', 'سرویس کامل زنجیر و رولیک'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۴'
  },
  {
    id: 'mach-05',
    titleFa: 'جرثقیل کارگاهی ۵۰ تن تادانو مدل GR-500N',
    category: 'crane',
    categoryFa: 'جرثقیل کارگاهی بوم تلسکوپی',
    brand: 'Tadano',
    modelYear: 2020,
    operationalHours: 3900,
    dealType: 'rental',
    dealTypeFa: 'اجاره ماهانه با اوپراتور دارای گواهی',
    priceToman: 35_000_000,
    rentalPeriodFa: 'روزانه (شیفت کاری ۸ ساعته)',
    locationFa: 'تهران - منطقه ویژه فرودگاهی پیام',
    specsFa: ['طول دکل ۴۲ متر + جیب کمکی', 'فرمان چهار چرخ حرکت کج', 'گواهی سلامت فنی معتبر یک‌ساله'],
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۵'
  },
  {
    id: 'mach-06',
    titleFa: 'غلتک ویبراتور هپکو CA25 راهسازی',
    category: 'roller',
    categoryFa: 'غلتک و تثبیت بستر',
    brand: 'Hepco',
    modelYear: 2021,
    operationalHours: 1800,
    dealType: 'sale',
    dealTypeFa: 'فروش با پیش‌پرداخت ۴۰٪',
    priceToman: 2_950_000_000,
    locationFa: 'اراک - کارخانجات صنعتی',
    specsFa: ['موتور پرکینز ۶ سیلندر', 'سیستم ویبره دوبل با فرکانس متغیر', 'کارکرد کم پروژه‌ای'],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    verifiedTechnicalSheet: true,
    ownerContact: '۰۹۱۲۳۴۵۶۷۸۶'
  }
];

// ==========================================
// 2. تالار اقساطی - خرید اقساطی مصالح و املاک
// ==========================================
export const INSTALLMENT_DEALS_DATA: InstallmentDealItem[] = [
  {
    id: 'inst-01',
    titleFa: 'آپارتمان نوساز ۹۵ متری کلید نخورده - اقساط ۳۶ ماهه',
    type: 'property',
    typeFa: 'ملک و آپارتمان',
    totalPriceToman: 4_800_000_000,
    minDownPaymentPercent: 30, // ۱.۴۴ میلیارد نقد
    maxInstallmentMonths: 36,
    annualInterestPercent: 0, // بدون سود کارمزد سازنده
    monthlyPaymentToman: 93_300_000,
    requiresSayadCheck: true,
    guaranteeRequirementFa: 'چک صیادی بنفش + انتقال سند در دفترخانه پس از ۵۰٪ اقساط',
    locationFa: 'تهران - پونک، بلوار کمالی',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featuresFa: ['دو خوابه نورگیر عالی', 'پارکینگ و انباری اختصاصی', 'سازنده دارای پروانه پایه ۱']
  },
  {
    id: 'inst-02',
    titleFa: 'سبد میلگرد اصفهان و بناب (۵۰ تن) - بازپرداخت ۶ ماهه',
    type: 'material',
    typeFa: 'آهن‌آلات و مصالح سازه‌ای',
    totalPriceToman: 1_650_000_000,
    minDownPaymentPercent: 20, // ۳۳۰ میلیون نقد
    maxInstallmentMonths: 6,
    annualInterestPercent: 2.0, // سود کم‌بهره ماهانه
    monthlyPaymentToman: 232_000_000,
    requiresSayadCheck: true,
    guaranteeRequirementFa: 'استعلام حساب صیادی بدون برگشتی + ضمانت پروانه ساختمانی',
    locationFa: 'انبار مرکزی بازار آهن شادآباد',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    featuresFa: ['بارگیری مستقیم از انبار بورس', 'برگه آنالیز آزمایشگاهی متالورژی', 'تحویل فوری ۲۴ ساعته']
  },
  {
    id: 'inst-03',
    titleFa: 'پارت عمده سیمان پرتلند تیپ ۲ پاکتی (۳۰۰۰ کیسه)',
    type: 'material',
    typeFa: 'سیمان و فرآورده‌های بتنی',
    totalPriceToman: 246_000_000,
    minDownPaymentPercent: 25,
    maxInstallmentMonths: 4,
    annualInterestPercent: 0,
    monthlyPaymentToman: 46_125_000,
    requiresSayadCheck: true,
    guaranteeRequirementFa: 'چک صیادی معتبر به تاریخ سررسید ماه‌های ۱ الی ۴',
    locationFa: 'کارخانه سیمان تهران - بارگیری سیلو',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    featuresFa: ['ارسال در پالت‌های شرینک‌شده', 'تضمین سلامت فیزیکی پاکت', 'تخفیف ویژه تناژ بالا']
  },
  {
    id: 'inst-04',
    titleFa: 'واحد تجاری اداری ۵۵ متری سنددار - اقساط ۲۴ ماهه',
    type: 'property',
    typeFa: 'املاک تجاری و اداری',
    totalPriceToman: 5_500_000_000,
    minDownPaymentPercent: 35,
    maxInstallmentMonths: 24,
    annualInterestPercent: 12,
    monthlyPaymentToman: 172_000_000,
    requiresSayadCheck: true,
    guaranteeRequirementFa: 'مبایعه‌نامه رسمی با کد رهگیری و استعلام کاداستر',
    locationFa: 'تهران - میدان ونک، برج نگین',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    featuresFa: ['موقعیت عالی اداری', 'نگهبانی ۲۴ ساعته و پارکینگ مهمان', 'قابلیت رهن آنی به مستاجر']
  }
];

// ==========================================
// 3. درخواست‌های مشتری (نیازمندی‌های فوری و تطبیق هوشمند)
// ==========================================
export const CUSTOMER_DEMANDS_DATA: CustomerDemandItem[] = [
  {
    id: 'dem-01',
    customerNameMasked: 'مهندس حسینی (پروژه مروارید غرب)',
    materialType: 'cement',
    materialTypeFa: 'سیمان پرتلند',
    titleFa: 'سیمان تیپ ۲ فله - ۲۰۰ تن تحویل پای پروژه',
    requiredVolume: '۲۰۰ تن فله با بونکر',
    targetBudgetToman: 155_000_000,
    destinationCityFa: 'تهران - منطقه ۲۲ چیتگر',
    urgentLevel: 'immediate',
    urgentLevelFa: 'فوری (تحویل حداکثر ۲ روز)',
    datePosted: '۱۴ دقیقه پیش',
    matchedSuppliersCount: 4,
    status: 'matched',
    supplierQuotes: [
      { supplierName: 'سیمان تهران (انبار غرب)', unitPriceToman: 760_000, deliveryEstimateDays: 1, phone: '۰۲۱۶۶۱۱۲۲۳۳' },
      { supplierName: 'بازرگانی مصالح آریا', unitPriceToman: 775_000, deliveryEstimateDays: 2, phone: '۰۲۱۸۸۲۲۳۳۴۴' }
    ]
  },
  {
    id: 'dem-02',
    customerNameMasked: 'مهندس رضایی (برج الماس نیاوران)',
    materialType: 'rebar',
    materialTypeFa: 'میلگرد آجدار',
    titleFa: 'میلگرد ۱۴ و ۱۶ آجدار A3 اصفهان - ۴۵ تن شاخه ۱۲ متری',
    requiredVolume: '۴۵ تن با برگه باسکول استاندارد',
    targetBudgetToman: 1_470_000_000,
    destinationCityFa: 'تهران - نیاوران، خیابان مژده',
    urgentLevel: 'within_3_days',
    urgentLevelFa: 'ظرف ۳ روز آینده',
    datePosted: '۴۵ دقیقه پیش',
    matchedSuppliersCount: 6,
    status: 'matched',
    supplierQuotes: [
      { supplierName: 'فولاد تجارت اصفهان', unitPriceToman: 32_400, deliveryEstimateDays: 1, phone: '۰۳۱۳۳۹۹۰۰۱۱' },
      { supplierName: 'آهن‌آنلاین پارس', unitPriceToman: 32_600, deliveryEstimateDays: 2, phone: '۰۲۱۵۴۲۲۳۳۱۱' }
    ]
  },
  {
    id: 'dem-03',
    customerNameMasked: 'مجتمع ویلایی چمستان',
    materialType: 'stone',
    materialTypeFa: 'سنگ ساختمانی',
    titleFa: 'سنگ تراورتن عباس‌آباد کرم سورت سوپر - ۶۰۰ مترمربع',
    requiredVolume: '۶۰۰ مترمربع قد و پا بلند رزین اپوکسی',
    targetBudgetToman: 850_000_000,
    destinationCityFa: 'مازندران - چمستان، نور',
    urgentLevel: 'standard',
    urgentLevelFa: 'عادی (هفته آینده)',
    datePosted: '۲ ساعت پیش',
    matchedSuppliersCount: 3,
    status: 'searching',
    supplierQuotes: [
      { supplierName: 'صنایع سنگ محلات', unitPriceToman: 1_380_000, deliveryEstimateDays: 4, phone: '۰۸۶۴۳۲۲۱۱۰۰' }
    ]
  },
  {
    id: 'dem-04',
    customerNameMasked: 'پروژه تجاری تجریش',
    materialType: 'pipe',
    materialTypeFa: 'لوله و اتصالات مانیسمان',
    titleFa: 'لوله فولادی بدون درز رده ۴۰ سایز ۲ و ۴ اینچ - ۱۲۰۰ متر',
    requiredVolume: '۱۲۰۰ متر طول با سرتیفیکیت آزمایشگاه',
    targetBudgetToman: 620_000_000,
    destinationCityFa: 'تهران - میدان قدس',
    urgentLevel: 'within_3_days',
    urgentLevelFa: 'ظرف ۳ روز آینده',
    datePosted: '۳ ساعت پیش',
    matchedSuppliersCount: 2,
    status: 'deal_in_progress',
    supplierQuotes: [
      { supplierName: 'پایپ گستر تهران', unitPriceToman: 510_000, deliveryEstimateDays: 2, phone: '۰۲۱۶۶۳۳۴۴۵۵' }
    ]
  }
];

// ==========================================
// 4. املاک اجاره‌ای و نیازمندی‌های مستاجرین
// ==========================================
export const RENTAL_LISTINGS_DATA: RentalListingItem[] = [
  {
    id: 'rent-01',
    titleFa: 'آپارتمان ۱۴۰ متری تک‌واحدی، نورگیر دوطرفه - فرمانیه',
    propertyType: 'apartment',
    propertyTypeFa: 'آپارتمان مسکونی',
    areaSqM: 140,
    depositToman: 1_200_000_000, // ۱.۲ میلیارد ودیعه
    monthlyRentToman: 35_000_000, // ۳۵ میلیون اجاره
    isConvertible: true,
    bedrooms: 3,
    floor: 4,
    neighborhoodFa: 'تهران، فرمانیه - سنبل',
    proximityMetro: true,
    proximitySchool: true,
    hasParking: true,
    hasElevator: true,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    agencyNameFa: 'املاک بزرگ سفیر فرمانیه',
    phone: '۰۲۱۲۲۸۰۸۰۸۰'
  },
  {
    id: 'rent-02',
    titleFa: 'واحد اداری ۸۵ متری موقعیت اداری - سعادت‌آباد میدان کاج',
    propertyType: 'office',
    propertyTypeFa: 'دفتر کار اداری',
    areaSqM: 85,
    depositToman: 600_000_000,
    monthlyRentToman: 42_000_000,
    isConvertible: true,
    bedrooms: 2,
    floor: 3,
    neighborhoodFa: 'تهران، سعادت‌آباد - سرو غربی',
    proximityMetro: true,
    proximitySchool: false,
    hasParking: true,
    hasElevator: true,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    agencyNameFa: 'مشاورین املاک کاج',
    phone: '۰۲۱۲۲۰۹۰۹۰۹'
  },
  {
    id: 'rent-03',
    titleFa: 'ویلای دربست ۳۰۰ متری دوبلکس حیاط‌دار - لواسان کوچک',
    propertyType: 'villa',
    propertyTypeFa: 'ویلای دربست',
    areaSqM: 300,
    depositToman: 2_500_000_000,
    monthlyRentToman: 60_000_000,
    isConvertible: false,
    bedrooms: 4,
    floor: 2,
    neighborhoodFa: 'تهران، لواسان - بلوار باستی',
    proximityMetro: false,
    proximitySchool: true,
    hasParking: true,
    hasElevator: false,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    agencyNameFa: 'مسکن تخصصی لواسانات',
    phone: '۰۲۱۲۶۵۴۵۴۵۴'
  },
  {
    id: 'rent-04',
    titleFa: 'آپارتمان ۹۰ متری خوش‌نقشه نوساز - گیشا نزدیک پارک گفت‌وگو',
    propertyType: 'apartment',
    propertyTypeFa: 'آپارتمان مسکونی',
    areaSqM: 90,
    depositToman: 800_000_000,
    monthlyRentToman: 20_000_000,
    isConvertible: true,
    bedrooms: 2,
    floor: 2,
    neighborhoodFa: 'تهران، گیشا - خیابان بیست و یکم',
    proximityMetro: true,
    proximitySchool: true,
    hasParking: true,
    hasElevator: true,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    agencyNameFa: 'املاک آریا گیشا',
    phone: '۰۲۱۸۸۲۲۱۱۰۰'
  }
];

export const TENANT_REQUESTS_DATA: TenantRequestItem[] = [
  {
    id: 'treq-01',
    applicantName: 'خانواده مهندس کاظمی (۳ نفره)',
    preferredNeighborhoodFa: 'تهران، سهروردی یا یوسف‌آباد',
    maxDepositToman: 700_000_000,
    maxRentToman: 25_000_000,
    familyMembers: 3,
    propertyTypeFa: 'آپارتمان ۲ یا ۳ خوابه',
    needsMetro: true,
    needsSchool: true,
    urgencyFa: 'فوری - تحویل تا پایان ماه',
    postedDate: 'امروز',
    contactNumberMasked: '۰۹۱۲***۸۱۲۰'
  },
  {
    id: 'treq-02',
    applicantName: 'شرکت مهندسی داده‌پردازی (اداری)',
    preferredNeighborhoodFa: 'تهران، میرداماد یا ونک',
    maxDepositToman: 1_000_000_000,
    maxRentToman: 50_000_000,
    familyMembers: 8,
    propertyTypeFa: 'واحد موقعیت اداری یا سند اداری ۱۰۰ تا ۱۵۰ متر',
    needsMetro: true,
    needsSchool: false,
    urgencyFa: 'ظرف دو هفته آینده',
    postedDate: 'دیروز',
    contactNumberMasked: '۰۹۱۲***۴۳۲۱'
  },
  {
    id: 'treq-03',
    applicantName: 'زوج جوان بدون فرزند',
    preferredNeighborhoodFa: 'تهران، ستارخان، صادقیه یا پونک',
    maxDepositToman: 500_000_000,
    maxRentToman: 16_000_000,
    familyMembers: 2,
    propertyTypeFa: 'آپارتمان ۶۰ تا ۸۰ متری تمیز با آسانسور',
    needsMetro: true,
    needsSchool: false,
    urgencyFa: 'فوری',
    postedDate: 'امروز',
    contactNumberMasked: '۰۹۳۵***۹۹۸۱'
  }
];

