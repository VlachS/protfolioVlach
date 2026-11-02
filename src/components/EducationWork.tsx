import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  ExternalLink, 
  BookOpen, 
  Library, 
  CheckCircle, 
  Layers,
  Barcode,
  Package
} from 'lucide-react';
import { RestorioSortingGame } from './RestorioSortingGame';
import { StorioMascot } from './StorioMascot';

export const EducationWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'work'>('all');

  return (
    <section id="vzdelani-prace" className="py-24 bg-[#090A0F] relative">
      {/* Subtle ambient divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-blue-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Moje profesní a studijní cesta</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Vzdělání a práce
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-2xl">
              Studium informačních studií na FF MUNI a práce výkupaře v online antikvariátu Restorio.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center p-1 bg-[#121622] rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vše dohromady
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pouze vzdělání
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'work'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pouze práce (Restorio)
            </button>
          </div>
        </div>

        {/* Content Layout: Education & Work Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Main Timeline Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* EDUCATION 1: MUNI FF 2026 */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F131D] border border-slate-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">
                        Vysokoškolské studium · 2026
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Informační studia a knihovnictví
                      </h3>
                      <p className="text-sm text-slate-300">
                        Filozofická fakulta Masarykovy univerzity (FF MUNI)
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-4">
                  Navazující akademické studium zaměřené na informační vědu, informační architekturu, data a organizaci znalostí.
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-400">Zaměření:</span>
                  <span>Informační věda</span>
                  <span aria-hidden="true">·</span>
                  <span>Organizace dat</span>
                  <span aria-hidden="true">·</span>
                  <span>FF MUNI Brno</span>
                </div>
              </motion.div>
            )}

            {/* EDUCATION 2: Střední škola KIS 2021-2025 */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F131D] border border-slate-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
                      <Library className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-purple-400 tracking-wide uppercase">
                        Středoškolské vzdělání · 2021–2025
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Knihovnické a informační služby
                      </h3>
                      <p className="text-sm text-slate-300">
                        Střední škola v oboru Knihovnické a informační služby
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-4">
                  Čtyřleté studium oboru Knihovnické a informační služby: katalogizace, správa knihovního fondu, bibliografie a informační systémy.
                </p>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-400">Základy oboru:</span>
                  <span>Knihovnictví</span>
                  <span aria-hidden="true">·</span>
                  <span>Katalogizace</span>
                  <span aria-hidden="true">·</span>
                  <span>Informační služby</span>
                </div>
              </motion.div>
            )}

            {/* WORK: Restorio */}
            {(activeTab === 'all' || activeTab === 'work') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F131D] border border-emerald-900/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                        Pracovní zkušenost
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">
                        Výkupař
                      </h3>
                      <p className="text-sm text-emerald-300/90 font-medium">
                        Online antikvariát Restorio
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <StorioMascot size="sm" showLabel={true} />
                    <a
                      href="https://www.restorio.cz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-lg transition-colors shrink-0"
                    >
                      <span>Navštívit Restorio.cz</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  V Restoriu mám na starosti kontrolu fyzického stavu přicházejících knih a jejich zařazení do toku. Výkupní cena je daná systémem – mým úkolem je ověřit, zda kniha nemá vady (polití, plíseň, potrhání, počmárání, chybějící listy či chybějící ISBN), a posoudit, zda vyhovuje k přijetí do dalšího prodeje. Dále také dotiskávám EAN kódy knihám, kterým chybí, a zpracovávám prázdné bedny, což jsou zvláštní typ objednávek.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <div className="p-3 rounded-xl bg-[#141A26] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Kontrola fyzického stavu</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Rychlá a přesná kontrola vad: čistota, pevnost vazby, absence plísně a kontrola ISBN.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141A26] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                      <Barcode className="w-3.5 h-3.5" />
                      <span>Dotisk EAN kódů</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Dotiskávám EAN čárové kódy knihám, kterým chybí nebo jsou nečitelné, pro správnou evidenci v systému.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141A26] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                      <Package className="w-3.5 h-3.5" />
                      <span>Zpracování prázdných beden</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Zpracovávám prázdné bedny – zvláštní typ zakázek v logistice pro oběh zásilek a expedici.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141A26] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Třídění do toku</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Knihy v pořádku jsou označeny jako Přijato k naskladnění, poškozené jako Vráceno.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: "Co obnáší práce výkupaře" */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F131D] border border-slate-800 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Práce v Restoriu</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Přesná kontrola & logistika
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Při výkupu nerozhoduji o ceně – ta je pevně stanovena systémem. Moje zodpovědnost spočívá v odhalení mechanických vad a chybějících údajů, dotisku čárových kódů a správě zvláštních objednávek prázdných beden.
              </p>

              <div className="p-4 rounded-xl bg-[#121624] border border-slate-800">
                <span className="text-xs font-semibold text-white block mb-2">
                  Činnosti v antikvariátu:
                </span>
                <ul className="text-xs text-slate-300 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">🟢 Přijato:</span>
                    <span>Knihy splňující podmínky pro naskladnění a další prodej čtenářům.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">🔴 Vráceno:</span>
                    <span>Knihy s vadami – polité, plesnivé, potrhané, počmárané nebo bez možnosti identifikace.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0">🏷️ Dotisk EAN:</span>
                    <span>Dotiskování EAN kódů knihám, kterým kód chybí, aby je systém mohl naskladnit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">📦 Prázdné bedny:</span>
                    <span>Zpracování prázdných beden – zvláštní typ objednávek v rámci logistického toku.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The Restorio Sorting Minigame */}
        <div className="mt-8">
          <RestorioSortingGame />
        </div>
      </div>
    </section>
  );
};
