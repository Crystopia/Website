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
            <nav className="navbar bg-body-tertiary ml-64">
              <form className="container-fluid justify-content-start">
                <Link href={'/'}>
                  <button
                    className="btn btn-outline-success me-2"
                    type="button"
                  >
                    <b className="text-2xl text-white">Home</b>
                  </button>
                </Link>

                <Link href={'/blog'}>
                  <button
                    className="btn btn-sm btn-outline-secondary ml-10"
                    type="button"
                  >
                    <b className="text-2xl text-white">Blog</b>
                  </button>
                </Link>
                <Link href={'/guides'}>
                  <button
                    className="btn btn-sm btn-outline-secondary ml-10"
                    type="button"
                  >
                    <b className="text-2xl text-white">Guide</b>
                  </button>
                </Link>
                <Link href={'#'}>
                  <button
                    className="btn btn-sm btn-outline-secondary ml-10"
                    type="button"
                  >
                    <b className="text-2xl text-white">Store</b>
                  </button>
                </Link>
              </form>
            </nav>
            <Link href={'https://discord.crystopia.net'}>
              <button type="button" className="btn to-blue-800">
                <Image
                  width={50}
                  height={50}
                  alt="Discord"
                  src={
                    'https://cdn.discordapp.com/attachments/1183066613512151100/1240728026962984990/images.png?ex=66479d85&is=66464c05&hm=f9f57c2f2da791265cd9d5b0a1f49c438671370c634ef87b221ed93ef0995965&'
                  }
                ></Image>
              </button>
            </Link>
            {/* Toast */}

            {/* <button type="button" className="btn btn-primary" id="liveToastBtn">
              Show live toast
            </button>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
              <div
                id="liveToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body">Copied IP to clipboard!</div>
              </div>
            </div> */}

            {/* Toast */}
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
