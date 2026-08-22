import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review, ToastMessage } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_REVIEWS } from '../data/reviews';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, packaging?: 'standard' | 'luxury_gold_box', subscription?: boolean) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalPrice: number;
  promoCode: string | null;
  appliedPromoDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  reviews: Review[];
  addReview: (newReview: Omit<Review, 'id' | 'date'>) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  completeOrder: (orderDetails: any) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'gourmet_bites_cart_v1',
  WISHLIST: 'gourmet_bites_wishlist_v1',
  REVIEWS: 'gourmet_bites_reviews_v1',
  ORDERS: 'gourmet_bites_orders_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 2, packagingOption: 'standard' },
        { product: PRODUCTS[1], quantity: 1, packagingOption: 'standard' }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 2, packagingOption: 'standard' }];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-hazelnut-choc'];
    } catch {
      return ['prod-hazelnut-choc'];
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Promo Code
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [appliedPromoDiscount, setAppliedPromoDiscount] = useState<number>(0); // percentage, e.g. 0.15

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [reviews]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'cart') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    packaging: 'standard' | 'luxury_gold_box' = 'standard',
    subscription: boolean = false
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.packagingOption === packaging && item.subscription === subscription
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, packagingOption: packaging, subscription }];
      }
    });

    showToast(
      'Added to Bag',
      `${quantity}x ${product.name} (${packaging === 'luxury_gold_box' ? 'Gold Keepsake Box' : 'Pouch'})`,
      'cart'
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Item Removed', `${item.product.name} removed from your bag.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast('Removed from Wishlist', `${product.name} removed from saved treats.`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Saved to Wishlist', `${product.name} added to your favorites.`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CRISP15' || normalized === 'SWEET15') {
      setPromoCode(normalized);
      setAppliedPromoDiscount(0.15);
      showToast('Promo Code Applied', '15% luxury discount applied to your order!', 'success');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (normalized === 'SWEET10' || normalized === 'WELCOME10') {
      setPromoCode(normalized);
      setAppliedPromoDiscount(0.10);
      showToast('Promo Code Applied', '10% welcome discount applied!', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (normalized === 'GOLDENBITE' || normalized === 'FREESHIP') {
      setPromoCode(normalized);
      setAppliedPromoDiscount(0.12);
      showToast('Promo Code Applied', 'Special Connoisseur discount activated!', 'success');
      return { success: true, message: 'Special promo applied!' };
    }
    return { success: false, message: 'Invalid or expired promo code. Try CRISP15 or SWEET10' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setAppliedPromoDiscount(0);
    showToast('Promo Removed', 'Promotional code removed.', 'info');
  };

  const addReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [review, ...prev]);
    showToast('Review Submitted', 'Thank you for sharing your tasting notes!', 'success');
  };

  const completeOrder = (orderDetails: any) => {
    const orderId = `GB-${Math.floor(100000 + Math.random() * 900000)}`;
    const savedOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const newOrder = {
      orderId,
      items: cart,
      subtotal,
      total: totalPrice,
      date: new Date().toISOString(),
      details: orderDetails,
    };
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([newOrder, ...savedOrders]));
    clearCart();
    setPromoCode(null);
    setAppliedPromoDiscount(0);
    return orderId;
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.subscription) {
      itemPrice *= 0.9; // 10% off for subscribe
    }
    if (item.packagingOption === 'luxury_gold_box') {
      itemPrice += 3.50;
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = subtotal * appliedPromoDiscount;
  const shippingFee = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        shippingFee,
        totalPrice,
        promoCode,
        appliedPromoDiscount,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        reviews,
        addReview,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        completeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
