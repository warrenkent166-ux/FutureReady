import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { FeaturesPage } from './components/public/FeaturesPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { ExploreCareersPage } from './components/public/ExploreCareersPage';
import { SchoolsInfoPage } from './components/public/SchoolsInfoPage';
import { FaqPage } from './components/public/FaqPage';
import { ContactPage } from './components/public/ContactPage';
import { PrivacyPolicyPage } from './components/public/PrivacyPolicyPage';
import { TermsPage } from './components/public/TermsPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AssessmentCenter } from './components/student/AssessmentCenter';
import { CollegeCareerExplorer } from './components/student/CollegeCareerExplorer';
import { InnovationProjectBuilder } from './components/student/InnovationProjectBuilder';
import { DigitalPortfolio } from './components/student/DigitalPortfolio';
import { AICareerMentor } from './components/student/AICareerMentor';
import { GrowthGoalsPlanner } from './components/student/GrowthGoalsPlanner';
import { StudentProfile } from './components/student/StudentProfile';
import { ZamboangaSchoolsDirectory } from './components/student/ZamboangaSchoolsDirectory';
import { ScholarshipExplorer } from './components/student/ScholarshipExplorer';
import { StudentTrainingAndIdeas } from './components/student/StudentTrainingAndIdeas';
import { AdminCmsDashboard } from './components/admin/AdminCmsDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { User, InnovationProject, GrowthGoal } from './types';
import { mockProjects, mockGoals } from './data/mockData';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  // Authentication requirement: Check localStorage for logged-in student, otherwise null
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('futureready_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Default tab: 'admin-cms' if /adminxx or #adminxx, 'dashboard' if logged in, otherwise 'home'
  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('adminxx') || hash.includes('adminxx')) {
        return 'admin-cms';
      }
      const stored = localStorage.getItem('futureready_user');
      return stored ? 'dashboard' : 'home';
    } catch {
      return 'home';
    }
  });

  // Listen to hash/path changes for adminxx
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('adminxx') || hash.includes('adminxx')) {
        setActiveTab('admin-cms');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [authNotice, setAuthNotice] = useState<string>('');

  // App data state
  const [savedPrograms, setSavedPrograms] = useState<string[]>(['upd_cs', 'batstateu_mechatronics', 'dlsu_ie']);
  const [savedSchoolIds, setSavedSchoolIds] = useState<string[]>(['sch_wmsu', 'sch_adzu', 'sch_zscmst']);
  const [projects, setProjects] = useState<InnovationProject[]>(mockProjects);
  const [goals, setGoals] = useState<GrowthGoal[]>(mockGoals);

  // Cross-component transition triggers
  const [initialAssessmentId, setInitialAssessmentId] = useState<string | undefined>(undefined);
  const [initialMentorPrompt, setInitialMentorPrompt] = useState<string | undefined>(undefined);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Protected tabs list requiring student authentication
  const protectedTabs = [
    'dashboard',
    'assessments',
    'colleges',
    'innovation',
    'portfolio',
    'mentor',
    'goals',
    'profile',
  ];

  // Intercept navigation to protected tabs if not logged in
  const handleTabNavigation = (targetTab: string) => {
    if (protectedTabs.includes(targetTab) && !currentUser) {
      setAuthNotice('Students must create an account and log in to have full access to diagnostic assessments, college planning tools, and Gabay AI.');
      setAuthModalMode('signup');
      setAuthModalOpen(true);
      return;
    }

    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin', notice: string = '') => {
    setAuthModalMode(mode);
    setAuthNotice(notice);
    setAuthModalOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('futureready_user');
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleToggleSaveProgram = (id: string) => {
    setSavedPrograms((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleToggleSaveSchool = (schoolId: string) => {
    if (!currentUser) {
      handleOpenAuth('signin', 'Sign in to bookmark schools and track your target universities.');
      return;
    }
    setSavedSchoolIds((prev) =>
      prev.includes(schoolId) ? prev.filter((s) => s !== schoolId) : [...prev, schoolId]
    );
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter((m) => m.completed).length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);
        return {
          ...proj,
          milestones: updatedMilestones,
          progressPercent,
        };
      })
    );
  };

  const handleAddProject = (newProj: InnovationProject) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const handleAddGoal = (newGoal: GrowthGoal) => {
    setGoals((prev) => [newGoal, ...prev]);
  };

  const handleToggleSubtask = (goalId: string, subtaskId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;
        const updated = goal.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, done: !st.done } : st
        );
        const doneCount = updated.filter((s) => s.done).length;
        const progress = Math.round((doneCount / updated.length) * 100);
        return {
          ...goal,
          subtasks: updated,
          progress,
          completed: progress === 100,
        };
      })
    );
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const handleStartAssessmentFromAnywhere = (assessmentId: string) => {
    if (!currentUser) {
      setAuthNotice('Please create an account or sign in to complete diagnostic modules and record your growth trajectory.');
      setAuthModalMode('signup');
      setAuthModalOpen(true);
      return;
    }
    setInitialAssessmentId(assessmentId);
    setActiveTab('assessments');
  };

  const handleAskMentorAboutDegree = (degree: string, university: string) => {
    if (!currentUser) {
      setAuthNotice('Please sign in to consult with Gabay AI guidance mentor.');
      setAuthModalMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setInitialMentorPrompt(`Can you explain what high school preparation is best for ${degree} at ${university}, and what careers are common for its graduates in the Philippines?`);
    setActiveTab('mentor');
  };

  const handleAskMentorAboutCareer = (careerTitle: string) => {
    if (!currentUser) {
      setAuthNotice('Please sign in to consult with Gabay AI guidance mentor.');
      setAuthModalMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setInitialMentorPrompt(`What DepEd Senior High strand and college degree should I explore if I want to become a ${careerTitle} in the Philippines?`);
    setActiveTab('mentor');
  };

  const handleAskMentorAboutResult = (assessmentTitle: string, scoreStr: string) => {
    if (!currentUser) {
      setAuthNotice('Please sign in to review your results with Gabay AI.');
      setAuthModalMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setInitialMentorPrompt(`I just completed the "${assessmentTitle}" with a score of ${scoreStr}. Can you help me reflect on what this means for my college exploration, and what questions I should ask my school guidance counselor?`);
    setActiveTab('mentor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0E1724] text-[#14243A] dark:text-[#E2E8F0] transition-colors duration-200">
      
      {/* 3-Zone Top Navigation Bar (Switch User Removed) */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={handleTabNavigation}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAuth={(mode) => handleOpenAuth(mode || 'signin')}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* PUBLIC PAGES */}
        {activeTab === 'home' && (
          <HomePage
            onStartAssessment={handleStartAssessmentFromAnywhere}
            onExploreColleges={() => handleTabNavigation('colleges')}
            onExploreProjects={() => handleTabNavigation('innovation')}
            onOpenWorkspace={() => {
              if (currentUser) {
                setActiveTab('dashboard');
              } else {
                handleOpenAuth('signin', 'Please sign in to access your student workspace.');
              }
            }}
            onNavigate={handleTabNavigation}
            onOpenRegister={() => handleOpenAuth('signup', 'Create your student account to access all features.')}
            isLoggedIn={!!currentUser}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
        
        {activeTab === 'features' && (
          <FeaturesPage onNavigate={handleTabNavigation} />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleTabNavigation} />
        )}

        {activeTab === 'explore-careers' && (
          <ExploreCareersPage
            onNavigateToDegreeExplorer={() => handleTabNavigation('colleges')}
            onAskMentorAboutCareer={handleAskMentorAboutCareer}
          />
        )}

        {activeTab === 'zamboanga-schools' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ZamboangaSchoolsDirectory
              savedSchoolIds={savedSchoolIds}
              onToggleSaveSchool={handleToggleSaveSchool}
            />
          </div>
        )}

        {activeTab === 'scholarships' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ScholarshipExplorer />
          </div>
        )}

        {activeTab === 'training-ideas' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StudentTrainingAndIdeas
              onStartAssessment={handleStartAssessmentFromAnywhere}
              onOpenProjectBuilder={() => handleTabNavigation('innovation')}
            />
          </div>
        )}

        {activeTab === 'for-schools' && (
          <SchoolsInfoPage
            onContactSales={() => handleTabNavigation('contact')}
            onOpenWorkspace={() => {
              if (!currentUser) {
                handleOpenAuth('signin', 'Sign in to access school workspaces.');
              } else {
                setActiveTab('dashboard');
              }
            }}
          />
        )}

        {activeTab === 'faq' && <FaqPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'privacy' && <PrivacyPolicyPage />}
        {activeTab === 'terms' && <TermsPage />}

        {/* DEDICATED ADMIN CMS DASHBOARD */}
        {activeTab === 'admin-cms' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminCmsDashboard
              onNavigateHome={() => setActiveTab('home')}
              onNavigateToTab={handleTabNavigation}
            />
          </div>
        )}

        {/* STUDENT WORKSPACE PAGES (REQUIRED LOGIN) */}
        {activeTab === 'dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            goals={goals}
            projects={projects}
            savedCollegesCount={savedPrograms.length}
            onNavigate={handleTabNavigation}
            onStartAssessment={handleStartAssessmentFromAnywhere}
            onAskMentor={(prompt) => {
              setInitialMentorPrompt(prompt);
              setActiveTab('mentor');
            }}
          />
        )}

        {activeTab === 'assessments' && currentUser && (
          <AssessmentCenter
            initialAssessmentId={initialAssessmentId}
            onAskMentorAboutResult={handleAskMentorAboutResult}
          />
        )}

        {activeTab === 'colleges' && currentUser && (
          <CollegeCareerExplorer
            savedPrograms={savedPrograms}
            onToggleSaveProgram={handleToggleSaveProgram}
            onAskMentorAboutDegree={handleAskMentorAboutDegree}
          />
        )}

        {activeTab === 'innovation' && currentUser && (
          <InnovationProjectBuilder
            projects={projects}
            onAddProject={handleAddProject}
            onToggleMilestone={handleToggleMilestone}
          />
        )}

        {activeTab === 'portfolio' && currentUser && (
          <DigitalPortfolio
            user={currentUser}
            projects={projects}
            goals={goals}
          />
        )}

        {activeTab === 'mentor' && currentUser && (
          <AICareerMentor
            user={currentUser}
            initialPrompt={initialMentorPrompt}
          />
        )}

        {activeTab === 'goals' && currentUser && (
          <GrowthGoalsPlanner
            goals={goals}
            onAddGoal={handleAddGoal}
            onToggleSubtask={handleToggleSubtask}
            onDeleteGoal={handleDeleteGoal}
          />
        )}

        {activeTab === 'profile' && currentUser && (
          <StudentProfile user={currentUser} />
        )}

      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleTabNavigation} />

      {/* Authentication & Student Onboarding Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        customMessage={authNotice}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setActiveTab('dashboard');
        }}
      />

    </div>
  );
}
