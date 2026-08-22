import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    totalPrice,
    promoCode,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!inputCode.trim()) return;

    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
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
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-[#26140D]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#F5E6D3]">
                Your Tasting Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#F5E6D3]/60 hover:text-[#D4AF37] hover:bg-[#1A0F0A] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="px-5 py-3 bg-[#26140D]/70 border-b border-[#C5A059]/20">
            <div className="flex items-center justify-between text-xs text-[#F5E6D3]/80 mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-[#D4AF37]">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free Thermal Shipping</strong>
                </span>
              ) : (
                <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked Free Thermal Insulated Shipping!
                </span>
              )}
              <span className="text-[10px] text-[#D4AF37] font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1A0F0A] overflow-hidden border border-[#C5A059]/20">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => {
                const itemBase = item.subscription ? item.product.price * 0.9 : item.product.price;
                const extra = item.packagingOption === 'luxury_gold_box' ? 3.50 : 0;
                const unitPrice = itemBase + extra;

                return (
                  <div
                    key={`${item.product.id}-${item.packagingOption}-${item.subscription}`}
                    className="flex gap-3.5 p-3.5 bg-[#26140D] border border-[#C5A059]/20 relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover bg-[#1A0F0A] shrink-0 border border-[#C5A059]/30"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-bold text-[#F5E6D3] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#F5E6D3]/40 hover:text-[#D4AF37] p-0.5 ml-2 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] bg-[#1A0F0A] px-1.5 py-0.5 border border-[#C5A059]/30">
                            {item.packagingOption === 'luxury_gold_box' ? 'Gold Keepsake Box' : 'Artisan Pouch'}
                          </span>
                          {item.subscription && (
                            <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] bg-[#1A0F0A] px-1.5 py-0.5 border border-[#D4AF37]/50">
                              Subscribed (-10%)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#C5A059]/20">
                        <div className="flex items-center bg-[#1A0F0A] border border-[#C5A059]/30 px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#D4AF37] hover:bg-[#26140D] font-bold text-xs cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#F5E6D3]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#D4AF37] hover:bg-[#26140D] font-bold text-xs cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-display text-sm font-bold text-[#D4AF37]">
                          ${(unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-3" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#F5E6D3]">Your Bag is Empty</h4>
                <p className="text-xs text-[#F5E6D3]/60 mt-1 mb-6">
                  Add some gourmet chocolate wafer bites to experience our signature crisp crunch.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="gold-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  Explore Flavors
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#26140D] border-t border-[#C5A059]/25 space-y-4">
              
              {/* Promo Code Box */}
              {!promoCode ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CRISP15)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 focus:border-[#D4AF37] pl-8 pr-3 py-2 text-xs text-[#F5E6D3] placeholder-[#F5E6D3]/40 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1A0F0A] border border-[#C5A059]/50 hover:bg-[#D4AF37] hover:text-[#1A0F0A] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-[#1A0F0A] border border-[#D4AF37]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-bold text-[#F5E6D3]">{promoCode} applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-[#D4AF37] hover:underline cursor-pointer font-bold uppercase"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-[#E07A5F]">{promoError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#F5E6D3]/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#F5E6D3]">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Thermal Cold-Packed Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#D4AF37]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#F5E6D3] pt-2 border-t border-[#C5A059]/20">
                  <span>Estimated Total</span>
                  <span className="font-display text-lg text-[#D4AF37]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="gold-button w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#F5E6D3]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Melt-Free Freshness Guarantee</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
