import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Head, PostList } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { PostFrontMatter } from '../types';
import { Html } from 'next/document';
import Image from 'next/image';
// import '../styles/global.css';

interface HomePageProps {
  posts: PostFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Create list with all blog post
  const posts = await getFrontMatterOfPosts();

  // Genearte RSS feed and add it to public directory

  // Return page props
  return { props: { posts } };
};

const HomePage: NextPage = ({}) => {
  return (
    <>
      <Head
        title="Partner - Crystopia.net"
        description="Unique Minecraft server
        with a focus on community and creativity. Join us today!"
      ></Head>

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1>Crystopia.net | Partner</h1>
      </div>

      <br></br>
      <br></br>

      <div>
        <span className="inline-block">
          <Image
            src={
              'https://cdn.discordapp.com/icons/654018472413757460/e1d35a8275dd75900a51424876128e35.png?size=512'
            }
            alt="Partner Logo"
            className="border-5 rounded-lg prevent-default md:w-24 lg:w-28 md:h-24 lg:h-28 inline"
            width={200}
            height={200}
          />{' '}
          <div className="inline">
          Der Offizielle Server und Community Discord vom Streamer Phönix of Game
          </div>
         
        </span>
        <div>
          {' '}
          <Link href={'https://discord.gg/zT27mJCSkB'}>Discord</Link> -{' '}
          <Link href={'https://www.twitch.tv/phoenix_of_game'}>Twitch</Link>
        </div>
      </div>

      <br></br>

      <br></br>
      <div>
        <span className="inline-block">
          <Image
            src={
              'https://cdn.discordapp.com/icons/1002526448353034240/7186fb0beb243319f4b8e6dd292959e5.webp?size=300'
            }
            alt="Partner Logo"
            className="border-5 rounded-lg prevent-default md:w-24 lg:w-28 md:h-24 lg:h-28 inline"
            width={200}
            height={200}
          />{' '}
          <div className="inline">
            BLUΞ LOUNGΞ ist dein Server für Community und Discord Minispiele.
           
          </div>
        </span>
        <div>
          {' '}
          <Link href={'https://discord.gg/HdM4Yv2gau'}>Discord</Link>
        </div>
      </div>

      <br></br>
      

      <br></br>
    </>
  );
};

export default HomePage;
