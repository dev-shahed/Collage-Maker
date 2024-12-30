import { create } from 'zustand';
import { CollageState, EditorState } from '../types';
import { createRef } from 'react';
import { applyAIEffect } from '../services/ai';

const initialState: Partial<CollageState> = {
  photos: [],
  layout: 'grid',
  spacing: 16,
  background: {
    type: 'color',
    value: '#ffffff'
  },
  overlayText: 'Best of 2024',
  selectedPhotoId: null,
  currentStyle: null,
  isProcessing: false,
  collageRef: createRef<HTMLDivElement>()
};

export const useCollageStore = create<CollageState & EditorState>((set, get) => ({
  ...initialState as CollageState,

  addPhoto: (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto = {
        id: crypto.randomUUID(),
        url: e.target?.result as string,
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
        zIndex: 0,
        caption: '',
        filter: 'none'
      };
      set((state) => ({ photos: [...state.photos, newPhoto] }));
    };
    reader.readAsDataURL(file);
  },

  setStyle: (style) => set({ currentStyle: style }),
  
  applyAIEffect: async (effectId) => {
    set({ isProcessing: true });
    try {
      const { photos, selectedPhotoId } = get();
      const photo = photos.find(p => p.id === selectedPhotoId);
      
      if (!photo) return;

      const result = await applyAIEffect(photo.url, effectId);
      
      if (result.image) {
        set((state) => ({
          photos: state.photos.map(p =>
            p.id === selectedPhotoId
              ? { ...p, url: result.image }
              : p
          )
        }));
      }
    } catch (error) {
      console.error('AI effect failed:', error);
    } finally {
      set({ isProcessing: false });
    }
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

  reorderPhotos: (activeId: string, overId: string) =>
    set((state) => {
      const oldIndex = state.photos.findIndex(p => p.id === activeId);
      const newIndex = state.photos.findIndex(p => p.id === overId);
      const newPhotos = [...state.photos];
      const [movedItem] = newPhotos.splice(oldIndex, 1);
      newPhotos.splice(newIndex, 0, movedItem);
      return { photos: newPhotos };
    })
}));