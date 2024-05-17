import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Head, Image } from '../components';
import { getFrontMatterOfPosts } from '../helpers/getFrontMatterOfPosts';
import { PostFrontMatter } from '../types';

interface TeamMember {
  name: string;
  imageUrl: string;
  discordUrl: string;
  role: string;
  bio: string;
}

interface HomePageProps {
  posts: PostFrontMatter[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'tnsjesper',
    imageUrl: '/images/mc.profiles/tnsjesper-mc.png',
    discordUrl: 'https://discord.com/users/850470027026759690',
    role: 'Owner',
    bio: 'Founder of Crystopia.net. Developer and server manager. Organizes events and manages the community.',
  },
  {
    name: 'Soulapollo',
    imageUrl: '/images/mc.profiles/malte-mc.png',
    discordUrl: 'https://discord.com/users/817118151534837820',
    role: 'Owner',
    bio: "Owner and Builder on Crystopia.net. Responsible for the server's design and aesthetics.",
  },
  {
    name: 'Darkblue',
    imageUrl: '/images/mc.profiles/Darkblue_DragonX-mc.png',
    discordUrl: 'https://discord.com/users/817118151534837820',
    role: 'Admin',
    bio: 'Administrator responsible for server maintenance.',
  },
  {
    name: 'Creeper',
    imageUrl: '/images/mc.profiles/Creeper_9190-mc.png',
    discordUrl: 'https://discord.com/users/526060580935565314',
    role: 'Admin',
    bio: 'Admin and Dev. Responsible for server development and maintenance.',
  },
  {
    name: 'NrwPlayYT',
    imageUrl: '/images/mc.profiles/NrwPlayYT-mc.png',
    discordUrl: 'https://discord.com/users/926160716350767194',
    role: 'Admin',
    bio: 'Admin and Test Team Leader. Responsible for testing new features and updates.',
  },
  {
    name: 'Jonas',
    imageUrl: '/images/mc.profiles/einfxch_jonas-mc.png',
    discordUrl: 'https://discord.com/users/1000129480750284941',
    role: 'Moderator',
    bio: 'Moderator ensuring fair play.',
  },
  {
    name: 'Bruno',
    imageUrl: '/images/mc.profiles/Bruno-mc.png',
    discordUrl: 'https://discord.com/users/1059455303478939738',
    role: 'Helper',
    bio: 'Helper assisting new players.',
  },
  {
    name: 'Moritz',
    imageUrl: '/images/mc.profiles/mrmoritz_.png',
    discordUrl: 'https://discord.com/users/901731707508654131',
    role: 'Moderator',
    bio: 'Moderatre the Server and Help the Players.',
  },
];

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getFrontMatterOfPosts();
  return { props: { posts } };
};

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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

      <div className="container mx-auto p-4 bg-black text-white">
        {['Owner', 'Admin', 'Moderator', 'Helper'].map((role) => (
          <div key={role}>
            <h2 className="text-2xl font-semibold mt-6 mb-4">{role}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {teamMembers
                .filter((member) => member.role === role)
                .map((member) => (
                  <div
                    key={member.name}
                    className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                    onClick={() => setSelectedMember(member)}
                  >
                    <Image
                      src={member.imageUrl}
                      className="w-28 h-28 rounded-full mx-auto"
                      alt={member.name}
                      sizes="(max-width: 768px) 64px, (max-width: 1024px) 72px, 80px"
                    />
                    <h3 className="text-center mt-2 font-semibold">
                      {member.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {selectedMember && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-gray-900 p-6 rounded-lg w-96 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-right">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedMember(null)}
                >
                  &times;
                </button>
              </div>
              <Image
                src={selectedMember.imageUrl}
                className="w-80 h-80 rounded-full mx-auto"
                alt={selectedMember.name}
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 104px, 112px"
              />
              <h2 className="text-2xl font-bold text-center mt-4">
                {selectedMember.name}
              </h2>
              <p className="text-center mt-2">{selectedMember.role}</p>
              <p className="mt-4">{selectedMember.bio}</p>
              <div className="text-center mt-4">
                <a
                  href={selectedMember.discordUrl}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact on Discord
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
