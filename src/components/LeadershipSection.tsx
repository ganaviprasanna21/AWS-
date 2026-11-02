import React, { useState, useEffect, useRef } from 'react';
import { Camera, Trash2, Linkedin, Github, ExternalLink } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface Leader {
  id: string;
  name: string;
  title: string;
  covenRank: string;
  focus: string[];
  bio: string;
  quote: string;
  monogram: string;
}

const LEADERS: Leader[] = [
  {
    id: 'mohammad-sahif',
    name: 'Mohammad Sahif',
    title: 'PRESIDENT',
    covenRank: 'Lead Architect',
    focus: ['Distributed Cloud', 'AWS Community Programs', 'Serverless'],
    bio: 'Leading the strategic vision, community growth, and hands-on cloud development ethos of The Midnight Society at MVJ College of Engineering.',
    quote: 'Resilience is not forged in daylight; it is proven when distributed systems face the storm at midnight.',
    monogram: 'M.S',
  },
  {
    id: 'c-varun',
    name: 'C Varun',
    title: 'VICE PRESIDENT',
    covenRank: 'Operational Lead',
    focus: ['Cloud Architecture', 'DevSecOps', 'High Availability'],
    bio: 'Overseeing club operations, partnerships, and technical curriculum. Focused on AWS Well-Architected reviews, cost optimization, and infrastructure as code.',
    quote: 'An architecture without automated failover is merely a monument waiting to crumble.',
    monogram: 'C.V',
  },
  {
    id: 'shashank-n',
    name: 'Shashank N',
    title: 'PR HEAD',
    covenRank: 'Communications & Outreach',
    focus: ['Developer Relations', 'Ecosystem Growth', 'Creative Media'],
    bio: 'Spearheading public relations, brand identity, student outreach, and external industry sponsorships. Connecting student builders with global AWS communities.',
    quote: 'Every great line of code deserves an audience bold enough to understand its impact.',
    monogram: 'S.N',
  },
  {
    id: 'srikar',
    name: 'Srikar',
    title: 'TECH HEAD',
    covenRank: 'Technical Director',
    focus: ['Kubernetes & EKS', 'Zero-Trust Security', 'Generative AI on AWS'],
    bio: 'Leading technical workshops, open-source CDK projects, and competitive hackathon squads. Expert in microservice architectures and AI inference pipelines.',
    quote: 'When you eliminate single points of failure, downtime becomes mathematically impossible.',
    monogram: 'S.R',
  },
];

