export default function MatchSortList(personCollection, user) {
  let newUsers = [];
  let returnUsers = [];
  const countInterests = [];
  const implicitInterests = [];
  const user1 = JSON.parse(localStorage.getItem('user'));
  if (Object.keys(user).length > 0) {
    // const matches = JSON.parse(localStorage.getItem('people'));
    // console.log('USER', user1, personCollection);
    const userActivites = user1.outdoorActivities;
    newUsers = personCollection.filter((x) => !user1.likes.includes(x.id));
    newUsers = newUsers.filter((x) => !user1.dislikes.includes(x.id));
    newUsers = newUsers.filter((x) => !user1.favorites.includes(x.id));
    returnUsers = personCollection.filter((x) => !newUsers.includes(x));
    returnUsers = returnUsers.filter((x) => !user1.dislikes.includes(x.id));
    // need to pull likes, favorites out, create sorted list
    // this above works
    // console.log(newUsers, returnUsers, personCollection.length);
    // start old implicit interests
    returnUsers.forEach((element) => {
      const outdoor = element.outdoorActivities;
      if (typeof outdoor !== 'undefined') {
        outdoor.forEach((activity) => {
          const indx = userActivites.map((e) => {
            const actName = e.name;
            return actName;
          }).indexOf(activity.name);
          const indxLegacy = userActivites.map((e) => {
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
      countInterests.push({ name: a, count: ct });
    });
    console.log(countInterests);
    const scoreArray = [];
    const person = [];
    newUsers.forEach((element) => {
      const outdoor = element.outdoorActivities;
      let score = 0;
      if (typeof outdoor !== 'undefined') {
        outdoor.forEach((activity) => {
          const indx = userActivites.map((e) => {
            const actName = e.name;
            return actName;
          }).indexOf(activity.name);
          const indxLegacy = userActivites.map((e) => {
            const actName = e.name;
            return actName;
          }).indexOf(activity);
          const indxImplicit = countInterests.map((e) => {
            const actName = e.name;
            return actName;
          }).indexOf(activity);
          const indxImpLegacy = countInterests.map((e) => {
            const { name } = e;
            // console.log(count);
            return name;
          }).indexOf(activity.name);
          if (indx > -1 || indxLegacy > -1) {
            score += 1;
          }
          if (indxImplicit > -1 || indxImpLegacy > -1) {
            let ct = 0;
            if (indxImplicit > -1) {
              ct = countInterests[indxImplicit].count;
            }
            if (indxImpLegacy > -1) {
              ct = countInterests[indxImpLegacy].count;
            }
            score += (ct / 2);
          }
        });
      }
      scoreArray.push({
        person: element,
        scoreMatch: score,
      });
    });
    scoreArray.sort((a, b) => {
      const result = b.scoreMatch - a.scoreMatch;
      return result;
    });
    scoreArray.forEach((item) => {
      person.push(item.person);
    });
    return person;
  }
}
