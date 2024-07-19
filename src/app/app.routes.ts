import { Routes } from '@angular/router';
import { ListeComponent } from './components/shared/liste/liste.component';
import { LoginComponent } from './components/form/login/login.component';
import { RegistrationComponent } from './components/form/registration/registration.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedGuard } from './shared/logged.guard';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { FormTicketComponent } from './components/form/form-ticket/form-ticket.component';

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
        title: 'Enregistrement',
        canActivate: [LoggedGuard],
    },
    {
        path:'profil',
        component: ProfileComponent,
        title: 'Profil',
        canActivate: [AuthGuard],
    },
    {
        path:'create-ticket',
        component: FormTicketComponent,
        title: 'Créer un ticket',
        canActivate: [AuthGuard],
    }
];
