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

        <header className="fixed top-0 left-0 z-20 w-full p-4 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 backdrop-blur md:p-5 lg:py-6 lg:px-10">
          <nav className="flex justify-between">
            <Link
              href="/"
              className="prevent-default max-w-[45%] p-3 -m-3 text-base sm:text-lg lg:text-xl text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 font-semibold transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
            >
              Crystopia.net
            </Link>

            <div className="p-3 w-auto  bg-slate-600 rounded-xl shadow-md flex items-center space-x-4">
              <div>
                {' '}
                <button
                  className="hover:text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                  onClick={copyToClipboard}
                  title="Copy IP to clipboard"
                >
                  crystopia.net
                </button>
                - {playercount}/{maxplayercount}
              </div>
            </div>
          </nav>
        </header>

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="px-4 pb-6 space-y-2 text-gray-500 md:flex md:justify-between md:space-y-0 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
          <div>&copy; Copyright {new Date().getFullYear()} Crystopia.net</div>
          <div className="ml-24">
            <Link href={'https://discord.crystopia.net'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                viewBox="0 0 16 16"
                className="inline"
              >
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
            </Link>
            {'    '}
            {'   '}
            <Link href={'https://twitter.com/crystopianet'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-twitter inline"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
              </svg>
            </Link>{' '}
            <Link href={'https://youtube.com/@crystopianet'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-youtube inline"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </Link>{' '}
            <Link href={'/guides'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-journal inline"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
            </Link>{' '}
            <Link href={'/blog'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                className="bi bi-substack inline"
                viewBox="0 0 16 16"
                name="Discrd"
              >
                <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
              </svg>
            </Link>
          </div>
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
