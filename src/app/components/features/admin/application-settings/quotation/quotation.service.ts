import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  baseURL: string = '';


  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;

}
getAllQuotation(): Observable<any> {
  let token = localStorage.getItem('token');

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };
  const apiUrl = this.baseURL + 'admin/quotations';
  return this.http.get<any>(apiUrl, httpOptions);
  }
  getQuotationById(userId: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/quotations/' + userId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  deleteQuotation(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/quotations/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }
  addQuotation(quotationData: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/quotations';
    return this.http.post(apiUrl, quotationData, httpOptions);
  }
  updateQuotation(quotationData: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/quotations/' + userId;
    return this.http.patch(apiUrl, quotationData, httpOptions);
  }
}
