import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Groups } from 'src/app/shared/models/Groups';
import { GroupPost } from 'src/app/shared/models/GroupPost';
import { GroupService } from 'src/app/shared/services/group.service';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { GroupPostCreatorComponent } from '../group-post-creator/group-post-creator.component';
import { MatDialog } from '@angular/material/dialog';
import { ManagingMembersComponent } from '../managing-members/managing-members.component';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit{
  group?: Groups;
  groupId?: string;
  message: string = "";
  members: User [] = [];
  me?: User;
  profilePic?: any;
  allPost: GroupPost[] = [];

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
    private groupService: GroupService,
    private groupPostService: GrouppostService,
    private imageService: ImageService,
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ){

  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['id'];
      if (typeof this.groupId === 'string') {
        this.groupService.getById(this.groupId).subscribe((group: Groups | undefined) => {
          if (group) {
            this.group = group;
          }else{
            this.message = "HIBA! A keresett csoport nem található!"        
          }
        });
        this.groupPostService.getAllPost().subscribe(allpost=> {
          if (allpost) {
            this.allPost = allpost.filter(post => post.groupid === this.groupId);           
            console.log(this.allPost)
          }else{
            this.message = "Nem található post!"        
          }
        });
      }
    });

    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    this.userService.getById(me.uid)?.subscribe((user) => {
      this.me = user;
      if (this.me?.image) {
        this.imageService.loadImage(this.me?.image).subscribe((profpic) => {
          this.profilePic = profpic;
        });
      }
    });
  }

  newGroupPost(model: GroupPost){
    let formGroup = this.fb.group(model);
    formGroup.get('creator')?.addValidators([Validators.required]);
    formGroup.get('post')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup
  }

  addGroupPost(pickedGroup: Groups){
    if(this.grouppostForm.valid){
      if(this.grouppostForm.get('creator') && this.grouppostForm.get('post')!==null){

        const newgrouppost: GroupPost = {
          id: '',
          creator: this.me?.id,
          post: this.grouppostForm.get("post")?.value as string,
          date: new Date().getTime(),
          like: [],
          groupid: pickedGroup.id,
          comments: [],
        };

        this.groupPostService.createPost(newgrouppost).then(_ => {
          console.log(newgrouppost)
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
  openGroupPostCreator(){
      this.dialog.open(GroupPostCreatorComponent,{
        width:'50%',
        height: '70%',
        data: {
          profilePic: this.profilePic,
          me: this.me,
          group: this.group,
        }
       })
  }

  inMembers(){
    if (this.group && this.me) {
      return !!this.group.members?.some(member => member.id === this.me?.id);
    }
    return false;
  }

  isModerator(){
    if (this.group && this.me) {
      return !!this.group.moderators?.some(member => member.id === this.me?.id);
    }
    return false;
  }

  managingMembers(){
      this.dialog.open(ManagingMembersComponent,{
        width:'50%',
        height: '70%',
        data: {
          profilePic: this.profilePic,
          me: this.me,
          group: this.group,
        }
       })
  
  }
}
