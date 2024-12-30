import React from 'react';
import { Wand2 } from 'lucide-react';
import { useCollageStore } from '../../store/collageStore';
import { AIEffect } from '../../types';

const effects: AIEffect[] = [
  {
    id: 'enhance',
    name: 'AI Enhancement',
    description: 'Automatically enhance colors and details'
  },
  {
    id: 'style-transfer',
    name: 'Artistic Style',
    description: 'Apply artistic styles to your photos'
  },
  {
    id: 'portrait',
    name: 'Portrait Magic',
    description: 'Enhance portraits with AI'
  }
];

export const AIEffects: React.FC = () => {
  const { applyAIEffect, isProcessing } = useCollageStore();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Wand2 className="w-5 h-5" />
        AI Effects
      </h3>
      <div className="space-y-3">
        {effects.map((effect) => (
          <button
            key={effect.id}
            onClick={() => applyAIEffect(effect.id)}
            disabled={isProcessing}
            className="w-full p-3 text-left rounded-lg bg-white shadow-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            <div className="font-medium">{effect.name}</div>
            <div className="text-sm text-gray-600">{effect.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};