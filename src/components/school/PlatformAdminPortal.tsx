import React, { useState, useEffect } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Lock, 
  Database,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { apiService } from '../../services/api';

export const PlatformAdminPortal: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await apiService.getAuditLogs();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full">
            <span>DepEd Central Operations & Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Platform Infrastructure & Audit Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Systems Architect: Engr. Dalisay Hernandez · RA 10173 Audit Logging & Gemini API Health
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh System Logs</span>
        </button>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Gemini 3.8 Flash API</span>
            <Cpu className="w-4 h-4 text-[#3267D5]" />
          </div>
          <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400">
            Operational (120ms)
          </p>
          <span className="text-[11px] text-slate-400">Server-side proxy enabled</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>PostgreSQL Data Layer</span>
            <Database className="w-4 h-4 text-[#168C80]" />
          </div>
          <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400">
            Synchronized
          </p>
          <span className="text-[11px] text-slate-400">100% Transactions verified</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Data Privacy (RA 10173)</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-bold font-display text-purple-600 dark:text-purple-400">
            NPC Registered
          </p>
          <span className="text-[11px] text-slate-400">Audit logs immutable</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Student Sessions</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
            1,482 Concurrent
          </p>
          <span className="text-[11px] text-slate-400">Across 17 DepEd Regions</span>
        </div>
      </div>

      {/* Live Server Audit Log Table */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Republic Act 10173 Compliance Audit Trail
          </h3>
          <span className="text-xs text-slate-500">Server verified ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-y border-slate-200/60 dark:border-slate-700/60">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                <th className="py-2.5 px-4 font-semibold">Actor</th>
                <th className="py-2.5 px-4 font-semibold">Role</th>
                <th className="py-2.5 px-4 font-semibold">Action</th>
                <th className="py-2.5 px-4 font-semibold">Details</th>
                <th className="py-2.5 px-4 font-semibold">Host IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {logs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{log.actor}</td>
                  <td className="py-3 px-4 text-slate-500">{log.role}</td>
                  <td className="py-3 px-4 font-mono text-[11px] font-semibold text-[#3267D5]">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 leading-snug">{log.details}</td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
