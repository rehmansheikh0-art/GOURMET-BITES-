import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { Sparkles, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BrandStoryProps {
  onExploreFlavors: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onExploreFlavors }) => {
  return (
    <section id="about" className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Subtle gold background element */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                The Artisan Heritage
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3] leading-tight">
              Obsessed with the Art of the Perfect Crisp & Melt
            </h2>

            <p className="text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
              Gourmet Bites began with a simple yet ambitious culinary mission: to elevate the everyday wafer snack into a luxurious, multi-sensory chocolate experience.
            </p>

            <p className="text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
              While conventional confectioners rely on heavy palm oils and artificial sweeteners, our master chocolatiers adhere strictly to European artisan tradition. Every wafer sheet is baked golden over custom micro-groove irons, layered seven times for an airy snap, and filled with slow-conched single-origin cocoa ganache.
            </p>

            {/* Core Values / Pillar Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#26140D] border border-[#C5A059]/20 flex items-start gap-3">
                <div className="w-8 h-8 border border-[#D4AF37]/30 bg-[#1A0F0A] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5E6D3]">Single-Origin Cacao</h4>
                  <p className="text-xs text-[#F5E6D3]/60 mt-0.5">Directly sourced from organic growers in South America.</p>
                </div>
              </div>

              <div className="p-4 bg-[#26140D] border border-[#C5A059]/20 flex items-start gap-3">
                <div className="w-8 h-8 border border-[#D4AF37]/30 bg-[#1A0F0A] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5E6D3]">Zero Palm Oil</h4>
                  <p className="text-xs text-[#F5E6D3]/60 mt-0.5">100% pure cocoa butter and real Madagascar vanilla beans.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="brand-story-flavors-btn"
                onClick={onExploreFlavors}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#F5E6D3] group cursor-pointer transition-colors"
              >
                <span>Discover our craft flavor collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

          {/* Right Column: Large Artisan Craft Photography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#26140D] group">
              <img
                src={ASSET_IMAGES.brandCraft}
                alt="Artisan chocolatier crafting gourmet chocolate wafer bites"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/90 via-[#1A0F0A]/20 to-transparent" />

              {/* Floating Quote Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#1A0F0A]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl">
                <p className="text-xs sm:text-sm text-[#F5E6D3] italic font-serif-luxury leading-relaxed">
                  “The secret lies in the contrast: the crackle of crisp wafer immediately surrendering to warm, molten chocolate cream.”
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#D4AF37] font-bold tracking-widest uppercase text-[10px]">
                  <span>— Chef Laurent Mercier, Master Chocolatier</span>
                  <span className="text-[#F5E6D3]/50">Geneva & Brussels</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
