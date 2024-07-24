import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthGuard } from '../../../shared/auth.guard';
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
  
  constructor(userService: UserService, auth : AuthGuard) { 
    this.informations = {};
    this.user = auth.authService.getUser();
    userService.getUserById(this.user.id).subscribe((data) => {
      this.informations = data
      });
   }

}
