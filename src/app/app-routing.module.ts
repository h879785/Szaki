import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
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
  redirectTo: '/error',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
