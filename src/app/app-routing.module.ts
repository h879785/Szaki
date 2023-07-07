import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'groups',
  loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'main',
  loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'profile',
  loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'chat',
  loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
    canActivate:[AuthGuard],
  },


{
  path: 'error',
  loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule),
  canActivate:[AuthGuard],

},
{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
},
{
  path: 'signup',
  loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
},
{
  path:'**',
  redirectTo: '/login',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
