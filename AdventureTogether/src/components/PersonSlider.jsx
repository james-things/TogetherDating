/* eslint-disable jsx-a11y/control-has-associated-label, max-len */

// Description: A WIP tinder-like stack of swipeable cards which triggers like/dislike actions

// todo: style per figma diagram

import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import firebase from 'firebase/compat/app';
import TinderCard from 'react-tinder-card';
import 'firebase/compat/firestore';

import { doc } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { sendCometChatMessage } from '../cometchat';

import '../styles/tindercard.css';
import skip from '../icons/skip.svg';
import back from '../icons/back.svg';
import getAge from '../methods/getAge';

// Component main function
const PersonSlider = ({ persons, userId }) => {
  function componentWillUnmount() { window.console.log('leaving discover'); }

  let ratedUid;
  let shouldRate = true;

  // Subscribe to user document
  const userRef = doc(useFirestore(), `new-users/${userId}`);
  const { refstatus, data } = useFirestoreDocData(userRef);

  // Various states
  const [personsArray, setPersonsArray] = useState(((persons.length > 50) ? persons.slice(-50) : persons)); // array of people from matching algo (limit 50)
  const [currentIndex, setCurrentIndex] = useState(personsArray.length - 1); // index of current person
  const [lastDirection, setLastDirection] = useState(); // last card direction
  const [sharedInterests, setSharedInterests] = useState([]); // temporary state storage for shared interests
  const [myInterests, setMyInterests] = useState([]); // interests of current logged in user
  const [loading, setLoading] = useState(true); // loading state of component

  // Used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  let currentPerson = personsArray[currentIndex];

  // Maintain references for card stack
  const childRefs = useMemo(
    () => Array(personsArray.length)
      .fill(0)
      .map((i) => React.createRef()),
    [],
  );

  // Boolean can-do deck action checks
  const canGoBack = currentIndex < personsArray.length - 1;
  const canSwipe = currentIndex >= 0;

  // Buttons for actions
  const BUTTON_ICONS = {
    dislike: (<svg width="20" height="20" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" fill="#E72570" /></svg>),
    like: (<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" fill="#3BF9B3" /></svg>),
    skip: (<img width="24" height="24" src={skip} alt="skip" />),
    back: (<img width="24" height="24" src={back} alt="back" />),
  };

  // Handler for like/dislike actions
  // Rewrote to handle swipes and only consider like/dislike (remove favorite)
  const takeAction = async (action) => {
    try {
      // update our own document with the action at target user
      await firebase.firestore().collection('/new-users').doc(userId).update({
        [`${action}s`]: firebase.firestore.FieldValue.arrayUnion(ratedUid),
      });
      console.log('added rating to logged in user\'s document');

      // if the action was a like, we need to check for and handle the potential formation of a match
      if (action === 'like') {
        try {
          // fetch the rated person's document
          const ratedPersonDocument = await (await firebase.firestore().collection('/new-users').doc(ratedUid).get()).data();
          console.log('retrieved rated user\'s document successfully');
          // if that person's document contains a like for our uid
          if (ratedPersonDocument.likes.includes(userId)) {
            console.log('match found! updating docs');
            // add our new match to our own document's matches list
            await firebase.firestore().collection('/new-users').doc(userId).update({
              matches: firebase.firestore.FieldValue.arrayUnion(ratedUid),
            });
            // also add this new match to our rated user's document
            await firebase.firestore().collection('/new-users').doc(ratedUid).update({
              matches: firebase.firestore.FieldValue.arrayUnion(userId),
            });
            console.log('update doc calls made, check for promise errors!');
          }
          // whether we matched or not, we send a message to the other user
          await sendCometChatMessage(ratedUid, "We're a match!");
        } catch (error) {
          console.error(JSON.stringify(error));
        }
      }
    } catch (error) {
      console.error(`Could not perform action ${action}`);
    }
  };

  // Update the index of both currentIndex and card stack reference
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // Handles card leaving screen event
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard();
    }
    document.body.style.overflow = 'visible';
  };

  // update shared interest state based on currentPerson
  function updateSharedInterests() {
    const targetUserInterests = currentPerson.outdoorActivities;
    const tempShared = [];
    myInterests.forEach((interest) => {
      targetUserInterests.forEach((targetInterest) => {
        if (targetInterest === interest) {
          tempShared.push(interest);
        }
      });
    });
    setSharedInterests(tempShared);
  }

  // For programmatic swiping ( can replace or call actions ) - not currently in use
  const swipe = async (action, shouldRateBool) => {
    let dir;
    shouldRate = shouldRateBool;
    if ((action === 'like') || (action === 'skip')) dir = 'right';
    if ((action === 'dislike') || (action === 'back')) dir = 'left';
    if (canSwipe && currentIndex < personsArray.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card (should be decrease?) - not currently in use
  const goBack = async () => {
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    updateSharedInterests();
    await childRefs[newIndex].current.restoreCard();
  };

  // Handle swipes and call action functions when appropriate
  const swiped = (direction, uidToDelete, index) => {
    document.body.style.overflow = 'hidden';
    console.log(`swiped shouldRate: ${shouldRate}`);
    if (direction === ('down' || 'up')) {
      console.log(`??? Blocked Swipe ${direction} detected`);
    }
    if ((direction === 'right') && (shouldRate === true)) {
      console.log('Swipe right event!');
      ratedUid = uidToDelete;
      takeAction('like').then(() => console.log('tookAction like'));
    }
    if ((direction === 'right') && (shouldRate === false)) {
      console.log('Skip event!');
      ratedUid = uidToDelete;
    }
    if ((direction === 'left') && (shouldRate === true)) {
      console.log('Swipe left event!');
      ratedUid = uidToDelete;
      takeAction('dislike').then(() => console.log('tookAction dislike'));
    }
    if ((direction === 'left') && (shouldRate === false)) {
      if (!canGoBack) {
        console.log('cant go back!');
        return;
      }
      goBack().then(() => console.log('called goBack'));
      return; // potential race condition!
    }
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    updateSharedInterests();
    shouldRate = true;

    // update current person (so we know which user is on top of the deck!)
    currentPerson = persons[currentIndex];
  };

  // Load in the logged-in user's interests once their document is available
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ((data.outdoorActivities !== undefined) && (myInterests.length <= 0)) {
      setMyInterests(data.outdoorActivities);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // try to catch if still loading
    if ((myInterests.length > 0) && currentPerson) {
      updateSharedInterests();
    }
  }, [data, loading, currentPerson]);

  // Action button component
  const ActionButton = ({ action }) => (
    <button
      className="bg-white transform transition duration-500 hover:scale-110 rounded-full shadow-md p-4"
      type="button"
      onClick={async () => swipe(action, ((action !== 'skip') && (action !== 'back')))}
    >
      {BUTTON_ICONS[action]}
    </button>
  );

  // Component renders:
  // Note: for work on CSS, some explanation for how this works -
  // The collection of users "persons" is mapped to individual TinderCard elements.
  // The mapped TinderCard elements are displayed on top of one another based on their reference index.
  // When a swipe happens or the page is first loaded, the functions called update the persons[person] which
  // is stored in currentPerson. The user info display for the top card pulls from currentPerson. Additional
  // data elements can be added in the same form. A complete list of potential data elements can be found in
  // ./methods/registerGoogleProfile.js. Currently. when the size of this top card data element changes, the
  // position of the stack also changes, which is the primary issue to solve here.
  return (
    <>
      {!loading && currentIndex === -1 && <p>No more people to match with.</p>}
      {!loading && currentIndex >= 0
        && (
          <div className="">
            <div className="">
              {personsArray.map((person, index) => (
                <div key={person.id.slice(0, -5)}>
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={person.id}
                    onSwipe={(dir) => swiped(dir, person.id, index)}
                    onCardLeftScreen={() => outOfFrame(person.id, index)}
                    preventSwipe="up down"
                  >
                    <div
                      className="group relative rounded-lg overflow-hidden w-72 h-96 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${person.imageUrl})`,
                      }}
                    >
                      <p className="absolute bottom-12 group-hover:top-0 m-4 pb-0 text-white text-lg font-bold transition-all">{person.name}</p>
                      <p className="hidden md:block absolute bottom-6 group-hover:top-0 m-4 pt-6 pr-8 text-white text-md truncate group-hover:whitespace-normal transition-all w-full">
                        {`Age: ${getAge(currentPerson.birthdate)}`}
                      </p>
                      <p className="hidden md:block absolute bottom-0 group-hover:top-0 m-4 pt-6 pr-8 text-white text-md truncate group-hover:whitespace-normal transition-all w-full">{person.description}</p>
                    </div>
                    <p className="block md:hidden text-gray-500 my-2 text-center">{person.description}</p>
                  </TinderCard>
                </div>
              ))}
            </div>
            <div className="top-card-info align-middle w-72">
              <div className="action-buttons w-full">
                <ActionButton action="back" />
                <ActionButton action="dislike" />
                <ActionButton action="like" />
                <ActionButton action="skip" />
              </div>
              <div className="top-card-info-text text-xs text-left bg-white border-black border-2">
                {`Name: ${currentPerson.name}`}
                <br />
                {`Common Interests: ${(sharedInterests.length > 0) ? sharedInterests : 'The Great Outdoors'}`}
                <br />
                {`Eye Color: ${currentPerson.eyeColor}`}
                <br />
                {`Hair Color: ${currentPerson.hairColor}`}
                <br />
                {`Height: ${currentPerson.height}`}
                <br />
                {`Ethnicity: ${currentPerson.ethnicity}`}
                <br />
                {`Sign: ${currentPerson.astrologySign}`}
                <br />
                {`Gender: ${currentPerson.gender}`}
                <br />
                {`Age: ${getAge(currentPerson.birthdate)}`}
                <br />
                {`Kids?: ${currentPerson.childStatus}`}
                <br />
                {`Drinking: ${currentPerson.alcoholUse}`}
                <br />
                {`Smoking: ${currentPerson.smoking}`}
              </div>
            </div>
          </div>
        )}
      {/* ADDING DATA ELEMENTS: add elements of currentPerson to display below image */}
    </>
  );
};

export default PersonSlider;
