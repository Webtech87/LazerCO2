import React from "react";
import "./Treatments.css";

interface TreatmentsProps {
  title: string;
  description: string;
  benefits: string[];
  className?: string;
  beforeImage?: string;
  afterImage?: string;
}

const Treatments: React.FC<TreatmentsProps> = ({
  title,
  description,
  benefits,
  className = "",
  // Default values for images in the public folder
  beforeImage = "/laser-treatment-before.jpg",
  afterImage = "/laser-treatment.jpg",
}) => {
  return (
    <section className={`treatment-section ${className}`}>
      <div className="treatment-content">
        <h2 className="treatment-title">{title}</h2>
        <div className="treatment-detail">
          <h3 className="treatment-description">{description}</h3>
          <div className="treatment-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="treatment-benefit">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="treatment-images">
        <img
          src={beforeImage}
          alt="Before treatment"
          className="treatment-image"
        />
        <img
          src={afterImage}
          alt="After treatment"
          className="treatment-image"
        />
      </div>
    </section>
  );
};

export default Treatments;