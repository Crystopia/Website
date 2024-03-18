import { NextPage } from 'next';
import Link from 'next/link';
import { Head } from '../components';

const ErrorPage: NextPage = () => (
  <>
    <Head
      title="404 | Crystopia.net"
      description="The page you’re looking for doesn’t exist. Return to the homepage."
    />

    <h1>404 – Page not found</h1>
    <p>
      The page you’re looking for doesn’t exist. Return to the{' '}
      <Link href="/">homepage</Link>.
    </p>
  </>
);

export default ErrorPage;
