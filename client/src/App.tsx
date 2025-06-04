// src/App.tsx
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import About from "./components/About/About";
import './App.css';
import Benefits from './components/Benefits/Benefits';
import KeyAreas from './components/KeyAreas/KeyAreas';
import SkinMarks from "./components/skinMarks/skinMarks.tsx";
import Rejuvenescimento from './components/Rejuvenescimento/Rejuvenescimento.tsx';

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
      <About />
      <Benefits />
      <KeyAreas />
      <SkinMarks />
      <Rejuvenescimento />

    </div>
  );
};

export default App;