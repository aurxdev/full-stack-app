import { Component, Input, inject } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { TicketEtat } from '../../../models/ticket';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isActive: boolean = false;
  ticket: Ticket | null = null;
  actionType: 'response' | 'close' | null = null;
  ticketService: TicketService = inject(TicketService);
  authService: AuthService = inject(AuthService);

  constructor(private toastr: ToastrService) { }

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
    this.ticketService.changeEtat(ticket, TicketEtat.EN_COURS, this.authService.getId() as string);
    this.closeModal();
    this.toastr.success('Vous avez pris la main sur ce ticket.', 'Succès', { closeButton: true, positionClass: 'toast-top-right' });
  }

  closeTicket(ticket: any){
    this.ticketService.changeEtat(ticket, TicketEtat.FERME, this.authService.getId() as string);
    this.closeModal();
    this.toastr.success('Le ticket a été fermé.', 'Succès', { closeButton: true, positionClass: 'toast-top-right' });
  }
}
