import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DatePipe } from '@angular/common';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [MessageComponent, DatePipe, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnChanges, AfterViewChecked {

  @Input() idTicket: string = '';
  @Input() idUser: string = '';
  @Input() idSupport: string = '';
  messages: Message[] = [];
  messageService: MessageService = inject(MessageService);
  authService: AuthService = inject(AuthService);
  private interval: any;
  private sub: any;
  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;


  ngOnInit(): void {
    if (this.idTicket) {
      this.loadMessages(this.idTicket);
      this.startAutoReload();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTicket'] && changes['idTicket'].currentValue) {
      this.loadMessages(changes['idTicket'].currentValue);
      this.startAutoReload();
    }
  }

  loadMessages(idTicket: string): void {
    this.messages.length = 0;
    this.messageService.emitMessages(idTicket);
    this.sub = this.messageService.messageUpdate$.subscribe(messages => {
      if (Array.isArray(messages)) {
        this.messages.push(...messages);
      } else {
        this.messages = [];
      }
    });
  }

  ngAfterViewChecked() {
    //this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  startAutoReload(): void {
    this.stopAutoReload();
    this.interval = setInterval(() => {
      location.reload();
    }, 60000);
  }

  stopAutoReload(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ngOnDestroy(): void {
    this.stopAutoReload();
    this.messages.length = 0;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}