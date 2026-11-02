import React, { useState } from 'react';
import { X, ShieldCheck, Terminal, Copy, Check, ArrowRight, Layers, Database, Lock, Cpu } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface ArchitectureRitualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureRitualModal: React.FC<ArchitectureRitualModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<'event-driven' | 'multi-region' | 'bedrock-rag'>('event-driven');

  if (!isOpen) return null;

  const patterns = {
    'event-driven': {
      title: 'Nocturnal Event-Driven Choreography',
      topology: ['API Gateway', 'EventBridge Bus', 'Step Functions', 'AWS Lambda (Arm64)', 'DynamoDB Global'],
      resilienceScore: '99.999%',
      latencyP99: '14 ms',
      estimatedCost: '$0.00 / Idle',
      yamlCode: `# AWS SAM / CloudFormation Blueprint
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Nocturnal Event-Driven Choreography - The Midnight Society

Resources:
  NocturnalEventBus:
    Type: AWS::Events::EventBus
    Properties:
      Name: midnight-society-bus

  IngestFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: app.lambdaHandler
      Runtime: nodejs22.x
      Architectures:
        - arm64
      MemorySize: 512
      Timeout: 10
      Environment:
        Variables:
          EVENT_BUS_NAME: !Ref NocturnalEventBus`,
    },
    'multi-region': {
      title: 'Active-Active Multi-Region Fortress',
      topology: ['Route 53 Geolocation', 'CloudFront Anycast', 'ALB Pair', 'ECS Fargate Containers', 'Aurora Serverless v2 Multi-Master'],
      resilienceScore: '99.9999%',
      latencyP99: '8 ms',
      estimatedCost: 'Pay-per-ACU scale to 0.5',
      yamlCode: `# Multi-Region Route 53 Active-Active Routing
Resources:
  PrimaryHealthCheck:
    Type: AWS::Route53::HealthCheck
    Properties:
      HealthCheckConfig:
        Type: HTTPS
        ResourcePath: /health
        FullyQualifiedDomainName: us-east-1.midnight.internal
        RequestInterval: 10
        FailureThreshold: 2`,
    },
    'bedrock-rag': {
      title: 'Cognitive Arcane Bedrock RAG Pipeline',
      topology: ['Client Request', 'WAF Filter', 'Lambda Orchestrator', 'OpenSearch Serverless Vector', 'Bedrock Claude 3.5 Sonnet'],
      resilienceScore: '99.95%',
      latencyP99: '140 ms',
      estimatedCost: '$0.003 / Query',
      yamlCode: `# Amazon Bedrock Knowledge Base Integration
Resources:
  VectorSearchCollection:
    Type: AWS::OpenSearchServerless::Collection
    Properties:
      Name: midnight-coven-vectors
      Type: VECTORSEARCH`,
    },
  };

  const current = patterns[selectedPattern];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.yamlCode);
    setCopied(true);
    gothicAudio.playSubtleTick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-[0_0_60px_rgba(184,20,36,0.6)]">
        <div className="filigree-corner-tl !border-red-400" />
        <div className="filigree-corner-tr !border-red-400" />
        <div className="filigree-corner-bl !border-red-400" />
        <div className="filigree-corner-br !border-red-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
          <div>
            <span className="text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
              The Architecture Vault · AWS Blueprint
            </span>
            <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Pattern Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(['event-driven', 'multi-region', 'bedrock-rag'] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPattern(key);
                gothicAudio.playSubtleTick();
              }}
              className={`px-4 py-2 text-xs font-['Cinzel'] font-bold tracking-wider rounded border transition-all ${
                selectedPattern === key
                  ? 'border-red-600 bg-[#300c14] text-white shadow-[0_0_15px_rgba(184,20,36,0.5)]'
                  : 'border-[#38161f] bg-black/40 text-stone-400 hover:text-white'
              }`}
            >
              {key === 'event-driven' && 'Event-Driven Ingestion'}
              {key === 'multi-region' && 'Multi-Region High Availability'}
              {key === 'bedrock-rag' && 'Bedrock AI Arcane RAG'}
            </button>
          ))}
        </div>

        {/* Topology Pipeline Visualization */}
        <div className="mt-6 p-4 rounded-lg border border-[#3b1720] bg-black/60">
          <span className="text-[11px] font-['Cinzel'] text-stone-400 uppercase block mb-3">
            Active Architectural Flow:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {current.topology.map((node, i) => (
              <React.Fragment key={node}>
                <div className="px-3 py-1.5 rounded border border-[#481c25] bg-[#16070b] text-xs font-mono text-stone-200">
                  {node}
                </div>
                {i < current.topology.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-red-500 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded border border-[#2d141b] bg-[#10070a]">
            <span className="text-[10px] font-['Cinzel'] text-stone-400 block">RESILIENCE SLA</span>
            <span className="font-mono text-sm font-bold text-emerald-400">{current.resilienceScore}</span>
          </div>
          <div className="p-3 rounded border border-[#2d141b] bg-[#10070a]">
            <span className="text-[10px] font-['Cinzel'] text-stone-400 block">P99 LATENCY</span>
            <span className="font-mono text-sm font-bold text-red-400">{current.latencyP99}</span>
          </div>
          <div className="p-3 rounded border border-[#2d141b] bg-[#10070a]">
            <span className="text-[10px] font-['Cinzel'] text-stone-400 block">EST. RUNTIME COST</span>
            <span className="font-mono text-sm font-bold text-amber-300">{current.estimatedCost}</span>
          </div>
        </div>

        {/* CloudFormation Code Preview */}
        <div className="mt-6 rounded-lg border border-[#3b1720] bg-[#090608] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#14080c] border-b border-[#2d141b]">
            <span className="text-[11px] font-mono text-stone-400">template.yaml</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono text-stone-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Blueprint'}</span>
            </button>
          </div>
          <div className="p-4 max-h-[220px] overflow-x-auto font-mono text-xs text-stone-300 leading-relaxed">
            <pre>{current.yamlCode}</pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-wider text-stone-200 bg-[#280b11] border border-red-800 hover:bg-[#40101a] transition-colors"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
