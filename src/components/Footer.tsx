import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080C] border-t border-slate-800/80 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight">
              Šimon Vlach
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Student Informačních studií a knihovnictví FF MUNI · Výkupař Restorio.cz
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#uvod" className="hover:text-white transition-colors">
              Úvod
            </a>
            <a href="#o-mne" className="hover:text-purple-400 transition-colors">
              O mně
            </a>
            <a href="#vzdelani-prace" className="hover:text-blue-400 transition-colors">
              Vzdělání a práce
            </a>
            <a href="#jak-premyslim" className="hover:text-emerald-400 transition-colors">
              Jak přemýšlím
            </a>
            <a
              href="https://www.restorio.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Restorio.cz</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <span className="text-xs text-slate-400 block">
              © {new Date().getFullYear()} Šimon Vlach
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
