import { readFileSync, readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { join } from 'path';
import { useEffect, useMemo } from 'react';
import getReadingTime from 'reading-time';
import { Head, PostImage } from '../../components';
import { fetchDatabase } from '../../helpers/fetchDatabase';
import { useViews } from '../../hooks';
import { PostFrontMatter, Post } from '../../types';

// Build time Node.js code
export async function getStaticPaths() {
  // Get blog post file names
  const fileNames = readdirSync(join(process.cwd(), 'enposts'));

  // Retun path of every blog post
  return {
    paths: fileNames.map((fileName) => ({
      params: {
        slug: fileName.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

interface PostPageProps {
  post: Post;
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  // Get slug of post from params
  const slug = params!.slug as string;

  // Read and bundle MDX source code
  const filePath = join(process.cwd(), 'enposts', `${slug}.mdx`);
  const mdxSource = readFileSync(filePath, 'utf8');
  const bundleResult = await bundleMDX({ source: mdxSource });

  // Create necessary post data for client
  const sourceCode = bundleResult.code;
  const frontMatter = bundleResult.frontmatter as Pick<
    PostFrontMatter,
    'title' | 'summary' | 'publishedAt'
  >;
  const views = (await fetchDatabase<number>(`/views/${slug}`)) || 0;
  const readingTimeResult = getReadingTime(mdxSource);
  const wordCount = readingTimeResult.words;
  const readingTime = readingTimeResult.text;

  // Return page props
  return {
    props: {
      post: {
        ...frontMatter,
        slug,
        views,
        wordCount,
        readingTime,
        sourceCode,
      },
    },
  };
};

// Client side React.js code
const PostPage: NextPage<PostPageProps> = ({ post }) => {
  // Destructure post object
  const { title, summary, slug, readingTime, sourceCode, tag } = post;

  // Create string for publication date
  const publishedAt = useMemo(
    () =>
      new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [post.publishedAt]
  );

  // Convert source code to component
  const BlogPost = useMemo(() => getMDXComponent(sourceCode), [sourceCode]);

  let tagColorClass = '';
  switch (tag) {
    case 'Update':
      tagColorClass = 'text-cyan-400';
      break;
    case 'Event':
      tagColorClass = 'text-green-400';
      break;
    default:
      tagColorClass = 'text-stone-600';
  }

  return (
    <>
      <Head title={`${title} | Crystopia.net`} description={`${summary}`} />

      <article>
        <h1>{title}</h1>
        <div className="flex flex-col">
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="transform scale-100 group-hover:scale-95 transition-transform duration-300">
            <p className="text-gray-600 font-extrabol text-sm mb-2 font-semibold">
              <b>
                {tag && (
                  <span
                    className={`inline-block py-1 d rounded-lg ${tagColorClass} mr-2`}
                  >
                    {tag}
                  </span>
                )}
                - {publishedAt}
              </b>
            </p>
          </div>
        </div>

        {/*
  Since the return type "null" was not added to the component types of
  "mdx-bundler", but it is included by default in the "FC" type of React,
  I cast PostImage to "any". In the future, this may be removed again.
  */}
        <BlogPost components={{ Image: PostImage as any }} />
      </article>
    </>
  );
};

export default PostPage;
