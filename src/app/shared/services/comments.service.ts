import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName= "Comment";

  constructor(
    private afs: AngularFirestore,
  ) { }

  createComment(comment: Comment){
    comment.id = this.afs.createId();
      return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  getAllComment(postId: string){
    return this.afs.collection<Comment>(this.collectionName, ref => ref.where('creator', '==', postId).orderBy('date', 'desc')).valueChanges();
  }

  update(comment: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  delete(id: string) {
    return this.afs.collection<Comment>(this.collectionName).doc(id).delete();
  }
}