import { GetStaticProps, NextPage } from 'next';
import { useMemo } from 'react';
import { Head } from '../components';
import { PostFrontMatter } from '../types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { httpGetAsync } from '../components/WebAccess';
import Link from 'next/link';

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

const HomePage: NextPage = () => {
  async () => {
    try {
      await navigator.clipboard.writeText('crystopia.net');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
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

  const latestPost = posts[0];

  return (
    <>
      <Head
        title="Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          width={100}
          height={100}
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
        <h1 className="text-3xl">Crystopia.net | Minecraft Server</h1>
      </div>
      <br></br>
      <div>
        <p>
          Hello an Welcome to our Website. Here you get Bog Post with Updates
          and can Search in the Guides.
        </p>

        <br></br>

        <p>
          We are Crystopia a Unique Place and Community to play Minecraft. You
          can Join our Discord to Chat with us or Join the Server in the Latest
          Minecraft version on crystopia.net. Here you can find some Images...
          More Follow!
        </p>
      </div>
      <br></br>

      <div className="flex justify-center space-x-4">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
          onClick={() => window.open('https://discord.crystopia.net', '_blank')}
        >
          <Image
            className="h-8 w-8 mr-2"
            src={'/icons/discord.png'}
            alt="home"
            width={1000}
            height={1000}
          ></Image>{' '}
          <b>Discord</b>
        </button>

        {/* Copy IP Button */}
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
          onClick={() => navigator.clipboard.writeText('crystopia.net')}
        >
          <Image
            className="h-6 w-6 mr-2 "
            src={'/icons/copy-ip.png'}
            sizes="12"
            alt="home"
            width={1000}
            height={1000}
          ></Image>{' '}
          <b>CRYSTOPIA.NET</b>
        </button>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="mt-8">
        <h2 className="font-bold underline text-5xl text-center">
          Crystopia News
        </h2>
        <br></br>
        {latestPost && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:translate-y-1 mt-4">
            <Link href={'/blog/' + latestPost.slug + lang}>
              <div className="block cursor-pointer group p-4">
                <Image
                  src={latestPost.image}
                  alt={latestPost.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-64 rounded-t-lg transition duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white transition duration-200 ease-in-out">
                    {latestPost.title}
                  </h3>
                  <p className="text-center text-xl text-gray-500 dark:text-gray-300 mt-2">
                    {new Date(latestPost.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 hover:transition hover:duration-200 hover:ease-in-out text-base font-medium rounded-md text-white bg-gradient-to-b from-blue-500 to-blue-800">
            View all Blogs
          </button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="bg-gradient-to-b from-gray-500 to-gray-00 shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Our Story - Together we create
        </h2>
        <p className="text-gray- mb-6">
          Welcome to Crystopia. We are a unique Minecraft server with a focus on
          community and creativity. Our server is a place where you can build,
          explore, and make friends. We have a friendly and welcoming community
          that is always looking for new players to join us. Whether you are a
          seasoned Minecraft player or new to the game, we have something for
          everyone. Come join us today and see what Crystopia has to offer!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
            onClick={() => window.open('/team', '_self')}
          >
            <Image
              className="h-6 w-6 mr-2"
              src={'/icons/team.png'}
              alt="home"
              width={1000} // Angepasste Breite für das Icon
              height={1000} // Angepasste Höhe für das Icon
            ></Image>{' '}
            <b>Team</b>
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
            onClick={() => window.open('/credits')}
          >
            <Image
              className="h-6 w-6 mr-2"
              src={'/icons/credits.png'}
              alt="home"
              width={1000} // Angepasste Breite für das Icon
              height={1000} // Angepasste Höhe für das Icon
            ></Image>{' '}
            <b>Credits</b>
          </button>{' '}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default HomePage;
