import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, BOOTSTRAP_ADMIN_EMAILS, loginWithGoogle, logoutUser } from './config';
import { Product, Category, VideoItem, SiteSettings, AdminUser } from '../types';
import { User } from 'firebase/auth';

export { loginWithGoogle, logoutUser };

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'mobiles-gadgets',
    name: 'Mobile and Gadgets',
    nameGu: 'મોબાઇલ અને ગેજેટ્સ',
    slug: 'mobiles-gadgets',
    icon: 'Smartphone',
    displayOrder: 1,
    status: 'active',
  },
  {
    id: 'laptops-computers',
    name: 'Laptops and Computers',
    nameGu: 'લેપટોપ અને કોમ્પ્યુટર્સ',
    slug: 'laptops-computers',
    icon: 'Laptop',
    displayOrder: 2,
    status: 'active',
  },
  {
    id: 'electronics',
    name: 'Electronics & Audio',
    nameGu: 'ઇલેક્ટ્રોનિક્સ અને ઓડિયો',
    slug: 'electronics',
    icon: 'Headphones',
    displayOrder: 3,
    status: 'active',
  },
  {
    id: 'home-kitchen',
    name: 'Home and Kitchen',
    nameGu: 'હોમ અને કિચન',
    slug: 'home-kitchen',
    icon: 'Home',
    displayOrder: 4,
    status: 'active',
  },
  {
    id: 'fashion-clothing',
    name: 'Fashion and Clothing',
    nameGu: 'ફેશન અને કપડાં',
    slug: 'fashion-clothing',
    icon: 'Shirt',
    displayOrder: 5,
    status: 'active',
  },
  {
    id: 'beauty-personal-care',
    name: 'Beauty and Personal Care',
    nameGu: 'બ્યુટી અને પર્સનલ કેર',
    slug: 'beauty-personal-care',
    icon: 'Sparkles',
    displayOrder: 6,
    status: 'active',
  },
  {
    id: 'health-fitness',
    name: 'Health and Fitness',
    nameGu: 'હેલ્થ અને ફિટનેસ',
    slug: 'health-fitness',
    icon: 'Activity',
    displayOrder: 7,
    status: 'active',
  },
  {
    id: 'books-education',
    name: 'Books and Education',
    nameGu: 'પુસ્તકો અને શિક્ષણ',
    slug: 'books-education',
    icon: 'BookOpen',
    displayOrder: 8,
    status: 'active',
  },
  {
    id: 'kids-products',
    name: "Kids' Products",
    nameGu: 'બાળકો માટે ઉત્પાદનો',
    slug: 'kids-products',
    icon: 'Smile',
    displayOrder: 9,
    status: 'active',
  },
  {
    id: 'special-offers',
    name: 'Special Offers & Deals',
    nameGu: 'સ્પેશિયલ ઑફર્સ અને ડીલ્સ',
    slug: 'special-offers',
    icon: 'Flame',
    displayOrder: 10,
    status: 'active',
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Better Deals',
  tagline: 'Smart Links • Better Deals',
  bannerHeadline: 'આજના સુપર ધમાકા ડિસ્કાઉન્ટ સોદા!',
  bannerSubheadline: 'Amazon અને Flipkart પરથી ચકાસાયેલા શ્રેષ્ઠ ઉત્પાદનો 70% સુધીની છૂટ સાથે.',
  bannerImageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
  bannerLink: '/offers',
  currency: '₹',
  affiliateDisclosure: 'Better Deals એ એક એફિલિએટ વેબસાઇટ છે. જ્યારે તમે આ સાઇટ પરની લિંક્સ દ્વારા પ્રોડક્ટ્સ ખરીદો છો, ત્યારે અમે સંલગ્ન સ્ટોર્સ (જેવા કે Amazon, Flipkart) પાસેથી કોઈ વધારાના ખર્ચ વિના નાનું કમિશન મેળવી શકીએ છીએ. કિંમતો અને ઉપલબ્ધતા સ્ટોરની પોલિસી મુજબ બદલાઈ શકે છે.',
  contactEmail: 'contact@betterdeals.in',
  contactPhone: '+91 98765 43210',
  instagramUrl: 'https://instagram.com',
  telegramUrl: 'https://t.me/betterdeals_official',
  whatsappUrl: 'https://whatsapp.com/channel/betterdeals',
  youtubeUrl: 'https://youtube.com',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-oneplus-12r',
    name: 'OnePlus 12R 5G (Cool Blue, 8GB RAM, 128GB)',
    description: 'Flagship Snapdragon 8 Gen 2 processor, 1.5K 120Hz ProXDR Display, 5500 mAh battery with 100W SUPERVOOC charging, and 50MP Sony IMX890 Camera.',
    categoryId: 'mobiles-gadgets',
    price: 35999,
    originalPrice: 39999,
    discount: 10,
    thumbnailUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    affiliateUrl: 'https://www.amazon.in/dp/B0CS5XW9M6?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.6,
    reviewCount: 3840,
  },
  {
    id: 'prod-macbook-air-m2',
    name: 'Apple MacBook Air M2 Chip (13.6-inch, 8GB RAM, 256GB SSD)',
    description: 'Strikingly thin design with all-day battery life up to 18 hours. Brilliant Liquid Retina display, 1080p FaceTime HD camera, and MagSafe 3 charging.',
    categoryId: 'laptops-computers',
    price: 84990,
    originalPrice: 99900,
    discount: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    affiliateUrl: 'https://www.amazon.in/dp/B0B3B7W242?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.8,
    reviewCount: 2190,
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading Active Noise Cancellation with two processors and 8 microphones. Up to 30-hour battery life with quick charging, crystal clear hands-free calling.',
    categoryId: 'electronics',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    affiliateUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset?affid=betterdeals',
    affiliatePlatform: 'Flipkart',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.7,
    reviewCount: 1450,
  },
  {
    id: 'prod-philips-airfryer',
    name: 'Philips Digital Air Fryer HD9252/90 (4.1 Liter, 1400W)',
    description: 'Rapid Air Technology with unique starfish design for evenly fried food with up to 90% less fat. Touch screen with 7 presets and Keep Warm function.',
    categoryId: 'home-kitchen',
    price: 7499,
    originalPrice: 11995,
    discount: 37,
    thumbnailUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    ],
    affiliateUrl: 'https://www.amazon.in/dp/B097RVF7BG?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.5,
    reviewCount: 8900,
  },
  {
    id: 'prod-boat-airdopes',
    name: 'boAt Airdopes 141 ANC TWS Earbuds (42H Playtime)',
    description: 'Up to 32dB Active Noise Cancellation, Beast Mode 50ms low latency for gaming, ENx Quad Mics, and ASAP Fast Charge (10 mins = 150 mins playtime).',
    categoryId: 'electronics',
    price: 1399,
    originalPrice: 5990,
    discount: 77,
    thumbnailUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    affiliateUrl: 'https://www.amazon.in/dp/B0C3VJ7F7X?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.3,
    reviewCount: 42100,
  },
  {
    id: 'prod-atomic-habits',
    name: 'Atomic Habits by James Clear (Hardcover & Paperback)',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Over 15 million copies sold globally. Practical strategies for daily self-improvement.',
    categoryId: 'books-education',
    price: 499,
    originalPrice: 899,
    discount: 44,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    ],
    affiliateUrl: 'https://www.amazon.in/dp/1847941834?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.9,
    reviewCount: 95400,
  },
  {
    id: 'prod-fitness-treadmill',
    name: 'Cultsport Smart Foldable Motorized Treadmill',
    description: '2.0 HP Peak DC Motor, auto-inclination, Bluetooth connectivity to Cultsport Live training app, companion diet plans, and compact under-bed folding.',
    categoryId: 'health-fitness',
    price: 18499,
    originalPrice: 42999,
    discount: 57,
    thumbnailUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
    ],
    affiliateUrl: 'https://www.flipkart.com/cultsport-smart-treadmill?affid=betterdeals',
    affiliatePlatform: 'Flipkart',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.4,
    reviewCount: 320,
  },
  {
    id: 'prod-skincare-serum',
    name: 'Minimalist 10% Niacinamide Face Serum with Zinc (30ml)',
    description: 'Clinically proven to reduce acne marks, dark spots, and regulate sebum production within 2-4 weeks. Fragrance-free and dermatologically tested.',
    categoryId: 'beauty-personal-care',
    price: 569,
    originalPrice: 599,
    discount: 5,
    thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    imageUrls: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    affiliateUrl: 'https://www.amazon.in/dp/B08FF3J41H?tag=betterdeals-21',
    affiliatePlatform: 'Amazon',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 4.6,
    reviewCount: 16800,
  },
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-oneplus-12r',
    title: 'OnePlus 12R 5G Detailed Unboxing and Performance Review',
    description: 'Complete hands-on look at the camera performance, battery life, and gaming capabilities with real affiliate offer highlights.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-oneplus-12r',
    productName: 'OnePlus 12R 5G',
    affiliateUrl: 'https://www.amazon.in/dp/B0CS5XW9M6?tag=betterdeals-21',
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-macbook-air',
    title: 'Apple MacBook Air M2 Long-term Review for Students & Creators',
    description: 'Is 8GB unified memory enough in 2026? Battery rundown test and best current purchase discounts.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-macbook-air-m2',
    productName: 'Apple MacBook Air M2 Chip',
    affiliateUrl: 'https://www.amazon.in/dp/B0B3B7W242?tag=betterdeals-21',
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-sony-headphones',
    title: 'Sony WH-1000XM5 Sound Quality & ANC Testing in Loud Trains',
    description: 'Comparing with AirPods Max and Bose QuietComfort. Checking the ₹8,000 discount deal.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    productId: 'prod-sony-wh1000xm5',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    affiliateUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset?affid=betterdeals',
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// In-memory cache for fallback when offline or during instant rendering
let localProducts: Product[] = [...INITIAL_PRODUCTS];
let localCategories: Category[] = [...INITIAL_CATEGORIES];
let localVideos: VideoItem[] = [...INITIAL_VIDEOS];
let localSettings: SiteSettings = { ...INITIAL_SETTINGS };

