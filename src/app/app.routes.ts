import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { DrawerComponent } from './drawer/drawer.component';

export const routes: Routes = [
    { path:'', component: LoginFormComponent},
    {path:'drawer', component: DrawerComponent},
    
];
