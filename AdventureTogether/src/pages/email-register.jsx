// Description: a page for a user who signed up with the e-mail/password flow
// register their dating profile

import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from 'reactfire';
import registerEmailProfile from '../methods/registerEmailProfile';
import { withLayout } from '../wrappers/layout';

// Document initial state
const initialState = {
  name: '',
  description: '',
  image: '',
};

// Reducer to process inputs
const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    case 'image':
      return { ...state, image: action.payload };
    default:
      throw new Error();
  }
};

// Page main function
const EmailRegisterPage = () => {
  const { status, data: user } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Link reducer to input
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  // Link reducer to photo upload ui element
  const handleFileChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.files[0],
    });
  };

  // Async function to register an email/pw user's dating profile
  async function registerUser(evt) {
    // prevent default inputs
    evt.preventDefault();
    // we can avoid a useEffect hook because it takes the user at least 1 second to type in email/pw
    const userId = user.uid;
    // await dating profile creation
    await registerEmailProfile(userId, state.image, state.name, state.description);
    // once done, redirect user to discover page
    navigate('/outdoor-interests');
  }

  // Page content - Allow the user to select and initiate a registration process
  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full md:w-7/12">
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip-path">
                <rect className="cls-1" x={0.13} width={24} height={24} />
              </clipPath>
            </defs>
            <g className="cls-2">
              <path d="M10.89,12a1,1,0,0,1-.75-.34,1,1,0,0,1-.24-.78c.41-3.27,2.93-9.44,9.56-9.44a1,1,0,0,1,1,.87,9.42,9.42,0,0,1-2,6.84C16.75,11.05,14.22,12,10.89,12Zm7.6-8.51C14.23,4,12.66,7.94,12.13,10a7,7,0,0,0,4.79-2.12A7,7,0,0,0,18.49,3.5Z" />
              <path d="M10.89,12h-.12c-2.51-.32-7.26-2.26-7.26-7.38a1,1,0,0,1,.88-1A7.26,7.26,0,0,1,9.68,5.2,7.33,7.33,0,0,1,11.89,11a1,1,0,0,1-1,1ZM5.6,5.61c.48,2.57,2.76,3.67,4.21,4.12a4.72,4.72,0,0,0-1.44-3A4.81,4.81,0,0,0,5.6,5.61Z" />
              <path d="M10.89,16.18a1,1,0,0,1-1-1V11a1,1,0,1,1,2,0v4.17A1,1,0,0,1,10.89,16.18Z" />
              <path d="M13.55,22.55H8.63a4,4,0,0,1-4-4V15.18a1,1,0,0,1,1-1H16.55a1,1,0,0,1,1,1v3.37A4,4,0,0,1,13.55,22.55ZM6.63,16.18v2.37a2,2,0,0,0,2,2h4.92a2,2,0,0,0,2-2V16.18Z" />
            </g>
          </svg>
        </Link>
        <h3 className="text-2xl font-extrabold italic uppercase my-4">
          Get Started
        </h3>
        <div
          className="text-sm text-gray-800 text-center"
          data-nosnippet="true"
        >
          By clicking Log in, you agree to our
          {' '}
          <a
            className="underline focus-outline-style text-gray-600"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="open-in-new-window"
          >
            Terms
          </a>
          . Learn how we process your data in our
          {' '}
          <a
            className="underline focus-outline-style text-gray-600"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="open-in-new-window"
          >
            Privacy Policy
          </a>
          {' '}
          and
          {' '}
          <a
            className="underline focus-outline-style text-gray-600"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="open-in-new-window"
          >
            Cookie Policy
          </a>
          .
        </div>
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        <form className="my-5 w-full" onSubmit={registerUser}>
          {error && (
            <p className="text-red-500 font-bold text-base py-2 ">{error}</p>
          )}
          <label htmlFor="name" className="sr-only font-bold text-base md:ml-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            onChange={handleOnChange}
            value={state.name}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Name"
            minLength={3}
          />
          <label
            htmlFor="description"
            className="sr-only font-bold text-base md:ml-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            autoComplete="description"
            rows="5"
            required
            onChange={handleOnChange}
            value={state.description}
            className="my-5 appearance-none rounded-xl relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Describe yourself..."
            maxLength="255"
          />
          <label htmlFor="name" className="sr-only font-bold text-base md:ml-1">
            Profile Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept=".png,.jpeg,.jpg,.webp"
            required
            onChange={handleFileChange}
            value={state.image.fileNamer}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Name"
            minLength={3}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
          >
            Continue
          </button>
        </form>
        <div className="py-4">
          <h3 className="text-2xl font-extrabold italic uppercase my-4">
            Get the app!
          </h3>
          <div className="flex justify-between items-center">
            <img width="130" src="/appStore.webp" alt="AppStore Download" />
            <img
              width="170"
              src="/playStore.webp"
              alt="PlayStore Download"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(EmailRegisterPage, { bgImage: true });
