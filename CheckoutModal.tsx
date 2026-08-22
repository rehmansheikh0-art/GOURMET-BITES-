import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Sparkles, Truck, Gift, Download, ArrowRight, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, discountAmount, shippingFee, totalPrice, completeOrder } = useStore();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [placedOrderId, setPlacedOrderId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 382-9104',
    address: '742 Evergreen Terrace',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    giftMessage: 'Indulge in these crispy chocolate bites!',
    includeGiftWrap: true,
  });

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = completeOrder(formData);
      setPlacedOrderId(orderId);
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="bg-[#1A0F0A] border border-[#D4AF37]/50 max-w-4xl w-full shadow-2xl overflow-hidden relative my-auto max-h-[94vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#C5A059]/20 flex items-center justify-between bg-[#26140D]">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#F5E6D3]">
              {step === 'details' ? 'Secure Luxury Checkout' : 'Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#F5E6D3]/60 hover:text-[#D4AF37] hover:bg-[#1A0F0A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-6 sm:p-8 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer and Shipping Form */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Contact Information */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3 flex items-center gap-1.5">
                    <span>1. Connoisseur Contact</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">Email for Tracking</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3 flex items-center gap-1.5">
                    <span>2. Thermal Delivery Address</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">State / Province</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#F5E6D3]/60 block mb-1">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full bg-[#26140D] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gift Option */}
                <div className="p-3.5 bg-[#26140D] border border-[#C5A059]/25 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeGiftWrap}
                      onChange={(e) => setFormData({ ...formData, includeGiftWrap: e.target.checked })}
                      className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#F5E6D3] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Complimentary Gold Ribbon & Handwritten Tasting Card
                    </span>
                  </label>
                  {formData.includeGiftWrap && (
                    <input
                      type="text"
                      placeholder="Optional gift note (e.g. Happy Birthday, enjoy the crunch!)"
                      value={formData.giftMessage}
                      onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-1.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37] mt-1"
                    />
                  )}
                </div>

                {/* Payment Simulation */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3 flex items-center gap-1.5">
                    <span>3. Payment Information</span>
                  </h4>
                  <div className="p-4 bg-[#26140D] border border-[#C5A059]/25 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#F5E6D3]/70">
                      <span className="font-semibold flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                        Encrypted 256-Bit SSL Payment
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Test Mode Active</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] font-mono focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-2 text-xs text-[#F5E6D3] font-mono focus:border-[#D4AF37] focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5 bg-[#26140D] p-5 sm:p-6 border border-[#C5A059]/25">
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#F5E6D3] mb-4">
                    Order Summary ({cart.length} items)
                  </h4>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-[#1A0F0A] border border-[#C5A059]/30 flex items-center justify-center font-bold text-[#D4AF37]">
                            {item.quantity}x
                          </span>
                          <span className="text-[#F5E6D3] font-medium">{item.product.name}</span>
                        </div>
                        <span className="text-[#D4AF37] font-mono font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#C5A059]/20 space-y-2 text-xs text-[#F5E6D3]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#F5E6D3]">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#D4AF37]">
                        <span>Artisan Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Thermal Cold-Chain Courier</span>
                      <span>{shippingFee === 0 ? <strong className="text-[#D4AF37]">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[#F5E6D3] pt-2 border-t border-[#C5A059]/20">
                      <span>Grand Total</span>
                      <span className="font-display text-xl text-[#D4AF37]">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    id="submit-order-btn"
                    type="submit"
                    disabled={isProcessing}
                    className="gold-button w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    {isProcessing ? (
                      <span>Authorizing Connoisseur Order...</span>
                    ) : (
                      <>
                        <span>Place Order — ${totalPrice.toFixed(2)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#F5E6D3]/60">
                    <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Ships within 24 hours with temperature guarantee</span>
                  </div>
                </div>

              </div>

            </div>
          </form>
        ) : (
          /* Order Celebration / Confirmation Screen */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-[#26140D] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Order Confirmed
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold text-[#F5E6D3] mt-1">
                Your Chocolate Bites Are on Their Way!
              </h3>
              <p className="text-xs sm:text-sm text-[#F5E6D3]/70 mt-2">
                Order Reference: <strong className="text-[#D4AF37] font-mono">{placedOrderId}</strong>
              </p>
              <p className="text-xs text-[#F5E6D3]/50 mt-1">
                A confirmation with real-time temperature tracking was sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Courier Dispatch Card */}
            <div className="p-4 bg-[#26140D] border border-[#C5A059]/25 text-left flex items-start gap-3">
              <Package className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#F5E6D3] block">Cold-Chain Dispatch Scheduled</span>
                <p className="text-[#F5E6D3]/60 mt-0.5">
                  Your wafer bites will be packaged in insulated foil pouches with dry gel cold-packs and dispatched via Express Courier.
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="gold-button px-8 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Continue Tasting Journey
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
