import React, { useState } from 'react';
import { Mail, Instagram, MapPin, Send, Check } from 'lucide-react';
import { gothicAudio } from '../utils/gothicAudio.ts';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setError('Please fill in all fields before sending your dispatch.');
      return;
    }
    setError('');
    setIsSent(true);
    gothicAudio.playGothicBell(120, 2.5, 0.3);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-[#231217] bg-[#050406]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Exact Title, Text & Placeholders Requested (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-['Cinzel'] text-red-500 font-semibold mb-3">
                <span>Connect & Collaborate</span>
                <span aria-hidden="true">·</span>
                <span>The Midnight Society</span>
              </div>

              {/* Exact Section Title Requested */}
              <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 text-balance">
                FIND YOUR PLACE IN THE SOCIETY.
              </h2>

              {/* Exact Text Requested */}
              <div className="mt-5 space-y-3 font-['Cormorant_Garamond'] text-xl text-stone-300 italic leading-relaxed">
                <p>
                  Curious about technology? Have an idea to build? Want to become part of a community of creators?
                </p>
                <p className="text-red-400 font-semibold not-italic font-['Cinzel'] text-base tracking-wider">
                  Come explore, collaborate and create with us.
                </p>
              </div>

              {/* Exact Required Contact Details & Placeholders */}
              <div className="mt-8 space-y-4 pt-6 border-t border-[#231217] text-xs font-['Plus_Jakarta_Sans'] text-stone-300">
                {/* College details: MVJ College of Engineering */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-[#1c080d] border border-[#3b1720] flex items-center justify-center text-red-500 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Institution</span>
                    <span className="font-medium text-stone-200">MVJ College of Engineering</span>
                    <span className="block text-[11px] text-stone-400">Near ITPB, Channasandra, Kadugodi, Bengaluru, Karnataka</span>
                  </div>
                </div>

                {/* AWS Student Builders Group identity */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-[#1c080d] border border-[#3b1720] flex items-center justify-center text-red-500 shrink-0">
                    <span className="font-['Cinzel'] text-xs font-bold text-red-400">AWS</span>
                  </div>
                  <div>
                    <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Organization</span>
                    <span className="font-medium text-stone-200">AWS Student Builders Group</span>
                    <span className="block text-[11px] text-stone-400">The Midnight Society Chapter</span>
                  </div>
                </div>

                {/* Email placeholder */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-[#1c080d] border border-[#3b1720] flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Email (Placeholder)</span>
                    <span className="font-mono text-stone-300">builders.midnight@mvjce.edu.in</span>
                  </div>
                </div>

                {/* Instagram link placeholder */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-[#1c080d] border border-[#3b1720] flex items-center justify-center text-red-500 shrink-0">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-['Cinzel'] text-[11px] text-stone-400 block uppercase">Instagram (Placeholder)</span>
                    <span className="font-mono text-stone-300">@midnight.aws.mvjce</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-xl border border-[#3b1720] bg-gradient-to-b from-[#14080c] via-[#0d0609] to-[#070508] shadow-2xl">
              <div className="filigree-corner-tl !border-red-400/60" />
              <div className="filigree-corner-tr !border-red-400/60" />
              <div className="filigree-corner-bl !border-red-400/60" />
              <div className="filigree-corner-br !border-red-400/60" />

              {!isSent ? (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="student@mvjce.edu.in"
                        className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-['Cinzel'] text-stone-300 tracking-wider mb-1">
                      How would you like to build with us? *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your ideas, project interests, questions about cloud computing, or how you want to get involved..."
                      className="w-full px-3.5 py-2.5 rounded border border-[#3d1822] bg-black/60 text-xs font-['Plus_Jakarta_Sans'] text-stone-200 focus:outline-none focus:border-red-600 transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-xs text-red-400">{error}</p>}

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-7 py-3.5 rounded text-xs font-['Cinzel'] font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#7b0d1e] via-[#9e1327] to-[#7b0d1e] border border-[#d6a45a]/70 hover:shadow-[0_0_20px_rgba(184,20,36,0.5)] transition-all cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Transmit to Society</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-red-950/80 border border-red-600 flex items-center justify-center text-red-400 mb-3">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="font-['Cinzel'] text-xl font-bold text-stone-100">
                    Message Transmitted
                  </h4>
                  <p className="mt-2 text-xs font-['Cormorant_Garamond'] text-stone-300 italic max-w-sm">
                    Thank you, {senderName}. The Midnight Society leadership council at MVJ College of Engineering will get in touch with you.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setSenderName('');
                      setSenderEmail('');
                      setMessage('');
                    }}
                    className="mt-6 text-xs font-['Cinzel'] text-red-400 underline underline-offset-4 hover:text-red-200 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
