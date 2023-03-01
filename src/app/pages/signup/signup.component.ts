import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  SignUpForm = new FormGroup({
    email:      new FormControl(''),
    password:   new FormControl(''),
    repassword: new FormControl(''),
    name:       new FormGroup({
      firstname:  new FormControl(''),
      lastname:   new FormControl(''),
    })

  })

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.SignUpForm.value)
  }

  goBack(){
    this.location.back();
  }
}