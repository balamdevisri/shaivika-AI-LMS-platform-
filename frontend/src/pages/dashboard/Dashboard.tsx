import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Award,
  FileCheck,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  X,
  Layers,
  Zap,
  Download,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

export const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  // Quiz Modal State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  // Certificate Modal State
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Sample Quiz Questions
  const quizQuestions = [
    {
      question: 'Which Hook is best suited for synchronous DOM measurements before browser paint?',
      options: ['useEffect', 'useLayoutEffect', 'useCallback', 'useRef'],
      correct: 1,
    },
    {
      question: 'What is the primary benefit of React Server Components (RSC)?',
      options: ['Client bundle size reduction', 'Faster CSS execution', 'Replaces Redux', 'Eliminates HTML'],
      correct: 0,
    },
  ];

  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score += 50;
    });
    setQuizScore(score);
    toast.success(`Quiz Completed! You scored ${score}/100`);
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
            <Link to="/dashboard" className="hover:text-[#059669]">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="capitalize font-semibold text-[#059669]">{currentTab}</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#111827]">
            Welcome back, Jane 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
            You have 2 assignments due this week and 1 quiz ready for review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuizModalOpen(true)}
            className="btn-primary text-xs py-2.5 px-4 shadow-md flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" />
            <span>Take Quick Quiz</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#E2E8F0] pb-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'assignments', label: 'Assignments & Quizzes' },
          { id: 'calendar', label: 'Calendar & Schedule' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'components', label: 'UI Component Showcase' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSearchParams({ tab: tab.id })}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
              currentTab === tab.id
                ? 'bg-[#059669] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {/* ------------------- 1. OVERVIEW TAB CONTENT ------------------- */}
      {currentTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lms-card space-y-2 border-l-4 border-l-[#059669]">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Enrolled Courses</span>
                <BookOpen className="w-4 h-4 text-[#059669]" />
              </div>
              <span className="font-heading font-extrabold text-3xl text-[#111827] block">4 Active</span>
              <p className="text-[11px] text-emerald-600 font-medium">2 modules completed this month</p>
            </div>

            <div className="lms-card space-y-2 border-l-4 border-l-[#10B981]">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Learning Time</span>
                <Clock className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-heading font-extrabold text-3xl text-[#111827] block">148.5 hrs</span>
              <p className="text-[11px] text-emerald-600 font-medium">+14.2% higher than class avg</p>
            </div>

            <div className="lms-card space-y-2 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Quiz Score Avg</span>
                <FileCheck className="w-4 h-4 text-amber-500" />
              </div>
              <span className="font-heading font-extrabold text-3xl text-[#111827] block">94.8%</span>
              <p className="text-[11px] text-amber-600 font-medium">Grade A+ (Top 3 in cohort)</p>
            </div>

            <div className="lms-card space-y-2 border-l-4 border-l-[#0F172A]">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Certificates</span>
                <Award className="w-4 h-4 text-[#0F172A]" />
              </div>
              <span className="font-heading font-extrabold text-3xl text-[#111827] block">3 Verified</span>
              <button
                onClick={() => setSearchParams({ tab: 'certificates' })}
                className="text-[11px] text-[#059669] hover:underline font-semibold block"
              >
                View digital credentials →
              </button>
            </div>
          </div>

          {/* SVG Charts & Activity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Weekly Learning Activity SVG Chart */}
            <div className="lg:col-span-8 lms-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#111827]">Study Hours & Performance</h3>
                  <p className="text-xs text-slate-500">Weekly progress breakdown across active courses</p>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-[#059669] px-2.5 py-1 rounded-lg">
                  Last 7 Days
                </span>
              </div>

              {/* Chart Graphic */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <svg className="w-full h-44 text-[#059669]" viewBox="0 0 500 120" fill="none">
                  <path
                    d="M 0 100 Q 60 20, 120 70 T 240 30 T 360 80 T 500 15"
                    stroke="#059669"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M 0 100 Q 60 20, 120 70 T 240 30 T 360 80 T 500 15 V 120 H 0 Z"
                    fill="url(#chartEmeraldArea)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="chartEmeraldArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-[#E2E8F0]">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="lg:col-span-4 lms-card space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#111827]">Upcoming Schedule</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#059669] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    OCT 24
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#111827]">GraphQL Architecture Assignment</h4>
                    <p className="text-[11px] text-slate-500">Fullstack Web Dev • 11:59 PM</p>
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    OCT 26
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#111827]">Live Workshop: Microservice Scalability</h4>
                    <p className="text-[11px] text-slate-500">Instructor: Dr. Sarah Jenkins</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Currently Enrolled Courses Progress */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-[#111827]">Continue Learning</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="lms-card flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Development
                  </span>
                  <h4 className="font-heading font-bold text-base text-[#111827]">
                    Fullstack Next.js & React Enterprise Architecture
                  </h4>
                  <p className="text-xs text-slate-500">Current Lesson: 14. Server Actions & Mutating State</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Course Completion</span>
                    <span className="text-[#059669]">85%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] w-[85%]" />
                  </div>
                </div>

                <Link to="/dashboard/courses" className="btn-primary text-xs py-2.5 justify-center">
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Lesson</span>
                </Link>
              </div>

              <div className="lms-card flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    AI & Data
                  </span>
                  <h4 className="font-heading font-bold text-base text-[#111827]">
                    AI & Large Language Model Application Design
                  </h4>
                  <p className="text-xs text-slate-500">Current Lesson: 08. Fine-tuning RAG Embeddings</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Course Completion</span>
                    <span className="text-[#059669]">60%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] w-[60%]" />
                  </div>
                </div>

                <Link to="/dashboard/courses" className="btn-primary text-xs py-2.5 justify-center">
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Lesson</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      )}


      {/* ------------------- 2. ASSIGNMENTS & QUIZZES TAB ------------------- */}
      {(currentTab === 'assignments' || quizModalOpen) && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="lms-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#111827]">Assignments & Assessment Board</h3>
                <p className="text-xs text-slate-500">Manage pending homework submissions and quiz evaluations</p>
              </div>
              <button
                onClick={() => setQuizModalOpen(true)}
                className="btn-primary text-xs py-2 px-3"
              >
                Launch Practice Quiz
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-slate-400 font-semibold">
                    <th className="py-3 px-4">Assignment Name</th>
                    <th className="py-3 px-4">Course Track</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr className="hover:bg-[#F8FAFC]">
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">GraphQL API Architecture</td>
                    <td className="py-3.5 px-4 text-slate-600">Fullstack Web Dev</td>
                    <td className="py-3.5 px-4 text-slate-600">Oct 24, 2026</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[11px]">
                        Pending
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]">
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">RAG Vector Search Optimization</td>
                    <td className="py-3.5 px-4 text-slate-600">AI Application Design</td>
                    <td className="py-3.5 px-4 text-slate-600">Oct 18, 2026</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-emerald-100 text-[#059669] rounded-full font-bold text-[11px]">
                        Submitted
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#059669]">98 / 100 (A+)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* ------------------- 3. CALENDAR TAB ------------------- */}
      {currentTab === 'calendar' && (
        <div className="lms-card space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-[#111827]">Academic Schedule & Live Lectures</h3>
            <span className="text-xs font-semibold text-[#059669] bg-emerald-50 px-3 py-1 rounded-full">October 2026</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 py-2 border-b border-[#E2E8F0]">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const hasLecture = day === 24 || day === 26;
              return (
                <div
                  key={day}
                  className={`h-20 p-2 rounded-xl border border-[#E2E8F0] flex flex-col justify-between text-xs ${
                    day === 20 ? 'bg-[#059669] text-white font-bold' : 'bg-[#F8FAFC] text-[#111827]'
                  }`}
                >
                  <span className="font-semibold">{day}</span>
                  {hasLecture && (
                    <span className="text-[10px] bg-amber-500 text-white p-1 rounded-md line-clamp-1">
                      Live Class
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* ------------------- 4. CERTIFICATES TAB ------------------- */}
      {(currentTab === 'certificates' || certificateModalOpen) && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="lms-card bg-gradient-to-r from-[#0F172A] to-[#059669] text-white p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-[#34D399]" />
              <div>
                <h3 className="font-heading font-bold text-2xl text-white">Verified Engineering Credentials</h3>
                <p className="text-xs text-slate-200">ISO/IEC 27001 Authenticated Digital Certificates</p>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3">
                <span className="text-xs text-emerald-300 font-mono">ID: EDU-2026-88941</span>
                <h4 className="font-heading font-bold text-lg text-white">Fullstack Systems Engineering</h4>
                <p className="text-xs text-slate-300">Issued to Jane Devson • Issued on Oct 10, 2026</p>
                <button
                  onClick={() => setCertificateModalOpen(true)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  <Eye className="w-4 h-4 text-[#059669]" />
                  <span>View & Download Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ------------------- 5. ANALYTICS TAB ------------------- */}
      {currentTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="lms-card space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#111827]">Skill Mastery Index</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>React & Next.js Architecture</span>
                  <span className="text-[#059669]">96%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-[#059669] rounded-full w-[96%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>RAG & Vector Databases</span>
                  <span className="text-[#059669]">82%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-[#059669] rounded-full w-[82%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="lms-card space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#111827]">Engagement & Attendance Log</h3>
            <p className="text-xs text-slate-500">100% Attendance recorded across 14 virtual sessions</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#059669]" />
              <span className="text-xs font-bold text-[#111827]">Perfect Attendance Badge Awarded</span>
            </div>
          </div>
        </div>
      )}


      {/* ------------------- 6. UI COMPONENT SHOWCASE TAB ------------------- */}
      {currentTab === 'components' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="space-y-2 border-b border-[#E2E8F0] pb-4">
            <h2 className="font-heading font-bold text-2xl text-[#111827]">
              LMS UI Components & Design System
            </h2>
            <p className="text-xs text-slate-500">
              Interactive demonstration of all enterprise components built with the Slate 900 + Emerald visual language.
            </p>
          </div>

          {/* Badges & Avatars */}
          <div className="lms-card space-y-4">
            <h3 className="font-heading font-bold text-base text-[#111827]">1. Badges & Status Indicators</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#059669] text-white text-xs font-bold rounded-full">Primary Emerald</span>
              <span className="px-3 py-1 bg-emerald-100 text-[#059669] text-xs font-bold rounded-full">Success Badge</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Warning Badge</span>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">Error Badge</span>
              <span className="px-3 py-1 bg-[#0F172A] text-white text-xs font-bold rounded-full">Slate 900 Badge</span>
            </div>
          </div>

          {/* Buttons Showcase */}
          <div className="lms-card space-y-4">
            <h3 className="font-heading font-bold text-base text-[#111827]">2. Button Variations</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary">Primary Emerald Button</button>
              <button className="btn-secondary">Secondary White Button</button>
              <button
                onClick={() => toast.success('Action executed successfully!')}
                className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full font-heading font-semibold text-sm hover:bg-slate-800 shadow-md"
              >
                Trigger Sonner Toast
              </button>
            </div>
          </div>

          {/* Skeletons & Empty State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="lms-card space-y-3">
              <h3 className="font-heading font-bold text-base text-[#111827]">3. Skeleton Loading State</h3>
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-3 bg-slate-200 rounded-lg w-1/2" />
                <div className="h-20 bg-slate-100 rounded-xl" />
              </div>
            </div>

            <div className="lms-card text-center space-y-3 flex flex-col items-center justify-center p-8">
              <Layers className="w-10 h-10 text-slate-300" />
              <h4 className="font-heading font-bold text-base text-[#111827]">No Notifications Found</h4>
              <p className="text-xs text-slate-500">You are all caught up! Check back later for updates.</p>
            </div>
          </div>

        </div>
      )}


      {/* ----------------- QUIZ RUNNER MODAL ----------------- */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-6 border border-[#E2E8F0] animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-heading font-bold text-lg text-[#111827] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#059669]" /> Interactive Skills Quiz
              </h3>
              <button onClick={() => setQuizModalOpen(false)} className="text-slate-400 hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {quizScore === null ? (
              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-[#111827]">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSelect(qIdx, oIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all ${
                            selectedAnswers[qIdx] === oIdx
                              ? 'border-[#059669] bg-emerald-50 text-[#059669] font-bold'
                              : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={submitQuiz}
                  className="btn-primary w-full py-3 justify-center text-sm font-bold shadow-lg shadow-emerald-600/20"
                >
                  Submit Assessment Answers
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] font-heading font-extrabold text-2xl mx-auto flex items-center justify-center">
                  {quizScore}%
                </div>
                <h4 className="font-heading font-bold text-xl text-[#111827]">Evaluation Complete!</h4>
                <p className="text-xs text-slate-500">Your score has been updated in your main course analytics.</p>
                <button
                  onClick={() => {
                    setQuizScore(null);
                    setQuizModalOpen(false);
                  }}
                  className="btn-primary px-6 py-2.5 text-xs font-bold"
                >
                  Close & Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ----------------- CERTIFICATE MODAL ----------------- */}
      {certificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 max-w-xl w-full shadow-2xl space-y-6 border border-slate-700 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-900/50">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
              Official ISO Verified Credential
            </span>

            <h3 className="font-heading font-extrabold text-2xl text-white">
              Certificate of Completion
            </h3>

            <p className="text-sm text-slate-300">
              This certifies that <strong className="text-white font-semibold">Jane Devson</strong> has successfully mastered <strong className="text-white font-semibold">Fullstack Systems Engineering</strong> on EduFlow Enterprise LMS.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  toast.success('Downloading high-resolution PDF certificate...');
                  setCertificateModalOpen(false);
                }}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setCertificateModalOpen(false)}
                className="bg-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-full text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
