import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Head, Image, PostList } from '../components';
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
  const [search, setSearch] = useState('');

  // Create filtered posts list
  const filteredPosts = useMemo(
    () =>
      posts.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  return (
    <>
      <Head
        title="Team - Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
        <h1>Crystopia.net | Team</h1>
      </div>
      <br></br>

      <h4>Owner</h4>
      <br></br>
      <div>
        <Image
          src="/images/mc.prifiles/tnsjesper-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline"
          alt="tnsjesper"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />{' '}
        <Link href={'https://discord.com/users/850470027026759690'}>
          tnsjesper
        </Link>
      </div>
      <br></br>
      <div>
        <Image
          src="/images/mc.prifiles/malte-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/817118151534837820'}>
          Soulapollo{' '}
        </Link>
      </div>

      <h4>Admin</h4>

      <br></br>
      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/Darkblue_DragonX-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/817118151534837820'}>
          Darkblue{' '}
        </Link>
      </div>

      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/Creeper_9190-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="Creeper"
        />{' '}
        <Link href={'https://discord.com/users/526060580935565314'}>
          Creeper
        </Link>
      </div>

      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/NrwPlayYT-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/926160716350767194'}>
          NrwPlayYT
        </Link>
      </div>

      <h4>Moderator</h4>

      <br></br>
      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/einfxch_jonas-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/1000129480750284941'}>
          Jonas
        </Link>
      </div>

      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/MrMinecraft313-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/1025273619422658561'}>
          Mr Minecraft
        </Link>
      </div>

      <h4>Helper</h4>

      <br></br>
      <br></br>

      <div>
        <Image
          src="/images/mc.prifiles/Bruno-mc.png"
          className="w-8 h-8 prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12 inline "
          alt="malte-mc"
        />{' '}
        <Link href={'https://discord.com/users/1059455303478939738'}>
          Bruno
        </Link>
        <br></br>
        <br></br> <br></br>
        <br></br> <br></br>
        <br></br> <br></br>
        <br></br>
      </div>
     
    </>
  );
};

export default HomePage;
