import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { StorioMascot } from './StorioMascot';

export interface BookToEvaluate {
  id: number;
  title: string;
  author: string;
  year: string;
  defectDesc: string;
  isAcceptable: boolean;
  explanation: string;
}

const INITIAL_BOOKS: BookToEvaluate[] = [
  {
    id: 1,
    title: "Vražda v Orient expresu",
    author: "Agatha Christie",
    year: "1985",
    defectDesc: "Kniha je politá tekutinou, listy jsou na spodní hraně ztuhlé, zvlněné a se žlutohnědými mapami.",
    isAcceptable: false,
    explanation: "Polité knihy mají nenávratně narušenou strukturu papíru a znehodnocené stránky. Patří do kategorie Vráceno."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: "2015",
    defectDesc: "Čistý svazek, pevná vazba, kompletní text bez vpisů, platný čárový kód a ISBN.",
    isAcceptable: true,
    explanation: "Kniha je v bezvadném stavu, kompletní a s platným ISBN. Patří do kategorie Přijato."
  },
  {
    id: 3,
    title: "Kapesní atlas hub",
    author: "František Smotlacha",
    year: "1964",
    defectDesc: "Staré vydání. Na obálce ani v tiráži není uvedeno mezinárodní číslo ISBN ani čárový kód.",
    isAcceptable: false,
    explanation: "Knihy bez ISBN nelze v online systému antikvariátu automaticky identifikovat a zalistovat do výkupu. Patří do kategorie Vráceno."
  },
  {
    id: 4,
    title: "Hobit aneb Cesta tam a zase zpátky",
    author: "J. R. R. Tolkien",
    year: "1994",
    defectDesc: "Kniha byla skladována ve vlhkém sklepě, na předsádce jsou šedozelené tečky plísně a z vazby vychází zatuchlý zápach.",
    isAcceptable: false,
    explanation: "Plesnivé knihy představují hygienické riziko a mohly by ve skladu nakazit další svazky. Patří do kategorie Vráceno."
  },
  {
    id: 5,
    title: "Babička",
    author: "Božena Němcová",
    year: "1998",
    defectDesc: "Běžné čtenářské opotřebení odpovídající věku, desky lehce otlačené, vazba drží, listy čisté, ISBN v pořádku.",
    isAcceptable: true,
    explanation: "Běžně čtená kniha bez mechanického poškození a s platným ISBN. Patří do kategorie Přijato."
  },
  {
    id: 6,
    title: "Malý princ",
    author: "Antoine de Saint-Exupéry",
    year: "2008",
    defectDesc: "Rozpadlý hřbet, uvolněné šití a u prostředního bloku chybí 3 vnitřní stránky.",
    isAcceptable: false,
    explanation: "Chybějící stránky a rozpadlá vazba znemožňují plnohodnotné čtení. Patří do kategorie Vráceno."
  },
  {
    id: 7,
    title: "Duna",
    author: "Frank Herbert",
    year: "2021",
    defectDesc: "Zánovní stav z knihkupectví, nepomačkané rohy, nečtená, ostré hrany, ISBN bez vady.",
    isAcceptable: true,
    explanation: "Skvělý stav jako nový, okamžitě připravený k dalšímu prodeji. Patří do kategorie Přijato."
  },
  {
    id: 8,
    title: "Učebnice obecné psychologie",
    author: "Kolektiv autorů",
    year: "2018",
    defectDesc: "V textu jsou na téměř každé kapitole agresivní poznámky propiskou a pasáže zažlucené neonovým zvýrazňovačem.",
    isAcceptable: false,
    explanation: "Silně počmárané a zvýrazňovačem znehodnocené knihy nelze v antikvariátu vykoupit. Patří do kategorie Vráceno."
  }
];

