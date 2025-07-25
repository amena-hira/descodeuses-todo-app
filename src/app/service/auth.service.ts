import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { utilisateurs } from '../models/utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(payload : any): Observable<any> {
    return this.http.post(`${this.apiUrl+'/login'}`, payload);
  }

  signup(user: utilisateurs):Observable<any>{
    return this.http.post(`${this.apiUrl+'/signup'}`, user);
  }

  
}
