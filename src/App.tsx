import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/config';
import { 
  fetchProducts, 
  fetchCategories, 
  fetchVideos, 
  fetchSettings, 
  saveProductDoc, 
  deleteProductDoc, 
  saveCategoryDoc, 
  deleteCategoryDoc, 
  saveVideoDoc, 
  deleteVideoDoc, 
  saveSettingsDoc, 
  isUserAdmin,
  seedInitialDataIfEmpty,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_VIDEOS,
  INITIAL_SETTINGS
} from './firebase/db';
import { Product, Category, VideoItem, SiteSettings, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OffersPage } from './pages/OffersPage';
import { VideosPage } from './pages/VideosPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [lang, setLang] = useState<Language>('gu'); // Default language: Gujarati as requested
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  // Auth & Admin states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // Synchronize client-side routing
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const adminCheck = await isUserAdmin(user);
        setIsAdmin(adminCheck);
        if (adminCheck) {
          await seedInitialDataIfEmpty(true);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load Firestore Data
  const loadData = async () => {
    try {
      const [fetchedCats, fetchedProds, fetchedVids, fetchedSet] = await Promise.all([
        fetchCategories(),
        fetchProducts(true), // Load all for memory cache
        fetchVideos(true),
        fetchSettings(),
      ]);
      setCategories(fetchedCats);
      setProducts(fetchedProds);
      setVideos(fetchedVids);
      setSettings(fetchedSet);
    } catch (err) {
      console.warn('Initial data load warning:', err);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAdmin]);

  // Product Operations
  const handleSaveProduct = async (product: Product) => {
    await saveProductDoc(product);
    await loadData();
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductDoc(id);
    await loadData();
  };

  const handleTogglePublishProduct = async (product: Product) => {
    const nextStatus = product.status === 'published' ? 'draft' : 'published';
    await saveProductDoc({ ...product, status: nextStatus });
    await loadData();
  };

  // Category Operations
  const handleSaveCategory = async (cat: Category) => {
    await saveCategoryDoc(cat);
    await loadData();
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategoryDoc(id);
    await loadData();
  };

  // Video Operations
  const handleSaveVideo = async (video: VideoItem) => {
    await saveVideoDoc(video);
    await loadData();
  };

  const handleDeleteVideo = async (id: string) => {
    await deleteVideoDoc(id);
    await loadData();
  };

  // Settings Operation
  const handleSaveSettings = async (newSettings: SiteSettings) => {
    await saveSettingsDoc(newSettings);
    setSettings(newSettings);
  };

  // Public products view (filters out drafts for non-admins)
  const publicProducts = isAdmin ? products : products.filter(p => p.status === 'published');
  const publicVideos = isAdmin ? videos : videos.filter(v => v.status === 'published');

  // Route Resolver
  const renderRoute = () => {
    // 1. Admin Login
    if (currentPath === '/admin/login') {
      return (
        <AdminLogin
          currentUser={currentUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          navigate={navigate}
          lang={lang}
        />
      );
    }

    // 2. Admin Protected Routes
    if (currentPath.startsWith('/admin')) {
      return (
        <AdminLayout
          currentPath={currentPath}
          navigate={navigate}
          currentUser={currentUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          lang={lang}
          setLang={setLang}
        >
          {currentPath === '/admin' && (
            <AdminDashboard
              products={products}
              categories={categories}
              videos={videos}
              lang={lang}
              navigate={navigate}
              onEditProduct={(p) => navigate(`/admin/products?edit=${p.id}`)}
              onDeleteProduct={handleDeleteProduct}
              onTogglePublish={handleTogglePublishProduct}
            />
          )}

          {currentPath === '/admin/products' && (
            <AdminProducts
              products={products}
              categories={categories}
              lang={lang}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {currentPath === '/admin/categories' && (
            <AdminCategories
              categories={categories}
              lang={lang}
              onSaveCategory={handleSaveCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {currentPath === '/admin/media' && (
            <AdminMedia
              videos={videos}
              products={products}
              lang={lang}
              onSaveVideo={handleSaveVideo}
              onDeleteVideo={handleDeleteVideo}
            />
          )}

          {currentPath === '/admin/settings' && (
            <AdminSettings
              settings={settings}
              lang={lang}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </AdminLayout>
      );
    }

    // 3. Customer Category Page: /category/:slug
    if (currentPath.startsWith('/category/')) {
      const slug = currentPath.replace('/category/', '').split('/')[0];
      return (
        <CategoryPage
          categorySlug={slug}
          products={publicProducts}
          categories={categories}
          lang={lang}
          navigate={navigate}
        />
      );
    }

    // 4. Customer Product Details: /product/:id
    if (currentPath.startsWith('/product/')) {
      const id = currentPath.replace('/product/', '').split('/')[0];
      return (
        <ProductDetailPage
          productId={id}
          products={publicProducts}
          categories={categories}
          videos={publicVideos}
          lang={lang}
          navigate={navigate}
        />
      );
    }

    // 5. Customer Offers Page: /offers
    if (currentPath === '/offers') {
      return (
        <OffersPage
          products={publicProducts}
          categories={categories}
          lang={lang}
          navigate={navigate}
        />
      );
    }

    // 6. Customer Videos Page: /videos
    if (currentPath === '/videos') {
      return (
        <VideosPage
          videos={publicVideos}
          products={publicProducts}
          lang={lang}
          navigate={navigate}
        />
      );
    }

    // 7. Customer About Page: /about
    if (currentPath === '/about') {
      return <AboutPage lang={lang} />;
    }

    // 8. Customer Contact Page: /contact
    if (currentPath === '/contact') {
      return <ContactPage settings={settings} lang={lang} />;
    }

    // 9. Customer Privacy Policy & Affiliate Disclosure: /privacy
    if (currentPath === '/privacy') {
      return <PrivacyPage settings={settings} lang={lang} />;
    }

    // Default: Customer Homepage: /
    return (
      <HomePage
        products={publicProducts}
        categories={categories}
        videos={publicVideos}
        settings={settings}
        lang={lang}
        navigate={navigate}
        searchQuery={searchQuery}
      />
    );
  };

  const isAdminRoute = currentPath.startsWith('/admin') && currentPath !== '/admin/login';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Show Public Header on Customer Pages and Admin Login */}
      {!isAdminRoute && (
        <Header
          currentPath={currentPath}
          navigate={navigate}
          lang={lang}
          setLang={setLang}
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAdmin={isAdmin}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderRoute()}
      </main>

      {/* Public Footer */}
      {!isAdminRoute && (
        <Footer
          navigate={navigate}
          lang={lang}
          categories={categories}
          settings={settings}
        />
      )}
    </div>
  );
}
