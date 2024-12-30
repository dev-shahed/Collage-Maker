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
import { useEditorStore } from '../../store/editorStore';
import { PhotoCard } from './PhotoCard';
import { getLayoutConfig } from '../../utils/photoUtils';

export const PhotoGrid: React.FC = () => {
  const { photos, layout, reorderPhotos } = useEditorStore();
  const config = getLayoutConfig(layout);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Ensure both `active` and `over` exist
    if (!active || !over || active.id === over.id) return;

    // Reorder photos in the store
    reorderPhotos(active.id as string, over.id as string);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={photos.map((photo) => photo.id)}
        strategy={rectSortingStrategy}
      >
        <div
          className={`grid gap-${config.gap} ${config.className}`}
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id} // Ensure this matches the unique ID in the state
              photo={photo}
              layout={layout}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
