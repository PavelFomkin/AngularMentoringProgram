import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(arr: any[], field: string): any[] {
    if (arr.length > 0 && field in arr[0]) {
      return arr.sort((a, b) => a[field] - b[field]);
    } else {
      return arr;
    }
  }
}
