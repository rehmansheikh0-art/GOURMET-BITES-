import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, setQuickViewProduct } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#1A0F0A] border-l border-[#C5A059]/30 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-[#26140D]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#F5E6D3]">
                Saved Favorites ({savedProducts.length})
              </h3>
            </div>
            <button
              id="close-wishlist-drawer-btn"
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#F5E6D3]/60 hover:text-[#D4AF37] hover:bg-[#1A0F0A] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedProducts.length > 0 ? (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 bg-[#26140D] border border-[#C5A059]/20"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover bg-[#1A0F0A] shrink-0 border border-[#C5A059]/30 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setQuickViewProduct(product);
                          }}
                          className="text-xs font-bold text-[#F5E6D3] hover:text-[#D4AF37] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#F5E6D3]/40 hover:text-[#D4AF37] p-0.5 cursor-pointer"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider">{product.flavor}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#C5A059]/20">
                      <span className="font-display text-sm font-bold text-[#D4AF37]">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                        }}
                        className="gold-button px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-4">
                <Heart className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-3" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#F5E6D3]">No Saved Favorites Yet</h4>
                <p className="text-xs text-[#F5E6D3]/60 mt-1 mb-6">
                  Click the heart icon on any flavor to curate your personalized tasting wishlist.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="gold-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  Explore Flavors
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {savedProducts.length > 0 && (
            <div className="p-5 bg-[#26140D] border-t border-[#C5A059]/25">
              <button
                onClick={() => {
                  savedProducts.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="gold-button w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
