import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Hero, Features, FeaturedProducts, Testimonials, CTA } from '../components/Landing';
import Footer from '../components/Main/Footer/Footer';
import Navbar from '../components/Main/Navbar/Navbar';

function Home() {
  const isDarkMode = useSelector((state: RootState) => state.theme.mode  === 'dark');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
     <Features />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
     <CTA />

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

export default Home;