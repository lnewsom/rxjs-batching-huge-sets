import { of, from, Subject } from 'rxjs'; 
import { map, concatMap, take, mergeMap } from 'rxjs/operators';

const delayValues = from([
  { key: 1, source: "delay" },
  { key: 2, source: "delay" },
  { key: 3, source: "delay" },
  { key: 4, source: "delay" },
  { key: 5, source: "delay" },
  { key: 6, source: "delay" }
]);

const neverEndingObservable = new Subject();

setInterval(() => neverEndingObservable.next(10), 500);

const source = delayValues.pipe(
  concatMap(x => {
    return neverEndingObservable.pipe(
      map((y: number) => `${y * x.key} : from concatMap`),
      take(3)
    );
  })
);

// source.subscribe(console.log);

const mergeMapSource = delayValues.pipe(
  mergeMap(x => {
    return neverEndingObservable.pipe(
      map((y: number) => `${y * x.key} : from mergeMap`),
      take(3)
    );
  })
);

//mergeMapSource.subscribe(console.log);

const mergeMapSourceAsConcatMap = delayValues.pipe(
  mergeMap(x => {
    return neverEndingObservable.pipe(
      map((y: number) => `${y * x.key} : from mergeMap with one concurrency `),
      take(3)
    );
  }, 1)
);

// mergeMapSourceAsConcatMap.subscribe(console.log);

const reversedOrder = neverEndingObservable.pipe(
  take(3),
  concatMap((x: number) => {
    return delayValues.pipe(
      map((y) => `${x * y.key} : from reversedOrder`)
    );
  })
);

// reversedOrder.subscribe(console.log);