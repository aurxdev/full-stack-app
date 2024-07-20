import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient){}

    getAllUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.url}/users`);
    }

    getUserById(id: string): Observable<User>{
      return this.http.get<User>(`${this.url}/users/${id}`);
    }

    isSupport(id: string): Observable<any>{
      return this.http.get<any>(`${this.url}/users/${id}/isSupport`);
    }


    loginUser(user : User): Observable<any>{
      return this.http.post<any>(`${this.url}/login`, { username: user.nom, password: user.mdp })
    }


    /* CRUD OPERATIONS */

    registerUser(user : User): Observable<any>{
      return this.http.post<any>(`${this.url}/register`, { username: user.nom, password: user.mdp });
    }

    updateUser(id:string, user : User): Observable<any>{
      return this.http.put<any>(`${this.url}/users/${id}`, { username: user.nom, password: user.mdp });
    }

    deleteUser(id: string): Observable<any>{
      return this.http.delete<any>(`${this.url}/users/${id}`);
    }

    /* CRUD OPERATIONS */

}