import { NextPage } from 'next';
import { Head } from '../../components';
import Image from 'next/image';

// Client side React.js code
const HomePage: NextPage = () => {
  // Create search state

  return (
    <>
      <Head
        title="Terms - Crystopia.net"
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
        <h1>Crystopia.net | Terms of Service</h1>
      </div>

      <p>
        You agree to be bound by our website rules and any laws which may apply
        to this website and your participation.
      </p>
      <p>
        The website administration have the right to terminate your account at
        any time, delete any content you may have posted, and your IP address
        and any data you input to the website is recorded to assist the site
        staff with their moderation duties.
      </p>
      <p>
        The site administration have the right to change these terms and
        conditions, and any site rules, at any point without warning. Whilst you
        may be informed of any changes, it is your responsibility to check these
        terms and the rules at any point.
      </p>
      <p></p>
      <p>EXTRA AND EXPANSION</p>
      <p></p>
      <p>1. Acceptance of Terms</p>
      <p>
        By using our services, you agree to the following terms and conditions.
      </p>
      <p></p>
      <p>2. Privacy and Data Usage</p>
      <p>
        We collect and store certain information, including IP addresses and
        usage analytics, in our database for improving our services and ensuring
        proper functioning.
      </p>
      <p></p>
      <p>3. Minecraft Server Rules</p>
      <p>
        You agree to follow the rules and guidelines set forth for using our
        Minecraft server. Any violations may result in account suspension or
        termination.
      </p>
      <p></p>
      <p>4. Intellectual Property</p>
      <p>
        All content provided by us, including but not limited to text, graphics,
        logos, and software, is the property of [Your Company Name] and
        protected by copyright laws.
      </p>
      <p></p>

      <p>5. Disclaimer of Liability</p>
      <p>
        We are not responsible for any damages, losses, or liabilities arising
        from your use of our services.
      </p>
      <p></p>
      <p>6. Changes to Terms</p>
      <p>
        We reserve the right to modify these terms at any time. Continued use of
        our services constitutes acceptance of any changes.
      </p>
      <p></p>
      <p>7. Governing Law</p>
      <p>
        These terms are governed by the laws of [Your Jurisdiction]. Any
        disputes shall be resolved in the appropriate courts of [Your
        Jurisdiction].
      </p>
      <p></p>
      <p>8. Age and User</p>
      <p>Only member over 16 are allowed to create a Account</p>
      <p></p>
      <p>By using our services, you acknowledge that you have read, unde</p>
      <p>rstood, and agreed to these terms.</p>
      <br></br>

      <ul className="flex mt-6 space-x-8 prevent-default md:space-x-9 lg:space-x-10 md:mt-8 lg:mt-10">
        {[].map(href => (
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
