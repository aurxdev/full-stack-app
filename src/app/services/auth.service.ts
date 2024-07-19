import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from 'jwt-decode';


interface Token extends JwtPayload{
  id: string;
  nom: string;
  support: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  getId(){
    
  }

}
