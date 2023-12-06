import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Image } from 'src/app/shared/models/Image';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

function base64toBlob(base64Data: string, contentType:string) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.scss']
})
export class PostCreatorComponent implements OnInit,OnChanges {

  @Input() me?: User;
  @Input() profilePic?: Image;
  
  postForm = this.newPost({
    id: "",
    creator: "",
    post: "",
    date: 0,
    image: "",
    });
    form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.form = this.formBuilder.group({  
      image: [null], 
    });

  }


  ngOnInit(): void {
    }

  newPost(model: Post){
    let formGroup = this.fb.group(model);
    formGroup.get('post')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup
  }

  addPost(){
    if(this.postForm.valid){
      if(this.postForm.get('creator') && this.postForm.get('post')!==null){

        const newpost: Post = {
          id: '',
          creator: this.data.me.id,
          post: this.postForm.get("post")?.value as string,
          date: new Date().getTime(),
          like: [],
          comments: [],
          image: this.form.value.image ? `post/${this.form.value.image.name}` : ""
        };
        if(this.form.value.image){
          this.uploadPic()
        }

        this.postService.createPost(newpost).then(_ => {
          console.log(this.postForm.value)
          this.postForm.reset();
          this.form.reset();
          this.dialog.closeAll;
        }).catch(error => {
          console.error(error);
          this.postForm.reset();
          this.form.reset();
        });
      }
    }
  }
 

  ngOnChanges(): void {
  }

  uploadPic(){
    this.imageService.uploadPostPic(this.form.value.image)
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
        console.log(imageFile)
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
      console.log(imageFile)
    }
    this.form?.patchValue({ image: imageFile });
  }

}
