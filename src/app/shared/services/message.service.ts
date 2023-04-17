import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/Message';

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
}
