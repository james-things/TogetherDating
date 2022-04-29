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
import OutdoorInterestPicker from '../components/OutdoorInterestPicker';
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
      setLoading(false);
    }
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
    navigate(data.completedRegistration ? '/index' : '/configure-profile');
  }

  // Page content - Allow the user to select and initiate a registration process
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
          <Box className="" display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1}>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionAnimal} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionBicycling} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionBoardingSkiing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionLargeBoat} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionSmallBoating} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionCamping} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionClimbing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionFishing} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionFlying} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionHunting} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionMotorSports} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionFlying} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionRestorationConservation} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionShooting} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionSwimming} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionTeam} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionWalkRun} interests={interests} />
            </Box>
            <Box p={1} borderColor="border.default" borderWidth={1} borderStyle="solid">
              <OutdoorInterestPicker dataset={interestOptions.optionLeisureOther} interests={interests} />
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
          {' '}
        </div>
      </div>
    </div>
  );
};

export default withLayout(OutdoorInterestsPage, { bgImage: true });
