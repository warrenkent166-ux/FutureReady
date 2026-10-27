import React, { useState } from 'react';
import { Target, CheckCircle2, Plus, Clock, Trash2, Calendar } from 'lucide-react';
import { GrowthGoal } from '../../types';

interface GrowthGoalsPlannerProps {
  goals: GrowthGoal[];
  onAddGoal: (goal: GrowthGoal) => void;
  onToggleSubtask: (goalId: string, subtaskId: string) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const GrowthGoalsPlanner: React.FC<GrowthGoalsPlannerProps> = ({
  goals,
  onAddGoal,
  onToggleSubtask,
  onDeleteGoal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GrowthGoal['category']>('Academic Readiness');
  const [newTargetDate, setNewTargetDate] = useState('Nov 30, 2026');
  const [newSubtasks, setNewSubtasks] = useState(['', '', '']);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const filteredSubtasks = newSubtasks
      .filter((s) => s.trim())
      .map((text, idx) => ({ id: `st_${Date.now()}_${idx}`, text, done: false }));

    const newGoal: GrowthGoal = {
      id: `goal_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      targetDate: newTargetDate,
      completed: false,
      progress: 0,
      subtasks: filteredSubtasks,
    };

    onAddGoal(newGoal);
    setShowAddModal(false);
    setNewTitle('');
    setNewSubtasks(['', '', '']);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
            <span>SMART Progression Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
            Personal Growth Goals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Structure your preparation for college entrance tests, investigatory research milestones, and extracurricular development.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Target Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const completedCount = goal.subtasks.filter((s) => s.done).length;
          const totalCount = goal.subtasks.length;

          return (
            <div
              key={goal.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#168C80] bg-[#168C80]/10 px-2 py-0.5 rounded">
                    {goal.category}
                  </span>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    aria-label="Delete goal"
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {goal.title}
                </h3>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Subtasks ({completedCount}/{totalCount})</span>
                    <span className="font-bold tabular-nums text-slate-700 dark:text-slate-300">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#3267D5] h-full rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Subtask items */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {goal.subtasks.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => onToggleSubtask(goal.id, st.id)}
                      className="w-full text-left flex items-start gap-2.5 text-xs group cursor-pointer"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          st.done
                            ? 'border-[#168C80] bg-[#168C80] text-white'
                            : 'border-slate-300 dark:border-slate-600 group-hover:border-[#168C80]'
                        }`}
                      >
                        {st.done && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={`leading-snug ${
                        st.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {st.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Target: {goal.targetDate}</span>
                </span>
                {goal.completed && (
                  <span className="text-emerald-600 font-bold">Goal Achieved!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Set a New Growth Goal
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Goal Statement</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Master UPCAT Trigonometry & Geometry Problem Sets"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as GrowthGoal['category'])}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  >
                    <option>Academic Readiness</option>
                    <option>Project Milestone</option>
                    <option>Career Discovery</option>
                    <option>Skill Challenge</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 15, 2026"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Actionable Subtasks</label>
                {newSubtasks.map((task, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Subtask ${i + 1}`}
                    value={task}
                    onChange={(e) => {
                      const updated = [...newSubtasks];
                      updated[i] = e.target.value;
                      setNewSubtasks(updated);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  />
                ))}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm cursor-pointer"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
