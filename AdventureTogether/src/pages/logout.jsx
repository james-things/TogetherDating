// Description: A page which logs out and then redirects the user home

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { logoutCometChatUser } from '../cometchat';
import { withLayout } from '../wrappers/layout';

// Main function/"page content"
function LogoutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Approximately on load, log the user out, then log the user out of CometChat
  useEffect(() => {
    auth
      .signOut()
      .then(async () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userImage');
        localStorage.removeItem('userLikes');
        localStorage.removeItem('userDislikes');
        localStorage.removeItem('userMatches');
        localStorage.removeItem('userFavorites');
        localStorage.removeItem('userInterests');
        await logoutCometChatUser();
        navigate('/');
      });
  }, []);

  return (
    <section className="flex flex-col items-center w-full">
      <h1 className="text-4xl mb-6 md:text-9xl text-white font-bold tracking-thin">
        Explore Today
      </h1>
      <Link
        className="bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
        to="/discover"
      >
        Discover
      </Link>
      <br />
    </section>
  );
}

export default withLayout(LogoutPage, { bgImage: true });
