// Description: A dynamic landing page for the site, which uses firebase sign-in state

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { withLayout } from '../wrappers/layout';

// Main func/page content - Button links to 'discover' or 'age verification' conditionally
const IndexPage = () => {
  const { status, data: user } = useUser();

  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="text-4xl mb-6 md:text-9xl text-white font-bold tracking-thin">
        Explore Today
      </h1>
      <Link
        className="bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
        to={(user?.uid) ? '/discover' : '/age'}
      >
        {(user?.uid) ? 'Discover' : 'Create Account'}
      </Link>
      <br />
    </section>
  );
};

export default withLayout(IndexPage, { bgImage: true });
