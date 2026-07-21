import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, ShieldCheck, Calendar, Clock, Award, CheckCircle2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, userProfile } = useAuth();

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      
      {/* Profile Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-3xl flex items-center justify-center shadow-xl shadow-emerald-950/50 shrink-0">
          {userProfile?.name?.charAt(0).toUpperCase() || 'S'}
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {userProfile?.name || 'Student Profile'}
            </h1>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
              {userProfile?.role?.toUpperCase() || 'STUDENT'}
            </span>
          </div>

          <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>{user?.email || 'student@shaivika.ai'}</span>
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Joined: {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Today'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Last Login: {userProfile?.lastLogin ? new Date(userProfile.lastLogin).toLocaleTimeString() : 'Just now'}
            </span>
          </div>
        </div>
      </div>

      {/* Student Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Account Info */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-lg">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <span>Account Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-400">Firebase User ID</span>
              <span className="font-mono text-emerald-400 truncate max-w-[200px]">{user?.uid || 'N/A'}</span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-400">Email Status</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user?.emailVerified || userProfile?.isVerified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-400">System Role</span>
              <span className="font-mono text-emerald-400 font-semibold">{userProfile?.role || 'student'}</span>
            </div>
          </div>
        </div>

        {/* Certifications & Badges */}
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-lg">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Earned Achievements</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block">Linux System Administration</span>
                <span className="text-[11px] text-slate-400">Issued Jan 2026 • Verified Certificate</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block">Git & GitHub Enterprise Version Control</span>
                <span className="text-[11px] text-slate-400">Issued Feb 2026 • Verified Certificate</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Profile;
