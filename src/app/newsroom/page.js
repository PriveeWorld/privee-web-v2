import { getClient } from '../../lib/sanity/client';
import BlogPageContent from '../../components/blog/BlogPageContent';
import { urlForImage } from '../../lib/sanity/image';

export const revalidate = 60; // Revalidate every minute

async function getBlogPosts(tag) {
  const client = getClient();
  const filter = tag ? `&& "${tag}" in tags` : '';
  
  const posts = await client.fetch(`
    *[_type == "post" ${filter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      tags,
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

export default async function BlogPage({ searchParams }) {
  const tag = searchParams?.tag;
  const posts = await getBlogPosts(tag);
  return <BlogPageContent posts={posts} currentTag={tag} />;
} 