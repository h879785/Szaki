import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GroupPost } from 'src/app/shared/models/GroupPost';
import { Groups } from 'src/app/shared/models/Groups';
import { Image } from 'src/app/shared/models/Image';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-group-post-creator',
  templateUrl: './group-post-creator.component.html',
  styleUrls: ['./group-post-creator.component.scss']
})
export class GroupPostCreatorComponent implements OnInit,OnChanges {

  @Input() me?: User;
  @Input() profilePic?: Image;
  @Input() group?: Groups;
  
  GroupPostForm = this.newPost({
    id: "",
    creator: "",
    post: "",
    date: 0,
    image: "",
    });
    form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupPostService: GrouppostService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
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
    formGroup.get('post')?.addValidators([
      Validators.required,      
      this.postStringValidator(), 
      Validators.minLength(5)]);
    return formGroup
  }

  addPost(){
    if(this.GroupPostForm.valid){
      console.log(this.data.group.id)
      console.log(this.data.group)
      if(this.GroupPostForm.get('creator') && this.GroupPostForm.get('post')!==null){

        const newpost: GroupPost = {
          id: '',
          groupid: this.data.group.id, 
          creator: this.data.me.id,
          post: this.GroupPostForm.get("post")?.value as string,
          date: new Date().getTime(),
          like: [],
          comments: [],
          image: this.form.value.image ? `post/${this.form.value.image.name}` : ""
        };
        if(this.form.value.image){
          this.uploadPic()
        }

        this.groupPostService.createPost(newpost).then(_ => {
          console.log(this.GroupPostForm.value)
          this.GroupPostForm.reset();
          this.form.reset();
          this.dialog.closeAll;
        }).catch(error => {
          console.error(error);
          this.GroupPostForm.reset();
          this.form.reset();
        });
      }
    }
  }
 

  postStringValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const postText = control.value as string;

      const httpLinkRegex = /(http):\/\/\S+/;
      if (httpLinkRegex.test(postText)) {
        return { containsHttpLink: true };
      }

      const forbiddenHtmlTags = /<\/?(script|style|iframe|a|img|div|h\d)+>/gi;
      if (forbiddenHtmlTags.test(postText)) {
        return { containsForbiddenTags: true };
      }

      return null;
    };
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
        imageFile = this.base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        return;
      }
    } else {
      imageFile = imageData;
      if (!this.isValidImageFile(imageFile)) {
        this.toastr.error('Csak jpg, jpeg és png kiterjesztésű fájlok engedélyezettek.', 'Kiterjesztési hiba!');
        return;
      }
      if (!this.isValidImageFile(imageFile)) {
        this.toastr.error('A fájl elérte a maximális méretet (5MB)', 'Max méret hiba!');
        return;
      }
    }

    this.form?.patchValue({ image: imageFile });
  }

  isValidImageFile(file: File): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
  
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop();
    if(extension){
    return allowedExtensions.includes(extension);
    }
    return false;
  }

  isValidSizeImageFile(file: File): boolean {
    const maxFileSizeInBytes = 5 * 1024 * 1024; 
  
  return file.size <= maxFileSizeInBytes;
    
  }

  base64toBlob(base64Data: string, contentType:string) {
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

}
