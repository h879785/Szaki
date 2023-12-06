import { createMayBeForwardRefExpression } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Message } from 'src/app/shared/models/Message';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.scss']
})
export class MessangerComponent implements OnInit{
  me?: User;
  chatWithFriend?: Array<Message>=[];
  friendChat?: Array<Message>=[];
  friendprofilePic: any;
  showDate?:boolean = true;

  @Input() chat?: User;
  chosenFriend?: User;
  chosenFriendId?: any;


  messageForm = this.newMessage({
    id: "",
    from: "",
    to: "",
    message:"",
    date: 0
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private ImageService: ImageService
  ){
    
  }


  ngOnInit(){
  const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
  })

    this.route.params.subscribe((params: Params) => {
      this.chosenFriendId = params['id'];
      if (typeof this.chosenFriendId === 'string') {
          this.userService.getById(this.chosenFriendId).subscribe((friend: User | undefined) => {
            if (friend && friend.image) {
              this.chosenFriend = friend;
              this.ImageService.loadImage(friend.image).subscribe(pic =>{
                this.friendprofilePic = pic
              })
              if(this.me?.id && this.chosenFriendId){
                this.messageService.getFriendChat(this.me.id,this.chosenFriendId).subscribe(chat =>{
                  this.friendChat = chat; 
                  console.log(this.friendChat)
                })
              }
            }
          })
      }
    })
  }


  newMessage(model: Message){
    let formGroup = this.fb.group(model);
    formGroup.get('message')?.addValidators([Validators.required, Validators.minLength(1)]);
    return formGroup
  }

  addMessage(){
    const newMessage: Message = {
      id: '',
      from: this.me?.id,
      to: this.chosenFriendId,
      message: this.messageForm.get("message")?.value as string,
      date: new Date().getTime(),
    };
    this.messageService.sendMessage(newMessage).then(_=>{
      console.log("sikeres üzenet neki "+ newMessage.to)
    }).catch(error=>{
      console.log(error)
    })
  }

}
