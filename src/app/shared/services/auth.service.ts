import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string,password: string){
    
    return this.auth.signInWithEmailAndPassword(email,password) 
  }

   signup(email: string, password: string){
     return this.auth.createUserWithEmailAndPassword(email,password)
   }

   checkPassword(email: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch(() => {
          observer.next(false);
          observer.complete();
        });
    });
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  logout(){
    return this.auth.signOut();
  }
}
