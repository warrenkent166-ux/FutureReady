import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award, 
  Plus, 
  FileText, 
  Share2, 
  ShieldCheck,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { InnovationProject, ProjectStage } from '../../types';

interface InnovationProjectBuilderProps {
  projects: InnovationProject[];
  onAddProject: (newProj: InnovationProject) => void;
  onToggleMilestone: (projectId: string, milestoneId: string) => void;
}

export const InnovationProjectBuilder: React.FC<InnovationProjectBuilderProps> = ({
  projects,
  onAddProject,
  onToggleMilestone,
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // New project state
  const [newTitle, setNewTitle] = useState('');
  const [newStrand, setNewStrand] = useState('STEM');
  const [newCategory, setNewCategory] = useState<InnovationProject['category']>('Community Engineering');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');

  const stageLabels: Record<ProjectStage, { num: string; label: string }> = {
    '1_problem_identification': { num: '01', label: 'Problem Identification' },
    '2_research': { num: '02', label: 'Background Research' },
    '3_ideation': { num: '03', label: 'Solution Ideation' },
    '4_prototyping': { num: '04', label: 'Prototyping & Assembly' },
    '5_testing': { num: '05', label: 'Testing & Evaluation' },
    '6_showcase': { num: '06', label: 'Showcase & Defense' },
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: InnovationProject = {
      id: `proj_${Date.now()}`,
      title: newTitle,
      strand: newStrand,
      category: newCategory,
      teamLead: 'Maya Santos',
      teamMembers: ['Maya Santos'],
      currentStage: '1_problem_identification',
      progressPercent: 15,
      localCommunityProblem: newProblem,
      solutionSummary: newSolution,
      prototypeDetails: 'Initial concept mapping and material scoping.',
      isPublicInShowcase: false,
      lastUpdated: 'Just now',
      milestones: [
        {
          id: `m_${Date.now()}_1`,
          title: 'Community Stakeholder Interviews & Needs Framing',
          stage: '1_problem_identification',
          dueDate: 'Nov 10, 2026',
          completed: false,
          deliverable: 'Interview transcripts with 5 affected barangay residents.',
        },
        {
          id: `m_${Date.now()}_2`,
          title: 'Review of Published DOST / Science Literature',
          stage: '2_research',
          dueDate: 'Nov 25, 2026',
          completed: false,
          deliverable: 'Synthesis of existing patents and local materials.',
        },
      ],
    };

    onAddProject(newProj);
    setActiveProjectId(newProj.id);
    setShowCreateModal(false);
    setNewTitle('');
    setNewProblem('');
    setNewSolution('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
            <span>Science Investigatory Project (SIP) & Capstone Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Innovation Project Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Apply design thinking to real Philippine community challenges with phased milestones and teacher rubrics.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Investigatory Project</span>
        </button>
      </div>

      {/* Project Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setActiveProjectId(proj.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeProjectId === proj.id
                ? 'bg-white dark:bg-slate-900 border-[#3267D5] text-[#3267D5] dark:text-[#60A5FA] shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/60 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {activeProject && (
        <div className="space-y-8">
          
          {/* Active Project Overview Card */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#168C80]">{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.strand} Strand</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated {activeProject.lastUpdated}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {activeProject.title}
                </h2>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>Team: {activeProject.teamMembers.join(', ')}</span>
                </div>
              </div>

              {/* Rubric Score Box */}
              {activeProject.rubricScore && (
                <div className="p-4 bg-[#F5F7FB] dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-right space-y-1 shrink-0">
                  <span className="text-[11px] text-slate-500">Teacher Rubric Rating</span>
                  <p className="text-2xl font-display font-bold text-[#168C80] tabular-nums">
                    {activeProject.rubricScore.total} / 100
                  </p>
                  <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1.5">
                    <span>Orig: {activeProject.rubricScore.originality}</span>
                    <span>·</span>
                    <span>Local: {activeProject.rubricScore.localRelevance}</span>
                    <span>·</span>
                    <span>Tech: {activeProject.rubricScore.technicalExecution}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Design Thinking 6-Stage Progress Indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Design Thinking Stage: {stageLabels[activeProject.currentStage].label}</span>
                <span className="text-[#3267D5] tabular-nums">{activeProject.progressPercent}% Complete</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {(Object.keys(stageLabels) as ProjectStage[]).map((stgKey, idx) => {
                  const stage = stageLabels[stgKey];
                  const isCurrent = activeProject.currentStage === stgKey;
                  const isPassed = activeProject.progressPercent >= (idx + 1) * 16;

                  return (
                    <div
                      key={stgKey}
                      className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${
                        isCurrent
                          ? 'border-[#3267D5] bg-[#3267D5]/10 text-[#3267D5] font-semibold'
                          : isPassed
                            ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                            : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold block">{stage.num}</span>
                      <span className="text-[11px] leading-tight block line-clamp-1">{stage.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Local Community Challenge:
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeProject.localCommunityProblem}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Prototype Engineering Summary:
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeProject.solutionSummary}
                </p>
              </div>
            </div>

          </div>

          {/* Phased Milestones Checklist */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Project Milestones & Deliverables
              </h3>
              <span className="text-xs text-slate-500">
                {activeProject.milestones.filter((m) => m.completed).length} of {activeProject.milestones.length} Completed
              </span>
            </div>

            <div className="space-y-3">
              {activeProject.milestones.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                    m.completed
                      ? 'border-slate-200 dark:border-slate-800 bg-[#F5F7FB] dark:bg-slate-800/40'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleMilestone(activeProject.id, m.id)}
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                        m.completed
                          ? 'border-[#168C80] bg-[#168C80] text-white'
                          : 'border-slate-300 dark:border-slate-600 hover:border-[#168C80]'
                      }`}
                    >
                      {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${
                          m.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                        }`}>
                          {m.title}
                        </span>
                        {m.teacherVerified && (
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            Verified by Sir Jerome
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Deliverable: {m.deliverable}
                      </p>

                      {m.feedback && (
                        <div className="mt-2 p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-[#3267D5] shrink-0 mt-0.5" />
                          <span><strong>Adviser Note:</strong> {m.feedback}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 shrink-0 font-medium">
                    {m.dueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* New Project Modal Wizard */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
            
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#168C80] uppercase tracking-wider">Design Thinking Initiative</span>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                Launch a New Science Investigatory Project
              </h3>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Project Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rice Husk Ash Composite Concrete Blocks for Typhoon Barriers"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Strand</label>
                  <select
                    value={newStrand}
                    onChange={(e) => setNewStrand(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  >
                    <option>STEM</option>
                    <option>TVL-ICT</option>
                    <option>ABM</option>
                    <option>HUMSS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as InnovationProject['category'])}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  >
                    <option>Community Engineering</option>
                    <option>Agricultural Innovation</option>
                    <option>Digital EdTech</option>
                    <option>Public Health & Disaster</option>
                    <option>Creative Arts</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Specific Philippine Community Problem</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the exact local barangay or environmental challenge you are solving..."
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Proposed Technological / Scientific Solution</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your prototype concept, materials, and test method..."
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm cursor-pointer"
                >
                  Create & Seed Milestones
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
