import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Search, 
  ExternalLink, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Building2, 
  Info, 
  Calendar, 
  Users, 
  Bookmark, 
  ChevronRight, 
  X,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { mockZamboangaSchools } from '../../data/mockData';
import { ZamboangaSchool, ZamboangaProgramOffering } from '../../types';

interface ZamboangaSchoolsDirectoryProps {
  onSelectSchool?: (school: ZamboangaSchool) => void;
  savedSchoolIds?: string[];
  onToggleSaveSchool?: (schoolId: string) => void;
  onNavigateToProgram?: (programCode: string) => void;
}

export const ZamboangaSchoolsDirectory: React.FC<ZamboangaSchoolsDirectoryProps> = ({
  savedSchoolIds = [],
  onToggleSaveSchool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTuition, setSelectedTuition] = useState<string>('All');
  const [selectedSchoolModal, setSelectedSchoolModal] = useState<ZamboangaSchool | null>(null);

  const provinces = ['All', 'Zamboanga City', 'Zamboanga del Sur', 'Zamboanga del Norte', 'Zamboanga Sibugay'];
  const institutionTypes = ['All', 'State University', 'State College', 'Private Sectarian', 'Private Non-Sectarian'];

  // Filter schools
  const filteredSchools = useMemo(() => {
    return mockZamboangaSchools.filter((school) => {
      const matchesSearch = 
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.mainCampusAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.programsOffered.some(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesProvince = selectedProvince === 'All' || school.provinceOrCity === selectedProvince;
      const matchesType = selectedType === 'All' || school.institutionType === selectedType;
      const matchesTuition = 
        selectedTuition === 'All' || 
        (selectedTuition === 'Free SUC' && school.tuitionModel.includes('Free SUC')) ||
        (selectedTuition === 'Private' && school.tuitionModel.includes('Private'));

      return matchesSearch && matchesProvince && matchesType && matchesTuition;
    });
  }, [searchQuery, selectedProvince, selectedType, selectedTuition]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#14243A] text-white p-8 sm:p-12 shadow-xl border border-white/10 animated-dark-card">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#168C80] dark:text-[#2DD4BF] bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-[#168C80]" />
            <span>Region IX Higher Education Directory</span>
            <span aria-hidden="true">·</span>
            <span>Zamboanga Peninsula</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
            Colleges & Universities in Zamboanga Peninsula
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Discover all accredited higher education institutions across Zamboanga City, Zamboanga del Sur, Zamboanga del Norte, and Zamboanga Sibugay. Explore historical backgrounds, free public tuition under RA 10931, degree offerings, campus locations, and official admission requirements.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>12 Major Regional HEIs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free SUC Access (RA 10931)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified 2026 Admissions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by school, acronym, course (e.g. WMSU, Marine, Nursing)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3267D5]"
            />
          </div>

          {/* Province Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5] cursor-pointer shadow-xs"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov === 'All' ? 'All Locations (Region IX)' : prov}
                </option>
              ))}
            </select>
          </div>

          {/* Institution Type Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5] cursor-pointer shadow-xs"
            >
              {institutionTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All School Types' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Tuition Model Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedTuition}
              onChange={(e) => setSelectedTuition(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5] cursor-pointer shadow-xs"
            >
              <option value="All">All Tuition Models</option>
              <option value="Free SUC">Free SUC (RA 10931)</option>
              <option value="Private">Private / Scholarships</option>
            </select>
          </div>

        </div>

        {/* Filter count indicators */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Showing <strong className="text-slate-900 dark:text-white">{filteredSchools.length}</strong> institutions matching criteria</span>
          {(searchQuery || selectedProvince !== 'All' || selectedType !== 'All' || selectedTuition !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedProvince('All');
                setSelectedType('All');
                setSelectedTuition('All');
              }}
              className="text-[#3267D5] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSchools.map((school) => {
          const isSaved = savedSchoolIds.includes(school.id);

          return (
            <div
              key={school.id}
              className="animated-bg-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
            >
              {/* Image & Header */}
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={school.imageUrl}
                    alt={`${school.name} campus in ${school.provinceOrCity}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 border border-white/20">
                      Est. {school.foundedYear}
                    </span>
                    
                    {onToggleSaveSchool && (
                      <button
                        onClick={() => onToggleSaveSchool(school.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isSaved 
                            ? 'bg-[#3267D5] text-white shadow-md' 
                            : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-white'
                        }`}
                        title={isSaved ? 'Remove from saved schools' : 'Save to my target colleges'}
                        aria-label="Save school"
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    )}
                  </div>

                  {/* Bottom Title inside Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{school.provinceOrCity}</span>
                      <span aria-hidden="true">·</span>
                      <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-200 border border-emerald-500/30">
                        {school.tuitionModel}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-display leading-tight drop-shadow-sm">
                      {school.name} ({school.acronym})
                    </h2>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 space-y-4">
                  {/* Historical Heritage Snippet */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-[#3267D5]" />
                      <span>Historical Heritage & Background</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {school.historicalHeritage}
                    </p>
                  </div>

                  {/* Population & Address */}
                  <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-slate-400 font-medium">Institution Type</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{school.institutionType}</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-slate-400 font-medium">Est. Student Body</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{school.studentPopulation.split(' ')[0]}</p>
                    </div>
                  </div>

                  {/* Featured Program Offerings */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Key Degree Offerings ({school.programsOffered.length})
                      </span>
                      <span className="text-[11px] text-[#168C80] font-medium">
                        DepEd K-12 Aligned
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {school.programsOffered.slice(0, 4).map((prog) => (
                        <span
                          key={prog.code}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#3267D5] dark:text-[#60A5FA] border border-blue-100 dark:border-blue-900/40"
                          title={prog.name}
                        >
                          {prog.code} · {prog.degreeType}
                        </span>
                      ))}
                      {school.programsOffered.length > 4 && (
                        <span className="px-2 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          +{school.programsOffered.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between gap-3 text-xs">
                <a
                  href={school.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#3267D5] hover:border-[#3267D5] transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedSchoolModal(school)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3267D5] to-[#2552B5] hover:opacity-95 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>View All Details & Courses</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal for Selected School */}
      {selectedSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#168C80]">
                  <span>{selectedSchoolModal.provinceOrCity}</span>
                  <span aria-hidden="true">·</span>
                  <span>Founded {selectedSchoolModal.foundedYear}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-[#3267D5]">{selectedSchoolModal.tuitionModel}</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {selectedSchoolModal.name} ({selectedSchoolModal.acronym})
                </h2>
                <p className="text-xs text-slate-500">
                  Main Campus: {selectedSchoolModal.mainCampusAddress}
                </p>
              </div>

              <button
                onClick={() => setSelectedSchoolModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* School History */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#3267D5]" />
                Institutional History & Heritage
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedSchoolModal.historicalHeritage}
              </p>
              {selectedSchoolModal.famousAlumniOrHighlight && (
                <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60">
                  <strong className="text-slate-800 dark:text-slate-200">Notable Distinctions:</strong> {selectedSchoolModal.famousAlumniOrHighlight}
                </div>
              )}
            </div>

            {/* Satellite Campuses (if any) */}
            {selectedSchoolModal.satelliteCampuses.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Campuses & Extension Units:
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedSchoolModal.satelliteCampuses.map((campus, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
                    >
                      {campus}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Admission Requirements */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                Admission Requirements & Credentials
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedSchoolModal.admissionRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Program Offerings */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#3267D5]" />
                Featured Academic Degree Offerings
              </h3>

              <div className="space-y-3">
                {selectedSchoolModal.programsOffered.map((prog) => (
                  <div
                    key={prog.code}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-bold bg-[#3267D5] text-white rounded">
                          {prog.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {prog.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-semibold text-[#168C80] bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
                          {prog.chedStatus}
                        </span>
                        {prog.isDostPriority && (
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            DOST Priority
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {prog.description}
                    </p>

                    {prog.boardExamHighlight && (
                      <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-xl flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>{prog.boardExamHighlight}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Senior High Track:</span>
                      <span>{prog.strandAlignment.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={selectedSchoolModal.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#3267D5] text-white font-semibold text-xs rounded-xl hover:opacity-95 flex items-center gap-2"
              >
                <span>Visit Official University Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedSchoolModal(null)}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
