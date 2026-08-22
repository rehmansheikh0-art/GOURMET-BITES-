import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CinematicAdSection } from './components/CinematicAdPlayer';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FlavorExplorer } from './components/FlavorExplorer';
import { BrandStory } from './components/BrandStory';
import { ProductShowcase } from './components/ProductShowcase';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';
import { Product } from './types';

const MainContent: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'cinematic-ad', 'shop', 'why-us', 'flavors', 'about', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3] flex flex-col font-sans-clean">
      {/* Sticky Navigation */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onShopClick={() => scrollToSection('shop')}
          onExploreFlavorsClick={() => scrollToSection('flavors')}
          onWatchAdClick={() => scrollToSection('cinematic-ad')}
        />

        {/* 5-Second Ultra-Realistic Cinematic Product Advertisement */}
        <CinematicAdSection onShopClick={() => scrollToSection('shop')} />

        <FeaturedProducts
          onQuickView={(product: Product) => setQuickViewProduct(product)}
        />

        <WhyChooseUs />

        <FlavorExplorer />

        <BrandStory onExploreFlavors={() => scrollToSection('flavors')} />

        <ProductShowcase onShopClick={() => scrollToSection('shop')} />

        <CustomerReviews />

        <Newsletter />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Interactive Modals and Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
