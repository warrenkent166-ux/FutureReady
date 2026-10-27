import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Settings, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  FileText, 
  Trash2, 
  Edit3, 
  Plus, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Search, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Bell, 
  GraduationCap, 
  Award, 
  Lightbulb, 
  X,
  Eye,
  Lock,
  ArrowRight,
  Shield,
  Download
} from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { 
  mockZamboangaSchools as initialSchools, 
  mockScholarships as initialScholarships, 
  mockTrainingIdeas as initialTraining,
  mockUsers 
} from '../../data/mockData';
import { ZamboangaSchool, ScholarshipInfo, StudentTrainingIdea, User, UserRole } from '../../types';

interface AdminCmsDashboardProps {
  onNavigateHome: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const AdminCmsDashboard: React.FC<AdminCmsDashboardProps> = ({
  onNavigateHome,
  onNavigateToTab,
}) => {
  const { siteConfig, updateSiteConfig, resetSiteConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'branding' | 'contact' | 'banner' | 'schools' | 'scholarships' | 'skills' | 'users' | 'audit'>('branding');

  // Form states for branding & site config
  const [siteName, setSiteName] = useState(siteConfig.siteName);
  const [tagline, setTagline] = useState(siteConfig.tagline);
  const [logoType, setLogoType] = useState<'icon' | 'image'>(siteConfig.logoType);
  const [logoPreview, setLogoPreview] = useState<string>(siteConfig.logoUrl || '');
  const [primaryColor, setPrimaryColor] = useState(siteConfig.primaryColorHex);
  const [accentColor, setAccentColor] = useState(siteConfig.accentColorHex);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for contact info
  const [contactEmail, setContactEmail] = useState(siteConfig.contactEmail);
  const [counselorEmail, setCounselorEmail] = useState(siteConfig.counselorEmail);
  const [dpoEmail, setDpoEmail] = useState(siteConfig.dpoEmail);
  const [supportPhone, setSupportPhone] = useState(siteConfig.supportPhone);
  const [officeAddress, setOfficeAddress] = useState(siteConfig.officeAddress);
  const [facebookLink, setFacebookLink] = useState(siteConfig.socialLinks.facebook || '');
  const [twitterLink, setTwitterLink] = useState(siteConfig.socialLinks.twitter || '');
  const [depedPortalLink, setDepedPortalLink] = useState(siteConfig.socialLinks.depedPortal || '');

  // Form states for banner
  const [bannerEnabled, setBannerEnabled] = useState(siteConfig.announcementBanner?.enabled ?? true);
  const [bannerText, setBannerText] = useState(siteConfig.announcementBanner?.text || '');
  const [bannerLinkLabel, setBannerLinkLabel] = useState(siteConfig.announcementBanner?.linkLabel || 'View Details');
  const [bannerLinkUrl, setBannerLinkUrl] = useState(siteConfig.announcementBanner?.linkUrl || 'scholarships');
  const [bannerType, setBannerType] = useState<'info' | 'success' | 'alert'>(siteConfig.announcementBanner?.type || 'success');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Content state (persisted in localStorage or initial data)
  const [schools, setSchools] = useState<ZamboangaSchool[]>(() => {
    try {
      const stored = localStorage.getItem('cms_zamboanga_schools');
      return stored ? JSON.parse(stored) : initialSchools;
    } catch {
      return initialSchools;
    }
  });

  const [scholarships, setScholarships] = useState<ScholarshipInfo[]>(() => {
    try {
      const stored = localStorage.getItem('cms_scholarships');
      return stored ? JSON.parse(stored) : initialScholarships;
    } catch {
      return initialScholarships;
    }
  });

  const [trainingIdeas, setTrainingIdeas] = useState<StudentTrainingIdea[]>(() => {
    try {
      const stored = localStorage.getItem('cms_training_ideas');
      return stored ? JSON.parse(stored) : initialTraining;
    } catch {
      return initialTraining;
    }
  });

  // Users state
  const [usersList, setUsersList] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('cms_users_list');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return Object.values(mockUsers);
  });

  const [userSearch, setUserSearch] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');

