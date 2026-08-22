import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, Heart, Check, Sparkles, ShieldCheck, RefreshCw, Package, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [packaging, setPackaging] = useState<'standard' | 'luxury_gold_box'>('standard');
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'ingredients' | 'nutrition'>('notes');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const basePrice = product.price;
  const packageExtra = packaging === 'luxury_gold_box' ? 3.50 : 0;
  const unitPrice = isSubscription ? (basePrice + packageExtra) * 0.9 : basePrice + packageExtra;
  const totalItemPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, packaging, isSubscription);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1A0F0A] border border-[#D4AF37]/50 max-w-4xl w-full shadow-2xl overflow-hidden relative my-auto max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-[#26140D] text-[#F5E6D3] hover:text-[#D4AF37] transition-colors border border-[#C5A059]/30 cursor-pointer"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product Image & Badges */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="relative overflow-hidden border border-[#C5A059]/30 bg-[#26140D] shadow-xl group">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#1A0F0A]/95 border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Micro Metric Highlights */}
                <div className="grid grid-cols-2 gap-3 bg-[#26140D] p-4 border border-[#C5A059]/20">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">Cocoa Content</span>
                    <span className="text-base font-bold text-[#F5E6D3] font-serif-luxury">{product.cocoaPercentage}% Single-Origin</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">Crisp Factor</span>
                    <span className="text-base font-bold text-[#F5E6D3] font-serif-luxury">{product.crispFactor}/10 Audibly Crisp</span>
                  </div>
                </div>
              </div>

              {/* Product Configuration & Details */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                      {product.flavor}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="flex items-center gap-1.5 text-xs text-[#F5E6D3]/70 hover:text-[#D4AF37] cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                      <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                    </button>
                  </div>

                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F5E6D3] mt-1">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#F5E6D3]">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-[#F5E6D3]/50">({product.reviewCount} verified reviews)</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5E6D3]/70 mt-3 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                {/* Packaging Selection */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                    Select Packaging Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPackaging('standard')}
                      className={`p-3 border text-left transition-all cursor-pointer ${
                        packaging === 'standard'
                          ? 'bg-[#26140D] border-[#D4AF37] shadow-md'
                          : 'bg-[#1A0F0A] border-[#C5A059]/30 text-[#F5E6D3]/70 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F5E6D3]">
                        <span>Artisan Foil Pouch</span>
                        <span className="text-[#D4AF37]">Included</span>
                      </div>
                      <p className="text-[10px] text-[#F5E6D3]/50 mt-0.5">Resealable gold freshness bag</p>
                    </button>

                    <button
                      onClick={() => setPackaging('luxury_gold_box')}
                      className={`p-3 border text-left transition-all cursor-pointer ${
                        packaging === 'luxury_gold_box'
                          ? 'bg-[#26140D] border-[#D4AF37] shadow-md'
                          : 'bg-[#1A0F0A] border-[#C5A059]/30 text-[#F5E6D3]/70 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F5E6D3]">
                        <span>Gold Keepsake Box</span>
                        <span className="text-[#D4AF37]">+$3.50</span>
                      </div>
                      <p className="text-[10px] text-[#F5E6D3]/50 mt-0.5">Rigid box with ribbon & card</p>
                    </button>
                  </div>
                </div>

                {/* Subscribe & Save Option */}
                <div className="p-3.5 bg-[#26140D] border border-[#C5A059]/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSubscription}
                        onChange={(e) => setIsSubscription(e.target.checked)}
                        className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-[#F5E6D3]">
                        Subscribe & Save 10% (Monthly Delivery)
                      </span>
                    </label>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-[#1A0F0A] px-2 py-0.5 border border-[#D4AF37]/30">
                      Save 10%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F5E6D3]/60 pl-6">
                    Cancel or pause anytime. Never run out of fresh chocolate wafer bites.
                  </p>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="pt-2 border-t border-[#C5A059]/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">Total Amount</span>
                    <span className="font-display text-2xl font-bold text-[#D4AF37]">
                      ${totalItemPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center bg-[#1A0F0A] border border-[#C5A059]/30 px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#26140D] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#F5E6D3]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#26140D] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      id="modal-add-to-bag-btn"
                      onClick={handleAddToCart}
                      className="gold-button px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Tabbed Specs: Tasting Notes / Ingredients / Nutrition */}
                <div className="pt-4">
                  <div className="flex border-b border-[#C5A059]/20 gap-4 text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('notes')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'notes' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F5E6D3]/50'
                      }`}
                    >
                      Tasting Notes
                    </button>
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'ingredients' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F5E6D3]/50'
                      }`}
                    >
                      Ingredients
                    </button>
                    <button
                      onClick={() => setActiveTab('nutrition')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'nutrition' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F5E6D3]/50'
                      }`}
                    >
                      Nutrition Facts
                    </button>
                  </div>

                  <div className="pt-3 text-xs text-[#F5E6D3]/70">
                    {activeTab === 'notes' && (
                      <div className="flex flex-wrap gap-2">
                        {product.tastingNotes.map((n, i) => (
                          <span key={i} className="px-2.5 py-1 bg-[#26140D] border border-[#C5A059]/25 text-[#F5E6D3]">
                            {n}
                          </span>
                        ))}
                      </div>
                    )}
                    {activeTab === 'ingredients' && (
                      <p className="leading-relaxed">
                        {product.ingredients.join(', ')}.
                      </p>
                    )}
                    {activeTab === 'nutrition' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                        <div className="p-2 bg-[#26140D] border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#F5E6D3]/50 block">Calories</span>
                          <span className="font-bold text-[#F5E6D3]">{product.nutrition.calories} kcal</span>
                        </div>
                        <div className="p-2 bg-[#26140D] border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#F5E6D3]/50 block">Total Fat</span>
                          <span className="font-bold text-[#F5E6D3]">{product.nutrition.totalFat}</span>
                        </div>
                        <div className="p-2 bg-[#26140D] border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#F5E6D3]/50 block">Sugar</span>
                          <span className="font-bold text-[#F5E6D3]">{product.nutrition.sugar}</span>
                        </div>
                        <div className="p-2 bg-[#26140D] border border-[#C5A059]/20">
                          <span className="text-[10px] text-[#F5E6D3]/50 block">Protein</span>
                          <span className="font-bold text-[#F5E6D3]">{product.nutrition.protein}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
