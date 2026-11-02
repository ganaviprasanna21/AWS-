import React, { useState } from 'react';
import { BookOpen, Hammer, Network, Terminal, Copy, Check, Layers, Cpu, Database, Lock } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface ArchitecturePreset {
  id: string;
  name: string;
  trigger: string;
  compute: string;
  storage: string;
  security: string;
  latency: string;
  sla: string;
  cdkCode: string;
  description: string;
}

const PRESETS: ArchitecturePreset[] = [
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
import * as kms from 'aws-cdk-lib/aws-kms';

export class NocturnalIngestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    const cryptKey = new kms.Key(this, 'CryptKey', { enableKeyRotation: true });
    const ledger = new dynamodb.Table(this, 'ImmortalLedger', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: cryptKey,
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
    description: 'Zero idle cost, resilient event pipeline capable of absorbing sudden burst spikes during midnight hackathons without sweating.',
  },
  {
    id: 'realtime-stream',
    name: 'Crimson Streaming & Real-Time Telemetry',
    trigger: 'Amazon Kinesis Data Firehose',
    compute: 'Amazon ECS on AWS Fargate',
    storage: 'Amazon Aurora Serverless v2 (PostgreSQL)',
    security: 'AWS Shield Advanced & Private VPC Subnets',
    latency: '9ms (p99)',
    sla: '99.99%',
    cdkCode: `// Real-Time Crimson Telemetry Stack
import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CrimsonStreamStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    const vpc = new ec2.Vpc(this, 'SanctumVpc', { maxAzs: 3 });
    const cluster = new rds.DatabaseCluster(this, 'AuroraCrypt', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_16_1,
      }),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 16.0,
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    });
  }
}`,
    description: 'Auto-scaling relational core paired with isolated subnets for zero external exposure and sub-millisecond connection pooling.',
  },
  {
    id: 'ai-bedrock-sanctum',
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
    description: 'High-precision generative synthesis on AWS Bedrock with end-to-end telemetry and zero-data-retention security compliance.',
  },
];

