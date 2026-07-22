import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, ShieldCheck, BarChart3, PlusCircle, GraduationCap, ChevronRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const metrics = [
    { label: 'Total Registered Students', value: '50,240', icon: Users, change: '+12% this month', link: '/admin/students' },
    { label: 'Active Course Tracks', value: '1 Course Active', icon: BookOpen, change: 'Linux & System Admin', link: '/admin/courses' },
    { label: 'Verified Instructors', value: '4 Faculty', icon: GraduationCap, change: '1 Pending Approval', link: '/admin/instructors' },
    { label: 'System Health', value: '99.98%', icon: ShieldCheck, change: 'All AI services online', link: '/admin/dashboard' },
  ];

  return (
    <div className="space-y-8 text-slate-900 font-['Sora'] max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-white/95 backdrop-blur-2xl border border-sky-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
            <span>ADMINISTRATOR CONTROL PANEL</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Welcome back, {userProfile?.name || 'Administrator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage course catalogs, student accounts, instructor approvals, and AI tutor parameters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/courses"
            className="btn-blue-primary text-xs py-2.5 px-4 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Courses</span>
          </Link>
          <Link
            to="/admin/instructors"
            className="bg-white hover:bg-sky-50 text-slate-800 font-bold text-xs border border-sky-200 py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Instructors</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Link
              key={idx}
              to={metric.link}
              className="p-5 rounded-2xl bg-white/90 border border-sky-200/80 backdrop-blur-xl space-y-2 hover:border-sky-400 hover:shadow-md transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{metric.label}</span>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{metric.value}</div>
              <div className="flex items-center justify-between text-[11px] text-sky-700 font-medium">
                <span>{metric.change}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Admin Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Student Registrations */}
        <div className="bg-white/90 border border-sky-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              <span>Recent Registrations</span>
            </h3>
            <Link to="/admin/students" className="text-xs text-sky-600 font-bold hover:underline">
              View All Students →
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Alex Johnson', email: 'alex.j@stanford.edu', time: '5 mins ago', role: 'Student' },
              { name: 'Prof. Alan Turing', email: 'alan@university.edu', time: '12 mins ago', role: 'Instructor' },
              { name: 'David Miller', email: 'd.miller@tech.org', time: '34 mins ago', role: 'Student' },
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-sky-100 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{st.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{st.email}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${st.role === 'Instructor' ? 'bg-sky-100 text-sky-800' : 'bg-slate-200 text-slate-700'}`}>
                    {st.role}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">{st.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI System Health & Parameters */}
        <div className="bg-white/90 border border-sky-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-600" />
              <span>AI Tutor Engine Metrics</span>
            </h3>
            <span className="text-xs bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full font-bold border border-sky-200">
              Operational
            </span>
          </div>

          <div className="space-y-3 text-xs font-medium">
            <div className="p-3 bg-slate-50 border border-sky-100 rounded-2xl flex items-center justify-between">
              <span className="text-slate-600">Model Version</span>
              <span className="font-mono text-sky-700 font-bold">Kaizen Q v3.0 (Shaivika Engine)</span>
            </div>
            <div className="p-3 bg-slate-50 border border-sky-100 rounded-2xl flex items-center justify-between">
              <span className="text-slate-600">Average Response Latency</span>
              <span className="font-mono text-emerald-600 font-bold">142ms</span>
            </div>
            <div className="p-3 bg-slate-50 border border-sky-100 rounded-2xl flex items-center justify-between">
              <span className="text-slate-600">Automated Evaluation Precision</span>
              <span className="font-mono text-sky-700 font-bold">99.8%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
