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
  textcolor: string;
}

const TeamCard: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // class="bg-red-500 bg-red-400 bg-blue-500 bg-blue-400 bg-green-500 bg-green-400 bg-yellow-500 bg-yellow-400 bg-purple-500 bg-purple-400 bg-pink-500 bg-pink-400 bg-indigo-500 bg-indigo-400 bg-gray-500 bg-gray-400 bg-black bg-white"
        // class="text-red-500 text-red-400 text-blue-500 text-blue-400 text-green-500 text-green-400 text-yellow-500 text-yellow-400 text-purple-500 text-purple-400 text-pink-500 text-pink-400 text-indigo-500 text-indigo-400 text-gray-500 text-gray-400 text-black text-white"
        const url =
          'https://raw.githubusercontent.com/Crystopia/Content/refs/heads/main/website/teamlist.json';
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
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
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
      <div className="bg-cream p-6 rounded-lg shadow-md max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="mt-7 p-5">
              <br></br> <br></br>
              <div className="flex items-center justify-center gap-4 mb-2">
                <h3 className={`text-xl font-semibold ${member.textcolor}`}>
                  {member.name}
                </h3>
                <span
                  className={`${member.bgColor} text-white px-3 py-1 rounded-full text-sm `}
                >
                  {member.title}
                </span>
                <br></br>
                <br></br>
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
      </div>
    </>
  );
};

export default TeamCard;
