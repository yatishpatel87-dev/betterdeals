import React from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Send, 
  MessageCircle, 
  Instagram, 
  Youtube, 
  ExternalLink, 
  Heart,
  Info
} from 'lucide-react';
import { Category, Language, SiteSettings } from '../types';
import { getTranslation } from '../utils/translations';

interface FooterProps {
  navigate: (path: string) => void;
  lang: Language;
  categories: Category[];
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  navigate,
  lang,
  categories,
  settings,
}) => {
  const t = getTranslation(lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Affiliate Disclosure Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3.5">
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs leading-relaxed text-slate-300">
            <span className="font-semibold text-white mr-1.5">{t.affiliateNoticeTitle}:</span>
            {settings.affiliateDisclosure || t.affiliateNoticeText}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Better Deals
                </span>
                <p className="text-xs text-blue-400 font-medium">{t.brandTagline}</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              {settings.telegramUrl && (
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.telegramChannel}</span>
                </a>
              )}
              {settings.whatsappUrl && (
                <a
                  href={settings.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.whatsappCommunity}</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/offers')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>{t.specialOffers}</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded">HOT</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/videos')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.videos}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.contactUs}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.privacyPolicy}
                </button>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.categories}
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button 
                    onClick={() => navigate(`/category/${c.slug}`)}
                    className="hover:text-blue-400 transition-colors text-left truncate max-w-[180px]"
                  >
                    {lang === 'gu' && c.nameGu ? c.nameGu : c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Retailers & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {lang === 'gu' ? 'વિશ્વાસપાત્ર સ્ટોર્સ' : 'Partner Platforms'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block">Amazon India</span>
                <span className="text-[11px] text-slate-400">Amazon Associates Verified</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block">Flipkart</span>
                <span className="text-[11px] text-slate-400">Flipkart Affiliate Network</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block">Myntra & TataCliq</span>
                <span className="text-[11px] text-slate-400">Fashion & Gadgets Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>© {currentYear} Better Deals.</span>
            <span>{t.rightsReserved}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => navigate('/privacy')}
              className="hover:text-white transition-colors"
            >
              {lang === 'gu' ? 'પ્રાઈવસી પોલિસી' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate('/privacy')}
              className="hover:text-white transition-colors"
            >
              {lang === 'gu' ? 'નિયમો અને શરતો' : 'Terms of Service'}
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate('/admin')}
              className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
