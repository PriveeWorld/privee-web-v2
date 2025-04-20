import { getClient } from '../../../lib/sanity/client';
import BlogPostContent from '../../../components/blog/BlogPostContent';

export const revalidate = 60; // Revalidate every minute

async function getPost(slug) {
  const client = getClient();
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      featuredImage,
      publishedAt,
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

export default async function BlogPost({ params }) {
  // Ensure params.slug is properly awaited
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPostContent post={post} />;
} 