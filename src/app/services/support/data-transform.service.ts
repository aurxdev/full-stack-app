import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class DataTransformService {
  constructor() {}

  getDate(data: Ticket[]): { [key: string]: number } {
    const dates = data.map(ticket => {
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

  getCategory(data: Ticket[]): { [key: string]: number } {
    const categories = data.map(ticket => ticket.categorie as string);

    return categories.reduce((acc: { [key: string]: number }, categorie: string) => {
      acc[categorie] = (acc[categorie] || 0) + 1;
      return acc;
    }, {});
  }

  getEtat(data: Ticket[]): { [key: string]: number } {
    const etats = data.map(ticket => ticket.etat as number);

    return etats.reduce((acc: { [key: string]: number }, etat: number) => {
      const etatKey = etat.toString();
      acc[etatKey] = (acc[etatKey] || 0) + 1;
      return acc;
    }, {});
  }
}