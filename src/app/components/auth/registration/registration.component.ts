import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-registration',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  userService = inject(UserService);
  private router = inject(Router);


  constructor(private toastr: ToastrService, private auth: AuthService) { }

  submitForm(): void {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid && !this.auth.isLoggedIn()){
      const user: User = {
        nom: this.registerForm.value.username,
        mdp: this.registerForm.value.password,
      }
      this.userService.registerUser(user).subscribe({
        next: () =>{
          this.router.navigate(['/login']);
          this.toastr.success('Votre compte est bien enregistré.','Succès',{closeButton:true, positionClass: 'toast-top-right'});
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement: ', error)
          this.toastr.error(error.error.error);
        }
      });
    }
    else{
      this.toastr.error('Veuillez remplir correctement le formulaire.');
    }
  }
}