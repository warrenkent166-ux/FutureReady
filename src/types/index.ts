export type UserRole = 'student' | 'teacher' | 'counselor' | 'admin' | 'platform_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  schoolName: string;
  schoolId: string;
  gradeLevel?: string; // 'Grade 7' to 'Grade 12'
  strand?: string; // 'STEM' | 'ABM' | 'HUMSS' | 'GAS' | 'TVL-ICT' | 'TVL-HE' | 'General'
  lrn?: string; // Learner Reference Number (DepEd 12-digit)
  guardianConsent?: boolean;
  guardianEmail?: string;
  bio?: string;
}

export type AssessmentCategory = 'logic' | 'academic' | 'interest' | 'creativity' | 'study_habits' | 'marine_blue_economy' | 'cet_drill' | 'multilingual_logic';

export interface QuestionOption {
  id: string;
  text: string;
  scoreDimension?: string; // e.g., 'Realistic' or 'Analytical'
  isCorrect?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'likert_scale' | 'scenario_challenge';
  options: QuestionOption[];
  correctOptionId?: string;
  explanation?: string;
  dimension: string;
}

export interface AssessmentDefinition {
  id: string;
  title: string;
  category: AssessmentCategory;
  shortDescription: string;
  fullDescription: string;
  version: string;
  durationMinutes: number;
  questionCount: number;
  whatItMeasures: string;
  whatItDoesNotMeasure: string;
  questions: AssessmentQuestion[];
  instructions: string[];
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  completedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  dimensionBreakdown: Record<string, number>;
  recommendations: string[];
  userResponses: Record<string, string>; // questionId -> optionId
}

export interface CollegeProgram {
  id: string;
  name: string;
  degreeType: 'BS' | 'BA' | 'BFA' | 'BTech';
  university: string;
  acronym: string;
  campus: string;
  region: string; // 'NCR' | 'Region IV-A' | 'Region VII' | etc.
  strandAlignment: string[];
  chedStatus: 'Center of Excellence' | 'Center of Development' | 'Recognized';
  isDostPriority: boolean;
  tuitionBracket: 'Free Higher Education (RA 10931)' | 'Private Non-Sectarian' | 'Private Sectarian';
  tuitionPerSemPhp: string;
  officialWebsite: string;
  verifiedDate: string;
  overview: string;
  prerequisites: string[];
  careerOpportunities: string[];
  practicalHighSchoolExperiment: {
    title: string;
    description: string;
    timeRequired: string;
  };
}

export interface CareerPathway {
  id: string;
  title: string;
  strand: string;
  sector: string;
  growthOutlook: 'Very High Growth' | 'High Growth' | 'Stable Growth';
  startingSalaryPhpRange: string;
  summary: string;
  skillsInDemand: string[];
  philippineImpactAreas: string[];
  recommendedPrograms: string[];
  highSchoolActionItems: string[];
}

export type ProjectStage = 
  | '1_problem_identification' 
  | '2_research' 
  | '3_ideation' 
  | '4_prototyping' 
  | '5_testing' 
  | '6_showcase';

export interface ProjectMilestone {
  id: string;
  title: string;
  stage: ProjectStage;
  dueDate: string;
  completed: boolean;
  deliverable: string;
  feedback?: string;
  teacherVerified?: boolean;
}

export interface InnovationProject {
  id: string;
  title: string;
  strand: string;
  category: 'Community Engineering' | 'Agricultural Innovation' | 'Digital EdTech' | 'Public Health & Disaster' | 'Creative Arts';
  teamLead: string;
  teamMembers: string[];
  currentStage: ProjectStage;
  progressPercent: number;
  localCommunityProblem: string;
  solutionSummary: string;
  prototypeDetails: string;
  rubricScore?: {
    originality: number; // /25
    localRelevance: number; // /25
    technicalExecution: number; // /25
    scientificRigor: number; // /25
    total: number; // /100
  };
  milestones: ProjectMilestone[];
  imageUrl?: string;
  isPublicInShowcase: boolean;
  lastUpdated: string;
}

