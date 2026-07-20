import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowRight, Globe, Share2, MessageCircle, Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-lg shadow-[#059669]/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                Edu<span className="text-[#34D399]">Flow</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering institutions, instructors, and ambitious learners worldwide with an enterprise-grade Learning Management System.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Subscribe to LMS Product Updates
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#059669] hover:bg-[#047857] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1 shadow-md shadow-emerald-900/30"
                >
                  <span>Join</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className="hover:text-[#34D399] transition-colors">Course Catalog</a></li>
              <li><a href="#features" className="hover:text-[#34D399] transition-colors">AI Assistant</a></li>
              <li><a href="#features" className="hover:text-[#34D399] transition-colors">Analytics & Reports</a></li>
              <li><a href="#features" className="hover:text-[#34D399] transition-colors">Certificates Engine</a></li>
              <li><Link to="/dashboard" className="hover:text-[#34D399] transition-colors">Enterprise Demo</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">Documentation</a></li>
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">API Reference</a></li>
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">System Status</a></li>
              <li><a href="#faq" className="hover:text-[#34D399] transition-colors">Help Center / FAQ</a></li>
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">Release Notes</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">About EduFlow</a></li>
              <li><a href="#contact" className="hover:text-[#34D399] transition-colors">Careers</a></li>
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-[#34D399] transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="hover:text-[#34D399] transition-colors">Security & Compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EduFlow Inc. All rights reserved. Built with Slate + Emerald Design Language.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#059669] transition-all" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#059669] transition-all" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#059669] transition-all" aria-label="Community">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#059669] transition-all" aria-label="Videos">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
