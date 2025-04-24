"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '../../lib/sanity/image';

export default function BlogCard({ post, index }) {
  // Format date in a consistent way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const imageUrl = post.featuredImage ? urlForImage(post.featuredImage)
    .width(800)
    .height(600)
    .fit('max')
    .auto('format')
    .url() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:border-[#CD1A70]/30 hover:shadow-xl sm:p-6"
    >
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="relative mb-6 h-[225px] sm:h-[280px] overflow-hidden rounded-xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-r from-[#3A1772]/5 to-[#CD1A70]/5">
              <span className="text-lg text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="text-left">
          <div className="mb-2 flex items-center">
            <span className="mr-3 rounded-full bg-[#3A1772]/10 px-3 py-0.5 text-xs font-medium text-[#3A1772]">
              News
            </span>
            <span className="text-xs text-gray-600">{formatDate(post.publishedAt)}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[#CD1A70]/10 px-2 py-0.5 text-xs font-medium text-[#CD1A70] hover:bg-[#CD1A70]/20 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          <h3 className="mb-3 font-clash text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#3A1772] group-hover:to-[#CD1A70] group-hover:bg-clip-text group-hover:text-transparent sm:text-2xl">
            {post.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-3 sm:text-base">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 sm:text-base">
            {post.author && (
              <span className="bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-medium text-transparent">
                {post.author.name}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 