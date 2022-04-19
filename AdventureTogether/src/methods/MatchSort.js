// Description: First iteration of matching algorithm

export default function MatchSortList(personCollection, user) {
  console.log('USER', user.outdoorActivities);
  const userActivites = user.outdoorActivities;
  const residualScore = Math.random();
  if (Object.keys(user).length > 0) {
    if (Object.keys(personCollection).length > 0) {
      const scoreArray = [];
      const person = [];
      personCollection.forEach((element) => {
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
            if (indx > -1 || indxLegacy > -1) {
              score += 1;
            }
          });
        }
        scoreArray.push({
          person: element,
          scoreMatch: score + residualScore,
        });
      });
      scoreArray.sort((a, b) => {
        const result = b.scoreMatch - a.scoreMatch;
        return result;
      });
      console.log(scoreArray);
      scoreArray.forEach((item) => {
        person.push(item.person);
      });
      return person;
    }
  }
}
