import { getClient } from '@/lib/sanity/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
      {post.featuredImage && (
        <div className="relative mb-8 h-96 w-full">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.content} />
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const { slug } = params;
  const client = getClient(preview);
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
} 