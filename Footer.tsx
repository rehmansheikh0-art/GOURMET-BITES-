import React from 'react';
import { Sparkles, Heart, Instagram, Facebook, Twitter, Youtube, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120804] border-t border-[#C5A059]/20 text-[#F5E6D3]/70 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background soft ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C5A059]/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#8C6D32] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#1A0F0A] flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-[#D4AF37]">GB</span>
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-wider text-[#F5E6D3]">
                GOURMET BITES
              </span>
            </div>

            <p className="text-xs text-[#F5E6D3]/60 leading-relaxed max-w-sm">
              Crispy outside. Rich chocolate inside. Handcrafted wafer bites featuring 7 golden-baked micro-layers filled with Belgian single-origin chocolate ganache.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 bg-[#26140D] border border-[#C5A059]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0A] transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 bg-[#26140D] border border-[#C5A059]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0A] transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 bg-[#26140D] border border-[#C5A059]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0A] transition-all cursor-pointer"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 bg-[#26140D] border border-[#C5A059]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A0F0A] transition-all cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Featured Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flavors')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Flavor Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  About Our Brand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('why-us')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Flavors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Artisan Flavors
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Classic Chocolate (48%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Hazelnut Chocolate (52%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  72% Dark Chocolate Ganache
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Caramel & Fleur de Sel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Grand Connoisseur Gift Box
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Confectionery Desk
            </h4>
            <div className="space-y-2 text-xs text-[#F5E6D3]/60">
              <p>Email: concierge@gourmetbites.com</p>
              <p>Phone: +1 (800) 843-BITE</p>
              <p>Tasting Atelier: 500 Chocolatier Ave, Suite 10, New York, NY</p>
              <p className="text-[#D4AF37] pt-1">Mon–Sat: 10AM – 7PM EST</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E6D3]/50">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Gourmet Bites Artisan Confectionery. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Pure Cocoa Butter Guarantee
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#D4AF37] hover:underline cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
