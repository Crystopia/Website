import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';
import '../styles/LoadingScreen.css';
import Image from 'next/image';

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
        {/* Navbar mit klappbarem Button für mobile Geräte */}
        <header className="fixed left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-2/3 bg-gray-800 rounded-b-lg shadow-lg p-4">
          <div className="flex justify-between items-center">
            <button
              className="text-white md:hidden"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                className="w-6 h-6"
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
            } mt-2 md:mt-0 md:flex md:justify-around items-center`}
          >
            {[
              { href: '/', label: 'Home', icon: '/icons/home.png' },
              { href: '/blog', label: 'Blog', icon: '/icons/blog.new.png' },
              {
                href: 'https://guides.crystopia.net',
                label: 'Guide',
                icon: '/icons/calendar.png',
              },
              { href: '#', label: 'Store', icon: '/icons/store.png' },
            ].map((item) => (
              <Link href={item.href} key={item.label}>
                <button className="flex items-center px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition transform duration-300 ease-in-out mt-2 md:mt-0">
                  <Image
                    className="h-5 w-5 mr-2"
                    src={item.icon}
                    alt={item.label}
                    width={1000}
                    height={1000}
                  />
                  <span className="text-lg">{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>
        </header>

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <div className="flex justify-center">
          <footer className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-lg w-full max-w-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-400 text-gray-600 px-3 py-1 rounded-lg font-bold">
                  <h6>crystopia.net</h6>
                </div>
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

            <div className="mt-4 text-center text-sm text-yellow-900">
              <p className="font-semibold">
                Crystopia.net, A Nexocrew Solution
              </p>
              <p>We are in no way affiliated with or endorsed by Mojang, AB.</p>
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
