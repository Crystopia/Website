import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { httpGetAsync } from '../../components/WebAccess';

// Define the type for the post
interface Post {
  title: string;
  slug: string;
  image: string;
  file: string;
  date: string;
  lang: string;
  // Add other fields as necessary
}

// Client-side React.js code
const HomePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lang, setLang] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          'https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/blog/bloglist.json';
        httpGetAsync(url, (body) => {
          const fetchedPosts = JSON.parse(body);
          // Sort posts by date
          fetchedPosts.sort(
            (a: Post, b: Post) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setPosts(fetchedPosts);
        });

        if (navigator.language === 'de-DE') {
          setLang('.de');
        } else {
          setLang('.en');
        }
        console.log(navigator.language);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Crystopia.net | Blog</title>
      </Head>
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 size-10"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          width={200}
          height={200}
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
        <h1 className="text-3xl">Crystopia.net | Blog</h1>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-8 md:mt-10 lg:mt-12 size-11/12">
        {posts.map((post) => (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:translate-y-1 mt-4">
            <Link href={'/blog/' + post.slug + lang}>
              <div className="block cursor-pointer group p-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48 rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white transition duration-200 ease-in-out group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
