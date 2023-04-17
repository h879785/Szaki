import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  collectionName = 'p_Images';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage    
    ) {}
    
    loadImageMeta(metaUrl: string): Observable<Array<Image>> {
      return this.afs.collection<Image>(this.collectionName).valueChanges();
    }
  
    loadImage(imageUrl: string) {
      return this.storage.ref(imageUrl).getDownloadURL();

  }
}
