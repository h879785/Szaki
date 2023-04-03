import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/models/Post';
import { User } from 'src/app/shared/models/User';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit,OnChanges {

  user?:User;
  post?:Post;
  
  postForm = this.newPost({
    id: "",
    creator: "",
    post: "",
    date: 0
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) {}


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.postForm.get('creator')?.setValue(this.user?.id);
    }, error => {
      console.error(error);
    });
  }

  newPost(model: Post){
    let formGroup = this.fb.group(model);
    formGroup.get('creator')?.addValidators([Validators.required]);
    formGroup.get('post')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup
  }

  addPost(){
    if(this.postForm.valid){
      if(this.postForm.get('creator') && this.postForm.get('post')!==null){

        const newpost: Post = {
          id: '',
          creator: this.user?.id,
          post: this.postForm.get("post")?.value as string,
          date: new Date().getTime(),
        };
  


        this.postService.createPost(newpost).then(_ => {
          console.log(this.postForm.value)
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
