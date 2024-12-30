import { create } from 'zustand';
import { CollageState, EditorState, Photo } from '../types';
import { generatePhotoDefaults } from '../utils/photoUtils';

const initialState: CollageState = {
  photos: [],
  layout: 'grid',
  spacing: 16,
  background: {
    type: 'color',
    value: '#ffffff'
  },
  selectedPhotoId: null
};

export const useEditorStore = create<CollageState & EditorState>((set) => ({
  ...initialState,

  addPhoto: (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto: Photo = {
        ...generatePhotoDefaults(),
        id: crypto.randomUUID(),
        url: e.target?.result as string,
      };
      set((state) => ({ 
        photos: [...state.photos, newPhoto],
        selectedPhotoId: newPhoto.id 
      }));
    };
    reader.readAsDataURL(file);
  },

  removePhoto: (id: string) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
      selectedPhotoId: state.selectedPhotoId === id ? null : state.selectedPhotoId
    })),

  updatePhoto: (id: string, updates: Partial<Photo>) =>
    set((state) => ({
      photos: state.photos.map((photo) =>
        photo.id === id ? { ...photo, ...updates } : photo
      )
    })),

  setLayout: (layout) => set({ layout }),
  setSpacing: (spacing) => set({ spacing }),
  setBackground: (type, value) => set({ background: { type, value } }),
  setOverlayText: (overlayText) => set({ overlayText }),
  selectPhoto: (id) => set({ selectedPhotoId: id }),

  movePhoto: (id: string, x: number, y: number) =>
    set((state) => ({
      photos: state.photos.map((photo) =>
        photo.id === id ? { ...photo, x, y } : photo
      )
    })),

  reorderPhotos: (activeId: string, overId: string) =>
    set((state) => {
      const oldIndex = state.photos.findIndex((p) => p.id === activeId);
      const newIndex = state.photos.findIndex((p) => p.id === overId);
      const newPhotos = [...state.photos];
      const [movedItem] = newPhotos.splice(oldIndex, 1);
      newPhotos.splice(newIndex, 0, movedItem);
      return { photos: newPhotos };
    })
}));