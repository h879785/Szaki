import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnChanges {
  
    user?:User;
    users: Array<User> = [];  
  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit():void{
    this.userService.getAll().subscribe(user => {
      this.users = user;
      console.log(this.users)
    })
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    this.userService.getById(user.uid)?.subscribe(user =>{
      this.user= user;
    })
  }
  deleteUser(id :string){
    console.log(id)
    this.userService.delete(id)
  }
  updateUser(){
   
  }
  ngOnChanges():void{
      
  }

}
