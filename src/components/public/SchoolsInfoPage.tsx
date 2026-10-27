import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowRight,
  School
} from 'lucide-react';

interface SchoolsInfoPageProps {
  onContactSales: () => void;
  onOpenWorkspace: () => void;
}

export const SchoolsInfoPage: React.FC<SchoolsInfoPageProps> = ({
  onContactSales,
  onOpenWorkspace,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
          <span>DepEd Schools & Private Academies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Empower Your Guidance Counselors & Senior High Faculty
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          FutureReady PH equips Philippine Junior and Senior High Schools with a unified platform for career guidance (Homeroom Guidance DepEd Order No. 29), science investigatory project tracking, and college admissions preparation.
        </p>
      </div>

      {/* Role Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3267D5]/10 text-[#3267D5] flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">For Teachers</h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Assign formative diagnostics & track class completion live</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Review Science Investigatory Project (SIP) design thinking milestones</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Submit verified rubric ratings directly to student portfolios</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#168C80]/10 text-[#168C80] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">For Guidance Counselors</h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Cohort strand readiness analytics & interest distribution curves</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Confidential case consultation logs protected under PRC RGC ethics</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>One-click export of DepEd Career Guidance Implementation Reports</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <School className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">For School Principals</h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Division of Manila / regional compliance dashboards</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Manage educator accounts, Section LRN rosters & permissions</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168C80] shrink-0 mt-0.5" />
              <span>Audit logging & Republic Act 10173 data governance controls</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Division Partnership Banner */}
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Request a Pilot for Your School or Division
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We work directly with DepEd Division Offices and private school associations to onboard entire high school batches seamlessly with automated LRN validation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onContactSales}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Contact School Partnership Team
            </button>
            <button
              onClick={onOpenWorkspace}
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Preview School Portal
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
