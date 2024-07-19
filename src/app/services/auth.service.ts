import { Injectable } from '@angular/core';

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

}
