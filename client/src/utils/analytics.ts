// src/utils/analytics.ts

import type { AnalyticsEvent } from '../components/WhatsAppFloat/types';

// Safe analytics utility functions
export class Analytics {
  
  // Google Analytics 4 tracking
  static trackEvent(event: AnalyticsEvent): void {
    try {
      // Check for gtag on window object
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        });
        console.log('✅ GA4 Event tracked:', event);
        return;
      }
      
      console.log('ℹ️ GA4 not available, event logged:', event);
    } catch (error) {
      console.warn('⚠️ GA4 tracking failed:', error);
    }
  }
  
  // Facebook Pixel tracking
  static trackFacebookEvent(eventName: string, parameters?: Record<string, any>): void {
    try {
      // Check for fbq on window object
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, parameters);
        console.log('✅ Facebook Pixel tracked:', eventName, parameters);
        return;
      }
      
      console.log('ℹ️ Facebook Pixel not available, event logged:', eventName, parameters);
    } catch (error) {
      console.warn('⚠️ Facebook Pixel tracking failed:', error);
    }
  }
  
  // WhatsApp specific tracking
  static trackWhatsAppClick(event: AnalyticsEvent): void {
    console.log('📱 WhatsApp button clicked:', event);
    
    // Google Analytics
    this.trackEvent(event);
    
    // Facebook Pixel
    this.trackFacebookEvent('Contact', {
      content_name: 'WhatsApp Button',
      content_category: 'Contact Form',
      event_label: event.label,
    });
    
    // Custom tracking (your own API)
    this.trackCustomEvent(event);
  }
  
  // Custom analytics endpoint
  static async trackCustomEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const analyticsData = {
        event_type: 'whatsapp_interaction',
        ...event,
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      };
      
      console.log('📊 Custom analytics event:', analyticsData);
      
      // Uncomment when you have an analytics API endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(analyticsData),
      // });
      
    } catch (error) {
      console.warn('⚠️ Custom analytics failed:', error);
    }
  }
  
  // Check if analytics are available
  static isGoogleAnalyticsAvailable(): boolean {
    return !!(typeof window !== 'undefined' && window.gtag);
  }
  
  static isFacebookPixelAvailable(): boolean {
    return !!(typeof window !== 'undefined' && window.fbq);
  }
  
  // Get analytics status
  static getAnalyticsStatus(): { ga4: boolean; fbPixel: boolean } {
    return {
      ga4: this.isGoogleAnalyticsAvailable(),
      fbPixel: this.isFacebookPixelAvailable(),
    };
  }
}

// Export individual functions for convenience
export const {
  trackEvent,
  trackFacebookEvent,
  trackWhatsAppClick,
  trackCustomEvent,
  isGoogleAnalyticsAvailable,
  isFacebookPixelAvailable,
  getAnalyticsStatus,
} = Analytics;