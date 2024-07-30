import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(private toastr: ToastrService, public router: Router, private auth: AuthService) { }

  submitForm(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid && !this.auth.isLoggedIn()) {
      const user: User = {
        nom: this.loginForm.value.username,
        mdp: this.loginForm.value.password,
      };
      this.userService.loginUser(user).subscribe({
        next: (res) => {
          this.auth.login(res);
          this.toastr.success(res.message, 'Succès', { closeButton: true, positionClass: 'toast-top-right' });
          this.router.navigate(['/']);
        }
      });
    } else {
      this.toastr.error('Veuillez remplir correctement le formulaire.');
    }
  }
}