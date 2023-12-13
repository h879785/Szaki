import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{

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
  }

}
