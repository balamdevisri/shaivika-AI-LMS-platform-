import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Star,
  PlayCircle,
  X,
  ChevronRight,
  BookOpen,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

export const CoursesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourseModal, setSelectedCourseModal] = useState<any | null>(null);

  const categories = ['All', 'Linux & Systems'];

  const allCourses = [
    {
      id: 1,
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
      badge: 'Featured Track',
      thumbnail: '/assets/images/linux_course_thumbnail.png',
      description: `Welcome to Linux Essentials! Linux is one of the world's most powerful and widely used operating systems, powering everything from web servers and cloud platforms to Android devices, supercomputers, and embedded systems. This course is designed for beginners who want to build a strong foundation in Linux. You will learn how Linux works, how to navigate the terminal, manage files and directories, understand permissions, and perform essential system operations using real-world commands. By the end of this course, you'll have the confidence to work efficiently in any Linux environment and be prepared for advanced topics such as shell scripting, DevOps, cloud computing, and cybersecurity.`,
      syllabus: [
        'Module 1: Linux Architecture, Kernel & CLI Fundamentals',
        'Module 2: File System Hierarchy, Permissions & Ownership',
        'Module 3: Process Management, Systemd Services & Cron Jobs',
        'Module 4: Bash Scripting, Networking & Security Hardening',
      ],
    },
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 font-['Sora'] text-slate-900 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-semibold">
            <Link to="/dashboard" className="hover:text-sky-600">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sky-600 font-bold">Course Catalog</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Enterprise Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Explore hands-on technical tracks powered by live interactive Linux terminals.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/90 border border-sky-200/80 p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, instructor, or topic..."
            className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-hidden font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-sky-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/95 rounded-3xl border border-sky-200/90 overflow-hidden flex flex-col group shadow-xl shadow-sky-500/10 hover:border-sky-400 hover:shadow-2xl transition-all"
          >
            {/* Thumbnail Header */}
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-sky-800 text-xs px-3 py-1 rounded-xl font-bold border border-sky-200 shadow-xs">
                {course.category}
              </div>
              <div className="absolute top-3 right-3 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                {course.badge}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-500 font-medium">({course.reviews} reviews)</span>
                  </div>
                  <span className="text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg font-bold border border-sky-200 text-[11px]">
                    {course.level}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-sky-600 block">{course.subtitle}</span>
                  <Link to={`/courses/${course.id}`} className="block">
                    <h3 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {course.title}
                    </h3>
                  </Link>
                </div>

                {/* Course Intro Teaser */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-sky-100">
                  {course.description}
                </p>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center justify-between pt-3 border-t border-sky-100">
                <div className="flex items-center gap-3">
                  <img
                    src={course.avatar}
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">{course.instructor}</span>
                    <span className="text-slate-500 block text-[11px] font-medium">{course.role}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <Link
                  to={`/courses/${course.id}`}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-sky-200 text-xs font-bold text-slate-700 hover:bg-sky-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Explore Course & Modules</span>
                </Link>

                <Link
                  to={`/courses/${course.id}`}
                  className="flex-1 btn-blue-primary text-xs py-2.5 justify-center font-bold shadow-md shadow-sky-500/20 cursor-pointer flex items-center gap-1"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details & Syllabus Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-sky-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto text-slate-900 font-['Sora']">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-sky-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-500" />
                  <span>{selectedCourseModal.subtitle}</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-slate-400 hover:text-slate-900 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Introduction Section */}
            <div className="space-y-3 bg-sky-50/70 p-5 rounded-2xl border border-sky-200/80 text-xs">
              <h4 className="font-heading font-bold text-sm text-sky-900 flex items-center gap-2">
                <span>Course Introduction</span>
              </h4>
              <p className="text-slate-800 font-bold leading-relaxed">
                Welcome to Linux Essentials!
              </p>
              <p className="text-slate-700 leading-relaxed font-medium">
                Linux is one of the world's most powerful and widely used operating systems, powering everything from web servers and cloud platforms to Android devices, supercomputers, and embedded systems.
              </p>
              <p className="text-slate-700 leading-relaxed font-medium">
                This course is designed for beginners who want to build a strong foundation in Linux. You will learn how Linux works, how to navigate the terminal, manage files and directories, understand permissions, and perform essential system operations using real-world commands.
              </p>
              <p className="text-sky-900 font-bold bg-white p-3 rounded-xl border border-sky-200 leading-relaxed shadow-xs">
                By the end of this course, you'll have the confidence to work efficiently in any Linux environment and be prepared for advanced topics such as shell scripting, DevOps, cloud computing, and cybersecurity.
              </p>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-900">Curriculum Modules</h4>
              <div className="space-y-2">
                {selectedCourseModal.syllabus.map((item: string, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-sky-100 flex items-center gap-3 text-xs text-slate-800 font-semibold">
                    <PlayCircle className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-4 border-t border-sky-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="py-2.5 px-4 rounded-xl border border-sky-200 text-xs font-bold text-slate-600 hover:bg-sky-50 transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success(`Successfully enrolled in ${selectedCourseModal.title}!`);
                  setSelectedCourseModal(null);
                }}
                className="btn-blue-primary text-xs py-2.5 px-5 font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-sky-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Enrollment</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CoursesList;
