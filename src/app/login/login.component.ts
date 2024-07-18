import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(private toastr: ToastrService) { }

  submitForm(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.userService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () => {
          this.toastr.success('Connexion réussie.','Succès',{closeButton:true, positionClass: 'toast-top-right'});
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement: ', error)
          this.toastr.error(error.error.error);
        }
        })
    }
  }
}