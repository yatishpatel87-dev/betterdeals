import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Share2, 
  Check, 
  ShieldCheck, 
  Star, 
  Percent, 
  Video, 
  Send, 
  MessageCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { Product, Category, VideoItem, Language } from '../types';
import { ProductCard } from '../components/ProductCard';
import { getTranslation } from '../utils/translations';

interface ProductDetailPageProps {
  productId: string;
  products: Product[];
  categories: Category[];
  videos: VideoItem[];
  lang: Language;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  products,
  categories,
  videos,
  lang,
  navigate,
}) => {
  const t = getTranslation(lang);
  const product = products.find(p => p.id === productId);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">
          {lang === 'gu' ? 'પ્રોડક્ટ મળી નથી' : 'Product Not Found'}
        </h2>
        <p className="text-slate-400 text-sm">
          {lang === 'gu' ? 'તમે શોધતા પ્રોડક્ટની લિંક બદલાઈ ગઈ હોય શકે છે.' : 'The product you are looking for might have expired or been removed.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          {lang === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા જાઓ' : 'Back to Home'}
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const allImages = [
    product.thumbnailUrl,
    ...(product.imageUrls || []),
  ].filter(Boolean);

  const currentDisplayImage = selectedImage || product.thumbnailUrl || (allImages[0] || '');
  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const linkedVideo = videos.find(v => v.productId === product.id) || (product.videoUrl ? {
    id: 'embedded',
    title: product.name,
    description: '',
    videoUrl: product.videoUrl,
    status: 'published' as const,
    createdAt: '',
  } : null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`🔥 Check out this awesome deal on ${product.name}: ₹${product.price} (${product.discount}% OFF)! ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(`🔥 Best Deal: ${product.name} at ₹${product.price} (${product.discount}% OFF)`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'gu' ? 'પાછળ' : 'Back'}</span>
        </button>
        <span>/</span>
        <span 
          onClick={() => category && navigate(`/category/${category.slug}`)}
          className="hover:text-blue-400 cursor-pointer text-slate-300 font-medium truncate max-w-[150px]"
        >
          {category ? (lang === 'gu' && category.nameGu ? category.nameGu : category.name) : 'Deals'}
        </span>
        <span>/</span>
        <span className="text-slate-100 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        
        {/* Gallery Column (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-sm px-3 py-1 rounded-xl shadow-lg">
                {product.discount}% {t.off}
              </div>
            )}
            <div className="absolute top-4 right-4 bg-slate-900/90 text-blue-300 border border-blue-500/30 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
              {product.affiliatePlatform}
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-950 transition-all ${
                    currentDisplayImage === img ? 'border-blue-500 scale-105' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Buy Column (Span 6) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category tag & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                {category ? (lang === 'gu' && category.nameGu ? category.nameGu : category.name) : 'Verified Deal'}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400 border border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  {product.reviewCount && (
                    <span className="text-slate-400 font-normal">({product.reviewCount.toLocaleString('en-IN')})</span>
                  )}
                </div>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-slate-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {product.discount}% {t.off}
                  </span>
                )}
              </div>

              {product.originalPrice > product.price && (
                <p className="text-xs text-emerald-400 font-medium">
                  {lang === 'gu' 
                    ? `તમે બચાવો છો ₹${(product.originalPrice - product.price).toLocaleString('en-IN')}` 
                    : `You save ₹${(product.originalPrice - product.price).toLocaleString('en-IN')} on this deal`}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t.keyFeatures}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action & Disclosure Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            {/* Main Affiliate CTA Button */}
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{t.buyNow} ({product.affiliatePlatform})</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Affiliate Disclosure Notice */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                {lang === 'gu'
                  ? `તમે જ્યારે આ લિંકથી ${product.affiliatePlatform} પર ખરીદી કરશો ત્યારે Better Deals ને કોઈ વધારાના ચાર્જ વગર નાનું કમિશન મળે છે.`
                  : `When you purchase via this link on ${product.affiliatePlatform}, Better Deals may earn an affiliate commission at no extra charge to you.`}
              </span>
            </div>

            {/* Share options */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.shareDeal}:</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareTelegram}
                  className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/30 transition-colors"
                  title="Share on Telegram"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{copied ? t.copied : (lang === 'gu' ? 'લિંક કોપી' : 'Copy Link')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Video Section (If available) */}
      {linkedVideo && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">
              {lang === 'gu' ? 'પ્રોડક્ટ ડેમો અને રિવ્યુ વિડિયો' : 'Product Demo & Review Video'}
            </h3>
          </div>

          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            {linkedVideo.videoUrl.includes('youtube.com') || linkedVideo.videoUrl.includes('youtu.be') ? (
              <iframe
                src={linkedVideo.videoUrl}
                title={product.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={linkedVideo.videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{t.relatedDeals}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                categoryName={category ? (lang === 'gu' && category.nameGu ? category.nameGu : category.name) : undefined}
                lang={lang}
                onViewDetails={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
