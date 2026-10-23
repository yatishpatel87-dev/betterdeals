import React, { useState } from 'react';
import { 
  ExternalLink, 
  Share2, 
  Video, 
  Star, 
  CheckCircle, 
  Copy, 
  Check, 
  Eye,
  Sparkles
} from 'lucide-react';
import { Product, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  lang: Language;
  onViewDetails: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  lang,
  onViewDetails,
}) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslation(lang);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const platformBadgeColor = {
    Amazon: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    Flipkart: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    Myntra: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    TataCliq: 'bg-red-500/10 text-red-300 border-red-500/30',
    Ajio: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    Other: 'bg-slate-700 text-slate-300 border-slate-600',
  }[product.affiliatePlatform] || 'bg-slate-700 text-slate-300 border-slate-600';

  return (
    <div className="group relative bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-blue-500/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Badges overlay */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product.id)}>
        <img
          src={product.thumbnailUrl || (product.imageUrls && product.imageUrls[0]) || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
            <span>{product.discount}%</span>
            <span className="font-semibold text-[10px]">{t.off}</span>
          </div>
        )}

        {/* Platform Badge */}
        <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[11px] font-bold border backdrop-blur-md ${platformBadgeColor}`}>
          {product.affiliatePlatform}
        </div>

        {/* Video available icon */}
        {product.videoUrl && (
          <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-sky-300 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 border border-slate-700">
            <Video className="w-3 h-3 text-sky-400" />
            <span>{t.promotionalVideo}</span>
          </div>
        )}

        {/* Quick Share button */}
        <button
          onClick={handleShare}
          title={t.shareDeal}
          className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700/80 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Body Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-medium text-blue-400 truncate max-w-[140px]">
              {categoryName || 'Featured Deal'}
            </span>
            {product.rating ? (
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
                {product.reviewCount && (
                  <span className="text-slate-500 font-normal">({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})</span>
                )}
              </div>
            ) : null}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product.id)}
            className="font-bold text-sm text-slate-100 hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Block */}
        <div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg sm:text-xl font-black text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {product.originalPrice > product.price && (
            <p className="text-[11px] text-emerald-400 font-medium">
              {t.youSave} ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </p>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800">
            <button
              onClick={() => onViewDetails(product.id)}
              className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700/60"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.viewDetails}</span>
            </button>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t.buyNow}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
