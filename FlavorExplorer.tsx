import React, { useState } from 'react';
import { FLAVOR_PROFILES, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShoppingBag, ArrowRight, Check, Flame, Coffee, Wine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FlavorExplorer: React.FC = () => {
  const [activeFlavorId, setActiveFlavorId] = useState<string>('classic');
  const { addToCart, setQuickViewProduct } = useStore();

  const activeProfile = FLAVOR_PROFILES.find((f) => f.id === activeFlavorId) || FLAVOR_PROFILES[0];
  const matchingProduct = PRODUCTS.find((p) => p.category === activeFlavorId) || PRODUCTS[0];

  return (
    <section id="flavors" className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Dynamic Background Glow based on flavor */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeProfile.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Sensory Flavor Palette
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            Explore the World of Flavors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
            Select any profile below to unveil the distinct cacao harvest, aromatic tasting notes, and crunch mechanics of each recipe.
          </p>
        </div>

        {/* Interactive Flavor Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {FLAVOR_PROFILES.map((flavor) => {
            const isSelected = activeFlavorId === flavor.id;
            return (
              <button
                key={flavor.id}
                id={`flavor-tab-${flavor.id}`}
                onMouseEnter={() => setActiveFlavorId(flavor.id)}
                onClick={() => setActiveFlavorId(flavor.id)}
                className={`p-4 sm:p-5 text-left transition-all duration-300 relative border cursor-pointer ${
                  isSelected
                    ? 'bg-[#26140D] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                    : 'bg-[#1A0F0A] border-[#C5A059]/20 hover:border-[#D4AF37]/50 hover:bg-[#26140D]/50'
                }`}
              >
                {/* Active Gold Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="activeFlavorBorder"
                    className="absolute top-3 right-3 w-2 h-2 bg-[#D4AF37]"
                  />
                )}

                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                  {flavor.cacao}
                </div>
                <h4 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#F5E6D3] leading-snug">
                  {flavor.title}
                </h4>
                <p className="text-xs text-[#F5E6D3]/60 mt-1 line-clamp-1">
                  {flavor.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Showcase Card */}
        <div className="bg-[#26140D] border border-[#C5A059]/25 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Interactive Product Photography */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#1A0F0A] group">
                  <img
                    src={activeProfile.image}
                    alt={activeProfile.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/90 via-transparent to-transparent" />

                  {/* Flavor Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3.5 py-1.5 bg-[#1A0F0A]/90 border border-[#D4AF37]/40 backdrop-blur-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        {activeProfile.crispness}
                      </span>
                    </div>
                    <button
                      onClick={() => setQuickViewProduct(matchingProduct)}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#F5E6D3] bg-[#26140D]/95 hover:bg-[#D4AF37] hover:text-[#1A0F0A] px-3.5 py-1.5 border border-[#C5A059]/30 transition-all cursor-pointer"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Sensory Profile */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#1A0F0A] border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                      {activeProfile.cacao}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#F5E6D3]/60">
                      Recipe № {activeProfile.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F5E6D3] mt-3">
                    {activeProfile.title}
                  </h3>
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mt-1">
                    {activeProfile.subtitle}
                  </p>

                  <p className="text-sm text-[#F5E6D3]/70 mt-4 leading-relaxed">
                    {matchingProduct.longDescription}
                  </p>
                </div>

                {/* Tasting Notes Checklist */}
                <div className="bg-[#1A0F0A] p-5 border border-[#C5A059]/20">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
                    Sommelier Tasting Notes & Pairings
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingProduct.tastingNotes.map((note, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F5E6D3]/90">
                        <div className="w-4 h-4 bg-[#26140D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center gap-2 text-xs text-[#F5E6D3]/70">
                    <Coffee className="w-4 h-4 text-[#D4AF37]" />
                    <span><strong className="text-[#F5E6D3]">Pairing:</strong> {activeProfile.pairing}</span>
                  </div>
                </div>

                {/* Price & Direct Purchase Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-[#D4AF37]">
                      ${matchingProduct.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#F5E6D3]/50">/ {matchingProduct.weight}</span>
                  </div>

                  <button
                    id={`flavor-taste-btn-${matchingProduct.id}`}
                    onClick={() => addToCart(matchingProduct, 1)}
                    className="gold-button px-8 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Taste This Flavor</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
