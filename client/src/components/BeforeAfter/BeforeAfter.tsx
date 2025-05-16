import React from "react";
import "./BeforeAfter.css";

interface BeforeAfterProps {
  imageSources: string[];
  title: string;
  subtitle: string;
  benefits: string[];
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({
  imageSources,
  title,
  subtitle,
  benefits
}) => {
  return (
    <div className="before-after-container">
      <h2 className="before-after-title">{title}</h2>
      
      <div className="before-after-content">
        <div className="before-after-image-container">
          <div className="before-after-images">
            {imageSources.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Before/After image ${index + 1}`}
                className="before-after-image"
              />
            ))}
          </div>
        </div>
        
        <div className="before-after-info">
          <div className="before-after-subtitle">{subtitle}</div>
          <div className="before-after-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="before-after-benefit">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
