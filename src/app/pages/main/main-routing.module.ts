import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { PostlistComponent } from './postlist/postlist.component';


const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
    children:[
      { path: '', component:     PostlistComponent },
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
