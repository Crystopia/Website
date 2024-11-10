import { GetStaticProps, NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { httpGetAsync } from '../components/WebAccess';
import Link from 'next/link';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

// Define the type for the post
interface Post {
  title: string;
  slug: string;
  image: string;
  file: string;
  date: string;
  lang: string;
}

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

  const latestPost = posts[0];

  return (
    <>
      {' '}
      <ToastContainer
        position="bottom-right"
        autoClose={100}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <Head>
        <title>Crystopia.net</title>
      </Head>
      <div className="relative flex justify-center py-8">
        <div className="absolute inset-0 flex justify-center ml-10 mr-10">
          <Image
            src="/images/background.png"
            alt="background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="relative z-10 flex justify-center">
          <Image
            className="w-128 h-128 rounded-full prevent-default"
            src="/images/crystopia.png"
            alt="Crystopia.net"
            sizes="(max-width: 768px) 512px, (max-width: 1024px) 640px, 768px"
            width={768}
            height={768}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <br />
      <section className="text-center py-16 px-8 ">
        <h2
          style={{ color: '#78D5F5' }}
          className="font-bold text-5xl text-[#78D5F5]"
        >
          Crystopia News
        </h2>
        <p style={{ color: '#FFFFFF' }} className="text-gray-500 mt-4">
          Our latest Updates and News from our Server
        </p>

        {latestPost && (
          <div className="max-w-3xl mx-auto mt-8 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 border-4 border-[#a59079] ">
            <Link href={`/blog/${latestPost.slug}${lang}`}>
              <div className="group cursor-pointer">
                <Image
                  src={latestPost.image}
                  alt={latestPost.title}
                  width={500}
                  height={300}
                  className="object-contain w-full h-60 rounded-md" // Ändere "object-cover" in "object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-black">
                    {latestPost.title}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {new Date(latestPost.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </section>
      <section className="text-center py-16 px-8 ">
        <h1>
          <div>
            <p style={{ color: '#78D5F5' }} className="text-5xl font-bold mb-6">
              Our Story - Together we create
            </p>
          </div>
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <p
          style={{ color: '#FFFFFF' }}
          className="text-white max-w-3xl mx-auto"
        >
          Welcome to Crystopia. We are a unique Minecraft server with a focus on
          community and creativity. Our server is a place where you can build,
          explore, and make friends. Whether you are a seasoned Minecraft player
          or new to the game, we have something for everyone. Come join us
          today!
        </p>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="bg-[#78D5F5] h-20 w-70 flex items-center px-6 py-3 text-white rounded-md shadow transform transition hover:scale-105 "
            onClick={() =>
              window.open('https://crystopia.link/discord', '_blank')
            }
          >
            <b className="text-4xl text-gray-600 font-minecraftseven">
              Join our Discord
            </b>
          </button>{' '}
          <button
            className="bg-[#78D5F5] h-20 w-70 flex items-center px-6 py-3 text-white rounded-md shadow transform transition hover:scale-105 "
            onClick={() => window.open('/team', '_self')}
          >
            <b className="text-4xl text-gray-600 font-minecraftseven">
              Meet our Team
            </b>
          </button>{' '}
        </div>
      </section>
    </>
  );
};

export default HomePage;
