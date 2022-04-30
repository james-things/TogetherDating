// Description: A page which requires a user to enter MM-DD-YYYY birthdate
// and rejects navigation to registration if the user is younger than 18 years old

import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    const t = (isOfAge(bday) === true) ? navigate('/signup') : navigate('/sorry');
  };

  // Page content - Accepts input for the users MM, DD, and YYYY of birth
  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-9/12 lg:w-1/2 md:w-6/12 sm:w-7/12">
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
            className="w-full bg-gray-800 rounded-full hover:bg-gray-600 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
          >
            Continue
          </button>
        </form>
        <div className="py-4">
          {' '}
        </div>
      </div>
    </div>
  );
};

export default withLayout(AgePage, { bgImage: true });
