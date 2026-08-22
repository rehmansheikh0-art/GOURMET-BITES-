import React, { useState } from 'react';
import { ASSET_IMAGES, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShoppingBag, Eye, Volume2, Flame, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductShowcaseProps {
  onShopClick: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onShopClick }) => {
  const { addToCart, setQuickViewProduct } = useStore();
  const [activeLayer, setActiveLayer] = useState<'shell' | 'ganache'>('ganache');
  const bundleProduct = PRODUCTS.find((p) => p.id === 'prod-connoisseur-bundle') || PRODUCTS[0];

  return (
    <section className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Anatomy of the Break
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            The Reveal: Molten Core Precision
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
            Witness the moment our micro-lattice wafer cracks open to unleash a velvety river of pure gourmet chocolate.
          </p>
        </div>

        {/* Large Visual Showcase Container */}
        <div className="relative border border-[#D4AF37]/30 shadow-2xl bg-[#26140D] p-6 sm:p-8 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Large Visual: Broken Open Wafer with Molten Ganache */}
            <div className="lg:col-span-8 relative">
              <div className="relative overflow-hidden border border-[#C5A059]/30 shadow-2xl group bg-[#1A0F0A]">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Gourmet Wafer Bite broken open showing creamy chocolate center"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Layer selector hotspots */}
                <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setActiveLayer('shell')}
                    className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
                      activeLayer === 'shell'
                        ? 'bg-[#D4AF37] text-[#1A0F0A] ring-2 ring-[#D4AF37]'
                        : 'bg-[#1A0F0A]/90 text-[#F5E6D3] hover:bg-[#26140D] border border-[#C5A059]/40'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Crispy Outer Shell</span>
                  </button>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setActiveLayer('ganache')}
                    className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
                      activeLayer === 'ganache'
                        ? 'bg-[#D4AF37] text-[#1A0F0A] ring-2 ring-[#D4AF37]'
                        : 'bg-[#1A0F0A]/90 text-[#F5E6D3] hover:bg-[#26140D] border border-[#C5A059]/40'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Creamy Chocolate Center</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Information Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              <div className="bg-[#1A0F0A] p-6 border border-[#C5A059]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    {activeLayer === 'shell' ? 'Layer 01 — Outer Lattice' : 'Layer 02 — Molten Center'}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#F5E6D3]/60">
                    {activeLayer === 'shell' ? '7 Micro-Layers' : '18 Micron Fineness'}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-[#F5E6D3] mb-2">
                  {activeLayer === 'shell'
                    ? 'Golden Crisp Micro-Wafer'
                    : 'Slow-Conched Gourmet Ganache'}
                </h3>

                <p className="text-xs text-[#F5E6D3]/70 leading-relaxed mb-4">
                  {activeLayer === 'shell'
                    ? 'Engineered with double-grooved waffle architecture, our wafers deliver a clean, shatteringly crisp snap without creating mess. Baked fresh in small artisan batches.'
                    : 'Made with single-origin Ecuadorian cocoa butter and infused with whole Bourbon vanilla pods. Heated gently to body temperature for a decadent, lava-smooth sensation on your tongue.'}
                </p>

                {/* Sensory Meters */}
                <div className="space-y-3 pt-3 border-t border-[#C5A059]/20">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-[#F5E6D3]/80">
                      <span>Crisp Snap Factor</span>
                      <span className="text-[#D4AF37] font-bold">9.9 / 10</span>
                    </div>
                    <div className="w-full h-1 bg-[#26140D] overflow-hidden">
                      <div className="h-full bg-[#D4AF37] w-[99%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1 text-[#F5E6D3]/80">
                      <span>Melting Temperature</span>
                      <span className="text-[#D4AF37] font-bold">34°C (Body Heat)</span>
                    </div>
                    <div className="w-full h-1 bg-[#26140D] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] w-[88%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action card */}
              <div className="p-5 bg-[#1A0F0A] border border-[#D4AF37]/40 shadow-xl flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5E6D3]">All 4 Signature Flavors</span>
                  <span className="font-display text-base font-bold text-[#D4AF37]">$54.00</span>
                </div>
                <p className="text-xs text-[#F5E6D3]/70">
                  Order the Grand Connoisseur Box in gold foil packaging with complimentary tasting guide.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    id="showcase-add-bundle-btn"
                    onClick={() => addToCart(bundleProduct, 1, 'luxury_gold_box')}
                    className="gold-button flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Connoisseur Box</span>
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(bundleProduct)}
                    className="p-3 bg-[#26140D] border border-[#C5A059]/30 text-[#F5E6D3] hover:text-[#D4AF37] hover:border-[#D4AF37] cursor-pointer"
                    aria-label="Quick view connoisseur box"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
