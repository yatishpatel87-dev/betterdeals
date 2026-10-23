import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  Flame, 
  Video, 
  Percent, 
  Tag, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Category, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  navigate,
  lang,
  setLang,
  categories,
  searchQuery,
  setSearchQuery,
  isAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const t = getTranslation(lang);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPath !== '/' && !currentPath.startsWith('/category')) {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Notification / Telegram Deals Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 px-4 py-1.5 text-xs font-medium text-center flex items-center justify-between sm:justify-center gap-2 sm:gap-6">
        <div className="flex items-center gap-1.5 justify-center">
          <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>{lang === 'gu' ? 'દરરોજ 100+ નવા એમેઝોન અને ફ્લિપકાર્ટ સોદા ચકાસાયેલ છે!' : '100+ Verified Amazon & Flipkart deals refreshed daily!'}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-blue-100 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            {lang === 'gu' ? 'લાઇવ ડિસ્કાઉન્ટ્સ' : 'Live Discounts'}
          </span>
          <span>•</span>
          <span>{lang === 'gu' ? 'ચલણ: ₹ (INR)' : 'Currency: ₹ (INR)'}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                  Better Deals
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                  DEALS
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-lg mx-4 relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-900/90 text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-500 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700/60 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'gu' ? '🇮🇳 ગુજરાતી' : '🇬🇧 English'}</span>
            </button>

            {/* Admin Badge or Link */}
            {isAdmin ? (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.adminPanel}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/admin/login')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 text-xs font-medium hover:bg-slate-700 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">{t.adminLogin}</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 md:hidden border border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900 text-sm text-slate-100 pl-9 pr-4 py-2 rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>
        </div>

        {/* Secondary Navigation Row (Desktop) */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-slate-800/60 text-sm">
          <div className="flex items-center gap-6">
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="flex items-center gap-1.5 font-semibold text-slate-200 hover:text-blue-400 transition-colors py-1"
              >
                <Tag className="w-4 h-4 text-blue-400" />
                <span>{t.allCategories}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {catDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setCatDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-30 grid gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigate(`/category/${cat.slug}`);
                          setCatDropdownOpen(false);
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors"
                      >
                        <span>{lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name}</span>
                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                          {cat.slug.split('-')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Links */}
            <button
              onClick={() => navigate('/')}
              className={`hover:text-blue-400 transition-colors font-medium ${currentPath === '/' ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}
            >
              {t.home}
            </button>

            <button
              onClick={() => navigate('/offers')}
              className={`flex items-center gap-1 hover:text-amber-300 transition-colors font-medium ${currentPath === '/offers' ? 'text-amber-300 font-semibold' : 'text-slate-300'}`}
            >
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.specialOffers}</span>
            </button>

            <button
              onClick={() => navigate('/videos')}
              className={`flex items-center gap-1 hover:text-blue-400 transition-colors font-medium ${currentPath === '/videos' ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}
            >
              <Video className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.videos}</span>
            </button>

            <button
              onClick={() => navigate('/about')}
              className={`hover:text-blue-400 transition-colors font-medium ${currentPath === '/about' ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}
            >
              {t.aboutUs}
            </button>

            <button
              onClick={() => navigate('/contact')}
              className={`hover:text-blue-400 transition-colors font-medium ${currentPath === '/contact' ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}
            >
              {t.contactUs}
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-amber-400">⚡</span> 
              {lang === 'gu' ? 'સીધા એમેઝોન અને ફ્લિપકાર્ટ પર સુરક્ષિત ખરીદી' : 'Official Amazon & Flipkart Affiliate'}
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-slate-200 text-xs font-medium"
            >
              {t.home}
            </button>
            <button
              onClick={() => { navigate('/offers'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-amber-300 text-xs font-medium flex items-center gap-1"
            >
              <Percent className="w-3.5 h-3.5" />
              {t.specialOffers}
            </button>
            <button
              onClick={() => { navigate('/videos'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1"
            >
              <Video className="w-3.5 h-3.5" />
              {t.videos}
            </button>
            <button
              onClick={() => { navigate('/about'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-slate-200 text-xs font-medium"
            >
              {t.aboutUs}
            </button>
            <button
              onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-slate-200 text-xs font-medium"
            >
              {t.contactUs}
            </button>
            <button
              onClick={() => { navigate('/privacy'); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left rounded-lg bg-slate-800 text-slate-200 text-xs font-medium"
            >
              {t.privacyPolicy}
            </button>
          </div>

          <div className="pt-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t.categories}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { navigate(`/category/${c.slug}`); setMobileMenuOpen(false); }}
                  className="px-2.5 py-1 text-xs rounded-full bg-slate-800 hover:bg-blue-600/30 text-slate-300 border border-slate-700"
                >
                  {lang === 'gu' && c.nameGu ? c.nameGu : c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