export const LeadershipSection: React.FC = () => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('midnight_society_leadership_photos');
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const handlePhotoUpload = (leaderId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const updated = { ...photos, [leaderId]: result };
          setPhotos(updated);
          try {
            localStorage.setItem('midnight_society_leadership_photos', JSON.stringify(updated));
          } catch {
            // Storage quota limit fallback
          }
          gothicAudio.playSubtleTick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (leaderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...photos };
    delete updated[leaderId];
    setPhotos(updated);
    try {
      localStorage.setItem('midnight_society_leadership_photos', JSON.stringify(updated));
    } catch {
      // Fallback
    }
    gothicAudio.playSubtleTick();
  };

  return (
    <section id="leadership" className="relative py-28 border-t border-[#231217] bg-[#050406]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header with Exact Requested Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
              <span>The People Behind The Society</span>
              <span aria-hidden="true">·</span>
              <span>Executive Council</span>
            </div>

            {/* Exact Section Title Requested */}
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
              THE ARCHITECTS OF MIDNIGHT.
            </h2>

            {/* Exact Subtitle Requested */}
            <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic">
              Every great society is built by people with a vision.
            </p>
          </div>

          <div className="text-xs font-['Cinzel'] tracking-wider text-stone-400">
            MVJ COLLEGE OF ENGINEERING · 2026/2027
          </div>
        </div>

        {/* 4 Premium Profile Cards with Large Portrait Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LEADERS.map((leader) => {
            const uploadedPhoto = photos[leader.id];

            return (
              <div
                key={leader.id}
                onClick={() => {
                  setSelectedLeader(leader);
                  gothicAudio.playSubtleTick();
                }}
                className="group relative cursor-pointer rounded-xl border border-[#3d1a23] bg-gradient-to-b from-[#16080d] via-[#0c0508] to-[#070406] overflow-hidden transition-all duration-500 hover:border-red-600/70 hover:shadow-[0_12px_45px_-5px_rgba(184,20,36,0.45)] flex flex-col justify-between"
              >
                {/* Filigree Corner Accents */}
                <div className="filigree-corner-tl !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-tr !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-bl !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-br !border-red-400/50 group-hover:!border-red-400 transition-colors" />

                {/* Large Portrait Area (Ready for Real Photographs) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-[#240a12] to-[#0a0407] border-b border-[#2d141b]">
                  {uploadedPhoto ? (
                    <img
                      src={uploadedPhoto}
                      alt={leader.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Elegant Gothic Ivory & Antique Silver Silhouette Placeholder */
                    <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center select-none">
                      {/* Gothic Heraldic Ring */}
                      <div className="relative h-28 w-28 rounded-full border-2 border-[#521c27] bg-gradient-to-b from-[#350d16] to-[#120407] flex items-center justify-center shadow-[0_0_25px_rgba(123,13,30,0.4)] group-hover:border-red-500/80 transition-colors">
                        <span className="font-['Cinzel_Decorative'] text-2xl font-bold text-amber-200">
                          {leader.monogram}
                        </span>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500 text-xs">
                          ✦
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center">
                        <span className="text-[11px] font-['Cinzel'] tracking-widest text-stone-300 uppercase font-semibold">
                          Portrait Placeholder
                        </span>
                        <span className="text-[10px] font-['Plus_Jakarta_Sans'] text-red-400/80 mt-1">
                          Ready for official photograph
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0508] via-transparent to-black/25" />

                  {/* Upload Real Photo Overlay Controls */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => {
                        fileInputRefs.current[leader.id] = el;
                      }}
                      onChange={(e) => handlePhotoUpload(leader.id, e)}
                      className="hidden"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRefs.current[leader.id]?.click();
                      }}
                      title="Upload Member Photograph"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-stone-700 text-stone-300 hover:text-white hover:border-red-500 transition-colors shadow-lg backdrop-blur-sm cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                    </button>

                    {uploadedPhoto && (
                      <button
                        onClick={(e) => handleRemovePhoto(leader.id, e)}
                        title="Remove Photograph"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 border border-stone-700 text-red-400 hover:text-red-200 hover:border-red-600 transition-colors shadow-lg backdrop-blur-sm cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Role Badge in bottom corner */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="rounded border border-[#521c27] bg-[#120407]/90 px-3 py-1 text-[11px] font-['Cinzel'] font-bold tracking-wider text-amber-200 backdrop-blur-sm shadow-md">
                      {leader.title}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Cinzel'] text-lg font-bold text-stone-100 group-hover:text-red-300 transition-colors">
                      {leader.name}
                    </h3>

                    <div className="text-xs font-['Cinzel'] text-red-400/90 tracking-wide mt-0.5">
                      {leader.covenRank}
                    </div>

                    <p className="mt-3 font-['Cormorant_Garamond'] text-xs text-stone-300 leading-relaxed italic line-clamp-3">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>

                  {/* Focus areas / tags */}
                  <div className="mt-4 pt-3 border-t border-[#200f14] flex flex-wrap gap-1.5 text-[10px] font-mono text-stone-400">
                    {leader.focus.map((item) => (
                      <span key={item} className="text-stone-300">
                        #{item.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="px-5 py-3 border-t border-[#200f14] bg-black/30 flex items-center justify-between text-xs font-['Cinzel'] text-stone-400">
                  <span className="tracking-widest text-[11px]">VIEW DOSSIER</span>
                  <span className="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Dossier Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-[0_0_60px_rgba(184,20,36,0.5)]">
            <div className="filigree-corner-tl !border-red-400" />
            <div className="filigree-corner-tr !border-red-400" />
            <div className="filigree-corner-bl !border-red-400" />
            <div className="filigree-corner-br !border-red-400" />

            <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
              <div>
                <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                  {selectedLeader.title} · {selectedLeader.covenRank}
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
                  {selectedLeader.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeader(null)}
                className="text-stone-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded border border-[#3b1720] cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-['Cinzel'] tracking-wider text-stone-400 mb-1">
                  OFFICIAL BIOGRAPHY
                </h4>
                <p className="text-xs font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

              <div className="p-3.5 rounded border border-[#3b1720] bg-black/50">
                <span className="text-[11px] font-['Cinzel'] text-red-400 block mb-1">
                  PHILOSOPHY
                </span>
                <p className="font-['Cormorant_Garamond'] text-sm text-stone-200 italic">
                  &ldquo;{selectedLeader.quote}&rdquo;
                </p>
              </div>

              <div>
                <h4 className="text-xs font-['Cinzel'] tracking-wider text-stone-400 mb-2">
                  AREAS OF CLOUD MASTERY
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLeader.focus.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded bg-[#20090f] border border-[#48141d] text-xs font-mono text-amber-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#3b1720] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded border border-[#3b1720] text-stone-400 hover:text-white hover:border-red-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded border border-[#3b1720] text-stone-400 hover:text-white hover:border-red-600 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://community.aws"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded border border-[#3b1720] text-stone-400 hover:text-white hover:border-red-600 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <button
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2 text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#2b0c12] border border-red-800 rounded hover:bg-[#45121c] transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
