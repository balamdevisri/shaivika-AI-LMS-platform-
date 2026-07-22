import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Star,
  PlayCircle,
  X,
  ChevronRight,
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
      instructor: 'Bhanu Prakash Achari',
      role: 'Linux Systems Architect & AI Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviews: 1450,
      students: '28,900',
      duration: '32 hrs',
      category: 'Linux & Systems',
      level: 'Beginner to Advanced',
      badge: 'Featured',
      thumbnail: '/assets/images/linux_course_thumbnail.png',
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1 font-medium">
            <Link to="/dashboard" className="hover:text-[#10B981]">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="font-semibold text-[#10B981]">Course Catalog</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Enterprise Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
            Browse 250+ enterprise AI tracks with live interactive code sandboxes.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#0F172A] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, instructor, or AI topic..."
            className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-hidden"
          />
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-white shadow-md'
                  : 'bg-[#020617] text-[#94A3B8] hover:text-white border border-white/10'
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
          <div key={course.id} className="glass-card p-0 overflow-hidden flex flex-col group">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#020617]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium border border-white/10">
                {course.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                {course.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-[#94A3B8] font-normal">({course.reviews})</span>
                  </div>
                  <span className="text-[#94A3B8] bg-[#020617] px-2 py-0.5 rounded-md font-medium border border-white/10">
                    {course.level}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#10B981] transition-colors line-clamp-2">
                  {course.title}
                </h3>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src={course.avatar}
                  alt={course.instructor}
                  className="w-9 h-9 rounded-full object-cover border border-[#10B981]"
                />
                <div className="text-xs">
                  <span className="font-semibold text-white block">{course.instructor}</span>
                  <span className="text-[#94A3B8] block">{course.role}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="flex-1 btn-glass-secondary text-xs py-2 justify-center"
                >
                  Syllabus
                </button>
                <button
                  onClick={() => toast.success(`Enrolled in ${course.title}!`)}
                  className="flex-1 btn-emerald-primary text-xs py-2 justify-center"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-white/10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#34D399] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {selectedCourseModal.category} • {selectedCourseModal.level}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-1">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-[#94A3B8] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Syllabus */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-white">Curriculum Breakdown</h4>
              <div className="space-y-2">
                {selectedCourseModal.syllabus.map((item: string, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#020617] border border-white/10 flex items-center gap-3 text-xs text-slate-200">
                    <PlayCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="btn-glass-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success(`Successfully enrolled in ${selectedCourseModal.title}!`);
                  setSelectedCourseModal(null);
                }}
                className="btn-emerald-primary text-xs py-2 px-5"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
