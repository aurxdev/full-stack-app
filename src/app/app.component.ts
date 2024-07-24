import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'full-stack-app';
  user : any;
  authService = inject(AuthService);

  constructor(private toastr: ToastrService, public router : Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.user = this.authService.getUser();

    }
  }

  logout(): void{
    this.authService.logout();
    this.toastr.success('Vous avez été déconnecté avec succès');
    this.router.navigate(['/']);
  }
}
