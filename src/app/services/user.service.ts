import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient){}

    getAllUsers(): Observable<any[]>{
        return this.http.get<any[]>(`${this.url}/users`);
    }

    getUserById(id: string): Observable<any>{
      return this.http.get<any>(`${this.url}/users/${id}`);
    }

    isSupport(id: string): Observable<any>{
      return this.http.get<any>(`${this.url}/users/${id}/isSupport`);
    }


    loginUser(username: string | null | undefined, password: string | null | undefined): Observable<any>{
      return this.http.post<any>(`${this.url}/login`, { username: username, password: password })
    }


    /* CRUD OPERATIONS */

    registerUser(username : string | null | undefined, password: string | null | undefined): Observable<any>{
      return this.http.post<any>(`${this.url}/register`, { username: username, password: password });
    }

    updateUser(id: string, username: string, password: string): Observable<any>{
      return this.http.put<any>(`${this.url}/users/${id}`, { username: username, password: password });
    }

    deleteUser(id: string): Observable<any>{
      return this.http.delete<any>(`${this.url}/users/${id}`);
    }

    /* CRUD OPERATIONS */

}