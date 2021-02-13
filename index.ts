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
      map((y: number) => y * x.key),
      take(3)
    );
  })
);

//source.subscribe(console.log);

const mergeMapSource = delayValues.pipe(
  mergeMap(x => {
    return neverEndingObservable.pipe(
      map((y: number) => y * x.key),
      take(3)
    );
  })
);

//mergeMapSource.subscribe(console.log);

const mergeMapSourceAsConcatMap = delayValues.pipe(
  mergeMap(x => {
    return neverEndingObservable.pipe(
      map((y: number) => y * x.key),
      take(3)
    );
  }, 1)
);

mergeMapSourceAsConcatMap.subscribe(console.log);