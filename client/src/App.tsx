// src/App.tsx
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { HeroSection } from './components/Hero/HeroSection';

import './App.css';

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        if (scrollTop > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <HeroSection className="hero-section" />
      {/* Add other components here */}
      {/* Example: <SomeOtherComponent /> */}
      {/* Other components can be added here */}
    </div>
  );
};

export default App;