import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'birthpipe'
})
export class BirthpipePipe implements PipeTransform {


  /*transform(value: firebase.firestore.Timestamp): string {

    const datePipe = new DatePipe('en-US');
    const date = value.toDate();
    const formattedDate = datePipe.transform(date, 'yyyy/MM/dd');

    return formattedDate || '';
  }*/


  transform(value: Date, ...args: unknown[]): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'MMMM d, y');
    const age = this.getAge(value);

    return ` Születésnap ${formattedDate} (${age} )`;
  }

  private getAge(date: Date): number {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
