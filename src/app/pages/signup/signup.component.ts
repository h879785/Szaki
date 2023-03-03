import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

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

  constructor(private location: Location, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    if(this.SignUpForm.value)
    console.log(this.SignUpForm.value);
    this.authService.signup(this.SignUpForm.get('email')?.value,this.SignUpForm.get('password')?.value).then(cred=>{
      console.log(cred)
    }).catch(error=>{
      console.error(error);
    });
  }

  goBack(){
    this.location.back();
  }
}
