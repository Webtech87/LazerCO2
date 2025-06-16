import { useEffect, useRef } from 'react';
import { CheckCircle, Sparkles, Zap } from 'lucide-react';
import './KeyAreas.css';
import { useTranslation } from "react-i18next";

const KeyAreas = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        imageRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const keyAreasList = [
        t("key_areas.lt.0"),
        t("key_areas.lt.1"),
        t("key_areas.lt.2"),
        t("key_areas.lt.3")
    ];

    return (
        <div id="key-areas-section" className='keyareas-page-container key-areas-section'>
            {/* Background Elements - Removed floating orbs */}
            <div className="keyareas-background-elements">
                <div className="grid-overlay"></div>
            </div>

            <section className='keyareas-section' ref={sectionRef}>
                <div className='keyareas-container'>
                    {/* Title Section */}
                    <div className='keyareas-header'>
                        <div className="title-decoration">
                            <Sparkles className="sparkle-icon" />
                            <div className="title-line"></div>
                        </div>
                        <h1 className='keyareas-main-title'>
                            {t("key_areas.title")}
                        </h1>
                        <p className="keyareas-subtitle-text">
                        {t("key_areas.title2")}
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className='keyareas-content'>
                        {/* Single Image Container */}
                        <div className='keyareas-visual-container'>
                            <div className='keyareas-single-image'>
                                <div 
                                    className='image-card-large'
                                    ref={(el) => { 
                                        imageRefs.current[0] = el; 
                                    }}
                                >
                                    <div className="image-overlay">
                                        <Zap className="overlay-icon" />
                                        <span className="overlay-text">Laser CO2</span>
                                    </div>
                                    <img src='/IMG_0285.jpg' alt="Advanced laser treatment technology" />
                                    <div className="image-glow"></div>
                                </div>
                            </div>
                        </div>

                        {/* Information Container */}
                        <div className='keyareas-info'>
                            <div className="info-header">
                                <h2 className='info-title'>
                                    {t("key_areas.subtitle")}
                                </h2>
                                <div className="title-underline"></div>
                            </div>
                            
                            <div className="info-content">
                                <div className="info-intro">
                                    <span className="intro-label">
                                        <strong>{t("key_areas.lt_title")}:</strong>
                                    </span>
                                </div>
                                
                                <ul className="keyareas-list">
                                    {keyAreasList.map((item, index) => (
                                        <li key={index} className="keyarea-item" style={{animationDelay: `${index * 0.1}s`}}>
                                            <div className="item-icon-container">
                                                <CheckCircle className="check-icon" />
                                            </div>
                                            <span className="item-text">{item}</span>
                                            <div className="item-hover-effect"></div>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Call to Action */}
                                <div className="keyareas-cta">
                                    <button className="learn-more-btn">
                                        <span className="btn-text">{t("key_areas.btn")}</span>
                                        <div className="btn-glow"></div>
                                        <Zap className="btn-icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KeyAreas;