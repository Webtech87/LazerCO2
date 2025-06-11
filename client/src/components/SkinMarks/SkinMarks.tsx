import "./SkinMarks.css"
import {useTranslation} from "react-i18next";

const SkinMarks = () => {
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
            <h2 className="main_title">{t("skin_mark.title")}</h2>
            <div className="treatment-text-container">
               <h3><li className="treatment-item">{t("skin_mark.subtile")}</li></h3>
              <ul className="list_container">
                <li className="treatment-item">{t("skin_mark.lt.0")}</li>
                <li className="treatment-item">{t("skin_mark.lt.1")}</li>
                <li className="treatment-item">{t("skin_mark.lt.2")}</li>
                <li className="treatment-item">{t("skin_mark.lt.3")}</li>
              </ul>
             </div>
             
             {/* Call to Action Button */}
             <div className="cta-container">
               <button 
                 className="saber-mais-btn"
                 onClick={() => {
                   const footerElement = document.getElementById('footer-section');
                   if (footerElement) {
                     footerElement.scrollIntoView({ 
                       behavior: 'smooth',
                       block: 'start'
                     });
                   }
                 }}
               >
                 <span className="btn-text">Saber Mais sobre o Laser CO2</span>
                 <div className="btn-glow"></div>
               </button>
             </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default SkinMarks;