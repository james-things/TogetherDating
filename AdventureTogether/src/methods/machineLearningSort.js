// Description: Improved matching algorithm used to generate a set of potential matches for a user

export default function MatchSortList(personCollection, user) {
  let newUsers = [];
  const returnUsers = [];
  let tempReturnUsers = [];
  const countInterests = [];
  const implicitInterests = [];
  // const user1 = JSON.parse(localStorage.getItem('user'));
  const user1 = user;
  if (user1) {
    // const matches = JSON.parse(localStorage.getItem('people'));
    // console.log('USER', user1, personCollection);
    const userActivites = user1.outdoorActivities;
    newUsers = personCollection.filter((x) => !user1.likes.includes(x.id));
    console.log(`newUsers length: ${newUsers.length}`);
    newUsers = newUsers.filter((x) => !user1.dislikes.includes(x.id));
    console.log(`newUsers length: ${newUsers.length}`);
    newUsers = newUsers.filter((x) => !user1.favorites.includes(x.id));
    console.log(`newUsers length: ${newUsers.length}`);
    tempReturnUsers = newUsers.filter((x) => !x.dislikes.includes(user.id));
    console.log(`tempReturnUsers length: ${tempReturnUsers.length}`);
    tempReturnUsers = tempReturnUsers.filter((x) => !x.dislikes.includes(user1.id));
    tempReturnUsers.forEach((rUser) => {
      console.log(rUser.name);
      let shared;
      let found = false;
      user1.outdoorActivities.forEach((myActivity) => {
        rUser.outdoorActivities.forEach((theirActivity) => {
          if (myActivity === theirActivity) found = true;
          shared = theirActivity;
        });
      });
      if (found === true) {
        console.log(`found shared interest with user: ${rUser.name}\nOver interest: ${shared}`);
        returnUsers.push(rUser);
      }
    });
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
    // console.log(countInterests);
    const scoreArray = [];
    const person = [];
    returnUsers.forEach((element) => {
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
    console.log('ML Score', scoreArray);

    // invert persons for PersonSlider
    if (person.length > 0) {
      return person.reverse();
    }
    return returnUsers.reverse();
  }
}
