import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etat',
  standalone: true
})
export class EtatPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    switch(value){
      case '0':
        return 'Ouvert';
      case '1':
        return 'En cours';
      case '2':
        return 'Fermé';
      default:
        return 'Inconnu';
    }
  }

}
