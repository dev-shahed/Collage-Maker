import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Photo } from '../../types';

interface PhotoCardProps {
  photo: Photo;
  layout: string;
  style?: React.CSSProperties;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, layout, style }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: photo.id });

  const cardStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...style,
    transform: `${CSS.Transform.toString(transform)} rotate(${photo.rotation}deg) scale(${photo.scale})`,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="group relative aspect-square cursor-move"
      style={cardStyle}
    >
      <img
        src={photo.url}
        alt={photo.caption || ''}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      {photo.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm rounded-b-lg">
          {photo.caption}
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
    </div>
  );
};