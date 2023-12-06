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
    name:       new FormGroup({
      firstname:  new FormControl(),
      lastname:   new FormControl(),
    }),
    birthdate: new FormControl(),
    gender:   new FormControl('female'),

  })

  constructor(private router: Router,private location: Location, private authService: AuthService,private userService: UserService) { }

  ngOnInit(): void {
  }

  errormessage?: String;
  pw?:String;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  
  onSubmit(){
    this.authService.signup(this.SignUpForm.get('email')?.value,this.SignUpForm.get('password')?.value).then(cred=>{
      const user : User = {
        id: cred.user?.uid as string || '',
        email: this.SignUpForm.get('email')?.value as string,
        name: {
          firstname: this.SignUpForm.get('name.firstname')?.value as string,
          lastname: this.SignUpForm.get('name.lastname')?.value as string         
        },
        birthdate: this.SignUpForm.get('birthdate')?.value as Date,
        gender: this.SignUpForm.get('gender')?.value as string,
        friends: [],
        image: 'default.jpg'
      };
    
      if (!user.email || !user?.name?.firstname || !user.name.lastname || !user.birthdate || !user.gender) {
        this.errormessage='Hiányzó adatok! Kérjük figyelmesen töltsön ki minden mezőt!';
      }
      else{
      this.userService.create(user).then(_=>{
        cred.user?.sendEmailVerification();
        this.router.navigateByUrl('/login');
        this.errormessage='Sikeresen hozzáadva';
      }).catch(error=>{
        this.errormessage='Hiányzó adatok! Kérjük figyelmesen töltsön ki minden mezőt!';
      })}
    }).catch(error=>{
      this.errormessage='Hiányzó adatok! Kérjük figyelmesen töltsön ki minden mezőt!';
    });
  
  }

  goBack(){
    this.location.back();
  }

}
