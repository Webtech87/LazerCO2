// src/components/CookiesBanner/types.ts

export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    personalization: boolean;
  }
  
  export interface CookiesBannerProps {
    companyName?: string;
    privacyPolicyUrl?: string;
    onAccept?: (preferences: CookiePreferences) => void;
    onReject?: () => void;
    customMessage?: string;
  }
  
  export interface CookieType {
    key: keyof CookiePreferences;
    title: string;
    description: string;
    required: boolean;
  }
  
  export type CookieChoice = 'accepted' | 'rejected' | 'custom' | null;