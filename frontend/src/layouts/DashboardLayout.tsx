import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Award,
  BarChart3,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { AIAssistantWidget } from '@/components/ai/AIAssistantWidget';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<'Student' | 'Instructor' | 'Admin'>('Student');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses Catalog', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Assignments & Quizzes', href: '/dashboard?tab=assignments', icon: FileText },
    { name: 'Schedule & Calendar', href: '/dashboard?tab=calendar', icon: Calendar },
    { name: 'Certificates', href: '/dashboard?tab=certificates', icon: Award },
    { name: 'Analytics & Reports', href: '/dashboard?tab=analytics', icon: BarChart3 },
    { name: 'UI Components Kit', href: '/dashboard?tab=components', icon: Layers },
  ];

  const sampleNotifications = [
    { id: 1, title: 'Quiz Score Released', desc: 'Module 4: React Testing score is 98/100', time: '10m ago', unread: true },
    { id: 2, title: 'Upcoming Deadline', desc: 'GraphQL Architecture Assignment due in 24h', time: '1h ago', unread: true },
    { id: 3, title: 'Certificate Issued', desc: 'Fullstack Systems Engineering Certificate ready', time: '1d ago', unread: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar - Slate 900 */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0F172A] text-slate-300 z-50 flex flex-col justify-between transition-transform duration-300 border-r border-slate-800 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                Edu<span className="text-[#34D399]">Flow</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher */}
          <div className="px-4 py-4 border-b border-slate-800/80">
            <div className="bg-slate-800/80 p-1 rounded-xl flex items-center justify-between text-xs">
              {(['Student', 'Instructor', 'Admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1.5 font-medium rounded-lg transition-all ${
                    role === r
                      ? 'bg-[#059669] text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.href.includes('?') && location.search === item.href.substring(item.href.indexOf('?')));

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-[#059669] text-white font-semibold shadow-md shadow-emerald-900/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <div className="text-xs overflow-hidden">
                <span className="font-semibold text-white block truncate">Jane Devson</span>
                <span className="text-slate-400 block text-[10px]">{role} Account</span>
              </div>
            </div>
            <Link to="/auth/login" className="text-slate-400 hover:text-rose-400 p-1" title="Log out">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#475569] hover:text-[#0F172A] p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-48 sm:w-72 lg:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, assignments, quizzes (Cmd+K)..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-1.5 pl-9 pr-4 text-xs sm:text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-600 hover:text-[#059669] rounded-xl hover:bg-slate-100 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#059669] rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                    <span className="font-heading font-semibold text-xs text-[#111827]">Notifications (3)</span>
                    <button className="text-[11px] text-[#059669] hover:underline font-medium">Mark all read</button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {sampleNotifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-emerald-50/50 text-xs space-y-0.5">
                        <div className="flex items-center justify-between font-semibold text-[#111827]">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#059669]"
                />
                <span className="hidden sm:inline-block font-heading font-semibold text-xs text-[#111827]">
                  Jane Devson
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-[#E2E8F0]">
                    <p className="font-heading font-semibold text-xs text-[#111827]">Jane Devson</p>
                    <p className="text-[11px] text-slate-500">jane.devson@stanford.edu</p>
                  </div>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl">
                    <User className="w-4 h-4 text-slate-400" /> Account Settings
                  </Link>
                  <Link to="/dashboard?tab=certificates" className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl">
                    <Award className="w-4 h-4 text-slate-400" /> My Certificates
                  </Link>
                  <Link to="/auth/login" className="flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Link>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
};
