import React, { useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import Multiselect from 'multiselect-react-dropdown';
import updateProfile from '../methods/updateProfile';
import { withLayout } from '../wrappers/layout';

const optionOutdoor = [
  { name: 'Walking' },
  { name: 'Running' },
  { name: 'Basketball' },
  { name: 'Hiking' },
  { name: 'Kayaking' },
  { name: 'Boating' },
  { name: 'Skiing' },
  { name: 'Biking' },
];

let activity = [];

const initialState = {
  name: '',
  email: '',
  description: '',
  password: '',
  confirmPassword: '',
  image: '',
  outdoorActivity: [],
};

const currentUser = JSON.parse(localStorage.getItem('user'));
console.log(currentUser);

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    case 'image':
      return { ...state, image: action.payload };
    case 'outdoorActivity':
      return { ...state, image: action.payload };
    default:
      throw new Error();
  }
};

function onSelect(selectedList, selectedItem) {
  // console.log(selectedList);
  // console.log(selectedItem);
  activity = selectedList;
  console.log(activity);
}

function onRemove(selectedList, selectedItem) {
  // console.log(selectedList);
  // console.log(selectedItem);
  activity = selectedList;
  console.log(activity);
}

function onListChange(selectedList) {
  activity = selectedList;
  console.log(activity);
}

const WIPProfilePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const history = useHistory();
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  async function registerUser(evt) {
    evt.preventDefault();
    if (state.password !== state.confirmPassword) {
      setError('Error: Passwords do not match.');
      return;
    }
    await updateProfile(activity);
    history.push('/discover');
  }

  const listCSS = {
    multiselectcontainer: {
      li: {
        ':hover': {
          background: 'red',
        },
      },
    },
    highlightOption: {
      background: 'red',
    },
    chips: {
      background: 'red',
    },
  };

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
          <Multiselect
            className="hover:bg-gray-200 text-black font-bold uppercase mb-5 rounded-xl border-1.5 border-gray-400 focus:outline-none appearance-none relative block w-full placeholder-gray-500"
            options={optionOutdoor} // Options to display in the dropdown
            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            onChange={onListChange}
            style={listCSS}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default withLayout(WIPProfilePage, { bgImage: true });
