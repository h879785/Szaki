import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {
  newstring?: string

  transform(value: string | undefined) {
    if (value && value.length > 20) {
      return value.slice(0, 17) + '...';
    }
    return value;
  }
  }
