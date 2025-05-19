import React from "react";
import "./Testimonial.css";

interface TestimonialCardProps {
  title: string;
  content: string;
  reviewerName: string;
  starCount?: number;
  googleIcon?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  content,
  reviewerName,
  starCount = 0,
  googleIcon,
}) => {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card-content">
        <div className="testimonial-header">
          <div className="icon-container">
            {googleIcon ? (
              <img
                src={googleIcon}
                className="google-icon"
                alt="Google icon"
              />
            ) : (
              <div className="default-icon" />
            )}
          </div>
        </div>
        <h3 className="testimonial-title">{title}</h3>
        <p className="testimonial-text">{content}</p>
        {starCount > 0 && (
          <div className="star-rating">
            {Array.from({ length: starCount }).map((_, index) => (
              <span key={index} className="star">★</span>
            ))}
          </div>
        )}
        <div className="reviewer-name">{reviewerName}</div>
      </div>
    </article>
  );
};

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      title: "Experiência incrível excelente atendimento",
      content: "Muito satisfeita com profissionalismo da dr Wilsa e com os resultados obtidos dos procedimentos que já realizei. Sinto-me completamente realizada na santclinic que para além da confiança ajudaram-me imenso a recuperar minha autoestima.\"",
      reviewerName: "Alessandra Nascimento",
      starCount: 0,
    },
    {
      title: "\"Super recomendo a Dra Wilsa",
      content: "Uma excelente profissional muito atenciosa e com uma simpatia incrivel. Estou muito feliz com os tratamentos que realizei .agradeço imenso a Dra Wilsa e a toda equipa pela simpatia.\"",
      reviewerName: "Sandra Correia",
      starCount: 0,
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 3,
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 5,
      googleIcon: "https://cdn.builder.io/api/v1/image/assets/10b35e338a05446e9e39f298a4ee05f5/112b58541c1b2e82470ddfd4bc007c32678f6db2?placeholderIfAbsent=true",
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 5,
      googleIcon: "https://cdn.builder.io/api/v1/image/assets/10b35e338a05446e9e39f298a4ee05f5/112b58541c1b2e82470ddfd4bc007c32678f6db2?placeholderIfAbsent=true",
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 5,
      googleIcon: "https://cdn.builder.io/api/v1/image/assets/10b35e338a05446e9e39f298a4ee05f5/112b58541c1b2e82470ddfd4bc007c32678f6db2?placeholderIfAbsent=true",
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 0,
    },
    {
      title: "Agradeço incomensurávelmente o humanismo",
      content: "Humildade e acima de tudo a credibilidade e profissionalismo da Dra Wilsa, sinto-me super confiante nos procedimentos e nas suas sábias sugestões, recomendo a Santi Clinic sem hesitações! Bem haja.\"‍",
      reviewerName: "Alessandra Nascimento",
      starCount: 0,
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">
          Testemunhos de quem escolheu a Santiclinic
        </h2>
        <div className="testimonials-slider">
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                title={testimonial.title}
                content={testimonial.content}
                reviewerName={testimonial.reviewerName}
                starCount={testimonial.starCount}
                googleIcon={testimonial.googleIcon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;