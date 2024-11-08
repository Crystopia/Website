import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useMemo } from 'react';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';

// Define the types for the Post
interface Post {
  title: string;
  slug: string;
  image: string;
  de: string;
  en: string;
  date: string;
  lang: string;
}

interface PostPageProps {
  post: Post;
  content: string;
}

const PostPage: NextPage<PostPageProps> = ({ post, content }) => {
  const { title, date, image } = post;

  const BlogPost = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={title}
          width={800}
          height={400}
          className="object-cover w-full rounded-lg"
        />
        <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-2">{date}</p>
      </div>

      <div className="mt-8">
        <BlogPost />
      </div>
    </div>
  );
};

// Fetch paths for all blog posts dynamically
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of blog posts from the GitHub repository
  const postsResponse = await fetch(
    'https://raw.githubusercontent.com/Crystopia/Content/main/website/blog/bloglist.json'
  );
  const posts: Post[] = await postsResponse.json();

  // Generate paths for each post in both English and German
  const paths = posts.flatMap((post) => [
    { params: { slug: `${post.slug}.en` } },
    { params: { slug: `${post.slug}.de` } },
    { params: { slug: `${post.slug}` } },
  ]);

  return {
    paths,
    fallback: false, // Set to 'false' for static generation
  };
};

// Fetch the blog post content and metadata based on slug
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || '';

  const language = slug.endsWith('.de') ? 'de' : 'en';
  const cleanSlug = slug.replace(`.${language}`, '');

  // Fetch post metadata from the blog list
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
    lang: language,
  };

  const filePath = language == 'de' ? post.de : post.en;

  // Fetch the content of the MDX file
  let mdxContent = '';
  try {
    const response = await fetch(filePath);
    mdxContent = await response.text();
  } catch (error) {
    console.error('Error fetching MDX content:', error);
  }

  // Bundle MDX content for rendering
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
