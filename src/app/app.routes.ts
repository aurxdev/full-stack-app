import { Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    {
        path:'',
        component: ListeComponent,
        title: 'Liste',
    },
    {
        path:'login',
        component: LoginComponent,
        title:'Connexion',
    },
    {
        path:'registration',
        component: RegistrationComponent,
        title: 'Registration',
    },
];
