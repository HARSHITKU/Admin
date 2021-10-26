import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL: string = '';
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }
  getAllProducts(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/about';
    return this.http.get<any>(apiUrl, httpOptions);
  }
  getProductsById(userId: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/about/' + userId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  deleteProducts(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/about/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }
  addProducts(aboutData: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/about';
    return this.http.post(apiUrl, aboutData, httpOptions);
  }

  updateProducts(aboutData: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/about/' + userId;
    return this.http.patch(apiUrl, aboutData, httpOptions);
  }
}
