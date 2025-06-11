import { CheckIcon, LockIcon } from "lucide-react";
import "./HeroSection.css";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const { t } = useTranslation();

  // 🚀 Scroll to Footer function
  const scrollToFooter = () => {
    console.log("📍 Scrolling to footer...");
    
    // Try multiple selectors to find the footer
    const footer = document.querySelector('footer') || 
                   document.querySelector('.footer') ||
                   document.querySelector('#footer') ||
                   document.querySelector('[data-section="footer"]');
    
    if (footer) {
      footer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      console.log("✅ Footer found and scrolling");
    } else {
      // Fallback: scroll to bottom of page
      console.log("⚠️ Footer not found, scrolling to bottom");
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // 🚀 WhatsApp redirect function
  const redirectToWhatsApp = () => {
    console.log("💬 Redirecting to WhatsApp...");
    
    const phoneNumber = "351915007427"; // Portugal code + your number
    const message = "Olá! Vi o site da SantiClinic e gostaria de saber mais detalhes sobre o tratamento com Laser CO₂. Podem me ajudar?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log("🔗 WhatsApp URL:", whatsappUrl);
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

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
              {/* 🎯 UPDATED: Main CTA button - scrolls to footer */}
              <button
                className="cta-button"
                onClick={scrollToFooter}
                title="Agendar avaliação - rolar para contactos"
              >
                <span className="cta-text">{t("section_1.btn")}</span>
                <div className="cta-glow"></div>
              </button>
              
              {/* 💬 UPDATED: Details button - opens WhatsApp */}
              <button
                className="more-details-button"
                onClick={redirectToWhatsApp}
                title="Saber mais detalhes via WhatsApp"
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
        
        <div className="video-container">
          <div className="image-glow"></div>
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/laser-c02.mp4" type="video/mp4" />
            {/* Fallback image if video fails to load */}
            <img
              src="/images/IMG_8271.png"
              alt="Woman receiving skin treatment"
              className="hero-image"
            />
          </video>
        </div>
      </div>
    </section>
  );
}