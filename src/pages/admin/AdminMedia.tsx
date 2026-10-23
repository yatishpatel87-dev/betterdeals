import React, { useState } from 'react';
import { 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  ExternalLink, 
  Play, 
  X, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { VideoItem, Product, Language } from '../../types';
import { getTranslation } from '../../utils/translations';

interface AdminMediaProps {
  videos: VideoItem[];
  products: Product[];
  lang: Language;
  onSaveVideo: (video: VideoItem) => Promise<void>;
  onDeleteVideo: (id: string) => Promise<void>;
}

export const AdminMedia: React.FC<AdminMediaProps> = ({
  videos,
  products,
  lang,
  onSaveVideo,
  onDeleteVideo,
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Photos state for standalone uploaded asset gallery
  const [standalonePhotos, setStandalonePhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
  ]);

  // Video Form
  const defaultVideo: VideoItem = {
    id: '',
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    productId: products[0]?.id || '',
    productName: products[0]?.name || '',
    affiliateUrl: products[0]?.affiliateUrl || '',
    status: 'published',
    createdAt: new Date().toISOString(),
  };

  const [videoFormData, setVideoFormData] = useState<VideoItem>(defaultVideo);

  const handleAddNewVideo = () => {
    setVideoFormData({
      ...defaultVideo,
      id: `vid-${Date.now()}`,
      productId: products[0]?.id || '',
      productName: products[0]?.name || '',
      affiliateUrl: products[0]?.affiliateUrl || '',
    });
    setIsVideoModalOpen(true);
  };

  const handleEditVideo = (v: VideoItem) => {
    setVideoFormData({ ...v });
    setIsVideoModalOpen(true);
  };

  // Video File Upload handler (MP4/WebM)
  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert('Video file size must be less than 50MB.');
      return;
    }
    if (!['video/mp4', 'video/webm'].includes(file.type)) {
      alert('Supported formats: MP4 and WebM.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setVideoFormData(prev => ({
          ...prev,
          videoUrl: result,
          storagePath: `videos/${file.name}`,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Photo Upload handler
  const handlePhotoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB');
        continue;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        const res = evt.target?.result as string;
        if (res) {
          setStandalonePhotos(prev => [res, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const linkedProd = products.find(p => p.id === videoFormData.productId);
      const toSave = {
        ...videoFormData,
        productName: linkedProd?.name || videoFormData.productName,
        affiliateUrl: linkedProd?.affiliateUrl || videoFormData.affiliateUrl,
      };
      await onSaveVideo(toSave);
      setIsVideoModalOpen(false);
    } catch (err: any) {
      alert('Failed to save video: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteVideo = async () => {
    if (!deleteVideoId) return;
    try {
      await onDeleteVideo(deleteVideoId);
      setDeleteVideoId(null);
    } catch (err: any) {
      alert('Failed to delete video: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.mediaGallery}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'gu' 
              ? 'પ્રોડક્ટ ફોટોઝ અને પ્રમોશનલ વિડિયોઝ અપલોડ કરો અને મેનેજ કરો.' 
              : 'Upload and manage promotional videos and product imagery assets.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t.totalVideos} ({videos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'photos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.totalPhotos}</span>
            </button>
          </div>

          {activeTab === 'videos' ? (
            <button
              onClick={handleAddNewVideo}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'gu' ? 'નવો વિડિઓ' : 'Add Video'}</span>
            </button>
          ) : (
            <label className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg">
              <Upload className="w-4 h-4" />
              <span>{lang === 'gu' ? 'ફોટો અપલોડ' : 'Upload Photos'}</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoFiles}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Videos Tab Content */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div 
                className="relative aspect-video bg-black cursor-pointer overflow-hidden group"
                onClick={() => setPreviewVideo(vid)}
              >
                <img
                  src={vid.thumbnailUrl || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    vid.status === 'published' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {vid.status}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{vid.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{vid.description}</p>
                  {vid.productName && (
                    <span className="text-[10px] text-blue-400 font-semibold block mt-1 truncate">
                      Linked: {vid.productName}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setPreviewVideo(vid)}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditVideo(vid)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteVideoId(vid.id)}
                      className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photos Tab Content */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>
              {lang === 'gu'
                ? 'અહીં તમામ અપલોડ કરેલા મીડિયા ફોટા સંગ્રહિત છે. કોઈપણ પ્રોડક્ટ એડિટ કરતી વખતે તમે આ ઈમેજીસનો ઉપયોગ કરી શકો છો.'
                : 'Asset photo repository. You can copy photo URLs and use them across product listings.'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {standalonePhotos.map((photo, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md"
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(photo);
                      alert('Photo URL copied to clipboard!');
                    }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => setStandalonePhotos(prev => prev.filter((_, i) => i !== idx))}
                    className="p-1 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal (Add / Edit) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {videoFormData.id.startsWith('vid-') && !videos.some(v => v.id === videoFormData.id) ? 'Add Promotional Video' : 'Edit Promotional Video'}
              </h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="e.g. OnePlus 12R 5G Camera & Gaming Review"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Embed URL or Direct Video Link *
                </label>
                <input
                  type="url"
                  required
                  value={videoFormData.videoUrl}
                  onChange={(e) => setVideoFormData({ ...videoFormData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
                
                {/* Device Video File Upload option */}
                <div className="pt-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold cursor-pointer">
                    <Upload className="w-3 h-3 text-blue-400" />
                    <span>Upload MP4 / WebM file</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleVideoFile}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-slate-500 ml-2">Max 50MB</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  value={videoFormData.thumbnailUrl || ''}
                  onChange={(e) => setVideoFormData({ ...videoFormData, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Associate with Product (Optional)
                </label>
                <select
                  value={videoFormData.productId || ''}
                  onChange={(e) => {
                    const prod = products.find(p => p.id === e.target.value);
                    setVideoFormData({
                      ...videoFormData,
                      productId: e.target.value,
                      productName: prod?.name || '',
                      affiliateUrl: prod?.affiliateUrl || videoFormData.affiliateUrl,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white cursor-pointer"
                >
                  <option value="">-- No Product Link --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Description
                </label>
                <textarea
                  rows={2}
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  placeholder="Key summary or highlights..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={videoFormData.status}
                  onChange={(e) => setVideoFormData({ ...videoFormData, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                >
                  {loading ? 'Saving...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white truncate max-w-md">{previewVideo.title}</h4>
              <button onClick={() => setPreviewVideo(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              {previewVideo.videoUrl.includes('youtube.com') || previewVideo.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={previewVideo.videoUrl}
                  title={previewVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video src={previewVideo.videoUrl} controls autoPlay className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete video confirm */}
      {deleteVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <h4 className="text-base font-bold text-white">{t.confirmDelete}</h4>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button onClick={() => setDeleteVideoId(null)} className="py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
                {t.cancel}
              </button>
              <button onClick={confirmDeleteVideo} className="py-2 bg-red-600 text-white rounded-xl text-xs font-bold">
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
