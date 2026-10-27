import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are the assessments on FutureReady PH definitive intelligence (IQ) tests?',
      a: 'No. Absolutely not. The assessments are formative discovery and skill-practice batteries designed to illuminate your current familiarity with pattern analysis, reading comprehension, and problem solving. They do not measure clinical IQ, fixed genetic potential, or limit what courses you are capable of succeeding in.',
    },
    {
      q: 'How does FutureReady PH verify Philippine college admissions and tuition rates?',
      a: 'All tertiary institution records in our database are cross-referenced with official Commission on Higher Education (CHED) Center of Excellence bulletins, Republic Act 10931 (Universal Access to Quality Tertiary Education Act) schedules, and official university registrar catalogs updated for 2026. Every degree card displays its last verification date and direct link.',
    },
    {
      q: 'What is the DOST-SEI Scholarship priority indicator?',
      a: 'The Department of Science and Technology - Science Education Institute (DOST-SEI) awards undergraduate scholarships to qualified high school graduates entering approved priority science, technology, engineering, and mathematics courses. Programs marked with this badge meet DOST priority criteria.',
    },
    {
      q: 'Can students retake assessments?',
      a: 'Yes! FutureReady PH embraces a growth mindset. After completing a module, students receive transparent item-by-item explanations and targeted study recommendations. You can retake any assessment after reviewing or practicing, and your historical trajectory is documented in your personal growth planner.',
    },
    {
      q: 'How does FutureReady PH protect data for students under 18 years old?',
      a: 'We strictly comply with Republic Act 10173 (Philippine Data Privacy Act of 2012). For minors, account creation incorporates parent/guardian notification and consent workflows. Student reflections, assessment attempts, and projects are private by default and accessible only by authorized school educators.',
    },
    {
      q: 'How can our public school or private academy enroll our students?',
      a: 'Public schools can enroll free of charge under our DepEd division partnership program. We provide bulk onboarding, teacher orientation, and guidance counselor cohort dashboards. Contact our school partnerships coordinator to initiate setup.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>Clarifications & Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Clear answers regarding assessment methodology, Philippine university data, scholarship rules, and data privacy.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-[#3267D5]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
