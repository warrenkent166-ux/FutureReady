import React from 'react';
import { Compass, BookOpen, Lightbulb, GraduationCap, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Vocational Curiosity & Self-Reflection',
      desc: 'Students take our 10-minute RIASEC-grounded talent discovery assessment. Rather than generating a single rigid verdict, it outputs your top 3 interest themes (e.g. Investigative-Realistic-Social) aligned with Philippine industries.',
      badge: 'Talents & Preferences',
    },
    {
      num: '02',
      title: 'Formative Diagnostic & Skill Assessment',
      desc: 'Engage with versioned question batteries evaluating non-verbal pattern recognition, algebraic modeling, and scientific text comprehension modeled after UPCAT, PUPCET, and DCAT exam formats.',
      badge: 'Skills in Action',
    },
    {
      num: '03',
      title: 'Hands-on Innovation Projects (SIP)',
      desc: 'Put your emerging knowledge to work through our Design Thinking project workflow. Frame a community problem in your barangay, formulate research hypotheses, build prototypes, and receive verified teacher rubric feedback.',
      badge: 'Tangible Execution',
    },
    {
      num: '04',
      title: 'Collegiate Degree Mapping & Guidance Consultation',
      desc: 'Cross-reference your demonstrated strengths with 180+ verified CHED degree programs, check DOST-SEI priority eligibility, and generate targeted discussion questions to review with your school guidance counselor.',
      badge: 'Confident Transition',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>Methodology & Pedagogy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          How FutureReady PH Works
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Rooted in cognitive science, growth mindset pedagogy, and Philippine DepEd K-12 curriculum frameworks. Here is how we turn self-discovery into purposeful college readiness.
        </p>
      </div>

      {/* Phased Steps */}
      <div className="space-y-8">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3267D5]/10 text-[#3267D5] dark:text-[#60A5FA] font-display font-extrabold text-2xl flex items-center justify-center shrink-0">
              {step.num}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#168C80] dark:text-[#2DD4BF] uppercase tracking-wider">
                  {step.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#F5F7FB] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready to begin your discovery?</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Take your first step today with our free 10-minute talents and interests discovery module.
        </p>
        <button
          onClick={() => onNavigate('assessments')}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          Launch Assessment Battery
        </button>
      </div>

    </div>
  );
};