export const RestorioSortingGame: React.FC = () => {
  const [books, setBooks] = useState<BookToEvaluate[]>(INITIAL_BOOKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastVerdict, setLastVerdict] = useState<{
    success: boolean;
    choice: 'red' | 'green';
    explanation: string;
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentBook = books[currentIndex];

  const handleDecision = (zone: 'red' | 'green') => {
    if (!currentBook) return;

    const isCorrect = (zone === 'green' && currentBook.isAcceptable) || (zone === 'red' && !currentBook.isAcceptable);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setLastVerdict({
      success: isCorrect,
      choice: zone,
      explanation: currentBook.explanation
    });

    if (currentIndex + 1 >= books.length) {
      setIsGameOver(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setBooks([...INITIAL_BOOKS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setCorrectCount(0);
    setLastVerdict(null);
    setIsGameOver(false);
  };

  return (
    <div className="bg-[#0B0E17] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative top title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/80">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
            Interaktivní minihra výkupu Restorio
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Zkuste si zjednodušenou verzi mé práce
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Přečtěte si záznam o stavu knihy a rozhodněte sami: vady (politá, plesnivá, potrhaná, nemá ISBN...) patří do <strong className="text-red-400">Vráceno</strong>. Knihy v pořádku do <strong className="text-emerald-400">Přijato</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <StorioMascot size="sm" showLabel={true} />
          <div className="px-3 py-1.5 rounded-lg bg-[#141824] border border-slate-800 text-xs font-mono text-slate-300">
            Kniha: <span className="text-white font-bold">{Math.min(currentIndex + 1, books.length)}</span> / {books.length}
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="p-1.5 rounded-lg bg-[#141824] hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Spustit novou várku"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isGameOver && currentBook ? (
        <div>
          {/* Main Sorting Desk */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: VRÁCENO */}
            <div className="md:col-span-3 flex flex-col">
              <button
                type="button"
                onClick={() => handleDecision('red')}
                className="w-full h-full min-h-[170px] p-5 rounded-2xl bg-gradient-to-b from-red-950/40 to-[#180A0E] border-2 border-red-700/60 hover:border-red-500 hover:from-red-950/60 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-lg shadow-red-950/20 active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-red-900/60 border border-red-500/60 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-base font-extrabold text-red-400 uppercase tracking-wider block">
                  VRÁCENO
                </span>
                <span className="text-xs text-red-300/80 mt-1 block">
                  (Vady / Vyřazeno)
                </span>
                <span className="text-[11px] text-slate-400 mt-2 block leading-snug">
                  Politá, plesnivá, potrhaná, nemá ISBN...
                </span>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-red-400 group-hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Označit jako Vráceno</span>
                </div>
              </button>
            </div>

            {/* Center: THE BOOK ON THE INSPECTION TABLE */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <motion.div
                key={currentBook.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#121624] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/60 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Neutral header without spoilers */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Svazek na prohlídku</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    Rok: {currentBook.year}
                  </span>
                </div>

                {/* Book title and author */}
                <div className="my-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {currentBook.title}
                  </h4>
                  <p className="text-sm text-slate-300 mt-0.5 font-medium">
                    Autor: {currentBook.author}
                  </p>
                </div>

                {/* Physical inspection report */}
                <div className="mt-4 p-4 rounded-xl bg-[#0B0E17] border border-slate-800">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Poznámka z fyzické kontroly svazku:
                  </span>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                    {currentBook.defectDesc}
                  </p>
                </div>

                {/* Mobile action buttons */}
                <div className="mt-6 flex items-center justify-between gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={() => handleDecision('red')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-bold border border-red-700 flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Vráceno</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDecision('green')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-700 flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Přijato</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: PŘIJATO */}
            <div className="md:col-span-3 flex flex-col">
              <button
                type="button"
                onClick={() => handleDecision('green')}
                className="w-full h-full min-h-[170px] p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-[#0A1612] border-2 border-emerald-700/60 hover:border-emerald-500 hover:from-emerald-950/60 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-lg shadow-emerald-950/20 active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-base font-extrabold text-emerald-400 uppercase tracking-wider block">
                  PŘIJATO
                </span>
                <span className="text-xs text-emerald-300/80 mt-1 block">
                  (V pořádku do výkupu)
                </span>
                <span className="text-[11px] text-slate-400 mt-2 block leading-snug">
                  Čistá, kompletní, v pořádku do oběhu.
                </span>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-400 group-hover:underline">
                  <span>Označit jako Přijato</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Feedback banner for last sorted book */}
          <AnimatePresence>
            {lastVerdict && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-5 p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                  lastVerdict.success
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/40 border-red-500/40 text-red-200'
                }`}
              >
                {lastVerdict.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <div>
                  <span className="font-bold">
                    {lastVerdict.success ? 'Správné rozhodnutí výkupaře!' : 'Chybné zařazení!'}
                  </span>{' '}
                  <span>{lastVerdict.explanation}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Game completion summary */
        <div className="py-8 text-center max-w-lg mx-auto">
          <div className="flex justify-center mb-3">
            <StorioMascot size="lg" showLabel={true} />
          </div>

          <h4 className="text-2xl font-bold text-white mb-2">
            Várka knih úspěšně posouzena!
          </h4>
          <p className="text-sm text-slate-300 mb-6">
            Správně jste vyhodnotili <strong className="text-emerald-400 font-mono text-base">{correctCount}</strong> z <strong className="font-mono text-base">{books.length}</strong> knih.
          </p>

          <div className="p-4 rounded-xl bg-[#121624] border border-slate-800 text-xs text-slate-300 text-left mb-6 leading-relaxed">
            <span className="font-bold text-white block mb-1">
              Poznámka ze skutečné praxe výkupaře Šimona:
            </span>
            Přesně toto je podstata mé práce v Restoriu: rychlé oko pro detail, schopnost vteřinově rozpoznat skrytou plíseň, zvlnění po polití kapalinou, chybějící ISBN nebo vytržené listy – a označit knihu jako Vráceno, aby se k zákazníkům dostaly pouze spolehlivé svazky.
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-900/30"
          >
            Vyzkoušet další várku knih
          </button>
        </div>
      )}
    </div>
  );
};
