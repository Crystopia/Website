import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useMemo, useState } from 'react';
import { trackAnalyticsPageview } from '../helpers/trackAnalyticsPageview';
import { ThemeIcon, GitHubIcon } from '../icons';
import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';
import axios from 'axios';
import Image from 'next/image';
const mcs = require('node-mcstatus');

function MyApp({ Component, pageProps }: AppProps) {
  // Add Next.js router hook
  const router = useRouter();

  // Create theme and background state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const gradientElementRef = useRef<HTMLDivElement>(null);
  const opacityElementRef = useRef<HTMLDivElement>(null);

  // Track Google Analytics pageviews when route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', trackAnalyticsPageview);
    return () => {
      router.events.off('routeChangeComplete', trackAnalyticsPageview);
    };
  }, [router.events]);

  // Set initial theme based on user's prefers color scheme
  useEffect(() => {
    setTheme(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);

  // Add or remove dark class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /**
   * It randomly updates the page background.
   */
  const updateBackground = () => {
    const { scrollHeight } = document.documentElement;
    const sectionHeight = 700;
    const colors = ['#00A5FF', '#00FFC4', '#4500FF'];
    const startSide = Math.round(Math.random());
    const nextBackground = [];
    for (let i = 0; i < scrollHeight / sectionHeight; i++) {
      const left =
        (i + startSide) % 2 ? 15 : 85 + Math.floor(Math.random() * 12 - 6);
      const top = i * sectionHeight + sectionHeight / 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      nextBackground.push(
        `radial-gradient(circle at ${left}% ${top}px, ${color}, ${color}00 500px)`
      );
    }
    gradientElementRef.current!.style.background = nextBackground.join(', ');
  };

  // Set initial background and update it when path or window size change
  useEffect(updateBackground, [router.asPath]);
  useEffect(() => window.addEventListener('resize', updateBackground), []);

  // Animate background opacity with 10 FPS to reduce GPU load
  useEffect(() => {
    const fps = 10;
    let opacity = 1;
    let direction = 1;
    setInterval(() => {
      opacity += direction * (0.1 / fps);
      if (opacity < 0 || opacity > 1) {
        direction *= -1;
      } else {
        opacityElementRef.current!.style.opacity = opacity.toString();
      }
    }, 1000 / fps);
  }, []);

  // Create background color depending on theme
  const bgColor = useMemo(
    () => (theme === 'light' ? '#ffffff' : '#000000'),
    [theme]
  );

  const [playercount, setPlayercount] = useState('');
  const [maxplayercount, setMaxplayercount] = useState('');

  const printResult = async () => {
    try {
      const result = await axios.get(
        'https://api.mcsrvstat.us/2/crystopia.net'
      );
      const onlinePlayers = result.data.players.online;
      const maxplayercount = result.data.players.max;
      setPlayercount(onlinePlayers); // Aktualisieren der playercount-Variable
      setMaxplayercount(maxplayercount);
    } catch (err) {
      console.error('Failed to get result: ', err);
    }
  };
  useEffect(() => {
    printResult();
  }, []); // Die printResult-Funktion wird aufgerufen, wenn die Komponente gemountet wird

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('crystopia.net');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <Head>
        <meta name="theme-color" content={bgColor} />
        <meta name="msapplication-TileColor" content={bgColor} />
      </Head>

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

        <header className="fixed top-0 left-0 z-20 w-full p-4 dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur md:p-5 lg:py-6 lg:px-10">
          <nav className="flex justify-between">
            <Link
              href="/"
              className="prevent-default max-w-[45%] p-3 -m-3 text-base sm:text-lg lg:text-xl text-white hover:text-gray-900 font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Crystopia.net
            </Link>

            {/* Dropdown */}
            <div
              className="relative inline-block text-left float-right"
              ref={ref}
            >
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  ☰
                </button>
              </div>

              {isOpen && (
                <div className="origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white text-center"
                      role="menuitem"
                    >
                      Home
                    </a>
                    <a
                      href="/blog"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white text-center"
                      role="menuitem"
                    >
                      Blog
                    </a>
                    <a
                      href="/guides"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white text-center"
                      role="menuitem"
                    >
                      Guides
                    </a>
                    <a
                      href="/partner"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white text-center"
                      role="menuitem"
                    >
                      Partner
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Link target="_blank" href={'https://discord.crystopia.net'}>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-discord"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                  </svg>
                </button>
              </Link>
            </div>

            <div className="p-3 w-auto  bg-slate-600 rounded-xl shadow-md flex items-center space-x-4">
              <div>
                {' '}
                <button
                  className="hover:text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                  onClick={copyToClipboard}
                  title="Copy IP to clipboard"
                >
                  CRYSTOPIA.NET
                </button>
                {playercount}
              </div>
            </div>
          </nav>
        </header>

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="px-4 pb-6 space-y-2 text-gray-500 md:flex md:justify-between md:space-y-0 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
          <div>&copy; Copyright {new Date().getFullYear()} Crystopia.net</div>

          <div>
            {' '}
            <Link href={'/leagel/imprint'}>Imprint</Link> -{' '}
            <Link href={'/leagel/terms'}>Terms of Service</Link> -{' '}
            <Link href={'/leagel/privacy'}>Privacy</Link> -{' '}
            <Link href={'/partner'}>Partner</Link> -{' '}
            <Link href={'/credits'}>Credits</Link> -{' '}
            <Link href={'/team'}>Team</Link>{' '}
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
