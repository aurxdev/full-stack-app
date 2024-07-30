import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Ticket } from '../../../models/ticket';
import { DataTransformService } from '../../../services/support/data-transform.service';
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
  dataTransformService: DataTransformService = inject(DataTransformService);

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
      counts = this.dataTransformService.getDate(this.data);
    } else if (this.filtre === 'categorie') {
      counts = this.dataTransformService.getCategory(this.data);
    }
    else if (this.filtre === 'etat'){
      counts = this.dataTransformService.getEtat(this.data);
    }

    return {
      labels: Object.keys(counts),
      data: Object.values(counts)
    };
  }

}