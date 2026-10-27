import React from 'react';
import { Compass, Shield, BookOpen, GraduationCap, Sliders, Mail, MapPin } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteConfig } = useSiteConfig();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#F5F7FB] dark:bg-[#0A101D] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              {siteConfig.logoUrl ? (
                <img 
                  src={siteConfig.logoUrl} 
                  alt={siteConfig.siteName} 
                  className="h-6 w-auto max-w-[120px] object-contain rounded" 
                />
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#3267D5] flex items-center justify-center text-white">
                  <Compass className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <span className="font-display font-bold text-sm text-[#14243A] dark:text-white">
                {siteConfig.siteName || 'FutureReady PH'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {siteConfig.tagline || 'Discover Your Potential. Design Your Future.'} Supporting Philippine high school students in Grades 7–12 with non-deterministic discovery and college readiness.
            </p>
            {siteConfig.contactEmail && (
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <Mail className="w-3 h-3 text-[#3267D5]" />
                <span>{siteConfig.contactEmail}</span>
              </div>
            )}
            <div className="pt-1 text-[11px] text-slate-400 dark:text-slate-500">
              Compliant with Republic Act 10173 · Data Privacy Act of 2012
            </div>
          </div>

          {/* Student Journey */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">Student Discovery</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('zamboanga-schools')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Zamboanga Peninsula Colleges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scholarships')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Scholarships Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training-ideas')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Practical Skills & Ideas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assessments')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Assessment Battery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('colleges')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  CHED Degree Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentor')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Gabay AI Guidance Mentor
                </button>
              </li>
            </ul>
          </div>

          {/* Schools & Educators */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">Schools & Partners</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('for-schools')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Information for Schools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('for-schools')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Guidance Counselor Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('for-schools')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  DepEd K-12 Strand Alignment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Institutional Pilot Request
                </button>
              </li>
            </ul>
          </div>

          {/* Governance, Admin & Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-xs tracking-wider uppercase">Governance & Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Privacy Policy (RA 10173)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Terms of Use & Fair Scoring Notice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#3267D5] dark:hover:text-blue-400 transition-colors">
                  Contact Support & DPO
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 {siteConfig.siteName || 'FutureReady PH'}. Dedicated to Philippine High School Learners nationwide.</p>
          <p className="text-slate-400 dark:text-slate-500">
            Assessments are formative discovery instruments, not clinical intelligence or psychometric diagnostic tests.
          </p>
        </div>
      </div>
    </footer>
  );
};

