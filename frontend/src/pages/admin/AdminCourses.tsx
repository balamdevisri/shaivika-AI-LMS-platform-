import React from 'react';
import { BookOpen, Plus, Search, Filter, CheckCircle2 } from 'lucide-react';

export const AdminCourses: React.FC = () => {
  const courses = [
    { title: 'Linux System Administration & Kernel Architecture', students: '12,450', status: 'Published', tracks: '14 Modules' },
    { title: 'Git & GitHub Enterprise Version Control', students: '9,820', status: 'Published', tracks: '10 Modules' },
    { title: 'Docker, Kubernetes & Cloud Native Architecture', students: '8,100', status: 'Published', tracks: '18 Modules' },
    { title: 'Python for AI & Automated Machine Learning', students: '15,300', status: 'Published', tracks: '22 Modules' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Admin Course Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, update, and manage enterprise technical curriculum and AI assessment rubrics.
          </p>
        </div>

        <button className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search course tracks..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter Catalog</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{course.title}</h3>
                    <span className="text-[11px] text-slate-400">{course.tracks}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {course.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-mono">Enrolled: {course.students} Students</span>
                <button className="text-emerald-400 hover:underline font-semibold cursor-pointer">
                  Edit Curriculum →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
