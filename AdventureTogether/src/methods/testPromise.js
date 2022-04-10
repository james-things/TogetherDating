import MatchSortList from './MatchSort';
import getImplicitInterests from './getImplicitInterests';

export default function testPromise(data) {
  console.log(data);
  const Prom1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });
  return Prom1;
}
