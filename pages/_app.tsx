import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  // Loading state on route change
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

  // Detect system theme once on mount (optional fallback included)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navItems = [
    { href: '/', label: 'Home', icon: '/icons/home.png' },
    { href: '/blog', label: 'Blog', icon: '/icons/blog.new.png' },
    { href: '/guide', label: 'Guide', icon: '/icons/calendar.png' },
  ];

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <Image
            src="/images/crystopia.png"
            alt="Loading..."
            width={1000}
            height={20}
            className="animate-spin h-auto grayscale max-w-9"
          />
        </div>
      )}

      <div className='font-minecraftseven'>
        {/* HEADER */}
        <header className="fixed left-1/2 transform -translate-x-1/2 z-20 w-11/12 md:w-2/3 bg-gray-800 rounded-lg shadow-lg p-6 mt-7">
          <div className="flex justify-between items-center">
            <button
              aria-label={navbarOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={navbarOpen}
              className="text-white md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#78D5F5]"
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
                  d={
                    navbarOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                />
              </svg>
            </button>
          </div>

          {/* NAVIGATION */}
          <nav
            className={`${
              navbarOpen ? 'block' : 'hidden'
            } mt-4 md:mt-0 md:flex md:justify-around items-center gap-5`}
          >
            {navItems.map(({ href, label, icon }) => (
              <Link href={href} key={label} legacyBehavior>
                <a
                  className="flex items-center gap-3 px-6 py-4 text-2xl font-bold rounded-md transition-transform duration-300 ease-in-out
                    bg-gradient-to-br from-[#162d3e] to-[#0b1823]
                    text-[#78D5F5] shadow-[3px_3px_0_#000] hover:scale-110 hover:shadow-[6px_6px_0_#0d4f7f] outline-2 outline outline-[#78D5F5]"
                  style={{ fontFamily: 'MinecraftSeven' }}
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={28}
                    height={28}
                    className="w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  />
                  <span className="select-none">{label}</span>
                </a>
              </Link>
            ))}

            {/* Copy IP Button */}
            <button
              onClick={() => {
                toast('Copied IP to clipboard', { type: 'success' });
                navigator.clipboard.writeText('crystopia.net');
              }}
              className="flex items-center gap-3 px-8 py-4 text-2xl font-bold rounded-md transition-transform duration-300 ease-in-out
                bg-gradient-to-br from-[#162d3e] to-[#0b1823]
                text-[#78D5F5] shadow-[3px_3px_0_#000] hover:scale-110 hover:shadow-[6px_6px_0_#0d4f7f] outline-2 outline outline-[#78D5F5]"
              style={{ fontFamily: 'MinecraftSeven' }}
            >
              <Image
                src="/icons/copy-ip.png"
                alt="Copy IP"
                width={28}
                height={28}
                className="w-7 h-7 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
              />
              <span className="select-none">CRYSTOPIA.NET</span>
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
              <Link
                href="https://discord.crystopia.net"
                target="_blank"
                rel="noopener noreferrer"
              >
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
                rel="noopener noreferrer"
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
