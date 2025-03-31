import { Routes } from '@angular/router';
import { UserTasksComponent } from './pages/user-tasks/user-tasks.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { AuthService } from './services/auth.service';
import { AuthredirectService } from './services/authredirect.service';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [


    {path:"" , component:LandingpageComponent , canActivate:[AuthredirectService]},
    {path:"register" , component:UserRegisterComponent, canActivate:[AuthredirectService] },
    {path:"login" , component:UserLoginComponent , canActivate:[AuthredirectService]},

    
    {path:"tasks" , component:UserTasksComponent , canActivate:[AuthService]},
    {path:"profile" , component:UserProfileComponent , canActivate:[AuthService]}
];
