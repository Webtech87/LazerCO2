// src/components/CookiesBanner/CookiesBanner.tsx
import React, { useState, useEffect } from 'react';
import type { CookiePreferences, CookiesBannerProps } from './types';
import './CookiesBanner.css';
import {useTranslation} from "react-i18next";

const CookiesBanner: React.FC<CookiesBannerProps> = ({

  companyName = "SantiClinic",
  privacyPolicyUrl = "/privacy-policy",
  onAccept,
  onReject,
  customMessage
}) => {
  
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem(`${companyName.toLowerCase()}-cookie-choice`);
    if (!cookieChoice) {
      // Delay showing banner for smooth page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [companyName]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setPreferences(allAccepted);
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-choice`, 'accepted');
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-preferences`, JSON.stringify(allAccepted));
    
    if (onAccept) onAccept(allAccepted);
    
    setIsAccepted(true);
    setTimeout(() => setIsVisible(false), 500);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setPreferences(rejected);
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-choice`, 'rejected');
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-preferences`, JSON.stringify(rejected));
    
    if (onReject) onReject();
    
    setIsAccepted(true);
    setTimeout(() => setIsVisible(false), 500);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-choice`, 'custom');
    localStorage.setItem(`${companyName.toLowerCase()}-cookie-preferences`, JSON.stringify(preferences));
    
    if (onAccept) onAccept(preferences);
    
    setIsAccepted(true);
    setShowSettings(false);
    setTimeout(() => setIsVisible(false), 500);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: t("cookie_ban.2.types.part1"),
      description: t("cookie_ban.2.types.part2"),
      required: true
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: t("cookie_ban.2.types.part3"),
      description: t("cookie_ban.2.types.part4"),
      required: false
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: t("cookie_ban.2.types.part5"),
      description: t("cookie_ban.2.types.part6"),
      required: false
    },
    {
      key: 'personalization' as keyof CookiePreferences,
      title: t("cookie_ban.2.types.part7"),
      description: t("cookie_ban.2.types.part8"),
      required: false
    }
  ];

  if (!isVisible) return null;



  return (
    <div className={`cookies-overlay ${isAccepted ? 'fade-out' : ''}`}>
      <div className={`cookies-banner ${showSettings ? 'expanded' : ''}`}>
        {/* Animated Background Effects */}
        <div className="banner-bg-effects">
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`} />
            ))}
          </div>
          <div className="grid-pattern" />
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
        </div>

        {/* Main Content */}
        <div className="banner-content">
          {!showSettings ? (
            <>
              {/* Header */}
              <div className="banner-header">
                <div className="icon-container">
                  <svg className="cookie-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <div className="pulse-ring" />
                </div>
                <div className="header-text">
                  <h3>{t("cookie_ban.1.title.part1")}</h3>
                  <div className="subtitle">{t("cookie_ban.1.title.part2")}</div>
                </div>
              </div>

              {/* Description */}
              <div className="banner-description">
                <p>
                  {t("cookie_ban.1.title.part3", {companyName})}
                </p>
                
                <div className="features-list">
                  <div className="feature">
                    <div className="feature-icon">🔒</div>
                    <span>{t("cookie_ban.1.footer.part1")}</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">⚡</div>
                    <span>{t("cookie_ban.1.footer.part2")}</span>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">🎯</div>
                    <span>{t("cookie_ban.1.footer.part3")}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="banner-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleAcceptAll}
                  aria-label="Aceitar todos os cookies"
                >
                  <span>{t("cookie_ban.1.btns.part1")}</span>
                  <div className="btn-glow" />
                </button>
                
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowSettings(true)}
                  aria-label="Personalizar configurações de cookies"
                >
                  <span>{t("cookie_ban.1.btns.part2")}</span>
                </button>
                
                <button 
                  className="btn btn-ghost"
                  onClick={handleRejectAll}
                  aria-label="Rejeitar cookies opcionais"
                >
                  {t("cookie_ban.1.btns.part3")}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Settings Panel */}
              <div className="settings-header">
                <button 
                  className="back-btn"
                  onClick={() => setShowSettings(false)}
                  aria-label="Voltar para página anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div>
                  <h3>{t("cookie_ban.2.head.part1")}</h3>
                  <p>{t("cookie_ban.2.head.part2")} {companyName}</p>
                </div>
              </div>

              <div className="settings-content" role="group" aria-labelledby="cookie-preferences">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.key} className="cookie-setting">
                    <div className="setting-info">
                      <h4>{cookie.title}</h4>
                      <p>{cookie.description}</p>
                      {cookie.required && <span className="required-badge">{t("cookie_ban.2.types.subt")}</span>}
                    </div>
                    <div className="toggle-container">
                      <label className={`toggle ${preferences[cookie.key] ? 'active' : ''} ${cookie.required ? 'disabled' : ''}`}>
                        <input
                          type="checkbox"
                          checked={preferences[cookie.key]}
                          onChange={() => togglePreference(cookie.key)}
                          disabled={cookie.required}
                          aria-label={`${cookie.title} - ${cookie.required ? 'obrigatório' : 'opcional'}`}
                        />
                        <span className="toggle-slider">
                          <span className="toggle-thumb" />
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="settings-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleSavePreferences}
                  aria-label="Salvar preferências de cookies"
                >
                  <span>{t("cookie_ban.2.btn")}</span>
                  <div className="btn-glow" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Privacy Link */}
        <div className="privacy-link">
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
            </svg>
            {t("cookie_ban.2.types.subt2")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;