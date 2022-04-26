/* eslint-disable max-len */

// Description: a navigation bar component with links which appears at the top of the page

// todo: apply conditional css styling to ensure navbar provides positive value for all viewports

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';

// Component main function
export default function NavbarOriginal() {
  const { status, data: user } = useUser();
  return (
    <nav className="w-full px-1 absolute bg-gradient-to-b from-black to-transparent z-10">
      <div className="grid grid-cols-3 w-full flex justify-between items-center mx-auto p-6 pb-24">
        {/* <!-- logo + links --> */}
        <div className="col-span-2 inline-flex">
          <a className="_o6689fn" href="/">
            <svg className="inline-flex align-middle mb-1.5 mr-0.5" width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="white" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clip-path">
                  <rect className="cls-1" x="0.13" width="24" height="24" />
                </clipPath>
              </defs>
              <title>Adventure Together</title>
              <g className="cls-2">
                <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
              </g>
            </svg>
          </a>
          <h1 className="inline-flex text-2xl mb-2 md:text-2xl font-bold text-white tracking-thin align-middle">
            Adventure Together&nbsp;&nbsp;&nbsp;|
          </h1>
            &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="hover:text-pink-600 inline-flex text-xl mb-2 md:text-xl text-white tracking-thin align-middle"
            to={user ? '/user-profile' : '/login'}
          >
            {user ? 'My Profile' : 'Log In'}
          </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="hover:text-pink-600 inline-flex text-xl mb-2 md:text-xl text-white tracking-thin align-middle"
            to={user ? '/inbox' : '/age'}
          >
            {user ? 'Inbox' : 'Create Account'}
          </Link>
           &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="hover:text-pink-600 inline-flex text-xl mb-2 md:text-xl text-white tracking-thin align-middle"
            to={user ? '/discover' : ''}
          >
            {user ? 'Discover' : ''}
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="hover:text-pink-600 inline-flex text-xl mb-2 md:text-xl text-white tracking-thin align-middle"
            to={user ? '/outdoor-interests' : ''}
          >
            {user ? 'Interests' : ''}
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="hover:text-pink-600 inline-flex text-xl mb-2 md:text-xl text-white tracking-thin align-middle"
            to={user ? '/data-test' : ''}
          >
            {user ? 'Data Test' : ''}
          </Link>
          {/* end navigation links */}
        </div>
        {/* <!-- end logo + links --> */}
        {/*
        <div className="col-span-1 inline-flex">
          <div className="inline-flex text-2xl mb-2 md:text-2xl text-white font-bold tracking-thin align-middle">
            {' '}
          </div>
        </div>
        */}
        {/* <!-- login --> */}
        <div className="md:block flex mx-1">
          <div className="float-right text-right text-md uppercase leading-none group inline-block relative">
            <Link
              className="bg-white rounded hover:bg-gray-200 py-3 px-6 block whitespace-no-wrap text-pink-400 font-bold"
              to={user ? '/logout' : '/login'}
            >
              {user ? 'Log Out' : 'Log In'}
            </Link>
          </div>
        </div>
        {/* <!-- end login --> */}
      </div>
    </nav>
  );
}
