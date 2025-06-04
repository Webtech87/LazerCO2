import { CheckIcon, LockIcon } from "lucide-react";
import "./HeroSection.css";
import {useTranslation} from "react-i18next";


interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {

  const {t} = useTranslation();

  return (
    <section className={`hero-section ${className || ""}`}>
      <div className="hero-background-blur"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="hero-title">
              {t("section_1.title")}
            </h1>
            <p className="hero-description">
              {t("section_1.p")}
            </p>
          </div>
          
          <div className="action-content">
            <div className="cta-container">
              <button 
                className="cta-button" 
                onClick={() => console.log("Scheduling appointment")}
              >
                <span className="cta-text">{t("section_1.btn")}</span>
                <div className="cta-glow"></div>
              </button>
              
              <button 
                className="more-details-button"
                onClick={() => console.log("More details")}
              >
                {t("section_1.more.title")}
              </button>
            </div>
            
            <div className="benefits-container">
              <div className="benefit-item">
                <CheckIcon className="check-icon" />
                <span className="benefit-text">+5.000 {t("section_1.more.lt.0")}</span>
              </div>
              <div className="benefit-item">
                <LockIcon className="lock-icon" />
                <span className="benefit-text">{t("section_1.more.lt.1")}</span>
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