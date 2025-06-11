// src/components/VideoCarousel/VideoCarousel.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, VolumeX, Volume2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Types
interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface VideoCarouselProps {
  className?: string;
  videos?: VideoItem[];
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showProgressDots?: boolean;
  enableAutoPlay?: boolean;
}

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

interface NavigationProps {
  currentIndex: number;
  totalVideos: number;
  onPrevious: () => void;
  onNext: () => void;
}

interface ThumbnailNavigationProps {
  videos: VideoItem[];
  currentIndex: number;
  onVideoSelect: (index: number) => void;
}

interface ProgressIndicatorsProps {
  totalSlides: number;
  currentIndex: number;
  onSlideSelect: (index: number) => void;
}

// Default videos data with your YouTube Shorts URLs
const defaultVideos: VideoItem[] = [
  {
    id: "1",
    title: "Tratamento Laser CO₂ - Resultados",
    description: "Veja os resultados incríveis do nosso tratamento a laser para rejuvenescimento facial",
    category: "Tratamentos",
    duration: "0:45",
    videoUrl: "https://www.youtube.com/shorts/YHLcLYZqqII",
    thumbnailUrl: ""
  },
  {
    id: "2", 
    title: "Rejuvenescimento Facial Avançado",
    description: "Técnicas inovadoras de rejuvenescimento para uma pele mais jovem e saudável",
    category: "Estética",
    duration: "0:30",
    videoUrl: "https://www.youtube.com/shorts/C9tR2Vdc1Mc",
    thumbnailUrl: ""
  },
  {
    id: "3",
    title: "Procedimento Minimamente Invasivo", 
    description: "Conheça nossos procedimentos seguros e eficazes com mínimo desconforto",
    category: "Procedimentos",
    duration: "0:52",
    videoUrl: "https://www.youtube.com/shorts/EzxhJwkCzr4",
    thumbnailUrl: ""
  },
  {
    id: "4",
    title: "Cuidados Pós-Tratamento",
    description: "Dicas importantes e protocolo de cuidados para otimizar seus resultados",
    category: "Cuidados",
    duration: "0:38",
    videoUrl: "https://www.youtube.com/shorts/jHgs74kxTJM", 
    thumbnailUrl: ""
  },
  {
    id: "5",
    title: "Depoimento de Cliente Satisfeita",
    description: "Experiência real de transformação e satisfação com nossos tratamentos",
    category: "Depoimentos",
    duration: "0:42", 
    videoUrl: "https://www.youtube.com/shorts/eimmum2CcYY",
    thumbnailUrl: ""
  }
];

// Import styles
import './VideoCarousel.css';

// YouTube utility functions
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Clean the URL and remove any extra parameters
  const cleanUrl = url.trim();
  
  // Handle different YouTube URL formats including Shorts
  const patterns = [
    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    // Standard YouTube: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: https://youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // Direct video ID (11 characters)
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }
  
  // Fallback: try to extract any 11-character alphanumeric string that looks like a video ID
  const fallbackMatch = cleanUrl.match(/([a-zA-Z0-9_-]{11})/);
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1];
  }
  
  console.warn('Could not extract YouTube video ID from URL:', url);
  return null;
};

const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`;
};

// YouTube Video Controls Component
const YouTubeVideoControls: React.FC<VideoControlsProps & { videoId: string; originalUrl?: string }> = ({ 
  isPlaying, 
  isMuted, 
  onTogglePlay, 
  onToggleMute,
  videoId,
  originalUrl
}) => {
  const openInYouTube = () => {
    // Use original URL if it's a Shorts URL, otherwise use standard watch URL
    const youtubeUrl = originalUrl && originalUrl.includes('/shorts/') 
      ? originalUrl 
      : `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="video-controls">
      <button 
        className="control-btn play-btn" 
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button 
        className="control-btn mute-btn" 
        onClick={onToggleMute}
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        title={isMuted ? 'Ativar som' : 'Desativar som'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <button 
        className="control-btn external-btn" 
        onClick={openInYouTube}
        aria-label="Abrir no YouTube"
        title="Abrir no YouTube"
      >
        <ExternalLink size={18} />
      </button>
    </div>
  );
};

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ 
  currentIndex, 
  totalVideos, 
  onPrevious, 
  onNext 
}) => (
  <>
    <button 
      className="nav-arrow nav-arrow-left" 
      onClick={onPrevious}
      aria-label="Vídeo anterior"
      title="Vídeo anterior"
    >
      <ChevronLeft size={28} />
    </button>
    
    <button 
      className="nav-arrow nav-arrow-right" 
      onClick={onNext}
      aria-label="Próximo vídeo"
      title="Próximo vídeo"
    >
      <ChevronRight size={28} />
    </button>
  </>
);

