// src/components/VideoCarousel/VideoCarousel.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, VolumeX, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Import types and styles
import type { 
  VideoCarouselProps, 
  //VideoItem, 
  VideoControlsProps, 
  NavigationProps, 
  ThumbnailNavigationProps, 
  ProgressIndicatorsProps 
} from './types';
import { defaultVideos } from './types';
import './VideoCarousel.css';

// Video Controls Component
const VideoControls: React.FC<VideoControlsProps> = ({ 
  isPlaying, 
  isMuted, 
  onTogglePlay, 
  onToggleMute 
}) => (
  <div className="video-controls">
    <button 
      className="control-btn play-btn" 
      onClick={onTogglePlay}
      aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
    >
      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
    </button>
    
    <button 
      className="control-btn mute-btn" 
      onClick={onToggleMute}
      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
      title={isMuted ? 'Ativar som' : 'Desativar som'}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  </div>
);

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ 
  //currentIndex, 
  //totalVideos, 
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
      {videos.map((video, index) => (
        <button
          key={video.id}
          className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onVideoSelect(index)}
          aria-label={`Ir para vídeo: ${video.title}`}
          title={video.title}
        >
          <div className="thumbnail-wrapper">
            <img 
              src={video.thumbnailUrl} 
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
      ))}
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

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current video
  const currentVideo = videos[currentIndex];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlay && !isPlaying && videos.length > 1) {
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
  }, [isAutoPlay, isPlaying, videos.length, autoPlayInterval]);

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsVideoLoaded(false);
    }
  }, [currentIndex]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle video play/pause
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsAutoPlay(enableAutoPlay);
      } else {
        videoRef.current.play().catch((error) => {
          console.warn('Video play failed:', error);
        });
        setIsAutoPlay(false);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, enableAutoPlay]);

  // Handle mute/unmute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentIndex(index);
      setIsPlaying(false);
      setIsAutoPlay(enableAutoPlay);
    }
  }, [videos.length, enableAutoPlay]);

  // Navigate to previous slide
  const goToPrevious = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
    setIsPlaying(false);
    setIsAutoPlay(enableAutoPlay);
  }, [currentIndex, videos.length, enableAutoPlay]);

  // Navigate to next slide
  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === videos.length - 1 ? 0 : currentIndex + 1);
    setIsPlaying(false);
    setIsAutoPlay(enableAutoPlay);
  }, [currentIndex, videos.length, enableAutoPlay]);

  // Handle video events
  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    setIsAutoPlay(enableAutoPlay);
    // Auto advance to next video when current ends
    if (videos.length > 1) {
      setTimeout(() => {
        goToNext();
      }, 1000);
    }
  }, [enableAutoPlay, videos.length, goToNext]);

  const handleVideoLoadedData = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback((error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video loading error:', error);
    setIsVideoLoaded(false);
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
          togglePlayPause();
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
  }, [goToPrevious, goToNext, togglePlayPause, toggleMute]);

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
            
            {/* Video Element */}
            <video
              ref={videoRef}
              className="main-video"
              poster={currentVideo.thumbnailUrl}
              muted={isMuted}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onLoadedData={handleVideoLoadedData}
              onError={handleVideoError}
              preload="metadata"
              playsInline
            >
              <source src={currentVideo.videoUrl} type="video/mp4" />
              <track kind="captions" />
              Seu navegador não suporta vídeos HTML5.
            </video>

            {/* Loading State */}
            {!isVideoLoaded && (
              <div className="video-loading">
                <p>Carregando vídeo...</p>
              </div>
            )}

            {/* Video Overlay Controls */}
            <div className="video-overlay">
              <VideoControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                onTogglePlay={togglePlayPause}
                onToggleMute={toggleMute}
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