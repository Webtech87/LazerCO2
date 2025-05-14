// src/App.tsx
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Navbar/Hero/Hero'; // Import the Hero component

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
      <Hero /> {/* Add the Hero component here */}
      {/* Other components can be added here */}
    </div>
  );
};

export default App;