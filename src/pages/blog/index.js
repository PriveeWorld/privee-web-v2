import { getClient } from '@/lib/sanity/client';
import BlogGrid from '@/components/blog/BlogGrid';

export default function BlogIndex({ posts }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <BlogGrid posts={posts} />
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview);
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      author->{
        name,
        image
      }
    }
  `);

  return {
    props: {
      posts,
    },
    revalidate: 60, // Revalidate every minute
  };
} 