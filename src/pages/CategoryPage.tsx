import React, { useState } from 'react';
import { ArrowLeft, Filter, Sparkles, Tag } from 'lucide-react';
import { Product, Category, Language } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getTranslation } from '../utils/translations';

interface CategoryPageProps {
  categorySlug: string;
  products: Product[];
  categories: Category[];
  lang: Language;
  navigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  products,
  categories,
  lang,
  navigate,
}) => {
  const t = getTranslation(lang);
  const category = categories.find(c => c.slug === categorySlug);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'discount' | 'priceLow' | 'priceHigh'>('latest');

  if (!category) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">
          {lang === 'gu' ? 'શ્રેણી મળી નથી' : 'Category Not Found'}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          {lang === 'gu' ? 'મુખ્ય પૃષ્ઠ પર જાઓ' : 'Return to Home'}
        </button>
      </div>
    );
  }

  let catProducts = products.filter(p => p.categoryId === category.id);
  if (selectedPlatform !== 'all') {
    catProducts = catProducts.filter(p => p.affiliatePlatform === selectedPlatform);
  }

  catProducts.sort((a, b) => {
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-900/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-3">
        <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-wider">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-blue-300 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.home}</span>
          </button>
          <span>/</span>
          <span>{lang === 'gu' ? 'શ્રેણી' : 'Category'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3">
          <Tag className="w-8 h-8 text-blue-400" />
          <span>{lang === 'gu' && category.nameGu ? category.nameGu : category.name}</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {lang === 'gu' 
            ? `${category.nameGu || category.name} પર શ્રેષ્ઠ એમેઝોન અને ફ્લિપકાર્ટ એફિલિએટ ડીલ્સ, ભારે ડિસ્કાઉન્ટ સાથે.`
            : `Hand-curated affiliate discount deals and price drops for ${category.name}.`}
        </p>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
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
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {p === 'all' ? t.allStores : p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 shrink-0 font-medium">{t.sortBy}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="latest">{t.sortLatest}</option>
            <option value="discount">{t.sortDiscount}</option>
            <option value="priceLow">{t.sortPriceLow}</option>
            <option value="priceHigh">{t.sortPriceHigh}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {catProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {catProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categoryName={lang === 'gu' && category.nameGu ? category.nameGu : category.name}
              lang={lang}
              onViewDetails={(id) => navigate(`/product/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {lang === 'gu' ? 'આ કેટેગરીમાં હાલમાં કોઈ પ્રોડક્ટ ઉપલબ્ધ નથી.' : 'No products found in this category currently.'}
          </p>
        </div>
      )}
    </div>
  );
};
