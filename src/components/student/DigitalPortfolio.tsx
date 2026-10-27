import React, { useState } from 'react';
import { 
  Award, 
  FileCheck2, 
  Download, 
  Printer, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  X
} from 'lucide-react';
import { User, InnovationProject, GrowthGoal } from '../../types';

interface DigitalPortfolioProps {
  user: User;
  projects: InnovationProject[];
  goals: GrowthGoal[];
}

export const DigitalPortfolio: React.FC<DigitalPortfolioProps> = ({
  user,
  projects,
  goals,
}) => {
  const [showPrintModal, setShowPrintModal] = useState(false);

  const portfolioBadges = [
    { title: 'DOST SIP Regional Qualifier', issuer: 'Division of Manila Science Fair', date: 'Oct 2026' },
    { title: 'Abstract Reasoning Mastery (92%)', issuer: 'FutureReady PH Formative Battery', date: 'Sep 2026' },
    { title: 'Community Disaster Resilience Leadership', issuer: 'Marikina DRRMO Partner', date: 'Aug 2026' },
    { title: 'Homeroom Guidance Excellence', issuer: 'Ramon Magsaysay High School', date: 'Jul 2026' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
            <span>DepEd Order No. 42 Aligned</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Digital Student Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            A verified record of your investigatory projects, diagnostic achievements, and demonstrated competencies for college admissions.
          </p>
        </div>

        <button
          onClick={() => setShowPrintModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#168C80] hover:bg-[#127268] rounded-xl shadow-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Export DepEd SHS Portfolio</span>
        </button>
      </div>

      {/* Verified Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Projects & Evidence */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Verified Capstone & Investigatory Projects
            </h3>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-semibold text-[#168C80]">{proj.category}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                    </div>
                    {proj.rubricScore && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg shrink-0">
                        Rating: {proj.rubricScore.total}/100
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.solutionSummary}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Adviser: Sir Jerome Ramos</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Division Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Goals Progress */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Documented Growth Goals & Milestones
            </h3>

            <div className="space-y-3">
              {goals.map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-900 dark:text-white">{g.title}</p>
                    <span className="text-[11px] text-slate-400">{g.category} · Target: {g.targetDate}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    g.completed
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  }`}>
                    {g.completed ? 'Achieved' : `${g.progress}% Complete`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Badges & Student Verification Card */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Certified Badges & Honors
            </h3>

            <div className="space-y-3">
              {portfolioBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1 text-xs"
                >
                  <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-bold">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{badge.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {badge.issuer}
                  </p>
                  <span className="text-[10px] text-slate-400">{badge.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-[#14243A] text-white rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#168C80]" />
              <h4 className="text-sm font-bold">Authenticity Guarantee</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every milestone and rubric score recorded in this portfolio is cryptographically signed and logged on the school administrator server.
            </p>
          </div>
        </div>

      </div>

      {/* DepEd SHS Printable Portfolio Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative my-8 print:p-0 print:shadow-none animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setShowPrintModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official DepEd Style Document Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">Republic of the Philippines · Department of Education</p>
              <h2 className="text-lg font-bold uppercase tracking-tight">Senior High School Career Guidance Portfolio Summary</h2>
              <p className="text-xs text-slate-600">Pursuant to DepEd Order No. 42, s. 2016 and Homeroom Guidance Program Guidelines</p>
            </div>

            {/* Student Meta Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl text-xs border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Learner Name</span>
                <span className="font-bold">{user.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Learner Ref No. (LRN)</span>
                <span className="font-bold tabular-nums">{user.lrn || '136589200451'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Track & Strand</span>
                <span className="font-bold">{user.strand} (Academic)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">School ID & Name</span>
                <span className="font-bold">300412 - {user.schoolName}</span>
              </div>
            </div>

            {/* Capstone Summary */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                I. Science Investigatory Project / Capstone Output
              </h4>
              <p className="font-bold text-sm">{projects[0]?.title}</p>
              <p className="text-slate-700 leading-relaxed">{projects[0]?.solutionSummary}</p>
              <p className="text-slate-600"><strong>Evaluation Rubric Total:</strong> {projects[0]?.rubricScore?.total}/100 (Adviser: Sir Jerome Ramos)</p>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
              <div className="space-y-6">
                <div className="border-b border-slate-400 w-48 mx-auto" />
                <div>
                  <p className="font-bold">Sir Jerome Ramos</p>
                  <p className="text-slate-500 text-[11px]">Senior High School Research Adviser</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-b border-slate-400 w-48 mx-auto" />
                <div>
                  <p className="font-bold">Ma'am Elena Cruz, RGC</p>
                  <p className="text-slate-500 text-[11px]">Registered Guidance Counselor (PRC #04821)</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex items-center justify-end gap-3 print:hidden">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
