import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { DatePipe } from '@angular/common';
import { EtatPipe } from '../../../pipes/etat.pipe';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { FormMessageComponent } from '../../form/form-message/form-message.component';
import { DiscussionComponent } from '../discussion/discussion.component';


@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [DatePipe, EtatPipe, CommonModule, MessageComponent, FormMessageComponent, DiscussionComponent],
  templateUrl: './detail-ticket.component.html',
  styleUrl: './detail-ticket.component.css'
})
export class DetailTicketComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  ticketService: TicketService = inject(TicketService);
  ticket: Ticket | undefined;

  constructor() {
    const idTicket = this.route.snapshot.params['id'];
    this.loadTicket(idTicket);
    this.ticketService.ticketUpdate$.subscribe( updatedTicket => {
      if (updatedTicket) {
        this.ticket = updatedTicket;
      }
    });
    }

    loadTicket(idTicket: string): void {
      this.ticketService.getTicketById(idTicket).subscribe({
        next: (ticket) => {
          this.ticket = ticket;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

