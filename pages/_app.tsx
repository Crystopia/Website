import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import { trackAnalyticsPageview } from '../helpers/trackAnalyticsPageview';
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
    router.events.on('routeChangeComplete', trackAnalyticsPageview);
    return () => {
      router.events.off('routeChangeComplete', trackAnalyticsPageview);
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

  // Background gradient
  //
  // const updateBackground = () => {
  //   const { scrollHeight } = document.documentElement;
  //   const sectionHeight = 700;
  //   const colors = ['#00A5FF', '#00FFC4', '#4500FF'];
  //   const startSide = Math.round(Math.random());
  //   const nextBackground = [];
  //   for (let i = 0; i < scrollHeight / sectionHeight; i++) {
  //     const left =
  //       (i + startSide) % 2 ? 15 : 85 + Math.floor(Math.random() * 12 - 6);
  //     const top = i * sectionHeight + sectionHeight / 2;
  //     const color = colors[Math.floor(Math.random() * colors.length)];
  //     nextBackground.push(
  //       `radial-gradient(circle at ${left}% ${top}px, ${color}, ${color}00 500px)`
  //     );
  //   }
  //   gradientElementRef.current!.style.background = nextBackground.join(', ');
  // };

  // useEffect(updateBackground, [router.asPath]);
  // useEffect(() => window.addEventListener('resize', updateBackground), []);
  //
  // Background gradient

  const setBackgroundToBlack = () => {
    document.body.style.backgroundColor = '#000000';
  };

  useEffect(() => {
    setBackgroundToBlack();
  });

  // mcstatus API
  //
  // const [playercount, setPlayercount] = useState('');
  // const [maxplayercount, setMaxplayercount] = useState('');

  // const printResult = async () => {
  //   try {
  //     const result = await axios.get(
  //       'https://api.mcsrvstat.us/2/crystopia.net'
  //     );
  //     const onlinePlayers = result.data.players.online;
  //     const maxplayercount = result.data.players.max;
  //     setPlayercount(onlinePlayers);
  //     setMaxplayercount(maxplayercount);
  //   } catch (err) {
  //     console.error('Failed to get result: ', err);
  //   }
  // };
  // useEffect(() => {
  //   printResult();
  // }, []);
  //
  // mcstatus API

  async () => {
    try {
      await navigator.clipboard.writeText('crystopia.net');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('crystopia.net');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

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
            <div></div>
            <Link target="_blank" href={'https://discord.crystopia.net'}>
              <button type="button" className="btn to-blue-800 ml-650px">
                <Image
                  width={50}
                  height={50}
                  alt="Discord"
                  src={'/images/discord.png'}
                />
              </button>
            </Link>
            <p className="ml-2"></p>
            <div className="relative">
              <button
                id="ipbtn"
                onClick={handleCopy}
                className="bg-#EAA21A px-4 py-2 rounded hover:bg-#FAC021"
              >
                <b className="text-center text-xl font-extrabold text-#7C2D12">
                  CRYSTOPIA.NET
                </b>
              </button>
              {showToast && (
                <div className="bg-green-500 text-white px-4 py-2 rounded absolute mt-380%">
                  Copied IP to clipboard!
                </div>
              )}
            </div>
          </nav>
        </header>

        <main className="container min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        <footer className="px-4 pb-6 space-y-2 text-gray-500 md:flex md:justify-between md:space-y-0 md:px-5 md:pb-4 lg:px-10 lg:pb-5">
          <div>&copy; Copyright {new Date().getFullYear()} Crystopia.net</div>

          <div>
            <Link href={'/leagel/imprint'}>Imprint</Link> -{' '}
            <Link href={'/leagel/terms'}>Terms of Service</Link> -{' '}
            <Link href={'/leagel/privacy'}>Privacy</Link> -{' '}
            <Link href={'/credits'}>Credits</Link> -{' '}
            <Link href={'/team'}>Team</Link>{' '}
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
