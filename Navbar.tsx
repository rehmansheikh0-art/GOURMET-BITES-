import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, searchQuery, setSearchQuery } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: '5s Cinema Ad', id: 'cinematic-ad' },
    { name: 'Shop', id: 'shop' },
    { name: 'Flavors', id: 'flavors' },
    { name: 'About Us', id: 'about' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1A0F0A]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-[#1A0F0A]/95 via-[#1A0F0A]/70 to-transparent py-5'
        }`}
      >
        {/* Top announcement bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo: Gourmet Bites */}
            <button
              id="brand-logo-btn"
              onClick={() => handleLinkClick('hero')}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 border border-[#D4AF37] bg-[#26140D] flex items-center justify-center shadow-md">
                <span className="font-display font-bold text-xs text-[#D4AF37] tracking-widest">GB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F5E6D3] group-hover:text-[#D4AF37] transition-colors">
                  GOURMET BITES
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold -mt-1 hidden sm:block">
                  Artisan Chocolate Wafers
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-1 transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#D4AF37] font-bold'
                        : 'text-[#F5E6D3]/70 hover:text-[#D4AF37]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action buttons: Search, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle / Input */}
              <div className="relative">
                {showSearchInput ? (
                  <div className="flex items-center bg-[#26140D] border border-[#D4AF37]/50 rounded-none px-3 py-1.5 shadow-lg w-44 sm:w-64">
                    <Search className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <input
                      id="nav-search-input"
                      type="text"
                      placeholder="Search crisp flavors..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (activeSection !== 'shop') {
                          onNavigate('shop');
                        }
                      }}
                      className="bg-transparent border-none text-xs text-[#F5E6D3] px-2 w-full focus:outline-none placeholder-[#F5E6D3]/40"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setShowSearchInput(false);
                        setSearchQuery('');
                      }}
                      className="text-[#F5E6D3]/60 hover:text-[#F5E6D3] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-toggle-btn"
                    onClick={() => setShowSearchInput(true)}
                    className="p-2.5 text-[#F5E6D3]/70 hover:text-[#D4AF37] hover:bg-[#26140D] transition-colors cursor-pointer"
                    aria-label="Search Flavors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                id="nav-wishlist-btn"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 text-[#F5E6D3]/70 hover:text-[#D4AF37] hover:bg-[#26140D] transition-colors cursor-pointer"
                aria-label="View Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#1A0F0A] text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button with Counter */}
              <button
                id="nav-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2 bg-[#26140D] border border-[#C5A059]/30 hover:border-[#D4AF37] text-[#F5E6D3] transition-all duration-300 shadow-md group cursor-pointer"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D4AF37] text-[#1A0F0A] text-[10px] font-extrabold flex items-center justify-center shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline text-[#F5E6D3]">
                  Bag ({cartCount})
                </span>
              </button>

              {/* Mobile menu hamburger toggle */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#F5E6D3]/70 hover:text-[#D4AF37] hover:bg-[#26140D] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#1A0F0A] border-b border-[#C5A059]/20 px-4 pt-3 pb-6 mt-2 overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="flex items-center justify-between px-4 py-3 text-xs uppercase tracking-widest font-semibold text-[#F5E6D3] hover:bg-[#26140D] hover:text-[#D4AF37] transition-colors text-left"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-[#C5A059]/20 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                    <Sparkles className="w-4 h-4" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
