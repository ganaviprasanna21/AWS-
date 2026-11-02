import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Shield,
  Sparkles,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';
import { AtmosphereCanvas } from './AtmosphereCanvas.tsx';

interface CinematicIntroProps {
  onEnter: () => void;
}

// Dedicated images: Centered Abandoned House & AWS Cloud Matrix
const ABANDONED_HOUSE_IMAGE = '/src/assets/images/abandoned_gothic_house_1793614523977.jpg';
const AWS_HERO_IMAGE = '/src/assets/images/aws_cloud_matrix_1793612490769.jpg';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  // Stages: 'black' -> 'reveal_exterior' -> 'gates_opening_slowly' -> 'sanctum_revealed'
  const [stage, setStage] = useState<'black' | 'reveal_exterior' | 'gates_opening_slowly' | 'sanctum_revealed'>('black');
  const [isMuted, setIsMuted] = useState(false);
  const [hasLightning, setHasLightning] = useState(false);

  // Preload both images immediately to eliminate loading stalls
  useEffect(() => {
    [ABANDONED_HOUSE_IMAGE, AWS_HERO_IMAGE].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // SCENE 1: Atmospheric start with thunder rumble and lightning flash
  useEffect(() => {
    const thunderTimer = setTimeout(() => {
      gothicAudio.playThunderRumble();
      setHasLightning(true);
      setTimeout(() => setHasLightning(false), 220);
    }, 450);

    const revealTimer = setTimeout(() => {
      setHasLightning(true);
      setTimeout(() => setHasLightning(false), 260);
      setStage('reveal_exterior');
      gothicAudio.startAmbientSoundscape();
    }, 950);

    return () => {
      clearTimeout(thunderTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  // Trigger the ULTRA-SLOW, DRAMATIC, SPOOKY gate opening (6.5 seconds)
  const handleEnterManor = () => {
    if (stage === 'gates_opening_slowly' || stage === 'sanctum_revealed') return;

    // Trigger spooky sound effects immediately (heavy bolt snap, prolonged agonizing hinge groan, haunted wind, death toll gong)
    gothicAudio.playSpookyGateOpening();
    setStage('gates_opening_slowly');

    // Settle into sanctum view after the full, slow 6.5s dramatic gate parting
    setTimeout(() => {
      setStage('sanctum_revealed');
    }, 6500);
  };

  const handleToggleSound = () => {
    const muted = gothicAudio.toggleMute();
    setIsMuted(muted);
    gothicAudio.playSubtleTick();
  };

  const isGateOpen = stage === 'gates_opening_slowly' || stage === 'sanctum_revealed';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#020103] select-none">
      {/* 1. Fast Background Mist & Particle Canvas (Fixed, 60fps) */}
      <AtmosphereCanvas intensity="cinematic" showBats={true} />

      {/* 2. Top Control Bar (Audio mute & Skip) */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
        <div className="flex items-center gap-2.5 text-stone-300 font-['Cinzel']">
          <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626] animate-ping" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
            THE FORGOTTEN VAMPIRE MANOR · AWS STUDENT BUILDERS MVJCE
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 rounded border border-[#3d1820] bg-black/80 px-3 py-1.5 text-stone-300 hover:border-red-700 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-stone-500" /> : <Volume2 className="h-3.5 w-3.5 text-red-500" />}
            <span className="text-[10px] sm:text-[11px] font-['Cinzel'] tracking-wider">{isMuted ? 'Muted' : 'Spooky Audio'}</span>
          </button>

          <button
            onClick={onEnter}
            className="rounded border border-[#521d26] bg-[#1a080d]/85 px-4 py-1.5 text-[10px] sm:text-[11px] font-['Cinzel'] font-bold tracking-widest text-red-300 hover:bg-red-950/90 hover:text-white hover:border-red-600 transition-all cursor-pointer shadow-lg"
          >
            SKIP INTRO
          </button>
        </div>
      </div>

      {/* 3. Main Stage Container with Hardware-Accelerated 3D Perspective */}
      <div className="relative h-full w-full [perspective:1200px] overflow-hidden">
        {/* ================================================================
            LAYER A: Exterior Abandoned Mansion (Under Blood Moon)
            Dims and slowly zooms as gates part over 6.5s
            ================================================================ */}
        <motion.div
          className="absolute inset-0 z-0 will-change-transform"
          animate={
            stage === 'black'
              ? { opacity: 0, scale: 1.05 }
              : stage === 'reveal_exterior'
              ? { opacity: 1, scale: 1 }
              : { opacity: 0.15, scale: 1.3 }
          }
          transition={{ duration: stage === 'black' ? 0.3 : 6.5, ease: [0.22, 0.05, 0.25, 1.0] }}
        >
          <img
            src="/src/assets/images/vampire_mansion_exterior_1793611597989.jpg"
            alt="Abandoned Gothic Vampire Mansion Exterior"
            className="h-full w-full object-cover object-center filter brightness-90 contrast-120"
            referrerPolicy="no-referrer"
          />

          {/* Blood Moon Corona */}
          <div className="pointer-events-none absolute top-[6%] left-[34%] h-[280px] w-[280px] rounded-full bg-red-600/30 blur-3xl animate-pulse" />

          {/* Flickering Tower Windows */}
          <div className="pointer-events-none absolute top-[21%] left-[58%] h-3 w-2 rounded-t-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-pulse" />
          <div className="pointer-events-none absolute top-[27%] left-[56%] h-3.5 w-2.5 rounded-t-full bg-amber-300 shadow-[0_0_14px_#f59e0b] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="pointer-events-none absolute top-[36%] left-[66%] h-4 w-3 rounded-t-full bg-amber-400 shadow-[0_0_16px_#f59e0b] animate-pulse" style={{ animationDelay: '0.8s' }} />

          {/* Deep Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020103] via-transparent to-[#020103]/80" />
        </motion.div>

        {/* ================================================================
            LAYER B: ANIMATED ABANDONED HOUSE REVEALED IN THE CENTER
            Unveiled directly down the path between the slowly parting gates!
            ================================================================ */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden will-change-transform"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            isGateOpen
              ? {
                  opacity: 1,
                  scale: 1.02,
                }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 6.5, ease: [0.22, 0.05, 0.25, 1.0] }}
        >
          {/* Centered Masterpiece Image: Ominous Abandoned Gothic House */}
          <motion.img
            src={ABANDONED_HOUSE_IMAGE}
            alt="Abandoned Gothic House at Midnight"
            className="h-full w-full object-cover object-center filter contrast-125 brightness-95 will-change-transform"
            referrerPolicy="no-referrer"
            animate={{
              scale: isGateOpen ? [1.0, 1.06, 1.03] : 1,
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Blood-Red Harvest Moon Glowing Directly Above the Gable */}
          <div className="pointer-events-none absolute top-[5%] left-1/2 -translate-x-1/2 h-[260px] w-[260px] rounded-full bg-red-600/35 blur-3xl animate-pulse" />

          {/* Flickering Eerie Candlelight Overlays in Upper Arched Attic Windows */}
          <div
            className="pointer-events-none absolute top-[28%] left-[49.5%] -translate-x-1/2 h-5 w-4 rounded-t-full bg-amber-400/80 shadow-[0_0_18px_#f59e0b] animate-pulse"
            style={{ animationDuration: '1.4s' }}
          />
          <div
            className="pointer-events-none absolute top-[29%] left-[61.5%] -translate-x-1/2 h-4 w-3 rounded-t-full bg-amber-300/85 shadow-[0_0_15px_#f59e0b] animate-pulse"
            style={{ animationDuration: '2.1s', animationDelay: '0.4s' }}
          />

          {/* Volumetric Red Light Ray Burst Erupting Behind Parting Gates */}
          <motion.div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gradient-to-r from-red-600/60 via-amber-500/40 to-transparent blur-3xl"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={
              isGateOpen
                ? { opacity: [0, 0.85, 0.35], scale: [0.3, 1.9, 2.5] }
                : { opacity: 0, scale: 0.3 }
            }
            transition={{ duration: 6.5, ease: 'easeOut' }}
          />

          {/* Floating Arcane AWS Cloud Compass Seal */}
          <div className="pointer-events-none absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] flex items-center justify-center opacity-85">
            <motion.div
              className="absolute inset-0 rounded-full border border-red-500/50 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-6 rounded-full border border-amber-500/40 [border-style:dotted]"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Dark Cinematic Vignettes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020103] via-transparent to-[#020103]/85" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020103]/80 via-transparent to-[#020103]/80" />

          {/* Plaque & Action Overlay for Abandoned House AWS Sanctum */}
          <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center justify-end pb-10 sm:pb-14 px-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isGateOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 1.4, delay: 3.0, ease: 'easeOut' }}
              className="flex flex-col items-center text-center max-w-2xl rounded-2xl border border-red-600/60 bg-[#0e0408]/92 backdrop-blur-md p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              <div className="filigree-corner-tl !border-red-400 !h-3 !w-3" />
              <div className="filigree-corner-tr !border-red-400 !h-3 !w-3" />
              <div className="filigree-corner-bl !border-red-400 !h-3 !w-3" />
              <div className="filigree-corner-br !border-red-400 !h-3 !w-3" />

              <div className="flex items-center gap-2 text-xs font-['Cinzel'] font-bold tracking-widest text-red-400">
                <Crown className="h-4 w-4 text-amber-400" />
                <span>THE FORGOTTEN MANOR</span>
                <span className="text-stone-600">·</span>
                <span className="text-amber-300">AWS STUDENT BUILDERS MVJCE</span>
              </div>

              <h2 className="font-['Cinzel_Decorative'] text-2xl sm:text-3xl md:text-4xl font-black text-white mt-1 drop-shadow-md">
                THE NOCTURNAL SANCTUM
              </h2>

              <p className="font-['Cinzel'] text-xs sm:text-sm tracking-[0.25em] text-red-300 uppercase font-semibold mt-0.5">
                BEYOND THE ORDINARY · CLOUD ARCHITECTURE AFTER DARK
              </p>

              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-stone-300 mt-2 max-w-lg leading-relaxed">
                Enter the abandoned vampire manor where nocturnal engineers build distributed cloud systems, Bedrock AI models, and serverless rituals.
              </p>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={onEnter}
                  className="group flex items-center gap-2.5 rounded-lg border border-[#d6a45a] bg-gradient-to-r from-red-900 via-rose-800 to-red-950 px-8 sm:px-10 py-3 shadow-[0_0_25px_rgba(220,38,38,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="font-['Cinzel'] text-xs sm:text-sm font-bold tracking-widest text-white">
                    ENTER THE REALM
                  </span>
                  <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================================================================
            SCENE 2: TWO MASSIVE ANTIQUE 3D IRON GATES
            OPENS ULTRA-SLOWLY & DRAMATICALLY OVER 6.5 SECONDS
            ================================================================ */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
          {/* Left Stone Pillar Anchor */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-28 md:w-36 z-30 bg-gradient-to-r from-[#0d090c] via-[#1a1217] to-transparent border-r-2 border-[#3b222c] shadow-[0_0_40px_rgba(0,0,0,0.9)] flex flex-col justify-between py-12">
            <div className="h-16 w-full bg-[#261921] rounded-r border-y border-r border-[#523744] shadow" />
            <div className="flex flex-col gap-36 pl-2">
              <div className="h-7 w-9 rounded-r bg-[#3b2732] border border-[#6b4757] shadow" />
              <div className="h-7 w-9 rounded-r bg-[#3b2732] border border-[#6b4757] shadow" />
              <div className="h-7 w-9 rounded-r bg-[#3b2732] border border-[#6b4757] shadow" />
            </div>
            <div className="h-20 w-full bg-[#261921] rounded-r border-t border-r border-[#523744] shadow" />
          </div>

          {/* Right Stone Pillar Anchor */}
          <div className="absolute right-0 inset-y-0 w-16 sm:w-28 md:w-36 z-30 bg-gradient-to-l from-[#0d090c] via-[#1a1217] to-transparent border-l-2 border-[#3b222c] shadow-[0_0_40px_rgba(0,0,0,0.9)] flex flex-col justify-between py-12 items-end">
            <div className="h-16 w-full bg-[#261921] rounded-l border-y border-l border-[#523744] shadow" />
            <div className="flex flex-col gap-36 pr-2">
              <div className="h-7 w-9 rounded-l bg-[#3b2732] border border-[#6b4757] shadow" />
              <div className="h-7 w-9 rounded-l bg-[#3b2732] border border-[#6b4757] shadow" />
              <div className="h-7 w-9 rounded-l bg-[#3b2732] border border-[#6b4757] shadow" />
            </div>
            <div className="h-20 w-full bg-[#261921] rounded-l border-t border-l border-[#523744] shadow" />
          </div>

          {/* Gate Leaves Container (100% width, meeting right in the center) */}
          <div className="relative flex h-full w-full max-w-[1400px] px-12 sm:px-24 md:px-32 [transform-style:preserve-3d]">
            {/* ---------------- LEFT GATE PANEL (SLOW DRAMATIC 6.5s OPENING) ---------------- */}
            <motion.div
              className="relative h-full w-1/2 origin-left will-change-transform [transform-style:preserve-3d]"
              animate={
                isGateOpen
                  ? {
                      rotateY: -116,
                      opacity: [1, 1, 0.95, 0.06],
                      transition: { duration: 6.5, ease: [0.22, 0.05, 0.25, 1.0] },
                    }
                  : { rotateY: 0, opacity: 1 }
              }
            >
              <div className="absolute inset-0 flex border-r-4 border-[#2b161f] bg-gradient-to-r from-black/92 via-[#0c080b]/85 to-[#160c12]/80 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
                <img
                  src="/src/assets/images/wrought_iron_gates_texture_1793611598766.jpg"
                  alt="Antique Wrought Iron Gate Left"
                  className="h-full w-full object-cover object-left opacity-65 mix-blend-screen filter contrast-125"
                  referrerPolicy="no-referrer"
                />

                {/* Vertical Iron Filigree Bars */}
                <div className="absolute inset-0 flex justify-around px-4 sm:px-8 py-8 sm:py-12">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="relative h-full w-[4px] bg-gradient-to-b from-[#694e59] via-[#2f1f26] to-[#120a0e] shadow-lg"
                    >
                      <div className="absolute -top-5 -left-[7px] h-0 w-0 border-x-[9px] border-x-transparent border-b-[22px] border-b-[#785b67]" />
                      <div className="absolute top-1/4 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                      <div className="absolute top-1/2 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                      <div className="absolute top-3/4 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                    </div>
                  ))}
                </div>

                {/* Horizontal Heavy Iron Crossbars with Studs */}
                <div className="absolute top-[26%] inset-x-0 h-6 bg-gradient-to-r from-[#38242e] via-[#4a323d] to-[#261820] border-y border-[#755564]/50 shadow-md" />
                <div className="absolute top-[52%] inset-x-0 h-7 bg-gradient-to-r from-[#38242e] via-[#4a323d] to-[#261820] border-y border-[#755564]/50 shadow-md" />
                <div className="absolute top-[78%] inset-x-0 h-6 bg-gradient-to-r from-[#38242e] via-[#4a323d] to-[#261820] border-y border-[#755564]/50 shadow-md" />

                {/* Left Half of Antique Iron Lock Deadbolt */}
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center justify-end pointer-events-none">
                  <div className="h-28 w-14 rounded-l-full bg-gradient-to-l from-[#7b0d1e] to-[#240509] border-l-2 border-y-2 border-[#d6a45a]/80 shadow-[0_0_25px_rgba(184,20,36,0.7)] flex items-center justify-end pr-2">
                    <span className="font-['Cinzel_Decorative'] text-xl font-bold text-amber-200">
                      M
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ---------------- RIGHT GATE PANEL (SLOW DRAMATIC 6.5s OPENING) ---------------- */}
            <motion.div
              className="relative h-full w-1/2 origin-right will-change-transform [transform-style:preserve-3d]"
              animate={
                isGateOpen
                  ? {
                      rotateY: 116,
                      opacity: [1, 1, 0.95, 0.06],
                      transition: { duration: 6.5, ease: [0.22, 0.05, 0.25, 1.0] },
                    }
                  : { rotateY: 0, opacity: 1 }
              }
            >
              <div className="absolute inset-0 flex border-l-4 border-[#2b161f] bg-gradient-to-l from-black/92 via-[#0c080b]/85 to-[#160c12]/80 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
                <img
                  src="/src/assets/images/wrought_iron_gates_texture_1793611598766.jpg"
                  alt="Antique Wrought Iron Gate Right"
                  className="h-full w-full object-cover object-right opacity-65 mix-blend-screen filter contrast-125"
                  referrerPolicy="no-referrer"
                />

                {/* Vertical Iron Filigree Bars */}
                <div className="absolute inset-0 flex justify-around px-4 sm:px-8 py-8 sm:py-12">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="relative h-full w-[4px] bg-gradient-to-b from-[#694e59] via-[#2f1f26] to-[#120a0e] shadow-lg"
                    >
                      <div className="absolute -top-5 -left-[7px] h-0 w-0 border-x-[9px] border-x-transparent border-b-[22px] border-b-[#785b67]" />
                      <div className="absolute top-1/4 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                      <div className="absolute top-1/2 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                      <div className="absolute top-3/4 -left-[3px] h-2.5 w-2.5 rounded-full bg-[#523d47] border border-[#80606f]" />
                    </div>
                  ))}
                </div>

                {/* Horizontal Heavy Iron Crossbars with Studs */}
                <div className="absolute top-[26%] inset-x-0 h-6 bg-gradient-to-r from-[#261820] via-[#4a323d] to-[#38242e] border-y border-[#755564]/50 shadow-md" />
                <div className="absolute top-[52%] inset-x-0 h-7 bg-gradient-to-r from-[#261820] via-[#4a323d] to-[#38242e] border-y border-[#755564]/50 shadow-md" />
                <div className="absolute top-[78%] inset-x-0 h-6 bg-gradient-to-r from-[#261820] via-[#4a323d] to-[#38242e] border-y border-[#755564]/50 shadow-md" />

                {/* Right Half of Antique Iron Lock Deadbolt */}
                <div className="absolute top-1/2 -left-8 -translate-y-1/2 flex items-center justify-start pointer-events-none">
                  <div className="h-28 w-14 rounded-r-full bg-gradient-to-r from-[#7b0d1e] to-[#240509] border-r-2 border-y-2 border-[#d6a45a]/80 shadow-[0_0_25px_rgba(184,20,36,0.7)] flex items-center justify-start pl-2">
                    <span className="font-['Cinzel_Decorative'] text-xl font-bold text-amber-200">
                      S
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================================================================
            ROAMING BATS SWARM (ACTIVATED DURING SLOW 6.5s GATE OPENING)
            Waves of bats roaming and swooping across the opening gates!
            ================================================================ */}
        {isGateOpen && (
          <div className="pointer-events-none absolute inset-0 z-35 overflow-hidden">
            {/* Wave 1: Swooping from center-deep outward top-left */}
            <motion.div
              className="absolute"
              initial={{ x: '50vw', y: '50vh', scale: 0.2, opacity: 0 }}
              animate={{
                x: ['50vw', '38vw', '12vw', '-15vw'],
                y: ['50vh', '32vh', '15vh', '2vh'],
                scale: [0.2, 0.9, 1.5, 2.0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 3.8, ease: 'easeOut' }}
            >
              <svg className="h-16 w-24 text-[#0d0609] fill-current drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]" viewBox="0 0 100 50">
                <path d="M50 25 C35 10, 15 5, 0 15 C10 25, 20 35, 35 30 C40 38, 48 35, 50 25 C52 35, 60 38, 65 30 C80 35, 90 25, 100 15 C85 5, 65 10, 50 25 Z" />
              </svg>
            </motion.div>

            {/* Wave 2: Swooping from center-deep outward bottom-right */}
            <motion.div
              className="absolute"
              initial={{ x: '48vw', y: '48vh', scale: 0.2, opacity: 0 }}
              animate={{
                x: ['48vw', '60vw', '78vw', '115vw'],
                y: ['48vh', '42vh', '62vh', '78vh'],
                scale: [0.2, 0.8, 1.3, 1.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 4.5, delay: 0.8, ease: 'easeOut' }}
            >
              <svg className="h-14 w-20 text-[#080305] fill-current drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]" viewBox="0 0 100 50">
                <path d="M50 25 C35 10, 15 5, 0 15 C10 25, 20 35, 35 30 C40 38, 48 35, 50 25 C52 35, 60 38, 65 30 C80 35, 90 25, 100 15 C85 5, 65 10, 50 25 Z" />
              </svg>
            </motion.div>

            {/* Wave 3: Roaming across the center horizon as gates widen */}
            <motion.div
              className="absolute"
              initial={{ x: '35vw', y: '45vh', scale: 0.4, opacity: 0 }}
              animate={{
                x: ['35vw', '50vw', '68vw', '95vw'],
                y: ['45vh', '28vh', '36vh', '18vh'],
                scale: [0.4, 1.0, 1.2, 1.4],
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{ duration: 5.2, delay: 1.5, ease: 'easeInOut' }}
            >
              <svg className="h-12 w-18 text-[#14070c] fill-current" viewBox="0 0 100 50">
                <path d="M50 25 C35 10, 15 5, 0 15 C10 25, 20 35, 35 30 C40 38, 48 35, 50 25 C52 35, 60 38, 65 30 C80 35, 90 25, 100 15 C85 5, 65 10, 50 25 Z" />
              </svg>
            </motion.div>

            {/* Wave 4: Roaming across top blood moon and clouds */}
            <motion.div
              className="absolute"
              initial={{ x: '8vw', y: '16vh', scale: 0.7, opacity: 0 }}
              animate={{
                x: ['8vw', '35vw', '65vw', '110vw'],
                y: ['16vh', '10vh', '18vh', '8vh'],
                scale: [0.7, 1.1, 1.1, 0.8],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{ duration: 6.0, delay: 2.2, ease: 'linear' }}
            >
              <svg className="h-11 w-16 text-[#0b0407] fill-current" viewBox="0 0 100 50">
                <path d="M50 25 C35 10, 15 5, 0 15 C10 25, 20 35, 35 30 C40 38, 48 35, 50 25 C52 35, 60 38, 65 30 C80 35, 90 25, 100 15 C85 5, 65 10, 50 25 Z" />
              </svg>
            </motion.div>

            {/* Wave 5: Additional bat swooping close past foreground */}
            <motion.div
              className="absolute"
              initial={{ x: '60vw', y: '70vh', scale: 0.3, opacity: 0 }}
              animate={{
                x: ['60vw', '45vw', '25vw', '-10vw'],
                y: ['70vh', '55vh', '40vh', '25vh'],
                scale: [0.3, 0.9, 1.6, 2.2],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{ duration: 4.8, delay: 2.8, ease: 'easeOut' }}
            >
              <svg className="h-14 w-20 text-[#070204] fill-current drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]" viewBox="0 0 100 50">
                <path d="M50 25 C35 10, 15 5, 0 15 C10 25, 20 35, 35 30 C40 38, 48 35, 50 25 C52 35, 60 38, 65 30 C80 35, 90 25, 100 15 C85 5, 65 10, 50 25 Z" />
              </svg>
            </motion.div>
          </div>
        )}

        {/* ================================================================
            SCENE 1 PLAQUE: "ENTER THE FORGOTTEN MANOR" + GLOWING ENTER BUTTON
            Unmounts cleanly when unbolted
            ================================================================ */}
        <AnimatePresence>
          {!isGateOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.35 } }}
              className="absolute inset-0 z-40 flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="pointer-events-auto flex flex-col items-center text-center max-w-3xl px-8 sm:px-12 py-10 rounded-2xl border border-[#52202c]/90 bg-gradient-to-b from-[#180810]/95 via-[#0e050a]/98 to-[#060307] backdrop-blur-md shadow-[0_25px_70px_rgba(0,0,0,0.98)]">
                <div className="filigree-corner-tl !border-red-400" />
                <div className="filigree-corner-tr !border-red-400" />
                <div className="filigree-corner-bl !border-red-400" />
                <div className="filigree-corner-br !border-red-400" />

                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-red-600/70" />
                  <span className="font-['Cinzel'] text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-red-500 uppercase">
                    AWS Student Builders Group · MVJCE
                  </span>
                  <div className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-red-600/70" />
                </div>

                <h1 className="font-['Cinzel_Decorative'] text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fbf8f9] via-[#e2d7db] to-[#917981] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  ENTER THE FORGOTTEN MANOR
                </h1>

                <p className="mt-4 font-['Cinzel'] text-xs sm:text-sm md:text-base tracking-[0.26em] text-stone-200 uppercase font-semibold">
                  THE MIDNIGHT SOCIETY · BEYOND THE ORDINARY
                </p>

                <div className="mt-8">
                  <button
                    onClick={handleEnterManor}
                    className="group relative cursor-pointer px-10 sm:px-14 py-4 transition-all duration-300"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7b0d1e] via-[#b81424] to-[#7b0d1e] opacity-80 blur-md transition-opacity group-hover:opacity-100 animate-pulse" />

                    <div className="relative flex items-center gap-3.5 rounded-lg border border-[#d6a45a]/85 bg-gradient-to-b from-[#240a12] to-[#0a0305] px-8 sm:px-12 py-4 shadow-2xl transition-transform group-hover:scale-[1.03] active:scale-[0.98]">
                      <div className="filigree-corner-tl !border-red-400 !h-2.5 !w-2.5" />
                      <div className="filigree-corner-tr !border-red-400 !h-2.5 !w-2.5" />
                      <div className="filigree-corner-bl !border-red-400 !h-2.5 !w-2.5" />
                      <div className="filigree-corner-br !border-red-400 !h-2.5 !w-2.5" />

                      <Shield className="h-5 w-5 text-red-500 transition-transform group-hover:rotate-12" />
                      <span className="font-['Cinzel'] text-sm sm:text-base font-bold tracking-[0.24em] text-stone-100 uppercase transition-colors group-hover:text-white">
                        ENTER
                      </span>
                      <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                    </div>
                  </button>
                </div>

                <span className="mt-4 text-[10px] sm:text-[11px] font-['Cinzel'] tracking-widest text-stone-400 uppercase">
                  Click to unbolt iron gates & reveal the AWS Cloud Matrix
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightning Flash Overlay (SCENE 1) */}
      <AnimatePresence>
        {hasLightning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.1, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-t from-rose-900/30 via-red-100/50 to-white/60 mix-blend-color-dodge"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
