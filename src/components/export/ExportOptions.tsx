import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { useCollageStore } from '../../store/collageStore';
import { toPng, toJpeg } from 'html-to-image';

export const ExportOptions: React.FC = () => {
  const { collageRef } = useCollageStore();

  const downloadImage = async (format: 'png' | 'jpeg') => {
    if (!collageRef.current) return;

    const exportFunction = format === 'png' ? toPng : toJpeg;
    const dataUrl = await exportFunction(collageRef.current, {
      quality: 0.95,
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.download = `best-of-2024-collage.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-start items-center gap-4">
        {/* Download Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => downloadImage('png')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <button
            onClick={() => downloadImage('jpeg')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download JPEG
          </button>
        </div>

        {/* Share Button */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
          onClick={() => {
            // Implement sharing functionality
          }}
        >
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline-block ml-2">Share</span>
        </button>
      </div>
    </div>
  );
};