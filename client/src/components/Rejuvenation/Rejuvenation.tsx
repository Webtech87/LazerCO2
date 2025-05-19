import React from "react";
import "./Rejuvenation.css";

interface RejuvenationProps {
  beforeImage: string;
  afterImage: string;
}

// Export as both default and named export
export const Rejuvenation: React.FC<RejuvenationProps> = ({
  beforeImage = "/laser-treatment.jpg",
  afterImage = "/laser-treatment.jpg",
}) => {
  return (
    <section className="rejuvenation-section">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Rejuvenescimento global</h1>
          <div className="treatment-info">
            <h2>
              O protocolo de rejuvenescimento com Laser CO₂ é indicado para quem
              deseja:
            </h2>
            <ul>
              <li>Uma renovação completa da pele</li>
              <li>Estimular colagénio em profundidade</li>
              <li>
                Reduzir visivelmente os sinais da idade
              </li>
              <li>
                Melhorar a elasticidade, firmeza e luminosidade é um dos
                tratamentos preferidos para quem procura resultados impactantes
                sem cirurgia.
              </li>
            </ul>
          </div>
        </div>
        <div className="before-after-container">
          <div className="before-after-images">
            <div className="image-wrapper">
              <img
                src={beforeImage}
                alt="Before treatment"
                className="before-image"
              />
            </div>
            <div className="image-wrapper">
              <img
                src={afterImage}
                alt="After treatment"
                className="after-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

