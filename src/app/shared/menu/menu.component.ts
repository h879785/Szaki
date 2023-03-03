import { 
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input

} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit{
  @Input() loggedInUser?:firebase.default.User|null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean>= new EventEmitter();


  constructor(){
    console.log("Constr called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }
  ngAfterViewInit(): void {
    console.log("ngAVI called");
  }
  menuSwitch(pageValue: string){
    this.selectedPage.emit(pageValue);
  }

  close(logout?:boolean){
    
      this.onCloseSidenav.emit(true);
      if(logout){
    this.onCloseSidenav.emit(true);
    }
  }
}
