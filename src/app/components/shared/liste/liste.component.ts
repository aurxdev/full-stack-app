import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../../../services/ticket.service';
import { AuthService } from '../../../services/auth.service';
import { TicketEtat } from '../../../models/ticket';
import { EtatPipe } from '../../../pipes/etat.pipe';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, EtatPipe],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent implements OnInit {
  tickets: any[] = [];
  user:any;
  noTicket = false;


  ticketService : TicketService = inject(TicketService);
  authService : AuthService = inject(AuthService);

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      return;
    }
    this.user = this.auth.getUser();
    let support = this.auth.isSupport();
    // si c'est un support, on affiche tous les tickets
    if(support){
      this.ticketService.getAllTickets().subscribe((data: any) => {
        this.tickets = data;
      });
    }
    // sinon on affiche les tickets spécifiques à l'utilisateur
    else{
      this.getItems();
    }
  }

  getItems(): void {
    this.ticketService.getTicketById(this.user.id).subscribe({
      next: (data: any) => {
        this.tickets = Array.isArray(data) ? data : [data];
      },
      error: (error: any) => {
        this.noTicket = true;
      }
    });
  }
}