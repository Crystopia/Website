import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // Adjust if you're using a different <Head> component
import Image from 'next/image';
import { httpGetAsync } from '../components/WebAccess';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const TeamCard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const url =
          'https://github.com/Crystopia/Content/raw/refs/heads/main/website/teamlist.json';
        httpGetAsync(url, (body) => {
          setTeamMembers(JSON.parse(body));
        });
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamMembers();
  }, []);

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
      <br />
      <br />
      <br />
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
                src={member.image}
                alt={`${member.name} avatar`}
                className="w-60 h-60 rounded-full"
                width={200}
                height={200}
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
