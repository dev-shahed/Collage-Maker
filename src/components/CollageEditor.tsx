import React from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useCollageStore } from '../store/collageStore';
import { PhotoUploader } from './PhotoUploader';
import { PhotoCard } from './editor/PhotoCard';

export const CollageEditor: React.FC = () => {
  const { 
    photos, 
    layout, 
    spacing, 
    backgroundColor, 
    overlayText, 
    reorderPhotos,
    currentStyle,
    collageRef 
  } = useCollageStore();

  const getLayoutClass = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'freeform':
        return 'relative min-h-[600px]';
      case 'heart':
        return 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 heart-shape';
      default:
        return '';
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderPhotos(active.id as string, over.id as string);
    }
  };

  return (
    <div className="mt-16 max-w-7xl mx-auto p-4">
      {photos.length === 0 ? (
        <PhotoUploader />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={photos.map(p => p.id)}
            strategy={rectSortingStrategy}
          >
            <div
              ref={collageRef}
              className={`${getLayoutClass()} gap-${spacing} ${currentStyle?.className || ''}`}
              style={{ 
                backgroundColor,
                background: currentStyle?.background || backgroundColor
              }}
            >
              {photos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  layout={layout}
                  style={{
                    filter: currentStyle?.filter || 'none'
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      {photos.length > 0 && overlayText && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h2 className="text-4xl font-bold text-white text-shadow-lg">{overlayText}</h2>
        </div>
      )}
    </div>
  );
};