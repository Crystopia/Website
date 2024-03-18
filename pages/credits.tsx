import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Head } from '../components';
import Image from 'next/image';

// Client side React.js code
const HomePage: NextPage = ({}) => {
  // Create search state

  return (
    <>
      <Head
        title="Credits - Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1>Crystopia.net | Credits</h1>
      </div>

      <h3>
        Thanks to all of the inspirations <strong>or</strong> provide ths
        Service{' '}
      </h3>
      <br></br>
      <br></br>

      <h4>Minecraft Server</h4>
      <div className="text-stone-500">originrealms.com</div>
      <div className="text-stone-500">landania.net</div>
      <div className="text-stone-500">hibiscusmc.com</div>
      <div className="text-stone-500">hypixel.net</div>
      <div className="text-stone-500">mccisland.net</div>

      <h4>Tools</h4>
      <div className="text-stone-500">Google</div>
      <div className="text-stone-500">Discord</div>
      <div className="text-stone-500">Docker</div>
      <div className="text-stone-500">Portianer</div>
      <div className="text-stone-500">itzg/minecraft-server</div>

      <h4>Plugins</h4>
      <div className="text-stone-500">Techscode</div>
      <div className="text-stone-500">HelpChat</div>
      <div className="text-stone-500">Denizen/Citizens</div>
      <div className="text-stone-500">LoneDev</div>
      <div className="text-stone-500">Luckperms</div>

      <br></br>
      <br></br>
      <br></br>
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
    </>
  );
};

export default HomePage;
