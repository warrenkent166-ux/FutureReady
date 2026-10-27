import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  UserCircle2, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { User } from '../../types';
import { mockUsers } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'signin' | 'signup';
  customMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin',
  customMessage,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'recovery'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Grade 11');
  const [strand, setStrand] = useState('STEM');
  const [schoolName, setSchoolName] = useState('Ramon Magsaysay High School');
  const [lrn, setLrn] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'recovery') {
      setRecoverySent(true);
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!guardianConsent) {
        setErrorMsg('Parent/guardian consent is required under Republic Act 10173 for high school students.');
        return;
      }

      const createdUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@student.deped.gov.ph`,
        role: 'student',
        schoolName: schoolName.trim() || 'Philippine Public Senior High School',
        schoolId: 'DEPED-NCR-300412',
        gradeLevel: grade,
        strand: strand,
        lrn: lrn.trim() || '136589200451',
        guardianConsent: true,
        guardianEmail: guardianEmail.trim() || 'parent.guardian@gmail.com',
        bio: `Grade ${grade} ${strand} student passionate about college preparation and practical community projects.`,
      };

      // Persist in localStorage
      localStorage.setItem('futureready_user', JSON.stringify(createdUser));
      onLoginSuccess(createdUser);
      onClose();
      return;
    }

    // Sign in flow
    if (mode === 'signin') {
      // Check if user has saved credentials or use matched/registered user
      const existingUserStr = localStorage.getItem('futureready_user');
      let userToLog: User = mockUsers.student;

      if (existingUserStr) {
        try {
          userToLog = JSON.parse(existingUserStr);
        } catch {
          userToLog = mockUsers.student;
        }
      }

      if (email.trim()) {
        userToLog = {
          ...userToLog,
          email: email.trim(),
        };
      }

      localStorage.setItem('futureready_user', JSON.stringify(userToLog));
      onLoginSuccess(userToLog);
      onClose();
    }
  };

  const fillSampleStudent = () => {
    setEmail('maya.santos@student.deped.gov.ph');
    setPassword('FutureReady2026!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3267D5] to-[#168C80] text-white flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white pt-2">
            {mode === 'signin' ? 'Welcome to FutureReady PH' : mode === 'signup' ? 'Create Student Account' : 'Account Recovery'}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {customMessage || (
              mode === 'signin' 
                ? 'Sign in to access your personal diagnostic batteries, Gabay AI, and portfolio.' 
                : 'Registration required for Philippine high school learners (Grades 7–12).'
            )}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-center transition-colors border-b-2 cursor-pointer ${
              mode === 'signin' ? 'border-[#3267D5] text-[#3267D5]' : 'border-transparent text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-center transition-colors border-b-2 cursor-pointer ${
              mode === 'signup' ? 'border-[#3267D5] text-[#3267D5]' : 'border-transparent text-slate-400'
            }`}
          >
            Create New Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs">
            {errorMsg}
          </div>
        )}

        {/* Custom Form */}
        {mode === 'recovery' ? (
          <div className="space-y-4">
            {recoverySent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-xl text-xs space-y-1">
                <p className="font-bold">Password Reset Dispatched</p>
                <p>Instructions have been forwarded to your registered school email address.</p>
                <button
                  onClick={() => {
                    setMode('signin');
                    setRecoverySent(false);
                  }}
                  className="mt-2 text-[#3267D5] font-semibold hover:underline block"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Registered Email or DepEd LRN</label>
                  <input
                    required
                    type="email"
                    placeholder="student@deped.gov.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#3267D5] hover:bg-[#2552B5] rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Send Recovery Link
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="w-full text-center text-xs text-slate-500 hover:underline pt-1"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Student Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Maria Clara Santos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Grade Level</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                    >
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">DepEd Track/Strand</label>
                    <select
                      value={strand}
                      onChange={(e) => setStrand(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                    >
                      <option>STEM</option>
                      <option>ABM</option>
                      <option>HUMSS</option>
                      <option>GAS</option>
                      <option>TVL-ICT</option>
                      <option>General (Junior High)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Learner Ref No. (LRN)</label>
                    <input
                      type="text"
                      maxLength={12}
                      placeholder="12-digit DepEd LRN"
                      value={lrn}
                      onChange={(e) => setLrn(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">School Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramon Magsaysay High"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Parent / Guardian Email</label>
                  <input
                    type="email"
                    placeholder="parent.guardian@gmail.com"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Student Email Address *</label>
              <input
                required
                type="email"
                placeholder="student@school.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password *</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('recovery')}
                    className="text-[11px] text-[#3267D5] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
              />
            </div>

            {mode === 'signup' && (
              <label className="flex items-start gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={guardianConsent}
                  onChange={(e) => setGuardianConsent(e.target.checked)}
                  className="rounded border-slate-300 text-[#3267D5] focus:ring-[#3267D5] mt-0.5"
                />
                <span className="leading-tight text-[11px]">
                  I confirm that my parent or legal guardian has approved this registration pursuant to <strong>Republic Act No. 10173</strong> (Data Privacy Act of 2012).
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer mt-2"
            >
              {mode === 'signin' ? 'Sign In to Student Workspace' : 'Complete Registration & Access Workspace'}
            </button>

            {mode === 'signin' && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={fillSampleStudent}
                  className="text-[11px] text-slate-500 hover:text-[#3267D5] transition-colors"
                >
                  Quick fill demo student credentials (Maya Santos)
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