// Check if a user is an authorized admin
export async function isUserAdmin(user: User | null): Promise<boolean> {
  if (!user || !user.email) return false;
  
  // 1. Check bootstrapped email directly
  if (BOOTSTRAP_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return true;
  }
  
  // 2. Check Firestore /admins/{uid}
  try {
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    if (adminDoc.exists()) {
      const data = adminDoc.data();
      return data.active === true && (data.role === 'admin' || data.role === 'superadmin');
    }
  } catch (error) {
    console.warn('Admin check lookup fallback:', error);
  }

  return false;
}

// Seed initial data to Firestore if collection is empty
export async function seedInitialDataIfEmpty(isAdminUser: boolean) {
  if (!isAdminUser) return;
  try {
    const catSnap = await getDocs(collection(db, 'categories'));
    if (catSnap.empty) {
      console.log('Seeding initial categories...');
      for (const cat of INITIAL_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }
    }

    const prodSnap = await getDocs(collection(db, 'products'));
    if (prodSnap.empty) {
      console.log('Seeding initial products...');
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
    }

    const vidSnap = await getDocs(collection(db, 'videos'));
    if (vidSnap.empty) {
      console.log('Seeding initial videos...');
      for (const vid of INITIAL_VIDEOS) {
        await setDoc(doc(db, 'videos', vid.id), vid);
      }
    }

    const setSnap = await getDoc(doc(db, 'settings', 'general'));
    if (!setSnap.exists()) {
      await setDoc(doc(db, 'settings', 'general'), INITIAL_SETTINGS);
    }
  } catch (err) {
    console.warn('Could not auto-seed firestore, using local state:', err);
  }
}

