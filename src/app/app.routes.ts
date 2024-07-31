import { Routes } from '@angular/router';

import { ListeTicketComponent } from './components/tickets/liste-ticket/liste-ticket.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { ProfileComponent } from './components/shared/profile/profile.component';
import { FormTicketComponent } from './components/tickets/form-ticket/form-ticket.component';
import { DetailTicketComponent } from './components/tickets/detail-ticket/detail-ticket.component';
import { TicketGuard } from './guards/ticket.guard';
import { tick } from '@angular/core/testing';
import { DashboardComponent } from './components/support/dashboard/dashboard.component';
import { SupportGuard } from './guards/support.guard';

export const routes: Routes = [
    {
        path:'',
        component: ListeTicketComponent,
        title: 'Liste',
    },
    {
        path:'login',
        component: LoginComponent,
        title:'Connexion',
        canActivate: [AuthGuard],
    },
    {
        path:'registration',
        component: RegistrationComponent,
        title: 'Enregistrement',
        canActivate: [AuthGuard],
    },
    {
        path:'profil',
        component: ProfileComponent,
        title: 'Profil',
        canActivate: [NotAuthGuard],
    },
    {
        path:'create-ticket',
        component: FormTicketComponent,
        title: 'Créer un ticket',
        canActivate: [NotAuthGuard],
    },
    {
        path:'ticket',
        redirectTo: '/',
        pathMatch: 'full',
    },
    {
        path:'ticket/:id',
        component: DetailTicketComponent,
        title: 'Détail du ticket',
        canActivate: [NotAuthGuard,TicketGuard],
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [NotAuthGuard],
    },
    {
        path:'**',
        redirectTo: '/',
        pathMatch: 'full',
    }
];
