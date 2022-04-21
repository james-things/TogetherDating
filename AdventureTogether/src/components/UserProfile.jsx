// Description: A component which accepts uid as props and returns
// a formatted user profile data element

// todo: create a duplicate version of this which features the capacity to
//  edit attributes (for own profile). continue to improve css styling.

import React from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc } from 'firebase/firestore';
import getAge from '../methods/getAge';

export default function UserProfile({ userId }) {
  // Define needed vars
  let heightFeet = 0;
  let heightInches = 0;

  // Subscribe to user session
  const { status, data: user } = useUser();

  // Set document reference using user session (currently using testing value)
  const userRef = doc(useFirestore(), `users/${userId}`);

  // Subscribe to referenced document
  const { refstatus, data } = useFirestoreDocData(userRef);

  // If there is an error, it will end up status
  if (status === 'error' || refstatus === 'error') {
    return <span>Error Loading Projects.</span>;
  }

  // If we are still waiting on data, that will be in status too
  if (status === 'loading' || refstatus === 'loading') {
    return <span>Loading...</span>;
  }

  // If the document data is not undefined, calculate the feet/inches from total inches for height
  if (data) {
    // eslint-disable-next-line no-bitwise
    heightFeet = ~~(Number(data.height) / 12);
    heightInches = (Number(data.height) % 12);
    console.log(`${heightFeet}' ${heightInches}"`);
  }

  return (
    <pre>
      {(data)
        && (
          <div className="container mx-auto">
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
                <u>Gender:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.gender}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Hair Color:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.hairColor}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Age:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {getAge(data.birthdate)}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Eye Color:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.eyeColor}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Height:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {`${heightFeet}' ${heightInches}"`}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Zodiac Sign:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.astrologySign}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Body Type:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.bodyType}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Parental Status:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.childStatus}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Religion:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.religion}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Tobacco Use:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.smoking}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Ethnicity:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.ethnicity}
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                <u>Alcohol Use:</u>
              </div>
              <div className="text-left col-span-1 text-xl h-8">
                {data.alcoholUse}
              </div>
            </div>
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