export const AboutSection: React.FC = () => {
  const [activePreset, setActivePreset] = useState<ArchitecturePreset>(PRESETS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activePreset.cdkCode);
    setCopied(true);
    gothicAudio.playSubtleTick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative py-28 border-t border-[#231217] bg-[#070508]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header with Exact Requested Title & Description */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
            <span>About The Society</span>
            <span aria-hidden="true">·</span>
            <span>MVJ College of Engineering</span>
          </div>

          {/* Exact Section Title Requested */}
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
            BEYOND THE ORDINARY.
          </h2>

          {/* Exact Description Requested */}
          <div className="mt-5 space-y-4 font-['Cormorant_Garamond'] text-xl sm:text-2xl text-stone-300 leading-relaxed italic">
            <p>
              The AWS Student Builders Group is a student-driven community where technology meets creativity. We bring together passionate learners who want to explore cloud computing, build meaningful projects, collaborate with others and develop the skills needed to shape the future.
            </p>
            <p className="text-stone-400 not-italic font-['Plus_Jakarta_Sans'] text-sm sm:text-base leading-relaxed">
              Our mission is to turn curiosity into creation through hands-on learning, innovation and collaboration.
            </p>
          </div>
        </div>

        {/* Exactly Requested 3 Editorial Cards: 01 LEARN, 02 BUILD, 03 CONNECT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Card 01 — LEARN */}
          <div className="group relative p-8 sm:p-10 rounded-lg border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] gothic-card-border transition-all duration-300 hover:border-red-600/70 hover:shadow-[0_10px_35px_-5px_rgba(184,20,36,0.4)] flex flex-col justify-between">
            <div className="filigree-corner-tl !border-red-500/60" />
            <div className="filigree-corner-tr !border-red-500/60" />
            <div className="filigree-corner-bl !border-red-500/60" />
            <div className="filigree-corner-br !border-red-500/60" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-['Cinzel_Decorative'] text-3xl font-black text-red-600/80">
                  01
                </span>
                <div className="h-10 w-10 rounded-full bg-[#20090f] border border-[#52131e] flex items-center justify-center text-red-400">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mb-3 tracking-wide group-hover:text-red-300 transition-colors">
                LEARN
              </h3>

              <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-400 leading-relaxed">
                Explore cloud computing, emerging technologies and practical technical skills.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-500 group-hover:text-stone-300">
              <span>FOUNDATION</span>
              <span className="text-red-500">→</span>
            </div>
          </div>

          {/* Card 02 — BUILD */}
          <div className="group relative p-8 sm:p-10 rounded-lg border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] gothic-card-border transition-all duration-300 hover:border-red-600/70 hover:shadow-[0_10px_35px_-5px_rgba(184,20,36,0.4)] flex flex-col justify-between">
            <div className="filigree-corner-tl !border-red-500/60" />
            <div className="filigree-corner-tr !border-red-500/60" />
            <div className="filigree-corner-bl !border-red-500/60" />
            <div className="filigree-corner-br !border-red-500/60" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-['Cinzel_Decorative'] text-3xl font-black text-red-600/80">
                  02
                </span>
                <div className="h-10 w-10 rounded-full bg-[#20090f] border border-[#52131e] flex items-center justify-center text-red-400">
                  <Hammer className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mb-3 tracking-wide group-hover:text-red-300 transition-colors">
                BUILD
              </h3>

              <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-400 leading-relaxed">
                Turn ideas into real projects through experimentation and hands-on development.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-500 group-hover:text-stone-300">
              <span>EXECUTION</span>
              <span className="text-red-500">→</span>
            </div>
          </div>

          {/* Card 03 — CONNECT */}
          <div className="group relative p-8 sm:p-10 rounded-lg border border-[#3b1c24] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] gothic-card-border transition-all duration-300 hover:border-red-600/70 hover:shadow-[0_10px_35px_-5px_rgba(184,20,36,0.4)] flex flex-col justify-between">
            <div className="filigree-corner-tl !border-red-500/60" />
            <div className="filigree-corner-tr !border-red-500/60" />
            <div className="filigree-corner-bl !border-red-500/60" />
            <div className="filigree-corner-br !border-red-500/60" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-['Cinzel_Decorative'] text-3xl font-black text-red-600/80">
                  03
                </span>
                <div className="h-10 w-10 rounded-full bg-[#20090f] border border-[#52131e] flex items-center justify-center text-red-400">
                  <Network className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mb-3 tracking-wide group-hover:text-red-300 transition-colors">
                CONNECT
              </h3>

              <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-400 leading-relaxed">
                Collaborate with fellow builders, mentors and the wider technology community.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2d141b] flex items-center justify-between text-xs font-['Cinzel'] text-stone-500 group-hover:text-stone-300">
              <span>COMMUNITY</span>
              <span className="text-red-500">→</span>
            </div>
          </div>
        </div>

        {/* Interactive Architecture Ritual Altar */}
        <div id="spellcraft" className="relative rounded-xl border border-[#481e28] bg-gradient-to-b from-[#160a0f] via-[#0d070a] to-[#070508] p-8 lg:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#2d161d]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-400 font-semibold mb-2">
                <Terminal className="h-4 w-4" />
                <span>Interactive Cloud Spellcraft Simulator</span>
              </div>
              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-stone-100">
                The Architectural Ritual Altar
              </h3>
              <p className="mt-1 font-['Cormorant_Garamond'] text-stone-300 italic text-base">
                Inspect how MVJCE student builders design distributed cloud topologies for real-world resilience.
              </p>
            </div>

            {/* Presets Segmented Selector */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg bg-black/60 border border-[#3a1921]">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActivePreset(preset);
                    gothicAudio.playSubtleTick();
                  }}
                  className={`px-4 py-2 text-xs font-['Cinzel'] font-bold tracking-wider rounded transition-all cursor-pointer ${
                    activePreset.id === preset.id
                      ? 'bg-gradient-to-r from-[#7b0d1e] to-[#450912] text-white shadow-[0_0_12px_rgba(184,20,36,0.6)] border border-[#d6a45a]/60'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {preset.name.split(' ')[0]} {preset.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Topology Display */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Blueprint Cards (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-4 rounded border border-[#3b1720] bg-black/40">
                <span className="text-xs font-['Cinzel'] text-stone-400">STACK CLASSIFICATION</span>
                <h4 className="font-['Cinzel'] text-xl font-bold text-red-300 mt-1">
                  {activePreset.name}
                </h4>
                <p className="mt-2 text-xs font-['Plus_Jakarta_Sans'] text-stone-300 leading-relaxed">
                  {activePreset.description}
                </p>
              </div>

              {/* 4 Architectural Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded border border-[#2d141b] bg-[#10070a]/80">
                  <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-stone-400 mb-1">
                    <Layers className="h-3.5 w-3.5 text-red-500" />
                    <span>01. Ingestion Trigger</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-200 font-mono">
                    {activePreset.trigger}
                  </div>
                </div>

                <div className="p-4 rounded border border-[#2d141b] bg-[#10070a]/80">
                  <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-stone-400 mb-1">
                    <Cpu className="h-3.5 w-3.5 text-red-500" />
                    <span>02. Compute Layer</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-200 font-mono">
                    {activePreset.compute}
                  </div>
                </div>

                <div className="p-4 rounded border border-[#2d141b] bg-[#10070a]/80">
                  <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-stone-400 mb-1">
                    <Database className="h-3.5 w-3.5 text-red-500" />
                    <span>03. Persistence Vault</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-200 font-mono">
                    {activePreset.storage}
                  </div>
                </div>

                <div className="p-4 rounded border border-[#2d141b] bg-[#10070a]/80">
                  <div className="flex items-center gap-2 text-xs font-['Cinzel'] text-stone-400 mb-1">
                    <Lock className="h-3.5 w-3.5 text-red-500" />
                    <span>04. Cryptographic Sentinel</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-200 font-mono">
                    {activePreset.security}
                  </div>
                </div>
              </div>

              {/* Telemetry Strip */}
              <div className="flex items-center justify-between p-4 rounded border border-red-950/60 bg-[#16060a]/40 text-xs font-['Cinzel']">
                <div>
                  <span className="text-stone-400">Simulated p99 Latency: </span>
                  <span className="text-red-400 font-bold font-mono">{activePreset.latency}</span>
                </div>
                <div className="h-3 w-px bg-[#3b1720]" />
                <div>
                  <span className="text-stone-400">High-Availability SLA: </span>
                  <span className="text-amber-300 font-bold font-mono">{activePreset.sla}</span>
                </div>
              </div>
            </div>

            {/* Right CDK Code Terminal (5 cols) */}
            <div className="lg:col-span-5 rounded-lg border border-[#3b1720] bg-[#090608] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-[#13080c] border-b border-[#2d141b]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-600/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600/80" />
                  <span className="ml-2 text-[11px] font-mono text-stone-400">stack.cdk.ts</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy CDK</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 overflow-x-auto max-h-[320px] font-mono text-xs text-stone-300 leading-relaxed">
                <pre>{activePreset.cdkCode}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
