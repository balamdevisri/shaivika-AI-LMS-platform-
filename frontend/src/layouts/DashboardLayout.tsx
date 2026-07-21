import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
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
import { BrandLogo } from '@/components/common/BrandLogo';


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
    { id: 1, title: 'AI Quiz Released', desc: 'Module 4: Vector Embeddings score is 98/100', time: '10m ago' },
    { id: 2, title: 'Upcoming Deadline', desc: 'GraphQL Architecture Assignment due in 24h', time: '1h ago' },
    { id: 3, title: 'Certificate Issued', desc: 'Fullstack Systems Engineering Certificate ready', time: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-[#10B981] selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar - Slate 900 (#0F172A) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0F172A] text-[#94A3B8] z-50 flex flex-col justify-between transition-transform duration-300 border-r border-white/10 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header with Uploaded Logo */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
            <BrandLogo size="sm" showSubtitle={true} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#94A3B8] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher */}
          <div className="px-4 py-4 border-b border-white/10">
            <div className="bg-[#020617] p-1 rounded-xl flex items-center justify-between text-xs border border-white/10">
              {(['Student', 'Instructor', 'Admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1.5 font-semibold rounded-lg transition-all ${
                    role === r
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white'
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-[#10B981] text-white font-semibold shadow-lg shadow-emerald-950/50'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#94A3B8]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="bg-[#020617] p-3 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <div className="text-xs overflow-hidden">
                <span className="font-semibold text-white block truncate">Jane Devson</span>
                <span className="text-[#94A3B8] block text-[10px]">{role} Account</span>
              </div>
            </div>
            <Link to="/auth/login" className="text-[#94A3B8] hover:text-rose-400 p-1" title="Log out">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#94A3B8] hover:text-white p-2 rounded-lg hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-48 sm:w-72 lg:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search AI modules, quizzes, assignments..."
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-[#94A3B8] hover:text-[#10B981] rounded-xl hover:bg-white/5 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full ring-2 ring-[#0F172A] animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="font-heading font-semibold text-xs text-white">Notifications (3)</span>
                    <button className="text-[11px] text-[#10B981] hover:underline font-medium">Mark all read</button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {sampleNotifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-[#020617] text-xs space-y-0.5 border border-white/5">
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-[#94A3B8] font-normal">{n.time}</span>
                        </div>
                        <p className="text-[#94A3B8] text-[11px]">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#10B981]"
                />
                <span className="hidden sm:inline-block font-heading font-semibold text-xs text-white">
                  Jane Devson
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] hidden sm:inline-block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="font-heading font-semibold text-xs text-white">Jane Devson</p>
                    <p className="text-[11px] text-[#94A3B8]">jane.devson@stanford.edu</p>
                  </div>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-xs text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-xl">
                    <User className="w-4 h-4 text-[#94A3B8]" /> Account Settings
                  </Link>
                  <Link to="/dashboard?tab=certificates" className="flex items-center gap-2 px-3 py-2 text-xs text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-xl">
                    <Award className="w-4 h-4 text-[#94A3B8]" /> My Certificates
                  </Link>
                  <Link to="/auth/login" className="flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl font-semibold">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Link>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Widget */}
      {/* <AIAssistantWidget /> */}
    </div>
  );
};
