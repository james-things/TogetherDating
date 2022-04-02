// Description: a page for a user who signed up with the e-mail/password flow
// register their dating profile
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { withLayout } from '../wrappers/layout';
import updateUserData from '../methods/updateUserData';
import localStoreGet from '../methods/localStoreGet';

// Document initial state
const initialState = {
  alcoholUse: '',
  astrologySign: '',
  bodyType: '',
  childStatus: '',
  education: '',
  ethnicity: '',
  religion: '',
  smokingStatus: '',
};

// Reducer to process inputs
const reducer = (state, action) => {
  switch (action.type) {
    case 'astrologySign':
      return { ...state, astrologySign: action.payload };
    case 'alcoholUse':
      return { ...state, alcoholUse: action.payload };
    case 'bodyType':
      return { ...state, bodyType: action.payload };
    case 'childStatus':
      return { ...state, childStatus: action.payload };
    case 'religion':
      return { ...state, religion: action.payload };
    case 'smokingStatus':
      return { ...state, smokingStatus: action.payload };
    case 'education':
      return { ...state, education: action.payload };
    case 'ethnicity':
      return { ...state, ethnicity: action.payload };
    default:
      throw new Error();
  }
};

// Page main function
const ConfigureProfilePage = () => {
  const [userId, setUserId] = useState('');
  const [user] = useAuthState(firebase.auth());
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const history = useHistory();

  // React UseEffect hook to capture firebase auth session
  useEffect(() => {
    // Once user session is available, pull userId from it
    setUserId(user.uid);
    console.log(userId);
  }, [user]);

  // Link reducer to input
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  // Async function to register an email/pw user's dating profile
  async function saveProfileConfiguration(evt) {
    // prevent default inputs
    evt.preventDefault();
    // Submit data to update
    await updateUserData(userId, state);
    // once done, redirect user to discover page
    history.push('/discover');
  }

  // Page content - Allow the user to select and initiate a registration process
  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full md:w-7/12">
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <svg
            className="w-10"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <defs>
              <radialGradient
                id="svg-fill-radial__tinder"
                cx="0.5"
                cy="1"
                fr="0"
                fx="0.5"
                fy="1"
                r="1"
                spreadMethod="pad"
              >
                <stop offset="0%" stopColor="#ff7854" />
                <stop offset="100%" stopColor="#fd267d" />
              </radialGradient>
            </defs>
            <path
              d="M8.21 10.08c-.02 0-.04 0-.06-.02-.67-.9-.84-2.44-.89-3.03 0-.11-.13-.18-.23-.12C4.93 8.08 3 10.86 3 13.54 3 18.14 6.2 22 11.7 22c5.15 0 8.7-3.98 8.7-8.46 0-5.87-4.2-9.77-7.93-11.53a.13.13 0 0 0-.19.14c.48 3.16-.18 6.6-4.07 7.93z"
              fill="url(#svg-fill-radial__tinder)"
              fillRule="nonzero"
            />
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
        <form className="my-5 w-full">
          {error && (
            <p className="text-red-500 font-bold text-base py-2 ">{error}</p>
          )}
          {/*
          1 education: '',
          2 ethnicity: '',
          3 astrologySign: '',
          4 bodyType: '',
          5 religion: '',
          6 childStatus: '',
          7 smokingStatus: '',
          8 alchoholUse: '',
          */}
          <label htmlFor="education" className="sr-only font-bold text-base md:ml-1">
            Education
          </label>
          <select
            id="education"
            name="education"
            autoComplete="eduction"
            required
            onChange={handleOnChange}
            value={state.education}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Name"
          >
            <option value="">Select your education level...</option>
            <option value="High School">High School</option>
            <option value="Some College">Some College</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Post Graduate">Post Graduate</option>
          </select>
          <select
            id="ethnicity"
            name="ethnicity"
            autoComplete="ethnicity"
            required
            onChange={handleOnChange}
            value={state.ethnicity}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Ethnicity"
          >
            <option value="">Select your ethnicity...</option>
            <option value="American Indian">American Indian</option>
            <option value="Asian">Asian</option>
            <option value="Black">Black</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Middle Eastern">Middle Eastern, Indian</option>
            <option value="Pacific Islander">Pacific Islander, Hawaiian</option>
            <option value="White">White</option>
          </select>
          <select
            id="astrologySign"
            name="astrologySign"
            autoComplete="astrologySign"
            required
            onChange={handleOnChange}
            value={state.astrologySign}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="astrologySign"
          >
            <option value="">Select your astrological sign...</option>
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select>
          <select
            id="bodyType"
            name="bodyType"
            autoComplete="bodyType"
            required
            onChange={handleOnChange}
            value={state.bodyType}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="bodyType"
          >
            <option value="">Select your body type...</option>
            <option value="Athletic">Athletic</option>
            <option value="Average">Average</option>
            <option value="Curvy">Curvy</option>
            <option value="Muscular">Muscular</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Slim">Slim</option>
            <option value="Solid">Solid</option>

          </select>
          <select
            id="religion"
            name="religion"
            autoComplete="religion"
            required
            onChange={handleOnChange}
            value={state.religion}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="religion"
          >
            <option value="">Select your religion level...</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindi">Hindi</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Non-dogmatic">Non-dogmatic</option>
            <option value="Other">Other</option>
          </select>
          <select
            id="childStatus"
            name="childStatus"
            autoComplete="childStatus"
            required
            onChange={handleOnChange}
            value={state.childStatus}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Child Status"
          >
            <option value="">Select your parental status...</option>
            <option value="Young parent">Young parent</option>
            <option value="Mature parent">Mature parent</option>
            <option value="Maybe someday">Maybe someday</option>
            <option value="Do not want kids">Do not want kids</option>
            <option value="I want kids">I want kids</option>
            <option value="Done with Parenting">Done with Parenting</option>
          </select>
          <select
            id="smokingStatus"
            name="smokingStatus"
            autoComplete="smokingStatus"
            required
            onChange={handleOnChange}
            value={state.smokingStatus}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="NameSmokingStatus"
          >
            <option value="">Do you smoke?</option>
            <option value="Non-smoker">Non-smoker</option>
            <option value="Smoker">Smoker</option>
            <option value="Quitting">Quitting</option>
          </select>
          <select
            id="alcoholUse"
            name="alcoholUse"
            autoComplete="alcoholUse"
            required
            onChange={handleOnChange}
            value={state.alcoholUse}
            className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="AlcoholUse"
          >
            <option value="">Do you drink?</option>
            <option value="Opposed, Moral">Opposed, Moral</option>
            <option value="Opposed, Recovering">Opposed, Recovering</option>
            <option value="none">none</option>
            <option value="Socially/Occasional">Socially/Occasional</option>
            <option value="Daily Light">Daily Light</option>
            <option value="Party Regular">Party Regular</option>
            <option value="Heavy">Heavy</option>
          </select>
          <button
            type="button"
            onClick={saveProfileConfiguration}
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

export default withLayout(ConfigureProfilePage, { bgImage: true });
