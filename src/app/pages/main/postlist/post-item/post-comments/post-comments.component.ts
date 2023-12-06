import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { Comment } from 'src/app/shared/models/Comment';
import { ImageService } from 'src/app/shared/services/image.service';


@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit{
  @Input() me?:User;
  @Input() commenter?:User ;
  @Input() comments?: Comment| undefined;
  profilePic?: any;

  constructor(
    private imageService: ImageService,
  ){}

  ngOnInit(): void {
    if(this.commenter?.image){
      this.imageService.loadImage(this.commenter.image).subscribe(image=>{
        this.profilePic = image;
      })
    }
  }
}
