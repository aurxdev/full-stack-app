import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent implements OnInit {
  items: any[] = [];
  user:any;


  userService : UserService = inject(UserService);
  authService : AuthService = inject(AuthService);

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.getItems();
    this.user = this.auth.getDecodedToken();
    // console.log(this.user);
  }

  getItems(): void {
    this.userService.getAllUsers().subscribe((item) =>{
      this.items=item;
    });
    
  }
}