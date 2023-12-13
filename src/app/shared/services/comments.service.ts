import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  collectionName= "Comment";

  constructor(
    private afs: AngularFirestore,
  ) { }

  createComment(comment: Comment){
      comment.id = this.afs.createId();
      return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  getAllComment(){
      return this.afs.collection<Comment>(this.collectionName).valueChanges();
   }

  getAllCommentWID(postId: string){
    return this.afs.collection<Comment>(this.collectionName, ref => ref.where('postid', '==', postId).orderBy('date', 'desc')).valueChanges();
  }


  update(comment: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  delete(id: string) {
    return this.afs.collection<Comment>(this.collectionName).doc(id).delete();
  }

  addLike(commentID: string,commentL: Array<string>){
    const data: Partial<Comment> = { like: commentL };
    this.afs.collection<Comment>(this.collectionName).doc(commentID).update(data);
  }
}