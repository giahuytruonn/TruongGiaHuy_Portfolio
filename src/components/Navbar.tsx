import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Studio', id: 'studio' },
    { name: 'About', id: 'about' },
    { name: 'Journal', id: 'journal' },
    { name: 'Reach Us', id: 'reach-us' },
  ];

  const handleClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => handleClick('home')} 
          className="font-display text-3xl tracking-tight text-black flex items-start focus:outline-none"
        >
          Gia Huy<sup className="text-xs font-sans align-super top-[-0.5em]">®</sup>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-sm font-body transition-colors hover:text-black focus:outline-none ${
                  item.id === 'home' || isActive
                    ? 'text-black font-medium'
                    : 'text-[#6F6F6F]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleClick('reach-us')}
            className="rounded-full px-6 py-2.5 text-sm font-body bg-black text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            Begin Journey
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:text-gray-600 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 px-8 py-6 flex flex-col space-y-4 shadow-lg animate-fade-rise duration-200">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-left text-base font-body py-2 border-b border-gray-50 focus:outline-none ${
                  item.id === 'home' || isActive ? 'text-black font-semibold' : 'text-[#6F6F6F]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
          <button
            onClick={() => handleClick('reach-us')}
            className="w-full text-center rounded-full py-3 bg-black text-white font-body text-sm transition-transform active:scale-95"
          >
            Begin Journey
          </button>
        </div>
      )}
    </nav>
  );
};
