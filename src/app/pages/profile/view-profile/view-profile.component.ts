import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit{
  selectedUserId: any
  selectedUser: any
  selectedUserPosts: Array<any> = []
  profilePic: any
  me?:User;
  myprofilePic? :any
  myPosts: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private imageService: ImageService,
    private postService: PostService,
  ){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedUserId = params['id']
      console.log(this.selectedUserId)
      if (this.selectedUserId) {
        this.userService.getById(this.selectedUserId).subscribe((user: User | undefined) => {
          if (user && user.id) {
            this.selectedUser = user;
            console.log(this.selectedUserId)
            this.postService.getMyPosts(user.id).subscribe((myposts) => {
              this.selectedUserPosts = myposts;
            });
            if (this.selectedUser?.image) {
              this.imageService.loadImage(this.selectedUser.image).subscribe((profpic) => {
                this.profilePic = profpic;
              });
            }
          }
        });}
        
     const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

     this.userService.getById(me.uid)?.subscribe((user) => {
      this.me = user;
       if (this.me?.id) {
         this.postService.getMyPosts(this.me.id).subscribe((myposts) => {
           this.myPosts = myposts;
         });
       }
       if (this.me?.image) {
         this.imageService.loadImage(this.me?.image).subscribe((profpic) => {
           this.myprofilePic = profpic;
         });
       }
     });

    }); 
  }

}
