import React, { useState } from 'react';
import { Search, TrendingUp, Briefcase, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react';
import { mockCareerPathways } from '../../data/mockData';

interface ExploreCareersPageProps {
  onNavigateToDegreeExplorer: () => void;
  onAskMentorAboutCareer: (careerTitle: string) => void;
}

export const ExploreCareersPage: React.FC<ExploreCareersPageProps> = ({
  onNavigateToDegreeExplorer,
  onAskMentorAboutCareer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStrandFilter, setSelectedStrandFilter] = useState('ALL');

  const filteredCareers = mockCareerPathways.filter((career) => {
    const matchesSearch = 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.skillsInDemand.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStrand = 
      selectedStrandFilter === 'ALL' || career.strand.includes(selectedStrandFilter);

    return matchesSearch && matchesStrand;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] bg-[#3267D5]/10 px-3 py-1 rounded-full">
          <span>Philippine Industry Pathways</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#14243A] dark:text-white tracking-tight">
          Explore High-Growth Careers in the Philippines
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Grounded in emerging Philippine technological, agricultural, healthcare, and economic priorities. Examine real starting salary benchmarks, skills in demand, and practical high school steps.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
        
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, sector, or required skill (e.g. Python, Audit, LoRa)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#3267D5] text-slate-900 dark:text-white"
          />
        </div>

        {/* Strand Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'STEM', 'ABM', 'HUMSS', 'TVL-ICT'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedStrandFilter(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedStrandFilter === filter
                  ? 'bg-[#3267D5] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Career Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-[#168C80]/10 px-2 py-0.5 rounded">
                  {career.strand}
                </span>
                <span className="text-slate-500 font-medium">{career.growthOutlook}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {career.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Sector: {career.sector}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {career.summary}
              </p>

              {/* Skills */}
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Key Skills in Demand:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {career.skillsInDemand.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="p-3 bg-[#F5F7FB] dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500">Benchmark Starting Compensation: </span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">{career.startingSalaryPhpRange}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => onAskMentorAboutCareer(career.title)}
                className="text-xs font-semibold text-[#3267D5] dark:text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ask Gabay AI About This Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onNavigateToDegreeExplorer}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Matching Degrees</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
