import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-container">
      {/* Background elements with animation */}
      <div className="background-elements">
        <div className="circle-top-right"></div>
        <div className="circle-bottom-left"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Main content */}
      <div className="content-container">
        {/* Left side - Text Content */}
        <div className="text-content">
          <h1 className="hero-title">
            <span className="title-line">Pele renovada</span>
            <span className="title-line">em profundidade,</span>
            <span className="title-line">com Laser CO<sub>2</sub></span>
          </h1>
          
          <p className="hero-description">
            Rejuvenescimento não invasivo com resultados visíveis a partir da primeira sessão.
          </p>
          
          <div className="cta-container">
            <button className="cta-button">
              SAIBA MAIS DETALHES
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="trust-badges">
              <div className="badge">+5.000 clientes satisfeitos</div>
              <div className="badge">100% seguro</div>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="image-container">
          <div className="image-wrapper">
            <img 
              src="/laser-treatment.jpg" 
              alt="Woman receiving facial treatment" 
              className="hero-image"
              loading="eager"
            />
            <div className="image-highlight"></div>
          </div>
          <div className="floating-testimonial">
            <div className="testimonial-content">
              <div className="stars">★★★★★</div>
              <p>"Resultados incríveis após apenas 2 sessões!"</p>
              <div className="author">- Ana S.</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Role para explorar</span>
      </div>
    </section>
  );
};

export default Hero;