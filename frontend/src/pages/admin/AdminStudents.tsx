import React, { useState } from 'react';
import { Search, UserCheck, Mail, Plus, CheckCircle2, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for Adding Student
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');

  const [students, setStudents] = useState([
    { name: 'Alex Johnson', email: 'alex.johnson@stanford.edu', joined: 'Jan 14, 2026', courses: 4, role: 'student', status: 'Active' },
    { name: 'Samantha Wu', email: 'sam.wu@mit.edu', joined: 'Feb 02, 2026', courses: 6, role: 'student', status: 'Active' },
    { name: 'David Miller', email: 'd.miller@tech.org', joined: 'Feb 19, 2026', courses: 2, role: 'student', status: 'Active' },
    { name: 'Elena Rostova', email: 'elena@berkeley.edu', joined: 'Mar 01, 2026', courses: 5, role: 'student', status: 'Active' },
  ]);

  const filteredStudents = students.filter(
    (st) =>
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) {
      toast.error('Please enter student name and email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = {
        name: newStudentName,
        email: newStudentEmail,
        joined: 'Just now',
        courses: 1,
        role: 'student',
        status: 'Active',
      };
      setStudents([created, ...students]);
      setIsSubmitting(false);
      setModalOpen(false);
      setNewStudentName('');
      setNewStudentEmail('');
      toast.success(`Student account created for ${newStudentName}!`);
    }, 500);
  };

  return (
    <div className="space-y-8 text-slate-900 font-['Sora'] max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5 text-sky-500" />
            <span>Student Account Management</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Student User Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Monitor registered student accounts, course progress, and platform permissions.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-blue-primary text-xs py-3 px-5 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 font-bold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/90 border border-sky-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name or email address..."
            className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
          />
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sky-100 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Enrolled Courses</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {filteredStudents.map((st, i) => (
                <tr key={i} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-xs border border-sky-200">
                      {st.name.charAt(0)}
                    </div>
                    <span>{st.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                      <span>{st.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-mono font-bold uppercase border border-sky-200">
                      {st.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-bold font-mono">{st.courses} Track(s)</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium text-[11px]">{st.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 border border-sky-200 animate-in zoom-in-95 text-slate-900 font-['Sora']">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-sky-600" /> Register New Student Account
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Jane Devson"
                  className="w-full bg-slate-50 border border-sky-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="jane@university.edu"
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
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Create Student Account</span>
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

export default AdminStudents;
