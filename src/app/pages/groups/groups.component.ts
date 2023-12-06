import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { User } from 'src/app/shared/models/User';
import { Groups } from 'src/app/shared/models/Groups';
import { GroupPost } from 'src/app/shared/models/GroupPost';
import { Image } from 'src/app/shared/models/Image';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { FormBuilder,Validators } from '@angular/forms';




@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit,OnDestroy{
  
  me?:User;
  groups?: Array<Groups> = [];
  members?: Array<User> = [];
  pickedGroup?: Groups;
  
  grouppostForm = this.newGroupPost({
    id: "",
    creator: "",
    post: "",
    date: 0,
    groupid: "",
    like: [],
    comments: [],
    });

  constructor(
    private MatDialog:MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private groupService: GroupService,
    private groupPostService: GrouppostService,
    private imageService: ImageService,
    ){}


  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
      this.userService.getById(user.uid).subscribe(user=>{
        this.me=user;
      })
      this.groupService.getAll().subscribe(groups=>{
        this.groups = groups
        console.log(this.groups)
      })
  }

  newGroupPost(model: GroupPost){
    let formGroup = this.fb.group(model);
    formGroup.get('creator')?.addValidators([Validators.required]);
    formGroup.get('post')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup
  }


  openNewGroup(){
    this.MatDialog.open(DialogComponent,{
      width:'350px',
      height: '500px'
    })
  }

  ngOnDestroy() {
  }
}
