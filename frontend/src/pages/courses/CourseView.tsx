import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  ChevronRight,
  Star,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

export const CourseView: React.FC = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState<'intro' | 'index' | 'terminal' | 'quiz'>('intro');
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([101, 102]);

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'uname -a', output: 'Linux shaivika-ai-kernel 6.8.0-generic x86_64 GNU/Linux' },
    { cmd: 'whoami', output: 'student@shaivika-lms' },
  ]);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const courseData = {
    id: courseId || '1',
    title: 'Introduction to Linux & System Administration',
    subtitle: '🐧 Linux Essentials',
    instructor: 'Bhanu Prakash Achari',
    role: 'Linux Systems Architect & AI Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviews: 1450,
    students: '28,900',
    duration: '32 hrs',
    category: 'Linux & Systems',
    level: 'Beginner to Advanced',
    thumbnail: '/assets/images/linux_course_thumbnail.png',
    introText: [
      `Welcome to Linux Essentials! Linux is one of the world's most powerful and widely used operating systems, powering everything from web servers and cloud platforms to Android devices, supercomputers, and embedded systems.`,
      `This course is designed for beginners who want to build a strong foundation in Linux. You will learn how Linux works, how to navigate the terminal, manage files and directories, understand permissions, and perform essential system operations using real-world commands.`,
      `By the end of this course, you'll have the confidence to work efficiently in any Linux environment and be prepared for advanced topics such as shell scripting, DevOps, cloud computing, and cybersecurity.`,
    ],
    outcomes: [
      'Master essential Linux CLI terminal navigation commands (cd, ls, pwd, find)',
      'Understand File System Hierarchy Standard (FHS) and directory structure',
      'Manage user accounts, groups, file permissions (chmod, chown) & umask',
      'Monitor processes, manage background jobs & configure Systemd services',
      'Write automated Bash shell scripts with variables, conditionals & loops',
      'Configure SSH hardening, Linux Firewall (UFW) and basic networking tools',
    ],
    modules: [
      {
        id: 1,
        title: 'Module 1: Linux Architecture, Kernel & CLI Fundamentals',
        duration: '8 Hours • 5 Lessons',
        lessons: [
          { id: 101, title: '1.1 Introduction to Unix & Linux Operating System Architecture', duration: '45 mins', type: 'video' },
          { id: 102, title: '1.2 Understanding Shell Architecture (Bash/Zsh) & Command Anatomy', duration: '60 mins', type: 'lab' },
          { id: 103, title: '1.3 Navigating Files & Directories (pwd, ls -la, cd, tree)', duration: '50 mins', type: 'lab' },
          { id: 104, title: '1.4 Creating, Copying, Moving & Deleting Files (mkdir, cp, mv, rm)', duration: '60 mins', type: 'lab' },
          { id: 105, title: '1.5 Quiz & Hands-on Terminal Practice: Module 1', duration: '30 mins', type: 'quiz' },
        ],
      },
      {
        id: 2,
        title: 'Module 2: File System Hierarchy, Permissions & Ownership',
        duration: '8 Hours • 5 Lessons',
        lessons: [
          { id: 201, title: '2.1 Linux File System Hierarchy Standard (/root, /etc, /var, /usr)', duration: '55 mins', type: 'video' },
          { id: 202, title: '2.2 File Permissions Demystified: Read, Write & Execute (chmod 755)', duration: '65 mins', type: 'lab' },
          { id: 203, title: '2.3 User & Group Management (chown, chgrp, useradd, sudo)', duration: '60 mins', type: 'lab' },
          { id: 204, title: '2.4 Text Search & Inspection Tools (cat, grep, head, tail, less)', duration: '70 mins', type: 'lab' },
          { id: 205, title: '2.5 Module 2 Practice Quiz', duration: '30 mins', type: 'quiz' },
        ],
      },
      {
        id: 3,
        title: 'Module 3: Process Management, Systemd Services & Cron Jobs',
        duration: '8 Hours • 5 Lessons',
        lessons: [
          { id: 301, title: '3.1 Inspecting Active System Processes (top, htop, ps aux, kill)', duration: '60 mins', type: 'video' },
          { id: 302, title: '3.2 Controlling Daemon Services with Systemd (systemctl status/start)', duration: '75 mins', type: 'lab' },
          { id: 303, title: '3.3 Job Automation with Cron & Crontab Schedules', duration: '50 mins', type: 'lab' },
          { id: 304, title: '3.4 Monitoring System Logs with Journalctl', duration: '45 mins', type: 'lab' },
          { id: 305, title: '3.5 Module 3 Hands-on Assessment', duration: '40 mins', type: 'quiz' },
        ],
      },
      {
        id: 4,
        title: 'Module 4: Bash Scripting, Networking & Security Hardening',
        duration: '8 Hours • 5 Lessons',
        lessons: [
          { id: 401, title: '4.1 Writing Your First Bash Script: Shebang (#!/bin/bash) & Variables', duration: '80 mins', type: 'lab' },
          { id: 402, title: '4.2 Control Flow in Shell Scripts: If/Else Statements & Loops', duration: '90 mins', type: 'lab' },
          { id: 403, title: '4.3 Network Diagnostics (ping, netstat, ss, curl, ip addr)', duration: '60 mins', type: 'lab' },
          { id: 404, title: '4.4 SSH Key Pair Authentication & UFW Firewall Rules', duration: '70 mins', type: 'lab' },
          { id: 405, title: '4.5 Final Course Capstone Project & Certificate Exam', duration: '90 mins', type: 'quiz' },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 1,
        question: 'Which command is used to display the absolute path of your current working directory in Linux?',
        options: ['dir', 'pwd', 'cd', 'path'],
        correct: 1,
      },
      {
        id: 2,
        question: 'What numerical permission code grants Read (4), Write (2), and Execute (1) permissions to the owner?',
        options: ['644', '755', '700', '777'],
        correct: 2,
      },
      {
        id: 3,
        question: 'Which command is used to search for text patterns inside files?',
        options: ['find', 'grep', 'locate', 'search'],
        correct: 1,
      },
    ],
  };

  const handleTerminalExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;

    let output = '';
    const cmdLower = command.toLowerCase();

    if (cmdLower === 'help') {
      output = 'Available commands: ls, pwd, whoami, uname -a, cat intro.txt, systemctl status, clear';
    } else if (cmdLower === 'pwd') {
      output = '/home/student/linux-essentials';
    } else if (cmdLower === 'ls' || cmdLower === 'ls -la') {
      output = 'drwxr-xr-x 4 student student 4096 Jul 22 20:30 .\ndrwxr-xr-x 3 student student 4096 Jul 22 20:30 ..\n-rw-r--r-- 1 student student  842 Jul 22 20:30 intro.txt\n-rwxr-xr-x 1 student student 1024 Jul 22 20:30 backup.sh';
    } else if (cmdLower === 'whoami') {
      output = 'student@shaivika-lms';
    } else if (cmdLower.includes('cat intro.txt')) {
      output = 'Welcome to Linux Essentials! Master the terminal and command line tools.';
    } else if (cmdLower.includes('systemctl')) {
      output = '● nginx.service - High Performance HTTP Server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n   Active: active (running) since Wed 2026-07-22 20:00:00 IST';
    } else if (cmdLower === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      output = `bash: ${command}: command simulated successfully.`;
    }

    setTerminalHistory([...terminalHistory, { cmd: command, output }]);
    setTerminalInput('');
  };

  const toggleLessonComplete = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success('Lesson marked as completed!');
    }
  };

  const calculateScore = () => {
    let score = 0;
    courseData.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-8 font-['Sora'] text-slate-900 max-w-7xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Link to="/courses" className="hover:text-sky-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sky-600 font-bold">{courseData.category}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5 text-sky-500" />
            <span>{courseData.subtitle}</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
            {courseData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 font-medium">
            <span className="flex items-center gap-1 font-bold text-amber-600">
              <Star className="w-4 h-4 fill-current text-amber-400" />
              {courseData.rating} ({courseData.reviews} reviews)
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> {courseData.duration}
            </span>
            <span className="bg-sky-50 text-sky-700 font-bold px-2.5 py-0.5 rounded-lg border border-sky-200 text-[11px]">
              {courseData.level}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-sky-50/80 p-4 rounded-2xl border border-sky-200/80 shrink-0">
          <img
            src={courseData.avatar}
            alt={courseData.instructor}
            className="w-12 h-12 rounded-full object-cover border-2 border-sky-400 shrink-0"
          />
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Instructor</span>
            <span className="font-bold text-sm text-slate-900 block">{courseData.instructor}</span>
            <span className="text-[11px] text-sky-700 block font-medium">{courseData.role}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Header */}
      <div className="bg-white/90 border border-sky-200/80 p-2 rounded-2xl shadow-sm flex overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'intro'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Introduction & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('index')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'index'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Modules & Index Tree</span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'terminal'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Live CLI Terminal Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>AI Knowledge Quiz</span>
        </button>
      </div>

      {/* Tab 1: Course Introduction & Overview */}
      {activeTab === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Introduction Card */}
            <div className="bg-white/95 border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-sky-100 pb-3">
                <Sparkles className="w-5 h-5 text-sky-600 animate-pulse" />
                <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                  Course Introduction
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {courseData.introText.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Learning Outcomes Card */}
            <div className="bg-white/95 border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>What You Will Learn</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium">
                {courseData.outcomes.map((outcome, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5 text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Quick Info */}
          <div className="space-y-6">
            <div className="bg-white/95 border border-sky-200/80 p-6 rounded-3xl shadow-xl shadow-sky-500/10 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900">Course Overview</h3>

              <div className="space-y-3 text-xs font-medium">
                <div className="flex justify-between py-2 border-b border-sky-100">
                  <span className="text-slate-500">Total Duration</span>
                  <span className="font-bold text-slate-900">32 Hours</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sky-100">
                  <span className="text-slate-500">Modules</span>
                  <span className="font-bold text-slate-900">4 Modules</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sky-100">
                  <span className="text-slate-500">Total Lessons</span>
                  <span className="font-bold text-slate-900">20 Lessons</span>
                </div>
                <div className="flex justify-between py-2 border-b border-sky-100">
                  <span className="text-slate-500">Interactive Labs</span>
                  <span className="font-bold text-slate-900">14 CLI Labs</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Certificate</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> ISO Verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('index')}
                className="btn-blue-primary w-full py-3 text-xs font-bold shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>View Modules & Start Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Modules & Index Tree */}
      {activeTab === 'index' && (
        <div className="bg-white/95 border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 space-y-6">
          <div className="flex items-center justify-between border-b border-sky-100 pb-4">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">
                Course Curriculum & Modules Index
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Click any module to expand lessons and launch interactive labs.</p>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              {completedLessons.length} / 20 Lessons Completed
            </span>
          </div>

          <div className="space-y-4">
            {courseData.modules.map((mod) => {
              const isOpen = activeModule === mod.id;
              return (
                <div key={mod.id} className="border border-sky-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    onClick={() => setActiveModule(isOpen ? null : mod.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between bg-white hover:bg-sky-50/50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200">
                        {mod.id}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                          {mod.title}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">{mod.duration}</span>
                      </div>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-sky-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 border-t border-sky-100 space-y-2.5 bg-slate-50">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            className="p-3.5 rounded-xl bg-white border border-sky-100 flex items-center justify-between gap-3 text-xs hover:border-sky-300 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <button
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                                  isDone ? 'bg-emerald-500 text-white' : 'border border-slate-300 hover:border-sky-500'
                                }`}
                              >
                                {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </button>
                              <span className={`font-semibold truncate ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-slate-500 font-mono">{lesson.duration}</span>
                              <button
                                onClick={() => {
                                  if (lesson.type === 'lab') {
                                    setActiveTab('terminal');
                                    toast.info(`Launching Live Terminal Lab for ${lesson.title}`);
                                  } else if (lesson.type === 'quiz') {
                                    setActiveTab('quiz');
                                  } else {
                                    toast.success(`Playing lesson: ${lesson.title}`);
                                  }
                                }}
                                className="px-3 py-1 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 font-bold rounded-lg border border-sky-200 transition-all cursor-pointer text-[11px]"
                              >
                                {lesson.type === 'lab' ? 'Launch Lab' : lesson.type === 'quiz' ? 'Take Quiz' : 'Start'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Live Interactive Terminal */}
      {activeTab === 'terminal' && (
        <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-4 font-mono text-xs text-emerald-400">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-sm">Interactive Linux CLI Terminal Lab</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Online • Kernel 6.8.0
            </span>
          </div>

          <div className="space-y-3 min-h-[300px] max-h-[450px] overflow-y-auto p-2">
            <p className="text-slate-400">
              Type Linux CLI commands below (e.g. <span className="text-emerald-300">pwd</span>, <span className="text-emerald-300">ls -la</span>, <span className="text-emerald-300">whoami</span>, <span className="text-emerald-300">systemctl status</span>, <span className="text-emerald-300">help</span>).
            </p>

            {terminalHistory.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <span>student@shaivika-lms:~$</span>
                  <span className="text-white">{h.cmd}</span>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap pl-4 text-[11px] leading-relaxed">{h.output}</pre>
              </div>
            ))}
          </div>

          <form onSubmit={handleTerminalExecute} className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-sky-400 font-bold shrink-0">student@shaivika-lms:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type Linux command here..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-hidden font-mono"
            />
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl transition-all cursor-pointer shrink-0">
              Run
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: AI Knowledge Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white/95 border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 space-y-6">
          <div className="flex items-center justify-between border-b border-sky-100 pb-4">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">
                Linux Essentials Knowledge Check
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Test your understanding of Linux commands and file system permissions.</p>
            </div>
          </div>

          <div className="space-y-6">
            {courseData.quizQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-sky-100 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">
                  {idx + 1}. {q.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        quizAnswers[q.id] === optIdx
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-800 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {quizSubmitted ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <h3 className="font-heading font-bold text-lg text-emerald-800">
                Quiz Complete! Score: {calculateScore()} / {courseData.quizQuestions.length}
              </h3>
              <p className="text-xs text-emerald-700 font-medium">
                Great job! You have demonstrated strong competency in fundamental Linux commands.
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                setQuizSubmitted(true);
                toast.success('Quiz submitted successfully!');
              }}
              className="btn-blue-primary w-full py-3 text-xs font-bold shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Submit Quiz & Check Score
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default CourseView;