  // Modals for CRUD
  const [editingSchool, setEditingSchool] = useState<ZamboangaSchool | null>(null);
  const [isNewSchool, setIsNewSchool] = useState(false);

  const [editingScholarship, setEditingScholarship] = useState<ScholarshipInfo | null>(null);
  const [isNewScholarship, setIsNewScholarship] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  // Logo file upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size exceeds 2MB limit. Please compress or select a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoPreview(result);
      setLogoType('image');
      showToast('Logo image loaded. Click "Save Branding Changes" to apply.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBranding = () => {
    updateSiteConfig({
      siteName: siteName.trim() || 'FutureReady PH',
      tagline: tagline.trim(),
      logoUrl: logoPreview,
      logoType,
      primaryColorHex: primaryColor,
      accentColorHex: accentColor,
    });
    showToast('Branding, logo, and site name updated successfully!');
  };

  const handleSaveContact = () => {
    updateSiteConfig({
      contactEmail: contactEmail.trim(),
      counselorEmail: counselorEmail.trim(),
      dpoEmail: dpoEmail.trim(),
      supportPhone: supportPhone.trim(),
      officeAddress: officeAddress.trim(),
      socialLinks: {
        facebook: facebookLink.trim(),
        twitter: twitterLink.trim(),
        depedPortal: depedPortalLink.trim(),
      },
    });
    showToast('Institutional contact information updated successfully!');
  };

  const handleSaveBanner = () => {
    updateSiteConfig({
      announcementBanner: {
        enabled: bannerEnabled,
        text: bannerText.trim(),
        linkLabel: bannerLinkLabel.trim(),
        linkUrl: bannerLinkUrl.trim(),
        type: bannerType,
      },
    });
    showToast('Global announcement alert banner updated!');
  };

  // School CRUD
  const saveSchool = (school: ZamboangaSchool) => {
    let updated: ZamboangaSchool[];
    if (isNewSchool) {
      updated = [school, ...schools];
    } else {
      updated = schools.map(s => s.id === school.id ? school : s);
    }
    setSchools(updated);
    localStorage.setItem('cms_zamboanga_schools', JSON.stringify(updated));
    setEditingSchool(null);
    showToast(`Institution "${school.name}" successfully saved!`);
  };

  const deleteSchool = (id: string) => {
    if (confirm('Are you sure you want to delete this school from the directory?')) {
      const updated = schools.filter(s => s.id !== id);
      setSchools(updated);
      localStorage.setItem('cms_zamboanga_schools', JSON.stringify(updated));
      showToast('Institution removed from directory.');
    }
  };

  // Scholarship CRUD
  const saveScholarship = (sch: ScholarshipInfo) => {
    let updated: ScholarshipInfo[];
    if (isNewScholarship) {
      updated = [sch, ...scholarships];
    } else {
      updated = scholarships.map(s => s.id === sch.id ? sch : s);
    }
    setScholarships(updated);
    localStorage.setItem('cms_scholarships', JSON.stringify(updated));
    setEditingScholarship(null);
    showToast(`Scholarship "${sch.title}" successfully saved!`);
  };

