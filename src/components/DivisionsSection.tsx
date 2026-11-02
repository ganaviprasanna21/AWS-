import React, { useState } from 'react';
import { ArrowUpRight, Cloud, Sparkles, Users2, Megaphone, CheckCircle2 } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface Division {
  number: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: typeof Cloud;
  focusTopics: string[];
  initiative: string;
}

const DIVISIONS: Division[] = [
  {
    number: '01',
    name: 'CLOUD & TECHNOLOGY',
    tagline: 'Infrastructure & Serverless',
    description: 'Explore AWS services, cloud infrastructure, serverless computing and modern development.',
    image: '/src/assets/images/division_cloud_tech_1793609834855.jpg',
    icon: Cloud,
    focusTopics: ['AWS Lambda & CDK', 'Amazon DynamoDB Global', 'Containers on ECS & EKS', 'Zero-Trust Cloud Security'],
    initiative: 'Hands-on architectural laboratories and CDK grimoires engineered by students.',
  },
  {
    number: '02',
    name: 'INNOVATION',
    tagline: 'AI & Emerging Horizons',
    description: 'Experiment with artificial intelligence, emerging technologies and creative problem-solving.',
    image: '/src/assets/images/division_innovation_1793609835780.jpg',
    icon: Sparkles,
    focusTopics: ['Amazon Bedrock GenAI', 'SageMaker Model Training', 'Multi-Agent Orchestrations', 'Autonomous Cloud Systems'],
    initiative: 'Building generative AI solutions, nocturnal hackathon prototypes, and applied research.',
  },
  {
    number: '03',
    name: 'COMMUNITY',
    tagline: 'Network & Fellowship',
    description: 'Create connections, organise activities and build an active student technology community.',
    image: '/src/assets/images/division_community_1793609836871.jpg',
    icon: Users2,
    focusTopics: ['Peer-to-Peer Mentorship', 'AWS Study Covens', 'Nocturnal Teardown Meetups', 'Cross-College Networking'],
    initiative: 'Weekly study guilds for AWS certifications and vibrant Discord discussion circles.',
  },
  {
    number: '04',
    name: 'CREATIVE & OUTREACH',
    tagline: 'Brand, Media & Voice',
    description: 'Share ideas, document achievements, create content and introduce more students to technology.',
    image: '/src/assets/images/division_creative_1793609835909.jpg',
    icon: Megaphone,
    focusTopics: ['Technical Editorial Writing', 'Gothic Visual Identity', 'Community Podcasts & Streams', 'Student Project Spotlights'],
    initiative: 'Publishing student engineering stories, social campaigns, and architectural zines.',
  },
];

export const DivisionsSection: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);

  const handleCardClick = (div: Division) => {
    setSelectedDivision(div);
    gothicAudio.playGothicBell(140, 2.0, 0.25);
  };

  return (
    <section id="divisions" className="relative py-28 border-t border-[#231217] bg-[#050406]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
              <span>Divisions & Guilds</span>
              <span aria-hidden="true">·</span>
              <span>MVJ College of Engineering</span>
            </div>

            {/* Exact Section Title Requested */}
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
              THE FOUR PILLARS OF THE SOCIETY.
            </h2>

            <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic">
              Specialized pillars where members hone their craft, drive collaborative projects, and expand the frontiers of cloud computing.
            </p>
          </div>

          <div className="text-xs font-['Cinzel'] tracking-widest text-stone-400">
            DISCIPLINES OF EXCELLENCE
          </div>
        </div>

        {/* 4 Visually Distinct Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DIVISIONS.map((division) => {
            const Icon = division.icon;

            return (
              <div
                key={division.number}
                onClick={() => handleCardClick(division)}
                className="group relative cursor-pointer rounded-xl border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] overflow-hidden transition-all duration-500 hover:border-red-600/70 hover:shadow-[0_15px_45px_-5px_rgba(184,20,36,0.45)] flex flex-col"
              >
                {/* Filigree Corner Accents */}
                <div className="filigree-corner-tl !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-tr !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-bl !border-red-400/50 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-br !border-red-400/50 group-hover:!border-red-400 transition-colors" />

                {/* Atmospheric Visual Area with Image Hover Zoom */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={division.image}
                    alt={division.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-110 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Atmospheric Gradient Scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0609] via-transparent to-black/35" />

                  {/* Division Badge & Pillar Number */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <span className="font-['Cinzel_Decorative'] text-xl font-bold text-amber-200/90 px-2.5 py-1 rounded bg-black/75 border border-[#521c27] backdrop-blur-sm shadow-md">
                      {division.number}
                    </span>
                    <span className="text-[11px] font-['Cinzel'] tracking-widest text-stone-300 uppercase px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-stone-800">
                      {division.tagline}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-[#1e070c]/90 border border-[#5a1b24] flex items-center justify-center text-red-400 shadow-lg backdrop-blur-sm group-hover:border-red-500 group-hover:text-red-200 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Editorial Typography & Body Text */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Exact Title Requested */}
                    <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 group-hover:text-red-300 transition-colors tracking-wide">
                      {division.number} — {division.name}
                    </h3>

                    {/* Exact Description Requested */}
                    <p className="mt-3 font-['Plus_Jakarta_Sans'] text-sm text-stone-300 leading-relaxed">
                      {division.description}
                    </p>

                    {/* Quiet Focus Chips */}
                    <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-stone-400">
                      {division.focusTopics.map((topic, i) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 rounded bg-[#1f0910] border border-[#3b151e] text-stone-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-8 pt-5 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400 group-hover:text-stone-200">
                    <span className="tracking-widest">EXPLORE PILLAR</span>
                    <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Division Inspection Modal */}
      {selectedDivision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-[0_0_60px_rgba(184,20,36,0.5)]">
            <div className="filigree-corner-tl !border-red-400" />
            <div className="filigree-corner-tr !border-red-400" />
            <div className="filigree-corner-bl !border-red-400" />
            <div className="filigree-corner-br !border-red-400" />

            <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
              <div>
                <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                  Pillar {selectedDivision.number} · {selectedDivision.tagline}
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
                  {selectedDivision.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDivision(null)}
                className="text-stone-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded border border-[#3b1720]"
              >
                CLOSE
              </button>
            </div>

            <p className="mt-5 text-sm font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
              {selectedDivision.description}
            </p>

            <div className="mt-6 p-4 rounded-lg border border-[#3b1720] bg-black/50">
              <span className="text-xs font-['Cinzel'] tracking-wider text-amber-200 block mb-2">
                Pillar Flagship Initiative:
              </span>
              <p className="text-xs font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
                {selectedDivision.initiative}
              </p>
            </div>

            <div className="mt-6">
              <span className="text-xs font-['Cinzel'] tracking-wider text-stone-400 mb-2 block">
                Core Competencies & Hands-On Focus:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDivision.focusTopics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedDivision(null)}
                className="px-6 py-2.5 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#2b0c12] border border-red-800 hover:bg-[#45121c] transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
