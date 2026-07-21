import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, ShieldCheck, BarChart3, Bot, PlusCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const metrics = [
    { label: 'Total Students', value: '14,280', icon: Users, change: '+12% this month' },
    { label: 'Active Courses', value: '254', icon: BookOpen, change: '8 pending review' },
    { label: 'AI Tutor Queries', value: '1.2M', icon: Bot, change: '99.9% accuracy' },
    { label: 'System Health', value: '99.98%', icon: ShieldCheck, change: 'All services online' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl shadow-emerald-950/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR CONTROL PANEL</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Welcome back, {userProfile?.name || 'Administrator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage course catalogs, monitor student engagement metrics, and configure AI tutor parameters.
          </p>
        </div>

        <button className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer">
          <PlusCircle className="w-4 h-4" />
          <span>Create New Course Track</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-2 hover:border-emerald-500/30 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">{metric.label}</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-heading font-extrabold text-2xl text-white">{metric.value}</div>
              <span className="text-[11px] text-emerald-400 font-mono block">{metric.change}</span>
            </div>
          );
        })}
      </div>

      {/* Admin Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Student Enrollments */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Recent Registrations</span>
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-semibold">Real-time Sync</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Alex Johnson', email: 'alex.j@stanford.edu', time: '5 mins ago', role: 'Student' },
              { name: 'Samantha Wu', email: 'sam.wu@mit.edu', time: '12 mins ago', role: 'Student' },
              { name: 'David Miller', email: 'd.miller@tech.org', time: '34 mins ago', role: 'Student' },
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div>
                  <span className="font-semibold text-white block">{st.name}</span>
                  <span className="text-[11px] text-slate-400">{st.email}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{st.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI System Health & Parameters */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>AI Engine Metrics</span>
            </h3>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-mono font-semibold">
              Operational
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Model Response Latency</span>
              <span className="font-mono text-emerald-400 font-semibold">142ms</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Automated Homework Grading Engine</span>
              <span className="font-mono text-emerald-400 font-semibold">Active (v4.2.0)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">Vector Database Storage (Pinecone)</span>
              <span className="font-mono text-emerald-400 font-semibold">2.4 GB / 10 GB</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
