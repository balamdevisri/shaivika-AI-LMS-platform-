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
  Play,
} from 'lucide-react';
import { toast } from 'sonner';
import { useCourses } from '@/contexts/CourseContext';

export const CourseView: React.FC = () => {
  const { courseId } = useParams();
  const { getCourseById } = useCourses();
  const dynamicCourse = getCourseById(courseId || '1');

  const [activeTab, setActiveTab] = useState<'intro' | 'index' | 'terminal' | 'quiz'>('intro');
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([101, 102]);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(101);

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'uname -a', output: 'Linux shaivika-ai-kernel 6.8.0-generic x86_64 GNU/Linux' },
    { cmd: 'whoami', output: 'student@shaivika-lms' },
  ]);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Instant Terminal Command Execution Helper
  const executeCommandInTerminal = (rawCmd: string) => {
    const cleanCmd = rawCmd.replace(/^\$\s*/, '').trim();
    let output = '';
    const cmdLower = cleanCmd.toLowerCase();

    if (cmdLower === 'help') {
      output = 'Available commands: ls, pwd, whoami, uname -a, cat intro.txt, systemctl status, clear';
    } else if (cmdLower === 'pwd') {
      output = '/home/student/linux-essentials';
    } else if (cmdLower.includes('ls')) {
      output = 'drwxr-xr-x 4 student student 4096 Jul 22 20:30 .\ndrwxr-xr-x 3 student student 4096 Jul 22 20:30 ..\n-rw-r--r-- 1 student student  842 Jul 22 20:30 intro.txt\n-rwxr-xr-x 1 student student 1024 Jul 22 20:30 backup.sh';
    } else if (cmdLower.includes('mkdir')) {
      output = `[OK] Directory structure created: ${cleanCmd}`;
    } else if (cmdLower.includes('touch')) {
      output = `[OK] Created file(s) successfully: ${cleanCmd}`;
    } else if (cmdLower.includes('cp')) {
      output = `[OK] Copied target file/directory recursively.`;
    } else if (cmdLower.includes('mv')) {
      output = `[OK] Moved / renamed item successfully.`;
    } else if (cmdLower.includes('rm')) {
      output = `[OK] Removed file/directory permanently.`;
    } else if (cmdLower === 'whoami') {
      output = 'student@shaivika-lms';
    } else if (cmdLower.includes('tree')) {
      output = '.\n├── bin\n├── devops_lab\n│   └── scripts\n│       ├── build.sh\n│       └── deploy.sh\n└── test.sh';
    } else {
      output = `bash: ${cleanCmd}: command simulated successfully.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cleanCmd, output }]);
    setActiveTab('terminal');
    toast.success(`Executed "${cleanCmd}" in CLI Terminal Lab!`);
  };

  const courseData = {
    id: dynamicCourse?.id || courseId || '1',
    title: dynamicCourse?.title || 'Introduction to Linux & System Administration',
    subtitle: dynamicCourse?.subtitle || '🐧 Linux Essentials',
    instructor: dynamicCourse?.instructor || 'Bhanu Prakash Achari',
    role: dynamicCourse?.role || 'Linux Systems Architect & AI Specialist',
    avatar: dynamicCourse?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: dynamicCourse?.rating || 5.0,
    reviews: dynamicCourse?.reviews || 1450,
    students: dynamicCourse?.students || '28,900',
    duration: dynamicCourse?.duration || '32 hrs',
    category: dynamicCourse?.category || 'Linux & Systems',
    level: dynamicCourse?.level || 'Beginner to Advanced',
    thumbnail: dynamicCourse?.thumbnail || '/assets/images/linux_course_thumbnail.png',
    introText: typeof dynamicCourse?.description === 'string' ? dynamicCourse.description.split('\n\n') : [
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
          { id: 102, title: '1.2 Understanding Shell Architecture & Command Anatomy', duration: '60 mins', type: 'lab' },
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
        question: 'Which layer of the Operating System directly manages hardware resources like CPU and RAM?',
        options: ['Shell', 'GUI', 'Kernel', 'User Space'],
        correct: 2,
      },
      {
        id: 2,
        question: 'In the command cp -r folder1 folder2, what does the -r option stand for?',
        options: ['Remove', 'Recursive', 'Read-only', 'Revert'],
        correct: 1,
      },
      {
        id: 3,
        question: 'What command takes you back to your previous working directory?',
        options: ['cd ..', 'cd ~', 'cd -', 'pwd'],
        correct: 2,
      },
    ],
  };

  // Reusable Interactive Command Box with Auto Terminal Execution
  const InteractiveCmd: React.FC<{ cmd: string; desc?: string }> = ({ cmd, desc }) => (
    <div className="bg-slate-950 p-3.5 rounded-xl font-mono text-xs border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md my-2">
      <div className="space-y-1 min-w-0">
        {desc && <span className="text-[11px] text-slate-400 font-sans block">{desc}</span>}
        <span className="text-emerald-400 font-bold block truncate">{cmd.startsWith('$') ? cmd : `$ ${cmd}`}</span>
      </div>
      <button
        type="button"
        onClick={() => executeCommandInTerminal(cmd)}
        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold rounded-lg text-[11px] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
        title="Execute command in Terminal Lab"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Run in Terminal</span>
      </button>
    </div>
  );

  // Module 1 Lessons Rich Content Renderer
  const module1LessonsContent: { [key: number]: any } = {
    101: {
      title: '1.1 Introduction to Unix & Linux Operating System Architecture',
      time: '45 mins',
      badge: 'Core Foundations',
      render: (
        <div className="space-y-6">
          <div className="bg-sky-50/80 p-4 sm:p-5 rounded-2xl border border-sky-200/80 space-y-2">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">📌 OVERVIEW</span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Unix and Linux operate on a multi-layered architecture designed for multi-user security, high performance, and modularity.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>🏗️ Architectural Layers</span>
            </h4>

            <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 font-mono text-xs space-y-3 shadow-xl">
              <div className="p-3 bg-sky-950/80 border border-sky-500/40 rounded-xl text-sky-300 text-center shadow-xs">
                <span className="font-bold block text-sky-400">USER APPLICATIONS</span>
                <span className="text-[11px] opacity-80">(Web Browser, VS Code, Python, MySQL)</span>
              </div>

              <div className="flex justify-center text-slate-500 font-bold">│  ▼</div>

              <div className="p-3 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-indigo-300 text-center shadow-xs">
                <span className="font-bold block text-indigo-400">SHELL / CLI / GUI</span>
                <span className="text-[11px] opacity-80">(Bash, Zsh, GNOME, Terminal)</span>
              </div>

              <div className="flex justify-center text-slate-500 font-bold">│  ▼ (System Calls)</div>

              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-center shadow-xs">
                <span className="font-bold block text-emerald-400">KERNEL</span>
                <span className="text-[11px] opacity-80">• Process Scheduler  • Memory Manager  • File System Driver  • Network Stack</span>
              </div>

              <div className="flex justify-center text-slate-500 font-bold">│  ▼</div>

              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 text-center shadow-xs">
                <span className="font-bold block text-white">HARDWARE</span>
                <span className="text-[11px] opacity-80">(CPU, RAM, SSD/HDD, NIC, GPU)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">Key Components Explained:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-sky-100 space-y-1">
                <span className="font-bold text-sky-900 block">🖥️ Hardware:</span>
                <p className="text-slate-600 font-medium">Physical components (CPU, RAM, Disks, NIC, GPU).</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-sky-100 space-y-1">
                <span className="font-bold text-emerald-800 block">⚙️ Kernel:</span>
                <p className="text-slate-600 font-medium">The core engine. Directly manages hardware resources and isolates processes.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-sky-100 space-y-1">
                <span className="font-bold text-indigo-900 block">🐚 Shell:</span>
                <p className="text-slate-600 font-medium">Interface between user and kernel. Translates human commands into system calls.</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-sky-100 space-y-1">
                <span className="font-bold text-purple-900 block">👤 User Space:</span>
                <p className="text-slate-600 font-medium">Applications run here with restricted permissions for safety.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-sky-600 text-white rounded-2xl shadow-md font-bold text-xs flex items-center gap-2">
            <span>💡 Key Takeaway:</span>
            <p className="font-medium">User programs never talk directly to hardware; they always go through System Calls to the Kernel.</p>
          </div>
        </div>
      ),
    },

    102: {
      title: '1.2 Understanding Shell Architecture & Command Anatomy',
      time: '60 mins',
      badge: 'CLI Mastery',
      render: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>🐚 What is a Shell?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              A Shell is a command-line interpreter that executes commands entered by the user or from script files.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200/80 space-y-1">
                <span className="font-bold text-sky-900 block">Bash (Bourne Again Shell):</span>
                <p className="text-slate-600 font-medium">Default on most Linux distros (Ubuntu, RHEL, Debian).</p>
              </div>
              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200/80 space-y-1">
                <span className="font-bold text-indigo-900 block">Zsh (Z Shell):</span>
                <p className="text-slate-600 font-medium">Default on macOS; offers advanced auto-completion and customization.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>📐 Anatomy of a Linux Command</span>
            </h4>
            <p className="text-xs text-slate-600 font-medium">Every Linux command follows a standard syntax:</p>

            <InteractiveCmd cmd="command -[options] [arguments]" desc="Standard Command Syntax Pattern" />

            <h5 className="font-bold text-xs text-slate-800 pt-2">🔍 Practical Breakdown:</h5>
            <InteractiveCmd cmd="ls -la /var/log" desc="List detailed files including hidden ones in /var/log" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-center space-y-1">
                <span className="font-bold text-sky-900 block">Command: ls</span>
                <span className="text-[10px] text-slate-500 font-semibold block">What to run</span>
                <p className="text-[11px] text-slate-700 font-medium">List directory contents</p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                <span className="font-bold text-amber-900 block">Options/Flags: -la</span>
                <span className="text-[10px] text-slate-500 font-semibold block">How to do it</span>
                <p className="text-[11px] text-slate-700 font-medium">-l: Long format | -a: Show hidden files (.)</p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                <span className="font-bold text-emerald-900 block">Argument: /var/log</span>
                <span className="text-[10px] text-slate-500 font-semibold block">Target of action</span>
                <p className="text-[11px] text-slate-700 font-medium">Target directory path</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    103: {
      title: '1.3 Navigating Files & Directories',
      time: '50 mins',
      badge: 'Navigation Skills',
      render: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <span>🌳 The Linux Directory Hierarchy Standard (FHS)</span>
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              In Linux, everything is a file, and the system starts at the Root directory <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-sky-700">/</code>.
            </p>

            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 shadow-lg">
              <div className="text-sky-400 font-bold">/ (Root Directory)</div>
              <div className="pl-4">├── <span className="text-emerald-400 font-bold">bin</span>    --&gt; Essential user binaries (ls, cp, rm)</div>
              <div className="pl-4">├── <span className="text-amber-400 font-bold">etc</span>    --&gt; System configuration files</div>
              <div className="pl-4">├── <span className="text-sky-300 font-bold">home</span>   --&gt; User home directories (/home/user)</div>
              <div className="pl-4">├── <span className="text-rose-400 font-bold">root</span>   --&gt; Home directory for superuser</div>
              <div className="pl-4">├── <span className="text-indigo-300 font-bold">tmp</span>    --&gt; Temporary files (cleared on reboot)</div>
              <div className="pl-4">└── <span className="text-purple-300 font-bold">var</span>    --&gt; Variable data (logs, databases)</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">🛠️ Core Navigation Commands Table & Quick Execution</h4>
            
            <div className="space-y-2">
              <InteractiveCmd cmd="pwd" desc="Print Working Directory (Displays absolute path)" />
              <InteractiveCmd cmd="ls -la /home" desc="List all files & details in /home directory" />
              <InteractiveCmd cmd="cd /var/log" desc="Navigate to system log directory" />
              <InteractiveCmd cmd="tree -L 2" desc="Visualize directory tree up to depth 2" />
            </div>
          </div>

          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-3 text-xs">
            <span className="font-bold text-sky-900 block">💡 Essential cd Shortcuts:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => executeCommandInTerminal('cd ~')}
                className="p-2.5 bg-white hover:bg-sky-100 rounded-xl border border-sky-200 text-left cursor-pointer transition-all"
              >
                <span className="text-sky-700 font-bold block">cd ~</span>
                <span className="text-slate-500 text-[10px]">➜ Go to Home dir</span>
              </button>

              <button
                type="button"
                onClick={() => executeCommandInTerminal('cd ..')}
                className="p-2.5 bg-white hover:bg-sky-100 rounded-xl border border-sky-200 text-left cursor-pointer transition-all"
              >
                <span className="text-sky-700 font-bold block">cd ..</span>
                <span className="text-slate-500 text-[10px]">➜ Move up 1 level</span>
              </button>

              <button
                type="button"
                onClick={() => executeCommandInTerminal('cd -')}
                className="p-2.5 bg-white hover:bg-sky-100 rounded-xl border border-sky-200 text-left cursor-pointer transition-all"
              >
                <span className="text-sky-700 font-bold block">cd -</span>
                <span className="text-slate-500 text-[10px]">➜ Jump to previous dir</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },

    104: {
      title: '1.4 Creating, Copying, Moving & Deleting Files',
      time: '60 mins',
      badge: 'File Operations',
      render: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">🛠️ Essential File Operations</h4>

            <div className="p-4 bg-slate-50 rounded-2xl border border-sky-100 space-y-2">
              <span className="font-bold text-xs text-sky-900 block">1. Creating Folders & Files (mkdir, touch)</span>
              <InteractiveCmd cmd="mkdir project" desc="Create a single folder" />
              <InteractiveCmd cmd="mkdir -p project/src/components" desc="Create nested directory tree" />
              <InteractiveCmd cmd="touch project/index.js project/README.md" desc="Create empty files" />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-sky-100 space-y-2">
              <span className="font-bold text-xs text-sky-900 block">2. Copying Files & Directories (cp)</span>
              <InteractiveCmd cmd="cp file.txt copy_file.txt" desc="Copy a single file" />
              <InteractiveCmd cmd="cp -r project/ project_backup/" desc="Copy a directory recursively (-r)" />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-sky-100 space-y-2">
              <span className="font-bold text-xs text-sky-900 block">3. Moving & Renaming (mv)</span>
              <InteractiveCmd cmd="mv old_name.txt new_name.txt" desc="Rename a file" />
              <InteractiveCmd cmd="mv report.pdf ~/Documents/" desc="Move file to another directory" />
            </div>

            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-2">
              <span className="font-bold text-xs text-rose-900 flex items-center gap-1">
                ⚠️ 4. Deleting Files & Directories (rm, rmdir) — Permanent!
              </span>
              <InteractiveCmd cmd="rm file.txt" desc="Remove a file" />
              <InteractiveCmd cmd="rmdir empty_folder/" desc="Remove empty directory" />
              <InteractiveCmd cmd="rm -rf unwanted_folder/" desc="Force delete directory and contents (-rf)" />
            </div>
          </div>
        </div>
      ),
    },

    105: {
      title: '1.5 Quiz & Hands-on Terminal Practice',
      time: '30 mins',
      badge: 'Lab Challenge',
      render: (
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-slate-900">🧪 Hands-on Lab Challenge</h4>
            <p className="text-xs text-slate-700 font-medium">Run the following scenario in your terminal:</p>

            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs space-y-2 font-medium">
              <div className="font-bold text-sky-900">Challenge Scenario Steps:</div>
              <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                <li>Create directory structure: <code className="bg-white px-1.5 py-0.5 rounded border font-mono">devops_lab/scripts</code></li>
                <li>Change directory into <code className="bg-white px-1.5 py-0.5 rounded border font-mono">devops_lab/scripts</code></li>
                <li>Create three empty files: <code className="bg-white px-1.5 py-0.5 rounded border font-mono">deploy.sh, build.sh, test.sh</code></li>
                <li>Move <code className="bg-white px-1.5 py-0.5 rounded border font-mono">test.sh</code> one level up into <code className="bg-white px-1.5 py-0.5 rounded border font-mono">devops_lab</code></li>
                <li>Verify final structure using <code className="bg-white px-1.5 py-0.5 rounded border font-mono">tree</code> or <code className="bg-white px-1.5 py-0.5 rounded border font-mono">ls -la</code></li>
              </ol>
            </div>

            <div className="space-y-2 pt-2">
              <span className="font-bold text-xs text-slate-900 block">Verification Commands (Run Step-by-Step):</span>
              <InteractiveCmd cmd="mkdir -p devops_lab/scripts" desc="Step 1: Create nested directory" />
              <InteractiveCmd cmd="cd devops_lab/scripts" desc="Step 2: Change directory" />
              <InteractiveCmd cmd="touch deploy.sh build.sh test.sh" desc="Step 3: Create empty files" />
              <InteractiveCmd cmd="mv test.sh .." desc="Step 4: Move test.sh up one level" />
              <InteractiveCmd cmd="cd .." desc="Step 5: Change to devops_lab" />
              <InteractiveCmd cmd="ls -R" desc="Step 6: Verify recursive directory structure" />
            </div>
          </div>
        </div>
      ),
    },
  };

  const handleTerminalExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;

    executeCommandInTerminal(command);
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

            {/* Module 1 Deep Dive: Architecture Diagrams & Linux Distros */}
            <div className="bg-white/95 border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 space-y-6">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-sky-600" />
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                    Module 1: Linux Architecture & Components
                  </h3>
                </div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  Core Fundamentals
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Linux combines a wide range of open-source tools and components to form a complete computing environment. These components include file systems, user interfaces, system utilities and application programs, all working together to manage hardware and enable users to interact with their computer systems.
              </p>

              {/* Diagram 1: Unix and Linux OS Architecture */}
              <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-sky-100">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  1. Layered Architecture: Hardware → Kernel → Shell → User Applications
                </h4>
                <div className="rounded-2xl overflow-hidden border border-sky-200 bg-white shadow-xs">
                  <img
                    src="/assets/images/linux_os_architecture.png"
                    alt="Unix and Linux Operating Systems Architecture"
                    className="w-full object-cover max-h-96"
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  User applications (Web Browsers, Text Editors, Compilers) interact with the <strong>Shell</strong> (Command Line & GUI). The Shell makes system calls to the <strong>Kernel</strong> (Core control program), which directly manages CPU, Memory, and Hardware Devices.
                </p>
              </div>

              {/* Diagram 2: Monolithic Kernel vs Microkernel */}
              <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-sky-100">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  2. Monolithic Kernel Architecture (e.g. Linux) vs. Microkernel (e.g. Minix)
                </h4>
                <div className="rounded-2xl overflow-hidden border border-sky-200 bg-white shadow-xs">
                  <img
                    src="/assets/images/linux_monolithic_vs_microkernel.png"
                    alt="Monolithic Kernel vs Microkernel Architecture"
                    className="w-full object-cover max-h-96"
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Linux uses a <strong>Monolithic Kernel</strong> where File System, Device Drivers, IPC (Inter-Process Communication), and Process Scheduler operate together inside a single Kernel Space for maximum performance and low-latency hardware execution.
                </p>
              </div>

              {/* Diagram 3: Kernel Subsystem Managers */}
              <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-sky-100">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  3. Kernel Subsystem Managers & Hardware Interface
                </h4>
                <div className="rounded-2xl overflow-hidden border border-sky-200 bg-white shadow-xs">
                  <img
                    src="/assets/images/linux_kernel_managers.png"
                    alt="Kernel Subsystem Managers"
                    className="w-full object-cover max-h-96"
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  The Linux Kernel coordinates four core managers: <strong>Process Scheduler</strong> (CPU queue allocation), <strong>Memory Manager</strong> (Virtual vs Physical RAM), <strong>Device Drivers</strong> (Storage, Display, USB), and <strong>File System Manager</strong>.
                </p>
              </div>

              {/* Distributions in Linux */}
              <div className="space-y-4 pt-4 border-t border-sky-100">
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">
                    Distributions in Linux (Distros)
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    A Linux distribution (distro) is a complete operating system built around the Linux kernel along with system tools, libraries, and applications. Different distributions are designed for various purposes such as desktops, servers, cybersecurity, and development.
                  </p>
                </div>

                {/* Distros Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { name: 'Ubuntu', badge: 'Beginner-Friendly', color: 'border-orange-200 bg-orange-50/50 text-orange-900', desc: 'A beginner-friendly Linux distribution used for desktops, servers, and cloud computing.' },
                    { name: 'Debian', badge: 'Server & Stability', color: 'border-rose-200 bg-rose-50/50 text-rose-900', desc: 'A stable and reliable Linux distribution widely used for enterprise servers.' },
                    { name: 'Kali Linux', badge: 'Cybersecurity', color: 'border-sky-200 bg-sky-50/50 text-sky-900', desc: 'A security-focused Linux distribution used for ethical hacking and penetration testing.' },
                    { name: 'MX Linux', badge: 'Lightweight', color: 'border-slate-200 bg-slate-100/60 text-slate-900', desc: 'A lightweight Linux distribution suitable for older hardware.' },
                    { name: 'Manjaro', badge: 'Arch-Based', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900', desc: 'A user-friendly Arch-based Linux distribution with rolling updates.' },
                    { name: 'Linux Mint', badge: 'Windows Migrators', color: 'border-green-200 bg-green-50/50 text-green-900', desc: 'A simple and beginner-friendly Linux distribution ideal for Windows users.' },
                    { name: 'Solus', badge: 'Desktop Performance', color: 'border-blue-200 bg-blue-50/50 text-blue-900', desc: 'A modern Linux distribution focused on desktop performance and simplicity.' },
                    { name: 'Fedora', badge: 'Developer-Focused', color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900', desc: 'A developer-focused Linux distribution featuring the latest technologies.' },
                    { name: 'openSUSE', badge: 'Enterprise & Dev', color: 'border-lime-200 bg-lime-50/50 text-lime-900', desc: 'A powerful Linux distribution used for development and enterprise environments.' },
                    { name: 'Deepin', badge: 'Visually Attractive', color: 'border-purple-200 bg-purple-50/50 text-purple-900', desc: 'A visually attractive Linux distribution with an easy-to-use aesthetic interface.' },
                  ].map((distro, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl border ${distro.color} space-y-1 shadow-xs`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{distro.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200">
                          {distro.badge}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-90 font-medium leading-relaxed">{distro.desc}</p>
                    </div>
                  ))}
                </div>
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
              <p className="text-xs text-slate-500 mt-0.5">Click any lesson to read its content inline and run commands directly in the CLI terminal.</p>
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
                    <div className="p-4 border-t border-sky-100 space-y-3 bg-slate-50">
                      {mod.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.id);
                        const isSelected = selectedLessonId === lesson.id;
                        return (
                          <div key={lesson.id} className="space-y-2">
                            <div
                              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                                isSelected
                                  ? 'bg-sky-50/90 border-sky-400 shadow-md ring-2 ring-sky-400/20'
                                  : 'bg-white border-sky-100 hover:border-sky-300 hover:shadow-xs'
                              }`}
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
                                <button
                                  onClick={() => setSelectedLessonId(isSelected ? null : lesson.id)}
                                  className="text-left font-bold text-slate-900 hover:text-sky-600 transition-colors truncate cursor-pointer"
                                >
                                  {lesson.title}
                                </button>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] text-slate-500 font-mono">{lesson.duration}</span>
                                <button
                                  onClick={() => setSelectedLessonId(isSelected ? null : lesson.id)}
                                  className={`px-3 py-1 font-bold rounded-lg border text-[11px] transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                                      : 'bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 border-sky-200'
                                  }`}
                                >
                                  {isSelected ? 'Hide Topic' : 'View Topic'}
                                </button>
                              </div>
                            </div>

                            {/* Direct Inline Topic Content Drawer */}
                            {isSelected && (
                              <div className="p-5 sm:p-6 bg-white rounded-2xl border border-sky-200 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                                    {module1LessonsContent[lesson.id]?.badge || 'Interactive Lesson'} • {lesson.duration}
                                  </span>
                                  <button
                                    onClick={() => {
                                      setActiveTab('terminal');
                                      toast.info('Interactive CLI Terminal Lab launched!');
                                    }}
                                    className="btn-blue-primary text-xs py-1.5 px-3 font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                                  >
                                    <Terminal className="w-3.5 h-3.5" />
                                    <span>Launch Terminal Lab</span>
                                  </button>
                                </div>

                                {module1LessonsContent[lesson.id]?.render || (
                                  <div className="p-4 bg-sky-50 text-slate-700 rounded-2xl text-xs font-medium">
                                    Detailed topic guide for this lesson is ready. Practice hands-on Linux CLI commands in the Terminal Lab!
                                  </div>
                                )}
                              </div>
                            )}
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
              Type Linux CLI commands below or click <span className="text-emerald-300">"▶ Run in Terminal"</span> next to any command in the curriculum!
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
