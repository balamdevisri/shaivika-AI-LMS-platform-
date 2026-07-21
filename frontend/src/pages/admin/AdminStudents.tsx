import React from 'react';
import { Search, UserCheck, Mail } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const students = [
    { name: 'Alex Johnson', email: 'alex.johnson@stanford.edu', joined: 'Jan 14, 2026', courses: 4, role: 'student' },
    { name: 'Samantha Wu', email: 'sam.wu@mit.edu', joined: 'Feb 02, 2026', courses: 6, role: 'student' },
    { name: 'David Miller', email: 'd.miller@tech.org', joined: 'Feb 19, 2026', courses: 2, role: 'student' },
    { name: 'Elena Rostova', email: 'elena@berkley.edu', joined: 'Mar 01, 2026', courses: 5, role: 'student' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Student User Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor registered student accounts, course progress, and platform permissions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 font-mono text-xs font-semibold">
          <UserCheck className="w-4 h-4" />
          <span>50,240 Total Registered Students</span>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Enrolled Courses</th>
                <th className="py-3 px-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.map((st, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      {st.name.charAt(0)}
                    </div>
                    <span>{st.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{st.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold">
                      {st.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{st.courses} Courses</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{st.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
