import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  ExternalLink, 
  Music, 
  BookOpen, 
  Smartphone, 
  Sparkles,
  Star,
  Quote,
  Zap,
  Upload,
  ImagePlus,
  X,
  Mic,
  Disc3,
  Radio,
  Headphones,
  Pencil,
  Check
} from 'lucide-react';

interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  genre: string;
  description: string;
  coverBadge: string;
}

const BOOKS: Book[] = [
  {
    id: 'eragon',
    title: 'Eragon',
    originalTitle: 'Odkaz Dračích jezdců',
    author: 'Christopher Paolini',
    genre: 'Epická fantasy',
    description: 'Fascinující svět Alagaësie, pevné pouto mezi jezdcem a dračicí Safirou, starodávná magie a boj proti tyranovi Galbatorixovi.',
    coverBadge: 'Dračí sága'
  },
  {
    id: 'storoci',
    title: 'Storočí',
    originalTitle: 'Lightlark / Nightbane',
    author: 'Alex Aster',
    genre: 'Fantasy sága',
    description: 'Fantasy série Storočí od autorky Alex Aster. Smrtící kletba na ostrově Lightlark, který se objevuje jen jednou za sto let na sto dní, a souboj šesti vládců na život a na smrt.',
    coverBadge: 'Svět Lightlark'
  },
  {
    id: 'ranhojicka',
    title: 'Ranhojička',
    originalTitle: 'Vůně magie a léčení',
    author: 'Fantasy literatura',
    genre: 'Magická fantasy',
    description: 'Příběh odvahy, bylinářského mistrovství a léčitelské moci, která dokáže uzdravit tělo i zraněnou lidskou duši.',
    coverBadge: 'Léčitelství & magie'
  },
  {
    id: 'acotar',
    title: 'Dvůr trnů a růží',
    originalTitle: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    genre: 'Fantasy & Romantasy',
    description: 'Nebezpečný a kouzelný svět víl, Noční dvůr, Rhysand, Feyre a temná kletba ohrožující celou říši Prythian.',
    coverBadge: 'Noční dvůr'
  },
  {
    id: 'bezmocna',
    title: 'Bezmocná',
    originalTitle: 'Powerless',
    author: 'Lauren Roberts',
    genre: 'Dystopická fantasy',
    description: 'Království Ilya, kde Obyčejní bez schopností nemají právo žít. Smrtící Zkoušky Očisty, zakázané city a boj o přežití.',
    coverBadge: 'Království Ilya'
  }
];

interface MusicianSlot {
  id: string;
  rank: number;
  name: string;
  title: string;
  genre: string;
  note: string;
  topWork: string;
  badge: string;
  quote?: string;
  accentColor: string;
}

const MUSICIANS: MusicianSlot[] = [
  {
    id: 'taylor_swift',
    rank: 1,
    name: 'Taylor Swift',
    title: 'Nejoblíbenější zpěvačka',
    genre: 'Pop / Storytelling / Folk',
    note: 'Geniální textařka, vypravěčka a královna popu. Alba jako evermore a folklore jsou absolutní srdcovou záležitostí se skladbou tolerate it.',
    topWork: 'Album evermore • skladba tolerate it',
    badge: '1. místo • Nejoblíbenější interpret',
    quote: '„I know my love should be celebrated, but you tolerate it.“',
    accentColor: 'rose'
  },
  {
    id: 'griff',
    rank: 2,
    name: 'Griff',
    title: 'Britská electro-popová ikona & skladatelka',
    genre: 'Alt-Pop / Electro-Pop / Indie Pop',
    note: 'Mimořádný skladatelský talent, unikátní DIY produkce a nakažlivá energie. Její chytlavé melodie, zranitelné texty a energický moderní pop (skladby jako Vertigo, Black Hole, Miss Me Too nebo One Night) mají naprosto osobitou duši.',
    topWork: 'Debutové album Vertigo • skladba Black Hole • Miss Me Too',
    badge: '2. místo • Britský popový fenomén',
    quote: '„You\'re scared of heights, that\'s vertigo. You\'re scared of love, well, aren\'t we all?“',
    accentColor: 'indigo'
  },
  {
    id: 'raye',
    rank: 3,
    name: 'RAYE',
    title: 'Britská hudební vizionářka & vokální génius',
    genre: 'Orchestral Pop / Soul & R&B / Jazz',
    note: 'Výjimečný hlasový rozsah, surová autenticita a velkolepá orchestrální produkce. Její tvorba na albu This Music May Contain Hope (skladby jako I Know You\'re Hurting, WHERE IS MY HUSBAND!) i hit Escapism berou dech svou katarzí a hloubkou.',
    topWork: 'Album This Music May Contain Hope • I Know You\'re Hurting • Escapism',
    badge: '3. místo • Neuvěřitelný hlas & duše',
    quote: '„If you need two more arms to hold these burdens, I am here... please, don\'t stop believing in miracles.“',
    accentColor: 'amber'
  }
];

interface AlbumSlot {
  id: string;
  rank: number;
  title: string;
  artist: string;
  year: string;
  genre: string;
  description: string;
  highlightTracks: string[];
  quote?: string;
  badge: string;
  accentBg: string;
  accentBorder: string;
  vinylColor: string;
}

const ALBUMS: AlbumSlot[] = [
  {
    id: 'evermore',
    rank: 1,
    title: 'evermore',
    artist: 'Taylor Swift',
    year: '2020',
    genre: 'Alternative / Folk Pop',
    description: 'Tiché, poetické a hluboce zamyšlené sesterské album k folklore. Plné nepravidelných 5/4 rytmů, hořkosladkých melodií a autorské dokonalosti s písní tolerate it.',
    highlightTracks: ['tolerate it', 'champagne problems', 'willow', 'ivy', 'gold rush'],
    quote: '„I made you my temple, my mural, my sky, now I\'m begging for footnotes in the story of your life...“',
    badge: '1. místo • Zlaté album',
    accentBg: 'from-amber-950/40 via-stone-900/90 to-slate-950',
    accentBorder: 'border-amber-600/30 hover:border-amber-500/50',
    vinylColor: 'bg-amber-950/80 border-amber-600/40'
  },
  {
    id: 'this_music_may_contain_hope',
    rank: 2,
    title: 'This Music May Contain Hope',
    artist: 'RAYE',
    year: '2026',
    genre: 'Orchestral Pop / Soul & R&B',
    description: 'Monumentální autorské dílo rozdělené do hudebních ročních období se symfonickým orchestrem, dechberoucím vokálem a poselstvím nezdolné lidské naděje.',
    highlightTracks: ['WHERE IS MY HUSBAND!', 'Nightingale Lane', 'Click Clack Symphony', "I Know You're Hurting"],
    quote: '„If you need two more arms to hold these burdens, I am here... please, don\'t stop believing in miracles.“',
    badge: '2. místo • Stříbrné album',
    accentBg: 'from-indigo-950/40 via-slate-900/90 to-slate-950',
    accentBorder: 'border-indigo-600/30 hover:border-indigo-500/50',
    vinylColor: 'bg-indigo-950/80 border-indigo-500/40'
  },
  {
    id: 'brent_trilogy',
    rank: 3,
    title: 'brent I - III',
    artist: 'Jeremy Zucker & Chelsea Cutler',
    year: 'Trilogie',
    genre: 'Acoustic Indie Pop / Lo-Fi',
    description: 'Kompletní trilogie společných projektů Jeremyho a Chelsea (brent, brent ii a brent iii). Křehké melodie, syrové emoce, láska, loučení a upřímná lidská blízkost.',
    highlightTracks: ['you were good to me', 'this is how you fall in love', 'better off', 'emily'],
    quote: '„You were good to me, oh, you were good to me... soundtrack pro klidné večery.“',
    badge: '3. místo • Bronzové album',
    accentBg: 'from-emerald-950/40 via-slate-900/90 to-slate-950',
    accentBorder: 'border-emerald-600/30 hover:border-emerald-500/50',
    vinylColor: 'bg-emerald-950/80 border-emerald-500/40'
  }
];

