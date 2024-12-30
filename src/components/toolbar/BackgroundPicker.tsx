import React from 'react';
import { useEditorStore } from '../../store/editorStore';

const gradients = [
  'linear-gradient(to right, #ff758c, #ff7eb3)',
  'linear-gradient(to right, #ffd89b, #19547b)',
  'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)',
];

const textures = [
  '/textures/paper.png',
  '/textures/vintage.png',
  '/textures/canvas.png',
];

export const BackgroundPicker: React.FC = () => {
  const { background, setBackground } = useEditorStore();

  return (
    <div className="p-2">
      <h3 className="text-sm font-medium mb-2">Background</h3>
      
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type="color"
            value={background.type === 'color' ? background.value : '#ffffff'}
            onChange={(e) => setBackground('color', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
          
          {gradients.map((gradient, i) => (
            <button
              key={i}
              onClick={() => setBackground('gradient', gradient)}
              className="w-8 h-8 rounded"
              style={{ background: gradient }}
            />
          ))}
        </div>

        <div className="flex space-x-2">
          {textures.map((texture, i) => (
            <button
              key={i}
              onClick={() => setBackground('texture', texture)}
              className="w-8 h-8 rounded border"
              style={{ backgroundImage: `url(${texture})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};