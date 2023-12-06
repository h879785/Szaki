import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { PostService } from 'src/app/shared/services/post.service';
import { UpdateProfileDataComponent } from '../update-profile-data/update-profile-data.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit{
  @Input() me?: User;
  @Input() selectedUser?: User | undefined;
  myposts: Array<Post>=[];
  selectedUserposts: Array<Post>=[];
  constructor(
    private postService: PostService,
    private dialog: Dialog,
  ){}

  ngOnInit(){
    if(this.me?.id){
    this.postService.getMyPosts(this.me.id).subscribe(mypost =>{
      this.myposts = mypost;
     })
    }
    if(this.selectedUser?.id){
      this.postService.getMyPosts(this.selectedUser?.id).subscribe(mypost =>{
        this.myposts = mypost;
       })
      }
  }
  updateUser(){
      this.dialog.open(UpdateProfileDataComponent,{
        width:'50%',
        height: '70%',
        data: {
          me: this.me
        }
       })
  }
}
