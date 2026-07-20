import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, GraduationCap, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-[#059669]/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-[#0F172A] tracking-tight">
                Edu<span className="text-[#059669]">Flow</span>
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] font-semibold bg-[#059669]/10 text-[#059669] rounded-full uppercase tracking-wider">
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-[#475569] hover:text-[#059669] rounded-lg transition-colors hover:bg-[#F8FAFC]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/auth/login"
              className="px-4 py-2 text-sm font-semibold text-[#0F172A] hover:text-[#059669] transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/dashboard"
              className="btn-primary text-sm font-semibold flex items-center gap-1.5 py-2.5 px-5 shadow-emerald-500/20"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#475569] hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#475569] hover:text-[#059669] rounded-lg hover:bg-[#F8FAFC]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col space-y-2">
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-[#0F172A] border border-[#E2E8F0] rounded-xl hover:bg-slate-50"
            >
              Log In
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#059669] rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
