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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-60 border-b md:border-r p-4 space-y-6 md:min-h-screen">
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