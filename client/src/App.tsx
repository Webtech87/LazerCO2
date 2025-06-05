// src/App.tsx
import {useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import {HeroSection} from './components/Hero/HeroSection';
import About from "./components/About/About";
import './App.css';
import Benefits from './components/Benefits/Benefits';
import KeyAreas from './components/KeyAreas/KeyAreas';
import Blefaroplastia from "./components/Blefaroplastia/Blefaroplastia.tsx";
import SkinMarks from './components/SkinMarks/SkinMarks.tsx';
import {Followers} from "./components/Followers/Followers.tsx";
import './i18n.js';
import Rejuvenescimento from './components/Rejuvenescimento/Rejuvenescimento.tsx';
import Footer from './components/Footer/Footer.tsx';
import {Route, BrowserRouter, Routes} from "react-router-dom";

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

    return (
        <div className="App">


            <BrowserRouter>
                <Routes>
                    {/* Privacy Policy Route */}
                    <Route path="/" element={
                        <>
                            <Navbar/>
                            <HeroSection className="hero-section"/>
                            <About/>
                            <Benefits/>
                            <KeyAreas/>
                            <Blefaroplastia/>
                            <SkinMarks/>
                            <Rejuvenescimento/>
                            <Followers/>
                            <Footer/>
                        </>

                    }/>

                    <Route path="/politica-privacidade" element={
                        <>
                            <Navbar/>
                            <PrivacyPolicy/>
                            <Footer/>
                        </>
                    }/>

                    {/* Cookies Policy Route */}
                    <Route path="/politica-cookies" element={
                        <>
                            <Navbar/>
                            <CookiesPolicy/>
                            <Footer/>
                        </>
                    }/>

                    {/* Terms & Conditions Route - THIS WAS MISSING! */}
                    <Route path="/termos-condicoes" element={
                        <>
                            <Navbar/>
                            <TermsConditions/>
                            <Footer/>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>

        </div>
    );
};

export default App;