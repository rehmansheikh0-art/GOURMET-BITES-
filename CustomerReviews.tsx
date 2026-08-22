import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, MessageSquarePlus, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerReviews: React.FC = () => {
  const { reviews, addReview } = useStore();
  const [selectedFlavorFilter, setSelectedFlavorFilter] = useState('all');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [flavor, setFlavor] = useState('Hazelnut Chocolate');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const filterOptions = ['all', 'Hazelnut Chocolate', 'The Grand Connoisseur Box', 'Caramel Chocolate', 'Classic Chocolate'];

  const filteredReviews = reviews.filter((r) =>
    selectedFlavorFilter === 'all' ? true : r.flavor === selectedFlavorFilter
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !title.trim()) return;

    addReview({
      author: authorName.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      flavor,
      verified: true,
      avatarBg: '#5C3826',
    });

    // Reset and close
    setAuthorName('');
    setTitle('');
    setComment('');
    setIsWriteReviewOpen(false);
  };

  return (
    <section id="reviews" className="py-24 bg-[#1A0F0A] relative overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with average score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26140D] border border-[#C5A059]/30 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Verified Connoisseur Reviews
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E6D3]">
              Loved by Chocolate Lovers Worldwide
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#26140D] px-4 py-2 border border-[#C5A059]/20">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="font-bold text-sm text-[#F5E6D3]">4.95 / 5.0</span>
              <span className="text-xs text-[#F5E6D3]/60">({reviews.length * 80}+ ratings)</span>
            </div>

            <button
              id="write-review-trigger-btn"
              onClick={() => setIsWriteReviewOpen(true)}
              className="gold-button px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFlavorFilter(opt)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedFlavorFilter === opt
                  ? 'bg-[#D4AF37] text-[#1A0F0A] font-bold'
                  : 'bg-[#26140D] text-[#F5E6D3]/70 border border-[#C5A059]/20 hover:border-[#D4AF37]/50 hover:text-[#F5E6D3]'
              }`}
            >
              {opt === 'all' ? 'All Reviews' : opt}
            </button>
          ))}
        </div>

        {/* 3-4 Stylish Customer Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-between p-6 bg-[#26140D] border border-[#C5A059]/20 shadow-xl hover:border-[#D4AF37]/50 transition-all"
            >
              <div>
                {/* Rating stars and date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#F5E6D3]/50">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="font-serif-luxury text-base font-bold text-[#F5E6D3] leading-snug mb-2">
                  “{rev.title}”
                </h4>

                {/* Comment */}
                <p className="text-xs text-[#F5E6D3]/70 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Flavor Tag */}
              <div className="pt-4 mt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40 bg-[#1A0F0A]"
                  >
                    {rev.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#F5E6D3]">{rev.author}</span>
                    <div className="flex items-center gap-1 text-[10px] text-[#D4AF37]">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Verified Connoisseur</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#F5E6D3]/60 bg-[#1A0F0A] px-2 py-0.5 border border-[#C5A059]/20">
                  {rev.flavor.replace(' Chocolate', '')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal: Write a Review */}
      <AnimatePresence>
        {isWriteReviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#26140D] border border-[#D4AF37]/50 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="absolute top-4 right-4 text-[#F5E6D3]/60 hover:text-[#D4AF37] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif-luxury text-2xl font-bold text-[#F5E6D3] mb-1">
                Share Your Tasting Experience
              </h3>
              <p className="text-xs text-[#F5E6D3]/70 mb-6">
                Tell fellow chocolate connoisseurs what you enjoyed most about our wafer bites.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Charlotte Dubois"
                    className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value={5} className="bg-[#1A0F0A]">5 Stars — Divine Perfection</option>
                      <option value={4} className="bg-[#1A0F0A]">4 Stars — Very Delicious</option>
                      <option value={3} className="bg-[#1A0F0A]">3 Stars — Good Flavor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                      Flavor Tasted
                    </label>
                    <select
                      value={flavor}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Hazelnut Chocolate" className="bg-[#1A0F0A]">Hazelnut Chocolate</option>
                      <option value="Classic Chocolate" className="bg-[#1A0F0A]">Classic Chocolate</option>
                      <option value="Dark Chocolate" className="bg-[#1A0F0A]">72% Dark Chocolate</option>
                      <option value="Caramel Chocolate" className="bg-[#1A0F0A]">Caramel Chocolate</option>
                      <option value="The Grand Connoisseur Box" className="bg-[#1A0F0A]">Grand Connoisseur Box</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Crisp perfection with molten chocolate"
                    className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
                    Detailed Notes & Texture Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the snap, the ganache, or your pairing..."
                    className="w-full bg-[#1A0F0A] border border-[#C5A059]/30 px-3.5 py-2.5 text-xs text-[#F5E6D3] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewOpen(false)}
                    className="px-4 py-2.5 text-xs text-[#F5E6D3]/60 hover:text-[#F5E6D3] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="gold-button px-6 py-2.5 text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
