import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';export class AppRoutesModule  { }
const routes: Routes = [
  //{ path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path:'layout',component :LayoutComponent,
  children :[
    {path: 'home', component: HomeComponent},
    {path :'profile', component : ProfileComponent},
    {path :'tweets', component : TweetListComponent}    
  ]
  },
  { path: 'signup', loadChildren: () => import('./signup-module/signup-module.module').then(m => m.SignupModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
