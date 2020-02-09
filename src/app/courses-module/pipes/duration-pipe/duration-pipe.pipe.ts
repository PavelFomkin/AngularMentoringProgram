import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined || value.toString().length === 0) {
      return '';
    }
    if (value >= 60) {
      return Math.floor(value / 60) + ' h ' + value % 60 + ' min';
    } else {
      return value + ' min';
    }
  }

}
