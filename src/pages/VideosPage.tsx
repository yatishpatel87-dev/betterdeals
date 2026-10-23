import React, { useState } from 'react';
import { Video, Play, ExternalLink, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { VideoItem, Product, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface VideosPageProps {
  videos: VideoItem[];
  products: Product[];
  lang: Language;
  navigate: (path: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({
  videos,
  products,
  lang,
  navigate,
}) => {
  const t = getTranslation(lang);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
          <Video className="w-4 h-4 text-blue-400" />
          <span>{lang === 'gu' ? 'વિડીયો સમીક્ષા અને અનબોક્સિંગ' : 'Watch & Buy Directly'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {lang === 'gu' ? 'પ્રોમો વિડિયોઝ અને પ્રોડક્ટ ડેમો' : 'Promotional Product Videos'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {lang === 'gu' 
            ? 'ઉત્પાદનો ખરીદતા પહેલા તેનો વાસ્તવિક ડેમો અને રિવ્યુ જુઓ. દરેક વિડિયો સાથે સીધી એફિલિએટ ખરીદી લિંક જોડાયેલી છે.'
            : 'Experience products in action before purchasing. Each demo features instant verified store checkout links.'}
        </p>
      </div>

      {/* Video Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const product = products.find(p => p.id === vid.productId);
            const affiliateUrl = vid.affiliateUrl || product?.affiliateUrl;

            return (
              <div
                key={vid.id}
                className="group bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 shadow-lg hover:shadow-2xl transition-all flex flex-col"
              >
                {/* Video Player / Thumbnail Preview */}
                <div 
                  className="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideo(vid)}
                >
                  <img
                    src={vid.thumbnailUrl || product?.thumbnailUrl || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600/90 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors line-clamp-2">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>

                  {product && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                      <div className="truncate max-w-[180px]">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'gu' ? 'સંલગ્ન પ્રોડક્ટ' : 'Linked Product'}</span>
                        <span className="text-xs font-bold text-white truncate block">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-amber-400 block">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.discount > 0 && (
                          <span className="text-[10px] text-red-400 font-semibold">{product.discount}% {t.off}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    {product && (
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.viewDetails}</span>
                      </button>
                    )}

                    {affiliateUrl && (
                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        <span>{t.buyNow}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {lang === 'gu' ? 'હાલમાં કોઈ પ્રોમો વિડિયો ઉપલબ્ધ નથી.' : 'No promotional videos uploaded yet.'}
          </p>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.videoUrl.includes('youtube.com') || activeVideo.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950">
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                {activeVideo.description}
              </p>

              {activeVideo.affiliateUrl && (
                <a
                  href={activeVideo.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30"
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
