import { GetStaticProps, NextPage } from 'next';
import { useMemo } from 'react';
import { Head } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { PostFrontMatter } from '../types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
interface HomePageProps {
  posts: PostFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Create list with all blog post
  const posts = await getFrontMatterOfPosts();

  // Return page props
  return { props: { posts } };
};

// Client side React.js code
const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  // Create search state
  const [search] = useState('');

  // Create filtered posts list
  useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  async () => {
    try {
      await navigator.clipboard.writeText('crystopia.net');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const images = ['/showcase/1.png', '/showcase/2.png', '/showcase/3.png', '/showcase/4.png'];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsChanging(true); // Start der Animation
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        setIsChanging(false); // Ende der Animation
      }, 500); // Wartezeit für die Animation, bevor das Bild gewechselt wird
    }, 3000); // Ändert das Bild alle 3000 Millisekunden (3 Sekunden)

    return () => clearInterval(intervalId); // Bereinigung bei Komponenten-Unmount
  }, [images.length]);
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
        <h1>Crystopia.net | Minecraft Server</h1>
      </div>

      <p>
        Hello an Welcome to our Website. Here you get Bog Post with Updates and
        can Search in the Guides.
      </p>

      <br></br>

      <p>
        We are Crystopia a Unique Place and Community to play Minecraft. You can
        Join our Discord to Chat with us or Join the Server in the Latest
        Minecraft version on crystopia.net. Here you can find some Images...
        More Follow!
      </p>
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
            className="h-6 w-6 mr-2"
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

      <div className="">
        <div
          className={`transition-opacity duration-500 ${
            isChanging ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={images[currentImage]}
            alt="Image"
            width={1000} // Setzen Sie die gewünschte Breite
            height={1000} // Setzen Sie die gewünschte Höhe
            className=""
          />
        </div>
      </div>

      <div className="bg-gray-900 shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Story - Together we create</h2>
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
            onClick={() => window.open('/team')}
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
    </>
  );
};

export default HomePage;
