import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform(values: any): any {
    let keys = [];

    for (let k in values) {
      keys.push(k);
    }

    return keys;
  }

}