export interface DigitalPortfolioItem {
  id: string;
  title: string;
  category: 'Capstone Project' | 'Assessment Achievement' | 'Technical Certification' | 'Community Leadership';
  date: string;
  verifiedBy?: string;
  description: string;
  skillsDemonstrated: string[];
  attachmentName?: string;
}

export interface GrowthGoal {
  id: string;
  title: string;
  category: 'Academic Readiness' | 'Project Milestone' | 'Career Discovery' | 'Skill Challenge';
  targetDate: string;
  completed: boolean;
  progress: number;
  subtasks: { id: string; text: string; done: boolean }[];
}

export interface StudentCohortRecord {
  id: string;
  name: string;
  lrn: string;
  grade: string;
  strand: string;
  readinessScore: number;
  assessmentsCompleted: number;
  activeProjects: number;
  counselorFlag?: 'Normal' | 'Needs Consultation' | 'High Potential';
  lastActivity: string;
}

export interface ZamboangaProgramOffering {
  code: string;
  name: string;
  degreeType: 'BS' | 'BA' | 'BTVTED' | 'BTech' | 'MD' | 'LLB';
  strandAlignment: string[];
  chedStatus: 'Center of Excellence' | 'Center of Development' | 'Recognized';
  isDostPriority: boolean;
  boardExamHighlight?: string;
  description: string;
}

export interface ZamboangaSchool {
  id: string;
  name: string;
  acronym: string;
  institutionType: 'State University' | 'Private Sectarian' | 'Private Non-Sectarian' | 'State College';
  provinceOrCity: 'Zamboanga City' | 'Zamboanga del Sur' | 'Zamboanga del Norte' | 'Zamboanga Sibugay' | 'Isabela City';
  mainCampusAddress: string;
  satelliteCampuses: string[];
  foundedYear: number;
  historicalHeritage: string;
  imageUrl: string;
  officialWebsite: string;
  tuitionModel: 'Free SUC (RA 10931)' | 'Private with Generous Scholarships' | 'Subsidized LGU';
  studentPopulation: string;
  admissionRequirements: string[];
  programsOffered: ZamboangaProgramOffering[];
  famousAlumniOrHighlight: string;
}

export interface ScholarshipInfo {
  id: string;
  title: string;
  provider: string;
  category: 'National Government' | 'Provincial/LGU' | 'Institutional' | 'Private Foundation' | 'Indigenous Peoples';
  coverageBenefit: string;
  monthlyStipendPhp?: number;
  tuitionCoverage: string;
  bookAllowancePhp?: string;
  eligibility: string[];
  requiredDocuments: string[];
  applicationPeriod: string;
  officialPortalUrl: string;
  verifiedDate: string;
  targetStrands: string[];
  regionScope: string;
  contactDetails: string;
  imageUrl: string;
  summary: string;
}

export interface StudentTrainingIdea {
  id: string;
  title: string;
  category: 'Marine & Blue Economy' | 'Software & Microcontrollers' | 'Agri-Biotech & Rubber' | 'Indigenous Cultural Heritage' | 'Public Health & Nutrition';
  targetStrand: string;
  description: string;
  durationWeeks: number;
  practicalMicroExperiments: string[];
  recommendedCertifications: string[];
  zamboangaLocalContext: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  logoUrl?: string; // base64 data url or asset url
  logoType: 'icon' | 'image';
  faviconUrl?: string;
  contactEmail: string;
  counselorEmail: string;
  dpoEmail: string;
  supportPhone: string;
  officeAddress: string;
  announcementBanner?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
    linkLabel?: string;
    type: 'info' | 'success' | 'alert';
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    depedPortal?: string;
  };
  primaryColorHex: string;
  accentColorHex: string;
  enablePublicRegistration: boolean;
  maintenanceMode: boolean;
  lastUpdated: string;
}

