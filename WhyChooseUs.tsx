import React from 'react';
import { Sparkles, Layers, Droplets, HeartHandshake, ShieldCheck, Flame, Coffee, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 'feature-1',
      icon: Sparkles,
      title: 'Premium Ingredients',
      subtitle: 'Single-Origin Cacao & Bourbon Vanilla',
      description: 'We source certified sustainable cocoa beans from Ecuador & Madagascar, blended with fresh organic dairy and cold-pressed pure cocoa butter — zero palm oil.',
      badge: 'Ethically Sourced',
      accentColor: 'from-[#D4AF37] to-[#C5A059]',
    },
    {
      id: 'feature-2',
      icon: Layers,
      title: 'Crispy Fresh Wafers',
      subtitle: '7-Layer Micro-Lattice Baking',
      description: 'Baked in precision cast-iron waffle plates to create ultra-thin wafer sheets that deliver an audibly crisp snap while protecting the delicate ganache core.',
      badge: 'Signature Crunch',
      accentColor: 'from-[#D4AF37] to-[#8C5332]',
    },
    {
      id: 'feature-3',
      icon: Droplets,
      title: 'Rich Chocolate Filling',
      subtitle: 'Slow-Conched Molten Ganache',
      description: 'Conched for 48 hours for an ultra-fine 18-micron velvety texture that melts smoothly on the palate the instant you crack the crispy outer crust.',
      badge: 'Velvety Melt',
      accentColor: 'from-[#C5A059] to-[#3B1E13]',
    },
    {
      id: 'feature-4',
      icon: Award,
      title: 'Perfect Bite-Sized Treat',
      subtitle: 'Portioned Confectionery Art',
      description: 'Engineered in the ideal 16-gram geometry to provide the exact ratio of crispy waffle shell to luxurious molten center in every single bite.',
      badge: 'Flawless Ratio',
      accentColor: 'from-[#D4AF37] to-[#C5A059]',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Background golden subtle ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#D4AF37]/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-[#C5A059]/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              The Gourmet Standard
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            Why Choose Gourmet Bites
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
            Our obsessive dedication to micro-textures, world-class single-origin cacao, and time-honored European confectionery craft.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 bg-[#26140D] border border-[#C5A059]/20 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/5"
              >
                {/* Top Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 border border-[#D4AF37]/40 bg-[#1A0F0A] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                      <Icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-[#1A0F0A] text-[#D4AF37] border border-[#C5A059]/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#F5E6D3] group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1 mb-3">
                    {item.subtitle}
                  </h4>

                  <p className="text-xs text-[#F5E6D3]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="pt-6 mt-6 border-t border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#F5E6D3]/50">
                  <span className="uppercase tracking-widest font-semibold text-[10px]">Standard #0{index + 1}</span>
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] group-hover:scale-150 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
