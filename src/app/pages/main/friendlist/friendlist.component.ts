import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss'],
})
export class FriendlistComponent implements OnInit{

  @Input() me?: User;
  users: Array<User> = [];  
  searchtext: any = "";
  
constructor(
  private userService: UserService,
)
{}

  ngOnInit() {
    this.userService.getAll().subscribe(allUser => {
      this.users = allUser;
      if (this.me?.friends) {
        this.users = this.users.filter(user => user?.id !== undefined && !this.me?.friends?.includes(user.id));
      }
    });
    
  }
}
