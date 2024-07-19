import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private toastr: ToastrService, public router: Router, private auth: AuthService) { }

  submitForm(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid && !this.auth.isLoggedIn()){
      this.userService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (res) => {
          this.auth.login(res);
          this.toastr.success(res.message,'Succès',{closeButton:true, positionClass: 'toast-top-right'});
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement: ', error)
          this.toastr.error(error.error.error);
        }
        })
    }
  }
}