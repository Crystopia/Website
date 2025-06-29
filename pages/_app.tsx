import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import 'tailwindcss/tailwind.css';
import '../styles/font.css';
import '../styles/global.css';
import '../styles/LoadingScreen.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

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
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setTheme(prefersDark ? 'dark' : 'dark'); // Immer dark, optional fallback
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: '/icons/home.png' },
    { href: '/blog', label: 'Blog', icon: '/icons/blog.new.png' },
    {
      href: '/guide',
      label: 'Guide',
      icon: '/icons/calendar.png',
    },
  ];

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <Image
            src="/images/grass.png"
            alt="Loading..."
            width={1000}
            height={20}
            className="animate-spin h-auto grayscale max-w-9"
          />
        </div>
      )}

      <div>
        {/* HEADER */}
        <header className="fixed left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-2/3 bg-gray-800 rounded-lg shadow-lg p-6 mt-7">
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

          {/* NAVIGATION */}
          <nav
            className={`${
              navbarOpen ? 'block' : 'hidden'
            } mt-4 md:mt-0 md:flex md:justify-around items-center`}
          >
            {navItems.map(({ href, label, icon }) => (
              <Link href={href} key={label}>
                <button
                  className="font-minecraftseven inline-flex items-center px-4 py-3 text-lg font-medium rounded-md text-white hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
                  style={{ color: '#78D5F5' }}
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className="h-6 w-6 mr-3 mt-3"
                  />
                  <span className="text-4xl">{label}</span>
                </button>
              </Link>
            ))}

            {/* Copy-IP Button */}
            <button
              className="font-minecraftseven inline-flex items-center px-5 py-3 text-lg font-medium rounded-md text-white hover:bg-gray-700 hover:scale-105 transition transform duration-300 ease-in-out"
              onClick={() => {
                toast('Copied IP to clipboard', { type: 'success' });
                navigator.clipboard.writeText('crystopia.net');
              }}
            >
              <Image
                src="/icons/copy-ip.png"
                alt="Copy IP"
                width={28}
                height={28}
                className="h-7 w-7 mr-3 mt-3"
              />
              <b style={{ color: '#78D5F5' }} className="text-3xl">
                CRYSTOPIA.NET
              </b>
            </button>
          </nav>
        </header>

        {/* MAIN */}
        <main className="min-h-screen pb-16 pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-32">
          <Component {...pageProps} />
        </main>

        {/* FOOTER */}
        <footer className="rounded-lg shadow-lg w-full max-w-3xl p-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-yellow-900">
              <Link href="https://discord.crystopia.net" target="_blank">
                <Image
                  src="/icons/discord.png"
                  alt="Discord"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://www.youtube.com/@CrystopiaNet"
                target="_blank"
              >
                <Image
                  src="/icons/youtube.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                />
              </Link>
            </div>

            <div className="text-center text-sm text-black mt-2 md:mt-0">
              <p className="font-semibold">Crystopia.net © 2024-2025</p>
              <p>We are in no way affiliated with or endorsed by Mojang, AB.</p>
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-6 text-[#78D5F5] text-sm font-medium">
            <Link href="/legal/imprint">Imprint</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </footer>
        <br />
        <br />
      </div>
    </>
  );
}

export default MyApp;
