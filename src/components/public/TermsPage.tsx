import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>User Agreement & Educational Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Terms of Use & Fair Scoring Notice
        </h1>
        <p className="text-xs text-slate-500">
          Effective Date: January 1, 2026 · FutureReady PH Platform Governance
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Formative Educational Purpose</h2>
          <p>
            FutureReady PH is an educational discovery instrument. It does not provide medical diagnoses, psychological evaluations, or definitive intelligence quotient (IQ) determinations. Recommendations provided by our engines and Gabay AI are suggestions intended to inspire personal exploration and consultation with licensed school guidance counselors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Accuracy of University & Scholarship Data</h2>
          <p>
            Information concerning tertiary degree offerings, tuition fee schedules, and DOST-SEI scholarship priorities is sourced from published CHED, DepEd, and university bulletins. While FutureReady PH performs periodic verification, individual university admission requirements and tuition policies remain under the sole discretion of the respective educational institutions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Intellectual Property of Student Projects</h2>
          <p>
            Students retain 100% intellectual property ownership of all original Science Investigatory Projects (SIP), invention concepts, source code, and design prototypes documented on the platform. FutureReady PH claims no commercial or patent rights over student innovations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Appropriate Use of AI Guidance</h2>
          <p>
            The Gabay AI Guidance Mentor is engineered with strict safety guardrails for high school minors. Students agree to interact constructively and respectfully. Any attempt to exploit, bypass safety parameters, or harvest unauthorized records will result in immediate suspension of account privileges.
          </p>
        </section>

      </div>

    </div>
  );
};
