import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  startDate: string = '';
  endDate: string = '';
  @ViewChild('ticketChart') ticketChart!: ElementRef;

  constructor(public ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = Array.isArray(tickets) ? tickets : [tickets];
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  filterTickets(): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    this.filteredTickets = this.tickets.filter(ticket => {
      const ticketDate = new Date(ticket?.date as Date);
      return ticketDate >= start && ticketDate <= end;
    });
    this.updateChart();
  }

  updateChart(): void {
    const ctx = this.ticketChart.nativeElement.getContext('2d');
    const dates = this.filteredTickets.map(ticket => new Date(ticket?.date as Date).toISOString().split('T')[0]);
    const counts = dates.reduce((acc: { [key: string]: number }, date: string) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Nombre de tickets',
          data: Object.values(counts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}