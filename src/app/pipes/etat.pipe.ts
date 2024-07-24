import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etat',
  standalone: true
})
export class EtatPipe implements PipeTransform {

  transform(value: Number | undefined): {text:string, class:string} {
    switch(Number(value)){
      case 0:
        return {text: 'Ouvert', class: 'has-text-success'};
      case 1:
        return {text:'En cours', class: 'has-text-warning'};
      case 2:
        return {text:'Fermé', class: 'has-text-danger'};
      default:
        return {text:'Inconnu', class: 'has-text-grey'};
    }
  }

}
