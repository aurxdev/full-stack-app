import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from "../models/ticket";

@Injectable({
    providedIn: 'root'
  })
  export class TicketService {
    
    private url = 'http://localhost:3000/api';
    constructor(private http: HttpClient){}

    getAllTickets(): Observable<Ticket[]>{
        return this.http.get<any[]>(`${this.url}/tickets`);
    }

    getTicketById(id: string): Observable<Ticket>{
      return this.http.get<any>(`${this.url}/tickets/${id}`);
    }


}