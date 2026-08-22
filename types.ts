export interface Product {
  id: string;
  name: string;
  flavor: string;
  category: 'classic' | 'hazelnut' | 'dark' | 'caramel' | 'bundle';
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  cocoaPercentage: number;
  crispFactor: number; // 1-10
  sweetnessLevel: string; // e.g. "Balanced & Rich", "Deep Bittersweet", "Velvety Sweet"
  tastingNotes: string[];
  ingredients: string[];
  nutrition: {
    servingSize: string;
    calories: number;
    totalFat: string;
    sugar: string;
    protein: string;
  };
  weight: string; // e.g., "150g (Approx. 18 Bites)"
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  packagingOption?: 'standard' | 'luxury_gold_box';
  subscription?: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  flavor: string;
  verified: boolean;
  avatarBg: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
}
