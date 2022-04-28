/* eslint-disable  max-len */

// Description: a page for a user who signed up with the e-mail/password flow
// register their dating profile

import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { ActionList, Box } from '@primer/react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc } from 'firebase/firestore';
import { withLayout } from '../wrappers/layout';
import updateUserData from '../methods/updateUserData';
import PrimerMultiSelect from '../components/PrimerMultiSelect';
import * as interestOptions from '../outdoorInterests.options';
import localStoreGet from '../methods/localStoreGet';

// Document initial state
const initialState = {
  interests: [],
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
const OutdoorInterestsPage = () => {
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const { status, data: user } = useUser();
  const userRef = doc(useFirestore(), `users/${user?.uid}`);
  const { refstatus, data } = useFirestoreDocData(userRef);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (data && (interests.length === 0)) {
      setInterests(data.outdoorActivities);
    }
    if (interests.length > 0) setLoading(false);
  }, [data, interests]);

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
    await updateUserData(user?.uid, state);
    // once done, redirect user to discover page
    navigate('/configure-profile');
  }

  // Page content - Allow the user to select and initiate a registration process
  return (
    <div className="min-w-full my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full md:w-12/12">
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
      </div>
      <div className="text-center w-full divide-y-2 divide-gray-100 divide-solid">
        {loading && ('Loading. Please wait.')}
        {!loading && (
        <form className="my-5 w-full">
          {error && (
            <p className="text-red-500 font-bold text-base py-2 ">{error}</p>
          )}
          <h3 className="text-2xl font-extrabold my-4">
            The Great Outdoors has something for everyone...
          </h3>
          <p className="">
            We will help you find the perfect person to enjoy your
            favorite activities with!
            <br />
            <br />
            First, we&apos;ll need to know what you&apos;re into!
            <br />
            Browse the menu below and select as many of the interests as you would like:
            <br />
            <sub>(Don&apos;t stress, you can always update these later!)</sub>
          </p>
          <br />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1}>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionAnimal} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionBicycling} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionBoardingSkiing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionLargeBoat} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionSmallBoating} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionCamping} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionClimbing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionFishing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionFlying} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionHunting} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionMotorSports} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionFlying} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionRestorationConservation} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionShooting} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionSwimming} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionTeam} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionWalkRun} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <PrimerMultiSelect dataset={interestOptions.optionLeisureOther} interests={interests} />
            </Box>
          </Box>
          <br />
          <button
            type="button"
            onClick={saveProfileConfiguration}
            className="w-full bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold uppercase"
          >
            Continue
          </button>
        </form>
        )}
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

export default withLayout(OutdoorInterestsPage, { bgImage: true });
