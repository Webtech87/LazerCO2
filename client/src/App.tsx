import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import About from "./components/About/About";
import BeforeAfter from "./components/BeforeAfter/BeforeAfter";
import './App.css';
import Benefits from './components/Benefits/Benefits';
import Treatments from './components/Treatments/Treatments';

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
      <BeforeAfter
        imageSources={[
          '/laser-treatment.jpg',
        ]}
        title="Laser CO₂ Aplicado com Precisão nas Zonas-Chave"
        subtitle="Rosto, pescoço e colo"
        benefits={[
          "Ideal para melhorar:",
          "Textura e firmeza da pele",
          "Rugas finas e moderadas",
          "Manchas solares e sinais de envelhecimento",
          "Flacidez leve Permite um efeito lifting natural, com renovação visível da pele após cada sessão.",
        ]}
      />
      <Treatments
        title="Tratamentos Personalizados"
        description="Descubra os tratamentos ideais para sua pele."
        benefits={[
          "Rejuvenescimento da pele",
          "Redução de manchas",
          "Melhora da textura e firmeza",
        ]}
        // You can override the default images if needed
        // beforeImage="/custom-before-image.jpg"
        // afterImage="/custom-after-image.jpg"
      />
    </div>
  );
};

export default App; 