import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-friendprofiles',
  templateUrl: './friendprofiles.component.html',
  styleUrls: ['./friendprofiles.component.scss']
})
export class FriendprofilesComponent implements OnInit{
  @Input() me?: User;
  @Input() friendsInput?: Array<User>;
  @Input() myprofilePic?: any
  chosenFriend?: User;
  searchtext: any = "";

  constructor(
  ){
  }

  ngOnInit() {
  }
}
