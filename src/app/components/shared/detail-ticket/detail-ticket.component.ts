import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { DatePipe } from '@angular/common';
import { EtatPipe } from '../../../pipes/etat.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [DatePipe, EtatPipe, CommonModule],
  templateUrl: './detail-ticket.component.html',
  styleUrl: './detail-ticket.component.css'
})
export class DetailTicketComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  ticket: Ticket | undefined;

  constructor(ticketService: TicketService) {
    const idTicket = this.route.snapshot.params['id'];
    ticketService.getTicketById(idTicket).subscribe({
      next: (ticket) => {
        console.log(ticket);
        this.ticket = ticket;
      },
      error: (error) => {
        console.error(error);
      }
    });
    }

  }

