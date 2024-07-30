import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnChanges {
  @Input() data: Ticket[] = [];
  @Input() chartType: any = 'line';
  @Input() filtre: any = 'date';
  chart: Chart | undefined;

  @ViewChild('ticketChart') ticketChart!: ElementRef;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['chartType'] || changes['filtre']) {
      this.updateChart();
    }
  }

  updateChart(): void {
    if (!this.ticketChart) { return; }

    const ctx = this.ticketChart.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    const { labels, data } = this.transformData();

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de tickets',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
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

  private transformData(): { labels: string[], data: number[] } {
    let counts: { [key: string]: number } = {};
    console.log(this.filtre);
    console.log(this.chartType);
    if (this.filtre === 'date') {
      counts = this.getDate();
    } else if (this.filtre === 'categorie') {
      counts = this.getCategory();
    }
    else if (this.filtre === 'etat'){
      counts = this.getEtat();
    }

    return {
      labels: Object.keys(counts),
      data: Object.values(counts)
    };
  }


  private getDate() :  { [key: string]: number } {
    const dates = this.data.map(ticket => {
      const ticketDate = new Date(ticket?.date as Date);
      return ticketDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    });

    return dates.reduce((acc: { [key: string]: number }, date: string) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  }

  private getCategory() :  { [key: string]: number } {
    const categories = this.data.map(ticket => ticket.categorie as string);

    return categories.reduce((acc: { [key: string]: number }, categorie: string) => {
      acc[categorie] = (acc[categorie] || 0) + 1;
      return acc;
    }, {});
  }

  private getEtat(): { [key: string]: number } {
    const etats = this.data.map(ticket => ticket.etat as number);
  
    return etats.reduce((acc: { [key: string]: number }, etat: number) => {
      const etatKey = etat.toString();
      acc[etatKey] = (acc[etatKey] || 0) + 1;
      return acc;
    }, {});
  }


}