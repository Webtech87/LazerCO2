// src/App.tsx
import { useEffect } from 'react';

// Extend the Window interface to include gtag and fbq
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
    }
}
import Navbar from './components/Navbar/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import About from "./components/About/About";
import './App.css';
import Benefits from './components/Benefits/Benefits';
import KeyAreas from './components/KeyAreas/KeyAreas';
import Blefaroplastia from "./components/Blefaroplastia/Blefaroplastia.tsx";
import SkinMarks from './components/SkinMarks/SkinMarks.tsx';
import { Followers } from "./components/Followers/Followers.tsx";
import './i18n.js';
import Rejuvenescimento from './components/Rejuvenescimento/Rejuvenescimento.tsx';
import Footer from './components/Footer/Footer.tsx';
import WhatsAppFloat from './components/WhatsAppFloat';
import type { AnalyticsEvent } from './components/WhatsAppFloat';
import { Route, BrowserRouter, Routes } from "react-router-dom";

/*ROUTES*/
import PrivacyPolicy from "./components/pages/privacy-policy";
import CookiesPolicy from "./components/pages/cookies-policy";
import TermsConditions from "./components/pages/terms-conditions/TermsConditions.tsx";

const App = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const navbar = document.querySelector('.navbar') as HTMLElement;
            if (navbar) {
                if (scrollTop > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Simple analytics handler without external utilities
    const handleWhatsAppAnalytics = (event: AnalyticsEvent) => {
        console.log('📱 WhatsApp Analytics:', event);
        
        // Google Analytics 4 (safe way)
        try {
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', event.action, {
                    event_category: event.category,
                    event_label: event.label,
                    value: event.value,
                });
                console.log('✅ GA4 tracked');
            } else {
                console.log('ℹ️ GA4 not available');
            }
        } catch (error) {
            console.warn('⚠️ GA4 error:', error);
        }
        
        // Facebook Pixel (safe way)
        try {
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Contact', {
                    content_name: 'WhatsApp Button',
                    content_category: 'Contact Form'
                });
                console.log('✅ Facebook Pixel tracked');
            } else {
                console.log('ℹ️ Facebook Pixel not available');
            }
        } catch (error) {
            console.warn('⚠️ Facebook Pixel error:', error);
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Main Home Route */}
                    <Route path="/" element={
                        <>
                            <Navbar />
                            <HeroSection className="hero-section" />
                            <About />
                            <Benefits />
                            <KeyAreas />
                            <Blefaroplastia />
                            <SkinMarks />
                            <Rejuvenescimento />
                            <Followers />
                            <Footer />
                        </>
                    } />

                    {/* Privacy Policy Route */}
                    <Route path="/politica-privacidade" element={
                        <>
                            <Navbar />
                            <PrivacyPolicy />
                            <Footer />
                        </>
                    } />

                    {/* Cookies Policy Route */}
                    <Route path="/politica-cookies" element={
                        <>
                            <Navbar />
                            <CookiesPolicy />
                            <Footer />
                        </>
                    } />

                    {/* Terms & Conditions Route */}
                    <Route path="/termos-condicoes" element={
                        <>
                            <Navbar />
                            <TermsConditions />
                            <Footer />
                        </>
                    } />
                </Routes>

                {/* WhatsApp Floating Button - Available on all pages */}
                <WhatsAppFloat 
                    phoneNumber="351910966393"
                    message="Olá! Gostaria de saber mais sobre os tratamentos da SantiClinic. 💎✨"
                    showBadge={true}
                    badgeText="1"
                    position="bottom-right"
                    size="medium"
                    tooltipText="Fale connosco no WhatsApp"
                    enableAnalytics={true}
                    onAnalyticsEvent={handleWhatsAppAnalytics}
                    className="whatsapp-santiclinic"
                />
            </BrowserRouter>
        </div>
    );
};

export default App;