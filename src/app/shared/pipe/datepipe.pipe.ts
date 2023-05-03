import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().replace('Z', '').replace('T', ' ');
  
        const date = new Date(value);
        if (this.isToday(date)) {
          return 'ma';
        } else if (this.isYesterday(date)) {
          return 'tegnap';
        } else if (this.isThisWeek(date)) {
          return 'ezen a héten';
        } else {
          return localISOTime;
        }
      }
    
      private isToday(date: Date) {
        const today = new Date();
        return date.getDate() === today.getDate()
            && date.getMonth() === today.getMonth()
            && date.getFullYear() === today.getFullYear();
      }
    
      private isYesterday(date: Date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return date.getDate() === yesterday.getDate()
            && date.getMonth() === yesterday.getMonth()
            && date.getFullYear() === yesterday.getFullYear();
      }
    
      private isThisWeek(date: Date) {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay();
        const lastDayOfWeek = firstDayOfWeek + 6;
        return date.getDate() >= firstDayOfWeek
            && date.getDate() <= lastDayOfWeek
            && date.getMonth() === today.getMonth()
            && date.getFullYear() === today.getFullYear();
      }    

}
