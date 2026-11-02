import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Bus, 
  Upload, 
  X, 
  BookOpen, 
  Heart, 
  Compass, 
  CheckCircle2,
  Music,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutMe: React.FC = () => {
  // State for cat and dog photo uploads with localStorage persistence
  const [catPhoto, setCatPhoto] = useState<string | null>(null);
  const [dogPhoto, setDogPhoto] = useState<string | null>(null);

  // Hover states for hearts animation
  const [isCatHovered, setIsCatHovered] = useState<boolean>(false);
  const [isDogHovered, setIsDogHovered] = useState<boolean>(false);

  // Active step along travel route (0 = Cheb, 1 = Karlovy Vary, 2 = Praha přestup, 3 = Brno)
  const [activeStation, setActiveStation] = useState<number>(0);
  const [isBusAnimating, setIsBusAnimating] = useState<boolean>(true);

  // Interactive animal window states
  const [isGiraffeEating, setIsGiraffeEating] = useState<boolean>(false);
  const [isElephantActive, setIsElephantActive] = useState<boolean>(false);

  const catFileInputRef = useRef<HTMLInputElement>(null);
  const dogFileInputRef = useRef<HTMLInputElement>(null);
  const giraffeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elephantTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load photos from localStorage on mount
  useEffect(() => {
    const savedCat = localStorage.getItem('simon_cat_photo');
    if (savedCat) setCatPhoto(savedCat);

    const savedDog = localStorage.getItem('simon_dog_photo');
    if (savedDog) setDogPhoto(savedDog);
  }, []);

  // Web Audio sound synthesizer for Elephant Trumpet
  const playElephantTrumpet = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      // Trumpet fanfare envelope: pitch sweep from 220Hz -> 480Hz -> 440Hz -> 530Hz
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(460, now + 0.12);
      osc1.frequency.linearRampToValueAtTime(440, now + 0.3);
      osc1.frequency.exponentialRampToValueAtTime(530, now + 0.46);

      osc2.frequency.setValueAtTime(222, now);
      osc2.frequency.exponentialRampToValueAtTime(464, now + 0.12);
      osc2.frequency.linearRampToValueAtTime(444, now + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(534, now + 0.46);

      // Brass bandpass filter
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.15);
      filter.Q.value = 2.4;

      // Trumpet volume envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.09, now + 0.35);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.46);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.74);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.75);
      osc2.stop(now + 0.75);
    } catch {
      // Audio might be blocked before first interaction
    }
  }, []);

  // Web Audio sound synthesizer for Giraffe Leaf Crunch
  const playLeafCrunch = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Soft rustling noise
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio blocked fallback
    }
  }, []);

  const handleGiraffeInteraction = () => {
    setIsGiraffeEating(true);
    playLeafCrunch();
    if (giraffeTimerRef.current) clearTimeout(giraffeTimerRef.current);
    giraffeTimerRef.current = setTimeout(() => {
      setIsGiraffeEating(false);
    }, 2800);
  };

  const handleElephantInteraction = () => {
    setIsElephantActive(true);
    playElephantTrumpet();
    if (elephantTimerRef.current) clearTimeout(elephantTimerRef.current);
    elephantTimerRef.current = setTimeout(() => {
      setIsElephantActive(false);
    }, 2600);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, petType: 'cat' | 'dog') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (petType === 'cat') {
        setCatPhoto(result);
        localStorage.setItem('simon_cat_photo', result);
      } else {
        setDogPhoto(result);
        localStorage.setItem('simon_dog_photo', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (petType: 'cat' | 'dog', e: React.MouseEvent) => {
    e.stopPropagation();
    if (petType === 'cat') {
      setCatPhoto(null);
      localStorage.removeItem('simon_cat_photo');
      if (catFileInputRef.current) catFileInputRef.current.value = '';
    } else {
      setDogPhoto(null);
      localStorage.removeItem('simon_dog_photo');
      if (dogFileInputRef.current) dogFileInputRef.current.value = '';
    }
  };

  // Stations along the FlixBus journey: Cheb -> Karlovy Vary -> Praha (přestup) -> Brno
  const stations = [
    {
      id: 0,
      name: 'Cheb',
      subtitle: 'Domov & výchozí bod',
      desc: 'Rodné město v západních Čechách. Odtud začíná každá cesta autobusem FlixBus směrem na Moravu.',
      coords: { x: 70, y: 198 },
      tag: '0 km • Start',
      type: 'start'
    },
    {
      id: 1,
      name: 'Karlovy Vary',
      subtitle: 'Tranzitní zastávka FlixBusu',
      desc: 'Přímá linka FlixBus z Chebu vede malebným údolím Ohře přes Vary dále do vnitrozemí.',
      coords: { x: 135, y: 165 },
      tag: '50 km • Vary',
      type: 'stop'
    },
    {
      id: 2,
      name: 'Praha (ÚAN Florenc)',
      subtitle: 'Klíčový přestupní uzel',
      desc: 'Centrální přestupní stanice pro dálkové linky. Zde probíhá přestup na navazující spoj po D1 do Brna.',
      coords: { x: 260, y: 195 },
      tag: '175 km • Přestup',
      type: 'transfer'
    },
    {
      id: 3,
      name: 'Brno (Zvonařka / Grand)',
      subtitle: 'Studentský cíl & Masarykova univerzita',
      desc: 'Moravská metropole, kde studuji Informační studia a knihovnictví na Filozofické fakultě MUNI.',
      coords: { x: 440, y: 315 },
      tag: '380 km • Cíl',
      type: 'destination'
    }
  ];

  return (
    <section id="o-mne" className="py-20 bg-[#0B0E17] relative border-b border-slate-800/80">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-medium mb-4">
            <User className="w-3.5 h-3.5" />
            <span>Osobní profil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kdo jsem a co mě formuje
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Je mi <span className="text-white font-semibold">21 let</span>, pocházím z{' '}
            <span className="text-purple-400 font-semibold">Chebu</span> a studuji v Brně. 
            Mým světem je klidné přemýšlení a{' '}
            <span className="text-rose-300 font-medium">hudba a čtení jsou pro mě v životě strašně důležité</span>.
          </p>
        </div>

        {/* BENTO GRID OF PERSONAL TRAITS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 1. TRAVEL ROUTE MAP: CHEB -> VARY -> PRAHA (PŘESTUP) -> BRNO (Lg: 7 cols) */}
          <div className="lg:col-span-7 bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <Bus className="w-4 h-4 text-emerald-400" />
                  <span>Moje cesta do Brna</span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  FlixBus přes Vary (tam i zpět)
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Z Chebu do Brna s přestupem v Praze
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Moje pravidelná trasa mezi domovem v Chebu a studiem v Brně. Z Chebu jezdím FlixBusem 
                přes Karlovy Vary do Prahy na přestup a odtud dálkovým autobusem po D1 do Brna. 
                A to samé zase zpátky domů.
              </p>

              {/* INTERACTIVE ROUTE MAP SVG */}
              <div className="relative w-full aspect-[16/10] bg-[#07090F] border border-slate-800 rounded-xl overflow-hidden p-3 sm:p-4 mb-6">
                {/* Subtle map grid texture */}
                <div 
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                <svg 
                  viewBox="0 0 520 380" 
                  className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <defs>
                    <linearGradient id="flixbusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="45%" stopColor="#34D399" />
                      <stop offset="60%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>

                    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Stylized border contour of Czech Republic */}
                  <path
                    d="M 60 170 
                       C 75 140, 110 135, 140 145 
                       C 170 135, 205 110, 240 105 
                       C 275 100, 310 115, 340 130 
                       C 375 130, 410 160, 435 180 
                       C 465 195, 490 230, 480 260 
                       C 465 290, 440 320, 400 340 
                       C 360 360, 320 345, 280 340 
                       C 240 345, 200 355, 160 330 
                       C 130 310, 100 290, 80 260 
                       C 60 230, 50 200, 60 170 Z"
                    fill="#0F1422"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="opacity-70"
                  />

                  {/* Route corridor glow behind lines */}
                  <path
                    d="M 70 198 Q 100 178, 135 165 T 260 195 T 440 315"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeOpacity="0.12"
                    strokeLinecap="round"
                  />

                  {/* LEG 1: Cheb -> Karlovy Vary (FlixBus green line) */}
                  <path
                    d="M 70 198 Q 100 178, 135 165"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* LEG 2: Karlovy Vary -> Praha (FlixBus green line) */}
                  <path
                    d="M 135 165 C 175 155, 215 175, 260 195"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* LEG 3: Praha -> Brno (Transfer route purple/blue line) */}
                  <path
                    d="M 260 195 C 320 230, 380 270, 440 315"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                  />

                  {/* ANIMATED FLIXBUS TRAVELING ALONG THE ROUTE */}
                  {isBusAnimating && (
                    <motion.g
                      animate={{
                        offsetDistance: ['0%', '100%']
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      style={{
                        offsetPath: "path('M 70 198 Q 100 178, 135 165 C 175 155, 215 175, 260 195 C 320 230, 380 270, 440 315')"
                      }}
                    >
                      <circle r="6" fill="#10B981" filter="url(#glowGreen)" />
                      <circle r="3" fill="#FFFFFF" />
                    </motion.g>
                  )}

                  {/* STATIONS / CITIES */}
                  {stations.map((st) => {
                    const isSelected = activeStation === st.id;
                    return (
                      <g
                        key={st.id}
                        className="cursor-pointer transition-transform"
                        onClick={() => setActiveStation(st.id)}
                      >
                        {/* Outer pulsing ring for selected or transfer */}
                        {isSelected && (
                          <motion.circle
                            cx={st.coords.x}
                            cy={st.coords.y}
                            r="14"
                            fill="none"
                            stroke={st.type === 'transfer' ? '#A855F7' : '#10B981'}
                            strokeWidth="1.5"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* Station marker circle */}
                        <circle
                          cx={st.coords.x}
                          cy={st.coords.y}
                          r={st.type === 'transfer' ? '7' : '6'}
                          fill={st.type === 'transfer' ? '#A855F7' : isSelected ? '#10B981' : '#334155'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />

                        {/* Label */}
                        <text
                          x={st.coords.x}
                          y={st.coords.y - 12}
                          textAnchor={st.id === 0 ? 'start' : st.id === 3 ? 'end' : 'middle'}
                          fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                          fontSize="11"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="select-none tracking-tight"
                        >
                          {st.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend overlay */}
                <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 flex items-center gap-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2.5 h-1 bg-emerald-500 rounded-full" /> FlixBus přes Vary
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-400 font-medium">
                    <span className="w-2.5 h-1 bg-purple-500 rounded-full" /> Přestup v Praze
                  </span>
                </div>
              </div>

              {/* Station Detail Selector Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stations.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setActiveStation(st.id)}
                    className={`text-left p-2.5 rounded-xl border transition-all ${
                      activeStation === st.id
                        ? 'bg-purple-950/40 border-purple-500/80 text-white shadow-sm'
                        : 'bg-[#131724] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] font-semibold text-emerald-400 mb-0.5">
                      {st.tag}
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {st.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active station description */}
            <div className="mt-4 p-3 rounded-xl bg-[#131724] border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white mr-1.5">
                  {stations[activeStation].name}:
                </span>
                <span>{stations[activeStation].desc}</span>
              </div>
            </div>
          </div>

          {/* 2. PERSONALITY TYPE: INFP & INTROVERT (Lg: 5 cols) */}
          <div className="lg:col-span-5 bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Osobnostní profil</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-700/50 text-purple-300 text-xs font-bold">
                  INFP • Introvert
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Osobnostní typ INFP
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Osobnostní typ INFP (označovaný jako „Zprostředkovatel“ či „Idealista“) se vyznačuje 
                hlubokým vnitřním světem, empatií a silnými osobními hodnotami. Lidé tohoto typu 
                bývají tiší, přemýšliví a hledají v činnostech smysl a autenticitu.
              </p>

              {/* 4 LETTERS OF INFP EXPLAINED OBJECTIVELY (3rd person, general) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#131724] border border-slate-800">
                  <div className="text-base font-extrabold text-purple-400">I • Introvert</div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Čerpání energie z klidu, samoty a vlastního vnitřního světa myšlenek.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131724] border border-slate-800">
                  <div className="text-base font-extrabold text-blue-400">N • Intuice</div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Vnímání souvislostí, skrytých vzorů, metafor a budoucích možností.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131724] border border-slate-800">
                  <div className="text-base font-extrabold text-emerald-400">F • Cítění</div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Rozhodování podle vnitřních hodnot, lidského přístupu a harmonie.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#131724] border border-slate-800">
                  <div className="text-base font-extrabold text-amber-400">P • Vnímání</div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Otevřenost novým vjemům, flexibilita a nechuť k rigidním škatulkám.
                  </div>
                </div>
              </div>
            </div>

            {/* Introvert Summary Badge */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs text-purple-200/90 leading-relaxed">
              <span className="font-semibold text-white">Přirozenost introverze:</span>{' '}
              Klidný pracovní prostor, samostatnost při třídění informací a možnost soustředit se do hloubky bez zbytečného spěchu.
            </div>
          </div>

          {/* 3. FAVORITE ANIMALS: GIRAFFE & ELEPHANT (PEEKING WINDOWS) (Lg: 5 cols) */}
          <div className="lg:col-span-5 bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span>Oblíbená zvířata</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Žirafa & Slon
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Mé oblíbená zvířata jsou žirafa a slon (které i svou postavou připomínám).
              </p>

              {/* TWO INTERACTIVE PEEKING WINDOWS (OKÉNKA) FOR GIRAFFE AND ELEPHANT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. PRETTIER GIRAFFE PEEKING WINDOW - EATS LEAVES FROM BRANCH (NO SPEECH BUBBLE, NO TONGUE, CLEAN HOVER) */}
                <div 
                  className="group rounded-2xl bg-[#090C14] border border-slate-800 p-3 hover:border-amber-500/50 transition-all flex flex-col items-center cursor-pointer select-none"
                  onMouseEnter={handleGiraffeInteraction}
                  onClick={handleGiraffeInteraction}
                >
                  <div className="w-full relative aspect-[4/3] rounded-xl bg-gradient-to-b from-[#121828] via-[#0E1320] to-[#080B12] border border-slate-800/90 overflow-hidden flex items-end justify-center">
                    {/* Window frame rim */}
                    <div className="absolute inset-0 border-2 border-slate-800/70 rounded-xl pointer-events-none z-20" />
                    
                    {/* Ambient warm lighting */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                    {/* SVG STAGE: Leafy branch + Gorgeous Pretty Giraffe */}
                    <svg
                      viewBox="0 0 180 200"
                      className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                    >
                      {/* ACACIA TREE BRANCH EXTENDING FROM TOP RIGHT */}
                      <motion.g
                        animate={{
                          rotate: isGiraffeEating ? [-2, -8, -4, -7, -2] : [0, 1.5, 0],
                          y: isGiraffeEating ? [0, 4, 1, 3, 0] : 0
                        }}
                        transition={{ duration: isGiraffeEating ? 1.4 : 3.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: '180px 15px' }}
                      >
                        {/* Wooden twig */}
                        <path
                          d="M 180 20 C 160 25, 140 35, 115 48 C 105 52, 92 60, 85 68"
                          stroke="#78350F"
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M 140 35 C 130 48, 120 52, 112 55"
                          stroke="#78350F"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />

                        {/* Lush Green Leaves on Branch */}
                        <ellipse cx="85" cy="66" rx="8" ry="4.5" fill="#22C55E" transform="rotate(-30 85 66)" />
                        <ellipse cx="82" cy="73" rx="7" ry="4" fill="#16A34A" transform="rotate(25 82 73)" />
                        <ellipse cx="94" cy="62" rx="7.5" ry="4" fill="#4ADE80" transform="rotate(-15 94 62)" />

                        <ellipse cx="112" cy="54" rx="8" ry="4.5" fill="#16A34A" transform="rotate(40 112 54)" />
                        <ellipse cx="118" cy="46" rx="7" ry="4" fill="#22C55E" transform="rotate(-20 118 46)" />
                        <ellipse cx="106" cy="60" rx="6.5" ry="3.5" fill="#4ADE80" transform="rotate(10 106 60)" />

                        <ellipse cx="138" cy="38" rx="8" ry="4.5" fill="#22C55E" transform="rotate(-40 138 38)" />
                        <ellipse cx="144" cy="46" rx="7" ry="4" fill="#15803D" transform="rotate(30 144 46)" />
                      </motion.g>

                      {/* FALLING LEAF BITS WHEN CHEWING */}
                      {isGiraffeEating && (
                        <g>
                          <motion.circle
                            cx="88"
                            cy="85"
                            r="2.2"
                            fill="#4ADE80"
                            animate={{ y: [0, 30], x: [0, -6], opacity: [1, 0] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
                          />
                          <motion.circle
                            cx="92"
                            cy="90"
                            r="1.8"
                            fill="#22C55E"
                            animate={{ y: [0, 26], x: [0, 5], opacity: [1, 0] }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: 0.3, ease: "easeIn" }}
                          />
                        </g>
                      )}

                      {/* GIRAFFE HEAD & SLENDER NECK (No tongue, graceful motion towards branch) */}
                      <motion.g
                        animate={{
                          y: isGiraffeEating ? [-4, -14, -8, -14, -4] : [0, -3, 0],
                          x: isGiraffeEating ? [0, 6, 2, 6, 0] : 0,
                          rotate: isGiraffeEating ? [0, 3, 1, 3, 0] : [0, 1, 0]
                        }}
                        transition={{ duration: isGiraffeEating ? 1.4 : 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: '75px 180px' }}
                      >
                        {/* Slender Graceful Golden Neck */}
                        <path
                          d="M 54 200 L 64 120 C 66 105, 74 95, 82 92 L 98 92 C 106 95, 114 105, 116 120 L 126 200 Z"
                          fill="#F59E0B"
                        />

                        {/* Beautiful Organic Warm-Caramel Giraffe Spots */}
                        <ellipse cx="78" cy="170" rx="12" ry="8" fill="#B45309" transform="rotate(-15 78 170)" />
                        <ellipse cx="102" cy="165" rx="11" ry="8" fill="#92400E" transform="rotate(10 102 165)" />
                        <ellipse cx="88" cy="140" rx="13" ry="9" fill="#B45309" transform="rotate(-5 88 140)" />
                        <ellipse cx="74" cy="120" rx="9" ry="7" fill="#92400E" transform="rotate(15 74 120)" />
                        <ellipse cx="106" cy="125" rx="9" ry="6" fill="#B45309" transform="rotate(-12 106 125)" />
                        <ellipse cx="90" cy="105" rx="8" ry="5" fill="#92400E" />

                        {/* Back Mane */}
                        <path
                          d="M 64 120 L 58 122 M 61 135 L 55 137 M 59 150 L 53 152 M 57 165 L 51 167 M 55 180 L 49 182"
                          stroke="#92400E"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* HEAD BASE */}
                        <ellipse cx="90" cy="74" rx="22" ry="26" fill="#FBBF24" />
                        <ellipse cx="86" cy="70" rx="19" ry="22" fill="#FDE047" opacity="0.4" />

                        {/* Spots on forehead and cheek */}
                        <ellipse cx="80" cy="62" rx="4.5" ry="3.5" fill="#B45309" transform="rotate(-20 80 62)" />
                        <ellipse cx="100" cy="64" rx="4" ry="3" fill="#B45309" transform="rotate(15 100 64)" />
                        <ellipse cx="74" cy="76" rx="3.5" ry="4" fill="#92400E" />

                        {/* SOFT CREAMY MUZZLE */}
                        <motion.g
                          animate={{
                            y: isGiraffeEating ? [0, -2, 2, -2, 0] : 0,
                            scaleY: isGiraffeEating ? [1, 0.95, 1.05, 0.95, 1] : 1
                          }}
                          transition={{ duration: 0.35, repeat: isGiraffeEating ? Infinity : 0 }}
                          style={{ transformOrigin: '90px 88px' }}
                        >
                          <ellipse cx="90" cy="88" rx="17" ry="13" fill="#FEF3C7" />
                          <ellipse cx="90" cy="86" rx="14" ry="10" fill="#FFFBEB" />

                          {/* Cute Nostrils */}
                          <ellipse cx="83" cy="87" rx="2.5" ry="1.8" fill="#78350F" transform="rotate(-15 83 87)" />
                          <ellipse cx="97" cy="87" rx="2.5" ry="1.8" fill="#78350F" transform="rotate(15 97 87)" />

                          {/* Gentle Sweet Smile */}
                          <path
                            d="M 83 93 Q 90 97 97 93"
                            stroke="#78350F"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </motion.g>

                        {/* LARGE BEAUTIFUL EYES */}
                        <g>
                          <ellipse cx="76" cy="68" rx="5" ry="6" fill="#1C1917" />
                          <ellipse cx="76" cy="68" rx="3.5" ry="4.5" fill="#451A03" />
                          <circle cx="74.5" cy="65.5" r="2" fill="#FFFFFF" />
                          <circle cx="78" cy="70" r="0.9" fill="#FFFFFF" />
                          <path d="M 70 65 Q 75 61 80 64" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                          <path d="M 69 64 L 67 61 M 72 62 L 71 58" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" />
                        </g>

                        <g>
                          <ellipse cx="104" cy="68" rx="5" ry="6" fill="#1C1917" />
                          <ellipse cx="104" cy="68" rx="3.5" ry="4.5" fill="#451A03" />
                          <circle cx="102.5" cy="65.5" r="2" fill="#FFFFFF" />
                          <circle cx="106" cy="70" r="0.9" fill="#FFFFFF" />
                          <path d="M 100 64 Q 105 61 110 65" stroke="#451A03" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                          <path d="M 110 64 L 113 61 M 108 62 L 109 58" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" />
                        </g>

                        {/* OSSICONES */}
                        <path d="M 78 52 L 77 34" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
                        <ellipse cx="76.5" cy="32" rx="5.5" ry="5" fill="#78350F" />
                        <ellipse cx="75.5" cy="30" rx="3" ry="2.5" fill="#92400E" />

                        <path d="M 102 52 L 103 34" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
                        <ellipse cx="103.5" cy="32" rx="5.5" ry="5" fill="#78350F" />
                        <ellipse cx="104.5" cy="30" rx="3" ry="2.5" fill="#92400E" />

                        {/* EARS */}
                        <g>
                          <path d="M 70 58 C 50 48, 42 64, 66 70 Z" fill="#FBBF24" />
                          <path d="M 68 59 C 53 52, 48 64, 65 68 Z" fill="#FECDD3" />
                        </g>
                        <g>
                          <path d="M 110 58 C 130 48, 138 64, 114 70 Z" fill="#FBBF24" />
                          <path d="M 112 59 C 127 52, 132 64, 115 68 Z" fill="#FECDD3" />
                        </g>
                      </motion.g>

                      {/* Window sill edge */}
                      <rect x="0" y="194" width="180" height="6" fill="#1E293B" />
                    </svg>
                  </div>

                  {/* Clean title without hover action caption */}
                  <div className="w-full mt-2.5 flex items-center justify-center px-1">
                    <span className="text-xs font-semibold text-white">Žirafa</span>
                  </div>
                </div>

                {/* 2. ADORABLE ELEPHANT PEEKING WINDOW (TRUMPETS & WATER SPRAY, NO SPEECH BUBBLE, CLEAN HOVER) */}
                <div 
                  className="group rounded-2xl bg-[#090C14] border border-slate-800 p-3 hover:border-blue-500/50 transition-all flex flex-col items-center cursor-pointer select-none"
                  onMouseEnter={handleElephantInteraction}
                  onClick={handleElephantInteraction}
                >
                  <div className="w-full relative aspect-[4/3] rounded-xl bg-gradient-to-b from-[#121A28] via-[#0E1522] to-[#080D14] border border-slate-800/90 overflow-hidden flex items-end justify-center">
                    {/* Window frame rim */}
                    <div className="absolute inset-0 border-2 border-slate-800/70 rounded-xl pointer-events-none z-20" />

                    {/* Ambient cool cyan lighting */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                    {/* SVG STAGE: Cute Elephant + Water Spray Fountain */}
                    <svg
                      viewBox="0 0 180 200"
                      className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                    >
                      {/* WATER FOUNTAIN SPRAY (Visible when isElephantActive) */}
                      {isElephantActive && (
                        <g>
                          <motion.path
                            d="M 90 42 C 95 20, 115 15, 140 28"
                            stroke="#38BDF8"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            animate={{ pathLength: [0, 1], opacity: [0.3, 1, 0.7] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeOut' }}
                          />
                          <motion.path
                            d="M 90 42 C 85 18, 65 14, 40 28"
                            stroke="#38BDF8"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            animate={{ pathLength: [0, 1], opacity: [0.3, 1, 0.7] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.1, ease: 'easeOut' }}
                          />
                          <motion.path
                            d="M 90 42 C 90 12, 92 6, 92 2"
                            stroke="#7DD3FC"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            animate={{ pathLength: [0, 1], opacity: [0.2, 1, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut' }}
                          />

                          {/* Water droplets */}
                          <motion.circle
                            cx="142"
                            cy="32"
                            r="3"
                            fill="#BAE6FD"
                            animate={{ y: [0, 25], x: [0, 8], opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeIn' }}
                          />
                          <motion.circle
                            cx="38"
                            cy="32"
                            r="3"
                            fill="#BAE6FD"
                            animate={{ y: [0, 25], x: [0, -8], opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.15, ease: 'easeIn' }}
                          />
                          <motion.circle
                            cx="92"
                            cy="4"
                            r="2.5"
                            fill="#E0F2FE"
                            animate={{ y: [0, 20], opacity: [1, 0] }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeIn' }}
                          />
                        </g>
                      )}

                      {/* ELEPHANT BODY / CHEST */}
                      <ellipse cx="90" cy="205" rx="55" ry="40" fill="#475569" />

                      {/* BIG FLAPPY EARS */}
                      <motion.g
                        animate={{
                          rotate: isElephantActive ? [-8, 6, -8, 6, 0] : [0, -2, 0]
                        }}
                        transition={{ duration: isElephantActive ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: '56px 100px' }}
                      >
                        <path
                          d="M 56 95 C 18 78, 10 135, 52 145 C 56 145, 59 125, 56 95 Z"
                          fill="#64748B"
                        />
                        <path
                          d="M 52 102 C 24 90, 20 130, 49 138 C 53 138, 55 124, 52 102 Z"
                          fill="#FDA4AF"
                          opacity="0.45"
                        />
                      </motion.g>

                      <motion.g
                        animate={{
                          rotate: isElephantActive ? [8, -6, 8, -6, 0] : [0, 2, 0]
                        }}
                        transition={{ duration: isElephantActive ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: '124px 100px' }}
                      >
                        <path
                          d="M 124 95 C 162 78, 170 135, 128 145 C 124 145, 121 125, 124 95 Z"
                          fill="#64748B"
                        />
                        <path
                          d="M 128 102 C 156 90, 160 130, 131 138 C 127 138, 125 124, 128 102 Z"
                          fill="#FDA4AF"
                          opacity="0.45"
                        />
                      </motion.g>

                      {/* ROUND GENTLE HEAD */}
                      <circle cx="90" cy="106" r="36" fill="#64748B" />
                      <circle cx="90" cy="103" r="32" fill="#94A3B8" opacity="0.3" />

                      {/* KIND SMILING EYES */}
                      <g>
                        <ellipse cx="76" cy="98" rx="4" ry="4.5" fill="#0F172A" />
                        <circle cx="74.8" cy="96" r="1.5" fill="#FFFFFF" />
                        <circle cx="77.5" cy="99.5" r="0.7" fill="#FFFFFF" />
                        <path d="M 72 93 Q 76 90 80 93" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      </g>
                      <g>
                        <ellipse cx="104" cy="98" rx="4" ry="4.5" fill="#0F172A" />
                        <circle cx="102.8" cy="96" r="1.5" fill="#FFFFFF" />
                        <circle cx="105.5" cy="99.5" r="0.7" fill="#FFFFFF" />
                        <path d="M 100 93 Q 104 90 108 93" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      </g>

                      {/* IVORY TUSKS */}
                      <path
                        d="M 75 126 C 70 136, 66 144, 73 145 C 76 144, 78 136, 79 126 Z"
                        fill="#F8FAFC"
                        stroke="#CBD5E1"
                        strokeWidth="0.8"
                      />
                      <path
                        d="M 105 126 C 110 136, 114 144, 107 145 C 104 144, 102 136, 101 126 Z"
                        fill="#F8FAFC"
                        stroke="#CBD5E1"
                        strokeWidth="0.8"
                      />

                      {/* ELEPHANT TRUNK */}
                      {isElephantActive ? (
                        <motion.g
                          initial={{ scale: 0.95 }}
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <path
                            d="M 83 118 
                               C 83 100, 78 75, 84 56 
                               C 86 48, 94 44, 98 50 
                               C 102 56, 96 75, 96 100 
                               C 96 110, 95 118, 95 118 Z"
                            fill="#475569"
                          />
                          <line x1="84" y1="92" x2="96" y2="92" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="85" y1="78" x2="97" y2="78" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="86" y1="64" x2="96" y2="64" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <ellipse cx="91" cy="48" rx="4" ry="2.5" fill="#334155" />
                        </motion.g>
                      ) : (
                        <g>
                          <path
                            d="M 83 118 
                               C 83 138, 80 162, 84 182 
                               C 86 190, 96 190, 97 182 
                               C 99 162, 95 138, 95 118 Z"
                            fill="#475569"
                          />
                          <line x1="84" y1="136" x2="94" y2="136" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="84" y1="148" x2="94" y2="148" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="84" y1="160" x2="94" y2="160" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="85" y1="172" x2="95" y2="172" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                        </g>
                      )}

                      {/* Window sill edge */}
                      <rect x="0" y="194" width="180" height="6" fill="#1E293B" />
                    </svg>
                  </div>

                  {/* Clean title without hover action caption */}
                  <div className="w-full mt-2.5 flex items-center justify-center px-1">
                    <span className="text-xs font-semibold text-white">Slon</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 4. GREATEST LOVES: CAT & DOG WITH FLOATING HEARTS ON HOVER (NO TEXT, ONLY HEARTS) (Lg: 7 cols) */}
          <div className="lg:col-span-7 bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                <span>Největší lásky</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Můj kocour & moje fenka
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Moji dva nejvěrnější čtyřnohé lásky.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* 1. CAT PHOTO WINDOW (OKÉNKO KOCOUR) */}
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={catFileInputRef}
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'cat')}
                  className="hidden"
                />

                <div 
                  className="w-full relative aspect-[4/3] rounded-2xl border-2 border-slate-800 hover:border-purple-500/80 bg-[#090C14] overflow-hidden cursor-pointer transition-all shadow-lg flex items-center justify-center select-none"
                  onMouseEnter={() => setIsCatHovered(true)}
                  onMouseLeave={() => setIsCatHovered(false)}
                  onClick={() => catFileInputRef.current?.click()}
                  title="Klikněte pro změnu fotky kocoura"
                >
                  {/* FLOATING HEARTS ON HOVER (ONLY HEARTS, NO TEXT) */}
                  <AnimatePresence>
                    {isCatHovered && (
                      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                        {[
                          { id: 1, left: '16%', bottom: '15%', size: 22, color: 'text-rose-500 fill-rose-500', delay: 0 },
                          { id: 2, left: '32%', bottom: '8%', size: 16, color: 'text-pink-400 fill-pink-400', delay: 0.15 },
                          { id: 3, left: '52%', bottom: '18%', size: 24, color: 'text-rose-400 fill-rose-400', delay: 0.3 },
                          { id: 4, left: '72%', bottom: '10%', size: 18, color: 'text-rose-500 fill-rose-500', delay: 0.08 },
                          { id: 5, left: '22%', bottom: '28%', size: 20, color: 'text-pink-500 fill-pink-500', delay: 0.22 },
                          { id: 6, left: '80%', bottom: '22%', size: 17, color: 'text-red-400 fill-red-400', delay: 0.38 },
                          { id: 7, left: '44%', bottom: '12%', size: 26, color: 'text-rose-400 fill-rose-400', delay: 0.18 },
                          { id: 8, left: '64%', bottom: '30%', size: 19, color: 'text-pink-400 fill-pink-400', delay: 0.28 },
                        ].map((h) => (
                          <motion.div
                            key={h.id}
                            initial={{ opacity: 0, scale: 0.3, y: 0 }}
                            animate={{
                              opacity: [0, 1, 1, 0],
                              scale: [0.4, 1.25, 1, 0.7],
                              y: [-10, -120],
                              x: [0, (h.id % 2 === 0 ? 14 : -14)],
                            }}
                            transition={{
                              duration: 1.7,
                              repeat: Infinity,
                              delay: h.delay,
                              ease: 'easeOut',
                            }}
                            style={{ left: h.left, bottom: h.bottom }}
                            className={`absolute drop-shadow-[0_2px_8px_rgba(244,63,94,0.7)] ${h.color}`}
                          >
                            <Heart style={{ width: h.size, height: h.size }} className="fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {catPhoto ? (
                    <>
                      <img 
                        src={catPhoto} 
                        alt="Kocour" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleRemovePhoto('cat', e)}
                        className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/75 hover:bg-black text-white hover:text-rose-400 transition-colors shadow-md"
                        title="Odstranit vlastní fotku"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    /* High-fidelity portrait of Šimon's tabby cat with green-amber eyes and whiskers */
                    <svg viewBox="0 0 240 180" className="w-full h-full object-cover">
                      {/* Dark warm ambient background */}
                      <rect width="240" height="180" fill="#111625" />
                      <circle cx="120" cy="90" r="80" fill="#2E1A47" opacity="0.35" />

                      {/* Cat Body & Shoulders */}
                      <ellipse cx="120" cy="195" rx="72" ry="48" fill="#524840" />
                      <ellipse cx="120" cy="195" rx="58" ry="38" fill="#786B5D" />

                      {/* White chest fluff */}
                      <path d="M 105 150 Q 120 162 135 150 Q 120 180 105 150 Z" fill="#F5F5F4" />

                      {/* POINTED CAT EARS */}
                      {/* Left Ear */}
                      <path d="M 72 82 L 60 30 L 98 56 Z" fill="#524840" />
                      <path d="M 74 76 L 66 38 L 94 58 Z" fill="#FECDD3" opacity="0.75" />
                      {/* Inner ear tufts */}
                      <path d="M 76 68 L 70 52 M 80 66 L 76 50" stroke="#F5F5F4" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Right Ear */}
                      <path d="M 168 82 L 180 30 L 142 56 Z" fill="#524840" />
                      <path d="M 166 76 L 174 38 L 146 58 Z" fill="#FECDD3" opacity="0.75" />
                      <path d="M 164 68 L 170 52 M 160 66 L 164 50" stroke="#F5F5F4" strokeWidth="1.5" strokeLinecap="round" />

                      {/* CAT HEAD */}
                      <ellipse cx="120" cy="94" rx="48" ry="42" fill="#786B5D" />
                      <ellipse cx="120" cy="92" rx="44" ry="38" fill="#8C7D6D" />

                      {/* Tabby forehead stripes ('M' pattern) */}
                      <path d="M 106 60 L 112 74 L 120 62 L 128 74 L 134 60" stroke="#2B241D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                      <path d="M 120 54 L 120 74" stroke="#2B241D" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 98 68 L 105 76 M 142 68 L 135 76" stroke="#2B241D" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Cheek stripes */}
                      <path d="M 80 92 L 92 95 M 78 102 L 90 102 M 80 112 L 92 108" stroke="#2B241D" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M 160 92 L 148 95 M 162 102 L 150 102 M 160 112 L 148 108" stroke="#2B241D" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Creamy muzzle */}
                      <ellipse cx="112" cy="115" rx="12" ry="9" fill="#F5F5F4" />
                      <ellipse cx="128" cy="115" rx="12" ry="9" fill="#F5F5F4" />
                      <ellipse cx="120" cy="126" rx="8" ry="6" fill="#F5F5F4" />

                      {/* Cute pink cat nose with dark outline */}
                      <path d="M 115 106 Q 120 108 125 106 L 120 113 Z" fill="#FB7185" stroke="#4C1D24" strokeWidth="0.8" />

                      {/* Mouth curve */}
                      <path d="M 120 113 L 120 118 M 120 118 Q 114 122 108 119 M 120 118 Q 126 122 132 119" stroke="#3D2820" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                      {/* VIVID GREEN-AMBER TABBY EYES */}
                      {/* Left Eye */}
                      <g>
                        <ellipse cx="102" cy="88" rx="8" ry="9.5" fill="#1C1917" />
                        <ellipse cx="102" cy="88" rx="7" ry="8.5" fill="#84CC16" />
                        <ellipse cx="102" cy="88" rx="6" ry="7" fill="#EAB308" opacity="0.6" />
                        <ellipse cx="102" cy="88" rx="2.5" ry="7" fill="#0F172A" />
                        <circle cx="100.5" cy="85" r="2.2" fill="#FFFFFF" />
                        <circle cx="103.5" cy="90.5" r="0.9" fill="#FFFFFF" />
                      </g>
                      {/* Right Eye */}
                      <g>
                        <ellipse cx="138" cy="88" rx="8" ry="9.5" fill="#1C1917" />
                        <ellipse cx="138" cy="88" rx="7" ry="8.5" fill="#84CC16" />
                        <ellipse cx="138" cy="88" rx="6" ry="7" fill="#EAB308" opacity="0.6" />
                        <ellipse cx="138" cy="88" rx="2.5" ry="7" fill="#0F172A" />
                        <circle cx="136.5" cy="85" r="2.2" fill="#FFFFFF" />
                        <circle cx="139.5" cy="90.5" r="0.9" fill="#FFFFFF" />
                      </g>

                      {/* LONG WHITE WHISKERS */}
                      <g stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
                        <line x1="106" y1="113" x2="68" y2="106" />
                        <line x1="105" y1="116" x2="65" y2="116" />
                        <line x1="106" y1="119" x2="70" y2="126" />
                        <line x1="134" y1="113" x2="172" y2="106" />
                        <line x1="135" y1="116" x2="175" y2="116" />
                        <line x1="134" y1="119" x2="170" y2="126" />
                      </g>
                    </svg>
                  )}
                </div>

                {/* Clean label below window */}
                <div className="w-full mt-2.5 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-white">Kocour</span>
                  <button
                    type="button"
                    onClick={() => catFileInputRef.current?.click()}
                    className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Nahrát fotku</span>
                  </button>
                </div>
              </div>

              {/* 2. DOG PHOTO WINDOW (OKÉNKO FENKA) */}
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={dogFileInputRef}
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'dog')}
                  className="hidden"
                />

                <div 
                  className="w-full relative aspect-[4/3] rounded-2xl border-2 border-slate-800 hover:border-blue-500/80 bg-[#090C14] overflow-hidden cursor-pointer transition-all shadow-lg flex items-center justify-center select-none"
                  onMouseEnter={() => setIsDogHovered(true)}
                  onMouseLeave={() => setIsDogHovered(false)}
                  onClick={() => dogFileInputRef.current?.click()}
                  title="Klikněte pro změnu fotky fenky"
                >
                  {/* FLOATING HEARTS ON HOVER (ONLY HEARTS, NO TEXT) */}
                  <AnimatePresence>
                    {isDogHovered && (
                      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                        {[
                          { id: 1, left: '18%', bottom: '15%', size: 22, color: 'text-rose-500 fill-rose-500', delay: 0 },
                          { id: 2, left: '35%', bottom: '8%', size: 17, color: 'text-pink-400 fill-pink-400', delay: 0.15 },
                          { id: 3, left: '55%', bottom: '18%', size: 25, color: 'text-rose-400 fill-rose-400', delay: 0.3 },
                          { id: 4, left: '74%', bottom: '10%', size: 19, color: 'text-rose-500 fill-rose-500', delay: 0.08 },
                          { id: 5, left: '25%', bottom: '28%', size: 21, color: 'text-pink-500 fill-pink-500', delay: 0.22 },
                          { id: 6, left: '82%', bottom: '22%', size: 16, color: 'text-red-400 fill-red-400', delay: 0.38 },
                          { id: 7, left: '46%', bottom: '12%', size: 26, color: 'text-rose-400 fill-rose-400', delay: 0.18 },
                          { id: 8, left: '66%', bottom: '30%', size: 18, color: 'text-pink-400 fill-pink-400', delay: 0.28 },
                        ].map((h) => (
                          <motion.div
                            key={h.id}
                            initial={{ opacity: 0, scale: 0.3, y: 0 }}
                            animate={{
                              opacity: [0, 1, 1, 0],
                              scale: [0.4, 1.25, 1, 0.7],
                              y: [-10, -120],
                              x: [0, (h.id % 2 === 0 ? 14 : -14)],
                            }}
                            transition={{
                              duration: 1.7,
                              repeat: Infinity,
                              delay: h.delay,
                              ease: 'easeOut',
                            }}
                            style={{ left: h.left, bottom: h.bottom }}
                            className={`absolute drop-shadow-[0_2px_8px_rgba(244,63,94,0.7)] ${h.color}`}
                          >
                            <Heart style={{ width: h.size, height: h.size }} className="fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {dogPhoto ? (
                    <>
                      <img 
                        src={dogPhoto} 
                        alt="Fenka" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleRemovePhoto('dog', e)}
                        className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/75 hover:bg-black text-white hover:text-rose-400 transition-colors shadow-md"
                        title="Odstranit vlastní fotku"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    /* High-fidelity portrait of Šimon's golden retriever dog with kind brown eyes */
                    <svg viewBox="0 0 240 180" className="w-full h-full object-cover">
                      {/* Dark gentle ambient background */}
                      <rect width="240" height="180" fill="#111625" />
                      <circle cx="120" cy="90" r="80" fill="#1E293B" opacity="0.35" />

                      {/* Golden dog chest and shoulders */}
                      <ellipse cx="120" cy="195" rx="74" ry="50" fill="#D97706" />
                      <ellipse cx="120" cy="195" rx="60" ry="40" fill="#F59E0B" />
                      <path d="M 104 150 Q 120 172 136 150 Q 120 185 104 150 Z" fill="#FEF3C7" opacity="0.8" />

                      {/* FLOPPY GOLDEN EARS */}
                      {/* Left Ear */}
                      <path d="M 80 62 C 60 70, 50 115, 68 132 C 76 138, 86 120, 84 95 Z" fill="#B45309" />
                      <path d="M 82 66 C 65 74, 56 112, 70 126 Z" fill="#D97706" />

                      {/* Right Ear */}
                      <path d="M 160 62 C 180 70, 190 115, 172 132 C 164 138, 154 120, 156 95 Z" fill="#B45309" />
                      <path d="M 158 66 C 175 74, 184 112, 170 126 Z" fill="#D97706" />

                      {/* HEAD BASE */}
                      <ellipse cx="120" cy="94" rx="46" ry="42" fill="#F59E0B" />
                      <ellipse cx="120" cy="88" rx="40" ry="36" fill="#FBBF24" />

                      {/* Soft forehead fur highlight */}
                      <path d="M 112 55 Q 120 50 128 55 Q 120 85 112 55 Z" fill="#FEF3C7" opacity="0.5" />

                      {/* SNOUT / MUZZLE */}
                      <ellipse cx="120" cy="115" rx="22" ry="18" fill="#FDE68A" />
                      <ellipse cx="120" cy="112" rx="19" ry="15" fill="#FFFBEB" />

                      {/* BLACK DOG NOSE WITH REFLECTION */}
                      <path d="M 111 106 Q 120 103 129 106 C 132 112, 126 118, 120 118 C 114 118, 108 112, 111 106 Z" fill="#1C1917" />
                      <circle cx="116" cy="107" r="1.5" fill="#94A3B8" opacity="0.8" />

                      {/* HAPPY DOG MOUTH & TONGUE */}
                      <path d="M 120 118 L 120 124 M 120 124 Q 112 128 104 123 M 120 124 Q 128 128 136 123" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />
                      {/* Little pink tongue tip */}
                      <path d="M 116 125 C 116 132, 124 132, 124 125 Z" fill="#FB7185" />

                      {/* WARM KIND BROWN EYES */}
                      {/* Left Eye */}
                      <g>
                        <ellipse cx="102" cy="84" rx="6.5" ry="7.5" fill="#1C1917" />
                        <ellipse cx="102" cy="84" rx="5" ry="6" fill="#451A03" />
                        <circle cx="100.5" cy="82" r="2" fill="#FFFFFF" />
                        <circle cx="103.5" cy="86" r="0.8" fill="#FFFFFF" />
                        <path d="M 95 78 Q 102 75 109 78" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                      </g>
                      {/* Right Eye */}
                      <g>
                        <ellipse cx="138" cy="84" rx="6.5" ry="7.5" fill="#1C1917" />
                        <ellipse cx="138" cy="84" rx="5" ry="6" fill="#451A03" />
                        <circle cx="136.5" cy="82" r="2" fill="#FFFFFF" />
                        <circle cx="139.5" cy="86" r="0.8" fill="#FFFFFF" />
                        <path d="M 131 78 Q 138 75 145 78" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                      </g>
                    </svg>
                  )}
                </div>

                {/* Clean label below window */}
                <div className="w-full mt-2.5 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-white">Fenka</span>
                  <button
                    type="button"
                    onClick={() => dogFileInputRef.current?.click()}
                    className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Nahrát fotku</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 5. HUDBA A ČTENÍ: STRAŠNĚ DŮLEŽITÉ SOUČÁSTI ŽIVOTA (Lg: 12 cols) */}
          <div className="lg:col-span-12 bg-gradient-to-br from-[#0F131D] via-[#111625] to-[#0D101A] border border-slate-800/90 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>To nejdůležitější pro mou duši</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Hudba a čtení jsou pro mě strašně důležité
                  </h3>
                </div>
                <a
                  href="#zajmy"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold transition-all hover:translate-x-0.5 self-start md:self-auto shadow-sm"
                >
                  <span>Prozkoumat v sekci Zájmy</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-4xl">
                Ať už jedu dálkovým autobusem FlixBus mezi Chebem a Brnem, soustředím se na studium nebo trávím večer doma se svými zvířaty, hudba a knihy jsou dvě stěžejní kotvy, bez kterých si svůj den nedokážu představit.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Hudba box */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#090C14]/90 border border-slate-800/90 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400">
                        <Music className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Hudba jako stálý společník</h4>
                        <span className="text-[11px] text-slate-400">Taylor Swift · Griff · RAYE</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Hudba pro mě není jen kulisa – je to intenzivní emoční prožitek, obdiv k lyrickému vypravěčství a útočiště pro myšlenky. Písně jako <span className="text-white font-medium">tolerate it</span> nebo celá atmosféra alba <span className="text-white font-medium">evermore</span> mě provázejí neustále.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center gap-2 text-xs text-rose-300/90 font-medium">
                    <span>🎧 Spotify denně ve sluchátkách</span>
                  </div>
                </div>

                {/* Čtení box */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#090C14]/90 border border-slate-800/90 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                        <BookOpen className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Čtení a světy příběhů</h4>
                        <span className="text-[11px] text-slate-400">Fantasy ságy & komiksy</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Čtení je moje nejhlubší vášeň. Od epických fantasy ság jako <span className="text-white font-medium">Eragon, Storočí, Ranhojička, Dvůr trnů a růží</span> a <span className="text-white font-medium">Bezmocná</span> až po marvelovské X-Meny a hrdinky DC. Knihy se navíc prolínají i mým studiem na MUNI a prací v Restoriu.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center gap-2 text-xs text-amber-300/90 font-medium">
                    <span>📚 Celoživotní láska ke knihám</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
