import { of, from } from 'rxjs'; 
import { map } from 'rxjs/operators';

const delayValues = from([
  { key: 1, source: "delay" },
  { key: 2, source: "delay" },
  { key: 3, source: "delay" },
  { key: 4, source: "delay" },
  { key: 5, source: "delay" },
  { key: 6, source: "delay" }
]);

const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(console.log);