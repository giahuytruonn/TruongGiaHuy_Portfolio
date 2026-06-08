import React from 'react';
import { VideoBackground } from './VideoBackground';

interface HeroProps {
  onBeginJourney: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBeginJourney }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-white"
    >
      {/* Background Video (z-0) */}
      <VideoBackground />

      {/* Content Container (z-10) */}
      <div 
        className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6"
        style={{ 
          paddingTop: 'calc(8rem - 75px)',
          paddingBottom: '10rem' // pb-40 is 10rem (40 * 0.25rem)
        }}
      >
        {/* Headline */}
        <h1 
          className="font-display text-5xl sm:text-7xl md:text-8xl font-normal text-black max-w-7xl animate-fade-rise"
          style={{ 
            lineHeight: 0.95,
            letterSpacing: '-2.46px'
          }}
        >
          Beyond <span className="italic text-[#6F6F6F]">silence,</span> we build <span className="italic text-[#6F6F6F]">the eternal.</span>
        </h1>

        {/* Description */}
        <p className="font-body text-base sm:text-lg text-[#6F6F6F] max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. 
          Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        {/* CTA Button */}
        <button
          onClick={onBeginJourney}
          className="font-body rounded-full px-14 py-5 text-base bg-black text-white mt-12 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl animate-fade-rise-delay-2"
        >
          Begin Journey
        </button>
      </div>

      {/* Aesthetic Bottom Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-8">
        <button 
          onClick={onBeginJourney}
          className="text-xs tracking-widest text-[#6F6F6F] uppercase hover:text-black transition-colors duration-300 animate-pulse flex flex-col items-center"
        >
          <span>Scroll to Explore</span>
          <svg className="w-4 h-4 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};
