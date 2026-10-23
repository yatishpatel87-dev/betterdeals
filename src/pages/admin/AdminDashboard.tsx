import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  FileEdit, 
  FolderTree, 
  Image as ImageIcon, 
  Video, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Eye, 
  Sparkles,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Product, Category, VideoItem, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  videos: VideoItem[];
  lang: Language;
  navigate: (path: string) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onTogglePublish: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  videos,
  lang,
  navigate,
  onEditProduct,
  onDeleteProduct,
  onTogglePublish,
}) => {
  const t = getTranslation(lang);

  const publishedCount = products.filter(p => p.status === 'published').length;
  const draftCount = products.filter(p => p.status === 'draft').length;
  const totalPhotosCount = products.reduce((acc, p) => acc + (p.imageUrls?.length || 1), 0);

  const stats = [
    { label: t.totalProducts, value: products.length, icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: t.publishedCount, value: publishedCount, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: t.draftCount, value: draftCount, icon: FileEdit, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: t.totalCategoriesCount, value: categories.length, icon: FolderTree, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: t.totalPhotos, value: totalPhotosCount, icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: t.totalVideos, value: videos.length, icon: Video, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 line-clamp-1">
                  {s.label}
                </span>
                <div className={`p-1.5 rounded-lg ${s.bg} ${s.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {s.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white">
            {lang === 'gu' ? 'ઝડપી એક્શન્સ' : 'Quick Actions'}:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/admin/products?action=new')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addNewProduct}</span>
          </button>
          <button
            onClick={() => navigate('/admin/categories')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <FolderTree className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.manageCategories}</span>
          </button>
          <button
            onClick={() => navigate('/admin/media')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'gu' ? 'મીડિયા અપલોડ' : 'Upload Media'}</span>
          </button>
          <button
            onClick={() => navigate('/admin/settings')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>{t.siteSettings}</span>
          </button>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              {lang === 'gu' ? 'તાજેતરની પ્રોડક્ટ્સ અને ડીલ્સ' : 'Recent Products & Deals'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'gu' ? 'તમામ એફિલિએટ લિંક્સ અને સ્થિતિ' : 'Manage affiliate links, pricing and status'}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/products')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300"
          >
            {t.viewAll} ({products.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Store</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {products.slice(0, 8).map((p) => {
                const cat = categories.find(c => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5 max-w-xs">
                        <img
                          src={p.thumbnailUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=100&q=80'}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover bg-slate-950 shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-white font-bold block truncate">{p.name}</span>
                          <span className="text-[10px] text-slate-400 truncate block">{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 truncate max-w-[120px]">
                      {cat ? (lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name) : '-'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {p.affiliatePlatform}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-white">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.discount > 0 && (
                        <span className="ml-1 text-[10px] text-emerald-400">({p.discount}% {t.off})</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => onTogglePublish(p)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          p.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {p.status === 'published' ? t.published : t.draft}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open affiliate link"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => onEditProduct(p)}
                          title="Edit product"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          title="Delete product"
                          className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
