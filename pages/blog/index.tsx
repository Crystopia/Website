import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { httpGetAsync } from '../../components/WebAccess';

interface Post {
  title: string;
  slug: string;
  image: string;
  file: string;
  date: string;
  description: string;
  lang: string;
}

const HomePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lang, setLang] = useState<string | undefined>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          'https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/blog/bloglist.json';
        httpGetAsync(url, (body) => {
          const fetchedPosts = JSON.parse(body);
          fetchedPosts.sort(
            (a: Post, b: Post) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setPosts(fetchedPosts);
        });

        setLang(navigator.language === 'de-DE' ? '.de' : '.en');
        console.log(navigator.language);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Crystopia.net | Blog</title>
      </Head>
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1 className="text-5xl">Crystopia.net | Blogs</h1>
      </div>
      <br />
      <br />
      <br />
      <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 custom-gap ml-14">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl shadow-lg overflow-hidden transform duration-500 hover:shadow-2xl max-w-3xl mx-auto p-4 transition-transform hover:scale-105 border-4 border-[#a59079]"
          >
            <Link href={`/blog/${post.slug}${lang}`}>
              <div className="p-2 rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={350}
                  className="object-contain w-full h-60 rounded transition-transform duration-300 ease-in-out hover:scale-105" // Ändere "object-cover" in "object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 flex justify-center dark:text-white transition-colors duration-200 hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="text-sm mt-2">{post.description}</p>
              </div>
            </Link>
            <time className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
              {new Date(post.date).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>

      <style jsx>{`
        .custom-gap {
          gap: 2cm;
        }
      `}</style>
    </>
  );
};

export default HomePage;