// Thumbnail Navigation Component
const ThumbnailNavigation: React.FC<ThumbnailNavigationProps> = ({ 
  videos, 
  currentIndex, 
  onVideoSelect 
}) => (
  <div className="thumbnail-navigation">
    <div className="thumbnails-container">
      {videos.map((video, index) => {
        const videoId = getYouTubeVideoId(video.videoUrl);
        const thumbnailUrl = videoId ? getYouTubeThumbnail(videoId) : video.thumbnailUrl;
        
        return (
          <button
            key={video.id}
            className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => onVideoSelect(index)}
            aria-label={`Ir para vídeo: ${video.title}`}
            title={video.title}
          >
            <div className="thumbnail-wrapper">
              <img 
                src={thumbnailUrl} 
                alt={video.title}
                className="thumbnail-image"
                loading="lazy"
              />
              <div className="thumbnail-overlay">
                <Play size={20} className="thumbnail-play-icon" />
              </div>
              <div className="thumbnail-info">
                <span className="thumbnail-title">{video.title}</span>
                <span className="thumbnail-duration">{video.duration}</span>
              </div>
            </div>
            <div className="thumbnail-glow"></div>
          </button>
        );
      })}
    </div>
  </div>
);

// Progress Indicators Component
const ProgressIndicators: React.FC<ProgressIndicatorsProps> = ({ 
  totalSlides, 
  currentIndex, 
  onSlideSelect 
}) => (
  <div className="progress-indicators">
    {Array.from({ length: totalSlides }, (_, index) => (
      <button
        key={index}
        className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
        onClick={() => onSlideSelect(index)}
        aria-label={`Ir para slide ${index + 1}`}
        title={`Slide ${index + 1}`}
      >
        <div className="dot-inner"></div>
      </button>
    ))}
  </div>
);

