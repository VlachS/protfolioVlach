import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090A0F]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Wordmark */}
          <a
            href="#uvod"
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Šimon Vlach</span>
            <span className="text-purple-400 font-light">/</span>
            <span className="text-xs font-normal text-slate-400 hidden sm:inline">portfolio</span>
          </a>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#o-mne"
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              O mně
            </a>
            <a
              href="#vzdelani-prace"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Vzdělání a práce
            </a>
            <a
              href="#zajmy"
              className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
            >
              Zájmy
            </a>
            <a
              href="#jak-premyslim"
              className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
            >
              Jak přemýšlím
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              aria-label="Přepnout menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-2 border-t border-slate-800 space-y-2 bg-[#090A0F]/95 rounded-xl p-4 backdrop-blur-md">
            <a
              href="#o-mne"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-blue-400"
            >
              O mně (Cheb, INFP, zvířata)
            </a>
            <a
              href="#vzdelani-prace"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-emerald-400"
            >
              Vzdělání a práce
            </a>
            <a
              href="#zajmy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-rose-400"
            >
              Zájmy (Aplikace, Hudba, Knihy)
            </a>
            <a
              href="#jak-premyslim"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-purple-400"
            >
              Jak přemýšlím (Minihra)
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
