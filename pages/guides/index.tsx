import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Head, Image, GuideList } from '../../components';
import { getFrontMatterOfGuides } from '../../helpers/getFrontMatterOfGuides';
import { GuideFrontMatter } from '../../types/guides';

interface HomePageProps {

  guides: GuideFrontMatter[];
}

// Build time Node.js code
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Create list with all blog post
  const guides = await getFrontMatterOfGuides();

  // Genearte RSS feed and add it to public directory
  

  // Return page props
  return { props: { guides } };
};

// Client side React.js code
const HomePage: NextPage<HomePageProps> = ({ guides }) => {
  // Create search state
  const [search, setSearch] = useState('');

  // Create filtered guides list
  const filteredguides = useMemo(
    () =>
      guides.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      ),
    [guides, search]
  );

  return (
    <>
      <Head
        title="Guides - Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
        <h1>Crystopia.net | Guides</h1>
      </div>

      <p>
        Here You can Find our Guides and Tutorials for the Crystopia Minecraft
        Server. To get started, you can use the search bar below to find the
        guide you are looking for. If you can't find what you are looking for,
        feel free to join our Discord and ask for help. We are always happy to
        help! 🚀
      </p>

      <br></br>

    
      <ul className="flex mt-6 space-x-8 prevent-default md:space-x-9 lg:space-x-10 md:mt-8 lg:mt-10">
        {[].map(({ href, Icon }) => (
          <li key={href}>
            <a
              className="block h-8 text-black prevent-default lg:h-9 dark:text-white"
              href={href}
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
        ))}
      </ul>

      <input
        className="w-full sticky z-30 top-16 md:top-20 lg:top-24 xl:top-1.5 border-2 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:border-sky-400 dark:focus:border-sky-600 outline-none rounded-2xl py-3 lg:py-4 px-4 md:px-5 lg:px-6 mt-12 md:mt-16 lg:mt-20 placeholder-gray-500 text-base lg:text-lg text-gray-700 dark:text-gray-300 transition-colors"
        type="text"
        placeholder="Search for a guide..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredguides.length ? (
        <GuideList className="mt-12 md:mt-16 lg:mt-20" guides={filteredguides} />
      ) : (
        <p className="mt-12 md:mt-16 lg:mt-20">
          The post you are looking for does not exist yet. 😬
        </p>
      )}
    </>
  );
};

export default HomePage;
