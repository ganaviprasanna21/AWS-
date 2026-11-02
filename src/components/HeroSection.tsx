import React from 'react';
import { ArrowDown, Flame, Moon, Terminal } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface HeroSectionProps {
  onOpenMembership: () => void;
  onOpenArchitectureModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMembership,
  onOpenArchitectureModal,
}) => {
  return (
    <section id="home" className="relative min-h-[94vh] pt-28 pb-20 flex items-center overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-red-950/25 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 relative z-20">
        {/* Editorial Subtitle / Identity */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] font-['Cinzel'] text-red-500 font-semibold mb-4">
          <Moon className="h-3.5 w-3.5" />
          <span>AWS Student Builders Group · MVJ College of Engineering</span>
        </div>

        {/* 2-Column Split: Editorial Typography & Gothic Sanctum Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Column 1: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Exact Hero Heading Requested */}
            <h1 className="font-['Cinzel'] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbf7f8] leading-[1.12] text-balance">
              WHERE DISTRIBUTED CLOUD ARCHITECTURE MEETS THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-amber-200">
                SHADOWS OF MIDNIGHT.
              </span>
            </h1>

            {/* Exact Supporting Text Requested */}
            <p className="mt-6 font-['Cormorant_Garamond'] text-xl sm:text-2xl text-stone-300 leading-relaxed max-w-2xl italic">
              A community of curious minds, ambitious builders and future innovators exploring cloud technology, artificial intelligence and the possibilities of tomorrow.
            </p>

            {/* Quiet unboxed metadata line */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs tracking-wider font-['Cinzel'] text-stone-400">
              <span className="text-red-400 font-semibold">MVJCE Chapter</span>
              <span aria-hidden="true">·</span>
              <span>Cloud & Serverless</span>
              <span aria-hidden="true">·</span>
              <span>GenAI on AWS</span>
            </div>

            {/* Exact Buttons Requested: EXPLORE THE SOCIETY and MEET OUR LEADERS */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#about"
                onClick={() => gothicAudio.playSubtleTick()}
                className="px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase font-['Cinzel'] text-white bg-gradient-to-r from-[#7b0d1e] via-[#9e1327] to-[#7b0d1e] border border-[#d6a45a]/70 rounded shadow-[0_0_25px_rgba(184,20,36,0.45)] hover:shadow-[0_0_35px_rgba(230,25,46,0.6)] transition-all whitespace-nowrap"
              >
                EXPLORE THE SOCIETY
              </a>

              <a
                href="#leadership"
                onClick={() => gothicAudio.playSubtleTick()}
                className="px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase font-['Cinzel'] text-stone-300 border border-[#3d272e] rounded bg-[#10090c]/80 hover:border-red-700/60 hover:text-white transition-all whitespace-nowrap"
              >
                MEET OUR LEADERS
              </a>
            </div>

            {/* Adjacency Credo */}
            <div className="mt-10 border-t border-[#2d1b22] pt-6 flex items-start gap-4">
              <div className="h-9 w-9 rounded-full bg-[#1e070c] border border-[#5a1b24] flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                <Terminal className="h-4 w-4" />
              </div>
              <div className="text-xs text-stone-400 font-['Plus_Jakarta_Sans'] leading-normal">
                <span className="font-semibold text-stone-200">The Midnight Credo:</span> We turn curiosity into creation through hands-on cloud labs, architecture reviews, and nocturnal hackathon builds at MVJ College of Engineering.
              </div>
            </div>
          </div>

          {/* Column 2: Ornate Grimoire Sanctum Card (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group rounded-lg overflow-hidden border border-[#522b35]/60 bg-gradient-to-b from-[#180a0f] to-[#0a0608] shadow-[0_15px_45px_rgba(0,0,0,0.85)]">
              {/* Ornate Filigree Corners */}
              <div className="filigree-corner-tl !border-red-400/80" />
              <div className="filigree-corner-tr !border-red-400/80" />
              <div className="filigree-corner-bl !border-red-400/80" />
              <div className="filigree-corner-br !border-red-400/80" />

              {/* Sanctum Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/src/assets/images/cloud_grimoire_sanctum_1793608988620.jpg"
                  alt="Gothic Cloud Grimoire Sanctum"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e070b] via-transparent to-black/30" />

                {/* Floating Arcane Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded border border-red-900/60 bg-black/75 px-3 py-1 text-[11px] font-['Cinzel'] tracking-wider text-amber-200/90 backdrop-blur-sm">
                  <Flame className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                  <span>The Nocturnal Archive</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-['Cinzel'] text-stone-400 mb-2">
                  <span>MVJCE CHAPTER</span>
                  <span className="text-red-400">AWS Cloud Sanctuary</span>
                </div>

                <h2 className="font-['Cinzel'] text-lg font-bold text-stone-100 group-hover:text-red-300 transition-colors">
                  The Distributed Systems Grimoire
                </h2>

                <p className="mt-2 font-['Cormorant_Garamond'] text-sm text-stone-300 leading-relaxed italic">
                  An editorial sanctuary of nocturnal blueprints, Lambda event choreography, and high-availability multi-region architectures.
                </p>

                <div className="mt-4 pt-4 border-t border-[#2b171e] flex items-center justify-between">
                  <span className="text-[11px] font-['Cinzel'] tracking-wider text-stone-400">
                    SANCTUM · ONLINE
                  </span>
                  <button
                    onClick={() => {
                      gothicAudio.playSubtleTick();
                      onOpenArchitectureModal();
                    }}
                    className="text-xs font-['Cinzel'] font-bold text-red-400 hover:text-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Launch Blueprint</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Anchor */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            onClick={() => gothicAudio.playSubtleTick()}
            className="flex flex-col items-center gap-2 text-stone-500 hover:text-red-400 transition-colors group"
          >
            <span className="text-[10px] font-['Cinzel'] tracking-[0.3em] uppercase">
              Descend Into The Society
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce text-red-600 group-hover:text-red-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
