import "./about.css";

import {useTranslation} from "react-i18next";

const About = () => {

  const { t } = useTranslation();

  return (
    <div className="page-container">
      <main className="container">
        <section className="laser-treatment">
          <div className="treatment-image">
            <img
              src="/laser-treatment.jpg"
              alt="CO2 Laser Treatment"
            />
          </div>
          
          <article className="treatment-content">
            <h2>{t("cois.title")}</h2>
            <div className="treatment-text-container">
              <p className="treatment-text">
                {t("cois.p.0")} <span className="highlight">{t("cois.p.1")}</span> {t("cois.p.2")} <span className="highlight">{t("cois.p.3")}</span>, {t("cois.p.4")} <span className="highlight">{t("cois.p.5")}</span>, {t("cois.p.6")} <span className="highlight">{t("cois.p.7")}</span>. {t("cois.p.8")} <span className="highlight">{t("cois.p.9")}</span> {t("cois.p.10")} <span className="highlight">{t("cois.p.11")}</span>, {t("cois.p.12")}.
              </p>
              <button className="cta-button">
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