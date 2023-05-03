import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit{

  me?: User;
  users: Array<User> = [];  
  friend: Array<string>=[];

constructor(
  private userService: UserService
)
{}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;
    })  
    this.userService.getAll().subscribe(users =>{
      this.users=users;
    })
  }

  addFriend(friendId: string){
    const me = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if(this.me?.friends?.indexOf(friendId)===-1){
      this.friend.push(friendId);
      this.userService.addFriend(me.uid,this.friend);
    }
  }

  indexOf(id: string){
    if(this.me?.friends?.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }
}
