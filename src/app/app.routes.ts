import { Routes } from '@angular/router';
import { ListeComponent } from './components/liste/liste.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedGuard } from './shared/logged.guard';

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
        canActivate: [LoggedGuard],
    },
    {
        path:'registration',
        component: RegistrationComponent,
        title: 'Registration',
        canActivate: [LoggedGuard],
    },
];
