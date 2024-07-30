import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Message } from "../models/message";
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageUpdate = new BehaviorSubject<Message[] | null>(null);
  messageUpdate$ = this.messageUpdate.asObservable();

  private url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}
  

  createMessage(message: Message): Observable<Message | null> {
    return this.http.post<Message>(`${this.url}/create-message`, message);
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/messages`);
  }

  getMessageById(id: string | null): Observable<Message> {
    return this.http.get<Message>(`${this.url}/messages/${id}`);
  }

  getMessageByUserId(id: string): Observable<Message[]> {
    return this.http.get<any>(`${this.url}/messages/users/${id}`);
  }

  getMessageByTicketId(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/messages/tickets/${id}`);
  }

}