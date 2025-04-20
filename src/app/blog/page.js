import { getClient } from '../../lib/sanity/client';
import BlogPageContent from '../../components/blog/BlogPageContent';
import { urlForImage } from '../../lib/sanity/image';

export const revalidate = 60; // Revalidate every minute

async function getBlogPosts() {
  const client = getClient();
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      publishedAt,
      author->{
        name,
        "image": image.asset->url
      },
      content[] {
        ...,
        _type == "image" => {
          "url": asset->url,
          alt
        }
      }
    }
  `);
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogPageContent posts={posts} />;
} 