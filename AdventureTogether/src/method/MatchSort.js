export default function MatchSortList(personCollection) {
  const scoreArray = [];
  const person = [];
  console.log(personCollection);
  personCollection.forEach((element) => {
    console.log(element);
    let score = 0;
    if (element.description.length > 0) {
      score = Math.random();
      scoreArray.push({
        person: element,
        scoreMatch: score,
      });
    }
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
