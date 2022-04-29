/* eslint-disable jsx-a11y/control-has-associated-label, max-len */

// Description: A WIP tinder-like stack of swipeable cards which triggers like/dislike actions

// todo: address simple todo on line 45 and test with database connection
//  (use async so cards work while document is updated)

import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import firebase from 'firebase/compat/app';
import TinderCard from 'react-tinder-card';
import 'firebase/compat/firestore';
import ReactSwing from 'react-swing';

import { sendCometChatMessage } from '../cometchat';

import '../styles/tindercard.css';

// Component main function
export default function PersonSliderTesting({ persons, userId }) {
  const [personsArray, setPersonsArray] = useState(persons);

  const [currentIndex, setCurrentIndex] = useState(personsArray.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () => Array(personsArray.length)
      .fill(0)
      .map((i) => React.createRef()),
    [],
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < personsArray.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    // todo: add and test simple if/if to handle "direction invokes like/dislike action constant"
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard();
    }
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  // for programmatic swiping ( can replace or call actions )
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < personsArray.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  // Buttons for actions
  const BUTTON_ICONS = {
    dislike: (<svg width="20" height="20" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" fill="#E72570" /></svg>),
    like: (<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" fill="#3BF9B3" /></svg>),
    favorite: (<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" fill="#28CDF3" /></svg>),
  };

  // Handler for like/dislike/favorites actions
  // Database code commented out while work on other aspects of component is finished
  const takeAction = async (action) => {
    try {
      console.log(`TA Start: ${personsArray}`);
      const [ratedPerson, ...rest] = personsArray;
      // await firebase.firestore().collection('/new-users').doc(userId).update({
      //   [`${action}s`]: firebase.firestore.FieldValue.arrayUnion(ratedPerson.id),
      // });
      setPersonsArray(rest);
      console.log(`TA End: ${personsArray}`);
      /*
      // todo: investigate this function (from original codebase)
      if (action === 'like' || action === 'favorite') {
        try {
          const ratedPersonDocument = await (await firebase.firestore().collection('/new-users').doc(ratedPerson.id).get()).data();
          if (ratedPersonDocument.likes.includes(userId)
            || ratedPersonDocument.favorites.includes(userId)) {
            await firebase.firestore().collection('/new-users').doc(userId).update({
              matches: firebase.firestore.FieldValue.arrayUnion(ratedPerson.id),
            });
            await firebase.firestore().collection('/new-users').doc(ratedPerson.id).update({
              matches: firebase.firestore.FieldValue.arrayUnion(userId),
            });
          }
          await sendCometChatMessage(ratedPerson.id, "We're a match!");

        } catch (error) {
          console.error(JSON.stringify(error));
        }
      }
      */
    } catch (error) {
      console.error(`Could not perform action ${action}`);
    }
  };

  const currentPerson = personsArray[0];

  const ActionButton = ({ action }) => (
    <button className="bg-white transform transition duration-500 hover:scale-110 rounded-full shadow-md p-4" type="button" onClick={() => takeAction(action)}>
      {BUTTON_ICONS[action]}
    </button>
  );

  return (
    <>
      {personsArray.length === 0 && <p>No more people to match with.</p>}
      {personsArray.length > 0
        && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              {personsArray.map((person, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={person.id}
                  onSwipe={(dir) => swiped(dir, person.id, index)}
                  onCardLeftScreen={() => outOfFrame(person.id, index)}
                  preventSwipe="down"
                >
                  <div
                    className="group relative rounded-lg overflow-hidden w-72 h-96 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${person.imageUrl})`,
                    }}
                  >
                    <div className="absolute inset-0 top-auto bg-gradient-to-t from-black opacity-75 h-1/4 group-hover:h-full group-hover:bg-gradient-to-b transition-all duration-500" />
                    <p className="absolute bottom-0 group-hover:top-0 m-4 pb-0 md:pb-5 text-white text-lg font-bold transition-all">{person.name}</p>
                    <p className="hidden md:block absolute bottom-0 group-hover:top-0 m-4 pt-6 pr-8 text-white text-md truncate group-hover:whitespace-normal transition-all w-full">{person.description}</p>
                  </div>
                  <p className="block md:hidden text-gray-500 my-2 text-center">{person.description}</p>
                </TinderCard>
              ))}
            </div>
            {/*
            <div className="flex justify-around my-4 w-4/5">
              <ActionButton action="dislike" />
              <ActionButton action="favorite" />
              <ActionButton action="like" />
            </div>
            */}
          </div>
        )}
    </>
  );
}
