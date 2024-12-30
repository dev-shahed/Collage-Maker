import React from 'react';
import { Grid, Image, Heart, Layout } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { LayoutType } from '../../types';

const layouts: { icon: React.ReactNode; value: LayoutType; label: string }[] = [
  { icon: <Grid size={20} />, value: 'grid', label: 'Grid' },
  { icon: <Image size={20} />, value: 'polaroid', label: 'Polaroid' },
  { icon: <Layout size={20} />, value: 'scrapbook', label: 'Scrapbook' },
  { icon: <Grid size={20} />, value: 'mosaic', label: 'Mosaic' },
  { icon: <Heart size={20} />, value: 'heart', label: 'Heart' },
];

export const LayoutSelector: React.FC = () => {
  const { layout, setLayout } = useEditorStore();

  return (
    <div className="flex items-center space-x-2">
      {layouts.map(({ icon, value, label }) => (
        <button
          key={value}
          onClick={() => setLayout(value)}
          className={`p-2 rounded flex flex-col items-center ${
            layout === value
              ? 'bg-blue-100 text-blue-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={label}
        >
          {icon}
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </div>
  );
};