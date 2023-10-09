import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Groups } from '../models/Groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  collectionName = "Groups"

  constructor
  (
    private afs: AngularFirestore,
    ) { }

  createGroup(group: Groups){
    group.id = this.afs.createId();
    return this.afs.collection<Groups>(this.collectionName).doc(group.id).set(group);
  }

  getAll(){
    return this.afs.collection<Groups>(this.collectionName).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<Groups>(this.collectionName).doc(id).valueChanges();
  }

  update(group: Groups){
    return this.afs.collection<Groups>(this.collectionName).doc(group.id).set(group);
  }

  delete(id: string){
    return this.afs.collection<Groups>(this.collectionName).doc(id).delete();
  }
}
