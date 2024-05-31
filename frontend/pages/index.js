import Head from 'next/head';
import Link from 'next/link';
import style from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <Head>
        <title>Medicines</title>
        <meta name="description" content="A platform to find Medicines" />
      </Head>

      <img src="/images/bg2.webp" alt="Background Image" className="absolute top-0 left-0 w-full h-full object-cover z-0" />

      <main className="flex flex-col items-center justify-center z-10 relative">
        <h1 className="text-4xl md:text-6xl mb-8 text-red-500">Medicines</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center">
              Login
            </a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-center">
              Sign Up
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
