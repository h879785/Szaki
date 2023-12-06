import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from '.././models/Image';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Post } from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this._postsSubject.asObservable();
  collectionName= "Posts";

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  // createPost(post: Post){
  //   post.id = this.afs.createId();
  //     return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post);
  // }

  createPost(post: Post) {
    post.id = this.afs.createId();
    return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post)
      .then(() => {
        const currentPosts = this._postsSubject.getValue();
        currentPosts.push(post);
        this._postsSubject.next(currentPosts);
      });
  }

  getAllPost(){
    return this.afs.collection<Post>(this.collectionName, ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  // update(post: Post) {
  //   return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post);
  // }

  update(post: Post) {
    return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post)
      .then(() => {
        // Frissítjük a BehaviorSubject értékét a frissített adattal
        const currentPosts = this._postsSubject.getValue();
        const index = currentPosts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          currentPosts[index] = post;
          this._postsSubject.next(currentPosts);
        }
      });
  }
  

  // delete(id: string) {
  //   return this.afs.collection<Post>(this.collectionName).doc(id).delete();
  // }

  delete(id: string) {
    return this.afs.collection<Post>(this.collectionName).doc(id).delete()
      .then(() => {
        const currentPosts = this._postsSubject.getValue();
        const updatedPosts = currentPosts.filter(post => post.id !== id);
        this._postsSubject.next(updatedPosts);
      });
  }

  getMyPosts(myid: string) {
    return this.afs.collection<Post>(this.collectionName, ref => ref.where('creator', '==', myid).orderBy('date', 'desc')).valueChanges();
  }

  getPost(postid: string) {
    return this.afs.collection<Post>(this.collectionName, ref => ref.where('id', '==', postid)).valueChanges();
  }

  addLike(postID: string,likes: Array<string>){
    const data: Partial<Post> = { like: likes };
    this.afs.collection<Post>(this.collectionName).doc(postID).update(data);
  }
  addComment(postID: string,comments: Array<string>){
    const data: Partial<Post> = { comments: comments };
    this.afs.collection<Post>(this.collectionName).doc(postID).update(data);
  }

}
