import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, BookOpen, GraduationCap, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>Our Vision for Philippine Education</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Empowering Every Filipino Learner to Explore Without Limits
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          FutureReady PH was founded on a simple, uncompromising conviction: no student should have their life trajectory reduced to an arbitrary percentile or a single unvalidated quiz.
        </p>
      </div>

      {/* Core Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3267D5]/10 text-[#3267D5] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Discovery Over Dictation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We provide structured tools for students to map their natural curiosities and logical skills. We never prescribe that one degree is the "only" path for a learner.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#168C80]/10 text-[#168C80] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Ethical Psychometrics</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All assessments are explicitly versioned, transparently scored, and presented as formative practice batteries. We do not claim to measure fixed clinical intelligence.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Philippine Grounding</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Curated around Philippine higher education realities: CHED Centers of Excellence, DepEd K-12 strand nuances, Free SUC tuition under RA 10931, and DOST-SEI scholarships.
          </p>
        </div>

      </div>

      {/* The Non-Deterministic Pledge */}
      <div className="p-8 bg-gradient-to-br from-[#14243A] to-[#1E3A5F] text-white rounded-3xl space-y-4 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold font-display">The FutureReady PH Educational Pledge</h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <p>
            1. <strong>We will never label a student as incapable of growth.</strong> Neurological and cognitive research confirms that problem-solving and mathematical agility develop through sustained deliberate practice.
          </p>
          <p>
            2. <strong>We will always encourage consultation with licensed guidance professionals.</strong> Software can summarize trends and surface official college criteria, but the holistic wisdom of registered guidance counselors (RGCs) remains irreplaceable.
          </p>
          <p>
            3. <strong>We strictly protect minor student data.</strong> In compliance with the Philippine Data Privacy Act of 2012 (RA 10173), student work, scores, and reflections are private by default and will never be commercialized.
          </p>
        </div>
      </div>

    </div>
  );
};
