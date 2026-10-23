import React, { useState } from 'react';
import { Flame, Percent, Sparkles, Filter } from 'lucide-react';
import { Product, Category, Language } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getTranslation } from '../utils/translations';

interface OffersPageProps {
  products: Product[];
  categories: Category[];
  lang: Language;
  navigate: (path: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  products,
  categories,
  lang,
  navigate,
}) => {
  const t = getTranslation(lang);
  const [minDiscount, setMinDiscount] = useState<number>(20);

  // Products with high discount
  const discounted = products
    .filter(p => p.discount >= minDiscount)
    .sort((a, b) => b.discount - a.discount);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-900/40 p-6 sm:p-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
          <Flame className="w-4 h-4 text-red-400 animate-pulse" />
          <span>{lang === 'gu' ? 'લાઇવ ડિસ્કાઉન્ટ ધમાકો' : 'Massive Price Drops'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {lang === 'gu' ? 'સ્પેશિયલ ડિસ્કાઉન્ટ ઑફર્સ & ડીલ્સ' : 'Special Discount Offers & Deals'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {lang === 'gu' 
            ? 'ટોચની બ્રાન્ડ્સ અને પ્રોડક્ટ્સ પર 70% સુધીની બચત મેળવો. તમામ લિંક્સ સીધી એમેઝોન અને ફ્લિપકાર્ટથી વેરિફાઇડ છે.'
            : 'Explore items with massive percentage discounts up to 70% off retail prices.'}
        </p>

        {/* Quick Discount Filter Pills */}
        <div className="pt-3 flex flex-wrap items-center gap-2">
          {[20, 30, 40, 50, 70].map((d) => (
            <button
              key={d}
              onClick={() => setMinDiscount(d)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                minDiscount === d
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {d}%+ {t.off}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{discounted.length} {lang === 'gu' ? 'ઑફર્સ મળી' : 'offers found'}</span>
        </div>

        {discounted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {discounted.map((p) => {
              const cat = categories.find(c => c.id === p.categoryId);
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryName={cat ? (lang === 'gu' && cat.nameGu ? cat.nameGu : cat.name) : undefined}
                  lang={lang}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              {lang === 'gu' ? 'પસંદ કરેલ ડિસ્કાઉન્ટ સ્તર માટે કોઈ પ્રોડક્ટ મળી નથી.' : 'No deals found for this discount threshold.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
