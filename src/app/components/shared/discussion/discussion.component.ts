import { Component, inject, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DatePipe } from '@angular/common';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [MessageComponent, DatePipe, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnChanges, OnDestroy {

  @Input() idTicket: string = '';
  @Input() idUser: string = '';
  @Input() idSupport: string = '';
  messages: Message[] = [];
  messageService: MessageService = inject(MessageService);
  authService: AuthService = inject(AuthService);
  private interval: any;
  private sub: Subscription = new Subscription();
  private messagesLoaded: boolean = false;
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTicket'] && changes['idTicket'].currentValue) {
      this.messages = [];
      this.messagesLoaded = false;
      this.loadMessages(changes['idTicket'].currentValue);
    }
  }

  loadMessages(idTicket: string): void {
    this.messages = [];
    this.sub.unsubscribe();
    this.sub = this.messageService.messageUpdate$.subscribe(messages => {
      if (Array.isArray(messages)) {
        this.messages = messages;
      } else {
        this.messages = [];
      }
    });
    this.messageService.emitMessages(idTicket);
  }

  ngOnDestroy(): void {
    this.messages = [];
    this.sub.unsubscribe();
  }
}