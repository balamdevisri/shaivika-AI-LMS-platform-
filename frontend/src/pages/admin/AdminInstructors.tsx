import React, { useState } from 'react';
import { Search, GraduationCap, Mail, Plus, CheckCircle2, Star, X, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminInstructors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Verified' | 'Pending'>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for Adding New Instructor
  const [newInstructorName, setNewInstructorName] = useState('');
  const [newInstructorEmail, setNewInstructorEmail] = useState('');
  const [newInstructorSpecialty, setNewInstructorSpecialty] = useState('Linux & System Architecture');

  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'Bhanu Prakash Achari',
      email: 'bhanu@shaivika.ai',
      specialty: 'Linux Systems Architect & AI Specialist',
      joined: 'Jan 10, 2026',
      assignedCourses: 3,
      studentsCount: '28,900',
      rating: 5.0,
      status: 'Verified',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.j@stanford.edu',
      specialty: 'Fullstack Systems & Next.js Architecture',
      joined: 'Jan 18, 2026',
      assignedCourses: 4,
      studentsCount: '14,200',
      rating: 4.9,
      status: 'Verified',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Marcus Vance',
      email: 'm.vance@ai.research.org',
      specialty: 'LLM & Vector Embedding Pipelines',
      joined: 'Feb 05, 2026',
      assignedCourses: 2,
      studentsCount: '21,000',
      rating: 5.0,
      status: 'Verified',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Elena Rostova',
      email: 'elena.r@framer.com',
      specialty: 'UI/UX Design Systems & Micro-Interactions',
      joined: 'Feb 24, 2026',
      assignedCourses: 2,
      studentsCount: '9,800',
      rating: 4.8,
      status: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ]);

  const filteredInstructors = instructors.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || inst.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstructorName || !newInstructorEmail) {
      toast.error('Please enter name and email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = {
        id: Date.now(),
        name: newInstructorName,
        email: newInstructorEmail,
        specialty: newInstructorSpecialty,
        joined: 'Just now',
        assignedCourses: 1,
        studentsCount: '0',
        rating: 5.0,
        status: 'Verified',
        avatar: '',
      };
      setInstructors([created, ...instructors]);
      setIsSubmitting(false);
      setModalOpen(false);
      setNewInstructorName('');
      setNewInstructorEmail('');
      toast.success(`Instructor account approved for ${newInstructorName}!`);
    }, 500);
  };

  const toggleStatus = (id: number) => {
    setInstructors((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? { ...inst, status: inst.status === 'Verified' ? 'Pending' : 'Verified' }
          : inst
      )
    );
    toast.info('Instructor verification status updated');
  };

  return (
    <div className="space-y-8 text-slate-900 font-['Sora'] max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
            <span>Faculty & Instructor Management</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Instructor User Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Approve new educator credentials, assign course tracks, and monitor teaching performance scores.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-blue-primary text-xs py-3 px-5 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 font-bold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add / Approve Instructor</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white/90 border border-sky-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search instructors by name, email, or track..."
              className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {(['All', 'Verified', 'Pending'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-sky-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Instructor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredInstructors.map((inst) => (
            <div
              key={inst.id}
              className="p-5 rounded-2xl bg-slate-50/80 border border-sky-200/80 hover:border-sky-300 transition-all space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {inst.avatar ? (
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-sky-300 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white font-bold text-base flex items-center justify-center shrink-0">
                      {inst.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900">{inst.name}</h3>
                    <p className="text-[11px] text-sky-700 font-semibold">{inst.specialty}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{inst.email}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleStatus(inst.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    inst.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {inst.status}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-sky-100 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-sky-100">
                  <span className="text-[10px] text-slate-500 font-medium block">Courses</span>
                  <span className="font-bold text-slate-900 flex items-center justify-center gap-1">
                    <BookOpen className="w-3 h-3 text-sky-600" />
                    {inst.assignedCourses}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-sky-100">
                  <span className="text-[10px] text-slate-500 font-medium block">Students</span>
                  <span className="font-bold text-slate-900">{inst.studentsCount}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-sky-100">
                  <span className="text-[10px] text-slate-500 font-medium block">Rating</span>
                  <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    {inst.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Instructor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 border border-sky-200 animate-in zoom-in-95 text-slate-900 font-['Sora']">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-600" /> Approve New Instructor
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInstructor} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Instructor Full Name</label>
                <input
                  type="text"
                  required
                  value={newInstructorName}
                  onChange={(e) => setNewInstructorName(e.target.value)}
                  placeholder="Prof. Alan Turing"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newInstructorEmail}
                  onChange={(e) => setNewInstructorEmail(e.target.value)}
                  placeholder="alan@university.edu"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Specialty / Course Track</label>
                <input
                  type="text"
                  required
                  value={newInstructorSpecialty}
                  onChange={(e) => setNewInstructorSpecialty(e.target.value)}
                  placeholder="Linux Systems & Kernel Architecture"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
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
                      <span>Approving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Instructor</span>
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

export default AdminInstructors;
