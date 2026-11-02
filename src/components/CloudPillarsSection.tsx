import React, { useState } from 'react';
import { Cpu, Database, BrainCircuit, ShieldAlert, Globe2, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface Pillar {
  id: string;
  name: string;
  category: string;
  services: string[];
  summary: string;
  deepDive: string;
  cliCommand: string;
  highlights: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'compute',
    name: 'Nocturnal Compute & Serverless Daemons',
    category: 'Execution Spire',
    services: ['AWS Lambda', 'Amazon ECS Fargate', 'EC2 Graviton4'],
    summary: 'Sub-millisecond cold starts, ARM64 energy efficiency, and transient compute instances that awaken only upon stimulus.',
    deepDive: 'Architecting stateless event handlers with optimized package sizes, custom Lambda layers, and Graviton4 execution cores offering up to 30% superior compute performance.',
    cliCommand: 'aws lambda create-function --function-name ShadowDaemon --runtime nodejs22.x --architectures arm64',
    highlights: ['Microsecond metering', 'Zero idle overhead', 'Auto-scaling from 0 to 50k RPS'],
  },
  {
    id: 'storage',
    name: 'The Immortal Vault & Ledger',
    category: 'Persistence Spire',
    services: ['Amazon DynamoDB', 'Amazon Aurora Serverless v2', 'Amazon S3'],
    summary: 'Multi-region active-active persistence guaranteeing sub-10ms reads and eleven 9s of durability across tectonic disasters.',
    deepDive: 'Global tables replicating state across Frankfurt, Virginia, and Tokyo within 800 milliseconds, combined with S3 Glacier Instant Retrieval for historical telemetry.',
    cliCommand: 'aws dynamodb create-global-table --global-table-name CovenLedger --replication-group RegionName=us-east-1 RegionName=eu-central-1',
    highlights: ['99.999% SLA', 'Multi-Master Replication', 'Point-In-Time Recovery'],
  },
  {
    id: 'ai',
    name: 'Arcane Intelligence & Cognitive Altars',
    category: 'Cognition Spire',
    services: ['Amazon Bedrock', 'Amazon SageMaker', 'Amazon Q Developer'],
    summary: 'Private foundation model invocation without data leakage, combined with custom embeddings in OpenSearch vector vaults.',
    deepDive: 'Deploying Retrieval-Augmented Generation (RAG) pipelines over AWS documentation archives, orchestrated by Bedrock Knowledge Bases and Guardrails.',
    cliCommand: 'aws bedrock list-foundation-models --by-output-modality TEXT',
    highlights: ['Zero data training opt-out', 'Native multi-model failover', 'Prompt Guardrail filters'],
  },
  {
    id: 'security',
    name: 'The Cryptic Bastion & Shield',
    category: 'Protection Spire',
    services: ['AWS KMS', 'AWS IAM Zero-Trust', 'AWS GuardDuty', 'AWS WAF'],
    summary: 'Cryptographic envelopes, hardware security modules (CloudHSM), and behavioral anomaly hunting across CloudTrail logs.',
    deepDive: 'Mandatory short-lived STS tokens, Session Policies, and automated IAM Access Analyzer reports preventing accidental exposure to daylight.',
    cliCommand: 'aws kms create-key --description "Coven Master Cryptographic Key" --origin AWS_KMS',
    highlights: ['Envelope encryption', 'Automated anomaly triage', 'Hardware root-of-trust'],
  },
  {
    id: 'network',
    name: 'Global Bloodlines & Edge Transit',
    category: 'Distribution Spire',
    services: ['Amazon CloudFront', 'AWS Route 53', 'AWS Global Accelerator'],
    summary: 'Anycast DNS edge routing with CloudFront Functions executing bytecode at hundreds of global points of presence.',
    deepDive: 'Delivering static and dynamic content within 15 milliseconds of the viewer worldwide, leveraging AWS private backbone fiber.',
    cliCommand: 'aws cloudfront create-distribution --origin-domain-name coven.internal',
    highlights: ['600+ Global POPs', 'Sub-2ms edge execution', 'DDoS automated absorption'],
  },
  {
    id: 'telemetry',
    name: 'Observability & Nocturnal Probers',
    category: 'Vigilance Spire',
    services: ['Amazon CloudWatch', 'AWS X-Ray', 'Amazon Managed Prometheus'],
    summary: 'End-to-end distributed transaction tracing, anomaly alarms, and synthetic probers watching while engineers rest.',
    deepDive: 'Correlating high-cardinality traces across microservices with CloudWatch Logs Insights queries running in parallel.',
    cliCommand: 'aws xray get-trace-summaries --start-time $(date -u -v-1H +%s) --end-time $(date -u +%s)',
    highlights: ['High-cardinality indexing', 'Automated Canary Alarms', 'Sub-second anomaly alert'],
  },
];

