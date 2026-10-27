import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types';

export const defaultSiteConfig: SiteConfig = {
  siteName: 'FutureReady PH',
  tagline: 'Discover Your Potential. Design Your Future.',
  logoUrl: '',
  logoType: 'icon',
  faviconUrl: '',
  contactEmail: 'support@futureready.ph',
  counselorEmail: 'guidance@futureready.ph',
  dpoEmail: 'dpo@futureready.ph',
  supportPhone: '+63 (02) 8876-1234 / +63 917 555 4321',
  officeAddress: 'DepEd Complex, Meralco Avenue, Pasig City / Region IX Regional Office, Baliwasan Chico, Zamboanga City',
  announcementBanner: {
    enabled: false,
    text: '2026 DOST-SEI S&T Scholarship & CHED UniFAST Free Higher Education applications are now active for Region IX learners!',
    linkUrl: 'scholarships',
    linkLabel: 'View Scholarships',
    type: 'success',
  },
  socialLinks: {
    facebook: 'https://facebook.com/futurereadyph',
    twitter: 'https://twitter.com/futurereadyph',
    linkedin: 'https://linkedin.com/company/futurereadyph',
    depedPortal: 'https://deped.gov.ph',
  },
  primaryColorHex: '#3267D5',
  accentColorHex: '#168C80',
  enablePublicRegistration: true,
  maintenanceMode: false,
  lastUpdated: 'April 2026',
};

interface SiteConfigContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  resetSiteConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem('futureready_site_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        return { 
          ...defaultSiteConfig, 
          ...parsed,
          announcementBanner: {
            ...defaultSiteConfig.announcementBanner,
            ...(parsed.announcementBanner || {}),
            enabled: parsed.announcementBanner?.enabled ?? false,
          }
        };
      }
    } catch {
      // fallback to default
    }
    return defaultSiteConfig;
  });

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => {
      const updated = {
        ...prev,
        ...updates,
        lastUpdated: new Date().toLocaleDateString('en-PH', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        }),
      };
      localStorage.setItem('futureready_site_config', JSON.stringify(updated));
      return updated;
    });
  };

  const resetSiteConfig = () => {
    localStorage.removeItem('futureready_site_config');
    setSiteConfig(defaultSiteConfig);
  };

  return (
    <SiteConfigContext.Provider value={{ siteConfig, updateSiteConfig, resetSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
