import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Image } from './shared/models/Image';
import { ImageService } from './shared/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  [x: string]: any;
  page=''
  routes: Array<string> =[];
  loggedInUser?: firebase.default.User | null
  defaultPP?: Image;
  imageP?: string;


  constructor(
    private router: Router,
    private authService: AuthService,
    private imageService: ImageService
    ){}

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user=>{
      this.loggedInUser =user;
      localStorage.setItem('user',JSON.stringify(this.loggedInUser));
      this.imageService.loadImage("images/universe.png").subscribe(image=>{
        this.defaultPP=image;
      })
    },error=>{
      console.error(error);
      localStorage.setItem('user',JSON.stringify('null'));
    })  

  };


  changePage(selectedPage: string){
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if(event ===true){
        sidenav.close();
    }
  }
  logout(_?: boolean){
    this.authService.logout().then(()=>{
      console.log('Logged out!')
    }).catch(error=>{
      console.error(error);
    })
    ;
}
}
