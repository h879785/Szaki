import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/models/Message';
import { User } from 'src/app/shared/models/User';
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
  myChats?: Array<Message>=[];

  @Input() chat?: User;
  @Output() friendObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenFriend?: User;


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
    private messageService: MessageService
  ){
    
  }

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
      if(this.me?.id)
      this.messageService.getMyChats(this.me?.id).subscribe(messages=>{
       this.myChats=messages;
      })
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
      to: this.chosenFriend?.id,
      message: this.messageForm.get("message")?.value as string,
      date: new Date().getTime(),
    };

    this.messageService.sendMessage(newMessage).then(_=>{
      console.log("sikeres üzenet neki "+ newMessage.to)
    }).catch(error=>{
      console.log(error)
    })
  }

 ngOnChanges() {
    if (this.chat) {
      this.chosenFriend = this.chat;
    }
    if(this.chosenFriend?.id){
      this.messageService.getMyChats(this.chosenFriend.id).subscribe(message=>{
        if(message){
          for (let i = 0; i < message.length; i++) {
            this.chatWithFriend?.push(message[i])
          } 
        } 
      })
    }
  }
}