  const deleteScholarship = (id: string) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      const updated = scholarships.filter(s => s.id !== id);
      setScholarships(updated);
      localStorage.setItem('cms_scholarships', JSON.stringify(updated));
      showToast('Scholarship removed from directory.');
    }
  };

  // User CRUD
  const saveUser = (u: User) => {
    let updated: User[];
    if (isNewUser) {
      updated = [u, ...usersList];
    } else {
      updated = usersList.map(item => item.id === u.id ? u : item);
    }
    setUsersList(updated);
    localStorage.setItem('cms_users_list', JSON.stringify(updated));
    setEditingUser(null);
    showToast(`User account "${u.name}" (${u.role}) updated!`);
  };

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user account? This cannot be undone.')) {
      const updated = usersList.filter(u => u.id !== id);
      setUsersList(updated);
      localStorage.setItem('cms_users_list', JSON.stringify(updated));
      showToast('User account successfully removed.');
    }
  };

  // Export roster to JSON
  const handleExportRoster = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(usersList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `futureready_users_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Cohort roster exported to JSON!');
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.schoolName.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.lrn && u.lrn.includes(userSearch));
    const matchesRole = selectedRoleFilter === 'All' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A101D] text-slate-800 dark:text-slate-100 pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14243A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#14243A] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3267D5] to-[#168C80] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base tracking-tight">Admin CMS Portal</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Content Management & System Configuration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset site settings to default FutureReady PH configuration?')) {
                  resetSiteConfig();
                  setSiteName('FutureReady PH');
                  setTagline('Discover Your Potential. Design Your Future.');
                  setLogoPreview('');
                  setLogoType('icon');
                  showToast('Site settings reset to defaults.');
                }
              }}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Reset site configuration to factory defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5 text-xs font-semibold">
            {[
              { id: 'branding', label: 'Site Name & Logo', icon: ImageIcon },
              { id: 'contact', label: 'Contact & Institutional Info', icon: Mail },
              { id: 'banner', label: 'Alert Banner', icon: Bell },
              { id: 'schools', label: 'Zamboanga Schools CMS', icon: Building2 },
              { id: 'scholarships', label: 'Scholarships CMS', icon: Award },
              { id: 'skills', label: 'Training & Ideas CMS', icon: Lightbulb },
              { id: 'users', label: 'User Accounts & Roles', icon: Users },
              { id: 'audit', label: 'Security & Audit Logs', icon: Shield },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-[#3267D5] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main CMS Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: BRANDING, LOGO UPLOAD & SITE NAME */}
        {/* ======================================================== */}
        {activeTab === 'branding' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Brand Identity & Logo Configuration
              </h2>
              <p className="text-xs text-slate-500">
                Upload your school/institutional logo, customize the platform title, and refine the primary color scheme.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Controls */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                
                {/* 1. Logo Upload Section */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Platform Logo
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                    
                    {/* Logo display */}
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden p-2 shadow-xs shrink-0">
                      {logoType === 'image' && logoPreview ? (
                        <img src={logoPreview} alt="Site Logo" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#3267D5] to-[#168C80] flex items-center justify-center text-white">
                          <Building2 className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Upload custom logo image
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Supports PNG, JPG, SVG, WebP. Recommended size: 256×256px or transparent horizontal logo under 2MB.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 bg-[#3267D5] hover:bg-[#2552B5] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Logo File</span>
                        </button>

                        {logoPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setLogoPreview('');
                              setLogoType('icon');
                            }}
                            className="px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Site Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Platform Name (Title)
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="e.g. FutureReady PH or Zamboanga Student Hub"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5]"
                  />
                  <p className="text-[11px] text-slate-400">
                    This appears in the navigation bar, browser tab title, and generated portfolio sheets.
                  </p>
                </div>

                {/* 3. Tagline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Official Tagline & Motto
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Discover Your Potential. Design Your Future."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3267D5]"
                  />
                </div>

                {/* 4. Color Palette Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Primary Brand Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Accent Color (Growth Teal)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleSaveBranding}
                    className="px-6 py-3 bg-[#3267D5] hover:bg-[#2552B5] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Branding Changes</span>
                  </button>
                </div>

              </div>

              {/* Real-Time Live Preview Mockup Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider">Live Header Preview</span>
                  <span className="flex items-center gap-1 text-emerald-500 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Synchronized</span>
                  </span>
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
                  {/* Mock Navbar Preview */}
                  <div className="p-4 bg-[#F5F7FB] dark:bg-[#0E1724] rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {logoType === 'image' && logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-8 h-8 object-contain rounded-lg shadow-xs" />
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3267D5] to-[#168C80] flex items-center justify-center text-white shadow-sm">
                          <Building2 className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <span className="font-display font-bold text-sm text-[#14243A] dark:text-white">
                          {siteName || 'FutureReady PH'}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Schools</span>
                      <span>Scholarships</span>
                      <span className="text-[#3267D5] font-semibold">Sign In</span>
                    </div>
                  </div>

                  {/* Mock Hero Headline Preview */}
                  <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#168C80] uppercase tracking-wider">
                      Hero Banner Tagline
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      {siteName || 'FutureReady PH'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {tagline || 'Discover Your Potential. Design Your Future.'}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                    <p className="font-semibold">Persistence Note:</p>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                      All changes are saved automatically to your site's central configuration and persist across user sessions.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CONTACT & INSTITUTIONAL INFO */}
        {/* ======================================================== */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in max-w-4xl">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Contact & Institutional Information
              </h2>
              <p className="text-xs text-slate-500">
                Update official institutional email channels, telephone hotlines, physical office locations, and DepEd linkages.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* General Support Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#3267D5]" />
                    <span>General Inquiries Email</span>
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="support@futureready.ph"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  />
                </div>

                {/* Guidance Counseling Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#168C80]" />
                    <span>Guidance Counseling Desk Email</span>
                  </label>
                  <input
                    type="email"
                    value={counselorEmail}
                    onChange={(e) => setCounselorEmail(e.target.value)}
                    placeholder="guidance@futureready.ph"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  />
                </div>

                {/* DPO Privacy Officer Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Data Protection Officer (DPO)</span>
                  </label>
                  <input
                    type="email"
                    value={dpoEmail}
                    onChange={(e) => setDpoEmail(e.target.value)}
                    placeholder="dpo@futureready.ph"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  />
                </div>

                {/* Hotline Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Hotline Numbers</span>
                  </label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    placeholder="+63 (02) 8876-1234 / +63 917 555 4321"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  />
                </div>

              </div>

              {/* Physical Office Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Physical Address & Regional Headquarters</span>
                </label>
                <textarea
                  rows={2}
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="Street, City, Postal Code, Province"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                />
              </div>

              {/* Social Media & DepEd Links */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Official Channels & Portal Links
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Facebook Page URL</span>
                    <input
                      type="url"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      placeholder="https://facebook.com/..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Twitter / X URL</span>
                    <input
                      type="url"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                      placeholder="https://twitter.com/..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500">Official DepEd Portal</span>
                    <input
                      type="url"
                      value={depedPortalLink}
                      onChange={(e) => setDepedPortalLink(e.target.value)}
                      placeholder="https://deped.gov.ph"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleSaveContact}
                  className="px-6 py-3 bg-[#3267D5] hover:bg-[#2552B5] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ANNOUNCEMENT ALERT BANNER */}
        {/* ======================================================== */}
        {activeTab === 'banner' && (
          <div className="space-y-8 animate-in fade-in max-w-4xl">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Global Announcement Banner
              </h2>
              <p className="text-xs text-slate-500">
                Broadcast vital news, national application deadlines, and admission schedules across the top of all public pages.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Toggle Enable */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Enable Announcement Banner</span>
                  <p className="text-[11px] text-slate-500">When active, this banner appears at the very top of every page.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerEnabled}
                    onChange={(e) => setBannerEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#168C80]" />
                </label>
              </div>

              {/* Banner Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Announcement Message
                </label>
                <textarea
                  rows={2}
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder="e.g. DOST-SEI 2026 Undergraduate Scholarships are now accepting online applications!"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                />
              </div>

              {/* Action Button & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Call-to-Action Button Label
                  </label>
                  <input
                    type="text"
                    value={bannerLinkLabel}
                    onChange={(e) => setBannerLinkLabel(e.target.value)}
                    placeholder="e.g. View Scholarships"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Target Route / Destination Tab
                  </label>
                  <select
                    value={bannerLinkUrl}
                    onChange={(e) => setBannerLinkUrl(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white"
                  >
                    <option value="scholarships">Scholarships Directory</option>
                    <option value="zamboanga-schools">Zamboanga Colleges Directory</option>
                    <option value="training-ideas">Skills & Training Sandbox</option>
                    <option value="assessments">Assessment Center</option>
                  </select>
                </div>
              </div>

              {/* Banner Style Theme */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Banner Mood Theme
                </label>
                <div className="flex gap-4">
                  {[
                    { id: 'success', label: 'Success / Growth (Teal)', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                    { id: 'info', label: 'Official Notice (Blue)', color: 'border-blue-500 bg-blue-50 text-blue-900' },
                    { id: 'alert', label: 'Urgent Deadline (Amber)', color: 'border-amber-500 bg-amber-50 text-amber-900' },
                  ].map(style => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setBannerType(style.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        bannerType === style.id ? 'ring-2 ring-[#3267D5] border-transparent font-bold' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Preview of Top Banner</span>
                <div className={`p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs ${
                  bannerType === 'success' 
                    ? 'bg-emerald-600 text-white' 
                    : bannerType === 'info' 
                    ? 'bg-[#3267D5] text-white' 
                    : 'bg-amber-600 text-white'
                }`}>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 shrink-0" />
                    <span>{bannerText || 'Sample alert message text'}</span>
                  </div>
                  <span className="px-3 py-1 bg-white text-slate-900 rounded-lg font-bold text-[11px] shadow-xs">
                    {bannerLinkLabel} →
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleSaveBanner}
                  className="px-6 py-3 bg-[#3267D5] hover:bg-[#2552B5] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Announcement Banner</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: ZAMBOANGA SCHOOLS CMS (CRUD) */}
        {/* ======================================================== */}
        {activeTab === 'schools' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Zamboanga Peninsula Schools CMS
                </h2>
                <p className="text-xs text-slate-500">
                  Manage Region IX state universities, colleges, degree offerings, campus photos, and admissions criteria.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsNewSchool(true);
                  setEditingSchool({
                    id: `sch_custom_${Date.now()}`,
                    name: '',
                    acronym: '',
                    institutionType: 'State University',
                    provinceOrCity: 'Zamboanga City',
                    mainCampusAddress: '',
                    satelliteCampuses: [],
                    foundedYear: 2026,
                    historicalHeritage: '',
                    imageUrl: '/src/assets/images/campus_collaborative_commons_1793061153055.jpg',
                    officialWebsite: 'https://',
                    tuitionModel: 'Free SUC (RA 10931)',
                    studentPopulation: '5,000+ students',
                    admissionRequirements: ['DepEd Form 138 (Card)', 'PSA Birth Certificate'],
                    programsOffered: [],
                    famousAlumniOrHighlight: '',
                  });
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Institution</span>
              </button>
            </div>

            {/* Schools Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Institution Name</th>
                      <th className="px-4 py-4">Province / City</th>
                      <th className="px-4 py-4">Type</th>
                      <th className="px-4 py-4">Tuition Model</th>
                      <th className="px-4 py-4">Programs</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {schools.map(school => (
                      <tr key={school.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={school.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover shadow-xs shrink-0" />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{school.name}</p>
                              <p className="text-[11px] text-slate-400 font-medium">{school.acronym} · Est. {school.foundedYear}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium">{school.provinceOrCity}</td>
                        <td className="px-4 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold">
                            {school.institutionType}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200/50">
                            {school.tuitionModel}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold">{school.programsOffered.length} courses</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setIsNewSchool(false);
                                setEditingSchool({ ...school });
                              }}
                              className="p-2 text-slate-600 dark:text-slate-400 hover:text-[#3267D5] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                              title="Edit school"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSchool(school.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
                              title="Delete school"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SCHOLARSHIPS CMS (CRUD) */}
        {/* ======================================================== */}
        {activeTab === 'scholarships' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Scholarships & Grants CMS
                </h2>
                <p className="text-xs text-slate-500">
                  Update financial aid opportunities, monthly stipends, documentary checklists, and application links.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsNewScholarship(true);
                  setEditingScholarship({
                    id: `sch_custom_${Date.now()}`,
                    title: '',
                    provider: '',
                    category: 'National Government',
                    coverageBenefit: 'Full Tuition + Monthly Allowance',
                    monthlyStipendPhp: 5000,
                    tuitionCoverage: '100% Free Tuition',
                    eligibility: ['High school graduate with 85% GWA', 'Philippine citizen'],
                    requiredDocuments: ['Form 138 Report Card', 'PSA Birth Certificate'],
                    applicationPeriod: 'August annually',
                    officialPortalUrl: 'https://',
                    verifiedDate: '2026 Academic Year',
                    targetStrands: ['STEM', 'ABM', 'HUMSS'],
                    regionScope: 'Region IX Zamboanga Peninsula',
                    contactDetails: 'Scholarship Secretariat Office',
                    imageUrl: '/src/assets/images/philippine_scholarships_banner_1793064533344.jpg',
                    summary: '',
                  });
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Scholarship</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarships.map(sch => (
                <div
                  key={sch.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-[#3267D5] rounded-full text-[11px] font-bold">
                        {sch.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setIsNewScholarship(false);
                            setEditingScholarship({ ...sch });
                          }}
                          className="p-1.5 text-slate-500 hover:text-[#3267D5] hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Edit scholarship"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteScholarship(sch.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Delete scholarship"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {sch.title}
                    </h3>
                    <p className="text-xs text-slate-500">{sch.provider}</p>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                      <p><strong className="text-slate-800 dark:text-slate-200">Allowance:</strong> {sch.monthlyStipendPhp ? `₱${sch.monthlyStipendPhp.toLocaleString()} / mo` : 'Tuition waiver'}</p>
                      <p><strong className="text-slate-800 dark:text-slate-200">Tuition:</strong> {sch.tuitionCoverage}</p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {sch.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Target: {sch.targetStrands.join(', ')}</span>
                    <a
                      href={sch.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3267D5] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Portal Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: TRAINING & PRACTICAL SKILLS CMS */}
        {/* ======================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Student Applied Skills & Innovation Challenges
                </h2>
                <p className="text-xs text-slate-500">
                  Manage student micro-experiments, aligned certifications, and community context modules.
                </p>
              </div>

              <button
                onClick={() => {
                  const newIdea: StudentTrainingIdea = {
                    id: `trn_custom_${Date.now()}`,
                    title: 'New Community Investigatory Project',
                    category: 'Software & Microcontrollers',
                    targetStrand: 'STEM / TVL',
                    description: 'Description of the student challenge and community impact.',
                    durationWeeks: 4,
                    practicalMicroExperiments: ['Step 1: Prototype baseline test', 'Step 2: Collect community feedback'],
                    recommendedCertifications: ['TESDA NC II Certification', 'DOST Youth Badge'],
                    zamboangaLocalContext: 'Deployed across local barangay communities in Zamboanga Peninsula.',
                  };
                  const updated = [newIdea, ...trainingIdeas];
                  setTrainingIdeas(updated);
                  localStorage.setItem('cms_training_ideas', JSON.stringify(updated));
                  showToast('New training challenge added.');
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Training Challenge</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingIdeas.map((idea, idx) => (
                <div
                  key={idea.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-[#168C80] rounded-full text-[11px] font-bold">
                      {idea.category}
                    </span>
                    <button
                      onClick={() => {
                        const updated = trainingIdeas.filter(t => t.id !== idea.id);
                        setTrainingIdeas(updated);
                        localStorage.setItem('cms_training_ideas', JSON.stringify(updated));
                        showToast('Training challenge removed.');
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Local Context:</p>
                    <p className="text-slate-500">{idea.zamboangaLocalContext}</p>
                  </div>

                  <div className="text-xs text-slate-400">
                    {idea.practicalMicroExperiments.length} micro-experiments defined · {idea.durationWeeks} weeks
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: USER ACCOUNTS & ROLES MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  User Accounts & Role Permissions
                </h2>
                <p className="text-xs text-slate-500">
                  Manage student profiles, guidance counselors, teachers, and administrative role assignments under RA 10173.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportRoster}
                  className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => {
                    setIsNewUser(true);
                    setEditingUser({
                      id: `usr_new_${Date.now()}`,
                      name: '',
                      email: '',
                      role: 'student',
                      schoolName: 'Ramon Magsaysay High School',
                      schoolId: 'DEPED-NCR-300412',
                      gradeLevel: 'Grade 11',
                      strand: 'STEM',
                      lrn: '136589200459',
                      guardianConsent: true,
                    });
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#3267D5] to-[#168C80] hover:opacity-95 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create User Account</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name, email, school, or LRN..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="All">All User Roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="counselor">Guidance Counselor</option>
                <option value="admin">School Administrator</option>
                <option value="platform_admin">Platform Administrator</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-4 py-4">Role</th>
                      <th className="px-4 py-4">School & Details</th>
                      <th className="px-4 py-4">DepEd LRN / ID</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#3267D5] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                              {user.name.slice(0, 1)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                              <p className="text-[11px] text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            user.role === 'admin' || user.role === 'platform_admin'
                              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200'
                              : user.role === 'counselor'
                              ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200'
                              : user.role === 'teacher'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-800 dark:text-slate-200">{user.schoolName}</p>
                          {user.gradeLevel && (
                            <p className="text-[11px] text-slate-400">{user.gradeLevel} · {user.strand}</p>
                          )}
                        </td>
                        <td className="px-4 py-4 font-mono text-[11px] text-slate-500">
                          {user.lrn || user.schoolId || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setIsNewUser(false);
                                setEditingUser({ ...user });
                              }}
                              className="p-2 text-slate-600 dark:text-slate-400 hover:text-[#3267D5] hover:bg-slate-100 rounded-xl cursor-pointer"
                              title="Edit user details or role"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: SECURITY & AUDIT LOGS */}
        {/* ======================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in max-w-4xl">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                System Security & RA 10173 Audit Logs
              </h2>
              <p className="text-xs text-slate-500">
                Immutable activity trail tracking institutional exports, counseling notes, rubric grading, and administrative overrides.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Real-Time Audit Records</span>
                </span>
                <span className="text-[11px] text-slate-400">Compliant with Philippine Data Privacy Act of 2012</span>
              </div>

              <div className="space-y-3">
                {[
                  { actor: 'Platform Administrator', action: 'SITE_CONFIG_UPDATE', details: 'Branding logo and site title updated via Admin CMS', time: 'Just now' },
                  { actor: 'Dr. Roberto Reyes (School Admin)', action: 'COHORT_REPORT_EXPORT', details: 'Exported Grade 11 STEM college-readiness summary for DepEd Division', time: '3 hours ago' },
                  { actor: 'Ma\'am Elena Cruz, RGC', action: 'CONFIDENTIAL_NOTE_ADDED', details: 'Updated career exploration consultation notes for student LRN 136589200451', time: '5 hours ago' },
                  { actor: 'Sir Jerome Ramos (Teacher)', action: 'RUBRIC_SCORE_SUBMITTED', details: 'Graded Innovation Milestone: Prototyping for Team Nipa-BioPlastic', time: '1 day ago' },
                  { actor: 'System Daemon', action: 'AUTOMATED_BACKUP', details: 'Completed encrypted backup of regional school offerings and assessment results', time: 'Yesterday' }
                ].map((log, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{log.actor}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 dark:bg-blue-950/40 text-[#3267D5]">
                          {log.action}
                        </span>
                      </div>
                      <p className="text-slate-500">{log.details}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD SCHOOL */}
      {/* ======================================================== */}
      {editingSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNewSchool ? 'Add New Higher Education Institution' : `Edit ${editingSchool.name}`}
              </h3>
              <button onClick={() => setEditingSchool(null)} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Institution Name</label>
                  <input
                    type="text"
                    value={editingSchool.name}
                    onChange={(e) => setEditingSchool({ ...editingSchool, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Acronym</label>
                  <input
                    type="text"
                    value={editingSchool.acronym}
                    onChange={(e) => setEditingSchool({ ...editingSchool, acronym: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Province / City</label>
                  <select
                    value={editingSchool.provinceOrCity}
                    onChange={(e) => setEditingSchool({ ...editingSchool, provinceOrCity: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="Zamboanga City">Zamboanga City</option>
                    <option value="Zamboanga del Sur">Zamboanga del Sur</option>
                    <option value="Zamboanga del Norte">Zamboanga del Norte</option>
                    <option value="Zamboanga Sibugay">Zamboanga Sibugay</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Institution Type</label>
                  <select
                    value={editingSchool.institutionType}
                    onChange={(e) => setEditingSchool({ ...editingSchool, institutionType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="State University">State University</option>
                    <option value="State College">State College</option>
                    <option value="Private Sectarian">Private Sectarian</option>
                    <option value="Private Non-Sectarian">Private Non-Sectarian</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Main Campus Address</label>
                <input
                  type="text"
                  value={editingSchool.mainCampusAddress}
                  onChange={(e) => setEditingSchool({ ...editingSchool, mainCampusAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Historical Background & Heritage</label>
                <textarea
                  rows={3}
                  value={editingSchool.historicalHeritage}
                  onChange={(e) => setEditingSchool({ ...editingSchool, historicalHeritage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Official Website URL</label>
                  <input
                    type="url"
                    value={editingSchool.officialWebsite}
                    onChange={(e) => setEditingSchool({ ...editingSchool, officialWebsite: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Tuition Model</label>
                  <input
                    type="text"
                    value={editingSchool.tuitionModel}
                    onChange={(e) => setEditingSchool({ ...editingSchool, tuitionModel: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingSchool(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => editingSchool && saveSchool(editingSchool)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#3267D5] rounded-xl hover:bg-[#2552B5] cursor-pointer"
              >
                Save Institution
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD SCHOLARSHIP */}
      {/* ======================================================== */}
      {editingScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNewScholarship ? 'Add New Scholarship Program' : `Edit ${editingScholarship.title}`}
              </h3>
              <button onClick={() => setEditingScholarship(null)} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Scholarship Title</label>
                <input
                  type="text"
                  value={editingScholarship.title}
                  onChange={(e) => setEditingScholarship({ ...editingScholarship, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Provider / Agency</label>
                  <input
                    type="text"
                    value={editingScholarship.provider}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, provider: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={editingScholarship.category}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="National Government">National Government</option>
                    <option value="Provincial/LGU">Provincial/LGU</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Indigenous Peoples">Indigenous Peoples</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Stipend (Php)</label>
                  <input
                    type="number"
                    value={editingScholarship.monthlyStipendPhp || 0}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, monthlyStipendPhp: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Tuition Coverage</label>
                  <input
                    type="text"
                    value={editingScholarship.tuitionCoverage}
                    onChange={(e) => setEditingScholarship({ ...editingScholarship, tuitionCoverage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Summary & Benefits</label>
                <textarea
                  rows={3}
                  value={editingScholarship.summary}
                  onChange={(e) => setEditingScholarship({ ...editingScholarship, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Official Portal URL</label>
                <input
                  type="url"
                  value={editingScholarship.officialPortalUrl}
                  onChange={(e) => setEditingScholarship({ ...editingScholarship, officialPortalUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingScholarship(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => editingScholarship && saveScholarship(editingScholarship)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#3267D5] rounded-xl hover:bg-[#2552B5] cursor-pointer"
              >
                Save Scholarship
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT / ADD USER */}
      {/* ======================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNewUser ? 'Create New User Account' : `Edit User: ${editingUser.name}`}
              </h3>
              <button onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="counselor">Guidance Counselor</option>
                    <option value="admin">School Administrator</option>
                    <option value="platform_admin">Platform Administrator</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">DepEd LRN</label>
                  <input
                    type="text"
                    value={editingUser.lrn || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, lrn: e.target.value })}
                    placeholder="12-digit LRN"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">School / Division</label>
                <input
                  type="text"
                  value={editingUser.schoolName}
                  onChange={(e) => setEditingUser({ ...editingUser, schoolName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              {editingUser.role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Grade Level</label>
                    <input
                      type="text"
                      value={editingUser.gradeLevel || 'Grade 11'}
                      onChange={(e) => setEditingUser({ ...editingUser, gradeLevel: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Academic Strand</label>
                    <input
                      type="text"
                      value={editingUser.strand || 'STEM'}
                      onChange={(e) => setEditingUser({ ...editingUser, strand: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    />
                  </div>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => editingUser && saveUser(editingUser)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#3267D5] rounded-xl hover:bg-[#2552B5] cursor-pointer"
              >
                Save User Account
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
