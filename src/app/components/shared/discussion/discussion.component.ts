import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DatePipe } from '@angular/common';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [MessageComponent, DatePipe, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnChanges, AfterViewChecked {

  @Input() idTicket: string = '';
  messages: Message[] = [];
  messageService: MessageService = inject(MessageService);
  authService: AuthService = inject(AuthService);

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTicket'] && changes['idTicket'].currentValue) {
      this.loadMessages(changes['idTicket'].currentValue);
    }
    
  }

  loadMessages(idTicket: string): void {
    this.messageService.emitMessagesByTicketId(idTicket);
    this.messageService.messageUpdate$.subscribe(messages => {
      if (messages) {
        this.messages.push(...messages);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


}