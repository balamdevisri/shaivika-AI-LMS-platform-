import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  BrainCircuit,
  BarChart3,
  Bell,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  ChevronDown,
  PlayCircle,
  Send,
  MapPin,
  Mail,
  Phone,
  FileCheck,
  Zap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Counters for Statistics
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudentsCount(5000);
      setCoursesCount(250);
      setInstructorsCount(100);
      setCompletionRate(98);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Dashboard preview active view state
  const [activePreviewTab, setActivePreviewTab] = useState<'analytics' | 'courses' | 'assignments'>('analytics');

  // FAQ Accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const featuresList = [
    {
      icon: BookOpen,
      title: 'Course Management',
      desc: 'Seamlessly upload syllabus, video modules, interactive resources, and manage multi-branch course structures.',
    },
    {
      icon: FileCheck,
      title: 'Assignments & Grading',
      desc: 'Automated rubrics, inline PDF code grading, plagiarism checks, and student submission tracking.',
    },
    {
      icon: Zap,
      title: 'Interactive Quizzes',
      desc: 'Create timed, randomized multiple choice or coding assessments with instant automated scoring.',
    },
    {
      icon: Calendar,
      title: 'Smart Attendance',
      desc: 'Real-time attendance logs for virtual classrooms and in-person lecture check-ins.',
    },
    {
      icon: Award,
      title: 'Verified Certificates',
      desc: 'Issue tamper-proof PDF digital certificates with QR verification codes upon course completion.',
    },
    {
      icon: MessageSquare,
      title: 'Discussion Forums',
      desc: 'Collaborative Q&A channels with upvotes, instructor-endorsed answers, and code formatting.',
    },
    {
      icon: BrainCircuit,
      title: 'AI Learning Assistant',
      desc: 'Personalized AI tutor available 24/7 to answer student questions and offer instant coding help.',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      desc: 'Visual graphs tracking completion rates, test averages, and retention risks for instructors.',
    },
    {
      icon: Bell,
      title: 'Instant Notifications',
      desc: 'Push, email, and web notifications for upcoming deadlines, quiz releases, and announcements.',
    },
  ];

  const popularCourses = [
    {
      id: 1,
      title: 'Fullstack Next.js & React Enterprise Architecture',
      instructor: 'Dr. Sarah Jenkins',
      role: 'Senior Staff Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 1280,
      students: '1,420',
      duration: '42 hrs',
      progress: 85,
      category: 'Development',
      badge: 'Bestseller',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'AI & Large Language Model Application Design',
      instructor: 'Marcus Vance',
      role: 'AI Research Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviews: 940,
      students: '2,100',
      duration: '36 hrs',
      progress: 60,
      category: 'AI & Data',
      badge: 'Hot',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'UI/UX Design Systems & Micro-Interactions',
      instructor: 'Elena Rostova',
      role: 'Lead Designer at Framer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviews: 750,
      students: '980',
      duration: '28 hrs',
      progress: 95,
      category: 'Design',
      badge: 'Top Rated',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up as a student or institution administrator in under 60 seconds.' },
    { num: '02', title: 'Choose Course', desc: 'Browse 250+ enterprise courses with curated tracks and certifications.' },
    { num: '03', title: 'Interactive Learning', desc: 'Watch HD video lectures, practice in live sandboxes, and ask AI.' },
    { num: '04', title: 'Complete Quiz', desc: 'Take automated quizzes to validate your mastery of every skill module.' },
    { num: '05', title: 'Get Certificate', desc: 'Earn verified digital credentials shareable on LinkedIn and portfolios.' },
  ];

  const testimonials = [
    {
      quote: 'EduFlow transformed how our university manages engineering courses. The AI Assistant and automated grading saved our faculty over 15 hours a week!',
      name: 'Prof. David Sterling',
      title: 'Head of Computer Science, Tech University',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote: 'The Slate + Emerald UI is so polished and intuitive. Students actually enjoy completing their modules and checking their progress analytics!',
      name: 'Amara Chen',
      title: 'VP of Corporate Learning, Vertex Systems',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'How does EduFlow compare to traditional LMS platforms?',
      answer: 'EduFlow is built like a modern SaaS platform (Linear/Stripe inspired). It combines lightning-fast page transitions, an integrated AI assistant, automated assignment grading, and a sleek dark slate & emerald UI.',
    },
    {
      question: 'Can I integrate EduFlow with existing SSO or SIS tools?',
      answer: 'Yes! EduFlow supports SAML SSO, Google Workspace, Microsoft Azure AD, LTI 1.3 standards, and REST/GraphQL APIs for seamless SIS data syncing.',
    },
    {
      question: 'Is there a free trial available for universities or corporate teams?',
      answer: 'Absolutely. You can start a 14-day full enterprise trial with access to all features, AI assistant quotas, and course builder tools.',
    },
    {
      question: 'How does the AI Assistant help students and instructors?',
      answer: 'For students, the AI provides 24/7 tutoring, code explanations, and quiz preps. For instructors, it generates quiz questions, summarizes student engagement, and drafts lesson outlines.',
    },
  ];

  return (
    <div className="pt-24 space-y-24 sm:space-y-32">
      
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 overflow-hidden">
        {/* Background Ambient Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#059669]/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669]/10 border border-[#059669]/20 text-[#059669] text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-[#059669]" />
              <span>Next-Gen Enterprise LMS 2.0</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111827] leading-[1.15] tracking-tight">
              Learn Smarter. <br />
              <span className="text-gradient-emerald">Build Your Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto lg:mx-0">
              A modern learning platform that helps students, instructors, and administrators manage education efficiently from one beautiful dashboard.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/dashboard" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-emerald-600/30 w-full sm:w-auto">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#courses" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
                <PlayCircle className="w-5 h-5 text-[#059669]" />
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#475569]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" /> 14-day Enterprise Trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" /> SOC2 & GDPR Compliant
              </span>
            </div>
          </div>

          {/* Right Column: Hero LMS Mock Dashboard Illustration */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Card Graphic */}
              <div className="bg-[#0F172A] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-800 text-white relative z-10">
                {/* Header bar of mock app */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-mono text-slate-400">eduflow.app/dashboard</span>
                  </div>
                  <span className="text-xs bg-[#059669]/20 text-[#34D399] px-2.5 py-0.5 rounded-full font-semibold">
                    Live Demo
                  </span>
                </div>

                {/* Body content inside mock */}
                <div className="pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-white">Fullstack Engineering Track</h4>
                      <p className="text-xs text-slate-400">Current Module: Microservices & Docker</p>
                    </div>
                    <span className="text-sm font-bold text-[#34D399]">88% Complete</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full w-[88%] transition-all duration-1000" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 block">Upcoming Assignment</span>
                      <span className="text-xs font-semibold text-white block mt-0.5">GraphQL API Architecture</span>
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Due in 2 days</span>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-[11px] text-slate-400 block">Quiz Score</span>
                      <span className="text-xs font-semibold text-white block mt-0.5">Module 4 Test: 98/100</span>
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Grade: A+ Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Course Progress Card */}
              <div className="absolute -top-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-[#E2E8F0] flex items-center gap-3.5 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#059669] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] block">Active Courses</span>
                  <span className="text-xs text-[#475569]">4 Courses in progress</span>
                </div>
              </div>

              {/* Floating Element 2: Quiz Score Ring Badge */}
              <div className="absolute -bottom-6 -right-4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-[#E2E8F0] flex items-center gap-3.5 animate-float-delayed hidden sm:flex">
                <div className="w-11 h-11 rounded-full border-4 border-[#059669] flex items-center justify-center font-extrabold text-sm text-[#059669]">
                  98%
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] block">Quiz Completion</span>
                  <span className="text-[11px] text-[#475569]">Top 2% Student Rank</span>
                </div>
              </div>

              {/* Floating Certificate Verified Badge */}
              <div className="absolute bottom-16 -left-8 z-20 bg-[#0F172A] text-white px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 text-xs font-medium">
                <Award className="w-4 h-4 text-[#34D399]" />
                <span>Verified ISO Certificate Issued</span>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ----------------- 2. STATISTICS SECTION ----------------- */}
      <section className="bg-white py-12 border-y border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#059669]">
                {studentsCount > 0 ? `${studentsCount.toLocaleString()}+` : '0'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#475569] uppercase tracking-wider">Active Students</p>
            </div>

            <div className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#10B981]">
                {coursesCount > 0 ? `${coursesCount}+` : '0'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#475569] uppercase tracking-wider">Expert Courses</p>
            </div>

            <div className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A]">
                {instructorsCount > 0 ? `${instructorsCount}+` : '0'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#475569] uppercase tracking-wider">Certified Instructors</p>
            </div>

            <div className="space-y-1">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#059669]">
                {completionRate > 0 ? `${completionRate}%` : '0'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#475569] uppercase tracking-wider">Completion Rate</p>
            </div>

          </div>
        </div>
      </section>


      {/* ----------------- 3. FEATURES GRID SECTION ----------------- */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest bg-[#059669]/10 px-3 py-1 rounded-full">
            Enterprise Feature Suite
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111827]">
            Everything you need for world-class learning
          </h2>
          <p className="text-sm sm:text-base text-[#475569]">
            Designed for universities, high-growth startups, and corporate academies needing scalable, powerful education management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="lms-card space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#059669]/10 to-[#10B981]/20 text-[#059669] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#059669] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111827] group-hover:text-[#059669] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>


      {/* ----------------- 4. POPULAR COURSES SECTION ----------------- */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest bg-[#059669]/10 px-3 py-1 rounded-full">
              Explore Catalog
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111827]">
              Popular Enterprise Courses
            </h2>
            <p className="text-sm text-[#475569]">
              Taught by industry leaders from top technology firms and academic institutions.
            </p>
          </div>
          <Link to="/dashboard" className="btn-secondary text-sm font-semibold flex items-center gap-1.5 self-start md:self-auto">
            <span>View All 250+ Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <div key={course.id} className="lms-card p-0 overflow-hidden flex flex-col group">
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                  {course.category}
                </div>
                <div className="absolute top-3 right-3 bg-[#059669] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                  {course.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviews} reviews)</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#111827] group-hover:text-[#059669] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0]">
                  <img
                    src={course.avatar}
                    alt={course.instructor}
                    className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#111827] block">{course.instructor}</span>
                    <span className="text-slate-400 block">{course.role}</span>
                  </div>
                </div>

                {/* Course Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {course.students} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                  </span>
                </div>

                {/* Enroll CTA */}
                <Link
                  to="/dashboard"
                  className="w-full btn-primary text-sm py-2.5 justify-center mt-2 group-hover:bg-[#047857]"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 5. DASHBOARD PREVIEW SECTION ----------------- */}
      <section className="bg-[#0F172A] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#34D399] uppercase tracking-widest bg-emerald-500/20 px-3 py-1 rounded-full">
              Live Mock Interface
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              Experience the Slate & Emerald Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A distraction-free, hyper-responsive environment designed for focused learning and real-time administration.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex justify-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl max-w-md mx-auto border border-slate-800">
            <button
              onClick={() => setActivePreviewTab('analytics')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activePreviewTab === 'analytics'
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Analytics View
            </button>
            <button
              onClick={() => setActivePreviewTab('courses')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activePreviewTab === 'courses'
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Course Modules
            </button>
            <button
              onClick={() => setActivePreviewTab('assignments')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activePreviewTab === 'assignments'
                  ? 'bg-[#059669] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Assignment Board
            </button>
          </div>

          {/* Interactive Preview Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            
            {activePreviewTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
                    <span className="text-xs text-slate-400 block">Total Study Time</span>
                    <span className="text-2xl font-bold font-heading text-white block mt-1">148.5 hrs</span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">↑ +14.2% vs last month</span>
                  </div>
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
                    <span className="text-xs text-slate-400 block">Assignments Completed</span>
                    <span className="text-2xl font-bold font-heading text-white block mt-1">24 / 26</span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">92% Completion Score</span>
                  </div>
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
                    <span className="text-xs text-slate-400 block">Class Rank</span>
                    <span className="text-2xl font-bold font-heading text-emerald-400 block mt-1">#3 in Cohort</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">Top 5 percentile</span>
                  </div>
                </div>

                {/* SVG Mock Line Graph */}
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                    <span>Weekly Student Engagement Curve</span>
                    <span className="text-emerald-400">Peak: 9.8 hrs/day</span>
                  </div>
                  <svg className="w-full h-32 text-[#059669]" viewBox="0 0 500 120" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M0 100 Q 80 40, 160 70 T 320 30 T 500 10" stroke="url(#emeraldGrad)" fill="none" />
                    <defs>
                      <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            )}

            {activePreviewTab === 'courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-white">Module 1: React Server Components</h4>
                    <p className="text-xs text-slate-400">12 Video Lessons • 3 Quizzes</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full font-bold">Done</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-white">Module 2: Microservices & Docker</h4>
                    <p className="text-xs text-slate-400">8 Video Lessons • 2 Assignments</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-full font-bold">In Progress</span>
                </div>
              </div>
            )}

            {activePreviewTab === 'assignments' && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block text-sm">Deploying Production Kubernetes Cluster</span>
                    <span className="text-slate-400">DevOps Specialization • Due Tomorrow, 11:59 PM</span>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-semibold rounded-lg">Pending Submission</span>
                </div>
                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block text-sm">Building Custom LLM RAG Pipeline</span>
                    <span className="text-slate-400">AI Engineering • Graded on Oct 14</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-semibold rounded-lg">Grade: 98/100 (A+)</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>


      {/* ----------------- 6. HOW IT WORKS SECTION ----------------- */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest bg-[#059669]/10 px-3 py-1 rounded-full">
            Streamlined Journey
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111827]">
            How EduFlow Works
          </h2>
          <p className="text-sm text-[#475569]">
            A simple 5-step process from onboarding to verified graduation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((st, idx) => (
            <div key={idx} className="lms-card text-center space-y-3 relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] text-white font-heading font-bold text-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                {st.num}
              </div>
              <h3 className="font-heading font-bold text-base text-[#111827] pt-1">
                {st.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 7. TESTIMONIALS SECTION ----------------- */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest bg-[#059669]/10 px-3 py-1 rounded-full">
              Student & Educator Reviews
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111827]">
              Loved by 5,000+ Learners Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((tm, idx) => (
              <div key={idx} className="lms-card bg-white p-8 space-y-6 relative">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(tm.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#111827] italic leading-relaxed">
                  "{tm.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                  <img
                    src={tm.avatar}
                    alt={tm.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#059669]"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#111827]">{tm.name}</h4>
                    <p className="text-xs text-slate-500">{tm.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ----------------- 8. FAQ ACCORDION SECTION ----------------- */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest bg-[#059669]/10 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#111827]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between font-heading font-semibold text-base text-[#111827] hover:text-[#059669]"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#059669] transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0]/60 pt-3 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* ----------------- 9. CONTACT SECTION ----------------- */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-2xl">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-[#34D399] uppercase tracking-widest bg-emerald-500/20 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h2 className="font-heading font-bold text-3xl text-white">
              Ready to Upgrade Your Institution's LMS?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Schedule a personalized 1-on-1 enterprise walkthrough with our product architects.
            </p>

            <div className="space-y-4 pt-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-[#34D399]">
                  <Mail className="w-5 h-5" />
                </div>
                <span>enterprise@eduflow.app</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-[#34D399]">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+1 (800) 555-EDUFLOW</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-[#34D399]">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>San Francisco, CA • Boston, MA • London</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-8 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="font-heading font-semibold text-white text-lg">Request Enterprise Demo</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="jane@university.edu"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Institution / Company</label>
                <input
                  type="text"
                  placeholder="Stanford CS Dept / Acme Inc."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Message / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your student headcount and custom integration needs..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#059669]"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-sm py-3">
                <span>Submit Demo Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
