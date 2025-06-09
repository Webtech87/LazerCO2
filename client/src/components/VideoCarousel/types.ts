// src/components/VideoCarousel/types.ts

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
}

export interface VideoCarouselProps {
  className?: string;
  videos?: VideoItem[];
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showProgressDots?: boolean;
  enableAutoPlay?: boolean;
}

export interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export interface NavigationProps {
  currentIndex: number;
  totalVideos: number;
  onPrevious: () => void;
  onNext: () => void;
}

export interface ThumbnailNavigationProps {
  videos: VideoItem[];
  currentIndex: number;
  onVideoSelect: (index: number) => void;
}

export interface ProgressIndicatorsProps {
  totalSlides: number;
  currentIndex: number;
  onSlideSelect: (index: number) => void;
}

// Default video data for demo purposes
export const defaultVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Laser CO₂ Fracionado',
    description: 'Tratamento revolucionário para rejuvenescimento facial e corporal com tecnologia avançada',
    videoUrl: 'https://www.youtube.com/shorts/eimmum2CcYY',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop&q=80',
    duration: '2:30',
    category: 'Rejuvenescimento'
  },
  {
    id: '2',
    title: 'Blefaroplastia a Laser',
    description: 'Técnica avançada para rejuvenescimento da região ocular sem cirurgia invasiva',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop&q=80',
    duration: '3:15',
    category: 'Tratamento Ocular'
  },
  {
    id: '3',
    title: 'Remoção de Manchas',
    description: 'Eliminação eficaz de manchas da pele com tecnologia laser de última geração',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=450&fit=crop&q=80',
    duration: '2:45',
    category: 'Tratamento de Pele'
  },
  {
    id: '4',
    title: 'Resultados Transformadores',
    description: 'Antes e depois dos nossos tratamentos mais eficazes e transformadores',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=450&fit=crop&q=80',
    duration: '4:20',
    category: 'Resultados'
  },
  {
    id: '5',
    title: 'Depoimentos Reais',
    description: 'Histórias de transformação e satisfação dos nossos pacientes',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=450&fit=crop&q=80',
    duration: '3:30',
    category: 'Depoimentos'
  },
  {
    id: '6',
    title: 'Tecnologia Avançada',
    description: 'Conheça os equipamentos de última geração utilizados em nossos tratamentos',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=450&fit=crop&q=80',
    duration: '3:45',
    category: 'Tecnologia'
  }
];