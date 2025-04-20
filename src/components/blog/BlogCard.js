import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
    >
      <Link href={`/blog/${post.slug.current}`}>
        <div className="relative h-64 overflow-hidden">
          {post.featuredImage && (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author.name}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 