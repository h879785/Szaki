import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MessangerComponent } from './messanger/messanger.component';

const routes: Routes = [
  { 
    path: '',
    component: ChatComponent,children:[
    {
      path: '', component: MessangerComponent 
    },
    { 
    path: ':id', component: MessangerComponent 
    },
  ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
