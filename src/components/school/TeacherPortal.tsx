import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  Plus, 
  Search, 
  Filter,
  FileCheck2
} from 'lucide-react';
import { mockCohortStudents, mockProjects } from '../../data/mockData';
import { StudentCohortRecord } from '../../types';

export const TeacherPortal: React.FC = () => {
  const [students, setStudents] = useState<StudentCohortRecord[]>(mockCohortStudents);
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState('Grade 11 - Newton (STEM)');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignedNotice, setAssignedNotice] = useState<string | null>(null);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.lrn.includes(search)
  );

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentTitle.trim()) return;

    setAssignedNotice(`Activity "${assignmentTitle}" assigned to all 38 learners in ${selectedSection}.`);
    setShowAssignModal(false);
    setAssignmentTitle('');
    setTimeout(() => setAssignedNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
            <span>Faculty & Research Coordinator Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Teacher Classroom Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Coordinator: Sir Jerome Ramos · Ramon Magsaysay High School · Senior High STEM
          </p>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Activity to Section</span>
        </button>
      </div>

      {assignedNotice && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{assignedNotice}</span>
        </div>
      )}

      {/* Cohort Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Enrolled Students</span>
          <p className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">38</p>
          <span className="text-[11px] text-slate-400">Section Grade 11-Newton</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Avg Diagnostic Completion</span>
          <p className="text-2xl font-bold font-display text-[#168C80] tabular-nums">84%</p>
          <span className="text-[11px] text-slate-400">3.2 modules/student</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Active SIP Projects</span>
          <p className="text-2xl font-bold font-display text-[#3267D5] tabular-nums">8 Teams</p>
          <span className="text-[11px] text-slate-400">Phase 4 Prototyping</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-xs text-slate-500">Pending Rubric Reviews</span>
          <p className="text-2xl font-bold font-display text-amber-500 tabular-nums">2</p>
          <span className="text-[11px] text-slate-400">Due Friday</span>
        </div>
      </div>

      {/* Class Roster Table */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Grade 11-Newton Roster & Readiness
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search learner or LRN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 border-y border-slate-200/60 dark:border-slate-700/60">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Learner Name</th>
                <th className="py-2.5 px-4 font-semibold">LRN</th>
                <th className="py-2.5 px-4 font-semibold">Track/Strand</th>
                <th className="py-2.5 px-4 font-semibold">Readiness Score</th>
                <th className="py-2.5 px-4 font-semibold">Diagnostics Done</th>
                <th className="py-2.5 px-4 font-semibold">SIP Team</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{s.lrn}</td>
                  <td className="py-3 px-4">{s.strand}</td>
                  <td className="py-3 px-4 tabular-nums font-semibold text-[#168C80]">{s.readinessScore}%</td>
                  <td className="py-3 px-4 tabular-nums">{s.assessmentsCompleted} / 5</td>
                  <td className="py-3 px-4 text-slate-500">{s.activeProjects > 0 ? 'Team Flood Alert' : 'Unassigned'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.counselorFlag === 'High Potential'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                        : s.counselorFlag === 'Needs Consultation'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    }`}>
                      {s.counselorFlag || 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Assign Learning Activity
            </h3>
            <form onSubmit={handleAssign} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Activity Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Complete Academic Battery Module 2 by Friday"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                >
                  <option>Grade 11 - Newton (STEM)</option>
                  <option>Grade 11 - Curie (STEM)</option>
                  <option>Grade 12 - Einstein (STEM)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl"
                >
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
