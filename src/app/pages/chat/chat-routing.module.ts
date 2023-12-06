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


    
    // children:[{
    // path: 'groups',
    // loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule),
    //   // canActivate:[AuthGuard],
    // },
    // {
    //   path: 'main',
    // loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    //   // canActivate:[AuthGuard],
    // },
    // ]

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
