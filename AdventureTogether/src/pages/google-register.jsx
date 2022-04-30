// Description: A page to support profile creation for a Google SSO registration
// no longer utilizes any firebase functions

import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerGoogleProfile from '../methods/registerGoogleProfile';
import { withLayout } from '../wrappers/layout';

// Page initial state
const initialState = {
  description: '',
  alcoholUse: '',
  astrologySign: '',
  bodyType: '',
  childStatus: '',
  education: '',
  ethnicity: '',
  gender: '',
  hairColor: '',
  eyeColor: '',
  religion: '',
  smoking: '',
  height: '',
  completedRegistration: true,
};

// Reducer to manage input
const reducer = (state, action) => {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.payload };
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
    case 'smoking':
      return { ...state, smoking: action.payload };
    case 'education':
      return { ...state, education: action.payload };
    case 'ethnicity':
      return { ...state, ethnicity: action.payload };
    case 'hairColor':
      return { ...state, hairColor: action.payload };
    case 'eyeColor':
      return { ...state, eyeColor: action.payload };
    case 'gender':
      return { ...state, gender: action.payload };
    case 'height':
      return { ...state, height: action.payload };
    default:
      throw new Error();
  }
};

// Page main function
const GoogleRegisterPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error] = useState('');
  const navigate = useNavigate();

  // Call in reducer to handle input
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  // Async function to call dating profile creation function
  async function registerUser(evt) {
    evt.preventDefault();
    // Await dating profile creation for google sign-in type
    await registerGoogleProfile(state);
    // Once user has been registered, then redirct the to /discover
    navigate('/outdoor-interests');
  }

  // Page content - Collect a description for the user's profile
  return (
    <div className="my-20 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full">
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
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        Tell us a bit more about yourself...
        <form className="my-5 w-full" onSubmit={registerUser}>
          {error && (
            <p className="text-red-500 font-bold text-base py-2 ">{error}</p>
          )}
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
          <div className="grid grid-cols-2 gap-x-1">
            <div className="col-span-1">
              <label htmlFor="gender" className="sr-only font-bold text-base md:ml-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                autoComplete="gender"
                required
                onChange={handleOnChange}
                value={state.gender}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Name"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary/Other">Non-Binary/Other</option>
                <option value="Decline to Specify">Decline to Specify</option>
              </select>
              <label htmlFor="hairColor" className="sr-only font-bold text-base md:ml-1">
                Hair Color
              </label>
              <select
                id="hairColor"
                name="hairColor"
                autoComplete="hairColor"
                required
                onChange={handleOnChange}
                value={state.hairColor}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Name"
              >
                <option value="">Hair</option>
                <option value="Blond">Blonde</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
                <option value="Gray">Gray</option>
                <option value="White">White</option>
                <option value="Other">Other</option>
                <option value="What Hair?">What Hair?</option>
              </select>
              <label htmlFor="eyeColor" className="sr-only font-bold text-base md:ml-1">
                Eye Color
              </label>
              <select
                id="eyeColor"
                name="eyeColor"
                autoComplete="eyeColor"
                required
                onChange={handleOnChange}
                value={state.eyeColor}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Name"
              >
                <option value="">Eyes</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Hazel">Hazel</option>
                <option value="Brown">Brown</option>
                <option value="Other">Other</option>
              </select>
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
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Name"
              >
                <option value="">Education</option>
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
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Ethnicity"
              >
                <option value="">Ethnicity</option>
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
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="astrologySign"
              >
                <option value="">Zodiac</option>
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
            </div>
            <div className="col-span-1">
              <select
                id="bodyType"
                name="bodyType"
                autoComplete="bodyType"
                required
                onChange={handleOnChange}
                value={state.bodyType}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="bodyType"
              >
                <option value="">Body Type</option>
                <option value="Athletic">Athletic</option>
                <option value="Average">Average</option>
                <option value="Curvy">Curvy</option>
                <option value="Muscular">Muscular</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Slim">Slim</option>
                <option value="Solid">Solid</option>
              </select>
              <input
                id="height"
                name="height"
                autoComplete="height"
                required
                onChange={handleOnChange}
                value={state.height}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Height (Inches)"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <select
                id="religion"
                name="religion"
                autoComplete="religion"
                required
                onChange={handleOnChange}
                value={state.religion}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="religion"
              >
                <option value="">Religion</option>
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
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Child Status"
              >
                <option value="">Kids?</option>
                <option value="Young parent">Young parent</option>
                <option value="Mature parent">Mature parent</option>
                <option value="Maybe someday">Maybe someday</option>
                <option value="Do not want kids">Do not want kids</option>
                <option value="I want kids">I want kids</option>
                <option value="Done with Parenting">Done with Parenting</option>
              </select>
              <select
                id="smoking"
                name="smoking"
                autoComplete="smoking"
                required
                onChange={handleOnChange}
                value={state.smoking}
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                placeholder="Smoking"
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
                className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
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

export default withLayout(GoogleRegisterPage, { bgImage: true });