// Main VideoCarousel Component
const VideoCarousel: React.FC<VideoCarouselProps> = ({
  className = '',
  videos = defaultVideos,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showProgressDots = true,
  enableAutoPlay = true
}) => {
  // Translation hook
  const { t } = useTranslation();

  // State management
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(enableAutoPlay);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current video and YouTube ID
  const currentVideo = videos[currentIndex];
  const currentVideoId = getYouTubeVideoId(currentVideo?.videoUrl || '');
  const currentThumbnail = currentVideoId ? getYouTubeThumbnail(currentVideoId) : (currentVideo?.thumbnailUrl || '');

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlay && !isPlaying && !showVideo && videos.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === videos.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, isPlaying, showVideo, videos.length, autoPlayInterval]);

  // Reset video when index changes
  useEffect(() => {
    setIsPlaying(false);
    setShowVideo(false);
    setIsVideoLoaded(false);
    setIsAutoPlay(enableAutoPlay);
  }, [currentIndex, enableAutoPlay]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle thumbnail click - loads and starts video
  const handleThumbnailClick = useCallback(() => {
    setShowVideo(true);
    setIsPlaying(true);
    setIsAutoPlay(false);
  }, []);

  // Handle overlay play/pause button
  const handleOverlayPlayPause = useCallback(() => {
    if (showVideo) {
      // If video is already showing, reload iframe with new parameters
      setIsPlaying(!isPlaying);
      if (iframeRef.current) {
        const newSrc = `${getYouTubeEmbedUrl(currentVideoId)}&autoplay=${!isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`;
        iframeRef.current.src = newSrc;
      }
    } else {
      // If video is not showing, show it
      handleThumbnailClick();
    }
  }, [isPlaying, showVideo, isMuted, currentVideoId, handleThumbnailClick]);

  // Handle mute/unmute
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (showVideo && iframeRef.current) {
      const newSrc = `${getYouTubeEmbedUrl(currentVideoId)}&autoplay=${isPlaying ? 1 : 0}&mute=${!isMuted ? 1 : 0}`;
      iframeRef.current.src = newSrc;
    }
  }, [isMuted, showVideo, isPlaying, currentVideoId]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentIndex(index);
      setIsPlaying(false);
      setShowVideo(false);
      setIsAutoPlay(enableAutoPlay);
    }
  }, [videos.length, enableAutoPlay]);

  // Navigate to previous slide
  const goToPrevious = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
    setIsPlaying(false);
    setShowVideo(false);
    setIsAutoPlay(enableAutoPlay);
  }, [currentIndex, videos.length, enableAutoPlay]);

  // Navigate to next slide
  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === videos.length - 1 ? 0 : currentIndex + 1);
    setIsPlaying(false);
    setShowVideo(false);
    setIsAutoPlay(enableAutoPlay);
  }, [currentIndex, videos.length, enableAutoPlay]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case ' ':
          event.preventDefault();
          if (!showVideo) {
            handleThumbnailClick();
          } else {
            handleOverlayPlayPause();
          }
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, handleThumbnailClick, handleOverlayPlayPause, toggleMute]);

  if (!videos || videos.length === 0) {
    return (
      <section className={`video-carousel-section ${className}`}>
        <div className="video-carousel-container">
          <div className="video-error">
            <p>Nenhum vídeo disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!currentVideo) {
    return (
      <section className={`video-carousel-section ${className}`}>
        <div className="video-carousel-container">
          <div className="video-error">
            <p>Vídeo não encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!currentVideoId) {
    return (
      <section className={`video-carousel-section ${className}`}>
        <div className="video-carousel-container">
          <div className="video-error">
            <p>URL do YouTube inválida: {currentVideo.videoUrl}</p>
            <small>Formatos suportados: youtube.com/watch?v=, youtube.com/shorts/, youtu.be/</small>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`video-carousel-section ${className}`}>
      <div className="video-carousel-container">
        {/* Section Header */}
        <div className="video-section-header">
          <div className="video-section-badge">
            <span className="video-badge-text">
              {t ? t('video_carousel.badge', 'Galeria Exclusiva') : 'Galeria Exclusiva'}
            </span>
            <div className="video-badge-glow"></div>
          </div>
          <h2 className="video-section-title">
            {t ? t('video_carousel.title', 'Veja Nossos Tratamentos') : 'Veja Nossos Tratamentos'}
            <span className="video-title-gradient">
              {t ? t('video_carousel.title_accent', ' em Ação') : ' em Ação'}
            </span>
          </h2>
          <p className="video-section-description">
            {t ? t('video_carousel.description', 'Descubra a eficácia dos nossos tratamentos através de vídeos detalhados e depoimentos reais') : 
              'Descubra a eficácia dos nossos tratamentos através de vídeos detalhados e depoimentos reais'}
          </p>
        </div>

        {/* Main Video Display */}
        <div className="main-video-container">
          <div className="video-wrapper">
            <div className="video-glow-effect"></div>
            
            {/* Video Element - YouTube Embed or Thumbnail */}
            {showVideo ? (
              <iframe
                ref={iframeRef}
                className="youtube-video"
                src={`${getYouTubeEmbedUrl(currentVideoId)}&autoplay=1&mute=${isMuted ? 1 : 0}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
            ) : (
              <div 
                className="video-thumbnail-container" 
                onClick={handleThumbnailClick}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={currentThumbnail}
                  alt={currentVideo.title}
                  className="video-thumbnail"
                />
                {/* No center play button - clean thumbnail only */}
              </div>
            )}

            {/* Loading State */}
            {showVideo && !isVideoLoaded && (
              <div className="video-loading">
                <p>Carregando vídeo...</p>
              </div>
            )}

            {/* Video Overlay Controls */}
            <div className="video-overlay">
              <YouTubeVideoControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                onTogglePlay={handleOverlayPlayPause}
                onToggleMute={toggleMute}
                videoId={currentVideoId}
                originalUrl={currentVideo.videoUrl}
              />

              {/* Video Info */}
              <div className="video-info">
                <div className="video-category">{currentVideo.category}</div>
                <h3 className="video-title">{currentVideo.title}</h3>
                <p className="video-description">{currentVideo.description}</p>
                <div className="video-duration">{currentVideo.duration}</div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {videos.length > 1 && (
              <Navigation
                currentIndex={currentIndex}
                totalVideos={videos.length}
                onPrevious={goToPrevious}
                onNext={goToNext}
              />
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {showThumbnails && videos.length > 1 && (
          <ThumbnailNavigation
            videos={videos}
            currentIndex={currentIndex}
            onVideoSelect={goToSlide}
          />
        )}

        {/* Progress Indicators */}
        {showProgressDots && videos.length > 1 && (
          <ProgressIndicators
            totalSlides={videos.length}
            currentIndex={currentIndex}
            onSlideSelect={goToSlide}
          />
        )}
      </div>
    </section>
  );
};

export default VideoCarousel;