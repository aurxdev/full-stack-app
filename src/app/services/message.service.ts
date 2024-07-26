import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Message } from "../models/message";


@Injectable({
    providedIn: 'root'
  })
  export class MessageService {

    private messageUpdate = new BehaviorSubject<Message[] | null>(null);
    messageUpdate$ = this.messageUpdate.asObservable();

    private url = 'http://localhost:3000/api';
    constructor(private http: HttpClient){}
    
    createMessage(message: Message): Observable<Message | null> {
      return this.http.post<Message>(`${this.url}/create-message`, message).pipe(
        map(newMessage => {
          this.messageUpdate.next([newMessage]); // Émettre le nouveau message
          return newMessage;
        }),
        catchError(error => {
          this.messageUpdate.next(null);
          return of(null);
        })
      );
    }  

    getAllMessages(): Observable<Message[]>{
      return this.http.get<Message[]>(`${this.url}/messages`);
    }

    getMessageById(id: string | null): Observable<Message>{
      return this.http.get<Message>(`${this.url}/messages/${id}`);
    }

    getMessageByUserId(id: string): Observable<Message[]>{
      return this.http.get<any>(`${this.url}/messages/users/${id}`);
    }

    getMessageByTicketId(id: string): Observable<any> {
      return this.http.get<Message[]>(`${this.url}/messages/tickets/${id}`).pipe(
        catchError((error) => {
          if (error.status === 404) {
            console.error('Aucun message trouvé pour le ticket', id);
            return of([]); 
          } else {
            return throwError(() => new Error(error.message)); 
          }
        })
      );
    }

    emitMessages(id: string): void {
      this.getMessageByTicketId(id).subscribe({
        next: (messages) => {
          this.messageUpdate.next(messages);
        },
        error: (error) => {
          this.messageUpdate.next(null);
        }
      });
    }
    

  }