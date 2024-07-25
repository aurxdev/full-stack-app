import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() contenu: string = '';
  @Input() side: boolean = true;
  @Input() nom: string = '';
  @Input() date: string | null = null;
}
