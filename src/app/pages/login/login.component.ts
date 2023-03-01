import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  email= new FormControl('')
  password= new FormControl('')

  loading: boolean = false;
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>
  
  constructor(private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  async login() {
      this.loading=true;
      this.loadingObservation =this.loadingService.loadingWithObservable(this.email.value, this.password.value)
      this.loadingSubscription = this.loadingObservation
      .subscribe(
        {
          next: (data: boolean) => {
            this.router.navigateByUrl('/main');
          }, error: (error) => {
            console.error(error);
            this.loading = false;
          }, complete: () => {
            console.log('finally');
            this.loading = false;
          }
      }
      );
  }
}
