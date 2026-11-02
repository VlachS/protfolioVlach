import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { EducationWork } from './components/EducationWork';
import { Hobbies } from './components/Hobbies';
import { ThinkingMazeGame } from './components/ThinkingMazeGame';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col selection:bg-purple-600/30 selection:text-purple-200">
      {/* Top navigation */}
      <Navbar />

      {/* Main content sections */}
      <main className="flex-1">
        {/* Úvod / Hero (s fotkou a vykukující žirafou) */}
        <Hero />

        {/* Sekce o mně (Věk 21, Cheb-Praha-Brno mapka, INFP, žirafa a slon, kocour a fenka fotky, fantasy knihy) */}
        <AboutMe />

        {/* Vzdělání a práce (včetně minihry výkupu Restorio: Vráceno vs. Přijato) */}
        <EducationWork />

        {/* Zájmy (Top 3 aplikace s trofejemi, Taylor Swift - tolerate it, Oblíbené knihy s obálkami, Marvel & DC) */}
        <Hobbies />

        {/* Jak přemýšlím (Minihra: myšlenka uzamčená přísně v kolejích bludiště se slepými uličkami) */}
        <ThinkingMazeGame />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
