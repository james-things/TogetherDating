import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default async function getImplicitInterests() {
  const {
    likes = [], dislikes = [], favorites = [], id,
  } = JSON.parse(
    localStorage.getItem('user'),
  );
  const user = JSON.parse(localStorage.getItem('user'));
  const outdoorActivity = user.outdoorActivities;
  const callFB = await
  firebase
    .firestore()
    .collection('users')
    // .where('id', 'in', [id, ...likes, ...dislikes, ...favorites])
    .get()
    .then((querySnapshot) => {
      const oldPersons = [];
      const implicitInterests = [];
      const countInterests = [];
      querySnapshot.forEach((person) => oldPersons.push(person.data()));
      oldPersons.forEach((element) => {
        const outdoor = element.outdoorActivities;
        if (typeof outdoor !== 'undefined') {
          outdoor.forEach((activity) => {
            const indx = outdoorActivity.map((e) => {
              const actName = e.name;
              return actName;
            }).indexOf(activity.name);
            const indxLegacy = outdoorActivity.map((e) => {
              const actName = e.name;
              return actName;
            });
            if (indx < 0 || indxLegacy < 0) {
              implicitInterests.push(activity);
            }
          });
        }
        const b = element.bodyType;
        implicitInterests.push(b);
        const h = element.hairColor;
        implicitInterests.push(h);
        const e = element.eyeColor;
        implicitInterests.push(e);
      });
      const results = implicitInterests.filter((b) => b !== '').sort();
      results.forEach((a) => {
        let ct = 0;
        results.forEach((b) => {
          if (a === b) {
            ct += 1;
          }
        });
        countInterests.push({ title: a, count: ct });
      });
      return countInterests;
    });
  return callFB;
}
/*
.then((querySnapshot) => {
      const oldPersons = [];
      const implicitInterests = [];
      const countInterests = [];
      querySnapshot.forEach((person) => oldPersons.push(person.data()));
      oldPersons.forEach((element) => {
        const outdoor = element.outdoorActivities;
        if (typeof outdoor !== 'undefined') {
          outdoor.forEach((activity) => {
            const indx = outdoorActivity.map((e) => {
              const actName = e.name;
              return actName;
            }).indexOf(activity.name);
            const indxLegacy = outdoorActivity.map((e) => {
              const actName = e.name;
              return actName;
            });
            if (indx < 0 || indxLegacy < 0) {
              implicitInterests.push(activity);
            }
          });
        }
        const b = element.bodyType;
        implicitInterests.push(b);
        const h = element.hairColor;
        implicitInterests.push(h);
        const e = element.eyeColor;
        implicitInterests.push(e);
      });
      // console.log(implicitInterests);
      const results = implicitInterests.filter((b) => b !== '').sort();
      results.forEach((a) => {
        let ct = 0;
        results.forEach((b) => {
          if (a === b) {
            ct += 1;
          }
        });
        countInterests.push({ title: a, count: ct });
      });
      console.log(countInterests);
      return countInterests;
    })
  */