export const CloudPillarsSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  const handleInspect = (pillar: Pillar) => {
    setSelectedPillar(pillar);
    gothicAudio.playGothicBell(150, 1.8, 0.2);
  };

  return (
    <section id="pillars" className="relative py-28 border-t border-[#231217] bg-[#050406]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
              <span>Technological Spire</span>
              <span aria-hidden="true">·</span>
              <span>AWS Architecture</span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
              The Six Cloud Spires of The Society
            </h2>
            <p className="mt-4 font-['Cormorant_Garamond'] text-xl text-stone-300 italic">
              Every system built under our seal is architected around these immutable cloud disciplines. Click any spire to inspect its cryptographic blueprints.
            </p>
          </div>

          <div className="text-xs font-['Cinzel'] tracking-widest text-stone-400">
            DISCIPLINE · HIGH RESILIENCE SYSTEMS
          </div>
        </div>

        {/* Bento Grid of 6 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const icons = [Cpu, Database, BrainCircuit, ShieldAlert, Globe2, Activity];
            const Icon = icons[idx];

            return (
              <div
                key={pillar.id}
                onClick={() => handleInspect(pillar)}
                className="group relative cursor-pointer p-8 rounded-lg border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] transition-all duration-300 hover:border-red-600/70 hover:shadow-[0_10px_35px_-5px_rgba(184,20,36,0.4)] flex flex-col justify-between"
              >
                {/* Ornate Filigree Corner Accents */}
                <div className="filigree-corner-tl !border-red-400/40 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-tr !border-red-400/40 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-bl !border-red-400/40 group-hover:!border-red-400 transition-colors" />
                <div className="filigree-corner-br !border-red-400/40 group-hover:!border-red-400 transition-colors" />

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-11 w-11 rounded-lg bg-[#220a10] border border-[#52131e] flex items-center justify-center text-red-400 group-hover:text-red-200 group-hover:border-red-600 transition-all shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-['Cinzel'] tracking-[0.2em] text-red-400/80 uppercase">
                      {pillar.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Cinzel'] text-xl font-bold text-stone-100 group-hover:text-red-300 transition-colors leading-snug">
                    {pillar.name}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 font-['Plus_Jakarta_Sans'] text-xs text-stone-400 leading-relaxed">
                    {pillar.summary}
                  </p>

                  {/* Quiet Unboxed Services */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-mono text-stone-400">
                    {pillar.services.map((srv, sIdx) => (
                      <React.Fragment key={srv}>
                        <span className="text-stone-300 font-medium">{srv}</span>
                        {sIdx < pillar.services.length - 1 && <span className="text-red-600">/</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-4 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-400 group-hover:text-stone-200">
                  <span className="tracking-widest">INSPECT BLUEPRINT</span>
                  <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Deep Dive Inspection */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-xl border border-red-900/80 bg-gradient-to-b from-[#19090f] via-[#0f070a] to-[#070508] p-8 shadow-[0_0_60px_rgba(184,20,36,0.5)]">
            <div className="filigree-corner-tl !border-red-400" />
            <div className="filigree-corner-tr !border-red-400" />
            <div className="filigree-corner-bl !border-red-400" />
            <div className="filigree-corner-br !border-red-400" />

            <div className="flex items-center justify-between pb-4 border-b border-[#3b1720]">
              <div>
                <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
                  {selectedPillar.category}
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
                  {selectedPillar.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedPillar(null);
                  gothicAudio.playSubtleTick();
                }}
                className="text-stone-400 hover:text-white font-mono text-sm px-3 py-1 rounded border border-[#3b1720] hover:border-red-700"
              >
                ESC
              </button>
            </div>

            <p className="mt-4 text-sm font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
              {selectedPillar.deepDive}
            </p>

            <div className="mt-6">
              <span className="text-xs font-['Cinzel'] tracking-wider text-stone-400">
                Key Architectural Invariants:
              </span>
              <div className="mt-2 flex flex-col gap-2">
                {selectedPillar.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <span className="text-xs font-mono text-stone-400 block mb-1">AWS CLI Signature:</span>
              <div className="p-3 rounded bg-black/70 border border-[#3b1720] font-mono text-xs text-red-300 overflow-x-auto">
                {selectedPillar.cliCommand}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setSelectedPillar(null);
                  gothicAudio.playSubtleTick();
                }}
                className="px-6 py-2.5 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-widest text-stone-200 bg-[#280b11] border border-red-800 hover:bg-[#40101a] transition-colors"
              >
                Close Crypt
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
