import React, { useCallback } from 'react';
import { Upload, Grid, Heart, Layout, Download, Share2 } from 'lucide-react';
import { useCollageStore } from '../store/collageStore';
import { useDropzone } from 'react-dropzone';

export const Toolbar: React.FC = () => {
  const { layout, setLayout, addPhoto } = useCollageStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => addPhoto(file));
  }, [addPhoto]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">Best of 2024 Collage Maker</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded ${
                layout === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setLayout('freeform')}
              className={`p-2 rounded ${
                layout === 'freeform' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Layout size={20} />
            </button>
            <button
              onClick={() => setLayout('heart')}
              className={`p-2 rounded ${
                layout === 'heart' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Upload size={16} />
              <span>Upload Photos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};