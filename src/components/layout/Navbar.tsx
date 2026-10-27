import React, { useState } from 'react';
import { 
  Compass, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  UserCircle2, 
  LogOut,
  Sparkles,
  Lock,
  ChevronDown,
  Sliders,
  Megaphone,
  ArrowRight
} from 'lucide-react';
import { User } from '../../types';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAuth: (initialMode?: 'signin' | 'signup') => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenAuth,
  onSignOut,
}) => {
  const { siteConfig } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isWorkspace = !!currentUser;

  const publicNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'zamboanga-schools', label: 'Zamboanga Schools' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'training-ideas', label: 'Skills & Ideas' },
    { id: 'for-schools', label: 'For Schools' },
    { id: 'faq', label: 'FAQ' },
  ];

  const studentNavLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'zamboanga-schools', label: 'Zamboanga Schools' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'training-ideas', label: 'Skills & Ideas' },
    { id: 'colleges', label: 'All Colleges' },
    { id: 'innovation', label: 'Innovation Lab' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'mentor', label: 'Gabay AI' },
  ];

  const activeLinks = isWorkspace ? studentNavLinks : publicNavLinks;

  const bannerBg = siteConfig.announcementBanner?.type === 'alert'
    ? 'bg-amber-500 text-slate-950 font-semibold'
    : siteConfig.announcementBanner?.type === 'success'
    ? 'bg-emerald-600 text-white'
    : 'bg-[#14243A] text-white';

  return (
    <>
      {/* Dynamic Announcement Banner managed from Admin CMS */}
      {siteConfig.announcementBanner?.enabled && siteConfig.announcementBanner.text && (
        <div className={`w-full py-2 px-4 text-xs font-medium text-center flex items-center justify-center gap-3 transition-colors ${bannerBg}`}>
          <div className="flex items-center gap-1.5 justify-center max-w-4xl mx-auto flex-wrap">
            <Megaphone className="w-3.5 h-3.5 shrink-0 opacity-90" />
            <span>{siteConfig.announcementBanner.text}</span>
            {siteConfig.announcementBanner.linkLabel && siteConfig.announcementBanner.linkUrl && (
              <button
                onClick={() => onTabChange(siteConfig.announcementBanner?.linkUrl || 'home')}
                className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <span>{siteConfig.announcementBanner.linkLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-[#F5F7FB]/90 dark:bg-[#0E1724]/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            
            {/* Zone 1: Single text element wordmark / Dynamic Logo */}
            <button 
              onClick={() => onTabChange(isWorkspace ? 'dashboard' : 'home')} 
              className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-[#14243A] dark:text-white whitespace-nowrap shrink-0 group focus:outline-none cursor-pointer"
            >
              {siteConfig.logoUrl ? (
                <img 
                  src={siteConfig.logoUrl} 
                  alt={siteConfig.siteName} 
                  className="h-8 max-w-[140px] object-contain rounded-md shadow-xs group-hover:scale-105 transition-transform" 
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3267D5] to-[#168C80] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="font-display font-bold text-lg text-[#14243A] dark:text-white">
                {siteConfig.siteName || 'FutureReady PH'}
              </span>
            </button>

            {/* Zone 2: 4-5 concise single-line nav links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              {activeLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onTabChange(link.id)}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive 
                        ? 'text-[#3267D5] dark:text-[#60A5FA] font-semibold' 
                        : 'hover:text-[#14243A] dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action area */}
            <div className="flex items-center gap-2.5 shrink-0">

              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Authenticated Student Profile & Menu */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-xs font-semibold text-slate-800 dark:text-slate-100 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#3267D5] text-white flex items-center justify-center font-bold text-[10px]">
                      {currentUser.name.slice(0, 1)}
                    </div>
                    <span className="hidden sm:inline max-w-[120px] truncate">{currentUser.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.gradeLevel} · {currentUser.strand}</p>
                      </div>

                      <button
                        onClick={() => {
                          onTabChange('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Profile & Privacy Settings
                      </button>

                      <button
                        onClick={() => {
                          onTabChange('portfolio');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        DepEd Digital Portfolio
                      </button>


                      <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                      <button
                        onClick={() => {
                          onSignOut();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#2552B5] hover:from-[#2552B5] hover:to-[#1C3E8A] rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-[#F5F7FB] dark:bg-[#0E1724] px-4 pt-2 pb-4 space-y-1">
            {activeLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm rounded-xl font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#3267D5]/10 text-[#3267D5] dark:text-[#60A5FA]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}


            {!currentUser && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#3267D5] rounded-xl shadow-sm text-center"
                >
                  Create Student Account
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 rounded-xl text-center"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

