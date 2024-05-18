import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Head, Image } from '../../../components';
import { GuideList } from '../../../components/GuidesListDE';
import { getFrontMatterOfGuides } from '../../../helpers/getFrontMatterOfGuidesDE';
import { GuideFrontMatter } from '../../../types/guides';

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
  const [search] = useState('');

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
      <div>
        <Link href={'/guides'}>
          <b className="text-white hover:text-gray-400">
            Go to Englisch Guides
          </b>
        </Link>
      </div>
      <p>
      Hier finden Sie unsere Guides und Tutorials für den Crystopia Minecraft
        Server. Um loszulegen, kannst du die Suchleiste unten benutzen, um den
        Anleitung zu finden, die Sie suchen. Wenn Sie nicht finden können, was Sie suchen,
        kannst du gerne unserem Discord beitreten und um Hilfe bitten. Wir sind immer froh, wenn wir
        helfen! 🚀
      </p>

      <br></br>

      <ul className="flex mt-6 space-x-8 prevent-default md:space-x-9 lg:space-x-10 md:mt-8 lg:mt-10">
        {[].map(({ href }) => (
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

      {filteredguides.length ? (
        <GuideList
          className="mt-12 md:mt-16 lg:mt-20"
          guides={filteredguides}
        />
      ) : (
        <p className="mt-12 md:mt-16 lg:mt-20">
          The post you are looking for does not exist yet. 😬
        </p>
      )}
    </>
  );
};

export default HomePage;
