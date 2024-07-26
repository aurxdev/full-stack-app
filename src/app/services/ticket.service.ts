import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Ticket } from "../models/ticket";
import { catchError, map } from 'rxjs/operators';
import { TicketEtat } from "../models/ticket";

@Injectable({
    providedIn: 'root'
  })
  export class TicketService {
    private ticketUpdate = new BehaviorSubject<Ticket | null>(null);
    ticketUpdate$ = this.ticketUpdate.asObservable();

    private url = 'http://localhost:3000/api';
    constructor(private http: HttpClient){}

    getAllTickets(id: string | null): Observable<Ticket[]>{
        return this.http.get<Ticket[]>(`${this.url}/tickets/${id}`);
    }

    getTicketById(id: string | null): Observable<Ticket>{
      return this.http.get<Ticket>(`${this.url}/ticket/${id}`);
    }

    getTicketByUserId(id: string): Observable<Ticket>{
      return this.http.get<any>(`${this.url}/tickets/users/${id}`);
    }

    createTicket(ticket: Ticket): Observable<Ticket>{
      return this.http.post<Ticket>(`${this.url}/create-ticket`, ticket);
    }

    // vérifie si le ticket à l'id donné a le support avec l'id donné
    verifySupport(id:string, idSupport: string): Observable<boolean> {
      return this.getTicketById(id).pipe(
        map(data => data.idsupport === idSupport),
        catchError(() => of(false)) 
      );
    }

    // vérifie si le ticket à l'id donné a le user avec l'id donné
    verifyTicket(ticketId: string, userId: string): Observable<boolean> {
      return this.getTicketById(ticketId).pipe(
        map(data => data.iduser === userId),
        catchError(() => of(false)) 
      );
    }

    changeEtat(ticket: Ticket, etat: TicketEtat, idsupport : string): void {
      this.http.put<Ticket>(`${this.url}/tickets/update-etat/${ticket.id}`, {etat: etat, idsupport: idsupport})
        .subscribe({
          next: (updatedTicket) => {
            this.ticketUpdate.next(updatedTicket);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de l\'état du ticket', error);
          }
        });
    }

    /*
    updateTicket(ticket: Ticket): Observable<any>{
      return this.http.put<any>(`${this.url}/tickets/${ticket._id}`, ticket);
    }

    deleteTicket(id: string): Observable<any>{
      return this.http.delete<any>(`${this.url}/tickets/${id}`);
    }

    */



}