import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  informations : any;
  user:any;
  
  constructor(userService: UserService, authService : AuthService) { 
    this.informations = {};
    this.user = authService.getUser();
    userService.getUserById(this.user.id).subscribe((data) => {
      this.informations = data
      });
   }

}
