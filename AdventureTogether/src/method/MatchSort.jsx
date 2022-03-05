import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function MatchSortList({ persons, userId }) {

    const [personsArray, setPersonsArray] = useState(persons);

    const takeAction = async (action) => {
        try {
          const [ratedPerson, ...rest] = personsArray;
          await firebase.firestore().collection('/users').doc(userId).update({
            [`${action}s`]: firebase.firestore.FieldValue.arrayUnion(ratedPerson.id),
          });
          setPersonsArray(rest);
    
          if (action === 'like' || action === 'favorite') {
            try {
              const ratedPersonDocument = await (await firebase.firestore().collection('/users').doc(ratedPerson.id).get()).data();
              if (ratedPersonDocument.likes.includes(userId)
              || ratedPersonDocument.favorites.includes(userId)) {
                await firebase.firestore().collection('/users').doc(userId).update({
                  matches: firebase.firestore.FieldValue.arrayUnion(ratedPerson.id),
                });
                await firebase.firestore().collection('/users').doc(ratedPerson.id).update({
                  matches: firebase.firestore.FieldValue.arrayUnion(userId),
                });
              }
    
              await sendCometChatMessage(ratedPerson.id, "We're a match!");
            } catch (error) {
              console.error(JSON.stringify(error));
            }
          }
        } catch (error) {
          console.error(`Could not perform action ${action}`);
        }
      };



}