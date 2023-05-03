import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{
  
  email = new FormControl()
  password= new FormControl()

  loading: boolean = false;
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;
  errormessage? : string;
  
  constructor(private router: Router, private loadingService: LoadingService,private authService: AuthService) { }


  ngOnInit(): void {
  }

  async login() {
      this.loading=true;
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.errormessage='Hibás felhasználónév vagy jelszó!';
        this.loading = false;
      });
  
}

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
