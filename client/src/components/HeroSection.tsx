import { CheckIcon, LockIcon } from "lucide-react";
import "./HeroSection.css";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={`hero-section ${className || ""}`}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Pele renovada em profundidade com Laser CO₂
          </h1>
          <p className="hero-description">
            Rejuvenescimento não invasivo com resultados visíveis a partir da
            primeira sessão.
          </p>
          <div className="cta-container">
            <div className="cta-button-wrapper">
              <button 
                className="cta-button" 
                onClick={() => console.log("Scheduling appointment")}
              >
                Agende a sua avaliação
              </button>
            </div>
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
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0af60b8fc47314140fc250b53bced117aadb90df?placeholderIfAbsent=true"
          alt="Woman receiving skin treatment"
          className="hero-image"
        />
      </div>
    </section>
  );
}