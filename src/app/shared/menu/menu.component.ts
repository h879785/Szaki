import { 
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter

} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

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
}