export const Hobbies: React.FC = () => {
  const [activeBook, setActiveBook] = useState<Book>(BOOKS[0]);
  
  // Book covers stored in localStorage or state
  const [bookCovers, setBookCovers] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    BOOKS.forEach(b => {
      const stored = localStorage.getItem(`simon_book_cover_${b.id}`);
      if (stored) saved[b.id] = stored;
    });
    return saved;
  });

  // Album covers stored in localStorage or state
  const [albumCovers, setAlbumCovers] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    ALBUMS.forEach(a => {
      const stored = localStorage.getItem(`simon_album_cover_${a.id}`);
      if (stored) saved[a.id] = stored;
    });
    return saved;
  });

  // Musician photos stored in localStorage or state (with backward compatibility)
  const [musicianPhotos, setMusicianPhotos] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    MUSICIANS.forEach(m => {
      let stored = localStorage.getItem(`simon_musician_photo_${m.id}`);
      if (!stored && m.id === 'griff') {
        stored = localStorage.getItem('simon_musician_photo_musician_2');
      }
      if (!stored && m.id === 'raye') {
        stored = localStorage.getItem('simon_musician_photo_raye') || localStorage.getItem('simon_musician_photo_musician_3');
      }
      if (stored) saved[m.id] = stored;
    });
    return saved;
  });

  // Custom musician names state if user wants to change labels
  const [musicianNames, setMusicianNames] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    MUSICIANS.forEach(m => {
      const stored = localStorage.getItem(`simon_musician_name_${m.id}`);
      if (stored) saved[m.id] = stored;
    });
    return saved;
  });

  // Custom musician quotes state if user wants to customize their favorite lyrics
  const [musicianQuotes, setMusicianQuotes] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    MUSICIANS.forEach(m => {
      const stored = localStorage.getItem(`simon_musician_quote_${m.id}`);
      // Discard any previously stored incorrect quotes so verified lyrics load
      if (stored && !stored.includes('feels the vertigo') && !stored.includes('hudba jako uzdravení') && !stored.includes('let there be light')) {
        saved[m.id] = stored;
      }
    });
    return saved;
  });

  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [tempQuoteText, setTempQuoteText] = useState<string>('');

  const handleStartEditQuote = (musicianId: string, currentQuote: string) => {
    setEditingQuoteId(musicianId);
    setTempQuoteText(musicianQuotes[musicianId] || currentQuote || '');
  };

  const handleSaveQuote = (musicianId: string) => {
    const trimmed = tempQuoteText.trim();
    if (trimmed) {
      setMusicianQuotes(prev => ({ ...prev, [musicianId]: trimmed }));
      localStorage.setItem(`simon_musician_quote_${musicianId}`, trimmed);
    }
    setEditingQuoteId(null);
  };

  const handleResetQuote = (musicianId: string) => {
    setMusicianQuotes(prev => {
      const next = { ...prev };
      delete next[musicianId];
      return next;
    });
    localStorage.removeItem(`simon_musician_quote_${musicianId}`);
    setEditingQuoteId(null);
  };

  // Custom album quotes/lyrics state
  const [albumQuotes, setAlbumQuotes] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    ALBUMS.forEach(a => {
      const stored = localStorage.getItem(`simon_album_quote_${a.id}`);
      // Discard any previously stored quotes with Genesis or outdated text so new quote loads
      if (stored && !stored.includes('let there be light') && !stored.includes('Genesis') && !stored.includes('Nádherná óda')) {
        saved[a.id] = stored;
      }
    });
    return saved;
  });

  const [editingAlbumQuoteId, setEditingAlbumQuoteId] = useState<string | null>(null);
  const [tempAlbumQuoteText, setTempAlbumQuoteText] = useState<string>('');

  const handleStartEditAlbumQuote = (albumId: string, currentQuote: string) => {
    setEditingAlbumQuoteId(albumId);
    setTempAlbumQuoteText(albumQuotes[albumId] || currentQuote || '');
  };

  const handleSaveAlbumQuote = (albumId: string) => {
    const trimmed = tempAlbumQuoteText.trim();
    if (trimmed) {
      setAlbumQuotes(prev => ({ ...prev, [albumId]: trimmed }));
      localStorage.setItem(`simon_album_quote_${albumId}`, trimmed);
    }
    setEditingAlbumQuoteId(null);
  };

  const handleResetAlbumQuote = (albumId: string) => {
    setAlbumQuotes(prev => {
      const next = { ...prev };
      delete next[albumId];
      return next;
    });
    localStorage.removeItem(`simon_album_quote_${albumId}`);
    setEditingAlbumQuoteId(null);
  };

  // Custom album descriptions state
  const [albumDescriptions, setAlbumDescriptions] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    ALBUMS.forEach(a => {
      const stored = localStorage.getItem(`simon_album_desc_${a.id}`);
      if (stored) saved[a.id] = stored;
    });
    return saved;
  });

  const [editingAlbumDescId, setEditingAlbumDescId] = useState<string | null>(null);
  const [tempAlbumDescText, setTempAlbumDescText] = useState<string>('');

  const handleStartEditAlbumDesc = (albumId: string, currentDesc: string) => {
    setEditingAlbumDescId(albumId);
    setTempAlbumDescText(albumDescriptions[albumId] || currentDesc || '');
  };

  const handleSaveAlbumDesc = (albumId: string) => {
    const trimmed = tempAlbumDescText.trim();
    if (trimmed) {
      setAlbumDescriptions(prev => ({ ...prev, [albumId]: trimmed }));
      localStorage.setItem(`simon_album_desc_${albumId}`, trimmed);
    }
    setEditingAlbumDescId(null);
  };

  const handleResetAlbumDesc = (albumId: string) => {
    setAlbumDescriptions(prev => {
      const next = { ...prev };
      delete next[albumId];
      return next;
    });
    localStorage.removeItem(`simon_album_desc_${albumId}`);
    setEditingAlbumDescId(null);
  };

  // Marvel Lightning Storm Effect state (triggers on hover for a brief moment)
  const [isMarvelLightningActive, setIsMarvelLightningActive] = useState(false);
  const [marvelLightningKey, setMarvelLightningKey] = useState(0);
  const marvelLightningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerMarvelLightning = () => {
    if (marvelLightningTimeoutRef.current) {
      clearTimeout(marvelLightningTimeoutRef.current);
    }
    setMarvelLightningKey(prev => prev + 1);
    setIsMarvelLightningActive(true);
    // Runs lightning strike animation for 1.8 seconds, then calms down completely so text is easily readable
    marvelLightningTimeoutRef.current = setTimeout(() => {
      setIsMarvelLightningActive(false);
    }, 1800);
  };

  const handleMarvelMouseEnter = () => {
    triggerMarvelLightning();
  };

  const handleMarvelMouseLeave = () => {
    if (marvelLightningTimeoutRef.current) {
      clearTimeout(marvelLightningTimeoutRef.current);
    }
    setIsMarvelLightningActive(false);
  };

  // DC Raven Dark Purple Magic Aura state (triggers on hover for a brief moment)
  const [isDcRavenAuraActive, setIsDcRavenAuraActive] = useState(false);
  const [dcRavenAuraKey, setDcRavenAuraKey] = useState(0);
  const dcRavenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerDcRavenAura = () => {
    if (dcRavenTimeoutRef.current) {
      clearTimeout(dcRavenTimeoutRef.current);
    }
    setDcRavenAuraKey(prev => prev + 1);
    setIsDcRavenAuraActive(true);
    // Dark purple Raven magic aura surges for 2.2 seconds, then smoothly calms down
    dcRavenTimeoutRef.current = setTimeout(() => {
      setIsDcRavenAuraActive(false);
    }, 2200);
  };

  const handleDcMouseEnter = () => {
    triggerDcRavenAura();
  };

  const handleDcMouseLeave = () => {
    if (dcRavenTimeoutRef.current) {
      clearTimeout(dcRavenTimeoutRef.current);
    }
    setIsDcRavenAuraActive(false);
  };

  useEffect(() => {
    return () => {
      if (marvelLightningTimeoutRef.current) clearTimeout(marvelLightningTimeoutRef.current);
      if (dcRavenTimeoutRef.current) clearTimeout(dcRavenTimeoutRef.current);
    };
  }, []);

  const bookFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const musicianFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const albumFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleAlbumCoverUpload = (e: React.ChangeEvent<HTMLInputElement>, albumId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAlbumCovers(prev => ({ ...prev, [albumId]: result }));
      localStorage.setItem(`simon_album_cover_${albumId}`, result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAlbumCover = (albumId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlbumCovers(prev => {
      const next = { ...prev };
      delete next[albumId];
      return next;
    });
    localStorage.removeItem(`simon_album_cover_${albumId}`);
    if (albumFileInputRefs.current[albumId]) {
      albumFileInputRefs.current[albumId]!.value = '';
    }
  };

  const handleBookCoverUpload = (e: React.ChangeEvent<HTMLInputElement>, bookId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBookCovers(prev => ({ ...prev, [bookId]: result }));
      localStorage.setItem(`simon_book_cover_${bookId}`, result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBookCover = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookCovers(prev => {
      const next = { ...prev };
      delete next[bookId];
      return next;
    });
    localStorage.removeItem(`simon_book_cover_${bookId}`);
    if (bookFileInputRefs.current[bookId]) {
      bookFileInputRefs.current[bookId]!.value = '';
    }
  };

  const handleMusicianPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, musicianId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setMusicianPhotos(prev => ({ ...prev, [musicianId]: result }));
      localStorage.setItem(`simon_musician_photo_${musicianId}`, result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveMusicianPhoto = (musicianId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMusicianPhotos(prev => {
      const next = { ...prev };
      delete next[musicianId];
      return next;
    });
    localStorage.removeItem(`simon_musician_photo_${musicianId}`);
    if (musicianFileInputRefs.current[musicianId]) {
      musicianFileInputRefs.current[musicianId]!.value = '';
    }
  };

  const handleMusicianNameChange = (musicianId: string, newName: string) => {
    setMusicianNames(prev => ({ ...prev, [musicianId]: newName }));
    localStorage.setItem(`simon_musician_name_${musicianId}`, newName);
  };

  return (
    <section id="zajmy" className="relative py-24 md:py-32 bg-[#090A0F] text-slate-100 overflow-hidden border-t border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-emerald-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-rose-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Čas mimo práci & kód
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Zájmy
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Co mě denně provází, inspiruje a baví – od hudby ve sluchátkách přes nejpoužívanější aplikace až po fantasy světy, X-Meny a hrdinky DC.
          </p>
        </div>

        {/* 1. BLOK: TOP 3 NEJPOUŽÍVANĚJŠÍ APLIKACE */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Top 3 nejpoužívanější aplikace
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Stupně vítězů pro digitální společníky každého dne
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. MÍSTO: SPOTIFY (Zlatá trofej) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-2 border-amber-500/50 p-6 shadow-xl shadow-amber-500/10 flex flex-col justify-between overflow-hidden group"
            >
              {/* Gold glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-colors" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Spotify Logo Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/30">
                    <svg className="w-8 h-8 text-black fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.216.353-.675.467-1.028.251-2.817-1.721-6.363-2.11-10.54-1.156-.402.092-.801-.158-.893-.56-.092-.402.158-.801.56-.893 4.573-1.044 8.498-.597 11.65 1.33.353.216.467.675.251 1.028zm1.47-3.267c-.272.441-.853.582-1.294.31-3.226-1.982-8.143-2.556-11.958-1.398-.498.152-1.03-.133-1.182-.631-.152-.498.133-1.03.631-1.182 4.364-1.325 9.789-.684 13.493 1.593.441.272.582.853.31 1.308zm.126-3.41c-3.869-2.297-10.25-2.509-13.945-1.388-.593.18-1.223-.158-1.403-.751-.18-.593.158-1.223.751-1.403 4.25-1.29 11.298-1.042 15.748 1.599.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.543.402z" />
                    </svg>
                  </div>

                  {/* 1. Místo Badge & Trophy */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm">
                    <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>1. místo</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
                    Spotify
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1ed760] font-semibold border border-[#1DB954]/30">
                      Hudba & Podcasty
                    </span>
                  </h4>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Jednoznačný vítěz každého dne. Hraje neustále při cestování, programování, procházkách i čtení knih. Soundtrack k mému životu.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-amber-400 flex items-center gap-1">
                  🥇 Zlatá medaile
                </span>
                <span className="text-slate-400 font-mono">Denní aktivita #1</span>
              </div>
            </motion.div>

            {/* 2. MÍSTO: TIKTOK (Stříbrná trofej) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 p-6 shadow-xl flex flex-col justify-between overflow-hidden group hover:border-slate-500/80 transition-colors"
            >
              {/* Silver glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-300/10 rounded-full blur-2xl group-hover:bg-slate-300/20 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* TikTok Logo Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-black border border-slate-800 flex items-center justify-center shadow-lg relative overflow-hidden">
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <path 
                        d="M12.525.02c1.31 0 2.59.39 3.68 1.1a7.48 7.48 0 0 0 4.24 1.34v3.52a10.97 10.97 0 0 1-4.24-1.07v8.52c0 4.41-3.58 7.99-7.99 7.99A7.99 7.99 0 0 1 .225 13.43a7.99 7.99 0 0 1 7.99-7.99c.47 0 .93.04 1.38.12v3.62c-.44-.14-.9-.21-1.38-.21-2.46 0-4.46 2-4.46 4.46s2 4.46 4.46 4.46 4.46-2 4.46-4.46V.02h-.14z" 
                        fill="#00f2fe"
                        transform="translate(-1, 0)"
                        opacity="0.85"
                      />
                      <path 
                        d="M12.525.02c1.31 0 2.59.39 3.68 1.1a7.48 7.48 0 0 0 4.24 1.34v3.52a10.97 10.97 0 0 1-4.24-1.07v8.52c0 4.41-3.58 7.99-7.99 7.99A7.99 7.99 0 0 1 .225 13.43a7.99 7.99 0 0 1 7.99-7.99c.47 0 .93.04 1.38.12v3.62c-.44-.14-.9-.21-1.38-.21-2.46 0-4.46 2-4.46 4.46s2 4.46 4.46 4.46 4.46-2 4.46-4.46V.02h-.14z" 
                        fill="#fe2c55"
                        transform="translate(1, 0)"
                        opacity="0.85"
                      />
                      <path 
                        d="M12.525.02c1.31 0 2.59.39 3.68 1.1a7.48 7.48 0 0 0 4.24 1.34v3.52a10.97 10.97 0 0 1-4.24-1.07v8.52c0 4.41-3.58 7.99-7.99 7.99A7.99 7.99 0 0 1 .225 13.43a7.99 7.99 0 0 1 7.99-7.99c.47 0 .93.04 1.38.12v3.62c-.44-.14-.9-.21-1.38-.21-2.46 0-4.46 2-4.46 4.46s2 4.46 4.46 4.46 4.46-2 4.46-4.46V.02h-.14z" 
                        fill="#ffffff"
                      />
                    </svg>
                  </div>

                  {/* 2. Místo Badge & Trophy */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-400/15 border border-slate-400/40 text-slate-200 font-bold text-xs sm:text-sm">
                    <Trophy className="w-4 h-4 text-slate-300 fill-slate-300" />
                    <span>2. místo</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
                    TikTok
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                      BookTok & Videa
                    </span>
                  </h4>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Nekonečný proud knižních doporučení na BookToku, komiksových rozborů, humoru a rychlého odpočinku ve volných chvílích.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-300 flex items-center gap-1">
                  🥈 Stříbrná medaile
                </span>
                <span className="text-slate-400 font-mono">BookTok & Trendy</span>
              </div>
            </motion.div>

            {/* 3. MÍSTO: INSTAGRAM (Bronzová trofej) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-800/40 p-6 shadow-xl flex flex-col justify-between overflow-hidden group hover:border-amber-700/60 transition-colors"
            >
              {/* Bronze glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-700/20 rounded-full blur-2xl group-hover:bg-amber-700/30 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Instagram Logo Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>

                  {/* 3. Místo Badge & Trophy */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-700/20 border border-amber-600/40 text-amber-200 font-bold text-xs sm:text-sm">
                    <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>3. místo</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
                    Instagram
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                      Fotky & Příběhy
                    </span>
                  </h4>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Sledování přátel, novinek, uměleckých ilustrací a komiksových tvůrců. Příběhy a vizuální inspirace.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-amber-500 flex items-center gap-1">
                  🥉 Bronzová medaile
                </span>
                <span className="text-slate-400 font-mono">Příběhy & Vizuál</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 2. BLOK: OBLÍBENÁ HUDBA – ŽÁNR POP & TAYLOR SWIFT */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Hudební svět
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Oblíbený žánr Pop • Nejoblíbenější zpěvačka Taylor Swift • Skladba tolerate it
              </p>
            </div>
          </div>

          {/* Dvě karty vedle sebe: Žánr Pop & Zpěvačka Taylor Swift */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* KARTA 1: ŽÁNR POP */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/30 p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Radio className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                    Oblíbený žánr
                  </span>
                </div>

                <h4 className="text-2xl font-black text-white tracking-wide mb-2">
                  Pop music
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Žánr s obrovskou emoční silou, chytlavými melodiemi a pestrou moderní produkcí. Pop je pro mě univerzální hudební řeč – od energických skladeb po hluboké intimní balady s piánem či kytarou.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Charakteristika:</span>
                  <span className="font-semibold text-purple-300">Melodie, rytmus, storytelling</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Nálada:</span>
                  <span className="font-semibold text-white">Každodenní energie i klid</span>
                </div>
              </div>
            </div>

            {/* KARTA 2: TAYLOR SWIFT & TOLERATE IT */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#1c131a] via-[#140f17] to-[#0d0d12] border border-rose-900/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Album Cover & Vinyl aesthetic */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative group">
                    {/* Vinyl Record */}
                    <div className="absolute -top-3 -right-4 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-neutral-950 border-4 border-neutral-900 shadow-2xl flex items-center justify-center opacity-75">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-neutral-800 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-rose-950/80 border-2 border-rose-600/40 flex items-center justify-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#090A0F]" />
                        </div>
                      </div>
                    </div>

                    {/* Album Art Card */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-900/40 bg-gradient-to-tr from-stone-900 via-amber-950 to-stone-800 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-black/70 text-amber-200/90 border border-amber-700/30">
                          Album evermore
                        </span>
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-rose-300">
                          Track 05
                        </span>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold mb-0.5">
                          Taylor Swift
                        </p>
                        <h4 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-white drop-shadow-md">
                          tolerate it
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium border border-rose-500/30">
                            Pop / Balada
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            5/4 takt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lyrics & Info */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                      Oblíbená zpěvačka
                    </span>
                    <span className="text-xs text-slate-400">
                      Srdcová píseň
                    </span>
                  </div>

                  <h4 className="text-2xl font-extrabold text-white">
                    Taylor Swift — tolerate it
                  </h4>

                  {/* Lyrics Quote Card */}
                  <div className="rounded-xl bg-black/40 border border-white/10 p-4 text-xs sm:text-sm font-serif italic text-slate-300 space-y-1.5 backdrop-blur-sm">
                    <p className="text-slate-400">
                      „I sit and watch you reading with your head low,<br />
                      I wake and watch you breathe with your eyes closed...“
                    </p>
                    <p className="text-amber-200 font-medium">
                      „I made you my temple, my mural, my sky,<br />
                      Now I'm begging for footnotes in the story of your life...<br />
                      I know my love should be celebrated, but you tolerate it.“
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Píseň vyniká svým neobvyklým 5/4 rytmem a poetickým textem o neopětované oddanosti. Taylor Swift je pro mě vzorem skvělého autorského vyprávění.
                  </p>

                  <div className="pt-2">
                    <a
                      href="https://open.spotify.com/track/0PurA4JVJ8YQgSVopY8fn6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs transition-colors shadow-md shadow-[#1DB954]/20"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.216.353-.675.467-1.028.251-2.817-1.721-6.363-2.11-10.54-1.156-.402.092-.801-.158-.893-.56-.092-.402.158-.801.56-.893 4.573-1.044 8.498-.597 11.65 1.33.353.216.467.675.251 1.028zm1.47-3.267c-.272.441-.853.582-1.294.31-3.226-1.982-8.143-2.556-11.958-1.398-.498.152-1.03-.133-1.182-.631-.152-.498.133-1.03.631-1.182 4.364-1.325 9.789-.684 13.493 1.593.441.272.582.853.31 1.308zm.126-3.41c-3.869-2.297-10.25-2.509-13.945-1.388-.593.18-1.223-.158-1.403-.751-.18-.593.158-1.223.751-1.403 4.25-1.29 11.298-1.042 15.748 1.599.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.543.402z" />
                      </svg>
                      Poslechnout na Spotify
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* PODBLOK 1: TOP 3 HUDEBNÍCI (S PLNÝMI INFORMACEMI A MÍSTY NA FOTKY) */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    Moji Top 3 hudebníci
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20">
                      Srdcoví umělci
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Taylor Swift, Griff a RAYE – s volnými místy pro tvé fotky a texty písní
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                <ImagePlus className="w-3.5 h-3.5" />
                <span>Kliknutím na rámeček nahraješ fotku</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MUSICIANS.map((musician) => {
                const photo = musicianPhotos[musician.id];
                const displayName = musicianNames[musician.id] || musician.name;
                const currentQuote = musicianQuotes[musician.id] || musician.quote;
                const isFirst = musician.rank === 1;
                const isSecond = musician.rank === 2;

                return (
                  <div
                    key={musician.id}
                    className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group border ${
                      isFirst 
                        ? 'bg-gradient-to-b from-rose-950/30 via-slate-900/90 to-slate-950 border-rose-500/30 shadow-lg shadow-rose-950/20' 
                        : isSecond 
                          ? 'bg-gradient-to-b from-indigo-950/30 via-slate-900/90 to-slate-950 border-indigo-500/30 shadow-lg shadow-indigo-950/20'
                          : 'bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950 border-amber-500/30 shadow-lg shadow-amber-950/20'
                    }`}
                  >
                    {/* Hidden file input */}
                    <input
                      ref={el => { musicianFileInputRefs.current[musician.id] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleMusicianPhotoUpload(e, musician.id)}
                    />

                    <div>
                      {/* Top Rank Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                          isFirst 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : isSecond 
                              ? 'bg-slate-300/20 text-slate-200 border-slate-300/40' 
                              : 'bg-amber-700/20 text-amber-400 border-amber-700/40'
                        }`}>
                          <Trophy className={`w-3.5 h-3.5 ${
                            isFirst ? 'text-amber-400 fill-amber-400' : isSecond ? 'text-slate-300 fill-slate-300' : 'text-amber-500 fill-amber-500'
                          }`} />
                          {musician.rank}. místo • {isFirst ? 'Zlato' : isSecond ? 'Stříbro' : 'Bronz'}
                        </span>
                        
                        {photo && (
                          <button
                            onClick={(e) => handleRemoveMusicianPhoto(musician.id, e)}
                            className="p-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/40 border border-red-500/30 transition-colors"
                            title="Odebrat fotku"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Photo slot / Upload trigger area */}
                      <div
                        onClick={() => musicianFileInputRefs.current[musician.id]?.click()}
                        className="cursor-pointer relative aspect-square w-full rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-slate-700 hover:border-amber-400/60 transition-all flex items-center justify-center bg-slate-950/70 group/slot shadow-inner"
                      >
                        {photo ? (
                          <>
                            <img
                              src={photo}
                              alt={displayName}
                              className="w-full h-full object-cover group-hover/slot:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/slot:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-xs">
                              <Upload className="w-4 h-4" />
                              Změnit fotku
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center flex flex-col items-center justify-center text-slate-400 group-hover/slot:text-amber-300 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-slate-900/90 flex items-center justify-center mb-2.5 border border-slate-700/80 group-hover/slot:border-amber-500/50 group-hover/slot:scale-105 transition-all">
                              <ImagePlus className="w-6 h-6 text-slate-300 group-hover/slot:text-amber-300" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 block">Vložit fotku interpreta</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Klikni pro výběr souboru</span>
                          </div>
                        )}
                      </div>

                      {/* Name input / heading */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-white text-lg tracking-wide">
                            {displayName}
                          </h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-mono">
                            {musician.genre}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-amber-300/90 mt-0.5">
                          {musician.title}
                        </p>
                      </div>

                      {/* Top work badge */}
                      <div className="mb-3 px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-300 flex items-center gap-1.5">
                        <Disc3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{musician.topWork}</span>
                      </div>

                      {/* Quote / Lyric with inline edit & real lyrics */}
                      {editingQuoteId === musician.id ? (
                        <div className="mb-3 p-3 rounded-xl bg-black/80 border border-amber-500/50 text-xs shadow-lg">
                          <label className="block text-[10px] text-amber-300 mb-1.5 font-bold uppercase tracking-wider flex items-center justify-between">
                            <span>Upravit úryvek písně:</span>
                            <span className="text-[9px] text-slate-400 font-normal">Pravé lyrics</span>
                          </label>
                          <textarea
                            value={tempQuoteText}
                            onChange={(e) => setTempQuoteText(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-serif italic"
                            placeholder="Napiš úryvek textu písně..."
                          />
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => handleResetQuote(musician.id)}
                              className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors underline cursor-pointer"
                            >
                              Obnovit původní
                            </button>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingQuoteId(null)}
                                className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                              >
                                Zrušit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveQuote(musician.id)}
                                className="px-3 py-1 rounded-md text-[11px] bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Uložit
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        currentQuote && (
                          <div className="mb-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] italic font-serif text-slate-200 leading-relaxed relative group/quote hover:border-amber-400/30 transition-all">
                            <p>{currentQuote}</p>
                            <button
                              type="button"
                              onClick={() => handleStartEditQuote(musician.id, musician.quote || '')}
                              className="opacity-0 group-hover/quote:opacity-100 transition-opacity absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-[10px] flex items-center gap-1 border border-slate-700/80 cursor-pointer"
                              title="Upravit úryvek textu"
                            >
                              <Pencil className="w-3 h-3" />
                              <span className="text-[9px] font-sans font-medium">Upravit</span>
                            </button>
                          </div>
                        )
                      )}
                      
                      <p className="text-xs text-slate-300/90 leading-relaxed">
                        {musician.note}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-medium text-slate-300">{musician.badge}</span>
                      <span className="text-amber-400/90 font-mono font-bold">Top 3</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PODBLOK 2: TOP 3 NEJOBLÍBENĚJŠÍ ALBA (EVERMORE, THIS MUSIC MAY CONTAIN HOPE, BRENT I - III) */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Disc3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    Top 3 nejoblíbenější alba
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 font-medium border border-purple-500/20">
                      Vinylová kolekce
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    evermore • This Music May Contain Hope • brent I - III – s volnými místy pro obaly i možností úpravy textu
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-purple-300/90 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl">
                <ImagePlus className="w-3.5 h-3.5" />
                <span>Volná místa pro obaly i vlastní texty alb</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ALBUMS.map((album) => {
                const cover = albumCovers[album.id];
                const isFirst = album.rank === 1;
                const isSecond = album.rank === 2;
                const currentQuote = albumQuotes[album.id] || album.quote;
                const currentDesc = albumDescriptions[album.id] || album.description;
                const isEditingQuote = editingAlbumQuoteId === album.id;
                const isEditingDesc = editingAlbumDescId === album.id;

                return (
                  <div
                    key={album.id}
                    className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group border bg-gradient-to-b ${album.accentBg} ${album.accentBorder}`}
                  >
                    {/* Hidden file input */}
                    <input
                      ref={el => { albumFileInputRefs.current[album.id] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAlbumCoverUpload(e, album.id)}
                    />

                    <div>
                      {/* Top Rank Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                          isFirst 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : isSecond 
                              ? 'bg-slate-300/20 text-slate-200 border-slate-300/40' 
                              : 'bg-amber-700/20 text-amber-400 border-amber-700/40'
                        }`}>
                          <Trophy className={`w-3.5 h-3.5 ${
                            isFirst ? 'text-amber-400 fill-amber-400' : isSecond ? 'text-slate-300 fill-slate-300' : 'text-amber-500 fill-amber-500'
                          }`} />
                          {album.rank}. místo
                        </span>

                        {cover && (
                          <button
                            onClick={(e) => handleRemoveAlbumCover(album.id, e)}
                            className="p-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/40 border border-red-500/30 transition-colors"
                            title="Odebrat obal"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Vinyl + Album Cover Area */}
                      <div className="relative mb-5 flex justify-center">
                        {/* Vinyl disk sticking out */}
                        <div className="relative group/albumCover">
                          <div className="absolute -top-1.5 -right-2.5 w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-neutral-950 border-4 border-neutral-900 shadow-xl flex items-center justify-center opacity-70 group-hover/albumCover:translate-x-2 transition-transform duration-300">
                            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-neutral-800 flex items-center justify-center">
                              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${album.vinylColor}`}>
                                <div className="w-3 h-3 rounded-full bg-black" />
                              </div>
                            </div>
                          </div>

                          {/* Cover slot */}
                          <div
                            onClick={() => albumFileInputRefs.current[album.id]?.click()}
                            className="cursor-pointer relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 hover:border-purple-400/70 transition-all bg-slate-950/90 shadow-2xl flex flex-col items-center justify-center z-10 group/cover"
                          >
                            {cover ? (
                              <>
                                <img
                                  src={cover}
                                  alt={album.title}
                                  className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-xs">
                                  <Upload className="w-4 h-4" />
                                  Změnit obal
                                </div>
                              </>
                            ) : (
                              <div className="p-3 text-center flex flex-col items-center justify-center text-slate-400 group-hover/cover:text-purple-300 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-slate-900/90 flex items-center justify-center mb-2 border border-slate-700 group-hover/cover:border-purple-500/50 group-hover/cover:scale-105 transition-all">
                                  <ImagePlus className="w-6 h-6 text-slate-300 group-hover/cover:text-purple-300" />
                                </div>
                                <span className="text-xs font-bold text-slate-200 block">Vložit obal alba</span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">Klikni pro nahrání</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title & Artist */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-white text-lg tracking-wide">
                            {album.title}
                          </h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-mono">
                            {album.year}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-purple-300/90 mt-0.5">
                          {album.artist}
                        </p>
                      </div>

                      {/* Genre tag */}
                      <div className="mb-3">
                        <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-medium">
                          {album.genre}
                        </span>
                      </div>

                      {/* Highlight tracks */}
                      <div className="mb-3">
                        <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5">
                          Klíčové skladby:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {album.highlightTracks.map((tr, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5"
                            >
                              {tr}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quote / Lyrics editor or display */}
                      {isEditingQuote ? (
                        <div className="mb-3 p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 shadow-inner">
                          <label className="block text-[11px] font-bold text-purple-300 mb-1 flex items-center justify-between">
                            <span>Úryvek textu / citát z alba:</span>
                            <span className="text-[9px] text-slate-400 font-normal">Text písně z alba</span>
                          </label>
                          <textarea
                            value={tempAlbumQuoteText}
                            onChange={(e) => setTempAlbumQuoteText(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950/90 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-serif italic"
                            placeholder="Napiš úryvek textu písně z tohoto alba..."
                          />
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => handleResetAlbumQuote(album.id)}
                              className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors underline cursor-pointer"
                            >
                              Obnovit původní
                            </button>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingAlbumQuoteId(null)}
                                className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                              >
                                Zrušit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveAlbumQuote(album.id)}
                                className="px-3 py-1 rounded-md text-[11px] bg-purple-500 hover:bg-purple-400 text-white font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Uložit
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        currentQuote ? (
                          <div className="mb-3 p-2.5 sm:p-3 rounded-xl bg-black/35 border border-white/5 text-[11px] italic font-serif text-slate-200 leading-snug relative group/quote hover:border-purple-400/30 transition-all">
                            <p>{currentQuote}</p>
                            <button
                              type="button"
                              onClick={() => handleStartEditAlbumQuote(album.id, album.quote || '')}
                              className="opacity-0 group-hover/quote:opacity-100 transition-opacity absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-purple-300 text-[10px] flex items-center gap-1 border border-slate-700/80 cursor-pointer shadow-sm"
                              title="Upravit úryvek textu"
                            >
                              <Pencil className="w-3 h-3" />
                              <span className="text-[9px] font-sans font-medium">Upravit</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEditAlbumQuote(album.id, album.quote || '')}
                            className="mb-3 w-full py-1.5 rounded-xl border border-dashed border-slate-700 hover:border-purple-400/50 text-[11px] text-slate-400 hover:text-purple-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Přidat úryvek textu</span>
                          </button>
                        )
                      )}

                      {/* Description editor or display */}
                      {isEditingDesc ? (
                        <div className="mb-3 p-3 rounded-xl bg-slate-950/80 border border-slate-700 shadow-inner">
                          <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
                            <span>Popis alba:</span>
                          </label>
                          <textarea
                            value={tempAlbumDescText}
                            onChange={(e) => setTempAlbumDescText(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 leading-relaxed"
                            placeholder="Napiš popis alba..."
                          />
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800">
                            <button
                              type="button"
                              onClick={() => handleResetAlbumDesc(album.id)}
                              className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors underline cursor-pointer"
                            >
                              Obnovit původní
                            </button>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingAlbumDescId(null)}
                                className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                              >
                                Zrušit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveAlbumDesc(album.id)}
                                className="px-3 py-1 rounded-md text-[11px] bg-purple-500 hover:bg-purple-400 text-white font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Uložit
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group/desc">
                          <p className="text-xs text-slate-300/90 leading-relaxed pr-6">
                            {currentDesc}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleStartEditAlbumDesc(album.id, album.description)}
                            className="opacity-0 group-hover/desc:opacity-100 transition-opacity absolute -top-1 right-0 p-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-purple-300 text-[10px] flex items-center gap-0.5 border border-slate-700/80 cursor-pointer"
                            title="Upravit popis alba"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-medium text-slate-300">{album.badge}</span>
                      <span className="text-purple-400/90 font-mono font-bold">Album #{album.rank}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. BLOK: OBLÍBENÉ KNIHY (S VOLNÝMI MÍSTY PRO VLOŽENÍ OBÁLEK) */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  Oblíbené knihy
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Eragon, Storočí, Ranhojička, Dvůr trnů a růží, Bezmocná – kliknutím na knihu nahraješ její obálku
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
              <ImagePlus className="w-3.5 h-3.5" />
              <span>Volná místa připravena na tvé obrázky obálek</span>
            </div>
          </div>

          {/* Book Cards Grid with Empty / Uploadable Cover Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {BOOKS.map((book) => {
              const isSelected = activeBook.id === book.id;
              const coverImg = bookCovers[book.id];

              return (
                <motion.div
                  key={book.id}
                  onClick={() => setActiveBook(book)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`cursor-pointer rounded-2xl p-3 sm:p-4 transition-all duration-300 flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-900 border-2 border-purple-500 shadow-xl shadow-purple-500/20' 
                      : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Hidden file input for book cover */}
                  <input
                    ref={el => { bookFileInputRefs.current[book.id] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleBookCoverUpload(e, book.id)}
                  />

                  {/* Book Cover Area */}
                  <div 
                    onClick={(e) => {
                      // Allow clicking on cover area directly to trigger upload
                      e.stopPropagation();
                      setActiveBook(book);
                      bookFileInputRefs.current[book.id]?.click();
                    }}
                    className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl mb-4 group/cover border-2 border-dashed border-slate-700 hover:border-purple-400/70 transition-all bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex flex-col justify-between p-3"
                  >
                    {coverImg ? (
                      <>
                        <img 
                          src={coverImg} 
                          alt={book.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                        />
                        {/* Remove button */}
                        <div className="absolute top-2 right-2 z-30">
                          <button
                            onClick={(e) => handleRemoveBookCover(book.id, e)}
                            className="p-1 rounded-full bg-red-600/80 hover:bg-red-500 text-white shadow-lg backdrop-blur-sm transition-colors"
                            title="Odebrat obálku"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Hover change text */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-xs text-white font-medium z-20">
                          <Upload className="w-3.5 h-3.5" />
                          Změnit obálku
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col justify-between items-center text-center py-2 relative z-10">
                        {/* Book Badge */}
                        <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-800/80 text-purple-300 border border-purple-500/30">
                          {book.coverBadge}
                        </span>

                        {/* Upload placeholder icon */}
                        <div className="my-auto flex flex-col items-center group-hover/cover:scale-110 transition-transform">
                          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-2">
                            <ImagePlus className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-semibold text-slate-200 block">
                            Vložit obálku
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Klikni pro nahrání
                          </span>
                        </div>

                        {/* Title watermark */}
                        <div>
                          <p className="font-serif font-black text-xs text-slate-300 tracking-wider uppercase truncate max-w-[120px]">
                            {book.title}
                          </p>
                          <p className="text-[9px] text-slate-400 truncate max-w-[120px]">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Author Info */}
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">
                      {book.author}
                    </span>
                    <h4 className="font-bold text-white text-sm truncate mt-0.5">
                      {book.title}
                    </h4>
                    <span className="text-[11px] text-purple-400 block mt-1">
                      {book.genre}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Book Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBook.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    {activeBook.coverBadge}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeBook.author}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {activeBook.title}
                </h4>
                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {activeBook.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Oblíbená fantasy kniha</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. BLOK: ČTENÁŘSKÁ VÁŠEŇ – MARVEL (X-MENI) & DC */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Čtenářská vášeň: Marvel & DC komiksy
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Marvel s oblíbenými X-Meny a mocnými hrdinkami • DC s Raven, Harley Quinn a Wonder Woman
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MARVEL UNIVERSUM CARD – X-MEN, STORM, JEAN GREY, SCARLET WITCH */}
            <motion.div
              onMouseEnter={handleMarvelMouseEnter}
              onMouseLeave={handleMarvelMouseLeave}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl bg-gradient-to-b from-red-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl overflow-hidden group transition-all duration-300 border ${
                isMarvelLightningActive 
                  ? 'border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_0_20px_rgba(250,204,21,0.2)]' 
                  : 'border-red-800/40 hover:border-red-600/60'
              }`}
            >
              {/* Comic dot texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Marvel Storm Lightning Effect Overlay (active for ~1.8s on hover, then fades away for clear reading) */}
              <AnimatePresence>
                {isMarvelLightningActive && (
                  <motion.div
                    key={`marvel-lightning-${marvelLightningKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.35 } }}
                    className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                  >
                    {/* Sky flash strobe effect */}
                    <motion.div
                      animate={{
                        opacity: [0, 0.45, 0.05, 0.55, 0.1, 0.4, 0.05, 0]
                      }}
                      transition={{ duration: 1.5, times: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 1] }}
                      className="absolute inset-0 bg-sky-300/15 mix-blend-screen"
                    />

                    {/* Radial electric pulse from Storm's power */}
                    <motion.div
                      animate={{
                        scale: [0.8, 1.4, 1.8],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/30 via-sky-500/20 to-transparent blur-2xl"
                    />

                    {/* SVG Branching Lightning Bolts */}
                    <svg
                      viewBox="0 0 600 700"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full"
                    >
                      <defs>
                        <filter id="lightningGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur1" />
                          <feGaussianBlur stdDeviation="8" result="blur2" />
                          <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Main strike from top right down across the card */}
                      <motion.path
                        d="M 520,0 L 440,90 L 465,100 L 370,220 L 400,235 L 280,360 L 315,380 L 190,520 L 220,540 L 120,700"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#lightningGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1],
                          opacity: [0, 1, 0.15, 0.95, 0.1, 0.85, 0.05, 0.7, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          times: [0, 0.08, 0.18, 0.32, 0.45, 0.6, 0.75, 0.88, 1]
                        }}
                      />

                      {/* Cyan outer core for main strike */}
                      <motion.path
                        d="M 520,0 L 440,90 L 465,100 L 370,220 L 400,235 L 280,360 L 315,380 L 190,520 L 220,540 L 120,700"
                        stroke="#38bdf8"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#lightningGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1],
                          opacity: [0, 0.85, 0.1, 0.75, 0.05, 0.65, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          times: [0, 0.08, 0.2, 0.35, 0.5, 0.7, 1]
                        }}
                      />

                      {/* Branch 1: Toward Jean Grey / X-Men logo */}
                      <motion.path
                        d="M 370,220 L 270,270 L 290,285 L 180,360 L 205,375 L 130,440"
                        stroke="#7dd3fc"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#lightningGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1],
                          opacity: [0, 0.9, 0.1, 0.8, 0.05, 0]
                        }}
                        transition={{
                          duration: 1.3,
                          delay: 0.1,
                          times: [0, 0.15, 0.35, 0.55, 0.75, 1]
                        }}
                      />

                      {/* Branch 2: Electric Yellow arc (Storm's thunder energy) */}
                      <motion.path
                        d="M 465,100 L 530,160 L 510,180 L 570,260"
                        stroke="#fef08a"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#lightningGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1],
                          opacity: [0, 0.8, 0.1, 0.7, 0]
                        }}
                        transition={{
                          duration: 1.1,
                          delay: 0.15,
                          times: [0, 0.2, 0.4, 0.7, 1]
                        }}
                      />

                      {/* Branch 3: Lower ground spark */}
                      <motion.path
                        d="M 280,360 L 360,420 L 340,435 L 420,510"
                        stroke="#e0f2fe"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#lightningGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1],
                          opacity: [0, 0.85, 0.05, 0.7, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.22,
                          times: [0, 0.2, 0.45, 0.7, 1]
                        }}
                      />
                    </svg>

                    {/* Electric spark particles */}
                    <motion.div
                      animate={{
                        scale: [0, 1.4, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="absolute top-[28%] right-[32%] w-3 h-3 rounded-full bg-cyan-300 blur-[1px] shadow-[0_0_12px_#38bdf8]"
                    />
                    <motion.div
                      animate={{
                        scale: [0, 1.6, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 0.7, delay: 0.25 }}
                      className="absolute top-[52%] left-[28%] w-3 h-3 rounded-full bg-yellow-200 blur-[1px] shadow-[0_0_12px_#facc15]"
                    />
                    <motion.div
                      animate={{
                        scale: [0, 1.3, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 0.9, delay: 0.18 }}
                      className="absolute bottom-[22%] left-[45%] w-2.5 h-2.5 rounded-full bg-white blur-[1px] shadow-[0_0_10px_#ffffff]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                {/* Official Marvel Style Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#ED1D24] text-white font-black px-4 py-1.5 rounded tracking-tighter text-2xl font-sans uppercase shadow-lg shadow-red-600/30">
                      MARVEL
                    </div>
                    {isMarvelLightningActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(56,189,248,0.3)] animate-pulse"
                      >
                        <Zap className="w-3 h-3 text-cyan-300 fill-cyan-300" />
                        Blesky bouře Storm
                      </motion.span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerMarvelLightning();
                    }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-400/40 transition-colors cursor-pointer flex items-center gap-1"
                    title="Aktivovat blesky"
                  >
                    <Zap className="w-3 h-3" />
                    <span>X-Men & Mutanti</span>
                  </button>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">
                  X-Meni & Oblíbené hrdinky: Storm, Jean Grey a Scarlet Witch
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  U Marvelu jednoznačně kralují <span className="text-white font-semibold">X-Meni</span> a svět mutantů – boj za přijetí, ochranu světa a hledání identity. Mým absolutním favoritem jsou silné, ikonické hrdinky s fascinující mocí a vnitřní komplexitou.
                </p>

                {/* Favorite Characters Spotlight */}
                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  <div className={`p-2.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                    isMarvelLightningActive
                      ? 'bg-sky-950/50 border-cyan-500/50 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-slate-900/80 border-red-900/30'
                  }`}>
                    <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold text-[11px] shrink-0 border border-yellow-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      Storm
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Ororo Munroe:</strong> Bohyně počasí, vládkyně bouří, blesků a větru. Vznešená, spravedlivá a jedna z nejmocnějších vůdkyň X-Menů.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-red-900/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[11px] shrink-0 border border-rose-500/30">
                      Jean Grey
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Phoenix:</strong> Neobyčejně nadaná telepatka a telekinetička, srdce X-Menů, jejíž spojení s kosmickou silou Phoenix Force patří k vrcholům komiksové historie.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-red-900/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-300 font-bold text-[11px] shrink-0 border border-red-600/30">
                      Scarlet Witch
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Wanda Maximoff:</strong> Magie chaosu a ohýbání reality (Reality Warping). Složitá, neuvěřitelně silná postava, která dokáže jedním slovem změnit osud světa.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DC UNIVERSUM CARD – RAVEN, HARLEY QUINN, WONDER WOMAN */}
            <motion.div
              onMouseEnter={handleDcMouseEnter}
              onMouseLeave={handleDcMouseLeave}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl overflow-hidden group transition-all duration-300 border ${
                isDcRavenAuraActive
                  ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.45),inset_0_0_25px_rgba(88,28,135,0.35)]'
                  : 'border-blue-800/40 hover:border-purple-600/50'
              }`}
            >
              {/* Comic dot texture */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Raven Dark Purple Magic Aura Overlay (active for ~2.2s on hover, then calmly clears so text is readable) */}
              <AnimatePresence>
                {isDcRavenAuraActive && (
                  <motion.div
                    key={`dc-raven-aura-${dcRavenAuraKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                  >
                    {/* Deep violet / obsidian ambient misty aura */}
                    <motion.div
                      animate={{
                        opacity: [0, 0.75, 0.85, 0.5, 0],
                        scale: [0.85, 1.1, 1.15, 1.05]
                      }}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/35 via-indigo-950/40 to-transparent mix-blend-screen"
                    />

                    {/* Raven's Dark Magic Swirling Vortex */}
                    <motion.div
                      animate={{
                        rotate: [0, 180, 360],
                        scale: [0.6, 1.25, 1.1, 0.8],
                        opacity: [0, 0.8, 0.6, 0]
                      }}
                      transition={{ duration: 2.2, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,_rgba(147,51,234,0.35)_0%,_rgba(88,28,135,0.3)_35%,_rgba(59,7,100,0.15)_60%,_transparent_80%)] blur-2xl"
                    />

                    {/* Azarath Metrion Zinthos Magic Circle / Occult Runes Ring */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                      animate={{
                        scale: [0.5, 1.05, 1.1, 1],
                        opacity: [0, 0.8, 0.7, 0],
                        rotate: [0, 45, 90]
                      }}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center pointer-events-none"
                    >
                      <svg viewBox="0 0 300 300" className="w-full h-full opacity-70">
                        <defs>
                          <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* Outer Runed Ring */}
                        <circle
                          cx="150"
                          cy="150"
                          r="135"
                          stroke="#c084fc"
                          strokeWidth="1.5"
                          strokeDasharray="4 8 16 8"
                          fill="none"
                          filter="url(#purpleGlow)"
                        />
                        {/* Middle Ring */}
                        <circle
                          cx="150"
                          cy="150"
                          r="110"
                          stroke="#a855f7"
                          strokeWidth="1"
                          strokeDasharray="6 6"
                          fill="none"
                        />
                        {/* Raven Triquetra / Dark Magic Star */}
                        <polygon
                          points="150,45 240,205 60,205"
                          stroke="#e9d5ff"
                          strokeWidth="1.5"
                          fill="none"
                          filter="url(#purpleGlow)"
                          opacity="0.8"
                        />
                        <polygon
                          points="150,255 60,95 240,95"
                          stroke="#c084fc"
                          strokeWidth="1.5"
                          fill="none"
                          filter="url(#purpleGlow)"
                          opacity="0.8"
                        />
                        {/* Inner Soul-Self Portal */}
                        <circle
                          cx="150"
                          cy="150"
                          r="55"
                          stroke="#d8b4fe"
                          strokeWidth="2"
                          fill="rgba(59, 7, 100, 0.25)"
                          filter="url(#purpleGlow)"
                        />
                        {/* Raven Silhouette glyph in center */}
                        <path
                          d="M 150,120 Q 140,140 125,150 Q 140,155 150,175 Q 160,155 175,150 Q 160,140 150,120 Z"
                          fill="#c084fc"
                          filter="url(#purpleGlow)"
                        />
                        {/* Extended raven shadow wings */}
                        <path
                          d="M 125,150 C 95,130 65,145 45,175 C 75,170 105,165 125,150 Z"
                          fill="#7e22ce"
                          opacity="0.85"
                          filter="url(#purpleGlow)"
                        />
                        <path
                          d="M 175,150 C 205,130 235,145 255,175 C 225,170 195,165 175,150 Z"
                          fill="#7e22ce"
                          opacity="0.85"
                          filter="url(#purpleGlow)"
                        />
                      </svg>
                    </motion.div>

                    {/* Floating Soul-self Purple Magic Sparks / Embers */}
                    {[
                      { left: '20%', bottom: '15%', delay: 0.1, size: 'w-2 h-2' },
                      { left: '35%', bottom: '25%', delay: 0.35, size: 'w-2.5 h-2.5' },
                      { left: '50%', bottom: '10%', delay: 0.2, size: 'w-3 h-3' },
                      { left: '68%', bottom: '20%', delay: 0.4, size: 'w-2 h-2' },
                      { left: '80%', bottom: '30%', delay: 0.15, size: 'w-2.5 h-2.5' },
                      { left: '28%', bottom: '45%', delay: 0.5, size: 'w-1.5 h-1.5' },
                      { left: '72%', bottom: '50%', delay: 0.6, size: 'w-2 h-2' },
                    ].map((orb, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -110],
                          opacity: [0, 0.9, 0],
                          scale: [0.6, 1.3, 0.4]
                        }}
                        transition={{
                          duration: 1.6,
                          delay: orb.delay,
                          ease: "easeOut"
                        }}
                        style={{ left: orb.left, bottom: orb.bottom }}
                        className={`absolute ${orb.size} rounded-full bg-purple-300 blur-[1px] shadow-[0_0_12px_#c084fc]`}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                {/* Official DC Style Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#0078F0] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-600/30 font-sans tracking-tight">
                      DC
                    </div>
                    {isDcRavenAuraActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.35)] animate-pulse"
                      >
                        <Sparkles className="w-3 h-3 text-purple-300" />
                        Aura Raven (Azarath Metrion Zinthos)
                      </motion.span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerDcRavenAura();
                    }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400/40 transition-colors cursor-pointer flex items-center gap-1"
                    title="Aktivovat auru Raven"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>DC Universe</span>
                  </button>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">
                  Oblíbené hrdinky: Raven, Harley Quinn & Wonder Woman
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  V DC mě nejvíce oslovují jedinečné ženské charaktery – od temné mystiky a telekineze přes nespoutaný chaos až po ušlechtilou mytologickou sílu a pravdu.
                </p>

                {/* Favorite Characters Spotlight */}
                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  <div className={`p-2.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                    isDcRavenAuraActive
                      ? 'bg-purple-950/60 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-slate-900/80 border-blue-900/30'
                  }`}>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[11px] shrink-0 border border-purple-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-300" />
                      Raven
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Rachel Roth (Azarath Metrion Zinthos):</strong> Polodémonská empatka z Teen Titans, která ovládá temnou magii a stíny, zatímco svádí neustálý boj s temnotou svého otce Trigona.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-900/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[11px] shrink-0 border border-rose-500/30">
                      Harley Quinn
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Dr. Harleen Quinzel:</strong> Nespoutaná rebelka, geniální psychiatrička a ikona gothamského chaosu. Nepředvídatelná, vtipná i nebezpečná.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-900/30 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px] shrink-0 border border-amber-500/30">
                      Wonder Woman
                    </span>
                    <p className="text-slate-300">
                      <strong className="text-white">Diana Prince:</strong> Amazonská princezna z ostrova Themyscira, bojovnice za spravedlnost, mír a pravdu s Lasem pravdy. Ztělesnění odvahy a cti.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
