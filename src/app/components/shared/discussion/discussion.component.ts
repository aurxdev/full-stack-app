import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { DatePipe } from '@angular/common';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { interval } from 'rxjs';

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

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idTicket'] && changes['idTicket'].currentValue) {
      this.loadMessages(changes['idTicket'].currentValue);
      this.startAutoReload();
    }
    
  }

  loadMessages(idTicket: string): void {
    this.messageService.emitMessages(idTicket);
    this.messageService.messageUpdate$.subscribe(messages => {
      if (messages) {
        this.messages.push(...messages);
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  
  startAutoReload(): void {
    this.stopAutoReload(); // Arrêter tout intervalle existant avant d'en démarrer un nouveau
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
    this.stopAutoReload(); // Nettoyer l'intervalle lorsque le composant est détruit
  }


}