import { NextPage } from 'next';
import { Head } from '../../components';
import Image from 'next/image';

// Client side React.js code
const HomePage: NextPage = () => {
  return (
    <>
      <Head
        title="Privacy - Crystopia.net"
        description="Unique Minecraft server with a focus on community and creativity. Join us today!"
      />
      <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6 justify-center">
        <Image
          className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
          src="/images/crystopia.png"
          alt="Crystopia.net"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
          width={48}
          height={48}
        />
        <h1 className="text-5xl">Crystopia.net | Privacy</h1>
      </div>
      <br></br>
      <p className="ml-48 mt-10 mr-16 text-white">
        The following privacy policy outlines how your data is used on our
        website.
        <br />
        <br />
        <strong className="font-minecraftseven text-3xl">Data</strong>
        <br />
        <br></br>
        Basic non-identifiable information about your user on the website is
        collected; the majority of which is provided during registration, such
        as email addresses and usernames.
        <br />
        In addition to this, IP addresses for registered users are stored within
        the system to aid with moderation duties. This includes spam prevention,
        and detecting alternative accounts.
        <br />
        <br />
        Accounts can be deleted by a site administrator upon request, which will
        remove all data relating to your user from our system.
        <br />
        <br />
        <strong className="font-minecraftseven text-3xl">Cookies</strong>
        <br />
        <br />
        Cookies are used to store small pieces of non-identifiable information
        with your consent. In order to consent to the use of cookies, you must
        either close the cookie notice (as explained within the notice) or
        register on our website.
        <br />
        Data stored by cookies include any recently viewed topic IDs, along with
        a unique, unidentifiable hash upon logging in and selecting
        &quot;Remember Me&quot; to automatically log you in next time you visit.
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
    </>
  );
};

export default HomePage;
