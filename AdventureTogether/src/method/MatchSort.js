import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function MatchSortList() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    id, name,
  } = JSON.parse(
    localStorage.getItem('user'),
  );

  const eastonTest = 0;
  console.log(eastonTest);

  let residualScore = 0;
  let specificScore = 0;
  const likesArray = ['Climbing', 'Walking', 'Running'];
  const userComp = ['Sailing', 'Climbing', 'Dog-Walking'];

  likesArray.forEach((e) => {
    const indx = userComp.indexOf(e);
    if (indx > -1) {
      userComp.splice(indx, 1);
      specificScore += 1;
    }

    residualScore = Math.random();
  });

  const totalScore = residualScore + specificScore;

  console.log(totalScore);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        const newPersons = [];
        querySnapshot.forEach((person) => newPersons.push(person.data()));
        setPersons(newPersons);
        setLoading(false);

        console.log(name, id, loading);
      });
  }, []);

  console.log('persons', persons);
}
