import React from 'react';
import { Castle, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface GothicFooterProps {
  onReturnToGates: () => void;
  onOpenMembership: () => void;
}

export const GothicFooter: React.FC<GothicFooterProps> = ({
  onReturnToGates,
  onOpenMembership,
}) => {
  return (
    <footer className="relative border-t border-[#2d141b] bg-[#030204] pt-20 pb-14 text-stone-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top Footer Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-14 border-b border-[#1c0d12]">
          {/* Brand & Exact Requested Credentials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-['Cinzel_Decorative'] text-2xl font-bold tracking-widest text-[#fbf7f8]">
              THE MIDNIGHT SOCIETY
            </h3>
            <div className="mt-1 font-['Cinzel'] text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              AWS STUDENT BUILDERS GROUP
            </div>
            <div className="font-['Cinzel'] text-xs tracking-wider text-stone-300 uppercase mt-0.5">
              MVJ COLLEGE OF ENGINEERING
            </div>

            {/* Exact Motto Requested */}
            <p className="mt-4 font-['Cormorant_Garamond'] text-lg text-amber-200/90 italic tracking-wide">
              &ldquo;BUILD AFTER DARK. CREATE BEYOND LIMITS.&rdquo;
            </p>
          </div>

          {/* Return to Gates Button & Membership Trigger */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => {
                gothicAudio.playGateOpening();
                onReturnToGates();
              }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded border border-[#3b1720] bg-[#120509]/80 text-xs font-['Cinzel'] tracking-wider text-stone-300 hover:text-amber-300 hover:border-amber-700 transition-colors cursor-pointer"
            >
              <Castle className="h-4 w-4 text-red-500" />
              <span>RETURN TO CASTLE GATES</span>
            </button>

            <button
              onClick={() => {
                gothicAudio.playSubtleTick();
                onOpenMembership();
              }}
              className="px-6 py-2.5 rounded text-xs font-['Cinzel'] font-bold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#7b0d1e] to-[#450912] border border-[#d6a45a]/60 hover:from-[#961226] transition-all cursor-pointer"
            >
              JOIN THE SOCIETY
            </button>
          </div>
        </div>

        {/* Middle Row: Elegant Navigation Links & Social Link Placeholders */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1c0d12] text-xs font-['Cinzel']">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 tracking-widest text-stone-300">
            <a href="#home" className="hover:text-red-400 transition-colors">HOME</a>
            <a href="#about" className="hover:text-red-400 transition-colors">ABOUT</a>
            <a href="#divisions" className="hover:text-red-400 transition-colors">DIVISIONS</a>
            <a href="#leadership" className="hover:text-red-400 transition-colors">LEADERSHIP</a>
            <a href="#events" className="hover:text-red-400 transition-colors">EVENTS</a>
            <a href="#contact" className="hover:text-red-400 transition-colors">CONTACT</a>
          </div>

          {/* Social Link Placeholders */}
          <div className="flex items-center gap-4 text-stone-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="Instagram (Placeholder)"
              className="p-2 rounded border border-[#2d141b] hover:text-red-400 hover:border-red-700 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn (Placeholder)"
              className="p-2 rounded border border-[#2d141b] hover:text-red-400 hover:border-red-700 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              title="GitHub (Placeholder)"
              className="p-2 rounded border border-[#2d141b] hover:text-red-400 hover:border-red-700 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              title="X / Twitter (Placeholder)"
              className="p-2 rounded border border-[#2d141b] hover:text-red-400 hover:border-red-700 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Attribution Notice */}
        <div className="pt-8 text-center text-[10px] text-stone-500 font-['Plus_Jakarta_Sans'] leading-relaxed max-w-4xl mx-auto">
          The Midnight Society is an independent student developer community at MVJ College of Engineering recognized under the Amazon Web Services (AWS) Student Builders program. Amazon Web Services, AWS, and related marks are trademarks of Amazon.com, Inc. or its affiliates.
        </div>
      </div>
    </footer>
  );
};
