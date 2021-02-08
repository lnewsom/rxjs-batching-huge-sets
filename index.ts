import { from, of, Subject } from "rxjs";
import { concatMap, delay, bufferCount } from "rxjs/operators";

const LIMIT = 1000;
const BATCH_SIZE = 10;
let index = 0;
const incomingSubject = new Subject();

const source = incomingSubject.pipe(
  bufferCount(BATCH_SIZE),
  concatMap(win =>
    from(win).pipe(
      delay(3000),
      concatMap(x => {
        return of(x).pipe(delay(10));
      })
    )
  )
);

source.subscribe(console.log);

while (index < LIMIT) {
  index++;
  incomingSubject.next({ key: index });
}
