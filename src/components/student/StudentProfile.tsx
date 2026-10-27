import React, { useState } from 'react';
import { 
  UserCircle2, 
  ShieldCheck, 
  Download, 
  Trash2, 
  CheckCircle2, 
  School, 
  Mail, 
  BookOpen, 
  AlertTriangle 
} from 'lucide-react';
import { User } from '../../types';
import { apiService } from '../../services/api';

interface StudentProfileProps {
  user: User;
  onUpdateBio?: (bio: string) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  user,
  onUpdateBio,
}) => {
  const [bio, setBio] = useState(user.bio || '');
  const [isSaved, setIsSaved] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateBio) onUpdateBio(bio);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportData = async () => {
    const res = await apiService.exportData(user.id);
    setExportNotice(res.message);
  };

  const handleDeleteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiService.requestDataDeletion(user.id, deleteReason);
    setDeleteNotice(`${res.message} Ticket: ${res.ticketNumber}`);
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full">
          <span>Official Learner Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
          Student Profile & Privacy Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Manage your academic context, DepEd strand details, and Philippine Data Privacy Act rights.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3267D5] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-sm">
            {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{user.email}</span>
              <span aria-hidden="true">·</span>
              <span>LRN: {user.lrn || '136589200451'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#168C80]">{user.gradeLevel || 'Grade 11'} {user.strand}</span>
            </div>
          </div>
        </div>

        {/* DepEd Context Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
            <span className="text-slate-400">School Enrollment</span>
            <p className="font-semibold text-slate-900 dark:text-white">{user.schoolName}</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
            <span className="text-slate-400">DepEd School ID</span>
            <p className="font-semibold text-slate-900 dark:text-white">{user.schoolId || '300412'}</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
            <span className="text-slate-400">Guardian Consent</span>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified (Tess Santos)</span>
            </p>
          </div>
        </div>

        {/* Personal Statement / Bio Form */}
        <form onSubmit={handleSaveBio} className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Personal Statement & Collegiate Aspiration:
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
          />
          <div className="flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-semibold text-emerald-600">Statement saved!</span>
            ) : <span />}
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Update Statement
            </button>
          </div>
        </form>

      </div>

      {/* Philippine Data Privacy Act (RA 10173) Governance Panel */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#168C80]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Data Privacy & Rights Governance (RA 10173)
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              You maintain total authority over your assessment answers, portfolio files, and personal data.
            </p>
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
        )}

        {deleteNotice && (
          <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{deleteNotice}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Download Personal Data Package
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Compile your complete diagnostic history, raw answers, and project notes into a certified JSON bundle.
            </p>
            <button
              onClick={handleExportData}
              className="mt-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export RA 10173 Package</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 text-rose-600 dark:text-rose-400">
              Request Record Erasure
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Exercise your Right to Erasure. As a high school minor, verified guardian confirmation is dispatched.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-2 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Submit Erasure Request</span>
            </button>
          </div>

        </div>

      </div>

      {/* Erasure Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Data Erasure Request (RA 10173)
            </h3>
            <p className="text-xs text-slate-500">
              Please specify the reason for this deletion request. This will be transmitted to the FutureReady PH Data Protection Officer and school administration.
            </p>
            <form onSubmit={handleDeleteRequest} className="space-y-3">
              <textarea
                required
                rows={3}
                placeholder="Reason (e.g. transfer to another school, account clean up)..."
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
