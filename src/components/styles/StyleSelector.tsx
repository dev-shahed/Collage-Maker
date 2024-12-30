import React from 'react';
import { useCollageStore } from '../../store/collageStore';
import { CollageStyle } from '../../types';

const styles: CollageStyle[] = [
  {
    id: 'vintage',
    name: 'Vintage Memories',
    className: 'vintage-style',
    filter: 'sepia(30%) contrast(95%) brightness(95%)',
    background: 'url(https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800) center/cover'
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    className: 'modern-style',
    filter: 'contrast(105%) brightness(105%)',
    background: 'linear-gradient(135deg, #f6f6f6 0%, #ffffff 100%)'
  },
  {
    id: 'polaroid',
    name: 'Polaroid Stack',
    className: 'polaroid-style',
    filter: 'contrast(110%) saturate(110%)',
    background: '#f8f8f8'
  },
  {
    id: 'neon',
    name: 'Neon Nights',
    className: 'neon-style',
    filter: 'contrast(120%) saturate(130%)',
    background: 'linear-gradient(45deg, #000046 0%, #1CB5E0 100%)'
  }
];

export const StyleSelector: React.FC = () => {
  const { setStyle, currentStyle } = useCollageStore();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Choose Style</h3>
      <div className="grid grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setStyle(style)}
            className={`p-4 rounded-lg transition-all ${
              currentStyle?.id === style.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            style={{ background: style.background }}
          >
            <span className="text-sm font-medium">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};