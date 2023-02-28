import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  email= new FormControl('')
  password= new FormControl('')
  
  constructor(private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  async login() {

    /*
    //Promise megoldás injektálás,lekérésekhez (asszinkron)
    this.loadingService.loadingWithPromise(this.email.value,this.password.value).then(()=>{
        this.router.navigateByUrl('/main');
    }).catch(error=>{
      console.error(error);
    }).finally(()=>{
      console.log('this is executed finally')
    });
    //szinkronos forma async-await
    try{
      //then ág
    const bool =  await this.loadingService.loadingWithPromise(this.email.value,this.password.value)
      console.log(bool);
     this.router.navigateByUrl('/main');
      
    } catch(error){
      //catch ág
      console.error(error);
    }
    //finally ág
    console.log("finally");

  }
    //obser */
    //memory leak hiba
  const subscription=this.loadingService.loadingWithObservable(this.email.value, this.password.value).subscribe((data:number) =>{
    console.log(data);
    subscription.unsubscribe();
  });
}

}