// Fetch Categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as Category));
      list.sort((a, b) => a.displayOrder - b.displayOrder);
      localCategories = list;
      return list;
    }
  } catch (err) {
    console.warn('Using cached categories:', err);
  }
  return localCategories;
}

// Save Category
export async function saveCategoryDoc(cat: Category): Promise<void> {
  try {
    await setDoc(doc(db, 'categories', cat.id), cat);
    const idx = localCategories.findIndex(c => c.id === cat.id);
    if (idx >= 0) localCategories[idx] = cat;
    else localCategories.push(cat);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `categories/${cat.id}`);
  }
}

// Delete Category
export async function deleteCategoryDoc(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'categories', id));
    localCategories = localCategories.filter(c => c.id !== id);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `categories/${id}`);
  }
}

// Fetch Products
export async function fetchProducts(includeDrafts = false): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as Product));
      localProducts = list;
      if (!includeDrafts) {
        return list.filter(p => p.status === 'published');
      }
      return list;
    }
  } catch (err) {
    console.warn('Using cached products:', err);
  }
  return includeDrafts ? localProducts : localProducts.filter(p => p.status === 'published');
}

// Fetch Product by ID
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (snap.exists()) {
      return { ...snap.data(), id: snap.id } as Product;
    }
  } catch (err) {
    console.warn('Error fetching product by ID:', err);
  }
  return localProducts.find(p => p.id === id) || null;
}

// Save Product
export async function saveProductDoc(product: Product): Promise<void> {
  try {
    const cleanDoc = { ...product, updatedAt: new Date().toISOString() };
    await setDoc(doc(db, 'products', cleanDoc.id), cleanDoc);
    const idx = localProducts.findIndex(p => p.id === cleanDoc.id);
    if (idx >= 0) localProducts[idx] = cleanDoc;
    else localProducts.push(cleanDoc);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `products/${product.id}`);
  }
}

// Delete Product
export async function deleteProductDoc(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', id));
    localProducts = localProducts.filter(p => p.id !== id);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
  }
}

// Fetch Videos
export async function fetchVideos(includeDrafts = false): Promise<VideoItem[]> {
  try {
    const snap = await getDocs(collection(db, 'videos'));
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as VideoItem));
      localVideos = list;
      if (!includeDrafts) {
        return list.filter(v => v.status === 'published');
      }
      return list;
    }
  } catch (err) {
    console.warn('Using cached videos:', err);
  }
  return includeDrafts ? localVideos : localVideos.filter(v => v.status === 'published');
}

// Save Video
export async function saveVideoDoc(video: VideoItem): Promise<void> {
  try {
    await setDoc(doc(db, 'videos', video.id), video);
    const idx = localVideos.findIndex(v => v.id === video.id);
    if (idx >= 0) localVideos[idx] = video;
    else localVideos.push(video);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `videos/${video.id}`);
  }
}

// Delete Video
export async function deleteVideoDoc(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'videos', id));
    localVideos = localVideos.filter(v => v.id !== id);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `videos/${id}`);
  }
}

// Fetch Settings
export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'));
    if (snap.exists()) {
      const data = snap.data() as SiteSettings;
      localSettings = { ...INITIAL_SETTINGS, ...data };
      return localSettings;
    }
  } catch (err) {
    console.warn('Using default settings:', err);
  }
  return localSettings;
}

// Save Settings
export async function saveSettingsDoc(settings: SiteSettings): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'general'), settings);
    localSettings = settings;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'settings/general');
  }
}
