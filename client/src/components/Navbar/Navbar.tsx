import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

// Language type
type Language = 'pt' | 'en';

// Nav item interface
interface NavItem {
  id: string;
  label: string;
  href: string;
  targetSection: string; // Added for smooth scrolling
}

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');
  const [scrolled, setScrolled] = useState(false);

  // Navigation items with target sections
  const navItems: NavItem[] = [
    { 
      id: 'laser', 
      label: t("navbar_items.lt.0"), 
      href: '#about', 
      targetSection: 'about-section' 
    },
    { 
      id: 'benefits', 
      label: t("navbar_items.lt.1"), 
      href: '#benefits', 
      targetSection: 'benefits-section' 
    },
    { 
      id: 'zones', 
      label: t("navbar_items.lt.2"), 
      href: '#key-areas', 
      targetSection: 'key-areas-section' 
    },
    { 
      id: 'contact', 
      label: t("navbar_items.lt.3"), 
      href: '#footer', 
      targetSection: 'footer-section' 
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // 🚀 NEW: Smooth scroll to section function
  const scrollToSection = useCallback((targetSection: string) => {
    // First try to find by exact ID
    let element = document.getElementById(targetSection);
    
    // If not found, try alternative selectors
    if (!element) {
      const alternatives = {
        'about-section': ['.about-section', '[data-section="about"]', '.about-container'],
        'benefits-section': ['.benefits-section', '[data-section="benefits"]', '.benefits-container'],
        'key-areas-section': ['.key-areas-section', '[data-section="key-areas"]', '.key-areas-container'],
        'footer-section': ['.footer-section', 'footer', '[data-section="footer"]', '.footer-container']
      };
      
      const selectors = alternatives[targetSection as keyof typeof alternatives] || [];
      
      for (const selector of selectors) {
        element = document.querySelector(selector) as HTMLElement;
        if (element) break;
      }
    }
    
    if (element) {
      // Calculate offset for navbar height
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      
      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      console.log(`🎯 Scrolling to section: ${targetSection}`);
    } else {
      console.warn(`⚠️ Could not find section: ${targetSection}`);
      // Fallback: scroll to top if section not found
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle navigation click
  const handleNavClick = useCallback((e: React.MouseEvent, targetSection: string) => {
    e.preventDefault();
    scrollToSection(targetSection);
    closeMenu(); // Close mobile menu if open
  }, [scrollToSection]);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close the menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Change language
  const switchLanguage = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  }, []);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    const phoneNumber = "351915007427";
    const message = "Olá! Gostaria de mais informações sobre os tratamentos com Laser CO₂ da SantiClinic.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('🔗 Redirecting to WhatsApp:', whatsappUrl);
    
    window.open(whatsappUrl, '_blank');
    closeMenu();
  }, [closeMenu]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-background-blur"></div>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">
              <div className="logo-container">
                <span className="logo-text">SANTI<span className="logo-text-highlight">CLINIC</span></span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-links navbar-links">
            <ul>
              {navItems.map(item => (
                <li key={item.id}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.targetSection)}
                    className="nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="desktop-actions navbar-actions">
            <a 
              href="#" 
              className="contact-button"
              onClick={handleWhatsAppRedirect}
              title="Fale conosco no WhatsApp"
            >
              <span className="cta-text">{t("navbar_items.btn")}</span>
              <div className="cta-glow"></div>
            </a>
            <div className="language-selector">
              <button 
                className={currentLanguage === 'pt' ? 'active' : ''} 
                onClick={() => switchLanguage('pt')}
                aria-label="Portuguese language"
              >
                PT
              </button>
              <span className="language-divider">|</span>
              <button 
                className={currentLanguage === 'en' ? 'active' : ''} 
                onClick={() => switchLanguage('en')}
                aria-label="English language"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-container">
          <div className="mobile-menu-header">
            <span className="logo-text">SANTI<span className="logo-text-highlight">CLINIC</span></span>
            <button 
              className="mobile-menu-close" 
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          
          <nav className="mobile-nav">
            <ul>
              {navItems.map(item => (
                <li key={item.id}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.targetSection)}
                    className="mobile-nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mobile-actions">
            <a 
              href="#" 
              className="mobile-contact-button" 
              onClick={handleWhatsAppRedirect}
              title="Fale conosco no WhatsApp"
            >
              <span className="cta-text">Fale connosco</span>
              <div className="cta-glow"></div>
            </a>
            <div className="mobile-language-selector">
              <button 
                className={currentLanguage === 'pt' ? 'active' : ''} 
                onClick={() => switchLanguage('pt')}
                aria-label="Portuguese language"
              >
                PT
              </button>
              <button 
                className={currentLanguage === 'en' ? 'active' : ''} 
                onClick={() => switchLanguage('en')}
                aria-label="English language"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;