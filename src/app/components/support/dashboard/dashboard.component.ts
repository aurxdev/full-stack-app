import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  startDate: string = '';
  endDate: string = '';
  dateForm: FormGroup;
  categoryForm: FormGroup;
  activeTab: string = 'date';
  nbTickets: number = 0;
  chartType: string = 'line';

  constructor(public ticketService: TicketService) {
    this.dateForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });

    this.categoryForm = new FormGroup({
      categorie: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.initializeForms();
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = Array.isArray(tickets) ? tickets : [tickets];
        this.nbTickets = this.tickets.length;
        this.filterTickets();
      }
    });  
    
  }

  initializeForms(): void{
    const today = new Date();
    const before = new Date();
    today.setDate(today.getDate() + 5);
    before.setDate(today.getDate() - 30);

    this.dateForm.setValue({
      startDate: before.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    });

  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab == 'date') {
      this.filterTickets();
    } else {
      this.filterTicketsByCategory();
    }
  }

  filterTickets(): void {
    this.filteredTickets = this.ticketService.filterTickets(this.tickets, this.dateForm);
    this.chartType = 'line';
  }

  filterTicketsByCategory(): void {
    const result = this.ticketService.filterTicketsByCategory(this.tickets, this.categoryForm);
    this.filteredTickets = result.filteredTickets;
    this.chartType = result.chartType;
  }


}