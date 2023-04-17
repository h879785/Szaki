import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../models/User';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = "Users"

  constructor
  (
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

  create(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll(){
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
  addFriend(userID: string,friend: Array<string>){
    const data: Partial<User> = { friends: friend };
    this.afs.collection<User>(this.collectionName).doc(userID).update(data);
  }

}
