import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-profile-data',
  templateUrl: './update-profile-data.component.html',
  styleUrls: ['./update-profile-data.component.scss']
})
export class UpdateProfileDataComponent implements OnInit{

  profilePic: any;

  errormessage: string = '';
  isProfPicUpdate: boolean = false;
  UpdateForm = new FormGroup({
    work :      new FormControl(),
    birthplace:   new FormControl(),
    hobbies: this.formBuilder.array([]),
    image:   new FormControl(),
    password: new FormControl(),
  })
  form: FormGroup;


  ngOnInit(): void {
      this.imageService.loadImage(this.data.me.image).subscribe(image=>{
        this.profilePic = image
      })
  }

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.form = this.formBuilder.group({  
      image: [null], 
    });
  }

  uploadPic(){
    this.imageService.uploadProfilePic(this.form?.value.image)
  }

  isUpdateProfPic(){
    this.isProfPicUpdate ? this.isProfPicUpdate=false : this.isProfPicUpdate=true;
  }

  get hobbiesFormArray() {
    return this.UpdateForm.get('hobbies') as FormArray;

  }

  addHobby() {
    this.hobbiesFormArray.push(new FormControl(''));
  }

  removeHobby(index: number) {
    this.hobbiesFormArray.removeAt(index);
  }


  updateProfile(){
    const password = this.UpdateForm.get('password')?.value as string;
    this.authService.checkPassword(this.data.me.email,password).subscribe((isPasswordCorrect) => {
      if(isPasswordCorrect){
        const updatedMe: User=({
          id: this.data.me.id,
        email: this.data.me.email,
        name: {
            firstname: this.data.me.name?.firstname,
            lastname: this.data.me.name?.lastname,
        },
        gender: this.data.me.gender,
        birthdate: this.data.me.birthdate,
        birthplace: this.UpdateForm.get("birthplace")?.value as string || this.data.me.birthplace ||'',
        friends: this.data.me.friends,
        work: this.UpdateForm.get("work")?.value as string || this.data.me.work || '',
        hobbies: this.hobbiesFormArray.value,
        image: this.form?.value.image ? `profilepic/${this.form.value.image.name}` : this.data.me.image
      })
     if(this.form?.value.image){
       this.uploadPic()
     }
     this.userService.update(updatedMe)
     this.dialog.closeAll;
     this.toastr.success("Adatok frissítése megtörtént", "Frissítés")
      }else{
        this.errormessage = 'Helytelen jelszó';
        this.toastr.error("Hibásan adtad meg a jelszavad!", "Hiba!")
      }
      })
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
