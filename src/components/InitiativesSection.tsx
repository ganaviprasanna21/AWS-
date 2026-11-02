import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, Code2, Clock, Sparkles } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface InitiativesSectionProps {
  onOpenMembership: () => void;
}

export const InitiativesSection: React.FC<InitiativesSectionProps> = ({ onOpenMembership }) => {
  // Hackathon Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="chronicles" className="relative py-28 border-t border-[#231217] bg-[#070508]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
            <span>Rituals & Conquests</span>
            <span aria-hidden="true">·</span>
            <span>Community Initiatives</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
            Nocturnal Hackathons & Cloud Rituals
          </h2>
          <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic leading-relaxed">
            Where code is committed in the dead of night. We host 48-hour continuous distributed cloud challenges, certification war rooms, and deep-dive architectural post-mortems.
          </p>
        </div>

        {/* Feature Banner: Midnight Hackathon VII */}
        <div className="relative mb-20 rounded-xl overflow-hidden border border-[#481e28] bg-gradient-to-b from-[#19090f] to-[#0a0507] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Media with Photo (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] overflow-hidden">
              <img
                src="/src/assets/images/midnight_hackathon_ritual_1793608991275.jpg"
                alt="Midnight Society Cloud Hackathon Ritual"
                className="h-full w-full object-cover filter contrast-110 brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#0f070a]/40 to-[#0f070a] hidden lg:block" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f070a] via-transparent to-transparent lg:hidden" />

              <div className="absolute top-4 left-4 flex items-center gap-2 rounded border border-red-800/80 bg-black/80 px-3 py-1 text-xs font-['Cinzel'] text-red-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Next Nocturnal Ritual · 48 Hours</span>
              </div>
            </div>

            {/* Hackathon Details & Countdown (5 cols) */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-stone-400 mb-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>November 2026 · Solstice Edition</span>
                </div>

                <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-stone-100">
                  Midnight Hackathon VII: The Blood Moon Jam
                </h3>

                <p className="mt-3 font-['Plus_Jakarta_Sans'] text-xs text-stone-300 leading-relaxed">
                  A 48-hour continuous hackathon focused entirely on building high-throughput, fault-tolerant distributed cloud architectures on AWS. Mentored by AWS Community Builders and senior cloud architects.
                </p>

                {/* Live Countdown Box */}
                <div className="mt-6 p-4 rounded-lg border border-[#3b1720] bg-black/50">
                  <div className="flex items-center gap-2 text-[11px] font-['Cinzel'] text-red-400 tracking-wider mb-3">
                    <Clock className="h-3.5 w-3.5" />
                    <span>COUNTDOWN TO RITUAL COMMENCEMENT</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded bg-[#1c080d] border border-[#3d131b]">
                      <div className="font-mono text-xl sm:text-2xl font-bold text-stone-100 tabular-nums">
                        {String(timeLeft.days).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] font-['Cinzel'] text-stone-400 mt-1">DAYS</div>
                    </div>
                    <div className="p-2 rounded bg-[#1c080d] border border-[#3d131b]">
                      <div className="font-mono text-xl sm:text-2xl font-bold text-stone-100 tabular-nums">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] font-['Cinzel'] text-stone-400 mt-1">HOURS</div>
                    </div>
                    <div className="p-2 rounded bg-[#1c080d] border border-[#3d131b]">
                      <div className="font-mono text-xl sm:text-2xl font-bold text-stone-100 tabular-nums">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] font-['Cinzel'] text-stone-400 mt-1">MINUTES</div>
                    </div>
                    <div className="p-2 rounded bg-[#1c080d] border border-[#3d131b]">
                      <div className="font-mono text-xl sm:text-2xl font-bold text-red-400 tabular-nums">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] font-['Cinzel'] text-stone-400 mt-1">SECONDS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    gothicAudio.playGothicBell(160, 2.0, 0.2);
                    onOpenMembership();
                  }}
                  className="w-full py-3.5 rounded text-xs font-['Cinzel'] font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#7b0d1e] via-[#9e1327] to-[#7b0d1e] border border-[#d6a45a]/70 hover:shadow-[0_0_20px_rgba(184,20,36,0.5)] transition-all"
                >
                  Register Hackathon Squad
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Secondary Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-[#35151e] bg-[#0c0608] flex flex-col justify-between">
            <div>
              <div className="h-9 w-9 rounded bg-[#20080e] border border-[#48141d] flex items-center justify-center text-red-400 mb-4">
                <Code2 className="h-4 w-4" />
              </div>
              <h4 className="font-['Cinzel'] text-lg font-bold text-stone-100 mb-2">
                Open Source Grimoires
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-stone-400 leading-relaxed">
                Production-ready AWS CDK constructs and CloudFormation templates open-sourced by our members, covering zero-trust authentication, multi-region event choreographies, and cost-optimized pipelines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#200f14] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400">
              <span>GITHUB / AWS-MIDNIGHT</span>
              <span className="text-red-400">18 BLUEPRINTS</span>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#35151e] bg-[#0c0608] flex flex-col justify-between">
            <div>
              <div className="h-9 w-9 rounded bg-[#20080e] border border-[#48141d] flex items-center justify-center text-red-400 mb-4">
                <Award className="h-4 w-4" />
              </div>
              <h4 className="font-['Cinzel'] text-lg font-bold text-stone-100 mb-2">
                Cryptic Certification Covens
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-stone-400 leading-relaxed">
                Dedicated nocturnal study groups for AWS Certified Cloud Practitioner, Solutions Architect Associate, and Security Specialty. Includes practice exam teardowns and sponsored certification exam vouchers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#200f14] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400">
              <span>94% PASS RATE</span>
              <span className="text-red-400">WEEKLY SATURDAYS</span>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#35151e] bg-[#0c0608] flex flex-col justify-between">
            <div>
              <div className="h-9 w-9 rounded bg-[#20080e] border border-[#48141d] flex items-center justify-center text-red-400 mb-4">
                <Users className="h-4 w-4" />
              </div>
              <h4 className="font-['Cinzel'] text-lg font-bold text-stone-100 mb-2">
                Nocturnal Architecture Teardowns
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-stone-400 leading-relaxed">
                Monthly midnight sessions deconstructing high-profile internet outages, analyzing split-brain scenarios, cascading retry storms, and designing resilient recovery rituals.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#200f14] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400">
              <span>LIVE ON DISCORD</span>
              <span className="text-red-400">RECORDED VAULT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
