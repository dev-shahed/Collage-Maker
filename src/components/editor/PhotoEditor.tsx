import React from 'react';
import { Slider, Trash2, Type, Image } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FilterType } from '../../types';

const filters: { label: string; value: FilterType }[] = [
  { label: 'None', value: 'none' },
  { label: 'Vintage', value: 'vintage' },
  { label: 'Sepia', value: 'sepia' },
  { label: 'Grayscale', value: 'grayscale' },
  { label: 'Polaroid', value: 'polaroid' },
];

export const PhotoEditor: React.FC = () => {
  const { selectedPhotoId, photos, updatePhoto, removePhoto } = useEditorStore();
  const selectedPhoto = photos.find(p => p.id === selectedPhotoId);

  if (!selectedPhoto) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Edit Photo</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rotation</label>
          <input
            type="range"
            min="-180"
            max="180"
            value={selectedPhoto.rotation}
            onChange={(e) => updatePhoto(selectedPhoto.id, {
              rotation: parseInt(e.target.value)
            })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Scale</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={selectedPhoto.scale}
            onChange={(e) => updatePhoto(selectedPhoto.id, {
              scale: parseFloat(e.target.value)
            })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Filter</label>
          <select
            value={selectedPhoto.filter}
            onChange={(e) => updatePhoto(selectedPhoto.id, {
              filter: e.target.value as FilterType
            })}
            className="w-full p-2 border rounded"
          >
            {filters.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <input
            type="text"
            value={selectedPhoto.caption}
            onChange={(e) => updatePhoto(selectedPhoto.id, {
              caption: e.target.value
            })}
            className="w-full p-2 border rounded"
            placeholder="Add a caption..."
          />
        </div>

        <button
          onClick={() => removePhoto(selectedPhoto.id)}
          className="w-full flex items-center justify-center space-x-2 p-2 text-red-600 hover:bg-red-50 rounded"
        >
          <Trash2 size={16} />
          <span>Remove Photo</span>
        </button>
      </div>
    </div>
  );
};