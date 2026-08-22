import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import { motion } from 'motion/react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast, applyPromoCode } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    showToast('Subscribed!', 'Welcome to the Connoisseur Circle. Use code SWEET10 for 10% off your first order.', 'success');
  };

  return (
    <section className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Background golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative bg-[#26140D] border border-[#D4AF37]/35 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden text-center">
          
          {/* Decorative icons */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1A0F0A] border border-[#C5A059]/30 mb-4 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Connoisseur Circle
            </span>
          </div>

          {/* Headings requested explicitly */}
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            Get a Little Sweeter
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 max-w-xl mx-auto leading-relaxed">
            Subscribe for new flavors, special offers and delicious updates.
          </p>

          {/* Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 focus:border-[#D4AF37] pl-11 pr-4 py-3.5 text-xs text-[#F5E6D3] placeholder-[#F5E6D3]/40 focus:outline-none transition-colors"
                />
              </div>

              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="gold-button px-7 py-3.5 text-xs font-bold uppercase tracking-widest shadow-xl shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 max-w-md mx-auto p-4 bg-[#1A0F0A] border border-[#D4AF37]/50 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 text-left">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#F5E6D3]">You're Subscribed!</h4>
                  <p className="text-[11px] text-[#F5E6D3]/70">Your 10% code: <strong className="text-[#D4AF37]">SWEET10</strong></p>
                </div>
              </div>
              <button
                onClick={() => applyPromoCode('SWEET10')}
                className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] hover:underline shrink-0 cursor-pointer"
              >
                Apply to Cart
              </button>
            </motion.div>
          )}

          <p className="mt-4 text-[11px] text-[#F5E6D3]/50">
            No spam, ever. Unsubscribe anytime with a single click.
          </p>

        </div>

      </div>
    </section>
  );
};
