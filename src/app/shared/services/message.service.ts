import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/Message';
import { Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  collectionName= "Messages"

  constructor(
    private afs: AngularFirestore,
  ) { }

  sendMessage(message: Message){
    message.id = this.afs.createId();
      return this.afs.collection<Message>(this.collectionName).doc(message.id).set(message);
  }

  getAllMessage(){
    return this.afs.collection<Message>(this.collectionName).valueChanges();
  }

  update(message: Message) {
    return this.afs.collection<Message>(this.collectionName).doc(message.id).set(message);
  }

  delete(id: string) {
    return this.afs.collection<Message>(this.collectionName).doc(id).delete();
  }

  getMyChats(myid: string) {
    return this.afs.collection<Message>(this.collectionName, ref => ref.where('from', '==', myid).orderBy('date', 'asc')).valueChanges();
  }

  getUnknownMessage(myid: string, userid: string){
     return this.afs.collection<Message>(this.collectionName, ref =>
      ref.where('from', '==', userid).where('to', '==', myid)
    ).valueChanges();
  }
  
  getFriendChat(myid: string, friendid: string): Observable<Message[]> {
    const fromMyIdQuery = this.afs.collection<Message>(this.collectionName, ref =>
      ref.where('from', '==', myid).where('to', '==', friendid)
    ).valueChanges();
  
    const fromFriendIdQuery = this.afs.collection<Message>(this.collectionName, ref =>
      ref.where('from', '==', friendid).where('to', '==', myid)
    ).valueChanges();
  
    return combineLatest([fromMyIdQuery, fromFriendIdQuery]).pipe(
      map(([fromMyIdMessages, fromFriendIdMessages]) => {
        const mergedMessages = fromMyIdMessages.concat(fromFriendIdMessages);
        const sortedMessages = mergedMessages.sort((a, b) => {
          const dateA = a.date || 0;
          const dateB = b.date || 0;
          return dateA - dateB;
        });
        return sortedMessages
      })
    );
  }

}
