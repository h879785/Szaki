import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {User} from '../../shared/models/User'
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  SignUpForm = new FormGroup({
    email :      new FormControl(),
    password:   new FormControl(),
    repassword: new FormControl(),
    name:       new FormGroup({
      firstname:  new FormControl(),
      lastname:   new FormControl(),
    })
    
  })

  constructor(private router: Router,private location: Location, private authService: AuthService,private userService: UserService) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.SignUpForm.value);

    this.authService.signup(this.SignUpForm.get('email')?.value,this.SignUpForm.get('password')?.value).then(cred=>{
      console.log(cred)
      const user : User = {
        id: cred.user?.uid as string,
        email: this.SignUpForm.get('email')?.value as string,
        name: {
          firstname: this.SignUpForm.get('name.firstname')?.value as string,
          lastname: this.SignUpForm.get('name.lastname')?.value as string         
        },
        friends: []
      };
      //TODO: insert user
      this.userService.create(user).then(_=>{
        this.router.navigateByUrl('/main');
        console.log('Added succ')
      }).catch(error=>{
        console.error(error)
      })
    }).catch(error=>{
      console.error(error);
    });
  }

  goBack(){
    this.location.back();
  }

}
