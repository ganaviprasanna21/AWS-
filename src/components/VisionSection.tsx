import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface VisionSectionProps {
  onOpenMembership: () => void;
}

export const VisionSection: React.FC<VisionSectionProps> = ({ onOpenMembership }) => {
  return (
    <section className="relative py-32 overflow-hidden border-y border-[#2d141b] bg-[#050306]">
      {/* Animated Red Light Streaks & Cosmic Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[2px] w-[500px] bg-gradient-to-r from-transparent via-red-600/60 to-transparent blur-sm rotate-12 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 h-[2px] w-[600px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent blur-sm -rotate-6 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-red-950/20 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 text-center flex flex-col items-center">
        {/* Subtle Ivory Gothic Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-['Cinzel'] text-red-500 font-semibold mb-6">
          <Compass className="h-4 w-4" />
          <span>Our Vision · The Midnight Manifesto</span>
        </div>

        {/* Exact Heading Requested */}
        <h2 className="font-['Cinzel'] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbf7f8] leading-tight text-balance">
          THE FUTURE DOESN&apos;T BUILD ITSELF.
        </h2>

        {/* Exact Supporting Text Requested */}
        <p className="mt-8 font-['Cormorant_Garamond'] text-xl sm:text-2xl text-stone-200 italic leading-relaxed max-w-3xl">
          &ldquo;We believe the next generation of technology leaders begins with curiosity, courage and the willingness to build. Our goal is to create an environment where students can experiment, learn together and turn ambitious ideas into meaningful innovations.&rdquo;
        </p>

        {/* Ornate Divider with Wax Seal Emblem */}
        <div className="mt-10 flex items-center justify-center gap-4 w-full max-w-md">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-800/80" />
          <div className="h-8 w-8 rounded-full bg-[#20080e] border border-[#52131e] flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(184,20,36,0.6)]">
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-800/80" />
        </div>

        <div className="mt-10">
          <button
            onClick={() => {
              gothicAudio.playGothicBell(130, 2.5, 0.3);
              onOpenMembership();
            }}
            className="px-9 py-4 text-xs font-['Cinzel'] font-bold tracking-[0.22em] uppercase text-white bg-gradient-to-r from-[#7b0d1e] via-[#9e1327] to-[#7b0d1e] border border-[#d6a45a]/70 rounded shadow-[0_0_25px_rgba(184,20,36,0.5)] hover:shadow-[0_0_35px_rgba(230,25,46,0.7)] transition-all cursor-pointer"
          >
            BECOME A BUILDER
          </button>
        </div>
      </div>
    </section>
  );
};
