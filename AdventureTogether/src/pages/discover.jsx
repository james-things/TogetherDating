// Description: A testing page which allows the user to browse potential matches
// using the swipable card component PersonSlider-Testing

// todo: pass user instead of userId to PersonSlider to enable identifying shared interests

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';
import SideMatchList from '../components/SideMatchList';
import { withLayout } from '../wrappers/layout';
import machineLearningSort from '../methods/machineLearningSort';
import PersonSlider from '../components/PersonSlider';

// Page main function
const DiscoverPage = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSort] = useState(true);
  const [interest, setInterests] = useState([]);
  const {
    likes = [], dislikes = [], favorites = [], id, name, imageUrl,
  } = JSON.parse(
    localStorage.getItem('user'),
  );

  // Iterates through users to generate potential matches
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      // .where('id', 'not-in', [id, ...likes, ...dislikes, ...favorites])
      .get()
      .then((querySnapshot) => {
        const newPersons = [];
        querySnapshot.forEach((person) => newPersons.push(person.data()));
        // had to add a user object to send to compare against activities
        // the previous above area removes already liked people
        const user = JSON.parse(localStorage.getItem('user'));
        const show = machineLearningSort(newPersons, user);
        // need to set people to compare - unsure what the function does for sure
        setPersons(newPersons);
        // console.log('CALL', show);
        // i am able to get the people then swap the persons
        setPersons(show);
        console.log('SORTED ARRAY', show);
        setLoading(false);
      });
  }, []);

  function getTopCardPerson() {
    if (persons.length > 0) {
      const returnPerson = persons[persons.length - 1];
      return returnPerson.name;
    }
    return 'no more people to match!';
  }

  function handleOnChange() {
    console.log('persons changed!');
    getTopCardPerson();
  }

  useEffect(() => {
    console.log('persons changed');
  }, [persons]);

  // Page content - A display of potential matches, with a side match list component
  return (
    <div className="grid grid-cols-3 md:grid-cols-9 h-screen w-screen overflow-hidden">
      <div className="hidden md:block col-span-2 bg-pink-500 shadow-lg">
        <SideMatchList person={{ id, name, imageUrl }} />
      </div>
      <div className="flex flex-col items-center flex-grow w-full md:ml-4 col-span-3 md:col-span-7">
        <div className="pt-4 flex-none">
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
        <section className="flex my-auto">
          {loading && <h3>Loading</h3>}
          {!loading
            // eslint-disable-next-line react/jsx-no-bind,max-len
            && <PersonSlider persons={persons} userId={id} />}
          <Link to="/inbox" className="block absolute shadow-3xl inset-0 top-auto font-bold text-white flex items-center justify-center uppercase p-4 h-12 bg-gradient-to-r from-pink-600 via-pink-600 to-yellow-500">Inbox</Link>
        </section>
      </div>
    </div>
  );
};

export default withLayout(DiscoverPage, { hideNavbar: true });
