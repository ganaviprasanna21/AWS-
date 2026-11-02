import React, { useState } from 'react';
import { Calendar, ArrowUpRight, Camera, Sparkles, MapPin, Tag } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

type EventCategory = 'All' | 'Workshops' | 'Technical Sessions' | 'Hackathons' | 'Community Meetups' | 'Project Showcases';

interface SocietyEvent {
  id: string;
  title: string;
  category: 'Workshops' | 'Technical Sessions' | 'Hackathons' | 'Community Meetups' | 'Project Showcases';
  datePlaceholder: string;
  location: string;
  shortDescription: string;
  fullDetails: string;
  deliverables: string[];
}

const EVENTS_DATA: SocietyEvent[] = [
  {
    id: 'serverless-crucible',
    title: 'Serverless Architecture Crucible',
    category: 'Workshops',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Cloud Computing Lab & Virtual Stream · MVJCE',
    shortDescription: 'Hands-on architectural workshop diving into AWS Lambda event choreography, DynamoDB data modeling, and automated CDK deployments.',
    fullDetails: 'Participants construct an event-driven distributed system from scratch, implementing least-privilege IAM policies and microsecond latency tuning.',
    deliverables: ['Live CDK GitHub Repository', 'Production Serverless Architecture Blueprint', 'Hands-On AWS Sandbox Access'],
  },
  {
    id: 'bedrock-ai-deepdive',
    title: 'Generative AI on AWS Bedrock',
    category: 'Technical Sessions',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Auditorium & Live Discord Stream · MVJCE',
    shortDescription: 'In-depth exploration of foundation models, private enterprise RAG pipelines, and vector embeddings using OpenSearch Serverless.',
    fullDetails: 'Led by student cloud builders and AWS Community mentors, exploring model evaluation, prompt guardrails, and cost-effective multi-model inference.',
    deliverables: ['Sample RAG Pipeline Code', 'Model Guardrail Templates', 'Certificate of Participation'],
  },
  {
    id: 'midnight-hackathon-jam',
    title: 'Midnight Hackathon: The Blood Moon Jam',
    category: 'Hackathons',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Nocturnal Campus Hall & Virtual War Rooms · MVJCE',
    shortDescription: '48-hour nocturnal hackathon challenging student squads to build resilient, distributed cloud-native applications on AWS.',
    fullDetails: 'Teams collaborate through the night with mentorship from AWS architects, competing for cloud credits, sponsorship prizes, and showcase honors.',
    deliverables: ['48-Hour Continuous Cloud Sprint', 'AWS Architect Mentorship', 'Sponsored Cloud Credits & Awards'],
  },
  {
    id: 'builders-fellowship-meetup',
    title: 'Nocturne Builders Fellowship',
    category: 'Community Meetups',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Innovation Center · MVJCE',
    shortDescription: 'Informal community gathering connecting aspiring cloud builders, discussing emerging trends, and networking with alumni builders.',
    fullDetails: 'Open-mic lightning talks, peer code reviews, and networking sessions designed to welcome new students into the AWS Student Builders ecosystem.',
    deliverables: ['Peer Code Reviews', 'Cloud Certification Study Groups', 'Project Collaboration Matching'],
  },
  {
    id: 'cloud-capstone-showcase',
    title: 'Nocturnal Project Showcase & Exhibition',
    category: 'Project Showcases',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Main Exhibition Gallery · MVJCE',
    shortDescription: 'Exhibition of high-impact student projects, distributed systems, and AI tools built by Midnight Society members throughout the academic year.',
    fullDetails: 'Live demonstrations to faculty, peers, and industry guests highlighting cloud cost optimization, serverless architecture, and real-world student engineering.',
    deliverables: ['Live Interactive Demos', 'Industry Architect Feedback', 'Public Showcase Badges'],
  },
  {
    id: 'cert-war-room',
    title: 'AWS Certification War Room',
    category: 'Workshops',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    location: 'Online Study Coven & Discord',
    shortDescription: 'Structured exam preparation sprint for AWS Certified Cloud Practitioner and Solutions Architect Associate credentials.',
    fullDetails: 'Weekly deep-dives covering Well-Architected Framework scenarios, mock exam teardowns, and architecture review discussions.',
    deliverables: ['Official Study Grimoire', 'Practice Scenario Deconstructions', 'Study Voucher Guidance'],
  },
];

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All');
  const [selectedEvent, setSelectedEvent] = useState<SocietyEvent | null>(null);

  const categories: EventCategory[] = [
    'All',
    'Workshops',
    'Technical Sessions',
    'Hackathons',
    'Community Meetups',
    'Project Showcases',
  ];

  const filteredEvents = activeCategory === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter((e) => e.category === activeCategory);

  return (
    <section id="events" className="relative py-28 border-t border-[#231217] bg-[#070508]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
              <span>Events & Experiences</span>
              <span aria-hidden="true">·</span>
              <span>MVJ College of Engineering</span>
            </div>

            {/* Exact Section Title Requested */}
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
              NIGHTS OF INNOVATION.
            </h2>

            <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic">
              Curated workshops, hackathons, and symposiums bringing student technologists together after dark.
            </p>
          </div>

          <div className="text-xs font-['Cinzel'] tracking-widest text-stone-400">
            UPCOMING RITUALS & SESSIONS
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="mb-12 flex flex-wrap gap-2 p-1.5 rounded-lg bg-black/60 border border-[#3b1720] max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                gothicAudio.playSubtleTick();
              }}
              className={`px-4 py-2 text-xs font-['Cinzel'] font-bold tracking-wider rounded transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#7b0d1e] to-[#450912] text-white shadow-[0_0_12px_rgba(184,20,36,0.6)] border border-[#d6a45a]/60'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                gothicAudio.playGothicBell(150, 1.8, 0.2);
              }}
              className="group relative cursor-pointer rounded-xl border border-[#3b1720] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] overflow-hidden transition-all duration-500 hover:border-red-600/70 hover:shadow-[0_12px_40px_-5px_rgba(184,20,36,0.4)] flex flex-col justify-between"
            >
              {/* Filigree Corner Accents */}
              <div className="filigree-corner-tl !border-red-400/50 group-hover:!border-red-400" />
              <div className="filigree-corner-tr !border-red-400/50 group-hover:!border-red-400" />
              <div className="filigree-corner-bl !border-red-400/50 group-hover:!border-red-400" />
              <div className="filigree-corner-br !border-red-400/50 group-hover:!border-red-400" />

              {/* Event Image Placeholder Area */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18070d] border-b border-[#2d141b]">
                <img
                  src="/src/assets/images/event_showcase_gothic_1793609858390.jpg"
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108 filter contrast-110 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0609] via-transparent to-black/30" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-[#521c27] text-[10px] font-['Cinzel'] tracking-wider text-amber-200 backdrop-blur-sm">
                    <Tag className="h-3 w-3 text-red-500" />
                    <span>{event.category}</span>
                  </span>
                </div>

                {/* Photo Placeholder Indicator */}
                <div className="absolute bottom-3 right-3">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-['Cinzel'] text-stone-400 backdrop-blur-sm border border-stone-800">
                    <Camera className="h-3 w-3" />
                    <span>Event Photo Slot</span>
                  </span>
                </div>
              </div>

              {/* Editorial Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date Placeholder */}
                  <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-red-400/90 font-semibold mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{event.datePlaceholder}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 group-hover:text-red-300 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-3 font-['Plus_Jakarta_Sans'] text-xs text-stone-400 leading-relaxed">
                    {event.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-['Plus_Jakarta_Sans'] text-stone-500">
                    <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* View Details Interaction */}
                <div className="mt-6 pt-4 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400 group-hover:text-stone-200">
                  <span className="tracking-widest">VIEW DETAILS</span>
                  <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-[0_0_60px_rgba(184,20,36,0.5)]">
            <div className="filigree-corner-tl !border-red-400" />
            <div className="filigree-corner-tr !border-red-400" />
            <div className="filigree-corner-bl !border-red-400" />
            <div className="filigree-corner-br !border-red-400" />

            <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
              <div>
                <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                  {selectedEvent.category} · MVJCE AWS Builders
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-stone-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded border border-[#3b1720] cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-amber-200">
                <Calendar className="h-4 w-4 text-red-500" />
                <span>{selectedEvent.datePlaceholder}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans'] text-stone-400">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-['Cinzel'] tracking-wider text-stone-400 mb-2">
                SESSION OVERVIEW
              </h4>
              <p className="text-xs font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
                {selectedEvent.fullDetails}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-['Cinzel'] tracking-wider text-stone-400 mb-2">
                WHAT BUILDERS GAIN
              </h4>
              <div className="flex flex-col gap-2">
                {selectedEvent.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-stone-300">
                    <Sparkles className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#2b0c12] border border-red-800 hover:bg-[#45121c] transition-colors cursor-pointer"
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
