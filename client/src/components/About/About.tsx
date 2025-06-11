import "./About.css";
import {useTranslation} from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  // 🚀 Scroll to Footer function
  const scrollToFooter = () => {
    console.log("📍 Scrolling to footer from About section...");
    
    // Try multiple selectors to find the footer
    const footer = document.querySelector('#footer-section') ||
                  document.querySelector('.footer-section') ||
                  document.querySelector('footer') ||
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

  return (
    <div className="page-container">
      <main className="container">
        <section className="laser-treatment">
          <div className="treatment-image">
            <img
              src="/IMG_7427.jpg"
              alt="CO2 Laser Treatment"
            />
          </div>
          
          <article className="treatment-content">
            <h2>{t("cois.title")}</h2>
            <div className="treatment-text-container">
              <p className="treatment-text">
                {t("cois.p.0")} <span className="highlight">{t("cois.p.1")}</span> {t("cois.p.2")} <span className="highlight">{t("cois.p.3")}</span>, {t("cois.p.4")} <span className="highlight">{t("cois.p.5")}</span>, {t("cois.p.6")} <span className="highlight">{t("cois.p.7")}</span>. {t("cois.p.8")} <span className="highlight">{t("cois.p.9")}</span> {t("cois.p.10")} <span className="highlight">{t("cois.p.11")}</span>, {t("cois.p.12")}.
              </p>
              <button 
                className="cta-button"
                onClick={scrollToFooter}
                title="Agendar avaliação - ir para formulário de contacto"
              >
                {t("cois.btn")}
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default About;