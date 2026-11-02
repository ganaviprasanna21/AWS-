import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Castle } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface GothicNavbarProps {
  onOpenMembership: () => void;
  onReturnToGates: () => void;
}

export const GothicNavbar: React.FC<GothicNavbarProps> = ({
  onOpenMembership,
  onReturnToGates,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = gothicAudio.toggleMute();
    setIsMuted(muted);
    gothicAudio.playSubtleTick();
  };

  // Exactly requested nav links: HOME, ABOUT, DIVISIONS, LEADERSHIP, EVENTS, CONTACT
  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'DIVISIONS', href: '#divisions' },
    { name: 'LEADERSHIP', href: '#leadership' },
    { name: 'EVENTS', href: '#events' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavLinkClick = () => {
    gothicAudio.playSubtleTick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#08060a]/95 backdrop-blur-md border-b border-[#3b1219]/70 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
          : 'bg-gradient-to-b from-[#08060a]/90 via-[#08060a]/50 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-['Cinzel_Decorative'] text-lg sm:text-xl font-bold tracking-widest text-[#f5eff1] hover:text-red-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
          <span>THE MIDNIGHT SOCIETY</span>
        </a>

        {/* Zone 2: Requested navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-['Cinzel'] font-semibold text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavLinkClick}
              className="relative py-1 hover:text-red-400 transition-colors whitespace-nowrap shrink-0 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + audio control */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="flex h-9 w-9 items-center justify-center rounded border border-[#3b1219] bg-[#120609]/70 text-stone-400 hover:text-red-400 hover:border-red-900 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-stone-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-red-500" />
            )}
          </button>

          {/* Return to Gates button */}
          <button
            onClick={() => {
              gothicAudio.playGateOpening();
              onReturnToGates();
            }}
            title="Return to Castle Gates"
            aria-label="Return to Castle Gates"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded border border-[#3b1219] bg-[#120609]/70 text-stone-400 hover:text-amber-400 hover:border-amber-800 transition-colors"
          >
            <Castle className="h-4 w-4" />
          </button>

          {/* Primary CTA: Join Society */}
          <button
            onClick={() => {
              gothicAudio.playSubtleTick();
              onOpenMembership();
            }}
            className="relative px-5 py-2 text-xs font-bold tracking-[0.18em] uppercase font-['Cinzel'] text-stone-100 bg-gradient-to-r from-[#7b0d1e] to-[#450912] border border-[#d6a45a]/60 rounded hover:from-[#961226] hover:to-[#570a16] shadow-[0_0_15px_rgba(123,13,30,0.5)] transition-all whitespace-nowrap shrink-0"
          >
            Join Society
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded border border-[#3b1219] bg-[#120609]/70 text-stone-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#3b1219] bg-[#0c070a]/98 px-6 py-6 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 font-['Cinzel'] text-xs uppercase tracking-widest text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavLinkClick}
                className="py-2 hover:text-red-400 transition-colors border-b border-stone-800/40"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                onReturnToGates();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-stone-400 hover:text-amber-400 text-left"
            >
              <Castle className="h-4 w-4" />
              <span>Return to Castle Gates</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
