import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { showToast } = useStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Flavor & Gifting Inquiry',
    message: '',
  });

  const faqs = [
    {
      q: 'How do Gourmet Bites maintain their signature crispness?',
      a: 'We bake our wafers on custom precision micro-groove cast iron irons and seal each pack in nitrogen-flushed gold foil barrier pouches, locking in crisp freshness for up to 9 months.',
    },
    {
      q: 'Do you offer corporate or wedding luxury gift packaging?',
      a: 'Yes! We offer custom gold-foil embossed keepsake boxes, personalized ribbon ribbons, and tiered volume discounts for events, corporate gifts, and holiday celebrations.',
    },
    {
      q: 'Are your chocolates suitable for specific diets?',
      a: 'Our Dark Chocolate (72%) recipe is naturally dairy-free friendly. All products contain no palm oil, no artificial preservatives, and are made with non-GMO ingredients and pure cocoa butter.',
    },
    {
      q: 'How is chocolate shipped during warmer seasons?',
      a: 'All orders during warm months are packed in biodegradable insulated thermal liners with reusable non-toxic gel cold packs to guarantee arrival in pristine molten-core condition.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    showToast('Message Sent', 'Our master chocolatier concierge will respond within 24 hours.', 'success');
  };

  return (
    <section id="contact" className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Concierge & Inquiries
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
            We’d Love to Hear from You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5E6D3]/70 leading-relaxed">
            Have questions about our single-origin cacao, custom gift orders, or dietary details? Our confectionery team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Form & Info Cards */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#26140D] border border-[#C5A059]/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A0F0A] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Email Concierge</span>
                  <p className="text-xs font-semibold text-[#F5E6D3]">concierge@gourmetbites.com</p>
                </div>
              </div>

              <div className="p-4 bg-[#26140D] border border-[#C5A059]/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A0F0A] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest">Toll-Free Phone</span>
                  <p className="text-xs font-semibold text-[#F5E6D3]">+1 (800) 843-BITE</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 bg-[#26140D] border border-[#C5A059]/25 shadow-xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Evelyn Thorne"
                        className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. evelyn@example.com"
                        className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Flavor & Gifting Inquiry" className="bg-[#1A0F0A]">Flavor & Gifting Inquiry</option>
                      <option value="Corporate / Event Orders" className="bg-[#1A0F0A]">Corporate & Event Bulk Gifting</option>
                      <option value="Shipping & Delivery" className="bg-[#1A0F0A]">Order Status / Thermal Shipping</option>
                      <option value="Wholesale Inquiries" className="bg-[#1A0F0A]">Artisan Wholesale Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can assist your chocolate indulgence..."
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="gold-button w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#F5E6D3]">
                    Thank You, {form.name}
                  </h3>
                  <p className="text-xs text-[#F5E6D3]/70 max-w-sm mx-auto">
                    Your message regarding <span className="text-[#D4AF37] font-medium">{form.subject}</span> has been received. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: 'Flavor & Gifting Inquiry', message: '' });
                    }}
                    className="text-xs text-[#D4AF37] hover:underline pt-2 font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-2xl font-bold text-[#F5E6D3]">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`border transition-all ${
                      isOpen ? 'bg-[#26140D] border-[#D4AF37]' : 'bg-[#1A0F0A] border-[#C5A059]/20 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-medium text-sm text-[#F5E6D3]">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-5 text-xs text-[#F5E6D3]/70 leading-relaxed border-t border-[#C5A059]/20 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Tasting Room Notice */}
            <div className="mt-8 p-5 bg-[#26140D] border border-[#C5A059]/20 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1A0F0A] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#F5E6D3] block">Confectionery Tasting Room Hours</span>
                <span className="text-[#F5E6D3]/60">Monday – Saturday: 10:00 AM – 7:00 PM EST</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
