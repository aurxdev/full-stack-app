import { Component, Input } from '@angular/core';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isActive: boolean = false;
  @Input() ticket: Ticket | null = null;

  openModal(ticket: Ticket){ 
    this.ticket = ticket;
    this.isActive = true;
  }

  closeModal() {
    this.isActive = false;
  }
}
