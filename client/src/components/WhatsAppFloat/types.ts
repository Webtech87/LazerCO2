// src/components/WhatsAppFloat/types.ts

export interface WhatsAppFloatProps {
    phoneNumber?: string;
    message?: string;
    showBadge?: boolean;
    badgeText?: string | number;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size?: 'small' | 'medium' | 'large';
    className?: string;
    tooltipText?: string;
    enableAnalytics?: boolean;
    onAnalyticsEvent?: (event: AnalyticsEvent) => void;
  }
  
  export interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }