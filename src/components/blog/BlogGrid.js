"use client";

import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post._id} post={post} index={index} />
      ))}
    </div>
  );
} 