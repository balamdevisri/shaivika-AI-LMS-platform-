import React, { useEffect, useState } from 'react';
import { fetchBackendStatus } from '@/services/api/backendStatus';
import { CheckCircle2, AlertCircle, RefreshCw, Radio, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export const BackendStatus: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const data = await fetchBackendStatus();
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));
      setMessage(data.message);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.error('Failed to connect to Express backend:', err);
      setError(err.message || 'Could not connect to Express backend');
      setMessage(null);
      toast.error('Backend Connection Failed', {
        description: 'Unable to reach Express server. Ensure backend is running.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-6 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-emerald-950/20 text-white transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        {/* Main Display Title Required: AI Learning Platform */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] shadow-inner">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              AI Learning Platform
            </h2>
            <p className="text-xs text-[#94A3B8] font-medium flex items-center gap-1.5 mt-0.5">
              <Radio className="w-3 h-3 text-[#10B981]" />
              Express Backend Service
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={checkConnection}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all disabled:opacity-50"
          title="Re-check backend API endpoint"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#10B981]' : ''}`} />
          <span>{loading ? 'Connecting...' : 'Ping Backend'}</span>
        </button>
      </div>

      {/* Main Status Display Area */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center p-6 rounded-xl bg-white/[0.02] border border-white/5 gap-3">
            <div className="w-5 h-5 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-[#94A3B8]">Testing Express Backend GET / endpoint via Axios...</span>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-rose-300">Connection Error</p>
              <p className="text-xs text-rose-200/80 mt-1">{error}</p>
              <p className="text-[11px] text-[#94A3B8] mt-2 font-mono">Target: {apiUrl}</p>
            </div>
          </div>
        ) : (
          /* Response Display Required: Backend Connected Successfully */
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#10B981] uppercase tracking-wider block">API Response</span>
                <span className="text-base font-bold text-white tracking-wide">
                  {message || 'Backend Connected Successfully'}
                </span>
              </div>
            </div>

            {latency !== null && (
              <div className="text-right hidden sm:block">
                <span className="text-[11px] text-[#94A3B8] block font-mono">Latency</span>
                <span className="text-xs font-semibold text-[#10B981] font-mono">{latency} ms</span>
              </div>
            )}
          </div>
        )}

        {/* Metadata Footer */}
        <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 px-1 font-mono">
          <span>URL: {apiUrl}/</span>
          {lastChecked && <span>Checked: {lastChecked}</span>}
        </div>
      </div>
    </div>
  );
};
export default BackendStatus;
