import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, CheckCircle2, WifiOff } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function BackendConnectionStatus() {
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL + '/', {
        headers: { Accept: 'application/json' },
        timeout: 10000,
      });
      setStatusMessage(response.data?.message || 'Backend Connected Successfully');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to connect to backend server');
      setStatusMessage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-emerald-950/30 text-white space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-bold text-lg tracking-tight text-white">
            AI Learning Platform
          </h3>
        </div>

        <button
          onClick={checkConnection}
          disabled={loading}
          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
          title="Refresh connection"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>

      <div className="pt-1">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-400 py-1">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Connecting to Express backend...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-sm text-rose-400 py-1 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
            <WifiOff className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-sm text-emerald-400 font-semibold py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
