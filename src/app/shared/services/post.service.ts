import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Image } from '.././models/Image';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Post } from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName= "Posts";

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  createPost(post: Post){
    post.id = this.afs.createId();
      return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post);
  }

  getAllPost(){
    return this.afs.collection<Post>(this.collectionName).valueChanges();
  }

  update(post: Post) {
    return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post);
  }

  delete(id: string) {
    return this.afs.collection<Post>(this.collectionName).doc(id).delete();
  }

  getMyPosts(myid: string) {
    return this.afs.collection<Post>(this.collectionName, ref => ref.where('creator', '==', myid).orderBy('date', 'asc')).valueChanges();
  }

  loadImageMeta(metaUrl: string): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
