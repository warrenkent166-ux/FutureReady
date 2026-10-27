import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  Calendar, 
  FileText, 
  Download, 
  Plus, 
  Search, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockCohortStudents } from '../../data/mockData';

export const CounselorPortal: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(mockCohortStudents[0]?.id || '');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [caseNote, setCaseNote] = useState('');
  const [notesHistory, setNotesHistory] = useState([
    {
      id: 'cn_1',
      studentName: 'Maya Santos',
      date: 'Oct 24, 2026',
      text: 'Student demonstrates high aptitude in spatial reasoning and community engineering. Recommended investigating UP Diliman BS Computer Science and DLSU Industrial Engineering. Inquired regarding DOST-SEI scholarship deadlines.',
    },
    {
      id: 'cn_2',
      studentName: 'Gabriel Alcantara',
      date: 'Oct 19, 2026',
      text: 'Followed up regarding hesitancy between HUMSS and ABM. Suggested completing the RIASEC interest questionnaire and shadowing the school debater team.',
    },
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNote.trim()) return;

    const student = mockCohortStudents.find((s) => s.id === selectedStudentId);
    setNotesHistory((prev) => [
      {
        id: `cn_${Date.now()}`,
        studentName: student?.name || 'Student',
        date: 'Today',
        text: caseNote,
      },
      ...prev,
    ]);
    setCaseNote('');
    setShowNoteModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
            <span>PRC Registered Guidance Counselor Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Guidance Counselor Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Counselor: Ma'am Elena Cruz, RGC (PRC Lic #04821) · Ramon Magsaysay High School
          </p>
        </div>

        <button
          onClick={() => setShowNoteModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#168C80] hover:bg-[#127268] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Confidential Consultation Note</span>
        </button>
      </div>

      {/* Cohort Distribution Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cohort Strand Distribution</span>
          <div className="space-y-2 pt-2">
            {[
              { label: 'STEM', count: 140, pct: 41, color: 'bg-[#3267D5]' },
              { label: 'ABM', count: 95, pct: 28, color: 'bg-[#168C80]' },
              { label: 'HUMSS', count: 65, pct: 19, color: 'bg-purple-500' },
              { label: 'TVL-ICT', count: 42, pct: 12, color: 'bg-amber-500' },
            ].map((strand) => (
              <div key={strand.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{strand.label}</span>
                  <span className="text-slate-500 tabular-nums">{strand.count} learners ({strand.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className={`${strand.color} h-full rounded-full`} style={{ width: `${strand.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consultation Triage</span>
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs">
              <span className="text-emerald-900 dark:text-emerald-200 font-medium">On-Track & Clear Pathways</span>
              <span className="font-bold tabular-nums text-emerald-700">76%</span>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs">
              <span className="text-amber-900 dark:text-amber-200 font-medium">Undecided / Cross-Strand Transition</span>
              <span className="font-bold tabular-nums text-amber-700">18%</span>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/50 flex items-center justify-between text-xs">
              <span className="text-rose-900 dark:text-rose-200 font-medium">Flagged for Priority Consultation</span>
              <span className="font-bold tabular-nums text-rose-700">6%</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">DepEd Implementation Reports</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Generate standardized Homeroom Guidance Career Portfolio compliance summaries for the Division of City Schools Manila.
            </p>
          </div>

          <button
            onClick={() => alert('DepEd Career Guidance Cohort Implementation Report for S.Y. 2026-2027 generated.')}
            className="w-full py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DepEd Division Report</span>
          </button>
        </div>

      </div>

      {/* Confidential Case Consultation Notes */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#168C80]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Confidential Career Guidance Consultation Notes
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Protected under PRC RGC Ethics Code</span>
        </div>

        <div className="space-y-3">
          {notesHistory.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="text-slate-900 dark:text-white">{note.studentName}</span>
                <span className="text-slate-400 text-[11px]">{note.date}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Record Confidential Guidance Note
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                >
                  {mockCohortStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.strand} - LRN {s.lrn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Consultation Observations & Recommendations</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Record student concerns, parental aspirations, and counseling recommendations..."
                  value={caseNote}
                  onChange={(e) => setCaseNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#168C80] hover:bg-[#127268] rounded-xl"
                >
                  Save Note to Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
