import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ticket } from "../models/ticket";
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class TicketService {
    
    private url = 'http://localhost:3000/api';
    constructor(private http: HttpClient){}

    getAllTickets(): Observable<Ticket[]>{
        return this.http.get<any[]>(`${this.url}/tickets`);
    }

    getTicketById(id: string | null): Observable<Ticket>{
      return this.http.get<any>(`${this.url}/tickets/${id}`);
    }

    getTicketByUserId(id: string): Observable<Ticket>{
      return this.http.get<any>(`${this.url}/tickets/users/${id}`);
    }

    createTicket(ticket: Ticket): Observable<any>{
      return this.http.post<any>(`${this.url}/create-ticket`, ticket);
    }

    verifyTicket(ticketId: string, userId: string): Observable<boolean> {
      return this.getTicketById(ticketId).pipe(
        map(data => data.iduser === userId),
        catchError(() => of(false)) // false en cas d'erreur
      );
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