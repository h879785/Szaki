import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Groups } from '../models/Groups';
import { User } from '../models/User';

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

  addModerator(groupID: string,morederators: Array<User>){
    const data: Partial<Groups> = { moderators: morederators };
    this.afs.collection<Groups>(this.collectionName).doc(groupID).update(data);
  }

  addMember(groupID: string, members: Array<User>){
    const data: Partial<Groups> = { members: members };
    this.afs.collection<Groups>(this.collectionName).doc(groupID).update(data);
  }
}
