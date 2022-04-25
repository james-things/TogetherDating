// Description: A style wrapper for displayed pages (adds navbar)

import React from 'react';
import Navbar from '../components/Navbar';

const withLayout = (
  BaseComponent,
  { hideNavbar = false, bgImage = false } = {},
) => (props) => (
  <>
    <main className="bg-gray-100">
      <div
        style={{
          backgroundImage: bgImage ? 'url("/outdoorActivity.webp")' : 'none',
        }}
        className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center"
      >
        {!hideNavbar && (
          <div className="absolute inset-0 flex flex-col z-0">
            <Navbar />
          </div>
        )}
        <div className="z-10">
          <BaseComponent {...props} />
        </div>
      </div>
    </main>
  </>
);

// eslint-disable-next-line import/prefer-default-export
export { withLayout };
