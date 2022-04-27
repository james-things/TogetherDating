// Description: A component which accepts uid as props and returns
// a formatted editable user profile data element

// todo: add ability to edit height and profile pic. both will need
//  custom handlers as compared to existing dropdowns.
//  css: fix text displaying in dropdowns, fix button positions, fix size of component, etc.

import React, { useReducer, useState } from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc } from 'firebase/firestore';
import getAge from '../methods/getAge';

import editIcon from '../editIcon.webp';
import updateUserData from '../methods/updateUserData';

const initialState = {
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
};

const initialEditState = {
  editable: false,
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
    default:
      throw new Error();
  }
};

export default function UserProfileEditable({ userId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editState, setEdit] = useState(initialEditState);

  const toggleEditable = () => {
    const currentEditState = editState.editable;
    console.log(currentEditState);
    if (currentEditState === false) {
      setEdit({ editable: true });
    } else {
      setEdit({ editable: false });
    }
  };

  // Define needed vars
  let heightFeet = 0;
  let heightInches = 0;

  // Subscribe to user session
  const { status, data: user } = useUser(); // probably better to pass user from parent vs this

  // Set document reference passed to component
  const userRef = doc(useFirestore(), `users/${userId}`); // 'users/17aeqVDSRSd1Zf1tME57sIUAlwy2' // `users/${userId}`

  // Subscribe to referenced document
  const { refstatus, data } = useFirestoreDocData(userRef);

  // If there is an error, it will end up in status
  if (status === 'error' || refstatus === 'error') {
    return <span>Something went wrong!!</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (status === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  // If the document data is not undefined, calculate the feet/inches from total inches for height
  if (data) {
    // eslint-disable-next-line no-bitwise
    heightFeet = ~~(Number(data.height) / 12); // bitwise quotient === integer division
    heightInches = (Number(data.height) % 12);
    console.log(`${heightFeet}' ${heightInches}"`);
  }

  // Link reducer to input
  const handleOnChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.value,
    });
  };

  const handleConfirmButton = async () => {
    await updateUserData(userId, state);
    setEdit({ editable: false });
  };

  return (
    <pre>
      {(data)
        && (
          <div className="container mx-auto">
            <button
              type="button"
              className="uppercase p-4 h-12 bg-white"
              onClick={() => toggleEditable()}
            >
              Edit Profile
              <img className="icon-edit" src={editIcon} alt="edit" />
            </button>
            <div className="grid grid-cols-4 font-sans">
              {/* above this */}
              <div className="flex items-stretch justify-center">
                <div className="col-span-1 self-center">
                  <img
                    className="self-auto rounded-full"
                    width="150"
                    src={data.imageUrl}
                    alt="User Profile Pic"
                  />
                </div>
              </div>
              <div className="col-span-3 self-center">
                <div className="text-center text-4xl">
                  {data.name}
                </div>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Age:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && getAge(data.birthdate)}
                {(editState.editable === true)
                  && ('We keep this current!')}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Hair Color:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.hairColor}
                {(editState.editable === true)
                  && (
                  <select
                    id="hairColor"
                    name="hairColor"
                    autoComplete="hairColor"
                    required
                    onChange={handleOnChange}
                    value={state.hairColor}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Name"
                  >
                    <option value={data.hairColor}>Keep as-is</option>
                    <option value="Blond">Blond</option>
                    <option value="Brown">Brown</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Gray">Gray</option>
                    <option value="White">White</option>
                    <option value="Other">Other</option>
                    <option value="What Hair?">What Hair?</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>
                  Gender:
                </u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.gender}
                {(editState.editable === true)
                  && (
                    <select
                      id="gender"
                      name="gender"
                      autoComplete="gender"
                      required
                      onChange={handleOnChange}
                      value={state.gender}
                      className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                      placeholder="Name"
                    >
                      <option value={data.gender}>Keep as-is</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary/Other">Non-Binary/Other</option>
                      <option value="Decline to Specify">Decline to Specify</option>
                    </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Eye Color:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.eyeColor}
                {(editState.editable === true)
                  && (
                  <select
                    id="eyeColor"
                    name="eyeColor"
                    autoComplete="eyeColor"
                    required
                    onChange={handleOnChange}
                    value={state.eyeColor}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Name"
                  >
                    <option value={data.eyeColor}>Keep as-is</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Hazel">Hazel</option>
                    <option value="Brown">Brown</option>
                    <option value="Other">Other</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Height:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && `${heightFeet}' ${heightInches}"`}
                {(editState.editable === true)
                  && ('You cant edit height yet :(')}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Zodiac Sign:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.astrologySign}
                {(editState.editable === true)
                  && (
                  <select
                    id="astrologySign"
                    name="astrologySign"
                    autoComplete="astrologySign"
                    required
                    onChange={handleOnChange}
                    value={state.astrologySign}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="astrologySign"
                  >
                    <option value={data.astrologySign}>Keep as-is</option>
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
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Body Type:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.bodyType}
                {(editState.editable === true)
                  && (
                  <select
                    id="bodyType"
                    name="bodyType"
                    autoComplete="bodyType"
                    required
                    onChange={handleOnChange}
                    value={state.bodyType}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="bodyType"
                  >
                    <option value={data.bodyType}>Keep as-is</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Average">Average</option>
                    <option value="Curvy">Curvy</option>
                    <option value="Muscular">Muscular</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Slim">Slim</option>
                    <option value="Solid">Solid</option>

                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Parental Status:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.childStatus}
                {(editState.editable === true)
                  && (
                  <select
                    id="childStatus"
                    name="childStatus"
                    autoComplete="childStatus"
                    required
                    onChange={handleOnChange}
                    value={state.childStatus}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Child Status"
                  >
                    <option value={data.childStatus}>Keep as-is</option>
                    <option value="Young parent">Young parent</option>
                    <option value="Mature parent">Mature parent</option>
                    <option value="Maybe someday">Maybe someday</option>
                    <option value="Do not want kids">Do not want kids</option>
                    <option value="I want kids">I want kids</option>
                    <option value="Done with Parenting">Done with Parenting</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Religion:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.religion}
                {(editState.editable === true)
                  && (
                  <select
                    id="religion"
                    name="religion"
                    autoComplete="religion"
                    required
                    onChange={handleOnChange}
                    value={state.religion}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="religion"
                  >
                    <option value={data.religion}>Keep as-is</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Non-dogmatic">Non-dogmatic</option>
                    <option value="Other">Other</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Tobacco Use:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.smoking}
                {(editState.editable === true)
                  && (
                  <select
                    id="smokingStatus"
                    name="smokingStatus"
                    autoComplete="smokingStatus"
                    required
                    onChange={handleOnChange}
                    value={state.smoking}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="NameSmokingStatus"
                  >
                    <option value={data.smoking}>Keep as-is</option>
                    <option value="Non-smoker">Non-smoker</option>
                    <option value="Smoker">Smoker</option>
                    <option value="Quitting">Quitting</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Ethnicity:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.ethnicity}
                {(editState.editable === true)
                  && (
                  <select
                    id="ethnicity"
                    name="ethnicity"
                    autoComplete="ethnicity"
                    required
                    onChange={handleOnChange}
                    value={state.ethnicity}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Ethnicity"
                  >
                    <option value={data.ethnicity}>Keep as-is</option>
                    <option value="American Indian">American Indian</option>
                    <option value="Asian">Asian</option>
                    <option value="Black">Black</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Middle Eastern">Middle Eastern, Indian</option>
                    <option value="Pacific Islander">Pacific Islander, Hawaiian</option>
                    <option value="White">White</option>
                  </select>
                  )}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Alcohol Use:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {(editState.editable === false) && data.alcoholUse}
                {(editState.editable === true)
                  && (
                  <select
                    id="alcoholUse"
                    name="alcoholUse"
                    autoComplete="alcoholUse"
                    required
                    onChange={handleOnChange}
                    value={state.alcoholUse}
                    className="profileSelect my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="AlcoholUse"
                  >
                    <option value={data.alcoholUse}>Keep as-is</option>
                    <option value="Opposed, Moral">Opposed, Moral</option>
                    <option value="Opposed, Recovering">Opposed, Recovering</option>
                    <option value="none">none</option>
                    <option value="Socially/Occasional">Socially/Occasional</option>
                    <option value="Daily Light">Daily Light</option>
                    <option value="Party Regular">Party Regular</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                  )}
              </div>
            </div>
            {/*
            something like:
            map editable states and for editable:true display
            popover for that editable...should only ever be one at one time
            */}
            {(editState.editable === true)
              && (
                <button
                  type="button"
                  className="uppercase p-4 h-12 bg-blue-600 text-white"
                  onClick={() => handleConfirmButton()}
                >
                  Confirm
                </button>
              )}
            {/*
            <div>
              Outdoor Interests:
              {' '}
              {JSON.stringify(data.outdoorActivities)}
            </div>

            <div>
              Matches (UIDs):
              {' '}
              {JSON.stringify(data.matches)}
            </div>
            */}
          </div>
        )}
    </pre>
  );
}
