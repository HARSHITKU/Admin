import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})

export class PrivacypolicyService {
  baseURL : string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }
  getAllprivacyPolicy(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/privacyPolicy';
    return this.http.get<any>(apiUrl, httpOptions);
  }
  getprivacyPolicyById(userId: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/privacyPolicy/' + userId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  deleteprivacyPolicy(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/privacyPolicy/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }
  addprivacyPolicy(privacypolicyData: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/privacyPolicy';
    return this.http.post(apiUrl, privacypolicyData, httpOptions);
  }
  updateprivacyPolicy(privacypolicyData: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/privacyPolicy/' + userId;
    return this.http.patch(apiUrl, privacypolicyData, httpOptions);
  }
}
 