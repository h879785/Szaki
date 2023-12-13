import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from 'src/app/shared/models/Image';
import { User } from 'src/app/shared/models/User';
import { PostCreatorComponent } from './post-creator/post-creator.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() me?: User | undefined;
  @Input() profilePic?: Image;

  constructor(
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
  
    }

  
  openPostCreator(){
    this.dialog.open(PostCreatorComponent,{
      width:'50%',
      height: '70%',
      data: {
        profilePic: this.profilePic,
        me: this.me
      }
     })
  }
}
