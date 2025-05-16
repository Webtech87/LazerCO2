import React from "react";
import "./about.css";

const About = () => {
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
            <h2>O que é o Laser CO₂?</h2>
            <div className="treatment-text-container">
              <p className="treatment-text">
                O <span className="highlight">Laser CO₂ fracionado</span> é uma tecnologia avançada de resurfacing da pele, que utiliza energia térmica controlada para <span className="highlight">estimular a regeneração profunda da pele</span>, atuando nas camadas dérmicas e epidérmicas. O feixe de laser é fracionado em milhares de microcolunas, atingindo a pele de forma seletiva, o que permite <span className="highlight">tratar imperfeições com precisão</span>, mantendo zonas saudáveis ao redor para uma <span className="highlight">recuperação mais rápida e segura</span>. É considerado o <span className="highlight">padrão-ouro</span> no rejuvenescimento não cirúrgico e na <span className="highlight">melhoria da textura e qualidade da pele</span>, com resultados visíveis após uma única sessão.
              </p>
              <button className="cta-button">
                AGENDE A SUA AVALIAÇÃO
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default About;