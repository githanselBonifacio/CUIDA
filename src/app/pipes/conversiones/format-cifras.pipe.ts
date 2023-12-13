import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCifras'
})
export class FormatCifrasPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: number): string {
    let newValue: number;
    let suffix: string;

    if (value >= 1000000) {
      newValue = value / 1000000;
      suffix = 'M';
    } else if (value >= 1000) {
      newValue = value / 1000;
      suffix = 'K';
    } else {
      newValue = value;
      suffix = '';
    }

    if (newValue == null) {
      return "0";
    } else if (Number.isInteger(newValue)) {
      return `${newValue} ${suffix}`;
    } else {
      return `${this.decimalPipe.transform(newValue, '1.1-2')} ${suffix}`;
    }
  }

}
