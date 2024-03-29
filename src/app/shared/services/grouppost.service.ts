import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Image } from '.././models/Image';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { GroupPost } from '../models/GroupPost';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class GrouppostService {

  collectionName = "GroupPost"

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }


  createPost(post: GroupPost){
    post.id = this.afs.createId();
      return this.afs.collection<GroupPost>(this.collectionName).doc(post.id).set(post);
  }

  getAllPost(){
    return this.afs.collection<GroupPost>(this.collectionName, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getById(id: string){
    return this.afs.collection<GroupPost>(this.collectionName).doc(id).valueChanges();
  }

  update(post: GroupPost) {
    return this.afs.collection<GroupPost>(this.collectionName).doc(post.id).set(post);
  }

  delete(id: string) {
    return this.afs.collection<GroupPost>(this.collectionName).doc(id).delete();
  }

  getMyPosts(myid: string) {
    return this.afs.collection<GroupPost>(this.collectionName, ref => ref.where('creator', '==', myid).orderBy('date', 'desc')).valueChanges();
  }

  getPost(postid: string) {
    return this.afs.collection<GroupPost>(this.collectionName, ref => ref.where('id', '==', postid)).valueChanges();
  }

  loadImageMeta(metaUrl: string): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
  addLike(postID: string,likes: Array<string>){
    const data: Partial<GroupPost> = { like: likes };
    this.afs.collection<GroupPost>(this.collectionName).doc(postID).update(data);
  }
  addComment(postID: string,comments: Array<Comment>){
    const data: Partial<GroupPost> = { comments: comments };
    this.afs.collection<GroupPost>(this.collectionName).doc(postID).update(data);
  }

}