import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { EtatPipe } from '../../../pipes/etat.pipe';
import { ModalComponent } from '../modal/modal.component';
import { TicketEtat } from '../../../models/ticket';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, EtatPipe, RouterModule, ModalComponent, TruncatePipe],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent implements OnInit, OnDestroy {
  tickets: any[] = [];
  user: any;
  noTicket = false;
  private socket: Socket = inject(Socket);
  private subscriptions: Subscription[] = [];

  ticketService: TicketService = inject(TicketService);
  authService: AuthService = inject(AuthService);
  ticketEtat = TicketEtat;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      return;
    }
    this.user = this.auth.getUser();
    let support = this.auth.isSupport();

    // si c'est un support, on affiche tous les tickets
    if (support) {
      this.ticketService.getAllTickets(this.user.id).subscribe({
        next: (data: any) => {
          this.tickets = Array.isArray(data) ? data : [data];
        },
        error: (error: any) => {
          this.noTicket = true;
        }
      });
    }
    // sinon on affiche les tickets spécifiques à l'utilisateur
    else {
      this.getItems();
    }

    // on écoute les nouveaux tickets
    this.subscriptions.push(
      this.socket.fromEvent('newTicket').subscribe((ticket: any) => {
        this.tickets.unshift(ticket);
      })
    );

    // on écoute les tickets mis à jour
    this.subscriptions.push(
      this.socket.fromEvent('updatedTicket').subscribe((updatedTicket: any) => {
        const index = this.tickets.findIndex(ticket => ticket.id === updatedTicket.id);
        if (index !== -1) {
          this.tickets[index] = updatedTicket;
        }
      })
    );
  }

  getItems(): void {
    this.ticketService.getTicketByUserId(this.user.id).subscribe({
      next: (data: any) => {
        this.tickets = Array.isArray(data) ? data : [data];
      },
      error: (error: any) => {
        this.noTicket = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
