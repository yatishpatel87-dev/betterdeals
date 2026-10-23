import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Film, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import { User } from 'firebase/auth';
import { Language } from '../../types';
import { logoutUser } from '../../firebase/config';
import { getTranslation } from '../../utils/translations';

interface AdminLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  currentUser: User | null;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  navigate,
  currentUser,
  isAdmin,
  setIsAdmin,
  lang,
  setLang,
  children,
}) => {
  const t = getTranslation(lang);

  const handleLogout = async () => {
    await logoutUser();
    setIsAdmin(false);
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: t.dashboard, icon: LayoutDashboard },
    { path: '/admin/products', label: t.manageProducts, icon: Package },
    { path: '/admin/categories', label: t.manageCategories, icon: FolderTree },
    { path: '/admin/media', label: t.mediaGallery, icon: Film },
    { path: '/admin/settings', label: t.siteSettings, icon: Settings },
  ];

  if (!isAdmin) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">{t.accessDenied}</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t.unauthorizedMsg}
        </p>
        <button
          onClick={() => navigate('/admin/login')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          {lang === 'gu' ? 'એડમિન લૉગિન પેજ પર જાઓ' : 'Go to Admin Login'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Admin Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black text-white">Better Deals Admin</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROD ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentUser?.email || 'Authorized Administrator'}
            </p>
          </div>
        </div>

        {/* Global Admin Actions */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'gu' ? '🇮🇳 ગુજરાતી' : '🇬🇧 English'}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'લાઈવ સાઈટ જુઓ' : 'Public Site'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Admin View Content */}
      <main>{children}</main>
    </div>
  );
};
