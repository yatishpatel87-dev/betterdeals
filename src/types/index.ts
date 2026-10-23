export type ProductStatus = 'draft' | 'published';

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  discount: number;
  thumbnailUrl: string;
  imageUrls: string[];
  videoIds?: string[];
  videoUrl?: string; // Optional direct video URL or YouTube embed
  affiliateUrl: string;
  affiliatePlatform: 'Amazon' | 'Flipkart' | 'Myntra' | 'TataCliq' | 'Ajio' | 'Other';
  featured: boolean;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  nameGu?: string;
  slug: string;
  icon: string;
  displayOrder: number;
  status: 'active' | 'inactive';
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  storagePath?: string;
  videoUrl: string; // YouTube embed or direct mp4/webm
  thumbnailUrl?: string;
  productId?: string;
  productName?: string;
  affiliateUrl?: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin' | 'superadmin';
  active: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  bannerHeadline: string;
  bannerSubheadline: string;
  bannerImageUrl: string;
  bannerLink: string;
  currency: string;
  affiliateDisclosure: string;
  contactEmail: string;
  contactPhone: string;
  instagramUrl: string;
  telegramUrl: string;
  whatsappUrl: string;
  youtubeUrl: string;
}

export type Language = 'gu' | 'en';
