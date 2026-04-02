import { getClient } from '../../../lib/sanity/client';
import BlogPostContent from '../../../components/blog/BlogPostContent';
import { urlForImage } from '../../../lib/sanity/image';

// Force dynamic rendering and disable cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPost(slug) {
  const client = getClient();
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      tags,
      featuredImage,
      publishedAt,
      enableHardcodedText,
      hardcodedText,
      appStoreUrl,
      playStoreUrl,
      author->{
        name,
        image
      }
    }
  `, { slug });
  return post;
}

export async function generateStaticParams() {
  const client = getClient();
  const slugs = await client.fetch(`
    *[_type == "post"].slug.current
  `);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const imageUrl = post.featuredImage ? urlForImage(post.featuredImage).width(1200).height(630).url() : null;

  const description = post.title;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name].filter(Boolean),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.title,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const imageUrl = post.featuredImage ? urlForImage(post.featuredImage).width(1200).height(630).url() : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "author": post.author?.name ? { "@type": "Person", "name": post.author.name } : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Privee World",
      "logo": { "@type": "ImageObject", "url": "https://privee.world/images/priveelogo.png" },
    },
    ...(imageUrl && { "image": imageUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  );
} 