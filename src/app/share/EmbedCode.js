"use client";

import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

export default function EmbedCode({ videoId, userId }) {
  const [copied, setCopied] = useState(false);
  
  // Generate the embed code with iframe
  const embedUrl = `https://p.privee.world/embed?videoId=${videoId}&userId=${userId}`;
  const embedCode = `<iframe src="${embedUrl}" style="width:100%; aspect-ratio:16/9; max-width:600px; border:0;" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-sm font-medium">Embed this video</h3>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          <FaCopy /> {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 p-3 rounded text-gray-300 text-xs overflow-x-auto">
        {embedCode}
      </pre>
    </div>
  );
}