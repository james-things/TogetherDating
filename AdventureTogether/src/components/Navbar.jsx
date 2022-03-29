// Description: a navigation bar component which appears at the top of the page
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';

// Component main function
export default function Navbar() {
  return (
    <nav className="w-full px-1 absolute bg-gradient-to-b from-black to-transparent z-10">
      <div className="w-full flex justify-between items-center mx-auto p-6 pb-24">
        {/* <!-- logo --> */}
        <div className="inline-flex">
          <a className="_o6689fn" href="/">
            <svg className="inline-flex align-middle mb-1.5 mr-0.5" width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="white" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clip-path">
                  <rect className="cls-1" x="0.13" width="24" height="24" />
                </clipPath>
              </defs>
              <title>plant</title>
              <g className="cls-2">
                <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
                <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
                <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
                <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
              </g>
            </svg>
            <h1 className="inline-flex text-2xl mb-2 md:text-2xl text-white font-bold tracking-thin align-middle">
              Adventure Together
            </h1>
          </a>
        </div>

        {/* <!-- end logo --> */}

        {/* <!-- login --> */}
        <div className="md:block flex mx-1">
          <div className="text-md uppercase leading-none text-left group inline-block relative">
            <FirebaseAuthConsumer>
              {({ isSignedIn }) => (
                <Link
                  className="bg-white rounded hover:bg-gray-200 py-3 px-6 block whitespace-no-wrap text-pink-400 font-bold"
                  to={isSignedIn ? '/logout' : '/login'}
                >
                  {isSignedIn ? 'Log Out' : 'Log In'}
                </Link>
              )}
            </FirebaseAuthConsumer>
          </div>
        </div>
        {/* <!-- end login --> */}
      </div>
    </nav>
  );
}
