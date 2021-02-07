import { from } from 'rxjs'; 
import { map } from 'rxjs/operators';

const LIMIT = 100;
const BATCH_SIZE = 10;
const sourceArray = [];
let index = 0;

while (index < LIMIT) {
  index++;
  sourceArray.push({key: index});
}

const source = from(sourceArray).pipe(
  map(x => `Hello ${x.key}!`)
);

source.subscribe(console.log);