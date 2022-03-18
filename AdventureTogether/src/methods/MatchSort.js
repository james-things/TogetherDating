// Description: A function to match users based on shared interests
export default function MatchSortList(personCollection, user) {
  console.log('USER', user.outdoorActivities);
  const userActivites = user.outdoorActivities;
  const residualScore = Math.random();
  if (Object.keys(user).length > 0) {
    const scoreArray = [];
    const person = [];
    personCollection.forEach((element) => {
      // console.log(element.outdoorActivities);
      const outdoor = element.outdoorActivities;
      let score = 0;
      if (typeof outdoor !== 'undefined') {
        outdoor.forEach((activity) => {
          if (userActivites.indexOf(activity) > 0) {
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
