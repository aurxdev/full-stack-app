import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Message } from "../models/message";


@Injectable({
    providedIn: 'root'
  })
  export class MessageService {

    private messageUpdate = new BehaviorSubject<Message | null>(null);
    messageUpdate$ = this.messageUpdate.asObservable();

    private url = 'http://localhost:3000/api';
    constructor(private http: HttpClient){}
    
    createMessage(message: Message): Observable<Message>{
      return this.http.post<any>(`${this.url}/create-message`, message);
    }

    getAllMessages(): Observable<any[]>{
      return this.http.get<any[]>(`${this.url}/messages`);
    }

    getMessageById(id: string | null): Observable<any>{
      return this.http.get<any>(`${this.url}/messages/${id}`);
    }

    getMessageByUserId(id: string): Observable<Message[]>{
      return this.http.get<any>(`${this.url}/messages/users/${id}`);
    }

    getMessageByTicketId(id: string): Observable<any>{
      return this.http.get<Message[]>(`${this.url}/messages/tickets/${id}`);
    }

    sameIdTicket(id1 : string | null, id2: string | null): boolean{
      return id1 !== id2;
    }

    emitMessagesByTicketId(id: string): void {
      this.getMessageByTicketId(id).subscribe({
        next: (messages) => {
          messages.forEach((message: Message) => this.messageUpdate.next(message));
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

  }