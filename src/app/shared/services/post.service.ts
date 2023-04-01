import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Image } from '.././models/Image';
import { AngularFireStorage } from '@angular/fire/compat/storage'


@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName= "Images";

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  loadImageMeta(metaUrl: string): Observable<Array<Image>>{
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
