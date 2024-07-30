import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etat',
  standalone: true
})
export class EtatPipe implements PipeTransform {

  transform(value: Number | undefined): {text:string, class:string} {
    switch(Number(value)){
      case 0:
        return {text: 'Ouvert', class: 'tag is-success m-1'};
      case 1:
        return {text:'En cours', class: 'tag is-warning m-2'};
      case 2:
        return {text:'Fermé', class: 'tag is-danger m-2'};
      default:
        return {text:'Inconnu', class: 'tag is-light'};
    }
  }

}
