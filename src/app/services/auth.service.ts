import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

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

  getDecodedToken() {
    const token = localStorage.getItem('accessToken');
    return token ? jwtDecode(token) : null;
  }

  getId(){
    
  }

}
