// src/App.tsx
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.origin + link.pathname === window.location.origin + window.location.pathname) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const navbarHeight = window.innerWidth <= 575 ? 60 : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without reload
          history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        {/* Placeholder sections with some content for testing */}
        <section id="laser-co2" className="section">
          <h1>SOBRE O LASER CO2</h1>
          <p>O laser de CO2 é um tipo de laser que utiliza dióxido de carbono como meio ativo. É um dos primeiros lasers de gás a ser desenvolvido e ainda é um dos mais úteis. O laser de CO2 é a fonte mais alta de energia de infravermelhos contínua disponível.</p>
        </section>
        
        <section id="beneficios" className="section">
          <h1>BENEFÍCIOS</h1>
          <p>O tratamento a laser CO2 oferece múltiplos benefícios para a pele, incluindo a redução de rugas, melhoria da textura da pele, diminuição de cicatrizes e uniformização do tom da pele.</p>
        </section>
        
        <section id="zonas" className="section">
          <h1>ZONAS DE APLICAÇÃO</h1>
          <p>O laser CO2 pode ser aplicado em diversas áreas do corpo, incluindo rosto, pescoço, mãos e áreas com cicatrizes ou danos solares significativos.</p>
        </section>
        
        <section id="contacto" className="section">
          <h1>CONTACTO</h1>
          <p>Entre em contacto connosco para marcar uma consulta ou para mais informações sobre os nossos tratamentos a laser CO2.</p>
        </section>
      </main>
    </div>
  );
}

export default App;