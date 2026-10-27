import React from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  FileCheck, 
  Download,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
            <span>Institutional Governance Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            School Principal Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Principal IV: Dr. Roberto Reyes · Ramon Magsaysay High School · DepEd Division of Manila
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>DepEd Order No. 42 Compliant</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Total Senior High Learners</span>
          <p className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">342</p>
          <span className="text-[11px] text-slate-400">100% LRN verified</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Assigned Faculty</span>
          <p className="text-2xl font-bold font-display text-[#3267D5] tabular-nums">12 Advisers</p>
          <span className="text-[11px] text-slate-400">All modules active</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">School Readiness Index</span>
          <p className="text-2xl font-bold font-display text-[#168C80] tabular-nums">81.4%</p>
          <span className="text-[11px] text-emerald-600">+4.2% from Quarter 1</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Guardian Consent Rate</span>
          <p className="text-2xl font-bold font-display text-purple-600 tabular-nums">98.2%</p>
          <span className="text-[11px] text-slate-400">RA 10173 minor standard</span>
        </div>
      </div>

      {/* Track & Compliance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Senior High Track Distribution
          </h3>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Academic Track (STEM, ABM, HUMSS, GAS)</span>
                <span className="tabular-nums font-bold">300 learners (87.7%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3267D5] h-full rounded-full" style={{ width: '87.7%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Technical-Vocational Track (TVL-ICT, HE)</span>
                <span className="tabular-nums font-bold">42 learners (12.3%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#168C80] h-full rounded-full" style={{ width: '12.3%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 leading-relaxed">
            All curriculum tracks maintain access to state university admissions guidance and DOST-SEI scholarship orientation modules.
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Division of Manila Semi-Annual Submission
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compile school-wide college readiness aggregates, Science Investigatory Project defenses, and counseling intervention summaries into the official DepEd Division packet.
            </p>
          </div>

          <button
            onClick={() => alert('Official DepEd Division of Manila S.Y. 2026-2027 Institutional Portfolio Report dispatched.')}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Generate Official Division Packet (PDF)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
