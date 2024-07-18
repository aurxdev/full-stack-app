import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username: string = '';
  password: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.http.post<any>('/api/login', { username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}