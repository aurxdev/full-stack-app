import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { TicketEtat } from '../../../models/ticket';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-ticket.component.html',
  styleUrl: './form-ticket.component.css'
})
export class FormTicketComponent {
  ticketForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService, private ticketService: TicketService, private toastr : ToastrService, private router: Router) { }

  submitForm(): void {
    this.ticketForm.markAllAsTouched();
    if (this.ticketForm.valid && this.auth.isLoggedIn()) {
      const ticket : Ticket = {
        nom: this.ticketForm.value.nom,
        categorie: this.ticketForm.value.categorie,
        description: this.ticketForm.value.description,
        etat: TicketEtat.OUVERT,
        idUser: this.auth.getUserId(),
      }
      console.log(this.ticketForm.value && this.auth.isLoggedIn());
      this.ticketService.createTicket(ticket).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'Succès', { closeButton: true, positionClass: 'toast-top-right' });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement: ', error)
          this.toastr.error(error.error.error);
        }
      });
    } else{
      this.toastr.error('Veuillez remplir correctement le formulaire.', "Erreur");
    }
  }

}
