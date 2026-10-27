import React from 'react';
import { 
  BarChart3, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Lightbulb, 
  Target, 
  ShieldCheck,
  TrendingUp,
  BookmarkCheck,
  FileText
} from 'lucide-react';
import { User, GrowthGoal, InnovationProject } from '../../types';

interface StudentDashboardProps {
  user: User;
  goals: GrowthGoal[];
  projects: InnovationProject[];
  savedCollegesCount: number;
  onNavigate: (tab: string) => void;
  onStartAssessment: (id: string) => void;
  onAskMentor: (prompt: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  goals,
  projects,
  savedCollegesCount,
  onNavigate,
  onStartAssessment,
  onAskMentor,
}) => {
  // Calculated readiness index
  const readinessIndex = 78;
  const completedAssessments = 3;
  const totalAssessments = 5;

  // Radar chart skills data points (6 dimensions)
  const skillsData = [
    { label: 'Analytical', score: 85 },
    { label: 'Quantitative', score: 78 },
    { label: 'Verbal', score: 82 },
    { label: 'Creative', score: 90 },
    { label: 'Technical', score: 80 },
    { label: 'Execution', score: 88 },
  ];

  // Helper for SVG radar polygon
  const center = 100;
  const radius = 70;
  const points = skillsData.map((d, i) => {
    const angle = (Math.PI * 2 / skillsData.length) * i - Math.PI / 2;
    const r = (d.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridCircles = [0.33, 0.66, 1.0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. WELCOME BANNER & STUDENT CONTEXT */}
      <div className="animated-bg-card p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{user.schoolName}</span>
            <span aria-hidden="true">·</span>
            <span>LRN: {user.lrn || '136589200451'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#168C80]">{user.strand} Strand</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Kumusta, {user.name.split(' ')[0]}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            You are actively progressing along your Grade 11 STEM college discovery pathway. Your community flood warning prototype is currently in Phase 4 Prototyping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('mentor')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#2552B5] hover:opacity-95 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Gabay AI</span>
          </button>
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            DepEd Portfolio Sheet
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME PROGRESS ANALYTICS WIDGETS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="animated-bg-card p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Readiness Index</span>
            <TrendingUp className="w-4 h-4 text-[#168C80]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-[#14243A] dark:text-white tabular-nums">
            {readinessIndex}%
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-[#168C80] h-full rounded-full" style={{ width: `${readinessIndex}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">On track for SUC entrance tests</p>
        </div>

        {/* Metric 2 */}
        <div className="animated-bg-card p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Diagnostics Completed</span>
            <Compass className="w-4 h-4 text-[#3267D5]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-[#3267D5] dark:text-[#60A5FA] tabular-nums">
            {completedAssessments} / {totalAssessments}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-[#3267D5] h-full rounded-full" style={{ width: `${(completedAssessments / totalAssessments) * 100}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">Next: Academic Battery</p>
        </div>

        {/* Metric 3 */}
        <div className="animated-bg-card p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Project Milestones</span>
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-amber-500 tabular-nums">
            4 / 6
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '66%' }} />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">Marikina Flood Alert</p>
        </div>

        {/* Metric 4 */}
        <div className="animated-bg-card p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Saved College Programs</span>
            <BookmarkCheck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-display text-purple-600 dark:text-purple-400 tabular-nums">
            {savedCollegesCount || 4}
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '80%' }} />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">3 DOST Priority eligible</p>
        </div>

      </div>

      {/* 3. INTERACTIVE WIDGET ROW: RADAR CHART + WEEKLY MOMENTUM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Widget: Strand Readiness Radar Chart */}
        <div className="lg:col-span-5 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Strand & Competency Balance
            </h3>
            <span className="text-[11px] text-slate-500">Formative Radar</span>
          </div>

          <div className="flex justify-center py-2">
            <svg width="220" height="220" className="overflow-visible">
              {/* Background circular grids */}
              {gridCircles.map((frac, idx) => (
                <circle
                  key={idx}
                  cx={center}
                  cy={center}
                  r={radius * frac}
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Axis rays */}
              {skillsData.map((d, i) => {
                const angle = (Math.PI * 2 / skillsData.length) * i - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                  />
                );
              })}

              {/* Polygon fill */}
              <polygon
                points={points}
                fill="rgba(50, 103, 213, 0.2)"
                stroke="#3267D5"
                strokeWidth="2"
              />

              {/* Data points & labels */}
              {skillsData.map((d, i) => {
                const angle = (Math.PI * 2 / skillsData.length) * i - Math.PI / 2;
                const r = (d.score / 100) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);

                // Label positioning slightly outside radius
                const labelX = center + (radius + 20) * Math.cos(angle);
                const labelY = center + (radius + 20) * Math.sin(angle);

                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="3.5" fill="#3267D5" />
                    <text
                      x={labelX}
                      y={labelY}
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-600 dark:fill-slate-400 font-sans"
                    >
                      {d.label} ({d.score}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed text-center">
            Your strongest balance is in Creative Resourcefulness (90%) and Practical Execution (88%), aligning well with Engineering & Computing.
          </p>
        </div>

        {/* Right Widget: Weekly Study & Discovery Momentum */}
        <div className="lg:col-span-7 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Weekly Practice Momentum
            </h3>
            <span className="text-[11px] font-semibold text-[#168C80]">4.5 hrs this week</span>
          </div>

          {/* Interactive sparkline bar strip */}
          <div className="grid grid-cols-7 gap-2 pt-2 pb-4">
            {[
              { day: 'Mon', mins: 45, label: '45m' },
              { day: 'Tue', mins: 60, label: '1h' },
              { day: 'Wed', mins: 30, label: '30m' },
              { day: 'Thu', mins: 90, label: '1.5h' },
              { day: 'Fri', mins: 50, label: '50m' },
              { day: 'Sat', mins: 75, label: '1h 15m' },
              { day: 'Sun', mins: 20, label: '20m' },
            ].map((d, i) => (
              <div key={d.day} className="flex flex-col items-center gap-1.5">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-28 rounded-xl flex items-end p-1">
                  <div
                    className={`w-full rounded-lg transition-all ${
                      i === 3 || i === 5 ? 'bg-[#3267D5]' : 'bg-[#168C80]/80'
                    }`}
                    style={{ height: `${(d.mins / 90) * 100}%` }}
                    title={`${d.day}: ${d.label}`}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{d.day}</span>
                <span className="text-[10px] text-slate-400 tabular-nums">{d.label}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#F5F7FB] dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3267D5]" />
              <span className="text-slate-700 dark:text-slate-300">Suggested Action for Today:</span>
            </div>
            <button
              onClick={() => onStartAssessment('academic_01')}
              className="text-[#3267D5] dark:text-[#60A5FA] font-semibold hover:underline"
            >
              Complete Academic Battery Module →
            </button>
          </div>
        </div>

      </div>

      {/* 4. ACTIVE INNOVATION PROJECT & GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Investigatory Project */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#168C80] uppercase tracking-wider">Active Science Investigatory Project</p>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {projects[0]?.title || 'Marikina Lowlands Ultrasonic Flash Flood Alert System'}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('innovation')}
              className="text-xs font-semibold text-[#3267D5] hover:underline"
            >
              Project Room →
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {projects[0]?.solutionSummary}
          </p>

          {/* Milestone timeline preview */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Current Milestone:</p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-center justify-between text-xs">
              <span className="text-amber-900 dark:text-amber-200 font-medium">
                Physical Breadboard Assembly & Waterproof Enclosure Fitting
              </span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">Due Oct 28</span>
            </div>
          </div>
        </div>

        {/* Growth Goals Planner Widget */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Target Growth Goals
            </h3>
            <button
              onClick={() => onNavigate('goals')}
              className="text-xs font-semibold text-[#3267D5] hover:underline"
            >
              Manage ({goals.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {goals.slice(0, 3).map((goal) => (
              <div
                key={goal.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                    {goal.title}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0">{goal.targetDate}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3267D5] h-full rounded-full" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. REGION IX & SCHOLARSHIPS STUDENT SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="animated-bg-card p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3267D5]">
              <GraduationCap className="w-4 h-4" />
              <span>Region IX Directory</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Zamboanga Peninsula Colleges
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Browse 12 universities and state colleges across Zamboanga City, ZDN, ZDS, and Sibugay with verified histories and courses.
            </p>
          </div>
          <button
            onClick={() => onNavigate('zamboanga-schools')}
            className="w-full py-2.5 px-3 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Open Regional Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="animated-bg-card p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#168C80]">
              <Sparkles className="w-4 h-4" />
              <span>Financial Aid Portal</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Scholarships & Free Tuition
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Explore DOST-SEI (₱8,000/mo), CHED UniFAST RA 10931, Zamboanga City EAP, and NCIP Indigenous scholarships.
            </p>
          </div>
          <button
            onClick={() => onNavigate('scholarships')}
            className="w-full py-2.5 px-3 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Explore Scholarships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="animated-bg-card p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <Lightbulb className="w-4 h-4" />
              <span>Applied Competencies</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skills, Ideas & Trainings
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Marine telemetry buoys, Subanen smart irrigation, and Chavacano offline voice assistants with practical micro-experiments.
            </p>
          </div>
          <button
            onClick={() => onNavigate('training-ideas')}
            className="w-full py-2.5 px-3 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Launch Training Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
