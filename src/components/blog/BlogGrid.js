"use client";

import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

export default function BlogGrid({ children }) {
  return (
    <div className="w-full overflow-y-auto min-h-0">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {children}
      </div>
    </div>
  );
} 