
import React, { useState } from 'react';
import { PageView } from '../App';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { name: string; id: PageView }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About Us', id: 'about' },
  ];

  const handleNavClick = (id: PageView) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-md border-b border-slate-100 transition-all duration-300 h-20 md:h-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex justify-between items-center relative">
        {/* Logo Section */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 focus:outline-none group relative h-full py-4 z-[210]"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-phoenix-accent rounded-lg flex items-center justify-center shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter uppercase text-slate-900">PHOENIX</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`font-bold text-xs uppercase tracking-[0.2em] transition-all hover:text-phoenix-accent ${activePage === link.id ? 'text-phoenix-accent' : 'text-slate-600'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('book')}
            className="bg-slate-900 hover:bg-phoenix-accent text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg transition-all transform hover:scale-105"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Toggle - Enhanced Visibility */}
        <button 
          className="lg:hidden p-3 rounded-xl bg-slate-900 text-white hover:bg-phoenix-accent transition-all focus:outline-none z-[210] shadow-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5 w-6">
            <div className={`h-0.5 w-full transition-all duration-300 bg-current ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`h-0.5 w-full transition-all duration-300 bg-current ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`h-0.5 w-full transition-all duration-300 bg-current ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Universal Mobile Menu Overlay: SOLID WHITE Background */}
      <div className={`fixed inset-0 bg-white z-[200] transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 items-center text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6">Service Menu</span>
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`text-xl md:text-2xl font-bold tracking-widest transition-all uppercase text-phoenix-accent hover:scale-110 active:scale-95 ${activePage === link.id ? 'border-b-2 border-phoenix-accent pb-1' : ''}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('book')}
            className="mt-12 bg-slate-900 text-white px-12 py-5 rounded-full text-lg font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform uppercase tracking-widest"
          >
            Reservation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-20 border-t border-slate-100 pt-10 px-6 w-full max-w-xs text-center">
          <p className="font-black text-slate-300 mb-2 uppercase tracking-[0.2em] text-[10px]">Concierge Access</p>
          <a href="mailto:Stevenalexander.cohen@mail.com" className="text-xs font-bold text-slate-400 hover:text-phoenix-accent transition-colors break-all block">Stevenalexander.cohen@mail.com</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
