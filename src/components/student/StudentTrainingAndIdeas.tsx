import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Waves, 
  Cpu, 
  TreePine, 
  Globe2, 
  Activity,
  Layers,
  FlaskConical,
  Clock,
  Play
} from 'lucide-react';
import { mockTrainingIdeas, mockAssessments } from '../../data/mockData';
import { StudentTrainingIdea } from '../../types';

interface StudentTrainingAndIdeasProps {
  onStartAssessment: (assessmentId: string) => void;
  onOpenProjectBuilder?: () => void;
}

export const StudentTrainingAndIdeas: React.FC<StudentTrainingAndIdeasProps> = ({
  onStartAssessment,
  onOpenProjectBuilder,
}) => {
  const [selectedIdea, setSelectedIdea] = useState<StudentTrainingIdea>(mockTrainingIdeas[0]);
  const [completedExperiments, setCompletedExperiments] = useState<Record<string, boolean>>({});

  const toggleExperiment = (expId: string) => {
    setCompletedExperiments(prev => ({
      ...prev,
      [expId]: !prev[expId],
    }));
  };

  const regionalAssessments = mockAssessments.filter(a => 
    ['marine_blue_01', 'cet_speed_01', 'multilingual_logic_01'].includes(a.id)
  );

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl shadow-xl border border-white/10 bg-[#14243A] text-white animated-dark-card">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-500/40">
            <Lightbulb className="w-3.5 h-3.5 text-[#168C80]" />
            <span>Student Practical Skills & Innovation Challenges</span>
            <span aria-hidden="true">·</span>
            <span>Region IX Focus</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Applied Skills, Ideas & Community Training
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Bridge academic theory with tangible Philippine community impact. Explore high-impact project ideas tailored for Western Mindanao—from marine telemetry along Santa Cruz reef sanctuaries to Subanen smart irrigation and Chavacano voice computing.
          </p>
        </div>
      </div>

      {/* 1. REGIONAL ASSESSMENT MODULES SPOTLIGHT */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] uppercase tracking-wider">
              Targeted Skill Diagnostic Batteries
            </p>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
              New Zamboanga & Practical Skill Assessments
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            3 High-Yield Diagnostic Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionalAssessments.map((ass) => (
            <div
              key={ass.id}
              className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#168C80] dark:text-[#2DD4BF] font-semibold border border-teal-100 dark:border-teal-900/40">
                    {ass.category === 'marine_blue_economy' ? 'Marine Biology & Coastal' : ass.category === 'cet_drill' ? 'SUC Entrance Test Drill' : 'Multilingual & Cultural'}
                  </span>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{ass.durationMinutes} min</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {ass.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {ass.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => onStartAssessment(ass.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Skill Diagnostic</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTERACTIVE PRACTICAL TRAINING & PROJECT IDEAS SANDBOX */}
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] uppercase tracking-wider">
            Hands-On Investigatory Project Blueprints
          </p>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Community Innovation Challenges & Micro-Experiments
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Select a project challenge to review its real-world context in Zamboanga, step-by-step student micro-experiments, and recommended industry certifications.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {mockTrainingIdeas.map((idea) => {
            const isSelected = selectedIdea.id === idea.id;
            return (
              <button
                key={idea.id}
                onClick={() => setSelectedIdea(idea)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#3267D5] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {idea.category === 'Marine & Blue Economy' && <Waves className="w-3.5 h-3.5" />}
                {idea.category === 'Software & Microcontrollers' && <Cpu className="w-3.5 h-3.5" />}
                {idea.category === 'Indigenous Cultural Heritage' && <Globe2 className="w-3.5 h-3.5" />}
                {idea.category === 'Agri-Biotech & Rubber' && <TreePine className="w-3.5 h-3.5" />}
                {idea.category === 'Public Health & Nutrition' && <Activity className="w-3.5 h-3.5" />}
                <span>{idea.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Idea Deep Dive Card */}
        <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header of Idea */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-[#168C80] dark:text-[#2DD4BF] text-xs font-semibold rounded-full border border-teal-200/50">
                {selectedIdea.category}
              </span>
              <span className="text-xs text-slate-500">
                Strand Alignment: <strong className="text-slate-800 dark:text-slate-200">{selectedIdea.targetStrand}</strong>
              </span>
              <span className="text-xs text-slate-400">· Suggested Duration: {selectedIdea.durationWeeks} Weeks</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {selectedIdea.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedIdea.description}
            </p>
          </div>

          {/* Local Zamboanga Context Callout */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/80 to-teal-50/60 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-blue-100 dark:border-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3267D5] dark:text-[#60A5FA]">
              <Sparkles className="w-4 h-4" />
              <span>Zamboanga Peninsula Real-World Application:</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedIdea.zamboangaLocalContext}
            </p>
          </div>

          {/* Practical Micro-Experiments Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#168C80]" />
                <span>Hands-on Student Micro-Experiments Checklist</span>
              </h4>
              <span className="text-xs text-slate-500">
                Check off steps as you prototype
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedIdea.practicalMicroExperiments.map((exp, idx) => {
                const key = `${selectedIdea.id}_${idx}`;
                const isChecked = !!completedExperiments[key];

                return (
                  <button
                    key={idx}
                    onClick={() => toggleExperiment(key)}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#3267D5]'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isChecked ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className={isChecked ? 'line-through opacity-80' : ''}>{exp}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended Industry Certifications */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Aligned Industry Certifications & Credentials</span>
            </h4>

            <div className="flex flex-wrap gap-2 text-xs">
              {selectedIdea.recommendedCertifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/40 font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          {onOpenProjectBuilder && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Ready to turn this into a formal Science Investigatory Project (SIP)?
              </p>
              <button
                onClick={onOpenProjectBuilder}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#2552B5] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch in Project Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
