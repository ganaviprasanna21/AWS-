import React, { useState } from 'react';
import { X, Shield, Sparkles, Check, Copy } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('Sophomore');
  const [guild, setGuild] = useState('Serverless & Distributed Systems');
  const [github, setGithub] = useState('');
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [initiateToken, setInitiateToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Provide your name, Initiate';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid institutional or builder email required';
    if (!pledgeAccepted) newErrors.pledge = 'You must swear the solemn oath to join';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate cryptographic token
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const token = `MIDNIGHT-AWS-${randomHex}-2026`;
    setInitiateToken(token);
    setIsSubmitted(true);
    gothicAudio.playGothicBell(95, 3.5, 0.4);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(initiateToken);
    setCopied(true);
    gothicAudio.playSubtleTick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPledgeAccepted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-xl border border-red-900/80 bg-gradient-to-b from-[#18080d] via-[#0d0508] to-[#070406] p-8 shadow-[0_0_60px_rgba(184,20,36,0.6)]">
        {/* Filigree Corner Accents */}
        <div className="filigree-corner-tl !border-red-400" />
        <div className="filigree-corner-tr !border-red-400" />
        <div className="filigree-corner-bl !border-red-400" />
        <div className="filigree-corner-br !border-red-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#3b1720]">
          <div>
            <div className="flex items-center gap-2 text-xs font-['Cinzel'] tracking-widest text-red-400 uppercase">
              <Shield className="h-3.5 w-3.5" />
              <span>Sanctum Induction</span>
            </div>
            <h3 className="font-['Cinzel'] text-2xl font-bold text-stone-100 mt-1">
              Pledge to The Midnight Society
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                Full Name of Initiate *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Katherine Thorne"
                className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600 transition-colors"
              />
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                University or Builder Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="builder@university.edu"
                className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600 transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Grid: Year of Study & Desired Guild */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                  Academic Standing
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600"
                >
                  <option value="Freshman">Freshman / 1st Year</option>
                  <option value="Sophomore">Sophomore / 2nd Year</option>
                  <option value="Junior">Junior / 3rd Year</option>
                  <option value="Senior">Senior / 4th Year</option>
                  <option value="Graduate">Postgraduate / Researcher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                  Primary Guild Interest
                </label>
                <select
                  value={guild}
                  onChange={(e) => setGuild(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600"
                >
                  <option value="Serverless & Distributed Systems">Serverless & Distributed</option>
                  <option value="Cloud Security & Cryptography">Zero-Trust & DevSecOps</option>
                  <option value="Bedrock AI & Machine Learning">Amazon Bedrock & GenAI</option>
                  <option value="Containers & Kubernetes">ECS, EKS & Cloud Native</option>
                </select>
              </div>
            </div>

            {/* GitHub / Portfolio */}
            <div>
              <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                GitHub Handle or Cloud Portfolio (Optional)
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github.com/nocturnal-dev"
                className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-mono text-stone-200 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {/* The Solemn Oath Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded border border-[#38161f] bg-black/40">
                <input
                  type="checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-stone-700 bg-stone-900 text-red-600 accent-red-600 focus:ring-0"
                />
                <span className="text-[11px] font-['Cormorant_Garamond'] text-stone-300 leading-snug italic">
                  &ldquo;I hereby pledge to uphold the AWS Well-Architected Framework, never commit secrets to public repositories, eliminate single points of failure, and honor the Midnight Coven.&rdquo;
                </span>
              </label>
              {errors.pledge && (
                <p className="mt-1 text-[11px] text-red-400">{errors.pledge}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded text-xs font-['Cinzel'] uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-[0.15em] text-white bg-gradient-to-r from-[#7b0d1e] via-[#9e1327] to-[#7b0d1e] border border-[#d6a45a]/70 hover:shadow-[0_0_20px_rgba(184,20,36,0.6)] transition-all"
              >
                Seal Induction Pledge
              </button>
            </div>
          </form>
        ) : (
          /* Induction Successful State */
          <div className="mt-6 flex flex-col items-center text-center py-4">
            {/* Wax Seal Graphic */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#7b0d1e] to-[#25060b] border-2 border-amber-300/70 shadow-[0_0_30px_rgba(184,20,36,0.8)] flex items-center justify-center mb-4">
              <Sparkles className="h-9 w-9 text-amber-200 animate-pulse" />
            </div>

            <h4 className="font-['Cinzel'] text-2xl font-bold text-stone-100">
              Pledge Sealed in the Shadows
            </h4>

            <p className="mt-2 font-['Cormorant_Garamond'] text-lg text-stone-300 italic max-w-md">
              Welcome, <span className="text-red-400 font-semibold">{fullName}</span>. You are officially recorded in the Coven Ledger under the <span className="text-amber-200">{guild}</span> guild.
            </p>

            {/* Token Card */}
            <div className="mt-6 w-full p-4 rounded-lg border border-[#3b1720] bg-black/60 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-['Cinzel'] text-stone-400 uppercase block">
                  Cryptographic Initiate Credential:
                </span>
                <span className="font-mono text-sm font-bold text-red-400 tracking-wider">
                  {initiateToken}
                </span>
              </div>

              <button
                onClick={handleCopyToken}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#3d1822] text-xs font-mono text-stone-300 hover:text-white hover:border-red-600 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="mt-4 text-[11px] font-['Plus_Jakarta_Sans'] text-stone-400">
              Check your inbox at <span className="text-stone-200 font-mono">{email}</span> for your Discord invite and AWS Cloud Sandbox credentials.
            </p>

            <div className="mt-8">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded text-xs font-['Cinzel'] font-bold uppercase tracking-widest text-white bg-[#2e0c13] border border-red-700 hover:bg-[#46121d] transition-colors"
              >
                Return to the Crypt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
