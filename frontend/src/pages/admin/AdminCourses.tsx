import React, { useState } from 'react';
import { BookOpen, Plus, Search, CheckCircle2, X, Users, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCourses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newCategory, setNewCategory] = useState('Linux & Systems');

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Linux & System Administration',
      instructor: 'Bhanu Prakash Achari',
      students: '28,900',
      status: 'Published',
      tracks: '4 Modules (32 Hours)',
      rating: 5.0,
      category: 'Linux & Systems',
    },
  ]);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newInstructor) {
      toast.error('Please fill in title and instructor name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = {
        id: Date.now(),
        title: newTitle,
        instructor: newInstructor,
        students: '0',
        status: 'Published',
        tracks: '4 Modules (20 Hours)',
        rating: 5.0,
        category: newCategory,
      };
      setCourses([created, ...courses]);
      setIsSubmitting(false);
      setModalOpen(false);
      setNewTitle('');
      setNewInstructor('');
      toast.success(`Course "${newTitle}" created successfully!`);
    }, 500);
  };

  const toggleCourseStatus = (id: number) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' } : c
      )
    );
    toast.info('Course publication status toggled');
  };

  return (
    <div className="space-y-8 text-slate-900 font-['Sora'] max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>Curriculum Management</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Admin Course Track Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Create, edit, and publish enterprise technical courses and AI assessment rubrics.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-blue-primary text-xs py-3 px-5 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 font-bold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course Track</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/90 border border-sky-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title, instructor, or topic..."
              className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-slate-50/80 border border-sky-200/80 hover:border-sky-300 transition-all space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md border border-sky-200">
                    {course.category}
                  </span>
                  <button
                    onClick={() => toggleCourseStatus(course.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                      course.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {course.status}
                  </button>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">Instructor: {course.instructor}</p>
              </div>

              <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  {course.students}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {course.rating}
                </span>
                <span className="font-mono text-[11px] text-slate-500">{course.tracks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Course Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 border border-sky-200 animate-in zoom-in-95 text-slate-900 font-['Sora']">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" /> Create New Course Track
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Advanced Bash & Linux Kernel Security"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Instructor Name</label>
                <input
                  type="text"
                  required
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  placeholder="Bhanu Prakash Achari"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium cursor-pointer"
                >
                  <option value="Linux & Systems">Linux & Systems</option>
                  <option value="Development">Development</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-sky-200 text-xs font-bold text-slate-600 hover:bg-sky-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-blue-primary text-xs py-2.5 px-5 font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Publish Course</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCourses;
