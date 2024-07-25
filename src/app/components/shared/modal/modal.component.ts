import { Component, Input, inject } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { TicketEtat } from '../../../models/ticket';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isActive: boolean = false;
  @Input() ticket: Ticket | null = null;
  actionType: 'response' | 'close' | null = null;
  ticketService: TicketService = inject(TicketService);

  openModal(ticket: Ticket, action : 'response' | 'close') { 
    this.ticket = ticket;
    this.isActive = true;
    this.actionType = action;
  }

  closeModal() {
    this.isActive = false;
    this.actionType = null;
  }

  subscribeTicket(ticket: any){
    this.ticketService.changeEtat(ticket, TicketEtat.EN_COURS);
  }

  closeTicket(ticket: any){
    this.ticketService.changeEtat(ticket, TicketEtat.FERME);
  }
}
