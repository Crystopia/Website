import { NextPage } from 'next';
import { Head } from '../components';
import Image from 'next/image';

// Client side React.js code
const HomePage: NextPage = () => {
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
      <p>
        Thank you to all the contributors who have made Crystopia.net possible.
        We deeply appreciate your hard work, dedication, and creativity in
        crafting a unique and engaging Minecraft server experience for our
        community. Your countless hours of effort, innovative ideas, and
        unwavering commitment have transformed Crystopia.net into a vibrant and
        thriving environment. Without your invaluable contributions,
        Crystopia.net would not be the incredible place it is today. From the
        bottom of our hearts, thank you for being an integral part of our
        journey and for helping us build a wonderful virtual world that brings
        joy to so many players.
      </p>

      <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        Minecraft Server
      </h4>
      <ul className="list-disc pl-6">
        <li>Hypixel.net</li>
        <li>originrealms.com</li>
        <li>hibiscusmc.com</li>
        <li>gommehd.net</li>
        <li>mccisland</li>
        <li>cytooxien.de</li>
        <li>playlegend.net</li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        Tools and Software
      </h4>
      <ul className="list-disc pl-6">
        <li>https://docker.com</li>
        <li>https://github.com</li>
        <li>https://discord.com</li>
        <li>Bookstack</li>
        <li>https://nginx.com</li>
        <li>https://nodejs.org</li>
        <li>https://reactjs.org</li>
        <li>https://nextjs.org</li>
        <li>https://tailwindcss.com</li>
      </ul>
    </>
  );
};

export default HomePage;
