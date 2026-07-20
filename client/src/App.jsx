import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="text-center space-y-4 max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl mx-auto flex items-center justify-center font-bold text-xl">
          AI
        </div>
        <h1 className="text-2xl font-bold font-heading">AI Learning Platform</h1>
        <p className="text-slate-400 text-sm">
          Full-Stack LMS Project setup with React, Vite, Tailwind CSS, Express, and Firebase.
        </p>
        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
          Clean Architecture Ready
        </span>
      </div>
    </div>
  );
}
