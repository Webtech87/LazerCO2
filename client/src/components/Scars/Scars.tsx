import { useEffect } from "react";
import "./scars.css";

interface ScarsProps {
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  listTitle?: string;
  listItems?: string[];
}

export function Scars({
  imageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/39460a8ecd22b0df30cbf74b5973e50923ba5fb5",
  imageAlt = "Before and after treatment comparison",
  title = "Remoção de sinais, cicatrizes e manchas",
  listTitle = "Tratamento preciso e seguro para:",
  listItems = [
    "Remover sinais benignos da pele",
    "Corrigir cicatrizes de acne, cirúrgicas ou traumáticas",
    "Eliminar manchas escuras solares ou senis",
    "Reduzir hiperpigmentações com melhora progressiva da uniformidade da pele"
  ]
}: ScarsProps) {
  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <main className="scars-main">
      <section className="treatment-section">
        <div className="treatment-image-container">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="treatment-image"
          />
        </div>
        <div className="treatment-content">
          <h2 className="section-title">{title}</h2>
          <div className="treatment-list">
            <h3 className="treatment-list-title">{listTitle}</h3>
            <div className="treatment-list-items">
              {listItems.map((item, index) => (
                <div key={index} className="treatment-list-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Scars;
