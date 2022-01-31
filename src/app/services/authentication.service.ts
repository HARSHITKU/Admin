import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminCredentials } from '../models/admin-credentials';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseURL: string = '';

  constructor(
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient
  ) {
    this.baseURL = this.commonService.base_URL;
  }

  login(adminCredential: AdminCredentials): Observable<AdminCredentials> {
    return this.http.post<AdminCredentials>(this.baseURL + 'admin/login', adminCredential);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  getToken(){
    return !!localStorage.getItem("token");
  }

  getUserProfile(): Observable<any>{
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<any>(this.baseURL + 'users/me', httpOptions);
  }
}
