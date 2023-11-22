import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormate'
})
export class NumberFormatePipe implements PipeTransform {

  transform(value: number) {
    if (value >= 1000 && value < 1000000) {
      return Math.floor(value / 1000) + 'k';
    } else if (value >= 1000000) {
      return Math.floor(value / 1000000) + 'M';
    } else {
      return value;
    }
  }
}
