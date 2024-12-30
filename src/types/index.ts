export type LayoutType = 
  | 'grid' 
  | 'polaroid' 
  | 'scrapbook' 
  | 'mosaic' 
  | 'heart' 
  | 'freestyle';

export type FilterType = 
  | 'none' 
  | 'sepia' 
  | 'vintage' 
  | 'grayscale' 
  | 'polaroid';

export interface CollageStyle {
  id: string;
  name: string;
  className: string;
  filter: string;
  background: string;
}

export interface AIEffect {
  id: string;
  name: string;
  description: string;
}

export interface Photo {
  id: string;
  url: string;
  rotation: number;
  scale: number;
  x: number;
  y: number;
  zIndex: number;
  caption: string;
  filter: FilterType;
}

export interface CollageState {
  photos: Photo[];
  layout: LayoutType;
  spacing: number;
  background: {
    type: 'color' | 'gradient' | 'texture' | 'image';
    value: string;
  };
  overlayText: string;
  selectedPhotoId: string | null;
  currentStyle: CollageStyle | null;
  isProcessing: boolean;
  collageRef: React.RefObject<HTMLDivElement>;
}

export interface EditorState {
  addPhoto: (file: File) => void;
  removePhoto: (id: string) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  setLayout: (layout: LayoutType) => void;
  setSpacing: (spacing: number) => void;
  setBackground: (type: 'color' | 'gradient' | 'texture' | 'image', value: string) => void;
  setOverlayText: (text: string) => void;
  selectPhoto: (id: string | null) => void;
  movePhoto: (id: string, x: number, y: number) => void;
  reorderPhotos: (activeId: string, overId: string) => void;
  setStyle: (style: CollageStyle) => void;
  applyAIEffect: (effectId: string) => Promise<void>;
}