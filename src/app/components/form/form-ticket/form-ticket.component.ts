import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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



  submitForm(): void {
    this.ticketForm.markAllAsTouched();
    if (this.ticketForm.valid) {
      console.log(this.ticketForm.value);
    }
  }

}
