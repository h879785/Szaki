import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/Message';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-friendcard',
  templateUrl: './friendcard.component.html',
  styleUrls: ['./friendcard.component.scss']
})
export class FriendcardComponent implements OnInit{
  @Input() friend?: User;
  @Input() me?: User;
  profilePic: any;
  friendChat?: Array<Message>

  constructor(
    private imageService: ImageService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
      if(this.me?.id && this.friend?.id){
        this.messageService.getFriendChat(this.me.id,this.friend.id).subscribe(chat =>{
          this.friendChat = chat; 
        })
      if(this.friend?.image){
        this.imageService.loadImage(this.friend.image).subscribe(pic =>{
          this.profilePic = pic;
        })
      }
    }
  }
  }

