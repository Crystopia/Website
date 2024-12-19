import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import { redirect, RedirectType } from 'next/navigation';
import Head from 'next/head'; // Für dynamische Metadaten

// Define the types for the Post
interface Post {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  date: string;
  description: string;
}

interface PostPageProps {
  post: Post;
  content: string;
}

const PostPage: NextPage<PostPageProps> = ({ post, content }) => {
  const { title, date, image } = post;

  const BlogPost = useMemo(() => getMDXComponent(content), [content]);

  useEffect(() => {
    const fetchPosts = async () => {
      const currentLang = navigator.language === 'de-DE' ? 'de' : 'en';
      if (post.slug + '.' + currentLang !== location.href.split('/')[4]) {
        window.location.href = `/blog/${post.slug}.${currentLang}`;
      }
    };
    fetchPosts();
  }, [post.slug]);

  return (
    <>
      <Head>
        <title>{post.title} - Crystopia</title>
        <meta name="description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="twitter:image" content={post.image} />
        <meta property="og:title" content={post.title} />
        <meta property="twitter:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="twitter:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Crystopia" />
        <meta property="article:section" content="Minecraft" />
        <meta property="article:tag" content="Minecraft" />
        <meta property="article:tag" content="Server" />
        <meta property="article:tag" content="Crystopia" />
        <meta property="article:tag" content="Blog" />
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            <Image
              src={image}
              alt={title}
              width={800}
              height={400}
              className="object-cover w-full rounded-lg"
            />
            <div className="absolute bottom-0 left-4 transform translate-y-1/2">
              {/* <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-t-lg">
                {new Date(post.date).toLocaleDateString()}
              </div> */}
              <div className="w-0 h-4 bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {title}
            </h1>
          </div>
        </div>
        <div className="mt-8">
          <BlogPost />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsResponse = await fetch(
    'https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json'
  );
  const posts: Post[] = await postsResponse.json();

  const paths = posts.flatMap((post) => [
    { params: { slug: `${post.slug}.en` } },
    { params: { slug: `${post.slug}.de` } },
    { params: { slug: `${post.slug}` } },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || '';
  const language = slug.endsWith('.de') ? 'de' : 'en';
  const cleanSlug = slug.replace(`.${language}`, '');

  const postResponse = await fetch(
    `https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json`
  );
  const posts: Post[] = await postResponse.json();
  const post = posts.find((p) => p.slug === cleanSlug) || {
    title: 'Not found',
    slug,
    image: '',
    de: '',
    en: '',
    date: '',
    description: '',
  };

  const filePath = language === 'de' ? post.de : post.en;

  let mdxContent = '';
  try {
    const response = await fetch(filePath);
    mdxContent = await response.text();
  } catch (error) {
    console.error('Error fetching MDX content:', error);
  }

  const bundleResult = await bundleMDX({ source: mdxContent });
  const content = bundleResult.code;

  return {
    props: {
      post,
      content,
    },
  };
};

export default PostPage;
