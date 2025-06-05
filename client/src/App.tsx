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
            <Navbar/>
            <HeroSection className="hero-section"/>
            <About/>
            <Benefits/>
            <KeyAreas/>
            <Blefaroplastia/>
            <SkinMarks/>
            <Followers/>
            <Rejuvenescimento />
            <Footer />
        </div>
    );
};

export default App;