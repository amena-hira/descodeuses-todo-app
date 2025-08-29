import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { utilisateurs } from '../models/utilisateurs/utilisateurs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl + '/login'}`, payload);
  }

  signup(user: utilisateurs): Observable<any> {
    return this.http.post(`${this.apiUrl + '/signup'}`, user);
  }



  isLogin: boolean = !!sessionStorage.getItem('authToken');
  isAdmin: boolean = sessionStorage.getItem('authRole') === 'ROLE_ADMIN';
  updateAuthState(token?: string, role?: string, username?: string) {
    if (token && role && username) {
      // store data
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('authRole', role);
      sessionStorage.setItem('username', username);

      // update booleans
      this.isLogin = true;
      this.isAdmin = role === 'ROLE_ADMIN';
    } else {
      // clear data
      sessionStorage.clear();
      this.isLogin = false;
      this.isAdmin = false;
    }
  }
}
