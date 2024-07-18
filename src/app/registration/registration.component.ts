import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';


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


  constructor(private http: HttpClient) { }

  submitForm(): void {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){

      this.userService.registerUser(this.registerForm.value.username, this.registerForm.value.password).subscribe();
    }
  }
}