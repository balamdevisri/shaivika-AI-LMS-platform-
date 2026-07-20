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

  const categories = ['All', 'Development', 'AI & Data', 'Design', 'Business', 'DevOps'];

  const allCourses = [
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
      category: 'Development',
      level: 'Advanced',
      badge: 'Bestseller',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      syllabus: [
        'Module 1: Server Components & React 19 Compiler',
        'Module 2: Optimistic UI Updates & Mutations',
        'Module 3: Distributed Caching & Redis Pipelines',
        'Module 4: End-to-End Testing & CI/CD Pipelines',
      ],
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
      category: 'AI & Data',
      level: 'Intermediate',
      badge: 'Hot',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      syllabus: [
        'Module 1: Vector Embeddings & Similarity Search',
        'Module 2: RAG Pipelines with Pinecone & LangChain',
        'Module 3: Fine-Tuning Open Source LLMs',
        'Module 4: AI Agent Orchestration & Tool Calling',
      ],
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
      category: 'Design',
      level: 'Beginner to Pro',
      badge: 'Top Rated',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      syllabus: [
        'Module 1: Atomic Design System Foundations',
        'Module 2: Accessible Color Systems & Contrast',
        'Module 3: Figma Token Export & Component Libraries',
        'Module 4: Framer Motion Animation Masterclass',
      ],
    },
    {
      id: 4,
      title: 'Cloud DevOps & Kubernetes Cluster Architecture',
      instructor: 'Alex Thorne',
      role: 'Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 610,
      students: '1,150',
      duration: '50 hrs',
      category: 'DevOps',
      level: 'Advanced',
      badge: 'New',
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
      syllabus: [
        'Module 1: Containerization with Docker & Podman',
        'Module 2: Kubernetes Manifests & Helm Charts',
        'Module 3: Infrastructure as Code with Terraform',
        'Module 4: Zero-Downtime Deployment Strategies',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
            <Link to="/dashboard" className="hover:text-[#059669]">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#059669]">Course Catalog</span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#111827]">
            Enterprise Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
            Browse 250+ enterprise tracks with interactive video modules and certifications.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, instructor, or topic..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 pl-9 pr-4 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
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
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-slate-600 hover:bg-slate-100'
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

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviews})</span>
                  </div>
                  <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                    {course.level}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#111827] group-hover:text-[#059669] transition-colors line-clamp-2">
                  {course.title}
                </h3>
              </div>

              {/* Instructor */}
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

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="flex-1 btn-secondary text-xs py-2 justify-center"
                >
                  Syllabus
                </button>
                <button
                  onClick={() => toast.success(`Enrolled in ${course.title}!`)}
                  className="flex-1 btn-primary text-xs py-2 justify-center"
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
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-[#E2E8F0] animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {selectedCourseModal.category} • {selectedCourseModal.level}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#111827] mt-1">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-slate-400 hover:text-[#111827] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Syllabus Breakdown */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-[#111827]">Curriculum Breakdown</h4>
              <div className="space-y-2">
                {selectedCourseModal.syllabus.map((item: string, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 text-xs text-[#111827]">
                    <PlayCircle className="w-4 h-4 text-[#059669] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success(`Successfully enrolled in ${selectedCourseModal.title}!`);
                  setSelectedCourseModal(null);
                }}
                className="btn-primary text-xs py-2 px-5"
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
