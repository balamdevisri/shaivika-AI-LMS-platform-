import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Code2,
  Video,
  FileCheck,
  Zap,
  Star,
  ChevronDown,
  Send,
  Calendar,
  FileText,
  Briefcase,
  Layers,
  Check,
  Play,
} from 'lucide-react';
import { KaizenQVideoPlayer } from '@/components/common/KaizenQVideoPlayer';


export const LandingPage: React.FC = () => {
  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // 6 Premium Feature Cards
  const coreFeatures = [
    {
      icon: Bot,
      title: 'AI Tutor',
      desc: '24/7 personal AI mentor that explains complex concepts, solves code errors, and adapts to your pace.',
    },
    {
      icon: FileCheck,
      title: 'Smart Assignments',
      desc: 'Automated rubrics, real-time code execution grading, and instant feedback on homework submissions.',
    },
    {
      icon: Code2,
      title: 'Interactive Coding',
      desc: 'In-browser IDE with instant compilation, syntax highlighting, and live AI pair programming guidance.',
    },
    {
      icon: Video,
      title: 'Video Learning',
      desc: 'HD interactive video lectures with auto-generated AI timestamps, transcripts, and inline quizzes.',
    },
    {
      icon: Award,
      title: 'Certificates',
      desc: 'Issue tamper-proof ISO authenticated digital credentials with QR verification upon course completion.',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      desc: 'Visual graphs tracking retention curves, test score trends, and student competency rankings.',
    },
  ];

  // 6 Premium AI Tools
  const aiToolsList = [
    {
      icon: Calendar,
      title: 'AI Study Planner',
      desc: 'Generates optimized daily study schedules tailored to your exam target dates and weak areas.',
    },
    {
      icon: Zap,
      title: 'AI Quiz Generator',
      desc: 'Instantly converts video transcripts or text notes into interactive multiple-choice & coding quizzes.',
    },
    {
      icon: FileText,
      title: 'AI Notes Generator',
      desc: 'Synthesizes 2-hour video lectures into bulleted summary sheets, key takeaways, and flashcards.',
    },
    {
      icon: Code2,
      title: 'AI Code Assistant',
      desc: 'Analyzes algorithm complexity, refactors messy code, and suggests optimal test cases in real-time.',
    },
    {
      icon: Briefcase,
      title: 'AI Interview Preparation',
      desc: 'Simulates technical mock interviews with live speech-to-text scoring and behavioral feedback.',
    },
    {
      icon: Layers,
      title: 'AI Resume Builder',
      desc: 'Formats course projects and verified badges into ATS-friendly resumes optimized for top tech recruiters.',
    },
  ];

  // Popular Courses List
  const popularCourses = [
    {
      id: 1,
      title: 'Fullstack Next.js & React Enterprise Architecture',
      instructor: 'Dr. Sarah Jenkins',
      rating: 4.9,
      students: '14,200',
      duration: '42 hrs',
      difficulty: 'Advanced',
      progress: 85,
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'AI & Large Language Model Application Design',
      instructor: 'Marcus Vance',
      rating: 5.0,
      students: '21,000',
      duration: '36 hrs',
      difficulty: 'Intermediate',
      progress: 60,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'UI/UX Design Systems & Micro-Interactions',
      instructor: 'Elena Rostova',
      rating: 4.8,
      students: '9,800',
      duration: '28 hrs',
      difficulty: 'Beginner',
      progress: 95,
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'Shaivika-AI-LMS-Platform completely changed how our computer science department runs courses. The AI Tutor and automated grading saved our faculty hundreds of hours!',
      name: 'Prof. David Sterling',
      role: 'Head of CS, Global Tech Institute',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote: 'The AI Quiz Generator and instant Code Assistant helped me master React Server Components and land a Senior Frontend Engineer job!',
      name: 'Amara Chen',
      role: 'Software Engineer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  // Pricing Plans
  const pricingPlans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      desc: 'Ideal for individual students exploring core courses.',
      features: ['Access to 5 free courses', 'Standard AI Tutor (10 queries/day)', 'Community Q&A Forum', 'Basic Certificates'],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro AI Learner',
      price: '$29',
      period: 'per month',
      desc: 'Full access to all 250+ enterprise tracks and unlimited AI tools.',
      features: [
        'Unlimited Course Catalog Access',
        '24/7 Unlimited AI Tutor & Code Assistant',
        'AI Study Planner & Quiz Generator',
        'Verified ISO PDF Certificates',
        'AI Mock Technical Interviews',
      ],
      cta: 'Start Pro 14-Day Trial',
      popular: true,
    },
    {
      name: 'Enterprise Organization',
      price: '$99',
      period: 'per seat / month',
      desc: 'For universities, coding bootcamps, and corporate academies.',
      features: [
        'Dedicated SIS & SAML SSO Integration',
        'Custom Course Builder & Grading Engine',
        'Faculty Engagement Analytics',
        'White-label Branding & Custom Domain',
        'Dedicated 24/7 Account Architect',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  // FAQ Items
  const faqs = [
    {
      question: 'What makes Shaivika-AI-LMS-Platform unique compared to traditional LMS tools?',
      answer: 'Shaivika-AI-LMS-Platform is built from the ground up as an AI-first platform. It integrates a 24/7 personalized AI tutor, automated assignment grading, instant code evaluation, and customized study planners into a sleek Dark Slate + Emerald SaaS environment.',
    },
    {
      question: 'How does the AI Tutor assist students during video lectures or coding?',
      answer: 'The AI Tutor analyzes lesson transcripts and code line-by-line. If you get stuck on a bug or concept, you can ask questions in natural language, and the AI will provide step-by-step guidance without giving away direct solutions.',
    },
    {
      question: 'Are the digital certificates verified for LinkedIn & employer portfolios?',
      answer: 'Yes! Every certificate issued includes a tamper-proof cryptographic QR code verified against ISO standards, allowing employers to instantly confirm your course completion.',
    },
    {
      question: 'Can universities or bootcamps integrate with existing SSO and SIS systems?',
      answer: 'Absolutely. We support SAML SSO, Google Workspace, Canvas/Blackboard LTI 1.3 standards, and REST/GraphQL APIs.',
    },
  ];

  return (
    <div className="pt-24 space-y-28 sm:space-y-36">
      
      {/* ----------------- 1. HERO SECTION (2-COLUMN SPLIT SAAS LAYOUT) ----------------- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden">
        
        {/* Background Ambient Glows & Radial Gradients */}
        <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        {/* 2-Column Responsive Grid (Desktop 50/50, Tablet 60/40, Mobile Vertical Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================== LEFT COLUMN (50%) ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* 1. Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xl shadow-lg shadow-emerald-950/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>✨ AI Powered Learning Platform</span>
            </div>

            {/* 2. Main Heading */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Learn Smarter with{' '}
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                SHAIVIKA AI LMS
              </span>
            </h1>

            {/* 3. Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              SHAIVIKA LMS empowers learners with AI-assisted education, interactive learning paths, practical projects, and personalized mentorship, making technical education smarter, faster, and more accessible.
            </p>

            {/* 4. Two Premium CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <span>🚀 Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#courses"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-500/40 font-semibold rounded-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Play className="w-4 h-4 fill-current text-emerald-400" />
                <span>▶ Watch Demo</span>
              </a>
            </div>
          </motion.div>

          {/* ========================== RIGHT COLUMN (50%) ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Blurred Emerald & Cyan Glow Spheres Behind Video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Clean Minimal Floating Glass Video Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-xl p-1 sm:p-1.5 rounded-[28px] bg-slate-900/40 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500"
            >
              <KaizenQVideoPlayer src="/KaizenQ.mp4" />
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* ----------------- 2. STATISTICS SECTION ----------------- */}
      <section className="bg-[#0F172A]/80 border-y border-white/10 py-12 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#10B981]">
                50K+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Active Students</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
                250+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Expert Courses</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#34D399]">
                500+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">AI Mentors</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#10B981]">
                99%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Success Rate</p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ----------------- 3. FEATURES SECTION (6 CARDS) ----------------- */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            Core LMS Features
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Built for Modern High-Growth Education
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Combining world-class course management with real-time AI assistance for students and faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="gradient-border-emerald p-6 space-y-4 group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#10B981] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* ----------------- 4. AI FEATURES SECTION (6 TOOLS) ----------------- */}
      <section id="ai-features" className="bg-[#0F172A]/90 py-20 border-y border-white/10 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#34D399] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              AI Tools Suite
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              6 Powered AI Utilities Included
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Automate study planning, quiz creation, note summarizing, and interview practice with built-in AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiToolsList.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div key={idx} className="glass-card p-6 space-y-4 border border-white/10 group">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-[#059669]/20 to-[#10B981]/30 text-[#34D399] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#10B981] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ----------------- 5. COURSES SECTION ----------------- */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              Explore Catalog
            </span>
            <h2 className="font-[#10B981] font-bold text-3xl sm:text-4xl text-white">
              Popular Enterprise Courses
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Master in-demand tech tracks with real-time AI mentoring and verified certifications.
            </p>
          </div>
          <Link to="/dashboard" className="btn-glass-secondary text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto">
            <span>View All 250+ Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <div key={course.id} className="glass-card p-0 overflow-hidden flex flex-col group">
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#020617]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium border border-white/10">
                  {course.difficulty}
                </div>
                <div className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                  ★ {course.rating}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#10B981] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">Instructor: {course.instructor}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>{course.students} students</span>
                    <span>{course.duration}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                      <span>Module Completion</span>
                      <span className="text-[#10B981]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#020617] rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-linear-to-r from-[#059669] to-[#10B981] rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>

                <Link to="/dashboard" className="w-full btn-emerald-primary text-xs py-2.5 justify-center mt-2">
                  Enroll Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 6. TESTIMONIALS SECTION ----------------- */}
      <section className="bg-[#0F172A]/80 py-16 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              Student Reviews
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              Loved by 50,000+ Active Learners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((tm, idx) => (
              <div key={idx} className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(tm.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  "{tm.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={tm.avatar} alt={tm.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#10B981]" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">{tm.name}</h4>
                    <p className="text-xs text-[#94A3B8]">{tm.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ----------------- 7. PRICING SECTION ----------------- */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            Transparent Pricing
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Choose Your AI Learning Tier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 flex flex-col justify-between space-y-6 relative ${
                plan.popular ? 'border-[#10B981] shadow-xl shadow-emerald-950/40 bg-[#0F172A]' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </span>
              )}

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-extrabold text-4xl text-white">{plan.price}</span>
                  <span className="text-xs text-[#94A3B8]">{plan.period}</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{plan.desc}</p>

                <ul className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-200">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/dashboard"
                className={`w-full text-center text-xs py-3 rounded-full font-bold transition-all ${
                  plan.popular
                    ? 'btn-emerald-primary'
                    : 'btn-glass-secondary'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 8. FAQ ACCORDION SECTION ----------------- */}
      <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card overflow-hidden transition-all duration-200">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between font-heading font-semibold text-sm sm:text-base text-white hover:text-[#10B981]"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#10B981] transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/10 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 9. CONTACT SECTION ----------------- */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-10 border border-white/10 shadow-2xl">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-[#34D399] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Enterprise Inquiry
            </span>
            <h2 className="font-heading font-bold text-3xl text-white">
              Ready to Transform Your School or Enterprise?
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
              Schedule a 1-on-1 walkthrough with our AI architects to deploy custom course models and faculty tools.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#020617] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <h3 className="font-heading font-semibold text-lg text-white">Request AI Demonstration</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-[#0F172A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  className="bg-[#0F172A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Institution & student headcount..."
                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="btn-emerald-primary w-full justify-center text-xs py-3">
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};
