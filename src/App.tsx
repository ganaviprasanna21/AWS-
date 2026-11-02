/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Moon,
  Sparkles,
  Crown,
  Github,
  Instagram,
  Linkedin,
  ArrowDown,
  ArrowRight,
  Code2,
  Users,
  Flame,
  Menu,
  X,
  Volume2,
  VolumeX,
  Castle,
  Camera,
  Trash2,
  Terminal,
  Copy,
  Check,
  Send,
  MapPin,
  Mail,
  Shield,
  Layers,
  Cpu,
  Database,
  Lock,
} from 'lucide-react';
import { gothicAudio } from './utils/gothicAudio.ts';
import { AtmosphereCanvas } from './components/AtmosphereCanvas.tsx';
import { CinematicIntro } from './components/CinematicIntro.tsx';
import './App.css';

interface Leader {
  name: string;
  role: string;
  symbol: string;
  covenRank: string;
  focus: string[];
  quote: string;
  bio: string;
}

const leaders: Leader[] = [
  {
    name: 'Mohammad Sahif',
    role: 'President',
    symbol: '♛',
    covenRank: 'Lead Architect',
    focus: ['Distributed Cloud', 'AWS Community Programs', 'Serverless'],
    quote: 'Resilience is not forged in daylight; it is proven when distributed systems face the storm at midnight.',
    bio: 'Guiding the strategic vision, community growth, and hands-on cloud development ethos of The Midnight Society at MVJ College of Engineering.',
  },
  {
    name: 'C Varun',
    role: 'Vice President',
    symbol: '♜',
    covenRank: 'Operational Lead',
    focus: ['Cloud Architecture', 'DevSecOps', 'High Availability'],
    quote: 'An architecture without automated failover is merely a monument waiting to crumble.',
    bio: 'Overseeing club operations, partnerships, and technical curriculum. Focused on AWS Well-Architected reviews, cost optimization, and infrastructure as code.',
  },
  {
    name: 'Shashank N',
    role: 'PR Head',
    symbol: '✦',
    covenRank: 'Communications & Outreach',
    focus: ['Developer Relations', 'Ecosystem Growth', 'Creative Media'],
    quote: 'Every great line of code deserves an audience bold enough to understand its impact.',
    bio: 'Spearheading public relations, brand identity, student outreach, and external industry sponsorships. Connecting student builders with global AWS communities.',
  },
  {
    name: 'Srikar',
    role: 'Tech Head',
    symbol: '⚔',
    covenRank: 'Technical Director',
    focus: ['Kubernetes & EKS', 'Zero-Trust Security', 'Generative AI on AWS'],
    quote: 'When you eliminate single points of failure, downtime becomes mathematically impossible.',
    bio: 'Leading technical workshops, open-source CDK projects, and competitive hackathon squads. Expert in microservice architectures and AI inference pipelines.',
  },
];

const events = [
  {
    number: '01',
    title: 'THE AWAKENING',
    subtitle: 'Where ideas come alive',
    description: 'A gathering of curious minds, creative thinkers and future builders exploring cloud computing foundations.',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    tag: 'Symposium',
  },
  {
    number: '02',
    title: 'CODE AFTER DARK',
    subtitle: 'Build beyond boundaries',
    description: 'Explore technology, experiment with serverless architectures and build something extraordinary in a 48-hour nocturnal hackathon.',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    tag: 'Hackathon',
  },
  {
    number: '03',
    title: 'THE INNER CIRCLE',
    subtitle: 'Community without limits',
    description: 'Connect, collaborate and grow with fellow student builders, AWS architects and industry mentors.',
    datePlaceholder: 'Date: To Be Announced (Upcoming Cycle)',
    tag: 'Fellowship',
  },
];

