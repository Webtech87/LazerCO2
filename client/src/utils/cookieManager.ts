// src/utils/cookieManager.ts
import type { CookiePreferences, CookieChoice } from '../components/CookiesBanner/types';

/**
 * Get stored cookie preferences from localStorage
 */
export const getCookiePreferences = (companyName: string = 'santiclinic'): CookiePreferences | null => {
  try {
    const preferences = localStorage.getItem(`${companyName.toLowerCase()}-cookie-preferences`);
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
    return null;
  }
};

/**
 * Get cookie choice status
 */
export const getCookieChoice = (companyName: string = 'santiclinic'): CookieChoice => {
  try {
    return localStorage.getItem(`${companyName.toLowerCase()}-cookie-choice`) as CookieChoice;
  } catch (error) {
    console.error('Error reading cookie choice:', error);
    return null;
  }
};

/**
 * Check if user has made any cookie decision
 */
export const hasUserMadeCookieChoice = (companyName: string = 'santiclinic'): boolean => {
  return getCookieChoice(companyName) !== null;
};

/**
 * Initialize analytics services based on cookie preferences
 */
export const initializeAnalytics = (preferences: CookiePreferences) => {
  if (preferences.analytics) {
    // Initialize Google Analytics
    console.log('Initializing Google Analytics...');
    
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        cookie_flags: 'max-age=7200;secure;samesite=none'
      });
    }
    
    // Example: Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cookie_consent_analytics',
        cookie_consent: 'granted'
      });
    }
  } else {
    console.log('Analytics cookies rejected');
    
    // Disable analytics if previously enabled
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        cookie_flags: 'max-age=0'
      });
    }
  }
};

/**
 * Initialize marketing services based on cookie preferences
 */
export const initializeMarketing = (preferences: CookiePreferences) => {
  if (preferences.marketing) {
    console.log('Initializing Marketing tools...');
    
    // Example: Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'grant');
      window.fbq('track', 'PageView');
    }
    
    // Example: Google Ads
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'AW-CONVERSION_ID');
    }
    
    // Example: LinkedIn Insight Tag
    // if (typeof _linkedin_partner_id !== 'undefined') {
    //   // Initialize LinkedIn tracking
    // }
  } else {
    console.log('Marketing cookies rejected');
    
    // Disable marketing tools
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'revoke');
    }
  }
};

/**
 * Initialize personalization services
 */
export const initializePersonalization = (preferences: CookiePreferences) => {
  if (preferences.personalization) {
    console.log('Initializing Personalization...');
    
    // Example: User preference tracking
    // Example: A/B testing tools
    // Example: Chatbot personalization
  } else {
    console.log('Personalization cookies rejected');
    
    // Clear personalization data
    try {
      localStorage.removeItem('user-preferences');
      localStorage.removeItem('ab-test-variant');
    } catch (error) {
      console.error('Error clearing personalization data:', error);
    }
  }
};

/**
 * Initialize all services based on cookie preferences
 */
export const initializeServices = (preferences: CookiePreferences) => {
  console.log('Initializing services with preferences:', preferences);
  
  // Always initialize necessary services
  console.log('Initializing necessary services...');
  
  // Initialize optional services based on preferences
  initializeAnalytics(preferences);
  initializeMarketing(preferences);
  initializePersonalization(preferences);
  
  // Save initialization timestamp
  try {
    localStorage.setItem('services-initialized', new Date().toISOString());
  } catch (error) {
    console.error('Error saving initialization timestamp:', error);
  }
};

/**
 * Clear all tracking cookies and data
 */
export const clearTrackingData = (companyName: string = 'santiclinic') => {
  try {
    // Clear localStorage items
    const keysToRemove = [
      `${companyName.toLowerCase()}-cookie-preferences`,
      `${companyName.toLowerCase()}-cookie-choice`,
      'user-preferences',
      'ab-test-variant',
      'services-initialized'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear analytics cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      
      // Clear Google Analytics cookies
      if (name.trim().startsWith('_ga') || 
          name.trim().startsWith('_gtag') || 
          name.trim().startsWith('_gcl')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
      
      // Clear Facebook cookies
      if (name.trim().startsWith('_fbp') || 
          name.trim().startsWith('_fbc')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });
    
    console.log('Tracking data cleared successfully');
  } catch (error) {
    console.error('Error clearing tracking data:', error);
  }
};

/**
 * Reset cookie banner (useful for testing)
 */
export const resetCookieBanner = (companyName: string = 'santiclinic') => {
  try {
    localStorage.removeItem(`${companyName.toLowerCase()}-cookie-choice`);
    localStorage.removeItem(`${companyName.toLowerCase()}-cookie-preferences`);
    console.log('Cookie banner reset - will show on next page load');
  } catch (error) {
    console.error('Error resetting cookie banner:', error);
  }
};

/**
 * Export preferences to JSON (for compliance/audit purposes)
 */
export const exportCookiePreferences = (companyName: string = 'santiclinic') => {
  const preferences = getCookiePreferences(companyName);
  const choice = getCookieChoice(companyName);
  
  const exportData = {
    timestamp: new Date().toISOString(),
    company: companyName,
    choice: choice,
    preferences: preferences,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  return JSON.stringify(exportData, null, 2);
};