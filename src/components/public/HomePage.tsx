import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Microscope, 
  Compass, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Lightbulb, 
  Users,
  Search,
  ExternalLink,
  Lock
} from 'lucide-react';
import { mockAssessments, mockCollegePrograms, mockProjects } from '../../data/mockData';

interface HomePageProps {
  onStartAssessment: (assessmentId: string) => void;
  onExploreColleges: () => void;
  onExploreProjects: () => void;
  onOpenWorkspace: () => void;
  onNavigate: (tab: string) => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAssessment,
  onExploreColleges,
  onExploreProjects,
  onOpenWorkspace,
  onNavigate,
  onOpenRegister,
  isLoggedIn,
}) => {
  const [selectedStrand, setSelectedStrand] = useState<'STEM' | 'ABM' | 'HUMSS' | 'TVL' | 'GAS'>('STEM');
  
  // Interactive sample quiz state right on the homepage
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const strandDetails = {
    STEM: {
      name: 'Science, Technology, Engineering & Mathematics',
      focus: 'Calculus, Physics, Biology, Algorithmics, Investigatory Research',
      sampleDegree: 'BS Computer Science / BS Civil Engineering / BS Nursing',
      dostEligible: true,
      description: 'Ideal for learners aiming for technological innovation, health sciences, infrastructure engineering, and scientific investigation.',
    },
    ABM: {
      name: 'Accountancy, Business & Management',
      focus: 'Financial Accounting, Applied Economics, Marketing, Corporate Law',
      sampleDegree: 'BS Accountancy (CPA) / BS Entrepreneurship / BS Finance',
      dostEligible: false,
      description: 'Tailored for students interested in enterprise leadership, financial auditing, startup growth, and global supply chains.',
    },
    HUMSS: {
      name: 'Humanities & Social Sciences',
      focus: 'Creative Nonfiction, Philippine Politics, Psychology, World Religions',
      sampleDegree: 'BA Communication / BS Psychology / BA Political Science (Pre-Law)',
      dostEligible: false,
      description: 'Cultivates critical dialogue, legislative analysis, sociological research, counseling, and creative literature.',
    },
    TVL: {
      name: 'Technical-Vocational-Livelihood (ICT / Industrial Arts)',
      focus: 'TESDA National Certifications (NC II/III), Programming, Mechatronics',
      sampleDegree: 'BS Information Technology / BTech / Direct TESDA Career Track',
      dostEligible: true,
      description: 'Equips students with hands-on technical proficiency, industry apprenticeships, and direct pathways to employment or higher technology degrees.',
    },
    GAS: {
      name: 'General Academic Strand',
      focus: 'Interdisciplinary Social & Natural Sciences, Humanities, Business Electives',
      sampleDegree: 'BS Education / BS Public Administration / Broad University Access',
      dostEligible: false,
      description: 'Provides flexible interdisciplinary preparation for students exploring multifaceted college options or undecided tracks.',
    },
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION WITH ANIMATED AMBIENT MESH */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-24 hero-ambient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 dark:bg-[#168C80]/20 px-3.5 py-1.5 rounded-full border border-[#168C80]/20 backdrop-blur-sm animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-[#168C80]" />
                <span>DepEd K-12 Senior High Ready</span>
                <span aria-hidden="true">·</span>
                <span>Grades 7–12 Discovery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#14243A] dark:text-white tracking-tight leading-[1.1] text-balance">
                Discover Your Potential. <br />
                <span className="bg-gradient-to-r from-[#3267D5] via-[#168C80] to-[#3267D5] bg-clip-text text-transparent">
                  Design Your Future.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                A premium student discovery and college-readiness web platform built for Philippine high school learners. Assess specific skills, build tangible community investigatory projects, and navigate accredited college programs with clarity.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {isLoggedIn ? (
                  <button
                    onClick={onOpenWorkspace}
                    className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#2552B5] hover:opacity-95 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Launch Student Workspace</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onOpenRegister}
                      className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Create Student Account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={onOpenWorkspace}
                      className="px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-slate-300 rounded-2xl transition-all shadow-sm cursor-pointer"
                    >
                      Sign In to Workspace
                    </button>
                  </>
                )}

                <button
                  onClick={() => onStartAssessment('logic_01')}
                  className="px-5 py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#3267D5] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Preview Diagnostic Module</span>
                </button>
              </div>

              {/* Registration notice */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Lock className="w-3.5 h-3.5 text-[#3267D5]" />
                <span>Full workspace access requires student account creation & login · Free under DepEd</span>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Generated Asset */}
            <div className="lg:col-span-5 relative">
              <div className="glow-card relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-square">
                <img
                  src="/src/assets/images/hero_student_discovery_1793061151671.jpg"
                  alt="Philippine senior high school students collaborating on a STEM engineering project"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14243A]/85 via-black/20 to-transparent" />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 animated-bg-card bg-white/95 dark:bg-[#14243A]/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-slate-700 text-xs shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white">Active Student Discovery</span>
                    <span className="text-[#168C80] font-semibold">Verified DepEd Track</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-snug">
                    Ramon Magsaysay High School STEM cohort testing a flood sensor telemetry prototype before national defense.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUANTITATIVE PROOF & ADJACENCY STRIP WITH ANIMATED BG CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
          
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold font-display text-[#14243A] dark:text-white tabular-nums">34,200+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Students Guided Across 17 Regions</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800 pl-4 sm:pl-6">
            <p className="text-2xl sm:text-3xl font-bold font-display text-[#3267D5] dark:text-[#60A5FA] tabular-nums">180+</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">CHED Programs Verified for 2026</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800 pl-4 sm:pl-6">
            <p className="text-2xl sm:text-3xl font-bold font-display text-[#168C80] dark:text-[#2DD4BF] tabular-nums">100% Free</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Public SUC Access under RA 10931</p>
          </div>

          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800 pl-4 sm:pl-6">
            <p className="text-2xl sm:text-3xl font-bold font-display text-amber-500 tabular-nums">94.6%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Counselor Follow-up Clarity Rating</p>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE DEPED STRAND NAVIGATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] uppercase tracking-wider">DepEd Senior High Alignment</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white mt-1">
              Explore Your Academic Strand
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Every strand provides a gateway to collegiate degrees, technical certifications, and productive careers.
          </p>
        </div>

        {/* Interactive Segmented Tab Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 dark:bg-slate-800/80 rounded-2xl overflow-x-auto">
          {(['STEM', 'ABM', 'HUMSS', 'TVL', 'GAS'] as const).map((strand) => (
            <button
              key={strand}
              onClick={() => setSelectedStrand(strand)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedStrand === strand
                  ? 'bg-white dark:bg-slate-900 text-[#3267D5] dark:text-[#60A5FA] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {strand} Track
            </button>
          ))}
        </div>

        {/* Strand Details Card */}
        <div className="animated-bg-card p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm transition-all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {strandDetails[selectedStrand].name}
                </h3>
                {strandDetails[selectedStrand].dostEligible && (
                  <span className="text-[11px] font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-2 py-0.5 rounded">
                    DOST-SEI Scholarship Priority
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {strandDetails[selectedStrand].description}
              </p>
              
              <div className="pt-2 text-xs space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Key High School Subjects:</span>
                  <span className="text-slate-600 dark:text-slate-400">{strandDetails[selectedStrand].focus}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">Sample Collegiate Pathways:</span>
                  <span className="text-slate-600 dark:text-slate-400">{strandDetails[selectedStrand].sampleDegree}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Ready to examine your readiness?</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Create an account or login to track your progress and unlock complete assessment batteries.
              </p>
              <button
                onClick={onOpenRegister}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 rounded-xl transition-all shadow-sm text-center cursor-pointer"
              >
                Register to Assess Readiness
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. REGION IX ZAMBOANGA PENINSULA & SCHOLARSHIPS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-3 py-1 rounded-full mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#168C80]" />
              <span>Region IX Educational Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
              Discover Universities & Scholarships in Zamboanga Peninsula
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('zamboanga-schools')}
              className="text-xs font-semibold text-[#3267D5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 12 Regional HEIs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => onNavigate('scholarships')}
              className="text-xs font-semibold text-[#168C80] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Scholarships Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WMSU */}
          <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/wmsu_zamboanga_campus_1793064530613.jpg"
                alt="Western Mindanao State University Normal Hall Campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#14243A]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                Est. 1904 · Free SUC (RA 10931)
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Western Mindanao State University (WMSU)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                Flagship state university founded as Zamboanga Normal School. Premier College of Medicine, Nursing, Civil Engineering, and Forestry.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Zamboanga City + 8 Satellites</span>
                <button
                  onClick={() => onNavigate('zamboanga-schools')}
                  className="font-semibold text-[#3267D5] hover:underline cursor-pointer"
                >
                  Explore Courses →
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: ADZU */}
          <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/adzu_zamboanga_university_1793064532026.jpg"
                alt="Ateneo de Zamboanga University Spanish-Filipino arcade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#14243A]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                Est. 1912 · Jesuit Autonomous
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Ateneo de Zamboanga University (ADZU)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                Second-oldest Jesuit university in the Philippines. Renowned for IT Center of Development, Accountancy, and Ateneo School of Medicine.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Salvador SJ Scholarships</span>
                <button
                  onClick={() => onNavigate('zamboanga-schools')}
                  className="font-semibold text-[#3267D5] hover:underline cursor-pointer"
                >
                  Explore Courses →
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: ZSCMST Marine Sciences */}
          <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/zscmst_marine_science_1793064532762.jpg"
                alt="ZSCMST Marine Sciences coastal research lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#14243A]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                Est. 1952 · Free SUC (RA 10931)
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                ZSCMST Marine Sciences & Technology
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                Premier Southwestern marine science and maritime institute at Fort Pilar. Marine Biology, Fisheries, and MARINA-accredited navigation.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Blue Economy Pioneer</span>
                <button
                  onClick={() => onNavigate('zamboanga-schools')}
                  className="font-semibold text-[#3267D5] hover:underline cursor-pointer"
                >
                  Explore Courses →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships Fast Action Strip */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Financial Support for College</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display">
              Need Tuition Assistance or a Monthly Living Stipend?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Access DOST-SEI (₱8,000/mo), CHED UniFAST 100% Free SUC, Zamboanga City EAP, ZDS Provincial grants, and NCIP Indigenous Peoples scholarships with complete eligibility criteria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('scholarships')}
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Browse Scholarships
            </button>
            <button
              onClick={() => onNavigate('training-ideas')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 rounded-xl transition-all border border-white/20 cursor-pointer"
            >
              Skills & Training Sandbox
            </button>
          </div>
        </div>
      </section>



      {/* 4. ASSESSMENT ENGINE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] uppercase tracking-wider">Assessment Engine</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white mt-1">
              Try a Sample Diagnostic Item
            </h2>
          </div>
          <button
            onClick={() => onStartAssessment('logic_01')}
            className="text-xs font-semibold text-[#3267D5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Assessment Battery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="animated-bg-card p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Module: Logical Syllogism & Critical Deduction (v2.4)
            </span>
            <span className="text-xs text-slate-500">Item 1 of 1 (Interactive Preview)</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
              Premise 1: All high-efficiency solar cells developed in Los Baños use organic polymer layers.<br />
              Premise 2: Module X was fabricated without any polymer layers.<br />
              Which conclusion logically follows?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'a', text: 'Module X is defective.', isCorrect: false },
                { id: 'b', text: 'Module X was not developed in Los Baños, or it is not a high-efficiency solar cell.', isCorrect: true },
                { id: 'c', text: 'Module X must be a wind turbine component.', isCorrect: false },
                { id: 'd', text: 'All solar cells need silicon crystals.', isCorrect: false },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSampleAnswer(opt.id);
                    setShowExplanation(true);
                  }}
                  className={`p-3.5 text-left text-xs rounded-2xl border transition-all cursor-pointer ${
                    sampleAnswer === opt.id
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium'
                        : 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#3267D5] text-slate-800 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  <span className="font-semibold uppercase mr-2">{opt.id}.</span>
                  {opt.text}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="p-4 bg-slate-50/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 animate-in fade-in">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {sampleAnswer === 'b' ? '✓ Correct Deduction!' : 'Explanation:'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  By Modus Tollens, if Module X lacks polymer layers, it cannot simultaneously be both high-efficiency and developed in Los Baños under Premise 1. This tests conditional reasoning without relying on rote memorization.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CAREER & COLLEGE DATABASE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] uppercase tracking-wider">Philippine Tertiary Education</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white mt-1">
              Verified College Degree Programs
            </h2>
          </div>
          <button
            onClick={onExploreColleges}
            className="text-xs font-semibold text-[#3267D5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCollegePrograms.slice(0, 3).map((prog) => (
            <div
              key={prog.id}
              className="animated-bg-card p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{prog.acronym} · {prog.region}</span>
                  <span className="font-medium text-[#168C80] dark:text-[#2DD4BF]">{prog.chedStatus}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {prog.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {prog.university}
                </p>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {prog.overview}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tuition:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{prog.tuitionBracket}</span>
                </div>
                {prog.isDostPriority && (
                  <div className="flex items-center gap-1.5 text-[#168C80] dark:text-[#2DD4BF] font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>DOST-SEI Priority Course</span>
                  </div>
                )}
                
                <button
                  onClick={onExploreColleges}
                  className="w-full mt-2 py-2.5 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/60 rounded-xl transition-colors text-center cursor-pointer"
                >
                  View Curriculum & Prerequisites
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INNOVATION LAB PREVIEW WITH ANIMATED BG CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] uppercase tracking-wider">Student Innovation Lab</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white mt-1">
              Real Investigatory & Community Projects
            </h2>
          </div>
          <button
            onClick={onExploreProjects}
            className="text-xs font-semibold text-[#3267D5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Student Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Project 1 */}
          <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/innovation_stem_hydroponics_1793061152828.jpg"
                alt="Smart urban hydroponics agricultural prototype at high school science fair"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200">
                Agricultural Innovation · Grade 11
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Smart Urban Hydroponics for High-Density Classrooms
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A modular vertical nutrient film technique (NFT) rig built from UPVC pipes with automated dosing pumps, enabling urban public schools to grow fresh vegetables without soil.
              </p>
              
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <span>Progress: 82% (Phase 5 Testing)</span>
                <span className="font-semibold text-[#168C80]">Rubric Score: 93/100</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/student_creative_design_1793061153203.jpg"
                alt="High school student designing interface for educational technology portal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200">
                Digital EdTech · Grade 12
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                KapwaLearn: Low-Bandwidth Digital Education Portal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                An ultra-compact offline PWA server broadcasting lessons, quizzes, and simulations to any phone browser over local zero-cost Wi-Fi without internet cellular load.
              </p>
              
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <span>Progress: 70% (Phase 4 Prototyping)</span>
                <span className="font-semibold text-[#168C80]">Rubric Score: 93/100</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. AUTH GATEWAY BANNER (Compelling Account Creation Callout - Guaranteed High Contrast) */}
      {!isLoggedIn && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            style={{ backgroundColor: '#14243A' }}
            className="relative overflow-hidden p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700/80 bg-gradient-to-br from-[#14243A] via-[#1B3252] to-[#0E1724] text-white"
          >
            {/* Ambient decorative glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#3267D5]/20 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#168C80]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-emerald-500/50 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Site Access For Registered Students</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight drop-shadow-sm">
                Create Your Free Student Account Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Unlock your personal student dashboard, full 5-module diagnostic test batteries, AI Career Mentor (Gabay AI), and start saving your target college programs.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-[#14243A] bg-white hover:bg-slate-100 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap text-center"
              >
                Create Student Account
              </button>
              <button
                onClick={onOpenWorkspace}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-600 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center backdrop-blur-sm shadow-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
