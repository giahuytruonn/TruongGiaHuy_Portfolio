import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Studio } from './components/Studio';
import { About } from './components/About';
import { Journal } from './components/Journal';
import { ReachUs } from './components/ReachUs';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll callback
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for the sticky navbar height (around 70-80px)
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Setup intersection observer to highlight the active navbar item during scrolling
  useEffect(() => {
    const sections = ['home', 'studio', 'about', 'journal', 'reach-us'];
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-30% 0px -60% 0px', // trigger when section occupies middle region of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white">
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Sections */}
      <Hero onBeginJourney={() => handleNavigate('studio')} />
      <Studio />
      <About />
      <Journal />
      <ReachUs />
    </div>
  );
}

export default App;
