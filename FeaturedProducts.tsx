import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { Sparkles, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface FeaturedProductsProps {
  onQuickView: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onQuickView }) => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'cocoa'>('featured');

  const categories = [
    { id: 'all', label: 'All Flavors' },
    { id: 'classic', label: 'Classic Milk' },
    { id: 'hazelnut', label: 'Hazelnut Praline' },
    { id: 'dark', label: '72% Dark' },
    { id: 'caramel', label: 'Salted Caramel' },
    { id: 'bundle', label: 'Gift Sets' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'cocoa') return b.cocoaPercentage - a.cocoaPercentage;
      return 0; // default featured order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-24 bg-[#1A0F0A] relative">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Featured Artisan Selections
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            Crafted for the Purest Indulgence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
            Explore our signature four gourmet wafer bite recipes. Each crafted with wafer pastry baked golden in copper irons and filled with velvet ganache.
          </p>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-[#C5A059]/20">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#D4AF37] text-[#1A0F0A] shadow-lg shadow-[#D4AF37]/20 font-bold'
                      : 'bg-[#26140D] text-[#F5E6D3]/70 border border-[#C5A059]/20 hover:border-[#D4AF37]/50 hover:text-[#F5E6D3]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Clear Search */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-1.5 text-xs text-[#D4AF37] bg-[#26140D] px-3.5 py-2 border border-[#D4AF37]/30 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear "{searchQuery}"</span>
              </button>
            )}

            <div className="flex items-center gap-2 bg-[#26140D] border border-[#C5A059]/20 px-3.5 py-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <select
                id="sort-products-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs uppercase tracking-wider font-semibold text-[#F5E6D3] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#1A0F0A] text-[#F5E6D3]">Sort: Curated</option>
                <option value="rating" className="bg-[#1A0F0A] text-[#F5E6D3]">Highest Rated</option>
                <option value="price-asc" className="bg-[#1A0F0A] text-[#F5E6D3]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1A0F0A] text-[#F5E6D3]">Price: High to Low</option>
                <option value="cocoa" className="bg-[#1A0F0A] text-[#F5E6D3]">Cacao Percentage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[#26140D] border border-[#C5A059]/20">
            <Search className="w-10 h-10 text-[#D4AF37]/60 mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#F5E6D3]">No flavors matched your search</h3>
            <p className="text-xs text-[#F5E6D3]/60 mt-1 mb-4">
              Try searching for "Hazelnut", "Dark", "Caramel", or clear your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="gold-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              Show All Flavors
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
