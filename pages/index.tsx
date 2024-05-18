import { GetStaticProps, NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Head, Image } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { PostFrontMatter } from '../types';
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
        Minecraft version on crystopia.net.
      </p>
      <br></br>
    </>
  );
};

export default HomePage;