const divisions = [
  {
    number: '01',
    name: 'CLOUD & TECHNOLOGY',
    tagline: 'Infrastructure & Serverless',
    description: 'Explore AWS services, cloud infrastructure, serverless computing and modern development.',
    image: '/src/assets/images/aws_cloud_matrix_1793612490769.jpg',
    topics: ['AWS Lambda & CDK', 'Amazon DynamoDB Global', 'Containers on ECS & EKS', 'Zero-Trust Cloud Security'],
  },
  {
    number: '02',
    name: 'INNOVATION',
    tagline: 'AI & Emerging Horizons',
    description: 'Experiment with artificial intelligence, emerging technologies and creative problem-solving.',
    image: '/src/assets/images/aws_bedrock_sanctum_1793612441977.jpg',
    topics: ['Amazon Bedrock GenAI', 'SageMaker Model Training', 'Multi-Agent Orchestrations', 'Autonomous Cloud Systems'],
  },
  {
    number: '03',
    name: 'COMMUNITY',
    tagline: 'Network & Fellowship',
    description: 'Create connections, organise activities and build an active student technology community.',
    image: '/src/assets/images/division_community_1793609836871.jpg',
    topics: ['Peer-to-Peer Mentorship', 'AWS Study Covens', 'Nocturnal Teardown Meetups', 'Cross-College Networking'],
  },
  {
    number: '04',
    name: 'CREATIVE & OUTREACH',
    tagline: 'Brand, Media & Voice',
    description: 'Share ideas, document achievements, create content and introduce more students to technology.',
    image: '/src/assets/images/division_creative_1793609835909.jpg',
    topics: ['Technical Editorial Writing', 'Gothic Visual Identity', 'Community Podcasts & Streams', 'Student Project Spotlights'],
  },
];

