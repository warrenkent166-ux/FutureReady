import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Info, 
  Filter, 
  Phone,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockScholarships } from '../../data/mockData';
import { ScholarshipInfo } from '../../types';

interface ScholarshipExplorerProps {
  onSelectScholarship?: (scholarship: ScholarshipInfo) => void;
}

export const ScholarshipExplorer: React.FC<ScholarshipExplorerProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStrand, setSelectedStrand] = useState<string>('All');
  const [strandDropdownOpen, setStrandDropdownOpen] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>([]);

  const categories = ['All', 'National Government', 'Provincial/LGU', 'Institutional', 'Indigenous Peoples'];
  const strands = ['All', 'STEM', 'ABM', 'HUMSS', 'TVL', 'GAS'];

  const toggleSave = (id: string) => {
    setSavedScholarshipIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter((sch) => {
      const matchesSearch = 
        sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.coverageBenefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.regionScope.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;
      const matchesStrand = selectedStrand === 'All' || sch.targetStrands.some(s => s.includes(selectedStrand));

      return matchesSearch && matchesCategory && matchesStrand;
    });
  }, [searchQuery, selectedCategory, selectedStrand]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#14243A] text-white">
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden">
          <img
            src="/src/assets/images/philippine_scholarships_banner_1793064533344.jpg"
            alt="Philippine scholarship beneficiaries collaborating in university library"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14243A] via-[#14243A]/85 to-transparent" />
          
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-500/40 w-fit backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-[#168C80]" />
              <span>Financial Aid & Grant Navigation</span>
              <span aria-hidden="true">·</span>
              <span>2026 Academic Year</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white drop-shadow-sm">
              Philippine College Scholarships & Grants Directory
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
              Explore national and local government scholarships, tuition waivers under RA 10931, monthly stipends up to ₱8,000, provincial grants, and indigenous affirmative aid across Zamboanga Peninsula.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarships (e.g. DOST, stipend, Subanen, UniFAST, 8,000)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3267D5]"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Grant Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Target Strand Filter - Custom Designed Dropdown Matching Reference */}
          <div className="md:col-span-3 relative">
            <button
              type="button"
              onClick={() => setStrandDropdownOpen(!strandDropdownOpen)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#3267D5] cursor-pointer"
            >
              <span className="font-medium truncate">
                {selectedStrand === 'All' ? 'All Senior High Strands' : `${selectedStrand} Strand`}
              </span>
              {strandDropdownOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {strandDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div 
                  onClick={() => {
                    setSelectedStrand('All');
                    setStrandDropdownOpen(false);
                  }}
                  className="px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#3267D5] flex items-center justify-between cursor-pointer"
                >
                  <span>All Senior High Strands</span>
                  {selectedStrand === 'All' && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>

                <div className="py-1">
                  {strands.filter(st => st !== 'All').map((st) => {
                    const isSelected = selectedStrand === st;
                    return (
                      <button
                        key={st}
                        onClick={() => {
                          setSelectedStrand(st);
                          setStrandDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-[#3267D5] dark:text-[#60A5FA]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{st} Strand</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#3267D5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Filters Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Found <strong className="text-slate-900 dark:text-white">{filteredScholarships.length}</strong> active scholarship programs</span>
          {(searchQuery || selectedCategory !== 'All' || selectedStrand !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStrand('All');
              }}
              className="text-[#3267D5] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Scholarship Cards List */}
      <div className="space-y-6">
        {filteredScholarships.map((scholarship) => {
          const isExpanded = expandedId === scholarship.id;
          const isSaved = savedScholarshipIds.includes(scholarship.id);

          return (
            <div
              key={scholarship.id}
              className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 space-y-6"
            >
              {/* Top Row: Provider & Category & Save */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-[#3267D5] dark:text-[#60A5FA] rounded-full text-xs font-semibold border border-blue-200/60 dark:border-blue-900/60">
                      {scholarship.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{scholarship.regionScope}</span>
                    </span>
                    <span className="text-xs text-slate-400">· Verified {scholarship.verifiedDate}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white pt-1">
                    {scholarship.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Administered by: {scholarship.provider}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleSave(scholarship.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-[#3267D5] text-white border-[#3267D5]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-[#3267D5]'
                    }`}
                    title={isSaved ? 'Bookmarked' : 'Bookmark scholarship'}
                  >
                    <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                  
                  <a
                    href={scholarship.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Benefits Highlight Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/60 dark:to-slate-800/30 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
                
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tuition Coverage</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{scholarship.tuitionCoverage}</p>
                </div>

                <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-2 md:pt-0 md:pl-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Living Stipend / Allowance</span>
                  <p className="font-bold text-[#168C80] dark:text-[#2DD4BF] text-sm">
                    {scholarship.monthlyStipendPhp && scholarship.monthlyStipendPhp > 0
                      ? `₱${scholarship.monthlyStipendPhp.toLocaleString()} / month`
                      : 'Included in Free Higher Education'}
                  </p>
                </div>

                <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-2 md:pt-0 md:pl-4">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Application Period</span>
                  <p className="font-bold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{scholarship.applicationPeriod}</span>
                  </p>
                </div>

              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {scholarship.summary}
              </p>

              {/* Expandable Details: Eligibility & Required Documents */}
              <div className="pt-2">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : scholarship.id)}
                  className="text-xs font-semibold text-[#3267D5] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Eligibility & Document Checklist' : 'View Eligibility Criteria & Required Documents'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in text-xs space-y-4 md:space-y-0">
                    
                    {/* Eligibility List */}
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Who Is Eligible?</span>
                      </h4>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 pl-1">
                        {scholarship.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#3267D5] font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents List */}
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#3267D5]" />
                        <span>Required Submission Documents</span>
                      </h4>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 pl-1">
                        {scholarship.requiredDocuments.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{scholarship.contactDetails}</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
