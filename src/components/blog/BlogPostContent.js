"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import TopNav from "../../app/components/TopNav";
import FullscreenNav from "../../app/components/FullscreenNav";
import Footer from "../../app/components/Footer";
import { motion } from "framer-motion";
import { urlForImage } from '../../lib/sanity/image';

const SECTION_HEADINGS = [
  "Discover Privee",
  "Privee Story",
  "Privee Hub",
  "Blog",
  "Privacy Policy",
  "Contact Us",
];

const EmbedComponent = ({ value }) => {
  if (!value?.url) return null;

  const extractUrl = (input) => {
    // Try to extract URL from iframe code first
    const srcMatch = input.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : input;
  };

  const getEmbedUrl = (url, type) => {
    // First extract the actual URL if it's an iframe code
    const cleanUrl = extractUrl(url);
    
    switch (type) {
      case 'privee':
        return cleanUrl;
      case 'youtube':
        const youtubeId = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
        return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : cleanUrl;
      case 'vimeo':
        const vimeoId = cleanUrl.match(/vimeo\.com\/(\d+)/)?.[1];
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : cleanUrl;
      case 'instagram':
        // Handle both post and reel URLs
        const instaMatch = cleanUrl.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/);
        return instaMatch ? `https://www.instagram.com/embed/p/${instaMatch[1]}/` : cleanUrl;
      case 'facebook':
        // Handle Facebook video, post, and other content
        if (cleanUrl.includes('facebook.com')) {
          return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(cleanUrl)}&show_text=true`;
        }
        return cleanUrl;
      case 'twitter':
        // Handle Twitter/X embed
        const tweetUrl = cleanUrl.replace(/twitter\.com/, 'platform.twitter.com/embed');
        return tweetUrl.includes('platform.twitter.com/embed') ? tweetUrl : cleanUrl;
      default:
        return cleanUrl;
    }
  };

  const embedUrl = getEmbedUrl(value.url, value.type);
  const isPriveeVideo = value.type === 'privee';
  const isInstagramEmbed = value.type === 'instagram';
  const isFacebookEmbed = value.type === 'facebook';

  return (
    <div className="relative my-8 mx-auto w-full max-w-screen-lg">
      <div className={`relative mx-auto ${
        isPriveeVideo 
          ? 'md:max-w-[400px] aspect-[9/16] md:aspect-[9/16]'
          : isInstagramEmbed
          ? 'md:max-w-[400px] aspect-[5/6]'
          : isFacebookEmbed
          ? 'md:max-w-[500px] aspect-[1/1]'
          : 'aspect-video'
      }`}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlForImage(value)
        .auto('format')
        .url();
      
      return (
        <div className="relative my-12 mx-auto w-full max-w-[900px] overflow-hidden rounded-xl">
          <div className="aspect-[16/9] relative">
            <Image
              src={imageUrl}
              alt={value.alt || ''}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
            />
            {value.photoCredit && (
              <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md">
                <p className="text-white text-sm">{value.photoCredit}</p>
              </div>
            )}
          </div>
          {value.alt && (
            <p className="mt-2 text-center text-sm text-gray-500 italic">{value.alt}</p>
          )}
        </div>
      );
    },
    embed: EmbedComponent,
  },
  block: {
    normal: ({children}) => <p className="mb-6 text-left text-gray-700 leading-relaxed max-w-[800px] mx-auto">{children}</p>,
    h1: ({children}) => <h1 className="mb-8 text-4xl md:text-5xl font-clash font-bold text-left text-gray-900">{children}</h1>,
    h2: ({children}) => <h2 className="mb-6 text-3xl md:text-4xl font-clash font-bold text-left text-gray-900">{children}</h2>,
    h3: ({children}) => <h3 className="mb-4 text-2xl md:text-3xl font-clash font-semibold text-left text-gray-900">{children}</h3>,
    blockquote: ({children}) => (
      <blockquote className="my-8 border-l-4 border-[#CD1A70] bg-gradient-to-r from-[#3A1772]/5 to-[#CD1A70]/5 py-4 px-6 text-left italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mb-6 list-disc pl-6 space-y-2 max-w-[800px] mx-auto text-left">{children}</ul>,
    number: ({children}) => <ol className="mb-6 list-decimal pl-6 space-y-2 max-w-[800px] mx-auto text-left">{children}</ol>,
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const ShareButton = ({ platform, icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="mr-4 flex items-center text-gray-600 hover:text-[#CD1A70] transition-colors duration-300"
  >
    <span className="sr-only">Share on {platform}</span>
    {icon}
  </a>
);

export default function BlogPostContent({ post }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [section, setSection] = useState(3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post?.title || '';

  return (
    <div className="flex min-h-screen flex-col relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <FullscreenNav
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          sections={SECTION_HEADINGS}
          onSelectSection={(index) => {
            setSection(index);
            setIsNavOpen(false);
          }}
        />
        <TopNav
          onMenuClick={() => setIsNavOpen(true)}
          section={SECTION_HEADINGS[section]}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-auto">
        <main className="w-full bg-white pt-[80px] lg:pt-[120px] flex-1">
          <div className="w-full max-w-[1200px] mx-auto px-4 py-4 sm:px-8">
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 w-full"
            >
              <Link 
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-[#CD1A70] transition-colors duration-300"
              >
                <svg className="mr-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
            </motion.div>

            <motion.article 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Category & Date */}
              <div className="mb-2 flex items-center">
                <span className="mr-3 rounded-full bg-[#3A1772]/10 px-3 py-0.5 text-xs font-medium text-[#3A1772]">
                  {post?.category || 'News'}
                </span>
                <span className="text-xs text-gray-600">{formatDate(post?.publishedAt)}</span>
              </div>

              {/* Title */}
              <h1 className="mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[28px] font-bold leading-[1.2] tracking-normal text-transparent sm:text-[36px] md:text-[42px] lg:text-[48px] lg:leading-[1.1] [word-spacing:0.1em]">
                {post?.title}
              </h1>

              {/* Author & Share */}
              <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                {post?.author && (
                  <div className="flex items-center">
                    {post.author.image && (
                      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={post.author.image}
                          alt={post.author.name || ''}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-600">{post.author.role || 'Author'}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <p className="mr-4 text-sm font-medium text-gray-600">Share this post</p>
                  <div className="flex">
                    <ShareButton
                      platform="Twitter"
                      icon={
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      }
                      link={shareUrl ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` : '#'}
                    />
                    <ShareButton
                      platform="LinkedIn"
                      icon={
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      }
                      link={shareUrl ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}` : '#'}
                    />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={post?.content}
                  components={portableTextComponents}
                />
              </div>

              {/* Tags - Moved to bottom */}
              {post?.tags && post.tags.length > 0 && (
                <div className="mt-8 mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-[#CD1A70]/10 px-3 py-1 text-sm font-medium text-[#CD1A70] hover:bg-[#CD1A70]/20 transition-colors duration-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </motion.article>
          </div>
        </main>

      </div>
    </div>
  );
} 