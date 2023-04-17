import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-friendprofiles',
  templateUrl: './friendprofiles.component.html',
  styleUrls: ['./friendprofiles.component.scss']
})
export class FriendprofilesComponent implements OnInit,OnChanges{

  @Input() friendsInput?: Array<User>;
  @Output() friendObjectEmitter: EventEmitter<User>=new EventEmitter();
  chosenFriend?: User;

  constructor(
  ){
  }
  ngOnChanges() {
      if (this.friendsInput) {
        this.chosenFriend = this.friendsInput[0];
      }
  }


  ngOnInit() {
  }

  friendUser(friend: User){
    this.chosenFriend=friend
    this.friendObjectEmitter.emit(this.chosenFriend);
  }
}
