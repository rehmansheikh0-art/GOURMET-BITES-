import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { Sparkles, ArrowRight, Award, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onShopClick: () => void;
  onExploreFlavorsClick: () => void;
  onWatchAdClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreFlavorsClick, onWatchAdClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center bg-[#1A0F0A]"
    >
      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating wafer & cacao crumb decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-[10%] w-3 h-3 rounded-full bg-[#D4AF37]/40 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-[5%] w-2 h-2 rounded-full bg-[#C5A059]/60"
        />
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-32 right-[8%] w-4 h-4 rounded-full bg-[#D4AF37]/30 blur-[1px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col text-left space-y-6"
          >
            {/* Top Eyebrow Chip */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Belgian Cacao & Micro-Lattice Wafers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5E6D3] leading-[1.08]">
              Crispy Outside. <br />
              <span className="gold-gradient-text italic font-normal">Rich Chocolate</span> Inside.
            </h1>

            {/* Short description */}
            <p className="text-base sm:text-lg text-[#F5E6D3]/70 max-w-xl font-normal leading-relaxed">
              Indulge in perfectly crisp wafer bites filled with smooth, gourmet chocolate. Each bite unleashes an irresistible contrast between golden micro-lattice crunch and slow-conched molten ganache.
            </p>

            {/* Buttons: Shop Now, Explore Flavors & Watch 5s Cinema Ad */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={onShopClick}
                className="gold-button px-7 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2.5 shadow-xl group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-flavors-btn"
                onClick={onExploreFlavorsClick}
                className="gold-button-outline px-7 py-3.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Flavors</span>
              </button>

              {onWatchAdClick && (
                <button
                  id="hero-watch-ad-btn"
                  onClick={onWatchAdClick}
                  className="px-5 py-3.5 bg-[#26140D] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#FFF] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch 5s Film</span>
                </button>
              )}
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#C5A059]/20 grid grid-cols-3 gap-4">
              <div>
                <span className="block font-serif-luxury text-2xl sm:text-3xl font-bold text-[#D4AF37]">100%</span>
                <span className="text-xs uppercase tracking-wider text-[#F5E6D3]/60">Single-Origin Cacao</span>
              </div>
              <div>
                <span className="block font-serif-luxury text-2xl sm:text-3xl font-bold text-[#D4AF37]">7 Layers</span>
                <span className="text-xs uppercase tracking-wider text-[#F5E6D3]/60">Golden Micro-Wafer</span>
              </div>
              <div>
                <span className="block font-serif-luxury text-2xl sm:text-3xl font-bold text-[#D4AF37]">4.9★</span>
                <span className="text-xs uppercase tracking-wider text-[#F5E6D3]/60">Over 1,200 Reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Close-Up Visual with Gold Trim */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/20 via-[#C5A059]/20 to-[#D4AF37]/15 blur-2xl opacity-60" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#26140D] group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Gourmet Chocolate-Filled Wafer Bite broken open with creamy molten filling"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Sensory Badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#1A0F0A]/95 border border-[#D4AF37]/40 p-4 shadow-2xl flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 bg-[#26140D] flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#D4AF37]/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Molten Core Texture</div>
                    <div className="text-xs text-[#F5E6D3]">Slow-baked for 36-hr crispy freshness</div>
                  </div>
                </motion.div>

                {/* Award Chip Top Right */}
                <div className="absolute top-4 right-4 bg-[#1A0F0A]/90 border border-[#C5A059]/30 px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5E6D3]">Artisan Chocolatier 2026</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
