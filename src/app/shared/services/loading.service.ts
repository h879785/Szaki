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
  /*
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
}*/
  //TODO:
  //CRUD (Create, Read, Update, Delete)
  loadingWithObservable(email:string|null,password: string|null): Observable<number>{
    //data stream (adatfolyam)
    return new Observable((subscriber: Subscriber<number>) =>{
      let i =0;
      const interval = setInterval(()=>{
        i++;
        subscriber.next(1);
        if(i===3){
          clearInterval(interval)
          subscriber.complete();
        }
      });
    });
  }
}
