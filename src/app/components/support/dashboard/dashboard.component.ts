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


    const today = new Date();
    const before = new Date();
    before.setDate(today.getDate() - 30);

    this.dateForm.setValue({
      startDate: before.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    });


    this.ticketService.getTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = Array.isArray(tickets) ? tickets : [tickets];
        this.nbTickets = this.tickets.length;
        this.filterTickets();
      },
      error: (error: any) => {
        console.error(error);
      }
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
    this.dateForm.markAllAsTouched();
    if(this.dateForm.invalid) {
      return;
    }
    const start = new Date(this.dateForm.value.startDate);
    const end = new Date(this.dateForm.value.endDate);
    this.filteredTickets = this.tickets.filter(ticket => {
      const ticketDate = new Date(ticket?.date as Date);
      const localDate = new Date(ticketDate.getFullYear(), ticketDate.getMonth(), ticketDate.getDate());
      return localDate >= start && localDate <= end;
    });
    this.chartType = 'line';
  }

  filterTicketsByCategory(): void {
    this.categoryForm.markAllAsTouched();
    const categorie = this.categoryForm.value.categorie;
    if(this.categoryForm.invalid) {
      return;
    }
    const validCategories = new Set(['doughnut', 'bar']);
    if(!validCategories.has(categorie)) {
      return;
    }
    this.filteredTickets = this.tickets;
    this.chartType = categorie;
  }



}