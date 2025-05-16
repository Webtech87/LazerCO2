import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

// Language type
type Language = 'pt' | 'en';

// Nav item interface
interface NavItem {
  id: string;
  label: string;
  href: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'laser', label: 'SOBRE O LASER CO2', href: '#laser-co2' },
    { id: 'benefits', label: 'BENEFÍCIOS', href: '#beneficios' },
    { id: 'zones', label: 'ZONAS DE APLICAÇÃO', href: '#zonas' },
    { id: 'contact', label: 'CONTACTO', href: '#contacto' }
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
    setCurrentLanguage(lang);
  }, []);

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
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="desktop-actions navbar-actions">
            <a href="#contacto" className="contact-button">
              <span className="cta-text">Fale connosco</span>
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
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mobile-actions">
            <a href="#contacto" className="mobile-contact-button" onClick={closeMenu}>
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