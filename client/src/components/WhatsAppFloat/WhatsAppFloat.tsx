// src/components/WhatsAppFloat/WhatsAppFloat.tsx
import React, { useState } from 'react';
import type { WhatsAppFloatProps, AnalyticsEvent } from './types';
import './WhatsAppFloat.css'; // Import the CSS file

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  phoneNumber = "351910966393",
  message = "Olá! Gostaria de saber mais sobre os tratamentos da SantiClinic.",
  showBadge: initialShowBadge = true,
  position = 'bottom-right',
  size = 'medium',
  className = '',
  tooltipText = 'Fale connosco no WhatsApp',
  enableAnalytics = true,
  onAnalyticsEvent,
}) => {
  const [showBadge, setShowBadge] = useState<boolean>(initialShowBadge);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Create WhatsApp URL
  const whatsappUrl: string = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Handle click event
  const handleClick = (): void => {
    console.log('WhatsApp button clicked');
    
    // Remove badge on click
    setShowBadge(false);
    
    // Analytics tracking
    if (enableAnalytics && onAnalyticsEvent) {
      const analyticsEvent: AnalyticsEvent = {
        action: 'whatsapp_click',
        category: 'contact',
        label: 'floating_button',
        value: 1
      };
      onAnalyticsEvent(analyticsEvent);
    }
  };

  // Handle mouse enter
  const handleMouseEnter = (): void => {
    setIsHovered(true);
    
    // Remove badge after first hover with delay
    if (showBadge) {
      setTimeout(() => setShowBadge(false), 1000);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  // Get position classes
  const getPositionClasses = (): string => {
    switch (position) {
      case 'bottom-left':
        return 'position-bottom-left';
      case 'top-right':
        return 'position-top-right';
      case 'top-left':
        return 'position-top-left';
      default:
        return 'position-bottom-right';
    }
  };

  // Get size classes
  const getSizeClasses = (): { container: string; icon: string; badge: string } => {
    switch (size) {
      case 'small':
        return {
          container: 'size-small-container',
          icon: 'size-small-icon',
          badge: 'size-small-badge'
        };
      case 'large':
        return {
          container: 'size-large-container',
          icon: 'size-large-icon',
          badge: 'size-large-badge'
        };
      default:
        return {
          container: 'size-medium-container',
          icon: 'size-medium-icon',
          badge: 'size-medium-badge'
        };
    }
  };

  const positionClasses = getPositionClasses();
  const sizeClasses = getSizeClasses();

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div 
        className={`whatsapp-float ${positionClasses} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={whatsappUrl}
          className={`whatsapp-btn ${sizeClasses.container}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar via WhatsApp"
          onClick={handleClick}
        >
          {/* Notification Badge - Removed */}
          
          {/* WhatsApp Icon */}
          <svg 
            className={`whatsapp-icon ${sizeClasses.icon}`} 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
          </svg>

          {/* Shimmer Effect */}
          <div 
            className={`shimmer-effect ${isHovered ? 'shimmer-active' : ''}`}
          />
        </a>

        {/* Tooltip */}
        {position.includes('right') && (
          <div 
            className={`tooltip tooltip-right ${
              isHovered ? 'tooltip-visible' : 'tooltip-hidden'
            }`}
          >
            {tooltipText}
          </div>
        )}
        
        {position.includes('left') && (
          <div 
            className={`tooltip tooltip-left ${
              isHovered ? 'tooltip-visible' : 'tooltip-hidden'
            }`}
          >
            {tooltipText}
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppFloat;