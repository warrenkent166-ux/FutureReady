import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  FlaskConical, 
  X,
  Building2,
  MapPin,
  Calendar
} from 'lucide-react';
import { mockCollegePrograms } from '../../data/mockData';
import { CollegeProgram } from '../../types';

interface CollegeCareerExplorerProps {
  savedPrograms: string[];
  onToggleSaveProgram: (id: string) => void;
  onAskMentorAboutDegree: (degreeName: string, university: string) => void;
}

export const CollegeCareerExplorer: React.FC<CollegeCareerExplorerProps> = ({
  savedPrograms,
  onToggleSaveProgram,
  onAskMentorAboutDegree,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStrand, setSelectedStrand] = useState('ALL');
  const [selectedTuition, setSelectedTuition] = useState('ALL');
  const [dostOnly, setDostOnly] = useState(false);
  const [activeModalProgram, setActiveModalProgram] = useState<CollegeProgram | null>(null);

  const filteredPrograms = mockCollegePrograms.filter((prog) => {
    const matchesSearch = 
      prog.name.toLowerCase().includes(search.toLowerCase()) ||
      prog.university.toLowerCase().includes(search.toLowerCase()) ||
      prog.acronym.toLowerCase().includes(search.toLowerCase()) ||
      prog.region.toLowerCase().includes(search.toLowerCase());

    const matchesStrand = 
      selectedStrand === 'ALL' || prog.strandAlignment.includes(selectedStrand);

    const matchesTuition = 
      selectedTuition === 'ALL' || 
      (selectedTuition === 'FREE' && prog.tuitionBracket.includes('RA 10931')) ||
      (selectedTuition === 'PRIVATE' && !prog.tuitionBracket.includes('RA 10931'));

    const matchesDost = !dostOnly || prog.isDostPriority;

    return matchesSearch && matchesStrand && matchesTuition && matchesDost;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>Official CHED & University Data</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#14243A] dark:text-white">
          Philippine Tertiary Programs & Universities
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Structured directory of undergraduate degree programs across Philippine State Universities (Free Higher Education RA 10931) and private Centers of Excellence.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by degree, university, or acronym (e.g. UPD, DLSU, Mechatronics)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center gap-2">
            
            {/* Strand Filter */}
            <select
              value={selectedStrand}
              onChange={(e) => setSelectedStrand(e.target.value)}
              className="px-3.5 py-2 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3267D5] text-slate-900 dark:text-white cursor-pointer shadow-xs"
            >
              <option value="ALL">All Strands</option>
              <option value="STEM">STEM</option>
              <option value="ABM">ABM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="TVL-ICT">TVL-ICT</option>
            </select>

            {/* Tuition Filter */}
            <select
              value={selectedTuition}
              onChange={(e) => setSelectedTuition(e.target.value)}
              className="px-3.5 py-2 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3267D5] text-slate-900 dark:text-white cursor-pointer shadow-xs"
            >
              <option value="ALL">All Tuition Brackets</option>
              <option value="FREE">Free SUC (RA 10931)</option>
              <option value="PRIVATE">Private Institutions</option>
            </select>

            {/* DOST-SEI Checkbox */}
            <label className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={dostOnly}
                onChange={(e) => setDostOnly(e.target.checked)}
                className="rounded border-slate-300 text-[#168C80] focus:ring-[#168C80]"
              />
              <span>DOST-SEI Priority Only</span>
            </label>

          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>Showing {filteredPrograms.length} verified programs</span>
          <span>Saved to target list: {savedPrograms.length}</span>
        </div>

      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => {
          const isSaved = savedPrograms.includes(prog.id);

          return (
            <div
              key={prog.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold text-[#168C80] dark:text-[#2DD4BF]">
                      {prog.chedStatus}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {prog.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleSaveProgram(prog.id)}
                    aria-label={isSaved ? 'Remove from saved' : 'Save program'}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isSaved
                        ? 'border-purple-200 bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:border-purple-800'
                        : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-purple-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {prog.university} ({prog.acronym})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {prog.campus} · {prog.region}
                  </p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {prog.overview}
                </p>

                <div className="pt-2 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Tuition Schedule:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{prog.tuitionBracket}</span>
                  </div>
                  {prog.isDostPriority && (
                    <div className="flex items-center gap-1 text-[#168C80] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DOST-SEI Priority Course</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalProgram(prog)}
                  className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] hover:underline cursor-pointer"
                >
                  View Details & Experiment →
                </button>

                <button
                  onClick={() => onAskMentorAboutDegree(prog.name, prog.university)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#3267D5] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Ask Gabay AI about this degree"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 my-8">
            
            <button
              onClick={() => setActiveModalProgram(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#168C80] uppercase tracking-wider">
                {activeModalProgram.chedStatus} · {activeModalProgram.region}
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                {activeModalProgram.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {activeModalProgram.university} ({activeModalProgram.campus})
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalProgram.overview}
            </p>

            {/* Prerequisites */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Admission Prerequisites & Strand Criteria:
              </h4>
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                {activeModalProgram.prerequisites.map((prereq, i) => (
                  <li key={i}>{prereq}</li>
                ))}
              </ul>
            </div>

            {/* Practical High School Experiment */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                <FlaskConical className="w-4 h-4" />
                <span>Test Your Interest Now: {activeModalProgram.practicalHighSchoolExperiment.title}</span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                {activeModalProgram.practicalHighSchoolExperiment.description}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Time Investment: {activeModalProgram.practicalHighSchoolExperiment.timeRequired}
              </p>
            </div>

            {/* Official Source & Verification Date */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Verified: {activeModalProgram.verifiedDate}</span>
              <a
                href={activeModalProgram.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#3267D5] hover:underline flex items-center gap-1"
              >
                <span>Official Institution Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
