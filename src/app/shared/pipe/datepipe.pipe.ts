import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value);
    const today = new Date();
    const thisWeek = this.calculateStartOfWeek(today);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

   
    if (this.isToday(date)) {
      return this.formatTime(date);
    } else if (this.isThisWeek(date, thisWeek)) {
      return this.formatDayOfWeek(date) + ' ' + this.formatTime(date);
    } else if (this.isThisMonth(date, thisMonth)) {
      return this.formatMonth(date) + ' ' + date.getDate() + ' ' + this.formatTime(date);
    } else if (date.getFullYear() === today.getFullYear()) {
      return this.formatMonth(date) + ' ' + date.getDate() + ' ' + this.formatTime(date);
    } else {
      return this.formatDateTime(date);
    }
  }

  
  private isToday(date: Date) {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  private isThisWeek(date: Date, thisWeek: Date) {
    return date >= thisWeek;
  }

  private isThisMonth(date: Date, thisMonth: Date) {
    return date >= thisMonth;
  }

  private isSameDay(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private calculateStartOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    return startOfWeek;
  }

  private formatTime(date: Date) {
    return date.getHours() + ':' + this.formatTwoDigits(date.getMinutes());
  }

  private formatTwoDigits(value: number) {
    return ('0' + value).slice(-2);
  }

  private formatDayOfWeek(date: Date) {
    const daysOfWeek = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
    return daysOfWeek[date.getDay()];
  }

  private formatMonth(date: Date) {
    const months = [
      'Jan', 'Feb', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'
    ];
    return months[date.getMonth()];
  }

  private formatDateTime(date: Date) {
    return (
      date.getFullYear() + ':' +
      (date.getMonth() + 1) + ':' +
      date.getDate() + ' ' +
      this.formatTime(date)
    );
  }
}
