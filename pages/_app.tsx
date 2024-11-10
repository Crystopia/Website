import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';
import '../styles/LoadingScreen.css';
import Image from 'next/image';
import { toast } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const gradientElementRef = useRef<HTMLDivElement>(null);
  const opacityElementRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    setTheme(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'dark'
    );
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <Image
            src="/images/grass.png"
            alt="Loading..."
            width={1000}
            height={20}
            className="animate-spin h-auto grayscale max-w-9"
          />
        </div>
      ) : null}
      <div>
        <header className="mt-7 fixed left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-2/3 bg-gray-800 rounded-lg shadow-lg p-6">
          {' '}
          {/* Erhöhtes Padding */}
          <div className="flex justify-between items-center">
            <button
              className="text-white md:hidden"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <nav
            className={`${
              navbarOpen ? 'block' : 'hidden'
            } mt-4 md:mt-0 md:flex md:justify-around items-center`}
          >
            {[
              { href: '/', label: 'Home', icon: '/icons/home.png' },
              { href: '/blog', label: 'Blog', icon: '/icons/blog.new.png' },
              {
                href: 'https://guides.crystopia.net',
                label: 'Guide',
                icon: '/icons/calendar.png',
              },
            ].map((item) => (
              <Link href={item.href} key={item.label}>
                <button
                  style={{ color: '#78D5F5' }}
                  className="font-minecraftseven inline-flex items-center px-4 py-3 border border-transparent text-lg font-medium rounded-md text-white hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                >
                  <Image
                    className="h-6 w-6 mr-3 mt-3"
                    src={item.icon}
                    alt={item.label}
                    width={1000}
                    height={1000}
                  />
                  <span className="text-4xl">{item.label}</span>
                </button>
              </Link>
            ))}
            <button
              className="font-minecraftseven inline-flex items-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white  hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
              onClick={() => {
                toast('Copied IP to clipboard', {
                  type: 'success',
                });
                navigator.clipboard.writeText('crystopia.net');
              }}
            >
              <Image
                className="h-7 w-7 mr-3  mt-3"
                src={'/icons/copy-ip.png'}
                sizes="12"
                alt="home"
                width={1000}
                height={1000}
              ></Image>{' '}
              <b style={{ color: '#78D5F5' }} className="text-3xl">
                CRYSTOPIA.NET
              </b>
            </button>
          </nav>
        </header>

        <main className="min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>
        <div className="flex justify-center ">
          <footer className="rounded-lg shadow-lg w-full max-w-3xl p-6 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 rounded-lg font-bold"></div>
              </div>

              <div className="flex items-center space-x-4 text-yellow-900">
                <Link href="https://discord.crystopia.net" target="_blank">
                  <Image
                    src={'/icons/discord.png'}
                    alt="Discord"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href="https://twitter.com/CrystopiaNet" target="_blank">
                  <Image
                    src={'/icons/twitter.png'}
                    alt="Twitter"
                    width={20}
                    height={20}
                  />
                </Link>

                <Link
                  href="https://www.youtube.com/@CrystopiaNet"
                  target="_blank"
                >
                  <Image
                    src={'/icons/youtube.png'}
                    alt="YouTube"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-black">
              <p className="font-semibold">
                Crystopia.net, A Nexocrew Solution
              </p>
              <p>We are in no way affiliated with or endorsed by Mojang, AB.</p>
            </div>
            <div
              style={{ color: '#78D5F5' }}
              className="ml-56 p-1 mr-5 inline-flex justify-center space-x-4"
            >
              <Link className="text-center ml-1 p-1 mr-5" href="/legal/imprint">
                <p style={{ color: '#78D5F5' }}>Imprint</p>
              </Link>
              <Link
                style={{ color: '#78D5F5' }}
                className="text-center ml-1 p-1 mr-5"
                href="/legal/privacy"
              >
                <p style={{ color: '#78D5F5' }}>Privacy</p>
              </Link>
              <Link
                style={{ color: '#78D5F5' }}
                className="text-[#78D5F5] text-center ml-1 p-1 mr-5"
                href="/legal/terms"
              >
                <p style={{ color: '#78D5F5' }}>Terms</p>
              </Link>
            </div>
          </footer>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default MyApp;
