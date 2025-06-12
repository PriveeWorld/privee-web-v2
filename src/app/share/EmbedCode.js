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
  

}