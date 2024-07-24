import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';

// j'étends l'interface pour pouvoir faire des fonctions qui retournent juste un champ de l'interface
interface Token extends JwtPayload{
  id: string;
  nom: string;
  support: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // to-do , faire le champ décodé token dans une variable, au lieu de le faire à chaque fois dans la fonction
  constructor() { }

  login(res: any): void{
    localStorage.setItem('accessToken', res.token);
  }

  getToken(): string | null{
    return localStorage.getItem('accessToken');
  }

  logout(): void{
    localStorage.removeItem('accessToken');
    if(localStorage.getItem('accessToken') === null){

    }
  }

  isLoggedIn(): boolean{
    return this.getToken() !== null;
  }

  isSupport(): boolean{
    const token = this.getDecodedToken();
    return token ? token.support : false
  }

  getDecodedToken() : Token | null{
    const token = localStorage.getItem('accessToken');
    return token ? jwtDecode(token) : null;
  }

  getUserId(){
    const token = this.getDecodedToken();
    return token ? token.id : null;
  }

}
