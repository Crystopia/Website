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
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <Image
            src="/images/grass.png"
            alt="Loading..."
            width={1000}
            height={20}
            className="animate-spin h-auto grayscale max-w-9" // Add this line
          />
        </div>
      ) : null}
      <div className="relative">
        <div
          className="w-full h-full absolute z-[-1] top-0 left-0"
          ref={opacityElementRef}
        >
          <div
            className="w-full h-full opacity-10 dark:opacity-[.15]"
            ref={gradientElementRef}
          />
        </div>

        {/* */}
        <header className="fixed top-0 left-0 z-20 w-full p-4 flex justify-between items-center space-x-4 ">
          {/* Toggle-Button nur auf Mobilgeräten sichtbar */}
          <button
            className="z-30 md:hidden absolute top-0 right-0 m-4" // Button ist jetzt immer in der oberen rechten Ecke
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              className="w-10 h-10 text-white"
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
              ></path>
            </svg>
          </button>
          {/* Navigation immer sichtbar auf PC, verborgen auf Mobilgeräten, wenn navbarOpen false ist */}
          <nav
            className={`${
              navbarOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row justify-center w-full space-x-4`}
          >
            <Link href={'/'}>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                type="button"
              >
                <Image
                  className="h-5 w-5 mr-2"
                  src={'/icons/home.png'}
                  alt="home"
                  width={1000}
                  height={1000}
                ></Image>{' '}
                <b className="text-2xl text-white">Home</b>
              </button>
            </Link>

            <Link href={'/blog'}>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                type="button"
              >
                <Image
                  className="h-5 w-5 mr-2"
                  src={'/icons/blog.new.png'}
                  alt="home"
                  width={1000}
                  height={1000}
                ></Image>{' '}
                <b className="text-2xl text-white">Blog</b>
              </button>
            </Link>
            <Link href={'https://guides.crystopia.net'}>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                type="button"
              >
                <Image
                  className="h-5 w-5 mr-2"
                  src={'/icons/calendar.png'}
                  alt="home"
                  width={1000}
                  height={1000}
                ></Image>{' '}
                <b className="text-2xl text-white">Guide</b>
              </button>
            </Link>
            <Link href={'#'}>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                type="button"
              >
                {' '}
                <Image
                  className="h-5 w-5 mr-2"
                  src={'/icons/store.png'}
                  alt="home"
                  width={1000}
                  height={1000}
                ></Image>{' '}
                <b className="text-2xl text-white">Store</b>
              </button>
            </Link>
          </nav>
        </header>

        {/*  */}

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <>
          <div className="flex justify-center">
            <footer className="bg-gray-800 text-white rounded-lg shadow-xl flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6">
              <Image
                src={'/images/Panda.png'}
                alt="Crystopia Logo"
                width={150} // Reduzierte Breite für mobile Geräte
                height={150} // Reduzierte Höhe für mobile Geräte
                className="mb-4 sm:mb-0 sm:mr-4" // Anpassen der Abstände für mobile Geräte
              />

              <div className="text-center text-xs sm:text-sm">
                &copy; Copyright {new Date().getFullYear()} Crystopia.net
                <br className="sm:hidden" />{' '}
                {/* Br-Tag nur auf kleinen Bildschirmen anzeigen */}
                <Link
                  href={'/leagel/imprint'}
                  className="hover:text-yellow-300"
                >
                  Imprint
                </Link>{' '}
                -{' '}
                <Link
                  href={'/leagel/terms'}
                  className="hover:text-yellow-300 ml-2"
                >
                  Terms of Service
                </Link>{' '}
                -{' '}
                <Link
                  href={'/leagel/privacy'}
                  className="hover:text-yellow-300"
                >
                  Privacy Policy
                </Link>
                <br />
                We are in no way affiliated with or endorsed by Mojang, AB.
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="p-3 border border-gray-400 rounded-full">
                    <Link
                      href="https://discord.crystopia.net"
                      className="text-white hover:text-yellow-300"
                      target="_blank"
                    >
                      <Image
                        src={'/icons/discord.png'}
                        alt="Discord"
                        width={1000} // Reduzierte Größe für mobile Geräte
                        height={1000} // Reduzierte Größe für mobile Geräte
                      />
                    </Link>
                  </div>
                  <div className="p-3 border border-gray-400 rounded-full">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText('crystopia.net')
                      }
                    >
                      <Image
                        src={'/icons/copy-ip.png'}
                        sizes="12"
                        alt="home"
                        width={1000}
                        height={1000}
                      ></Image>{' '}
                    </button>
                  </div>
                  <div className="p-3 border border-gray-400 rounded-full">
                    <Link
                      href="https://twitter.com/CrystopiaNet"
                      className="text-white hover:text-yellow-300"
                      target="_blank"
                    >
                      <Image
                        src={'/icons/twitter.png'}
                        alt="home"
                        width={1000}
                        height={1000}
                      />
                    </Link>
                  </div>
                  <div className="p-3 border border-gray-400 rounded-full">
                    <Link
                      href="https://www.youtube.com/@CrystopiaNet"
                      className="text-white hover:text-yellow-300"
                      target="_blank"
                    >
                      <Image
                        src={'/icons/youtube.png'}
                        alt="home"
                        width={1000}
                        height={1000}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export default MyApp;
