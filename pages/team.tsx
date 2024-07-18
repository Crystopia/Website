import React from 'react';
import Head from 'next/head'; // Adjust if you're using a different <Head> component
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  avatar: string;
  bgColor: string; // Add this line to the interface
}

const TeamCard: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Jesper',
      title: 'OWNER',
      description: `Hey there! I'm Jesper one of the Owner from Crystopia! I'm responsible for the server's development and the community. I'm always here to help you with any questions or problems you might have. I'm looking forward to seeing you on the server!`,
      avatar: '/images/mc.profiles/tnsjesper.png',
      bgColor: 'bg-red-500',
    },
    {
      name: 'Malte',
      title: 'OWNER',
      description: `Oh Hello! I'm Malte, one of the Owners from Crystopia! I'm Building and managing the server with Jesper. You can always ask me for help if you need it. You can find me on the Discord Server`,
      avatar: '/images/mc.profiles/soulapollo65074.png',
      bgColor: 'bg-red-500',
    },
    {
      name: 'Creeper',
      title: 'ADMIN',
      description: `I' Creeper... I'm one of the Admins from Crystopia! I'm moderating and administrating the server. If you have a question or needs help, you can ask me and I would help you. You can find me on the Minecraft and Discord Server. See you soon on the Minecraft and/or Discord Server`,
      avatar: '/images/mc.profiles/Creeper_9190.png',
      bgColor: 'bg-red-400',
    },
    {
      name: 'Darkblue',
      title: 'ADMIN',
      description: `Hello there! I'm Erik one of the Admin from Crystopia! I'm moderating and administrating the server. If you have a question or needs help, you can ask me and I would help you. You can find me on the Minecraft and Discord Server. See you soon on the Minecraft and/or Discord Server`,
      avatar: '/images/mc.profiles/Darkblue_DragonX.png',
      bgColor: 'bg-red-400',
    },
    {
      name: 'NrwPlay',
      title: 'ADMIN',
      description: `Admin of Crystopia! I'm always there for you if you have any questions or problems. I'm looking forward to seeing you on the server! Oh and I'm also responsible for the server System and the community.`,
      avatar: '/images/mc.profiles/nrwplay.png',
      bgColor: 'bg-red-400',
    },
    {
      name: 'Moritz',
      title: 'MOD',
      description: `Hello, I'm Moritz, Moderator at the Crystopia Minecraft Server. I would like to make this Server a better place by helping the community with questions etc. In my free time I'm developing applications and 3D printing stuff.
`,
      avatar: '/images/mc.profiles/mrmoritz_.png',
      bgColor: 'bg-blue-400',
    },
    {
      name: 'Bruno',
      title: 'SUPPORT',
      description: `Oh yes I'm Bruno and I'm in the team of Crystopia! I'm helping the players ingame and in the Discord and im always there, if u have questions about the server. Cya online ;D!`,
      avatar: '/images/mc.profiles/destruction_bee.png',
      bgColor: 'bg-green-400',
    },
    {
      name: 'Oezii',
      title: 'SUPPORT',
      description: `Wasup, I´m Oezii and in the team of Crystopia! I´m helping the players ingame and in the Discord and im always there, if u have questions about the server. Cya online ;D!`,
      avatar: '/images/mc.profiles/oezii.png',
      bgColor: 'bg-green-400',
    },
    // Add other team members here if necessary
  ];

  return (
    <>
      <Head>
        <title>Team - Crystopia.net</title>
        <meta
          name="description"
          content="Unique Minecraft server with a focus on community and creativity. Join us today!"
        />
      </Head>

      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1>Crystopia.net | Team</h1>
      </div>
      <br></br>
      <br></br>
      <br></br>

      {/* Card Builder */}

      <div className="bg-cream p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="mt-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <span
                className={`${member.bgColor} text-white px-3 py-1 rounded-full text-sm`}
              >
                {member.title}
              </span>
            </div>
            <div className="flex items-center justify-center gap-6">
              <Image
                src={member.avatar}
                alt={`${member.name} avatar`}
                className="w-60 h-60 rounded-full"
                width={20000}
                height={10}
              />
              <p className="max-w-lg text-left">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamCard;
