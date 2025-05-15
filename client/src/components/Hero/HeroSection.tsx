import { CheckIcon, LockIcon } from "lucide-react";
import "./HeroSection.css";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={`hero-section ${className || ""}`}>
      <div className="hero-background-blur"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">
              Pele renovada em profundidade com Laser CO₂
            </h1>
            <p className="hero-description">
              Rejuvenescimento não invasivo com resultados visíveis a partir da
              primeira sessão.
            </p>
          </div>
          
          <div className="action-content">
            <div className="cta-container">
              <button 
                className="cta-button" 
                onClick={() => console.log("Scheduling appointment")}
              >
                <span className="cta-text">Agende a sua avaliação</span>
                <div className="cta-glow"></div>
              </button>
              
              <button 
                className="more-details-button"
                onClick={() => console.log("More details")}
              >
                SAIBA MAIS DETALHES
              </button>
            </div>
            
            <div className="benefits-container">
              <div className="benefit-item">
                <CheckIcon className="check-icon" />
                <span className="benefit-text">+5.000 clientes satisfeitos</span>
              </div>
              <div className="benefit-item">
                <LockIcon className="lock-icon" />
                <span className="benefit-text">100% seguro</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="image-container">
          <div className="image-glow"></div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0af60b8fc47314140fc250b53bced117aadb90df?placeholderIfAbsent=true"
            alt="Woman receiving skin treatment"
            className="hero-image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}