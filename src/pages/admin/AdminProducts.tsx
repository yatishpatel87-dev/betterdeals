import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  Star,
  Check
} from 'lucide-react';
import { Product, Category, Language } from '../../types';
import { getTranslation } from '../../utils/translations';
import { ProductCard } from '../../components/ProductCard';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  lang: Language;
  onSaveProduct: (product: Product) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  lang,
  onSaveProduct,
  onDeleteProduct,
}) => {
  const t = getTranslation(lang);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Form state
  const defaultProduct: Product = {
    id: '',
    name: '',
    description: '',
    categoryId: categories[0]?.id || 'mobiles-gadgets',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: '',
    affiliateUrl: '',
    affiliatePlatform: 'Amazon',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.5,
    reviewCount: 120,
  };

  const [formData, setFormData] = useState<Product>(defaultProduct);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Handle URL params like ?action=new
  useEffect(() => {
    if (window.location.search.includes('action=new')) {
      handleAddNew();
    }
  }, []);

  const handleAddNew = () => {
    const newId = `prod-${Date.now()}`;
    setFormData({
      ...defaultProduct,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setUrlError(null);
    setIsEditModalOpen(true);
  };

  const handleEdit = (prod: Product) => {
    setFormData({ ...prod });
    setUrlError(null);
    setIsEditModalOpen(true);
  };

  const handlePriceChange = (priceVal: number, originalVal: number) => {
    let discount = 0;
    if (originalVal > 0 && originalVal > priceVal) {
      discount = Math.round(((originalVal - priceVal) / originalVal) * 100);
    }
    setFormData(prev => ({
      ...prev,
      price: priceVal,
      originalPrice: originalVal,
      discount,
    }));
  };

  // Image Upload handler (supports multi-upload via FileReader base64)
  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be under 5MB.');
        continue;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Supported formats: JPG, PNG, WebP.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData(prev => {
            const updated = [...(prev.imageUrls || []), result];
            return {
              ...prev,
              imageUrls: updated,
              thumbnailUrl: prev.thumbnailUrl || result,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    if (!newImageUrl.startsWith('http')) {
      alert('Image URL must start with http:// or https://');
      return;
    }
    setFormData(prev => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), newImageUrl.trim()],
      thumbnailUrl: prev.thumbnailUrl || newImageUrl.trim(),
    }));
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => {
      const updated = prev.imageUrls.filter((_, i) => i !== index);
      return {
        ...prev,
        imageUrls: updated,
        thumbnailUrl: prev.thumbnailUrl === prev.imageUrls[index] ? (updated[0] || '') : prev.thumbnailUrl,
      };
    });
  };

  const handleSetPrimaryThumbnail = (img: string) => {
    setFormData(prev => ({ ...prev, thumbnailUrl: img }));
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.affiliateUrl.startsWith('http://') && !formData.affiliateUrl.startsWith('https://')) {
      setUrlError('Affiliate URL must start with http:// or https://');
      return;
    }
    setUrlError(null);
    setSaveLoading(true);

    try {
      await onSaveProduct(formData);
      setIsEditModalOpen(false);
      setToastMsg(t.successSaved);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: any) {
      console.error(err);
      alert('Failed to save product: ' + (err.message || 'Unknown error'));
    } finally {
      setSaveLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await onDeleteProduct(deleteConfirmId);
      setDeleteConfirmId(null);
      setToastMsg(t.successDeleted);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch = search === '' || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.categoryId === filterCategory;
    const matchesStat = filterStatus === 'all' || p.status === filterStatus;
    const matchesPlat = filterPlatform === 'all' || p.affiliatePlatform === filterPlatform;

    return matchesSearch && matchesCat && matchesStat && matchesPlat;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header & Add button */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.manageProducts}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'gu' 
              ? 'નવા એફિલિએટ ઉત્પાદનો ઉમેરો, ફોટા અપલોડ કરો, અને ડિસ્કાઉન્ટ સેટ કરો.' 
              : 'Add affiliate deals, validate links, manage photo galleries, and publish.'}
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewProduct}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'gu' ? 'પ્રોડક્ટનું નામ શોધો...' : 'Search product title or ID...'}
            className="w-full bg-slate-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">{lang === 'gu' ? 'તમામ કેટેગરી' : 'All Categories'}</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {lang === 'gu' && c.nameGu ? c.nameGu : c.name}
            </option>
          ))}
        </select>

        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">{lang === 'gu' ? 'તમામ પ્લેટફોર્મ' : 'All Platforms'}</option>
          <option value="Amazon">Amazon</option>
          <option value="Flipkart">Flipkart</option>
          <option value="Myntra">Myntra</option>
          <option value="TataCliq">TataCliq</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">{lang === 'gu' ? 'તમામ સ્ટેટસ' : 'All Status'}</option>
          <option value="published">{t.published}</option>
          <option value="draft">{t.draft}</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Store</th>
                <th className="py-3.5 px-4">Deal Price</th>
                <th className="py-3.5 px-4">M.R.P.</th>
                <th className="py-3.5 px-4">Discount</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((prod) => {
                const cat = categories.find(c => c.id === prod.categoryId);
                return (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 max-w-sm">
                        <img
                          src={prod.thumbnailUrl}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-bold text-white block truncate">{prod.name}</span>
                          <span className="text-[10px] text-slate-500 block">{prod.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 truncate max-w-[120px]">
                      {cat ? (lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {prod.affiliatePlatform}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 font-bold">
                        {prod.discount}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={async () => {
                          await onSaveProduct({ ...prod, featured: !prod.featured });
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          prod.featured 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={async () => {
                          const nextStatus = prod.status === 'published' ? 'draft' : 'published';
                          await onSaveProduct({ ...prod, status: nextStatus });
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          prod.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {prod.status === 'published' ? t.published : t.draft}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewProduct(prod)}
                          title={t.previewProduct}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={prod.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open Affiliate URL"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleEdit(prod)}
                          title="Edit"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          title="Delete"
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

      {/* Add / Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 my-8 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">
                {formData.id.startsWith('prod-') && !products.some(p => p.id === formData.id) ? t.addNewProduct : t.editProduct}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-5">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. OnePlus 12R 5G (8GB RAM, 128GB Storage)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'gu' && c.nameGu ? c.nameGu : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Affiliate Platform *
                  </label>
                  <select
                    value={formData.affiliatePlatform}
                    onChange={(e) => setFormData({ ...formData, affiliatePlatform: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Amazon">Amazon India</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Myntra">Myntra</option>
                    <option value="TataCliq">TataCliq</option>
                    <option value="Ajio">Ajio</option>
                    <option value="Other">Other Store</option>
                  </select>
                </div>
              </div>

              {/* Pricing Row: Price, Original Price, Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Selling Deal Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.price}
                    onChange={(e) => handlePriceChange(Number(e.target.value), formData.originalPrice)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Original M.R.P. (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => handlePriceChange(formData.price, Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Calculated Discount (%)
                  </label>
                  <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-black text-emerald-400">
                    {formData.discount}% {t.off}
                  </div>
                </div>
              </div>

              {/* Affiliate Purchase URL (Strictly validated) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Affiliate Purchase URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.affiliateUrl}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                  placeholder="https://www.amazon.in/dp/...?tag=betterdeals-21"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
                {urlError && (
                  <p className="text-[11px] text-red-400 mt-1">{urlError}</p>
                )}
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Must be a valid https:// URL with your affiliate tag.
                </span>
              </div>

              {/* Promotional Video URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Promotional Video (YouTube Embed or direct MP4 URL)
                </label>
                <input
                  type="url"
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Product Description & Key Highlights *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Highlight features, warranty, specs..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Photo Upload & Gallery Management */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span>Product Images & Thumbnail</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    JPG, PNG, WebP (Max 5MB each)
                  </span>
                </div>

                {/* Upload from device */}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors">
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Upload Images from Device</span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageFiles}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-slate-500">or enter image link:</span>
                </div>

                {/* Add Image by URL */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>

                {/* Image Thumbnails & Primary Selector */}
                {formData.imageUrls && formData.imageUrls.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                    {formData.imageUrls.map((img, idx) => {
                      const isThumb = formData.thumbnailUrl === img;
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-900 group ${
                            isThumb ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          
                          {/* Thumbnail badge */}
                          {isThumb ? (
                            <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[8px] font-bold px-1 rounded">
                              Main
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryThumbnail(img)}
                              className="absolute top-1 left-1 bg-slate-900/80 text-slate-300 hover:text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Make Main
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-600/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Status and Featured Checks */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span>{t.featured}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <span>{t.status}:</span>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="bg-slate-950 text-xs text-white border border-slate-800 rounded-lg px-2.5 py-1"
                    >
                      <option value="published">{t.published}</option>
                      <option value="draft">{t.draft}</option>
                    </select>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewProduct(formData)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.previewProduct}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 disabled:opacity-50"
                  >
                    {saveLoading ? 'Saving...' : t.saveProduct}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>{t.previewProduct}</span>
              </span>
              <button
                onClick={() => setPreviewProduct(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
            
            <ProductCard
              product={previewProduct}
              lang={lang}
              categoryName={categories.find(c => c.id === previewProduct.categoryId)?.name}
              onViewDetails={() => {}}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              {t.confirmDelete}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'gu' 
                ? 'આ ક્રિયા પાછી ખેંચી શકાતી નથી. પ્રોડક્ટ અને તેના સંબંધિત રેકોર્ડ્સ હટાવી દેવામાં આવશે.' 
                : 'This operation cannot be undone and will permanently remove this item from the catalog.'}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
