import React from 'react';
import { Toolbar } from './components/Toolbar';
import { CollageEditor } from './components/CollageEditor';
import { StyleSelector } from './components/styles/StyleSelector';
import { AIEffects } from './components/effects/AIEffects';
import { ExportOptions } from './components/export/ExportOptions';
import './styles/collage.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar />
      <div className="flex">
        <div className="w-64 border-r min-h-screen p-4 space-y-6">
          <StyleSelector />
          <AIEffects />
        </div>
        <div className="flex-1">
          <CollageEditor />
        </div>
      </div>
      <ExportOptions />
    </div>
  );
}

export default App;