const ARCH_PRESETS = [
  {
    id: 'serverless-ritual',
    name: 'Event-Driven Nocturnal Ingestion',
    trigger: 'Amazon EventBridge Event Bus',
    compute: 'AWS Lambda (NodeJS 22 / ARM64)',
    storage: 'Amazon DynamoDB Global Table',
    security: 'AWS KMS Custom Key & IAM Least Privilege',
    latency: '18ms (p99)',
    sla: '99.999%',
    cdkCode: `// MVJCE Midnight Society Nocturnal Stack
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class NocturnalIngestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    const ledger = new dynamodb.Table(this, 'ImmortalLedger', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
    const ritualFn = new lambda.Function(this, 'ShadowFn', {
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src/handlers'),
      environment: { TABLE_NAME: ledger.tableName },
    });
    ledger.grantWriteData(ritualFn);
  }
}`,
  },
  {
    id: 'bedrock-ai',
    name: 'Bedrock GenAI Arcane Reasoning',
    trigger: 'Amazon API Gateway REST Proxy',
    compute: 'AWS Lambda + Bedrock Claude 3.5 Sonnet',
    storage: 'Amazon S3 Intelligent-Tiering Vault',
    security: 'AWS GuardDuty & IAM Session Policies',
    latency: '110ms (TTFT)',
    sla: '99.95%',
    cdkCode: `// Amazon Bedrock Cognitive Reasoning Chamber
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const bedrock = new BedrockRuntimeClient({ region: 'us-east-1' });
export const handler = async (event: any) => {
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      messages: [{ role: 'user', content: event.prompt }],
    }),
  });
  return await bedrock.send(command);
};`,
  },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [activeArch, setActiveArch] = useState(ARCH_PRESETS[0]);
  const [codeCopied, setCodeCopied] = useState(false);

  // Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('midnight_society_leadership_photos');
      if (saved) setPhotos(JSON.parse(saved));
    } catch {
      // Fallback
    }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
    setMenu(false);
    gothicAudio.playSubtleTick();
  };

  const handleToggleSound = () => {
    const muted = gothicAudio.toggleMute();
    setIsMuted(muted);
    gothicAudio.playSubtleTick();
  };

  const handlePhotoUpload = (leaderName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          const updated = { ...photos, [leaderName]: res };
          setPhotos(updated);
          try {
            localStorage.setItem('midnight_society_leadership_photos', JSON.stringify(updated));
          } catch {
            // Storage limit fallback
          }
          gothicAudio.playSubtleTick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (leaderName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...photos };
    delete updated[leaderName];
    setPhotos(updated);
    try {
      localStorage.setItem('midnight_society_leadership_photos', JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
    gothicAudio.playSubtleTick();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeArch.cdkCode);
    setCodeCopied(true);
    gothicAudio.playSubtleTick();
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;
    setContactSent(true);
    gothicAudio.playGothicBell(120, 2.5, 0.3);
  };

  return (
    <main className="vampire">
      {/* ===================================================
          1. CINEMATIC 3D VAMPIRE MANSION ENTRANCE (4-SCENE EXPERIENCE)
          =================================================== */}
      {!entered && (
        <CinematicIntro
          onEnter={() => {
            setEntered(true);
          }}
        />
      )}

      {/* ===================================================
          2. MAIN LUXURY GOTHIC WEBSITE (REVEALED BEHIND GATES)
          =================================================== */}
      <AnimatePresence>
        {entered && (
          <motion.div
            className="website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Ambient Background Canvas (Flying Bats & Embers) */}
            <AtmosphereCanvas intensity="ambient" showBats={true} />

            {/* ================= NAVBAR ================= */}
            <nav className="navbar">
              <div className="brand">
                <span className="brand-icon">♛</span>
                <span>THE MIDNIGHT <b>SOCIETY</b></span>
              </div>

              <div className="navlinks">
                <button onClick={() => scrollTo('home')}>HOME</button>
                <button onClick={() => scrollTo('about')}>ABOUT</button>
                <button onClick={() => scrollTo('divisions')}>DIVISIONS</button>
                <button onClick={() => scrollTo('leaders')}>THE COUNCIL</button>
                <button onClick={() => scrollTo('events')}>EVENTS</button>
                <button onClick={() => scrollTo('spellcraft')}>SPELLCRAFT</button>
                <button onClick={() => scrollTo('contact')}>CONTACT</button>
              </div>

              <div className="flex items-center gap-3">
                {/* Audio Toggle in Nav */}
                <button
                  onClick={handleToggleSound}
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded border border-[#3b1219] bg-[#120609]/70 text-stone-300 hover:text-red-400 hover:border-red-900 transition-colors"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX size={15} className="text-stone-500" /> : <Volume2 size={15} className="text-red-500" />}
                </button>

                {/* Return to Gates Button */}
                <button
                  onClick={() => {
                    gothicAudio.playGateOpening();
                    setEntered(false);
                  }}
                  title="Return to Castle Gates"
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded border border-[#3b1219] bg-[#120609]/70 text-stone-300 hover:text-amber-400 hover:border-amber-700 transition-colors"
                >
                  <Castle size={15} />
                </button>

                <button
                  className="mobile-menu"
                  onClick={() => setMenu(!menu)}
                >
                  {menu ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

              {menu && (
                <div className="mobile-links">
                  {['home', 'about', 'divisions', 'leaders', 'events', 'spellcraft', 'contact'].map((item) => (
                    <button key={item} onClick={() => scrollTo(item)}>
                      {item.toUpperCase()}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setEntered(false);
                      setMenu(false);
                    }}
                    className="flex items-center gap-2 text-stone-400 hover:text-amber-300 text-left"
                  >
                    <Castle size={15} />
                    <span>RETURN TO GATES</span>
                  </button>
                </div>
              )}
            </nav>

            {/* ================= HERO SECTION ================= */}
            <section id="home" className="hero">
              <div className="hero-image"></div>
              <div className="hero-overlay"></div>

              <div className="hero-content">
                <p className="eyebrow">✦ AWS STUDENT BUILDERS GROUP · MVJCE ✦</p>
                <h1>
                  WHERE DISTRIBUTED CLOUD ARCHITECTURE MEETS THE{' '}
                  <span>SHADOWS OF MIDNIGHT.</span>
                </h1>
                <p>
                  A community of curious minds, ambitious builders and future innovators exploring cloud technology, artificial intelligence and the possibilities of tomorrow.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <button
                    className="red-btn"
                    onClick={() => scrollTo('about')}
                  >
                    EXPLORE THE SOCIETY <ArrowDown size={17} />
                  </button>
                  <button
                    className="px-6 py-4 rounded border border-[#442128] bg-black/60 text-xs font-['Cinzel'] tracking-widest text-stone-300 hover:border-red-600 hover:text-white transition-all uppercase"
                    onClick={() => scrollTo('leaders')}
                  >
                    MEET OUR LEADERS
                  </button>
                </div>
              </div>
              <div className="vertical-text">THE MIDNIGHT CHRONICLES · 2026</div>
            </section>

            {/* ================= ABOUT SECTION ================= */}
            <section id="about" className="about section">
              <div className="section-label">01 — THE ORIGIN · BEYOND THE ORDINARY</div>
              <div className="about-grid">
                <div>
                  <p className="eyebrow">NOT JUST ANOTHER COMMUNITY</p>
                  <h2>
                    WE WERE BORN<br />
                    TO <span>BUILD.</span>
                  </h2>
                </div>
                <div className="about-text">
                  <p>
                    The AWS Student Builders Group is a student-driven community where technology meets creativity. We bring together passionate learners who want to explore cloud computing, build meaningful projects, collaborate with others and develop the skills needed to shape the future.
                  </p>
                  <p>
                    Our mission is to turn curiosity into creation through hands-on learning, innovation and collaboration.
                  </p>
                  <div className="stats">
                    <div>
                      <strong>∞</strong>
                      <small>IDEAS</small>
                    </div>
                    <div>
                      <strong>01</strong>
                      <small>COMMUNITY</small>
                    </div>
                    <div>
                      <strong>100%</strong>
                      <small>AMBITION</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Pillars of The Society */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                <div className="p-8 rounded-lg border border-[#3b1720] bg-gradient-to-b from-[#14080c] to-[#0a0507]">
                  <span className="font-['Cinzel_Decorative'] text-2xl font-bold text-red-600 block mb-3">01</span>
                  <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 mb-2">LEARN</h3>
                  <p className="text-xs text-stone-400 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    Explore cloud computing, emerging technologies and practical technical skills.
                  </p>
                </div>
                <div className="p-8 rounded-lg border border-[#3b1720] bg-gradient-to-b from-[#14080c] to-[#0a0507]">
                  <span className="font-['Cinzel_Decorative'] text-2xl font-bold text-red-600 block mb-3">02</span>
                  <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 mb-2">BUILD</h3>
                  <p className="text-xs text-stone-400 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    Turn ideas into real projects through experimentation and hands-on development.
                  </p>
                </div>
                <div className="p-8 rounded-lg border border-[#3b1720] bg-gradient-to-b from-[#14080c] to-[#0a0507]">
                  <span className="font-['Cinzel_Decorative'] text-2xl font-bold text-red-600 block mb-3">03</span>
                  <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 mb-2">CONNECT</h3>
                  <p className="text-xs text-stone-400 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    Collaborate with fellow builders, mentors and the wider technology community.
                  </p>
                </div>
              </div>
            </section>

            {/* ================= MANIFESTO ================= */}
            <section className="manifesto">
              <div className="manifesto-bg"></div>
              <div className="manifesto-content">
                <span>✦ OUR PHILOSOPHY ✦</span>
                <h2>
                  THE NIGHT IS<br />
                  YOUNG. SO ARE<br />
                  <i>OUR IDEAS.</i>
                </h2>
                <p>Think fearlessly. Build relentlessly. Grow together.</p>
              </div>
            </section>

            {/* ================= DIVISIONS SECTION ================= */}
            <section id="divisions" className="section">
              <div className="section-label">THE FOUR PILLARS OF THE SOCIETY</div>
              <div className="center-heading">
                <p className="eyebrow">DOMAINS OF MASTERY</p>
                <h2>OUR <span>DIVISIONS.</span></h2>
                <p>Where curious minds forge distributed systems and creative solutions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {divisions.map((div) => (
                  <div
                    key={div.number}
                    className="group rounded-xl border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] overflow-hidden transition-all duration-500 hover:border-red-600/70 hover:shadow-[0_15px_45px_-5px_rgba(184,20,36,0.45)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                      <img
                        src={div.image}
                        alt={div.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-110 brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0609] via-transparent to-black/35" />
                      <div className="absolute top-4 left-4 flex items-center gap-3">
                        <span className="font-['Cinzel_Decorative'] text-lg font-bold text-amber-200 px-2.5 py-1 rounded bg-black/75 border border-[#521c27]">
                          {div.number}
                        </span>
                        <span className="text-[10px] font-['Cinzel'] tracking-widest text-stone-300 uppercase px-2 py-1 rounded bg-black/60 border border-stone-800">
                          {div.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 group-hover:text-red-300 transition-colors">
                        {div.number} — {div.name}
                      </h3>
                      <p className="mt-3 text-xs font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
                        {div.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono text-stone-400">
                        {div.topics.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-[#1f0910] border border-[#3b151e] text-stone-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= LEADERSHIP / THE COUNCIL ================= */}
            <section id="leaders" className="leaders section">
              <div className="section-label">02 — THE COUNCIL · THE ARCHITECTS OF MIDNIGHT</div>
              <div className="center-heading">
                <p className="eyebrow">THE MINDS BEHIND THE MAGIC</p>
                <h2>
                  MEET THE <span>LEADERS.</span>
                </h2>
                <p>Every great society is built by people with a vision.</p>
              </div>

              <div className="leader-grid">
                {leaders.map((leader, index) => {
                  const uploadedPhoto = photos[leader.name];

                  return (
                    <motion.div
                      className="leader-card group cursor-pointer"
                      key={leader.name}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      onClick={() => {
                        setSelectedLeader(leader);
                        gothicAudio.playSubtleTick();
                      }}
                    >
                      <div className="leader-art">
                        {uploadedPhoto ? (
                          <img
                            src={uploadedPhoto}
                            alt={leader.name}
                            className="h-full w-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="leader-circle">
                            {leader.symbol}
                          </div>
                        )}
                        <span className="leader-number">0{index + 1}</span>
                        <span className="leader-corner">✦</span>

                        {/* Upload Controls */}
                        <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => {
                              fileInputRefs.current[leader.name] = el;
                            }}
                            onChange={(e) => handlePhotoUpload(leader.name, e)}
                            className="hidden"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRefs.current[leader.name]?.click();
                            }}
                            title="Upload Real Member Photograph"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/80 border border-stone-700 text-stone-300 hover:text-white hover:border-red-500 transition-colors"
                          >
                            <Camera size={13} />
                          </button>
                          {uploadedPhoto && (
                            <button
                              onClick={(e) => handleRemovePhoto(leader.name, e)}
                              title="Remove Photograph"
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/80 border border-stone-700 text-red-400 hover:text-red-200 hover:border-red-600 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="leader-role">{leader.role}</p>
                        <h3>{leader.name}</h3>
                        <div className="leader-line"></div>
                        <p className="mt-3 text-[11px] font-['Cormorant_Garamond'] text-stone-400 italic line-clamp-2">
                          &ldquo;{leader.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#2d151c] flex items-center justify-between text-[10px] font-['Cinzel'] text-stone-400">
                        <span>VIEW DOSSIER</span>
                        <span className="text-red-500">→</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ================= EVENTS / THE CHRONICLES ================= */}
            <section id="events" className="events section">
              <div className="section-label">03 — THE CHRONICLES · NIGHTS OF INNOVATION</div>
              <div className="center-heading">
                <p className="eyebrow">WHAT HAPPENS BEYOND THE GATES</p>
                <h2>
                  OUR <span>WORLD.</span>
                </h2>
              </div>

              <div className="event-grid">
                {events.map((event) => (
                  <div
                    className="event-card cursor-pointer"
                    key={event.number}
                    onClick={() => {
                      setSelectedEvent(event);
                      gothicAudio.playGothicBell(140, 1.8, 0.2);
                    }}
                  >
                    <div>
                      <span className="event-number">{event.number}</span>
                      <Flame size={28} />
                      <h3>{event.title}</h3>
                      <h4>{event.subtitle}</h4>
                      <p>{event.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#3b1720] flex items-center justify-between text-[11px] font-['Cinzel'] text-stone-400">
                      <span className="text-red-400">{event.datePlaceholder}</span>
                      <span className="event-star">✦</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= SPELLCRAFT SIMULATOR ================= */}
            <section id="spellcraft" className="section bg-[#060406]">
              <div className="section-label">INTERACTIVE CLOUD SPELLCRAFT SIMULATOR</div>
              <div className="center-heading">
                <p className="eyebrow">ARCHITECTURAL VAULT</p>
                <h2>THE <span>SPELLCRAFT ALTAR.</span></h2>
                <p>Inspect production-grade AWS CloudFormation & CDK stacks engineered by student builders.</p>
              </div>

              <div className="rounded-xl border border-[#3b1720] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] p-8 max-w-5xl mx-auto shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2d141b]">
                  <div className="flex flex-wrap gap-2">
                    {ARCH_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setActiveArch(preset);
                          gothicAudio.playSubtleTick();
                        }}
                        className={`px-4 py-2 text-xs font-['Cinzel'] font-bold tracking-wider rounded transition-all ${
                          activeArch.id === preset.id
                            ? 'bg-gradient-to-r from-[#7b0d1e] to-[#450912] text-white border border-[#d6a45a]/60 shadow-[0_0_12px_rgba(184,20,36,0.6)]'
                            : 'text-stone-400 hover:text-stone-200 border border-stone-800'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3d1822] text-xs font-mono text-stone-300 hover:text-white transition-colors"
                  >
                    {codeCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{codeCopied ? 'Copied' : 'Copy CDK'}</span>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-[#2d141b] bg-black/40 text-xs">
                    <span className="font-['Cinzel'] text-stone-400 block mb-1">TRIGGER & COMPUTE</span>
                    <div className="font-mono text-stone-200 font-semibold">{activeArch.trigger}</div>
                    <div className="font-mono text-red-400 mt-1">{activeArch.compute}</div>
                  </div>
                  <div className="p-4 rounded border border-[#2d141b] bg-black/40 text-xs">
                    <span className="font-['Cinzel'] text-stone-400 block mb-1">PERSISTENCE & RESILIENCE</span>
                    <div className="font-mono text-stone-200 font-semibold">{activeArch.storage}</div>
                    <div className="font-mono text-amber-300 mt-1">SLA: {activeArch.sla} · Latency: {activeArch.latency}</div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded bg-[#090608] border border-[#2d141b] font-mono text-xs text-stone-300 overflow-x-auto max-h-[220px]">
                  <pre>{activeArch.cdkCode}</pre>
                </div>
              </div>
            </section>

            {/* ================= JOIN / MANIFESTO VISION ================= */}
            <section className="join">
              <div className="join-bg"></div>
              <div className="join-content">
                <Moon size={34} />
                <p className="eyebrow">YOUR STORY STARTS HERE</p>
                <h2>
                  THE GATES ARE<br />
                  <span>OPEN.</span>
                </h2>
                <p>Don't just witness innovation. Become a part of it at MVJ College of Engineering.</p>
                <button
                  className="red-btn"
                  onClick={() => scrollTo('contact')}
                >
                  PLEDGE TO THE SOCIETY <ArrowDown size={16} />
                </button>
              </div>
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section id="contact" className="section bg-[#050305]">
              <div className="section-label">FIND YOUR PLACE IN THE SOCIETY</div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                <div className="lg:col-span-5">
                  <p className="eyebrow">COMMUNITY & COLLABORATION</p>
                  <h2 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-stone-100">
                    COME EXPLORE,<br />
                    <span>COLLABORATE & CREATE.</span>
                  </h2>
                  <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic leading-relaxed">
                    Curious about technology? Have an idea to build? Want to become part of a community of creators?
                  </p>

                  <div className="mt-8 space-y-4 text-xs font-['Plus_Jakarta_Sans'] text-stone-300">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Institution</span>
                        <span className="font-semibold text-stone-200">MVJ College of Engineering</span>
                        <span className="block text-[11px] text-stone-400">Near ITPB, Channasandra, Kadugodi, Bengaluru</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Email (Placeholder)</span>
                        <span className="font-mono text-stone-300">builders.midnight@mvjce.edu.in</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Instagram size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Instagram (Placeholder)</span>
                        <span className="font-mono text-stone-300">@midnight.aws.mvjce</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="p-8 rounded-xl border border-[#3b1720] bg-gradient-to-b from-[#14080c] to-[#080406]">
                    {!contactSent ? (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g. Rahul Sharma"
                              className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs text-stone-200 focus:outline-none focus:border-red-600"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                              Student Email *
                            </label>
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="student@mvjce.edu.in"
                              className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs text-stone-200 focus:outline-none focus:border-red-600"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                            Your Message or Build Idea *
                          </label>
                          <textarea
                            rows={4}
                            value={contactMsg}
                            onChange={(e) => setContactMsg(e.target.value)}
                            placeholder="Tell us what you want to build or how you want to contribute to The Midnight Society..."
                            className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs text-stone-200 focus:outline-none focus:border-red-600 resize-none"
                            required
                          />
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            className="enter-btn !mt-2"
                          >
                            <Send size={15} />
                            <span>TRANSMIT DISPATCH</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="py-8 text-center flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-red-950/80 border border-red-600 flex items-center justify-center text-red-400 mb-3">
                          <Check size={24} />
                        </div>
                        <h4 className="font-['Cinzel'] text-xl font-bold text-stone-100">
                          Dispatch Received by The Council
                        </h4>
                        <p className="mt-2 text-xs font-['Cormorant_Garamond'] text-stone-300 italic max-w-sm">
                          Thank you, {contactName}. The Midnight Society leadership team at MVJ College of Engineering will get in touch with you.
                        </p>
                        <button
                          onClick={() => {
                            setContactSent(false);
                            setContactName('');
                            setContactEmail('');
                            setContactMsg('');
                          }}
                          className="mt-6 text-xs font-['Cinzel'] text-red-400 underline underline-offset-4"
                        >
                          Send another dispatch
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer>
              <div className="footer-brand">♛ AWS SBG · THE MIDNIGHT SOCIETY</div>
              <p>AWS STUDENT BUILDERS GROUP · MVJ COLLEGE OF ENGINEERING</p>
              <p className="text-amber-200/90 italic font-['Cormorant_Garamond'] text-base tracking-wide mt-2">
                &ldquo;BUILD AFTER DARK. CREATE BEYOND LIMITS.&rdquo;
              </p>
              <div className="footer-line"></div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-['Cinzel'] tracking-wider mb-6 text-stone-400">
                <button onClick={() => scrollTo('home')} className="hover:text-red-400">HOME</button>
                <button onClick={() => scrollTo('about')} className="hover:text-red-400">ABOUT</button>
                <button onClick={() => scrollTo('divisions')} className="hover:text-red-400">DIVISIONS</button>
                <button onClick={() => scrollTo('leaders')} className="hover:text-red-400">THE COUNCIL</button>
                <button onClick={() => scrollTo('events')} className="hover:text-red-400">EVENTS</button>
                <button onClick={() => scrollTo('contact')} className="hover:text-red-400">CONTACT</button>
              </div>

              <small>© 2026 AWS STUDENT BUILDERS GROUP · MVJ COLLEGE OF ENGINEERING</small>
            </footer>

            {/* Leader Dossier Modal */}
            {selectedLeader && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <div className="relative w-full max-w-lg rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-2xl">
                  <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
                    <div>
                      <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                        {selectedLeader.role} · {selectedLeader.covenRank}
                      </span>
                      <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1 flex items-center gap-2">
                        <span>{selectedLeader.symbol}</span>
                        <span>{selectedLeader.name}</span>
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedLeader(null)}
                      className="text-stone-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded border border-[#3b1720]"
                    >
                      CLOSE
                    </button>
                  </div>

                  <div className="mt-6 space-y-4 text-xs font-['Plus_Jakarta_Sans'] text-stone-300">
                    <div>
                      <h4 className="font-['Cinzel'] text-stone-400 text-[11px] mb-1">BIOGRAPHY</h4>
                      <p className="leading-relaxed">{selectedLeader.bio}</p>
                    </div>

                    <div className="p-3.5 rounded border border-[#3b1720] bg-black/50">
                      <h4 className="font-['Cinzel'] text-red-400 text-[11px] mb-1">PHILOSOPHY</h4>
                      <p className="font-['Cormorant_Garamond'] text-sm text-stone-200 italic">
                        &ldquo;{selectedLeader.quote}&rdquo;
                      </p>
                    </div>

                    <div>
                      <h4 className="font-['Cinzel'] text-stone-400 text-[11px] mb-2">AREAS OF EXPERTISE</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLeader.focus.map((f) => (
                          <span key={f} className="px-2.5 py-1 rounded bg-[#20090f] border border-[#48141d] text-amber-200 font-mono text-[11px]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setSelectedLeader(null)}
                      className="px-5 py-2 text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#2b0c12] border border-red-800 rounded hover:bg-[#45121c] transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Event Details Modal */}
            {selectedEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <div className="relative w-full max-w-lg rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-2xl">
                  <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
                    <div>
                      <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                        {selectedEvent.tag} · {selectedEvent.number}
                      </span>
                      <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
                        {selectedEvent.title}
                      </h3>
                      <p className="font-['Cormorant_Garamond'] text-stone-300 italic text-base mt-1">
                        {selectedEvent.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-stone-400 hover:text-white font-mono text-xs px-2.5 py-1 rounded border border-[#3b1720]"
                    >
                      CLOSE
                    </button>
                  </div>

                  <div className="mt-6 space-y-4 text-xs font-['Plus_Jakarta_Sans'] text-stone-300">
                    <p className="leading-relaxed">{selectedEvent.description}</p>
                    <div className="p-3 rounded border border-[#3b1720] bg-black/50 text-red-400 font-['Cinzel']">
                      {selectedEvent.datePlaceholder}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-5 py-2 text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#2b0c12] border border-red-800 rounded hover:bg-[#45121c] transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
