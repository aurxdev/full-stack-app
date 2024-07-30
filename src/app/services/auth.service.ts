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
  private decodedToken: Token | null = null;

  // to-do , faire le champ décodé token dans une variable, au lieu de le faire à chaque fois dans la fonction
  constructor() { 
    this.updateDecodedToken();
  }

  login(res: any): void{
    localStorage.setItem('accessToken', res.token);
    this.updateDecodedToken();
  }

  getToken(): string | null{
    return localStorage.getItem('accessToken');
  }

  logout(): void{
    localStorage.removeItem('accessToken');
    this.decodedToken = null;
  }
  

  isLoggedIn(): boolean{
    return this.getToken() !== null;
  }

  isSupport(): boolean{
    return this.decodedToken ? this.decodedToken.support : false;
  }

  getId(): string | null{
    return this.decodedToken ? this.decodedToken.id : null;
  }

  getUser(): Token | null{
    return this.decodedToken;
  }

  private updateDecodedToken() : void{
    const token = this.getToken();
    this.decodedToken = token ? jwtDecode<Token>(token) : null;
  }
}
