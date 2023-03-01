import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  // Callback
  //  Promise
  //  Observable

  loadingWithPromise(email:string|null,password: string |null): Promise<boolean>{
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if (email === 'test@gmail.com' && password === 'testpw') {
        resolve (true)
      } else {
        console.error('Incorrect email or password!');
        reject(false)
      }
    }, 3000);
  });
}

  loadingWithObservable(email:string|null,password: string|null): Observable<boolean>{

    return new Observable((subscriber: Subscriber<boolean>) =>{
      let i =0;
      const interval = setInterval(()=>{
        i++;
        if(i===3){
          if (email === 'test@gmail.com' && password === 'testpw') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        }
      }, 1000);
    });
  }
}
