import { Component,Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-message',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-message.component.html',
  styleUrl: './form-message.component.css'
})
export class FormMessageComponent {
  @Input() idTicket: string | undefined = '';
  messageForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });
  disabled: boolean = false;

  constructor(private toastr: ToastrService, private auth: AuthService, public message: MessageService) { }

  submitForm(): void {
    this.messageForm.markAllAsTouched();
    if(this.messageForm.valid && this.auth.isLoggedIn()){
      if (!this.idTicket) {
        this.toastr.error('Impossible d\'envoyer le message, veuillez réessayer.');
        return;
      }
      if(this.disabled){
        this.toastr.error('Veuillez patienter avant d\'envoyer un nouveau message.');
        return;
      }

      const msg : Message = {
        contenu: this.messageForm.value.message,
        idticket: this.idTicket,
        iduser: this.auth.getId(),
      };
      this.message.createMessage(msg).subscribe({
        next: (res) => {
          this.toastr.success('Message envoyé avec succès.','Succès',{closeButton:true, positionClass: 'toast-top-right'});
          this.messageForm.reset();
          this.disableForm();


        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement: ', error)
          this.toastr.error(error.error.error);
        }
      });
    } else{
      this.toastr.error('Veuillez remplir correctement le formulaire.');
    }
  }

  disableForm(): void {
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, 30000);
  }

}
