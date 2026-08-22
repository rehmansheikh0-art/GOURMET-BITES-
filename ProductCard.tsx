import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, Heart, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-[#26140D] border border-[#C5A059]/20 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/5 overflow-hidden"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A0F0A]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-3 py-1 bg-[#1A0F0A]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
              {product.badge}
            </span>
          )}
          <span className="px-2.5 py-0.5 bg-[#1A0F0A]/90 text-[#F5E6D3]/80 text-[10px] font-semibold border border-[#C5A059]/30 backdrop-blur-md w-fit uppercase tracking-wider">
            {product.cocoaPercentage}% Cacao
          </span>
        </div>

        {/* Wishlist and Quick View floating buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2.5 backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isFavorited
                ? 'bg-[#D4AF37] text-[#1A0F0A]'
                : 'bg-[#1A0F0A]/85 text-[#F5E6D3]/80 hover:text-[#D4AF37] hover:bg-[#1A0F0A]'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 bg-[#1A0F0A]/85 text-[#F5E6D3]/80 hover:text-[#D4AF37] hover:bg-[#1A0F0A] backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="Quick View Product Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick View Bar on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-0 bottom-0 py-2.5 bg-[#1A0F0A]/95 backdrop-blur-sm text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t border-[#D4AF37]/30 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick Tasting Notes</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Rating and Flavor Subtitle */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {product.flavor}
            </span>
            <div className="flex items-center gap-1 bg-[#1A0F0A] px-2 py-0.5 border border-[#C5A059]/20">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs font-bold text-[#F5E6D3]">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#F5E6D3]/50">({product.reviewCount})</span>
            </div>
          </div>

          {/* Flavor Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-xl font-bold text-[#F5E6D3] group-hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#F5E6D3]/70 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Tasting Note Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.tastingNotes.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1A0F0A] text-[#F5E6D3]/80 border border-[#C5A059]/20"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-[#D4AF37]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#F5E6D3]/40 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#F5E6D3]/60 uppercase tracking-wider">{product.weight}</span>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => addToCart(product, 1)}
            className="card-action-button px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
