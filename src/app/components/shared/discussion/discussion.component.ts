import { Component, inject, Input, OnChanges, SimpleChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DatePipe } from '@angular/common';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

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
  private socket: Socket = inject(Socket);
  private subscriptions: Subscription[] = [];

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

  constructor(private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTicket'] && changes['idTicket'].currentValue) {
      this.messages = [];
      this.loadMessages(changes['idTicket'].currentValue);
    }
  }

  loadMessages(idTicket: string): void {
    this.messageService.getMessageByTicketId(idTicket).subscribe({
      next: (data: any) => {
        this.messages = Array.isArray(data) ? data : [data];
        console.log('Messages chargés', this.messages);
        this.scrollToAnchor();
      },
      error: (error: any) => {
        if (error.status !== 404) {
          this.toastr.warning('Pas de messages pour ce ticket.', 'Aucun message');
        }
      }
    });
  
    this.subscriptions.push(
      this.socket.fromEvent('newMessage').subscribe((message: any) => {
        this.messages.push(message);
        this.scrollToAnchor();
      })
    );
  }

  scrollToAnchor(): void {
    setTimeout(() => {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
