import { FilterType, Photo } from '../types';

export const generatePhotoDefaults = (): Omit<Photo, 'id' | 'url'> => ({
  rotation: 0,
  scale: 1,
  x: 0,
  y: 0,
  zIndex: 0,
  caption: '',
  filter: 'none'
});

export const applyFilter = (filter: FilterType): string => {
  switch (filter) {
    case 'sepia':
      return 'sepia(100%)';
    case 'vintage':
      return 'sepia(50%) contrast(95%) brightness(95%)';
    case 'grayscale':
      return 'grayscale(100%)';
    case 'polaroid':
      return 'contrast(110%) brightness(110%) saturate(130%)';
    default:
      return 'none';
  }
};

export const getLayoutConfig = (layout: string) => {
  switch (layout) {
    case 'polaroid':
      return {
        gap: 24,
        rotation: [-5, 5],
        className: 'polaroid-stack'
      };
    case 'scrapbook':
      return {
        gap: 32,
        rotation: [-8, 8],
        className: 'scrapbook-layout'
      };
    case 'mosaic':
      return {
        gap: 4,
        rotation: [0, 0],
        className: 'mosaic-grid'
      };
    default:
      return {
        gap: 16,
        rotation: [0, 0],
        className: 'default-grid'
      };
  }
};