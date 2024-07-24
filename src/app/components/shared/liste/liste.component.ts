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
    this.user = this.auth.getDecodedToken();
    let support = this.auth.isSupport();
    if(support){
      this.ticketService.getAllTickets().subscribe((data: any) => {
        this.tickets = data;
      });
    }
    else{
      this.getItems();
    }
  }

  getItems(): void {
    // to-do : afficher message si pas de ticket
    this.ticketService.getTicketById(this.user.id).subscribe({
      next: (data: any) => {
        this.tickets = Array.isArray(data) ? data : [data];
        console.log(this.tickets);
      },
      error: (error: any) => {
        this.noTicket = true;
      }
    });
  }
}