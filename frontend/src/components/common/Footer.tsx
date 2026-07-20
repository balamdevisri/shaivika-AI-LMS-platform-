import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Globe, Share2, MessageCircle, Video } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020617] text-[#94A3B8] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" showSubtitle={true} />
            <p className="text-[#94A3B8] text-xs sm:text-sm max-w-sm leading-relaxed">
              Shaivika-AI-LMS-Platform is the next-generation AI-powered learning management platform for universities, engineering schools, and enterprise teams.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-2">
                Subscribe to AI Product Releases
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter work email"
                    className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-lg shadow-emerald-900/40"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#courses" className="hover:text-[#10B981] transition-colors">Course Catalog</a></li>
              <li><a href="#features" className="hover:text-[#10B981] transition-colors">AI Features</a></li>
              <li><a href="#pricing" className="hover:text-[#10B981] transition-colors">Pricing Plans</a></li>
              <li><Link to="/dashboard" className="hover:text-[#10B981] transition-colors">Interactive Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Resources & Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Documentation</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">AI API Reference</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Help Center & FAQ</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">24/7 AI Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Privacy & Terms</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Security & SOC2</a></li>
              <li><a href="#about" className="hover:text-[#10B981] transition-colors">Data Compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} ShaivikaLMSPlatform Inc. All rights reserved.</p>
          <div className="flex items-center space-x-3">
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0F172A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#10B981] transition-all" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0F172A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#10B981] transition-all" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0F172A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#10B981] transition-all" aria-label="Community">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0F172A] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#10B981] transition-all" aria-label="Videos">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
