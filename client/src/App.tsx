// src/App.tsx
import { useEffect, useState } from 'react';

// Extend the Window interface to include gtag, fbq, and dataLayer
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
        dataLayer?: any[];
        _linkedin_partner_id?: string;
    }
    
    // Declare gtag as a global function
    function gtag(...args: any[]): void;
    
    // Declare dataLayer as global variable
    var dataLayer: any[] | undefined;
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

// 🎬 Import VideoCarousel Component
import VideoCarousel from './components/VideoCarousel/VideoCarousel';

// Import CookiesBanner and utilities
import CookiesBanner from './components/CookiesBanner/CookiesBanner';
import type { CookiePreferences } from './components/CookiesBanner/types';

// Fixed imports - all functions come from cookieManager
import { 
    initializeServices, 
    getCookiePreferences, 
    hasUserMadeCookieChoice,
    // Removed unused initializeAnalytics import
} from './utils/cookieManager';

// Import ContactPopup with explicit path
import ContactPopup from './components/ContactPopup/ContactPopup';
import type { ContactFormData } from './components/ContactPopup/types';

/*ROUTES*/
import PrivacyPolicy from "./components/pages/privacy-policy";
import CookiesPolicy from "./components/pages/cookies-policy";
import TermsConditions from "./components/pages/terms-conditions/TermsConditions.tsx";

const App = () => {
    const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences | null>(null);

    // Initialize services on app load if user has already made a choice
    useEffect(() => {
        if (hasUserMadeCookieChoice('santiclinic')) {
            const preferences = getCookiePreferences('santiclinic');
            if (preferences) {
                console.log('🍪 Initializing services with saved preferences:', preferences);
                initializeServices(preferences);
                setCookiePreferences(preferences);
            }
        }
    }, []);

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

    // Handle cookie acceptance
    const handleCookieAccept = (preferences: CookiePreferences) => {
        console.log('✅ Cookies accepted with preferences:', preferences);
        setCookiePreferences(preferences);
        
        // Initialize services based on user preferences
        initializeServices(preferences);
        
        // Send acceptance event to Google Analytics (if enabled)
        if (preferences.analytics && typeof window !== 'undefined' && window.gtag) {
            try {
                window.gtag('event', 'cookie_consent', {
                    event_category: 'user_interaction',
                    event_label: 'accepted',
                    custom_parameter: JSON.stringify(preferences)
                });
                console.log('✅ Cookie acceptance tracked in GA4');
            } catch (error) {
                console.warn('⚠️ Error tracking cookie acceptance:', error);
            }
        }

        // Send acceptance event to Facebook Pixel (if enabled)
        if (preferences.marketing && typeof window !== 'undefined' && window.fbq) {
            try {
                window.fbq('track', 'CustomizeProduct', {
                    content_name: 'Cookie Preferences',
                    content_category: 'Privacy Settings'
                });
                console.log('✅ Cookie acceptance tracked in Facebook Pixel');
            } catch (error) {
                console.warn('⚠️ Error tracking cookie acceptance in Facebook:', error);
            }
        }
    };

    // Handle cookie rejection
    const handleCookieReject = () => {
        console.log('❌ Optional cookies rejected');
        
        // Only initialize necessary services
        const rejectedPreferences: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            personalization: false
        };
        
        setCookiePreferences(rejectedPreferences);
        initializeServices(rejectedPreferences);
        
        // Log rejection without using tracking cookies
        console.log('🔒 Only necessary cookies will be used');
    };

    // Handle contact form submission
    const handleContactSubmit = async (formData: ContactFormData) => {
        console.log('📧 Contact form submitted:', formData);
        
        try {
            // Here you would typically send the data to your backend
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
            
            // For demo purposes, we'll just log it
            console.log('📤 Sending contact form data to server...');
            console.log({
                nome: formData.nome,
                telefone: formData.telefone,
                email: formData.email,
                assunto: formData.assunto,
                mensagem: formData.mensagem,
                timestamp: new Date().toISOString()
            });
            
            // Track form submission if analytics are enabled
            if (cookiePreferences?.analytics && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'form_submit', {
                    form_name: 'contact_popup',
                    form_subject: formData.assunto
                });
            }
            
            console.log('✅ Contact form submitted successfully!');
        } catch (error) {
            console.error('❌ Error submitting contact form:', error);
            throw error; // Re-throw to show error in UI
        }
    };

    // Handle contact popup close
    const handleContactClose = () => {
        console.log('📝 Contact popup closed');
    };

    // Enhanced WhatsApp analytics handler that respects cookie preferences
    const handleWhatsAppAnalytics = (event: AnalyticsEvent) => {
        console.log('📱 WhatsApp Analytics Event:', event);
        
        // Get current cookie preferences
        const preferences = getCookiePreferences('santiclinic') || cookiePreferences;
        
        // Only track if user has accepted analytics cookies
        if (preferences?.analytics) {
            // Google Analytics 4 (safe way)
            try {
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', event.action, {
                        event_category: event.category,
                        event_label: event.label,
                        value: event.value,
                        custom_parameter_1: 'whatsapp_interaction'
                    });
                    console.log('✅ GA4 WhatsApp event tracked');
                } else {
                    console.log('ℹ️ GA4 not available');
                }
            } catch (error) {
                console.warn('⚠️ GA4 WhatsApp tracking error:', error);
            }
        } else {
            console.log('🍪 Analytics cookies not accepted - WhatsApp event not tracked');
        }
        
        // Only track marketing events if user accepted marketing cookies
        if (preferences?.marketing) {
            // Facebook Pixel (safe way)
            try {
                if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'Contact', {
                        content_name: 'WhatsApp Button',
                        content_category: 'Contact Form',
                        content_source: 'floating_button'
                    });
                    console.log('✅ Facebook Pixel WhatsApp event tracked');
                } else {
                    console.log('ℹ️ Facebook Pixel not available');
                }
            } catch (error) {
                console.warn('⚠️ Facebook Pixel WhatsApp tracking error:', error);
            }
        } else {
            console.log('🍪 Marketing cookies not accepted - Facebook event not tracked');
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
                            {/* 🎬 VIDEO CAROUSEL SECTION - Perfectly positioned */}
                            <VideoCarousel 
                                className="santiclinic-video-section"
                                autoPlayInterval={6000}
                                enableAutoPlay={true}
                                showThumbnails={true}
                                showProgressDots={true}
                            />
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
                    showBadge={false}
                    badgeText="1"
                    position="bottom-right"
                    size="medium"
                    tooltipText="Fale connosco no WhatsApp"
                    enableAnalytics={true}
                    onAnalyticsEvent={handleWhatsAppAnalytics}
                    className="whatsapp-santiclinic"
                />

                {/* Futuristic Cookies Banner */}
                <CookiesBanner
                    companyName="SantiClinic"
                    privacyPolicyUrl="/politica-privacidade"
                    onAccept={handleCookieAccept}
                    onReject={handleCookieReject}
                    customMessage="Na SantiClinic, utilizamos cookies essenciais e tecnologias avançadas para personalizar sua experiência, analisar nosso desempenho e oferecer conteúdo relevante sobre nossos tratamentos de laser CO₂ e rejuvenescimento facial."
                />

                {/* Contact Popup - appears after 15 seconds on home page only */}
                <ContactPopup
                    companyName="SantiClinic"
                    onSubmit={handleContactSubmit}
                    onClose={handleContactClose}
                    showDelay={15000}
                />
            </BrowserRouter>
        </div>
    );
};

export default App;