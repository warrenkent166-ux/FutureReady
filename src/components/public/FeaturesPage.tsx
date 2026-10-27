import React from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Users2, 
  FileCheck2, 
  Search 
} from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (tab: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const featureList = [
    {
      icon: Compass,
      title: 'Formative Assessment Battery',
      tag: 'Skills & Aptitude',
      desc: 'Transparently scored modules testing logical deduction, spatial reasoning, quantitative problem solving, and reading comprehension modeled after Philippine university entrance tests.',
      actionTab: 'assessments',
      actionLabel: 'Try Assessments',
    },
    {
      icon: Search,
      title: 'CHED Degree & University Explorer',
      tag: 'Tertiary Pathways',
      desc: 'Search 180+ degree programs across UP, PUP, Ateneo, DLSU, UST, and regional state universities with verified tuition brackets, DOST priority status, and admission criteria.',
      actionTab: 'colleges',
      actionLabel: 'Browse Degrees',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Project Lab (SIP Builder)',
      tag: 'Hands-on Learning',
      desc: 'Step-by-step design thinking workflow supporting Science Investigatory Projects (SIP) from problem identification and prototyping to teacher rubric scoring.',
      actionTab: 'innovation',
      actionLabel: 'Explore Projects',
    },
    {
      icon: Award,
      title: 'DepEd Verified Digital Portfolio',
      tag: 'Lifelong Records',
      desc: 'Consolidates project milestones, assessment trajectories, and certified leadership badges into a standardized DepEd Senior High School portfolio export.',
      actionTab: 'portfolio',
      actionLabel: 'View Portfolio',
    },
    {
      icon: Sparkles,
      title: 'Gabay AI Career Mentor',
      tag: 'Ethical Guidance',
      desc: 'An AI mentor powered by Google Gemini specifically prompted with Philippine high school curriculum safeguards to unpack results and suggest questions for counselors.',
      actionTab: 'mentor',
      actionLabel: 'Chat with Gabay AI',
    },
    {
      icon: Users2,
      title: 'Educator & Counselor Portals',
      tag: 'Institutional Suite',
      desc: 'Specialized portals for Teachers to assign activities, Guidance Counselors to track cohort readiness and case notes, and Principals to view division reports.',
      actionTab: 'for-schools',
      actionLabel: 'School Features',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
          <span>Comprehensive Platform Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Tools Engineered for the Complete Philippine Student Journey
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          From early vocational curiosity in Junior High to college entrance preparation and senior high capstones, every module is designed for measurable student development.
        </p>
      </div>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#3267D5]/10 text-[#3267D5] dark:text-[#60A5FA] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{item.tag}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate(item.actionTab)}
                  className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] hover:underline cursor-pointer"
                >
                  {item.actionLabel} →
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
