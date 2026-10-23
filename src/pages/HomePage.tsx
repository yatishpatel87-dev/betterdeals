import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Percent, 
  ExternalLink, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Video, 
  ShieldCheck, 
  Filter,
  Play
} from 'lucide-react';
import { Product, Category, VideoItem, SiteSettings, Language } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getTranslation } from '../utils/translations';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  videos: VideoItem[];
  settings: SiteSettings;
  lang: Language;
  navigate: (path: string) => void;
  searchQuery: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  videos,
  settings,
  lang,
  navigate,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'discount' | 'priceLow' | 'priceHigh'>('latest');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  const t = getTranslation(lang);

  // Filter products
  let filtered = products.filter((p) => {
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.affiliatePlatform.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || p.affiliatePlatform === selectedPlatform;

    return matchesSearch && matchesCategory && matchesPlatform;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const featuredDeals = products.filter(p => p.featured);
  const topDiscountDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-14">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>{settings.bannerHeadline || t.heroBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {lang === 'gu' ? (
                <>ઓનલાઇન શોપિંગ પર મેળવો <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">સૌથી મોટા ડિસ્કાઉન્ટ</span></>
              ) : (
                <>Unlock Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">Smart Affiliate Deals</span></>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {settings.bannerSubheadline || t.heroSubtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/offers')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <Percent className="w-4 h-4 text-amber-300" />
                <span>{t.exploreDeals}</span>
              </button>

              <button
                onClick={() => navigate('/videos')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
              >
                <Video className="w-4 h-4 text-blue-400" />
                <span>{t.watchVideos}</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% {lang === 'gu' ? 'ચકાસાયેલ લિંક્સ' : 'Verified Links'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'gu' ? 'કોઈ નકલી કૂપન નહીં' : 'Direct Store Checkout'}</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'gu' ? 'દર કલાકે અપડેટ' : 'Hourly Updates'}</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Deal Card (Right) */}
          <div className="lg:col-span-5">
            {featuredDeals.length > 0 ? (
              <div className="relative group bg-slate-900/90 rounded-2xl p-4 border border-blue-500/30 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {lang === 'gu' ? 'આજની ટોપ ડીલ' : 'Deal of the Day'}
                    </span>
                  </div>
                  <span className="bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-extrabold px-2 py-0.5 rounded">
                    {featuredDeals[0].discount}% {t.off}
                  </span>
                </div>

                <div 
                  className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => navigate(`/product/${featuredDeals[0].id}`)}
                >
                  <img
                    src={featuredDeals[0].thumbnailUrl}
                    alt={featuredDeals[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="pt-3">
                  <h3 
                    onClick={() => navigate(`/product/${featuredDeals[0].id}`)}
                    className="font-bold text-base text-white hover:text-blue-400 cursor-pointer line-clamp-1"
                  >
                    {featuredDeals[0].name}
                  </h3>
                  <div className="flex items-baseline justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        ₹{featuredDeals[0].price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 line-through">
                        ₹{featuredDeals[0].originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {featuredDeals[0].affiliatePlatform}
                    </span>
                  </div>

                  <a
                    href={featuredDeals[0].affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all"
                  >
                    <span>{t.buyNow} ({featuredDeals[0].affiliatePlatform})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <img
                  src={settings.bannerImageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'}
                  alt="Deals"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Categories Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>{t.popularCategories}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'gu' ? 'તમારી મનપસંદ શ્રેણીમાંથી સોદા શોધો' : 'Browse handpicked deals by category'}
            </p>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {t.allCategories}
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = products.filter(p => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-800 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter and Sorting Controls */}
      <section className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Store Platform filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.filterByPlatform}:</span>
          </span>
          {['all', 'Amazon', 'Flipkart'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold border transition-colors shrink-0 ${
                selectedPlatform === p
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {p === 'all' ? t.allStores : p}
            </button>
          ))}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 shrink-0 font-medium">{t.sortBy}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="latest">{t.sortLatest}</option>
            <option value="discount">{t.sortDiscount}</option>
            <option value="priceLow">{t.sortPriceLow}</option>
            <option value="priceHigh">{t.sortPriceHigh}</option>
          </select>
        </div>
      </section>

      {/* Main Deals Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t.featuredProducts}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {filtered.length} {lang === 'gu' ? 'સોદા ઉપલબ્ધ છે' : 'deals found matching your filters'}
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((prod) => {
              const cat = categories.find(c => c.id === prod.categoryId);
              return (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  categoryName={cat ? (lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name) : undefined}
                  lang={lang}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">{t.noProductsFound}</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedPlatform('all'); }}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
            >
              {lang === 'gu' ? 'બધા ફિલ્ટર્સ સાફ કરો' : 'Clear all filters'}
            </button>
          </div>
        )}
      </section>

      {/* Promotional Videos Showcase Teaser */}
      {videos.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                <Video className="w-4 h-4" />
                <span>{lang === 'gu' ? 'પ્રોડક્ટ રિવ્યુ & ડેમો' : 'Video Unboxings & Demos'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'gu' ? 'પ્રોમો વિડિયોઝ સાથે ખરીદી કરો' : 'Watch Promotional Product Videos'}
              </h2>
            </div>
            <button
              onClick={() => navigate('/videos')}
              className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videos.slice(0, 3).map((vid) => (
              <div
                key={vid.id}
                className="group relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all flex flex-col"
              >
                <div 
                  className="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideoModal(vid)}
                >
                  <img
                    src={vid.thumbnailUrl || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-100 line-clamp-2">
                      {vid.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {vid.description}
                    </p>
                  </div>

                  {vid.affiliateUrl && (
                    <a
                      href={vid.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-3 flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors"
                    >
                      <span>{t.buyNow}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video Playback Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white truncate max-w-md">
                {activeVideoModal.title}
              </h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black">
              {activeVideoModal.videoUrl.includes('youtube.com') || activeVideoModal.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={activeVideoModal.videoUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoModal.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-4 flex items-center justify-between bg-slate-950">
              <p className="text-xs text-slate-400 line-clamp-1 max-w-md">
                {activeVideoModal.description}
              </p>
              {activeVideoModal.affiliateUrl && (
                <a
                  href={activeVideoModal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                >
                  <span>{t.buyNow}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
