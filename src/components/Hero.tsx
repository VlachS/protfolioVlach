import React, { useState, useEffect, useRef } from 'react';
import { 
  User,
  GraduationCap, 
  Brain, 
  Upload, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { GiraffePeeker } from './GiraffePeeker';

export const Hero: React.FC = () => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Restore uploaded photo if user saved one
  useEffect(() => {
    try {
      const saved = localStorage.getItem('simon_custom_photo');
      if (saved) {
        setCustomPhotoUrl(saved);
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomPhotoUrl(result);
        try {
          localStorage.setItem('simon_custom_photo', result);
        } catch {
          // If storage quota exceeded
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setCustomPhotoUrl(null);
    try {
      localStorage.removeItem('simon_custom_photo');
    } catch {
      // Ignore
    }
  };

  return (
    <section id="uvod" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-950/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Main Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Ambient status / metadata */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 bg-[#121622] border border-slate-800 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Informační studia FF MUNI</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Výkupař Restorio.cz</span>
            </div>

            {/* Exact required heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Zdravím, jmenuji se <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Šimon Vlach</span>
            </h1>

            {/* Exact required subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              Toto je portfolio o mně.. Jestli se chcete dozvědět více, klikněte na odkazy dole a doufám, že se Vám web bude líbit
            </p>

            {/* Links requested in prompt */}
            <div className="pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Kam chcete pokračovat?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
                <a
                  href="#o-mne"
                  className="group p-3.5 rounded-xl bg-[#0F131D] border border-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-2.5 group-hover:scale-105 transition-transform">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white group-hover:text-purple-300">
                      O mně
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      21 let · Cheb ➔ Brno · INFP · Zvířata
                    </span>
                  </div>
                </a>

                <a
                  href="#vzdelani-prace"
                  className="group p-3.5 rounded-xl bg-[#0F131D] border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-2.5 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white group-hover:text-blue-300">
                      Vzdělání a práce
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      FF MUNI · Restorio výkup & EAN kódy
                    </span>
                  </div>
                </a>

                <a
                  href="#zajmy"
                  className="group p-3.5 rounded-xl bg-[#0F131D] border border-slate-800 hover:border-rose-500/50 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-2.5 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white group-hover:text-rose-300">
                      Zájmy
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Top aplikace · Taylor Swift · Knihy
                    </span>
                  </div>
                </a>

                <a
                  href="#jak-premyslim"
                  className="group p-3.5 rounded-xl bg-[#0F131D] border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-2.5 group-hover:scale-105 transition-transform">
                    <Brain className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white group-hover:text-emerald-300">
                      Jak přemýšlím
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                      Minihra: Myšlenka v kolejích bludiště
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Photo Frame with Peeking Giraffe */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-12 sm:pt-16">
            <div className="relative w-72 sm:w-80 md:w-88">
              {/* THE GIRAFFE PEEKING OUT FROM BEHIND THE PHOTO CARD */}
              <GiraffePeeker />

              {/* The Photo Container / Frame */}
              <div className="relative z-10 bg-[#0E121C] border border-slate-800 rounded-2xl p-4 shadow-2xl shadow-black/80 backdrop-blur-sm">
                {/* Photo Display Area */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#141824] border border-slate-700/60 flex items-center justify-center group">
                  {customPhotoUrl ? (
                    <img
                      src={customPhotoUrl}
                      alt="Šimon Vlach"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Default stylized blond portrait illustration placeholder */
                    <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-b from-[#171D2B] to-[#0D111A] p-6 text-center">
                      <div className="w-28 h-28 rounded-full bg-[#1F273B] border-2 border-purple-500/40 p-1 mb-4 relative shadow-lg">
                        <svg
                          viewBox="0 0 100 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full rounded-full"
                        >
                          <circle cx="50" cy="50" r="48" fill="#151A27" />
                          <path
                            d="M26 44 C24 24, 42 12, 60 12 C78 12, 82 26, 80 44 C74 40, 68 38, 62 40 C56 32, 48 30, 38 34 C32 36, 28 40, 26 44 Z"
                            fill="#FCD34D"
                          />
                          <path
                            d="M38 18 C50 16, 68 20, 72 32 C64 26, 54 24, 42 26 Z"
                            fill="#FDE68A"
                          />
                          <path
                            d="M32 42 C32 35, 68 35, 68 42 C68 56, 62 70, 50 70 C38 70, 32 56, 32 42 Z"
                            fill="#E2E8F0"
                          />
                          <circle cx="43" cy="48" r="2.5" fill="#3B82F6" />
                          <circle cx="57" cy="48" r="2.5" fill="#3B82F6" />
                          <path
                            d="M45 58 Q50 62 55 58"
                            stroke="#334155"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M20 95 C20 78, 35 72, 50 72 C65 72, 80 78, 80 95 Z"
                            fill="#0F172A"
                          />
                        </svg>

                        <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0E121C] flex items-center justify-center text-white text-[10px]">
                          ✓
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        Místo pro Šimonovu fotku
                      </span>
                      <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                        „Fotku dodám později — nebo ji můžete nahrát přímo tady tlačítkem níže.“
                      </p>
                    </div>
                  )}

                  {/* Top-right delete button if custom photo uploaded */}
                  {customPhotoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs border border-slate-700 transition-colors"
                      title="Obnovit výchozí ilustraci"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Photo frame footer & upload button */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-slate-300 font-medium">Šimon Vlach</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 transition-colors font-medium bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 px-2 py-1 rounded-md"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{customPhotoUrl ? 'Změnit fotku' : 'Nahrát fotku'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
