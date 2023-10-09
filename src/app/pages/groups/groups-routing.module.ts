import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { ListComponent } from './list/list.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', 
  component: GroupsComponent, children:[
    { path: '', component:     StartComponent },
    { path: 'list', component: ListComponent },
    { path: ':id', component: ListDetailComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
