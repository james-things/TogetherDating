import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import localStorePut from '../methods/localStorePut';
import buildIsoDateString from '../methods/buildIsoDateString';
import isOfAge from '../methods/isOfAge';
import { withLayout } from '../wrappers/layout';

// Interface state initialization
const initialState = {
  month: '',
  day: '',
  year: '',
};

// Management of document state
const reducer = (state, action) => {
  switch (action.type) {
    case 'day':
      return { ...state, day: action.payload };
    case 'month':
      return { ...state, month: action.payload };
    case 'year':
      return { ...state, year: action.payload };
    default:
      throw new Error();
  }
};

// Page main function
const AgePage = () => {
  // Initialize history routing and reducer
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Call in reducer to handle inputs
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  // Check if entered MM-DD-YYYY meets age requirements
  const checkDoB = (evt) => {
    evt.preventDefault();
    const bday = buildIsoDateString(state.month, state.day, state.year);
    localStorePut('localBirthdate', bday);
    const t = (isOfAge(bday) === true) ? history.push('/signup') : history.push('/sorry');
  };

  // Page content - Accepts input for the users MM, DD, and YYYY of birth
  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-9/12 lg:w-1/2 md:w-6/12 sm:w-7/12">
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
          Before we begin...
        </h3>
        <div
          className="text-sm text-gray-800 text-center"
          data-nosnippet="true"
        >
          Please enter your date of birth to start the sign-up process.
        </div>
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        <form className="my-5 w-full" onSubmit={checkDoB}>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-2">
              <div>
                <label htmlFor="month" className="sr-only font-bold text-base md:ml-1">
                  Month
                </label>
                <input
                  id="month"
                  name="month"
                  type="months"
                  autoComplete="month"
                  required
                  onChange={handleOnChange}
                  value={state.month}
                  className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-center"
                  placeholder="MM"
                  minLength={1}
                  maxLength={2}
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only font-bold text-base md:ml-1">
                  Day
                </label>
                <input
                  id="day"
                  name="day"
                  type="day"
                  autoComplete="day"
                  required
                  onChange={handleOnChange}
                  value={state.day}
                  className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-center"
                  placeholder="DD"
                  minLength={1}
                  maxLength={2}
                />
              </div>
            </div>
            <div>
              <label htmlFor="year" className="sr-only font-bold text-base md:ml-1">
                Year
              </label>
              <input
                id="year"
                name="year"
                type="year"
                autoComplete="year"
                required
                onChange={handleOnChange}
                value={state.year}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-center"
                placeholder="YYYY"
                minLength={4}
                maxLength={4}
              />
            </div>
          </div>
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

export default withLayout(AgePage, { bgImage: true });
