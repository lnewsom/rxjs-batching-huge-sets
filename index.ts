import { BehaviorSubject, from, interval, Observable,  of,  Subject, zip } from 'rxjs'; 
import { concatMap, delay, map, scan, tap, take, windowCount, mergeAll, bufferCount } from 'rxjs/operators';

const LIMIT = 100;
const BATCH_SIZE = 10;
let index = 0;
const incomingSubject = new Subject();


//const source = incomingSubject.pipe(
//  bufferCount(10),
//  concatMap((win) => from(win).pipe(
//      delay(3000),
//      concatMap(x => { 
//          return of(x).pipe(delay(1000))
 //       }))));

const source = incomingSubject.pipe(
  bufferCount(10),
  concatMap((win) => from(win).pipe(
      delay(100),
      concatMap(x => { 
          return of(x).pipe(delay(10))
        }
      )
  ))
);

source.subscribe(console.log);

while (index < LIMIT) {
  index++;
  incomingSubject.next({key: index});
}
